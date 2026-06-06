'use client'
import React, { useMemo, useState, useEffect, useCallback, startTransition } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Container from '@mui/material/Container'; 
import Typography from '@mui/material/Typography';
import styles from './LongDistanceRoutes.module.scss';
import MovingCard from './MovingCard/MovingCard';
import dayjs from '@/utils/dayjs-setup'
import FiltersBar from "./FiltersBar";
import EmptyStateNoRoutes from "./EmptyStateNoRoutes/EmptyStateNoRoutes";
// match city object 
function matchesCityObj(cardCityObj, selectedCityObj) {
  if (!selectedCityObj) return true; // no filter applied
  return cardCityObj?.value === selectedCityObj?.value;
}



// main function 
export default function LongDistanceRoutes({longDistanceRoutesData = [], initialFilters, nzCitiesData }) {
  console.log(longDistanceRoutesData)
 const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams(); // keeps up with back/forward
  // Rebuild option objects from value strings
  const pickCityByValue = useCallback(
    (v) => (v ? nzCitiesData.find(c => c.value === v) || null : null),
    [nzCitiesData]
  );

  // 🔽 parent owns the filters
 // State from server-provided initial filters
const [movingFrom, setMovingFrom]   = useState(pickCityByValue(initialFilters?.from));
  const [movingTo, setMovingTo]       = useState(pickCityByValue(initialFilters?.to));
  const [selectedDate, setSelectedDate] = useState(
    initialFilters?.date ? dayjs(initialFilters.date, "YYYY-MM-DD", true) : null
  );

  // Helper: write filters to URL (replace, no scroll)
  const updateUrl = useCallback((next) => {
    const params = new URLSearchParams(searchParams?.toString() || "");

    const setOrDel = (key, val) => {
      if (val == null || val === "") params.delete(key);
      else params.set(key, val);
    };

    setOrDel("from", next.movingFrom ? next.movingFrom.value : null);
    setOrDel("to",   next.movingTo   ? next.movingTo.value   : null);
    setOrDel("date", next.selectedDate ? next.selectedDate.format("YYYY-MM-DD") : null);

    const qs = params.toString();
    startTransition(() => {
      router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
    });
  }, [router, pathname, searchParams]);

  // Whenever filters change, sync URL
  useEffect(() => {
    updateUrl({ movingFrom, movingTo, selectedDate });
  }, [movingFrom, movingTo, selectedDate, updateUrl]);

// empty state handlers 
  const handleResetFilters = () => {
  setMovingFrom(null);
  setMovingTo(null);
  setSelectedDate(null);
};

const handleShowAll = () => {
  // clear filters but keep URL tidy
  handleResetFilters();
};

//   filter data 
  const filteredData = useMemo(() => {
    return longDistanceRoutesData.filter(
      (item) =>
        matchesCityObj(item.moving_from, movingFrom) &&
        matchesCityObj(item.moving_to, movingTo) &&
    matchesDate(item.attributes, selectedDate)
    );
  }, [longDistanceRoutesData, movingFrom, movingTo, selectedDate]);

  return (
 <section className={styles.section}> 
    <Container maxWidth="xl"> 
        <div className={`${styles.titleFilterWrapper} grid gap-24`}>
            <Typography variant="h2" component="h1" >
                Long Distance Moves
            </Typography>
         <FiltersBar  movingFrom={movingFrom}
            setMovingFrom={setMovingFrom}
            movingTo={movingTo}
            setMovingTo={setMovingTo}
            dateValue={selectedDate}
            setDateValue={setSelectedDate}
            nzCitiesData={nzCitiesData}/>  
        </div>
        <div className={`${styles.movingCardsWrapper} grid gap-16 mt-32`}>
            { filteredData.length > 0 && (
                  filteredData.map((item, index) => (
            <MovingCard
              key={index}
              movingFrom={item.moving_from}
              movingTo={item.moving_to}
              spareCapacity={item.highlighted_chips?.spare_capacity}
              status={item.highlighted_chips?.status}
              description={item.description}
              attributes={item.attributes}
            />
          ))
            ) 
            }
            </div>
            { filteredData.length === 0 && (
              <EmptyStateNoRoutes
                onReset={handleResetFilters}
                onShowAll={handleShowAll}
              />
            )}
     

    </Container>

 </section>
   
  )
}


const DEBUG = false; // flip to true to see why a card did/didn’t match

// Parse lots of formats safely and normalize to startOf('day')
function parseDateFlexible(input) {
  if (!input) return null;

  // allow numbers (timestamps) and Date objects
  if (typeof input === "number" || input instanceof Date) {
    const d = dayjs(input).startOf("day");
    return d.isValid() ? d : null;
  }

  const s = String(input).trim().replace(/\u00A0/g, " "); // normalize nbsp

  // Try in order: D/M/Y, D MMM Y, ISO
  const tryFormats = [
    "DD/MM/YYYY",
    "D/M/YYYY",
    "DD MMM YYYY",
    "D MMM YYYY",
    "YYYY-MM-DD",
  ];

  for (const fmt of tryFormats) {
    const d = fmt.includes("M") || fmt.includes("D")
      ? dayjs(s, fmt, true)
      : dayjs(s);
    if (d.isValid()) return d.startOf("day");
  }

  // Final fallback: let dayjs guess
  const g = dayjs(s);
  return g.isValid() ? g.startOf("day") : null;
}

export function matchesDate(attributes, selectedDate) {
  if (!selectedDate) return true;

  const sel = (selectedDate.startOf ? selectedDate : dayjs(selectedDate)).startOf("day");
  if (!sel.isValid()) return true; // don’t exclude everything if filter is bad

  const type = attributes?.date_type;
  if (type === "fixed") {
    const d = parseDateFlexible(attributes?.fixed_date);
    const ok = !!d && d.valueOf() === sel.valueOf();
    if (DEBUG) console.log("[fixed]", attributes?.fixed_date, "→", d?.format("DD/MM/YYYY"), "match:", ok);
    return ok;
  }

  if (type === "date_range") {
    // 🔁 Adjust these to your real keys
    const startRaw =
      attributes?.start_date ||
      attributes?.range_start ||
      attributes?.from_date ||
      attributes?.date_from ||
      attributes?.start;

    const endRaw =
      attributes?.end_date ||
      attributes?.range_end ||
      attributes?.to_date ||
      attributes?.date_to ||
      attributes?.end;

    // If your CMS stores the whole range in one string like "10/11/2025 - 20/11/2025"
    let start = parseDateFlexible(startRaw);
    let end = parseDateFlexible(endRaw);

    if (!start && !end && typeof attributes?.date_range === "string") {
      const parts = attributes.date_range.split(/to|–|-|—/i).map(s => s.trim());
      if (parts.length === 2) {
        start = parseDateFlexible(parts[0]);
        end = parseDateFlexible(parts[1]);
      }
    }

    if (!start || !end) {
      if (DEBUG) console.log("[range] invalid start/end", { startRaw, endRaw, parsedStart: start?.toISOString?.(), parsedEnd: end?.toISOString?.() });
      return false;
    }

    // Ensure start <= end; if flipped, swap
    if (end.isBefore(start)) [start, end] = [end, start];

    const selTs = sel.valueOf();
    const ok = selTs >= start.valueOf() && selTs <= end.valueOf(); // inclusive
    if (DEBUG) console.log("[range]", start.format("DD/MM/YYYY"), "→", end.format("DD/MM/YYYY"), "sel:", sel.format("DD/MM/YYYY"), "match:", ok);
    return ok;
  }

  // Unknown type → don’t include
  if (DEBUG) console.log("[unknown type]", type, attributes);
  return false;
}