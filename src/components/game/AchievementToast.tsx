import { useEffect, useState } from 'react';
import { type ToastNotification, useGameStore } from '@/store/gameStore';

function Toast({
  toast,
  onDismiss,
}: {
  toast: ToastNotification;
  onDismiss: (id: string) => void;
}) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      setTimeout(() => onDismiss(toast.id), 300);
    }, 4000);
    return () => clearTimeout(timer);
  }, [toast.id, onDismiss]);

  return (
    <div
      className={`
        flex items-start gap-3 p-3 rounded-md border border-gh-border bg-gh-surface
        shadow-lg font-mono text-sm
        transition-all duration-300
        ${visible ? 'animate-[toastIn_0.3s_ease-out] opacity-100' : 'opacity-0 translate-x-full'}
        max-w-xs w-full
      `}
    >
      {/* GitHub notification dot */}
      <div className="relative shrink-0 mt-0.5">
        <span className="text-xl leading-none">{toast.icon}</span>
        <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-gh-blue rounded-full border-2 border-gh-surface" />
      </div>

      <div className="min-w-0 flex-1">
        <div className="text-[10px] text-gh-muted mb-0.5 flex items-center gap-1">
          <span>🏆</span>
          <span>Achievement unlocked</span>
        </div>
        <div className="font-bold text-gh-text text-xs">{toast.name}</div>
        <div className="text-gh-muted text-[11px] leading-tight mt-0.5">{toast.description}</div>
      </div>
    </div>
  );
}

export function AchievementToast() {
  const toastQueue = useGameStore((s) => s.toastQueue);
  const dismissToast = useGameStore((s) => s.dismissToast);

  // Show last 3 toasts
  const visibleToasts = toastQueue.slice(-3);

  if (visibleToasts.length === 0) return null;

  return (
    <div className="fixed bottom-4 right-4 flex flex-col gap-2 z-50 pointer-events-none">
      {visibleToasts.map((toast) => (
        <div key={toast.id} className="pointer-events-auto">
          <Toast toast={toast} onDismiss={dismissToast} />
        </div>
      ))}
    </div>
  );
}
