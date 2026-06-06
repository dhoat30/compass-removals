'use client'
import React from "react";
import styles from "./MovingCard.module.scss";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import LongArrowIcon from "../../Icons/LongArrowIcon";
import OneHelper from "../../Icons/OneHelper";
import TwoHelpers from "../../Icons/TwoHelpers";
import ThreeHelpers from "../../Icons/ThreeHelpers";
import FourHelpers from "../../Icons/FourHelpers";
import FiveHelpers from "../../Icons/FiveHelpers";
import Truck35 from "../../Icons/Truck35";
import Truck45 from "../../Icons/Truck45";
import Truck55 from "../../Icons/Truck55";
import CalendarIcon from "../../Icons/CalendarIcon";
import { useRouter, useSearchParams } from "next/navigation";
import formatDate from "@/utils/formatDate";
export default function MovingCard({
  movingFrom,
  movingTo,
  spareCapacity,
  status,
  description,
  attributes,
  disableHoverEffect, 
  disableLinkBehavior
}) {
  if (!movingFrom || !movingTo || !attributes) return null;
  let truckSizeIcon, numberOfMoversIcon, formattedDate;

  const router = useRouter();
  const sp = new URLSearchParams(useSearchParams()?.toString() ?? "");

const cardClickHandler = () => {

  const id = crypto.randomUUID();
 // Persist the full object for this tab/session
  sessionStorage.setItem(`routeCard:${id}`, JSON.stringify({
      movingFrom,
  movingTo,
  spareCapacity,
  status,
  description,
  attributes,
  }));

  // Keep UTMs/gclid, add only lightweight params for prefill
  sp.set("routeId", id);


  router.push(`/long-distance-route-quote?${sp.toString()}`);
}

    // date formatting logic
    if (attributes?.date_type === "fixed") {
       formattedDate = formatDate(attributes.fixed_date);
    } 
    else  if (attributes?.date_type === "date_range") {
       formattedDate = `${formatDate(attributes.start_date)} to ${formatDate(attributes.end_date)}`;
    } 

  if (attributes?.number_of_movers === "1") {
    numberOfMoversIcon = <OneHelper />;
  } else if (attributes?.number_of_movers === "2") {
    numberOfMoversIcon = <TwoHelpers />;
  }
  else if (attributes?.number_of_movers === "3") {
    numberOfMoversIcon = <ThreeHelpers />;
  }
    else if (attributes?.number_of_movers === "4") {
    numberOfMoversIcon = <FourHelpers    />;
  }
  else if (attributes?.number_of_movers >= "5") {
    numberOfMoversIcon = <FiveHelpers />;
  }

//   truck size icon logic 
if (attributes?.truck_size === "35") {
    truckSizeIcon = <Truck35 />;
}
if (attributes?.truck_size === "45") {
    truckSizeIcon = <Truck45 />;
}
if (attributes?.truck_size === "55") {
    truckSizeIcon = <Truck55 />;
}

  return (
  
    <Paper className={`${styles.card} border-radius-12 ${disableHoverEffect ? styles.cardHoverDisabled : null}`} elevation={0} variant="outlined" onClick={disableLinkBehavior ? null : cardClickHandler}>
      <div className={`${styles.chipsWrapper} flex gap-8 flex-wrap`}>
        <Typography
          variant="subtitle2"
          component="div"
          className={`${styles.statusChip}`}
        >
          {status}
        </Typography>
        <Typography
          variant="subtitle2"
          component="div"
          className={`${styles.spareCapacityChip}`}
        >
          {spareCapacity} m³ left
        </Typography>
      </div>
      <Typography
        color="#003671"
        variant="h6"
        component="h2"
        className={`${styles.routeTitle} mt-8 flex flex-wrap align-center`}
      >
        <span>{movingFrom.label}</span>{" "}
        <LongArrowIcon className={`${styles.arrowIcon}`} />{" "}
        <span>{movingTo.label}</span>
      </Typography>

      <div className={`${styles.attributesWrapper} flex gap-16 mt-8 flex-wrap`}>
          <div className={`${styles.dateWrapper} flex gap-4 align-center`}>
            <CalendarIcon/> 
          <Typography
            variant="subtitle1"
            component="div"
            className={`${styles.attribute}`}
            color={"var(--light-secondary)"}
            sx={{fontSize: "1.1rem", fontWeight: 600}}
          >
            {formattedDate} 
          </Typography>
        </div>

        <div className={`${styles.moversWrapper} flex gap-4 align-center`}>
          {numberOfMoversIcon}
          <Typography
            variant="subtitle1"
            component="div"
            className={`${styles.attribute}`}
            color={"var(--light-secondary)"}
            sx={{fontSize: "1.1rem", fontWeight: 600}}
          >
            {attributes.number_of_movers} Movers
          </Typography>
        </div>

          <div className={`${styles.truckSizeWrapper} flex gap-4 align-center`}>
          {truckSizeIcon}
          <Typography
            variant="subtitle1"
            component="div"
            className={`${styles.attribute}`}
            color={"var(--light-secondary)"}
            sx={{fontSize: "1.1rem", fontWeight: 600}}
          >
            {attributes.truck_size} m³
          </Typography>
        </div>
      
      </div>

      <Typography
        variant="body1"
        component="p"
        className={`${styles.routeTitle} mt-8 flex flex-wrap align-center`}
      >
        {description}
      </Typography>
    </Paper>
  );
}


