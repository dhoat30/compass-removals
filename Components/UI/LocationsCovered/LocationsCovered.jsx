"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import styles from "./LocationsCovered.module.scss";
import Container from "@mui/material/Container";
import { Chip, Typography } from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";

const DEFAULT_CENTER = [-34.9285, 138.6007];
const DEFAULT_ZOOM = 10;
const MAP_TILE_URL =
  "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png";

const LOCATION_COORDINATES = {
  "Adelaide CBD": [-34.9285, 138.6007],
  "North Adelaide": [-34.9078, 138.5947],
  Norwood: [-34.9211, 138.6366],
  Burnside: [-34.9395, 138.6601],
  Campbelltown: [-34.8839, 138.6631],
  Prospect: [-34.8846, 138.5933],
  "Mawson Lakes": [-34.8159, 138.6195],
  Salisbury: [-34.7677, 138.6086],
  Elizabeth: [-34.7194, 138.6771],
  "Golden Grove": [-34.7906, 138.6949],
  "Henley Beach": [-34.9203, 138.4943],
  Glenelg: [-34.9803, 138.5169],
  Brighton: [-35.0183, 138.5236],
  "West Lakes": [-34.8727, 138.4905],
  Unley: [-34.9506, 138.6077],
  Mitcham: [-34.978, 138.6218],
  Blackwood: [-35.0217, 138.6142],
  "Morphett Vale": [-35.1217, 138.5233],
  Seaford: [-35.1891, 138.4765],
  "Port Adelaide": [-34.846, 138.503],
  Stirling: [-35.0067, 138.7177],
  Hahndorf: [-35.0288, 138.8118],
  "Mount Barker": [-35.0644, 138.8587],
  Gawler: [-34.5986, 138.749],
  Tanunda: [-34.5232, 138.9595],
  "McLaren Vale": [-35.2188, 138.5433],
};

function getLocationLabel(location) {
  if (typeof location === "string") return location;
  return location?.label || location?.location || location?.title || "";
}

function getNumericCoordinate(...values) {
  for (const value of values) {
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
