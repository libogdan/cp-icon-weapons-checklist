import { useCallback, useEffect, useState } from "react";
import { ALL_WEAPONS } from "../data/weapons";

const STORAGE_KEY = "cp2077-iconics-v1";
const VALID_IDS = new Set(ALL_WEAPONS.map((w) => w.id));

function load(): Set<string> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return new Set();
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return new Set();
    return new Set(parsed.filter((id): id is string => typeof id === "string" && VALID_IDS.has(id)));
  } catch {
    return new Set();
  }
}

/** Tracks which weapons the player owns, persisted to localStorage. */
export function useOwned() {
  const [owned, setOwned] = useState<Set<string>>(load);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify([...owned]));
    } catch {
      // Storage full or blocked (e.g. private mode): progress just won't persist.
    }
  }, [owned]);

  // Keep multiple open tabs in sync.
  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY) setOwned(load());
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const toggle = useCallback((id: string, value: boolean) => {
    setOwned((prev) => {
      const next = new Set(prev);
      if (value) next.add(id);
      else next.delete(id);
      return next;
    });
  }, []);

  const reset = useCallback(() => setOwned(new Set()), []);

  const exportCode = useCallback(() => JSON.stringify([...owned]), [owned]);

  /** Returns the number of weapons restored, or null if the code is invalid. */
  const importCode = useCallback((code: string): number | null => {
    try {
      const parsed: unknown = JSON.parse(code);
      if (!Array.isArray(parsed)) return null;
      const next = new Set(parsed.filter((id): id is string => typeof id === "string" && VALID_IDS.has(id)));
      setOwned(next);
      return next.size;
    } catch {
      return null;
    }
  }, []);

  return { owned, toggle, reset, exportCode, importCode };
}
