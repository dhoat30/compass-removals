"use client";

import { useEffect } from "react";
import { initClickIdsOnce } from "@/utils/clickIds"; // from our earlier helper

export default function TrackingPersistence() {
  useEffect(() => {
    // Capture gclid, gbraid, fbclid, etc. from URL or cookies once
    initClickIdsOnce();
  }, []);

  return null; // nothing to render
}
