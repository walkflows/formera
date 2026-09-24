"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { properties } from "@/lib/data/properties";

const STORAGE_KEY = "formera.savedProperties";

interface SavedPropertiesContextValue {
  savedIds: string[];
  isSaved: (id: string) => boolean;
  toggleSaved: (id: string) => void;
  removeSaved: (id: string) => void;
  clearSaved: () => void;
  hydrated: boolean;
  persistent: boolean;
}

const SavedPropertiesContext = createContext<SavedPropertiesContextValue | null>(
  null
);

function readStorage(): { ids: string[]; persistent: boolean } {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    const ids = raw ? (JSON.parse(raw) as unknown) : [];
    const validIds = new Set(properties.map((p) => p.id));
    const clean = Array.isArray(ids)
      ? ids.filter((id): id is string => typeof id === "string" && validIds.has(id))
      : [];
    return { ids: clean, persistent: true };
  } catch {
    return { ids: [], persistent: false };
  }
}

export function SavedPropertiesProvider({ children }: { children: React.ReactNode }) {
  const [savedIds, setSavedIds] = useState<string[]>([]);
  const [hydrated, setHydrated] = useState(false);
  const [persistent, setPersistent] = useState(true);

  // Hydrate from localStorage after mount only, so server and first client
  // render markup match and there is no flash of mismatched saved state.
  useEffect(() => {
    /* eslint-disable react-hooks/set-state-in-effect */
    const { ids, persistent: canPersist } = readStorage();
    setSavedIds(ids);
    setPersistent(canPersist);
    setHydrated(true);
    /* eslint-enable react-hooks/set-state-in-effect */
  }, []);

  const persist = useCallback((ids: string[]) => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
    } catch {
      // Storage unavailable (private browsing, quota, etc). Shortlist still
      // works for this visit; it just will not survive a refresh.
    }
  }, []);

  const toggleSaved = useCallback(
    (id: string) => {
      setSavedIds((prev) => {
        const next = prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id];
        persist(next);
        return next;
      });
    },
    [persist]
  );

  const removeSaved = useCallback(
    (id: string) => {
      setSavedIds((prev) => {
        const next = prev.filter((x) => x !== id);
        persist(next);
        return next;
      });
    },
    [persist]
  );

  const clearSaved = useCallback(() => {
    setSavedIds([]);
    persist([]);
  }, [persist]);

  const value = useMemo<SavedPropertiesContextValue>(
    () => ({
      savedIds,
      isSaved: (id: string) => savedIds.includes(id),
      toggleSaved,
      removeSaved,
      clearSaved,
      hydrated,
      persistent,
    }),
    [savedIds, toggleSaved, removeSaved, clearSaved, hydrated, persistent]
  );

  return (
    <SavedPropertiesContext.Provider value={value}>
      {children}
    </SavedPropertiesContext.Provider>
  );
}

export function useSavedProperties() {
  const ctx = useContext(SavedPropertiesContext);
  if (!ctx) {
    throw new Error("useSavedProperties must be used within SavedPropertiesProvider");
  }
  return ctx;
}
