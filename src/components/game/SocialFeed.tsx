import { useEffect, useRef, useState } from 'react';
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

// Three corner zones away from the centred game elements.
// anchor='right' uses CSS `right` so the card doesn't overflow on narrow panels.
const ZONES: { anchor: 'left' | 'right'; x: number; y: number }[] = [
  { anchor: 'left', x: 4, y: 8 }, // top-left
  { anchor: 'left', x: 4, y: 72 }, // bottom-left
  { anchor: 'right', x: 4, y: 72 }, // bottom-right
];

function getPosition(): { x: number; y: number; anchor: 'left' | 'right' } {
  const zone = ZONES[Math.floor(Math.random() * ZONES.length)];
  return {
    x: zone.x + (Math.random() * 3 - 1.5),
    y: zone.y + (Math.random() * 3 - 1.5),
    anchor: zone.anchor,
  };
}

let nextId = 0;

export function SocialFeed() {
  const productName = useGameStore((s) => s.productName);
  const activeEvent = useGameStore((s) => s.activeEvent);
  const achievements = useGameStore((s) => s.achievements);
  const [posts, setPosts] = useState<ActivePost[]>([]);
  const activeRef = useRef(true);
  const activeEventRef = useRef(activeEvent);
  const achievementsRef = useRef(achievements);

  useEffect(() => {
    activeEventRef.current = activeEvent;
  }, [activeEvent]);

  useEffect(() => {
    achievementsRef.current = achievements;
  }, [achievements]);

  useEffect(() => {
    activeRef.current = true;

    const schedule = (delay: number) => {
      setTimeout(() => {
        if (!activeRef.current) return;

        const id = nextId++;
        const { x, y, anchor } = getPosition();

        const context: PostContext = {
          isNegativeEvent: activeEventRef.current?.isNegative ?? false,
          isPositiveEvent: activeEventRef.current !== null && !activeEventRef.current.isNegative,
          achievements: achievementsRef.current,
        };

        setPosts((prev) => {
          if (prev.length >= 1) return prev;
          return [
            ...prev,
            { id, post: generateSocialPost(productName, context), x, y, anchor, exiting: false },
          ];
        });

        // Begin exit animation
        setTimeout(() => {
          if (!activeRef.current) return;
          setPosts((prev) => prev.map((p) => (p.id === id ? { ...p, exiting: true } : p)));
        }, 9500);

        // Remove from DOM, then schedule the next post after a random pause
        setTimeout(() => {
          if (!activeRef.current) return;
          setPosts((prev) => prev.filter((p) => p.id !== id));
          schedule(10000 + Math.random() * 20000);
        }, 10200);
      }, delay);
    };

    // First post after 6–14 seconds
    schedule(6000 + Math.random() * 8000);

    return () => {
      activeRef.current = false;
    };
  }, [productName]);

  return (
    <>
      {posts.map(({ id, post, x, y, anchor, exiting }) => (
        <div
          key={id}
          className={`absolute pointer-events-none select-none ${exiting ? 'animate-social-out' : 'animate-social-in'}`}
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
