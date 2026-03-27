import { useEffect, useState } from 'react';

interface ModifierKeys {
  ctrl: boolean;
  shift: boolean;
}

export function useModifierKeys(): ModifierKeys {
  const [keys, setKeys] = useState<ModifierKeys>({ ctrl: false, shift: false });

  useEffect(() => {
    const update = (e: KeyboardEvent) => {
      setKeys({ ctrl: e.ctrlKey, shift: e.shiftKey });
    };

    // Also reset on blur so held keys don't get stuck
    const reset = () => setKeys({ ctrl: false, shift: false });

    window.addEventListener('keydown', update);
    window.addEventListener('keyup', update);
    window.addEventListener('blur', reset);

    return () => {
      window.removeEventListener('keydown', update);
      window.removeEventListener('keyup', update);
      window.removeEventListener('blur', reset);
    };
  }, []);

  return keys;
}
