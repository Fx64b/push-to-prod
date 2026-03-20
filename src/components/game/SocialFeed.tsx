import { useCallback, useEffect, useRef, useState } from 'react';
import {
  generateSocialPost,
  type HNPostData,
  type PostContext,
  type SocialPostData,
  type TwitterPostData,
} from '@/data/socialPosts';
import { useGameStore } from '@/store/gameStore';

interface ActivePost {
  id: number;
  post: SocialPostData;
  x: number;
  y: number;
  anchor: 'left' | 'right';
  exiting: boolean;
}

function getPosition(topZoneY: number): { x: number; y: number; anchor: 'left' | 'right' } {
  const zones = [
    { anchor: 'left' as const, x: 4, y: topZoneY }, // top-left
    { anchor: 'left' as const, x: 4, y: 72 },       // bottom-left
    { anchor: 'right' as const, x: 4, y: 72 },      // bottom-right
  ];
  const zone = zones[Math.floor(Math.random() * zones.length)];
  return {
    x: zone.x + (Math.random() * 3 - 1.5),
    y: zone.y + (Math.random() * 3 - 1.5),
    anchor: zone.anchor,
  };
}

/**
 * Returns spawn config scaled by total LOC.
 *
 * t = (log10(loc) - 3) / 9  → 0 at 1K, 1 at 1T
 *
 * nextDelay: 50s at 1K → 0s at 1T  (quadratic decay)
 * maxPosts:  1 below 1M, 2 below 1B, 3 at 1B+
 */
function getSpawnConfig(totalLoc: number): { maxPosts: number; nextDelay: number } {
  const log = Math.log10(Math.max(totalLoc, 1000));
  const t = Math.min(1, (log - 3) / 9);
  const base = 50000 * Math.pow(1 - t, 2);
  const nextDelay = Math.max(0, Math.round(base * (0.8 + Math.random() * 0.4)));
  // Stay at 1 post for most of the game; only open extra slots near 1T (10^12)
  // t=0.78 ≈ 10B, t=0.89 ≈ 100B, t=1 = 1T
  const maxPosts = t < 0.78 ? 1 : t < 0.89 ? 2 : 3;
  return { maxPosts, nextDelay };
}

let nextId = 0;

