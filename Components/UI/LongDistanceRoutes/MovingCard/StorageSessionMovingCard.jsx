"use client";

import React from "react";
import MovingCard from "./MovingCard";
import GoogleRouteMap from "../../Map/GoogleRouteMap/GoogleRouteMap";
import { useRouteCard } from "@/hooks/useRouteCard";

export default function StorageSessionMovingCard({routeId}) {
  const { data, loaded, fromLabel, toLabel } = useRouteCard(routeId);

  if (!loaded) return null;        // or a Skeleton
  if (!data) return null;          // nothing to show

  return (
    <>
      <MovingCard
        movingFrom={data.movingFrom}
        movingTo={data.movingTo}
        spareCapacity={data.spareCapacity}
        status={data.status}
        description={data.description}
        attributes={data.attributes}
        disableHoverEffect
        disableLinkBehavior
      />

      {/* Works whether movingFrom is a string or {label,...} */}
      <GoogleRouteMap
        from={fromLabel}
        to={toLabel}
        height={500}
        className="mt-16"
      />
    </>
  );
}
