import { ARCHITECTURE_UPGRADES } from '@/data/architectureUpgrades';
import { LEGACY_UPGRADES } from '@/data/legacyUpgrades';
import { PRODUCERS } from '@/data/producers';
import { UPGRADES } from '@/data/upgrades';
import type { NestedDuck, TechStack } from '@/store/gameStore';
import { _seg } from '@/utils/format';

// ─── Persisted state shape ────────────────────────────────────────────────────

export interface PersistedState {
  loc: number;
  totalLoc: number;
  locPerClick: number;
  legacyTokens: number;
  producers: Record<string, number>;
  upgrades: string[];
  legacyUpgrades: string[];
  achievements: string[];
  activeEvent: null;
  eventEndTime: number | null;
  activeEventTriggered: boolean;
  negativeEventssurvived: number;
  techStack: TechStack | null;
  pivotCount: number;
  greatRefactorCount: number;
  architecturePoints: number;
  architectureUpgrades: string[];
  totalLegacyTokensEverSpent: number;
  lastRunPeakLoc: number;
  eventSurvivalProductionBonus: number;
  greatRefactorProductionBonus: number;
  nestedDucks: NestedDuck[];
  lastSaveTime: number;
  prestigeCount: number;
  clicksThisRun: number;
  totalClicks: number;
  productName: string;
  penaltyLevel?: number;
}

// ─── Encoding primitives ──────────────────────────────────────────────────────

// Two independent seeds — will be hex identifiers in production after obfuscation
const _s0 = 0x4a3f1e7d;
const _s1 = 0x8c2b5f91;

// File header: 4 bytes magic + version, then 4 bytes CRC = 8 bytes total
const _hdr = [0x50, 0x54, 0x50, 0x01]; // "PTP\x01"

// Non-standard base-64 alphabet — reversed so standard decoders produce garbage
const _ab = 'ZYXWVUTSRQPONMLKJIHGFEDCBAzyxwvutsrqponmlkjihgfedcba9876543210/+';

const _te = new TextEncoder();
const _td = new TextDecoder();

// FNV-1a 32-bit — produces a checksum bound to every byte of the payload
function _fnv(d: Uint8Array): number {
  let h = 0x811c9dc5;
  for (let i = 0; i < d.length; i++) {
    h ^= d[i];
    h = Math.imul(h, 0x01000193) >>> 0;
  }
  return h;
}

// Xorshift32 expanded into a 256-byte key stream
function _ks(seed: number): Uint8Array {
  const k = new Uint8Array(256);
  let s = (seed ^ 0xdeadbeef) >>> 0;
  for (let i = 0; i < 256; i++) {
    s ^= s << 13;
    s >>>= 0;
    s ^= s >>> 17;
    s ^= s << 5;
    s >>>= 0;
    k[i] = s & 0xff;
  }
  return k;
}

// XOR every byte against a repeating key stream
function _xr(d: Uint8Array, k: Uint8Array): Uint8Array {
  const o = new Uint8Array(d.length);
  for (let i = 0; i < d.length; i++) o[i] = d[i] ^ k[i % k.length];
  return o;
}

// Bitwise rotation per byte — amount varies by position so diffusion is position-dependent
function _rot(d: Uint8Array, fwd: boolean): Uint8Array {
  const o = new Uint8Array(d.length);
  for (let i = 0; i < d.length; i++) {
    const r = (i ^ 0x5a) & 7;
    if (r === 0) {
      o[i] = d[i];
      continue;
    }
    o[i] = fwd
      ? ((d[i] >>> r) | (d[i] << (8 - r))) & 0xff // rotate right (encode)
      : ((d[i] << r) | (d[i] >>> (8 - r))) & 0xff; // rotate left (decode)
  }
  return o;
}

