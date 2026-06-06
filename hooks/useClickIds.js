import { useEffect, useState, useRef } from "react";
import { ClickIds, initClickIdsOnce, readFromStorage, persist } from "@/utils/clickIds";

/**
 * Captures gclid/gbraid/wbraid on first mount, persists to localStorage,
 * and returns a stable object for use in forms and dataLayer pushes.
 */
export function useClickIds() {
  const [clickIds, setClickIds] = useState({});
  const [isReady, setIsReady] = useState(false);
  const inited = useRef(false);

  useEffect(() => {
    if (inited.current) return;
    inited.current = true;

    // Initialize from URL/cookie/storage once
    const ids = initClickIdsOnce();
    setClickIds(ids);
    setIsReady(true);
  }, []);

  // Optional: allow manual update/refresh (e.g., after a route change)
  const refresh = () => {
    const stored = readFromStorage();
    setClickIds(stored);
    setIsReady(true);
  };

  const setIds = (next) => {
    persist(next);
    setClickIds(next);
  };

  return { clickIds, isReady, refresh, setIds };
}
