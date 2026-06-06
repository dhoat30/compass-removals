"use client";

let googleMapsPlacesPromise;

export function loadGoogleMapsPlaces() {
  if (typeof window === "undefined") return Promise.resolve(false);

  if (window.google?.maps?.places) {
    window.dispatchEvent(new Event("gmaps-ready"));
    return Promise.resolve(true);
  }

  if (googleMapsPlacesPromise) return googleMapsPlacesPromise;

  googleMapsPlacesPromise = new Promise((resolve, reject) => {
    const existingScript = document.getElementById("google-maps-places");

    const handleReady = () => {
      window.dispatchEvent(new Event("gmaps-ready"));
      resolve(true);
    };

    if (existingScript) {
      existingScript.addEventListener("load", handleReady, { once: true });
      existingScript.addEventListener("error", reject, { once: true });
      return;
    }

    const script = document.createElement("script");
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

    script.id = "google-maps-places";
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&v=weekly&libraries=places`;
    script.async = true;
    script.defer = true;
    script.onload = handleReady;
    script.onerror = reject;

    document.head.appendChild(script);
  });

  return googleMapsPlacesPromise;
}