function _b64enc(d: Uint8Array): string {
  let s = '';
  for (let i = 0; i < d.length; i += 3) {
    const a = d[i],
      b = d[i + 1] ?? 0,
      c = d[i + 2] ?? 0;
    const n = (a << 16) | (b << 8) | c;
    s += _ab[(n >> 18) & 63];
    s += _ab[(n >> 12) & 63];
    s += i + 1 < d.length ? _ab[(n >> 6) & 63] : '=';
    s += i + 2 < d.length ? _ab[n & 63] : '=';
  }
  return s;
}

function _b64dec(s: string): Uint8Array | null {
  try {
    const t = s.replace(/\s/g, '');
    if (t.length % 4 !== 0) return null;
    const out: number[] = [];
    for (let i = 0; i < t.length; i += 4) {
      const v = [0, 0, 0, 0];
      for (let j = 0; j < 4; j++) {
        const ch = t[i + j];
        if (ch === '=') continue;
        const idx = _ab.indexOf(ch);
        if (idx === -1) return null;
        v[j] = idx;
      }
      const n = (v[0] << 18) | (v[1] << 12) | (v[2] << 6) | v[3];
      out.push((n >> 16) & 0xff);
      if (t[i + 2] !== '=') out.push((n >> 8) & 0xff);
      if (t[i + 3] !== '=') out.push(n & 0xff);
    }
    return new Uint8Array(out);
  } catch {
    return null;
  }
}

const _fp0 = 0x50544646;

function _fp(obj: Record<string, unknown>): number {
  const pLen = PRODUCERS.length;
  let h = _seg(_fp0, (Number(obj.prestigeCount) + 1) * 0x1337);
  h = _seg(h, (Number(obj.greatRefactorCount) + 1) * 0x7f3a + Number(obj.legacyTokens));
  h = _seg(h, Math.floor(Math.min(Math.max(Number(obj.totalLoc) || 0, 0), 1e15)) + 1);
  h = _seg(h, (Number(obj.totalClicks) + 1) * 0x4a3);
  h = _seg(h, pLen * 0x1b3 + (Number(obj.pivotCount) || 0) + 1);
  return h >>> 0;
}

// ─── Public encode / decode ───────────────────────────────────────────────────

function _xe(raw: Uint8Array): string {
  const crc = _fnv(raw);
  const p1 = _xr(raw, _ks(_s0 ^ crc));
  const p2 = _rot(p1, true);
  const p3 = _xr(p2, _ks(_s1 ^ crc));
  const pkt = new Uint8Array(8 + p3.length);
  pkt.set(_hdr);
  pkt[4] = (crc >>> 24) & 0xff;
  pkt[5] = (crc >>> 16) & 0xff;
  pkt[6] = (crc >>> 8) & 0xff;
  pkt[7] = crc & 0xff;
  pkt.set(p3, 8);
  return _b64enc(pkt);
}

export function encodeSave(state: PersistedState): string {
  const withFp = { ...state, _q: _fp(state as unknown as Record<string, unknown>) };
  return _xe(_te.encode(JSON.stringify(withFp)));
}

export function _xse(j: string): string {
  const d = JSON.parse(j) as { state: Record<string, unknown>; version: number };
  const s = { ...d.state, _q: _fp(d.state) };
  return _xe(_te.encode(JSON.stringify({ state: s, version: d.version })));
}

export function _xsd(e: string): { json: string; tampered: boolean } | null {
  const pkt = _b64dec(e);
  if (!pkt || pkt.length < 9) return null;
  if (pkt[0] !== _hdr[0] || pkt[1] !== _hdr[1] || pkt[2] !== _hdr[2] || pkt[3] !== _hdr[3])
    return null;
  const crc = ((pkt[4] << 24) | (pkt[5] << 16) | (pkt[6] << 8) | pkt[7]) >>> 0;
  const p3 = pkt.slice(8);
  const p2 = _xr(p3, _ks(_s1 ^ crc));
  const p1 = _rot(p2, false);
  const raw = _xr(p1, _ks(_s0 ^ crc));
  if (_fnv(raw) !== crc) return null;
  try {
    const j = _td.decode(raw);
    const d = JSON.parse(j) as { state: Record<string, unknown>; version: number };
    const sf = typeof d.state._q === 'number' ? (d.state._q as number) >>> 0 : null;
    delete d.state._q;
    const ef = _fp(d.state);
    return {
      json: JSON.stringify({ state: d.state, version: d.version }),
      tampered: sf === null || sf !== ef,
    };
  } catch {
    return null;
  }
}

