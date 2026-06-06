"use client";

import { useEffect } from "react";
import { loadGoogleMapsPlaces } from "./loadGoogleMapsPlaces";

export default function GoogleMapsLoader({ onLoad }) {
  useEffect(() => {
    if (window.google && window.google.maps && window.google.maps.places) {
      onLoad();
    }
  }, [onLoad]);

  useEffect(() => {
    loadGoogleMapsPlaces().then(onLoad).catch(() => {});
  }, [onLoad]);

  return null;
}
