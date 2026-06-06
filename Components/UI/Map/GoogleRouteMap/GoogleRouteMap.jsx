"use client";

import React, { useEffect, useRef, useState } from "react";

export default function GoogleRouteMap({ from, to, height = 320, className }) {
  const elRef = useRef(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    let map = null;
    let directionsRenderer = null;
    let cancelled = false;

    const init = async () => {
      // wait until the global script is ready
      const waitForMaps = () =>
        new Promise((resolve, reject) => {
          let tries = 0;
          const t = setInterval(() => {
            if (window.google?.maps) {
              clearInterval(t);
              resolve();
            } else if (++tries > 100) {
              clearInterval(t);
              reject(new Error("Google Maps failed to load"));
            }
          }, 50);
        });

      try {
        await waitForMaps();
        if (cancelled || !elRef.current) return;

        map = new google.maps.Map(elRef.current, {
          center: { lat: -41, lng: 174 },
          zoom: 6,
          mapTypeControl: false,
          streetViewControl: false,
          fullscreenControl: false,
        });

        const geocoder = new google.maps.Geocoder();
        const [fromRes, toRes] = await Promise.all([
          geocoder.geocode({ address: from, region: "nz" }),
          geocoder.geocode({ address: to, region: "nz" }),
        ]);

        const fromLoc = fromRes?.results?.[0]?.geometry?.location;
        const toLoc = toRes?.results?.[0]?.geometry?.location;
        if (!fromLoc || !toLoc) { setError("Couldn’t geocode one or both addresses."); return; }

        new google.maps.Marker({ position: fromLoc, map, title: from, label: { text: "A", color: "#fff", fontWeight: "700" } });
        new google.maps.Marker({ position: toLoc, map, title: to, label: { text: "B", color: "#fff", fontWeight: "700" } });

        const bounds = new google.maps.LatLngBounds();
        bounds.extend(fromLoc); bounds.extend(toLoc);
        map.fitBounds(bounds);

        try {
          const directionsService = new google.maps.DirectionsService();
          directionsRenderer = new google.maps.DirectionsRenderer({
            map,
            suppressMarkers: true,
            polylineOptions: { strokeWeight: 5 },
            preserveViewport: true,
          });
          const result = await directionsService.route({
            origin: fromLoc,
            destination: toLoc,
            travelMode: google.maps.TravelMode.DRIVING,
          });
          directionsRenderer.setDirections(result);
        } catch {
          new google.maps.Polyline({ path: [fromLoc, toLoc], strokeOpacity: 0.7, strokeWeight: 4, map });
          setError("Showing approximate route only.");
        }
      } catch (e) {
        setError("Map failed to load.");
      }
    };

    init();
    return () => { cancelled = true; if (directionsRenderer) directionsRenderer.setMap(null); };
  }, [from, to]);

  return (
    <div>
      <div ref={elRef} className={className} style={{ width: "100%", height, borderRadius: 12, overflow: "hidden", background: "#f1f1f1" }} />
      {error && <div style={{ marginTop: 8, fontSize: 12, color: "#888" }}>{error}</div>}
    </div>
  );
}