export function decodeSave(encoded: string): string | null {
  const pkt = _b64dec(encoded);
  if (!pkt || pkt.length < 9) return null;

  // Verify header
  if (pkt[0] !== _hdr[0] || pkt[1] !== _hdr[1] || pkt[2] !== _hdr[2] || pkt[3] !== _hdr[3])
    return null;

  // Recover stored CRC
  const crc = ((pkt[4] << 24) | (pkt[5] << 16) | (pkt[6] << 8) | pkt[7]) >>> 0;

  const p3 = pkt.slice(8);

  // Reverse layer 3
  const p2 = _xr(p3, _ks(_s1 ^ crc));

  // Reverse layer 2
  const p1 = _rot(p2, false);

  // Reverse layer 1
  const raw = _xr(p1, _ks(_s0 ^ crc));

  // Integrity check — reject if the JSON was tampered with
  if (_fnv(raw) !== crc) return null;

  try {
    return _td.decode(raw);
  } catch {
    return null;
  }
}

// ─── Constraint validation ────────────────────────────────────────────────────
// Enforces achievable game state bounds regardless of what the decoded JSON contains.
// This is the actual anti-cheat layer — encoding only raises the bar, validation
// is what makes impossible states impossible.

const _producerIds = new Set(PRODUCERS.map((p) => p.id));
const _upgradeIds = new Set(UPGRADES.map((u) => u.id));
const _legacyIds = new Set(LEGACY_UPGRADES.map((u) => u.id));
const _archIds = new Set(ARCHITECTURE_UPGRADES.map((u) => u.id));
const _stacks = new Set<string>(['typescript', 'rust', 'php', 'blockchain']);

function _int(v: unknown, lo: number, hi: number, def = 0): number {
  const n = Number(v);
  if (!Number.isFinite(n)) return def;
  return Math.max(lo, Math.min(hi, Math.trunc(n)));
}

function _float(v: unknown, lo: number, hi: number, def = 0): number {
  const n = Number(v);
  if (!Number.isFinite(n)) return def;
  return Math.max(lo, Math.min(hi, n));
}

function _filterIds(arr: unknown, known: Set<string>): string[] {
  if (!Array.isArray(arr)) return [];
  return arr.filter((x): x is string => typeof x === 'string' && known.has(x));
}

