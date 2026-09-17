"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import styles from "./LocationsCovered.module.scss";
import Container from "@mui/material/Container";
import { Chip, Typography } from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import perthLocations from "@/data/perth-locations.json";

const DEFAULT_CENTER = perthLocations.center;
const DEFAULT_ZOOM = 10;
const MAP_TILE_URL =
  "/api/map-tiles/{z}/{x}/{y}{r}";

const LOCATION_COORDINATES = Object.fromEntries(
  perthLocations.locations.map(({ label, coordinates }) => [label, coordinates])
);

function getLocationLabel(location) {
  if (typeof location === "string") return location;
  return location?.label || location?.location || location?.title || "";
}

function getNumericCoordinate(...values) {
  for (const value of values) {
    if (value == null || value === "") continue;
    const number = Number(value);
    if (Number.isFinite(number)) return number;
  }

  return null;
}

function getLocationCoordinates(location, label) {
  if (Array.isArray(location?.coordinates) && location.coordinates.length >= 2) {
    const lat = getNumericCoordinate(location.coordinates[0]);
    const lng = getNumericCoordinate(location.coordinates[1]);
    if (lat !== null && lng !== null) return [lat, lng];
  }

  const lat = getNumericCoordinate(
    location?.lat,
    location?.latitude,
    location?.location_lat,
    location?.location?.lat,
    location?.location?.latitude
  );
  const lng = getNumericCoordinate(
    location?.lng,
    location?.longitude,
    location?.location_lng,
    location?.location?.lng,
    location?.location?.longitude
  );

  if (lat !== null && lng !== null) return [lat, lng];

  return LOCATION_COORDINATES[label] || null;
}

function stripHtml(html = "") {
  return String(html).replace(/<[^>]*>/g, "").trim();
}

export default function LocationsCovered({
  title,
  description,
  locations,
}) {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markersRef = useRef([]);
  const [activeLocation, setActiveLocation] = useState("");
  const [mapError, setMapError] = useState("");

  const locationItems = useMemo(() => {
    const itemsByLabel = new Map();

    (locations || []).forEach((location) => {
      const label = getLocationLabel(location).trim();
      if (!label || itemsByLabel.has(label)) return;

      itemsByLabel.set(label, {
        label,
        coordinates: getLocationCoordinates(location, label),
      });
    });

    return Array.from(itemsByLabel.values());
  }, [locations]);

  const locationLabels = useMemo(
    () => locationItems.map((location) => location.label),
    [locationItems]
  );

  const titleText = stripHtml(title);
  const hasHtmlTitle = typeof title === "string" && /<\/?[a-z][\s\S]*>/i.test(title);
  const hasHtmlDescription =
    typeof description === "string" && /<\/?[a-z][\s\S]*>/i.test(description);

  useEffect(() => {
    let cancelled = false;
    let map;

    async function initMap() {
      setMapError("");
      try {
        const leaflet = await import("leaflet");
        if (cancelled || !mapRef.current) return;

        map = leaflet.map(mapRef.current, {
          center: locationItems.find((location) => location.coordinates)
            ?.coordinates || DEFAULT_CENTER,
          zoom: DEFAULT_ZOOM,
          zoomControl: true,
          scrollWheelZoom: false,
        });

        leaflet
          .tileLayer(MAP_TILE_URL, {
            attribution:
              '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
            maxZoom: 19,
          })
          .on("tileerror", () => {
            if (!cancelled) setMapError("Map tiles could not be loaded. Please try again later.");
          })
          .addTo(map);

        const markerIcon = leaflet.divIcon({
          className: styles.marker,
          html: "<span></span>",
          iconSize: [22, 22],
          iconAnchor: [11, 11],
        });
        mapInstanceRef.current = map;

        if (!locationLabels.length) return;

        const nextMarkers = [];
        const bounds = [];

        locationItems.forEach(({ label, coordinates }) => {
          if (!coordinates) return;

          const marker = leaflet
            .marker(coordinates, {
              icon: markerIcon,
              title: label,
            })
            .addTo(map)
            .bindPopup(label);

          marker.on("click", () => {
            setActiveLocation(label);
            map.flyTo(coordinates, 13, { duration: 0.55 });
          });

          bounds.push(coordinates);
          nextMarkers.push(marker);
        });

        markersRef.current = nextMarkers;

        if (bounds.length > 1) {
          map.fitBounds(bounds, { padding: [36, 36] });
        } else if (bounds.length === 1) {
          map.setView(bounds[0], 13);
        }
      } catch {
        setMapError("Map failed to load.");
      }
    }

    initMap();

    return () => {
      cancelled = true;
      markersRef.current = [];
      if (map) {
        map.remove();
      }
    };
  }, [locationItems]);

  const handleLocationClick = (label) => {
    setActiveLocation(label);
    const marker = markersRef.current.find(
      (item) => item.options?.title === label
    );
    const map = mapInstanceRef.current;

    if (!marker || !map) return;

    map.flyTo(marker.getLatLng(), 13, { duration: 0.55 });
    marker.openPopup();
  };

  return (
    <section className={`${styles.section}`}>
      <Container maxWidth="lg" className={styles.container}>
        <div className={`${styles.contentWrapper}`}>
          {hasHtmlTitle ? (
            <div
              className={`${styles.title} heading-2 `}
              dangerouslySetInnerHTML={{ __html: title }}
            />
          ) : (
            <Typography variant="h3" component="h2" className={styles.title}>
              {title}
            </Typography>
          )}

          {hasHtmlDescription ? (
            <div
              className={`body1 mt-16`}
              dangerouslySetInnerHTML={{ __html: description }}
            />
          ) : (
            <Typography
              variant="body1"
              component="p"
              className={`${styles.description} mt-16`}
            >
              {description}
            </Typography>
          )}

          <ul className={`${styles.locationsWrapper} mt-16`}>
            {locationLabels.map((label) => (
              <li key={label}>
                <Chip
                  icon={<LocationOnIcon fontSize="small" />}
                  label={label}
                  onClick={() => handleLocationClick(label)}
                  className={`${styles.locationChip} ${
                    activeLocation === label ? styles.active : ""
                  }`}
                />
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.mapPanel}>
          <div
            ref={mapRef}
            className={styles.map}
            aria-label={`${titleText || "Areas covered"} map`}
          />
          {mapError && (
            <Typography variant="body2" className={styles.mapError}>
              {mapError}
            </Typography>
          )}
        </div>
      </Container>
    </section>
  );
}