export function SocialFeed({ topZoneY = 8 }: { topZoneY?: number }) {
  const productName = useGameStore((s) => s.productName);
  const activeEvent = useGameStore((s) => s.activeEvent);
  const achievements = useGameStore((s) => s.achievements);
  const totalLoc = useGameStore((s) => s.totalLoc);
  const producers = useGameStore((s) => s.producers);

  const [posts, setPosts] = useState<ActivePost[]>([]);

  // Refs for values read inside async callbacks — no effect restart needed
  const activeEventRef = useRef(activeEvent);
  const achievementsRef = useRef(achievements);
  const totalLocRef = useRef(totalLoc);
  const producersRef = useRef(producers);
  const productNameRef = useRef(productName);
  const topZoneYRef = useRef(topZoneY);

  useEffect(() => { activeEventRef.current = activeEvent; }, [activeEvent]);
  useEffect(() => { achievementsRef.current = achievements; }, [achievements]);
  useEffect(() => { totalLocRef.current = totalLoc; }, [totalLoc]);
  useEffect(() => { producersRef.current = producers; }, [producers]);
  useEffect(() => { productNameRef.current = productName; }, [productName]);
  useEffect(() => { topZoneYRef.current = topZoneY; }, [topZoneY]);

  // Shared spawn counter — incremented before setPosts, decremented after removal.
  // Single-threaded JS guarantees no race between setTimeout callbacks.
  const spawnCountRef = useRef(0);

  // All chains share this flag; set false on cleanup to stop all pending timers.
  const aliveRef = useRef(false);

  // Track which post IDs have already been removed to guard against double-removal.
  const removedRef = useRef(new Set<number>());

  // dismiss callbacks registered per-post so the rendered card can trigger early removal.
  const dismissCallbacks = useRef(new Map<number, () => void>());

  const runChain = useCallback((initialDelay: number) => {
    const step = (delay: number) => {
      setTimeout(() => {
        if (!aliveRef.current) return;

        const loc = totalLocRef.current;

        // Wait until player has meaningful LOC
        if (loc < 1000) {
          step(5000);
          return;
        }

        const { maxPosts, nextDelay } = getSpawnConfig(loc);

        // At capacity — try again soon
        if (spawnCountRef.current >= maxPosts) {
          step(5000);
          return;
        }

        spawnCountRef.current++;
        const id = nextId++;
        const { x, y, anchor } = getPosition(topZoneYRef.current);
        const context: PostContext = {
          isNegativeEvent: activeEventRef.current?.isNegative ?? false,
          isPositiveEvent: activeEventRef.current !== null && !activeEventRef.current.isNegative,
          achievements: achievementsRef.current,
          duckCount: producersRef.current['rubber-duck'] ?? 0,
          totalLoc: loc,
        };
        const post = generateSocialPost(productNameRef.current, context);

        const removePost = () => {
          if (removedRef.current.has(id)) return;
          removedRef.current.add(id);
          setPosts((prev) => prev.filter((p) => p.id !== id));
          dismissCallbacks.current.delete(id);
          spawnCountRef.current--;
        };

        // Register dismiss callback so click can trigger it early
        dismissCallbacks.current.set(id, () => {
          setPosts((prev) => prev.map((p) => (p.id === id ? { ...p, exiting: true } : p)));
          setTimeout(removePost, 350);
        });

        setPosts((prev) => [...prev, { id, post, x, y, anchor, exiting: false }]);

        // Start exit animation
        setTimeout(() => {
          if (!aliveRef.current || removedRef.current.has(id)) return;
          setPosts((prev) => prev.map((p) => (p.id === id ? { ...p, exiting: true } : p)));
        }, 9500);

        // Remove post, free slot, schedule next
        setTimeout(() => {
          if (!aliveRef.current) return;
          removePost();
          step(nextDelay);
        }, 10200);
      }, delay);
    };

    step(initialDelay);
  }, []);

  // Start/restart chains on mount and when productName changes (prestige rename).
  // Three staggered chains self-regulate via spawnCountRef + maxPosts.
  useEffect(() => {
    aliveRef.current = true;
    spawnCountRef.current = 0;

    runChain(2000 + Math.random() * 3000);   // chain 1: first post ~2–5s after 1K LOC
    runChain(9000 + Math.random() * 5000);   // chain 2: unlocks additional slot at 1M LOC
    runChain(16000 + Math.random() * 5000);  // chain 3: unlocks additional slot at 1B LOC

    return () => {
      aliveRef.current = false;
      spawnCountRef.current = 0;
      removedRef.current.clear();
      dismissCallbacks.current.clear();
      setPosts([]);
    };
  }, [productName, runChain]);

  return (
    <>
      {posts.map(({ id, post, x, y, anchor, exiting }) => (
        <div
          key={id}
          onClick={() => dismissCallbacks.current.get(id)?.()}
          className={`absolute pointer-events-auto select-none cursor-pointer ${exiting ? 'animate-social-out' : 'animate-social-in'}`}
          style={
            anchor === 'right' ? { right: `${x}%`, top: `${y}%` } : { left: `${x}%`, top: `${y}%` }
          }
        >
          {post.type === 'twitter' ? <TwitterCard data={post.data} /> : <HNCard data={post.data} />}
        </div>
      ))}
    </>
  );
}

// ── Twitter / X card ─────────────────────────────────────────────────────────

function TwitterCard({ data }: { data: TwitterPostData }) {
  return (
    <div className="w-96 rounded-2xl border border-white/10 bg-black p-3 shadow-2xl font-sans">
      <div className="flex items-start gap-2.5">
        <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-base shrink-0 leading-none">
          {data.avatar}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-baseline gap-1 flex-wrap leading-tight">
            <span className="text-white font-bold text-[13px] leading-none">{data.username}</span>
            <span className="text-white/40 text-[11px]">
              @{data.handle} · {data.time}
            </span>
          </div>
          <p className="text-white text-[12px] leading-snug mt-1 whitespace-pre-line">
            {data.text}
          </p>
          <div className="flex gap-3.5 mt-2 text-white/40 text-[11px]">
            <span>💬 {data.replies}</span>
            <span>🔁 {data.retweets}</span>
            <span>♥ {data.likes.toLocaleString()}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Hacker News card ──────────────────────────────────────────────────────────

function HNCard({ data }: { data: HNPostData }) {
  return (
    <div className="w-96 rounded border border-[#e8e3d9] bg-[#f6f6ef] p-3 shadow-2xl font-sans">
      <div className="flex items-center gap-1.5 mb-2">
        <div className="w-4 h-4 bg-[#ff6600] flex items-center justify-center text-white text-[10px] font-bold rounded-sm shrink-0">
          Y
        </div>
        <span className="text-[#828282] text-[10px] font-medium uppercase tracking-wide">
          Hacker News
        </span>
      </div>
      <div className="flex items-start gap-2">
        <span className="text-[#ff6600] font-bold text-sm leading-none shrink-0 mt-0.5">▲</span>
        <p className="text-[#000000] text-[12px] leading-snug font-medium">{data.title}</p>
      </div>
      <div className="text-[#828282] text-[10px] mt-2 leading-snug">
        <span className="text-[#ff6600] font-bold">{data.points}</span> points by{' '}
        <span>{data.user}</span> · {data.hoursAgo}h ago ·{' '}
        <span className="font-medium">{data.comments} comments</span>
      </div>
    </div>
  );
}