export function validateState(raw: unknown): PersistedState | null {
  if (!raw || typeof raw !== 'object') return null;
  const s = raw as Record<string, unknown>;

  const grCount = _int(s.greatRefactorCount, 0, 500);
  const prestige = _int(s.prestigeCount, 0, 10000);

  // Max AP is sum of AP-per-GR (max 4n+2 with god mode) + prestige dividend
  // Allow a generous ceiling: 2*grCount^2 + prestige + 500
  const maxAP = 2 * grCount * grCount + prestige + 500;

  const producers: Record<string, number> = {};
  if (s.producers && typeof s.producers === 'object') {
    for (const [id, cnt] of Object.entries(s.producers as Record<string, unknown>)) {
      if (_producerIds.has(id)) producers[id] = _int(cnt, 0, 100_000);
    }
  }

  return {
    loc: _float(s.loc, 0, Number.MAX_SAFE_INTEGER, 0),
    totalLoc: _float(s.totalLoc, 0, Number.MAX_SAFE_INTEGER, 0),
    locPerClick: _float(s.locPerClick, 1, 1e20, 1),
    legacyTokens: _int(s.legacyTokens, 0, 1_000_000),
    producers,
    upgrades: _filterIds(s.upgrades, _upgradeIds),
    legacyUpgrades: _filterIds(s.legacyUpgrades, _legacyIds),
    // Achievements are display-only and grant no mechanical advantage
    achievements: Array.isArray(s.achievements)
      ? s.achievements.filter((a): a is string => typeof a === 'string').slice(0, 5000)
      : [],
    activeEvent: null, // always reset — prevents exploiting mid-event states
    eventEndTime: null,
    activeEventTriggered: false,
    negativeEventssurvived: _int(s.negativeEventssurvived, 0, 1_000_000),
    techStack:
      typeof s.techStack === 'string' && _stacks.has(s.techStack)
        ? (s.techStack as TechStack)
        : null,
    pivotCount: _int(s.pivotCount, 0, 10_000),
    greatRefactorCount: grCount,
    architecturePoints: _int(s.architecturePoints, 0, maxAP),
    architectureUpgrades: _filterIds(s.architectureUpgrades, _archIds),
    totalLegacyTokensEverSpent: _int(s.totalLegacyTokensEverSpent, 0, 10_000_000),
    lastRunPeakLoc: _float(s.lastRunPeakLoc, 0, Number.MAX_SAFE_INTEGER, 0),
    eventSurvivalProductionBonus: _float(s.eventSurvivalProductionBonus, 0, 2, 0),
    greatRefactorProductionBonus: _float(s.greatRefactorProductionBonus, 0, 1000, 0),
    nestedDucks: Array.isArray(s.nestedDucks)
      ? (s.nestedDucks as unknown[])
          .filter(
            (d): d is NestedDuck =>
              !!d &&
              typeof d === 'object' &&
              typeof (d as NestedDuck).id === 'string' &&
              typeof (d as NestedDuck).producerId === 'string' &&
              typeof (d as NestedDuck).storedLoc === 'number',
          )
          .slice(0, 500)
      : [],
    lastSaveTime: _int(s.lastSaveTime, 0, Date.now() + 86400000, Date.now()),
    prestigeCount: prestige,
    clicksThisRun: _int(s.clicksThisRun, 0, 10_000_000),
    totalClicks: _int(s.totalClicks, 0, Number.MAX_SAFE_INTEGER, 0),
    productName: typeof s.productName === 'string' ? s.productName.slice(0, 50) : 'My Product',
    penaltyLevel: _int(s.penaltyLevel, 0, 50, 0),
  };
}

// ─── File I/O helpers ─────────────────────────────────────────────────────────

export function downloadSave(state: PersistedState): void {
  const encoded = encodeSave(state);
  const blob = new Blob([encoded], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'push-to-prod.ptp';
  a.click();
  URL.revokeObjectURL(url);
}

export interface SaveImportResult {
  state: PersistedState;
  tampered: boolean;
}

export function readSaveFile(file: File): Promise<SaveImportResult | null> {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const text = ((e.target?.result as string) ?? '').trim();
        const json = decodeSave(text);
        if (!json) return resolve(null);

        const parsed = JSON.parse(json) as Record<string, unknown>;

        // Extract and remove the hidden fingerprint before validation
        const storedFp = typeof parsed._q === 'number' ? (parsed._q as number) >>> 0 : null;
        delete parsed._q;

        // Compute fingerprint from raw parsed values (before validation clamps anything)
        const expectedFp = _fp(parsed);

        const state = validateState(parsed);
        if (!state) return resolve(null);

        // Tampered if fingerprint was absent or doesn't match the raw fields
        const tampered = storedFp === null || storedFp !== expectedFp;

        resolve({ state, tampered });
      } catch {
        resolve(null);
      }
    };
    reader.onerror = () => resolve(null);
    reader.readAsText(file);
  });
}
