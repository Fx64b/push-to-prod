import { useEffect, useState } from 'react';
import { useGameStore } from '@/store/gameStore';
import { X } from 'lucide-react';

export function EventBanner() {
  const activeEvent = useGameStore(s => s.activeEvent);
  const eventEndTime = useGameStore(s => s.eventEndTime);
  const dismissEvent = useGameStore(s => s.dismissEvent);
  const [timeLeft, setTimeLeft] = useState(0);

  useEffect(() => {
    if (!eventEndTime) return;

    const update = () => {
      const remaining = Math.max(0, (eventEndTime - Date.now()) / 1000);
      setTimeLeft(remaining);
    };

    update();
    const interval = setInterval(update, 500);
    return () => clearInterval(interval);
  }, [eventEndTime]);

  if (!activeEvent) return null;

  const barColor = activeEvent.isNegative ? 'border-gh-red' : 'border-gh-green';
  const bgColor = activeEvent.isNegative ? 'bg-gh-red/5' : 'bg-gh-green/5';
  const timeColor = activeEvent.isNegative ? 'text-gh-red' : 'text-gh-green';
  const progressPercent = eventEndTime
    ? Math.max(0, ((eventEndTime - Date.now()) / (activeEvent.duration * 1000)) * 100)
    : 0;

  return (
    <div
      className={`
        relative border-l-4 ${barColor} ${bgColor}
        border border-gh-border rounded-r-md px-4 py-3
        font-mono text-sm animate-[toastIn_0.3s_ease-out]
        overflow-hidden
      `}
    >
      {/* Progress bar at bottom */}
      <div className="absolute bottom-0 left-0 h-0.5 bg-gh-border w-full">
        <div
          className={`h-full ${activeEvent.isNegative ? 'bg-gh-red' : 'bg-gh-green'} transition-all duration-500`}
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          {/* Slack-style header */}
          <div className="flex items-center gap-2 mb-1">
            <span className="text-gh-muted text-xs">#incidents</span>
            <span className="text-gh-muted text-xs">·</span>
            <span className="text-gh-muted text-xs">just now</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-lg leading-none">{activeEvent.emoji}</span>
            <span className="font-bold text-gh-text">{activeEvent.title}</span>
          </div>
          <p className="text-gh-muted text-xs mt-0.5">{activeEvent.description}</p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <span className={`text-xs font-bold tabular-nums ${timeColor}`}>
            {Math.ceil(timeLeft)}s
          </span>
          <button
            onClick={dismissEvent}
            className="text-gh-muted hover:text-gh-text transition-colors p-0.5"
            aria-label="Dismiss event"
          >
            <X size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}
