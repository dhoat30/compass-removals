"use client";
import React from "react";
import styles from "./CalculatorUI.module.scss";
import Typography from "@mui/material/Typography";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Image from "next/image";
import LightlyFurnished from "@/Components/UI/Icons/LightlyFurnished";
import MediumFurnished from "@/Components/UI/Icons/MediumFurnished";
import HighlyFurnished from "@/Components/UI/Icons/HighlyFurnished";
import Slider from "@mui/material/Slider";
import Box from "@mui/material/Box";
import calculateSpaceNeeded from "@/utils/calcultation/calculateSpaceNeeded";
import Button from "@mui/material/Button";
import Link from "next/link";
export default function CalculatorUI({
  className,
  furnishedLevelData,
  calculatedValueLabel,
  
}) {
  const [brSize, setBrSize] = React.useState("3br");
  const [furnishedLevel, setFurnishedLevel] = React.useState(
    "moderatelyFurnished"
  );
  const [sliderValue, setSliderValue] = React.useState(20);
  const [hoursNeeded, setHoursNeeded] = React.useState(6.7);
  React.useEffect(() => {
    if (sliderValue === 10) {
      setFurnishedLevel("lightlyFurnished");
    }
    if (sliderValue === 20) {
      setFurnishedLevel("moderatelyFurnished");
    }
    if (sliderValue === 30) {
      setFurnishedLevel("highlyFurnished");
    }
  }, [sliderValue]);

  React.useEffect(() => {
    if (furnishedLevel === "lightlyFurnished") {
      setSliderValue(10);
    }
    if (furnishedLevel === "moderatelyFurnished") {
      setSliderValue(20);
    }
    if (furnishedLevel === "highlyFurnished") {
      setSliderValue(30);
    }
  }, [furnishedLevel]);

  React.useEffect(() => {
    const calculatedHours = calculateSpaceNeeded(brSize, furnishedLevel);
    setHoursNeeded(calculatedHours);
  }, [brSize, furnishedLevel]);

  const handleChange = (event) => {
    setBrSize(event.target.value);
  };

  const handleSliderChange = (event, newValue) => {
    setSliderValue(newValue);
  };

  const formControl = (
    <FormControl
      className={`${styles.formControl}`}
      variant="standard"
      sx={{
        m: 1,
        minWidth: 120,
        "& .MuiInput-underline:after": {
          borderBottomColor: "var(--light-primary)", // <- change this to your contrast color
        },
      }}
    >
      <Select
        className={styles.select}
        value={brSize || "3br"}
        onChange={handleChange}
        label="Number of bedrooms"
        displayEmpty
        inputProps={{ "aria-label": "Without label" }}
        MenuProps={{
          PaperProps: {
            sx: {
              backgroundColor: "var(--dark-inverse-primary)",
              "& .MuiList-root": {
                backgroundColor: "var(--dark-inverse-primary)",
              },
              "& .MuiMenuItem-root": {
                color: "#ffffff", // text color

                "&.Mui-selected": {
                  color: "#ffffff", // selected text color
                },
              },
            },
          },
        }}
      >
        <MenuItem value={"studio"}>Studio / 1 Bedroom</MenuItem>
        <MenuItem value={"2br"}>2 Bedroom </MenuItem>
        <MenuItem value={"3br"}>3 Bedroom</MenuItem>
        <MenuItem value={"4br"}>4 Bedroom</MenuItem>
        <MenuItem value={"5br"}>5 Bedroom</MenuItem>
      </Select>
    </FormControl>
  );
  const furnishedLevelControl = (
    <div
      className={`${styles.iconWrapper} flex align-bottom gap-16 space-between mt-24`}
    >
      <div
        onClick={() => setFurnishedLevel("lightlyFurnished")}
        className={`${styles.iconContainer} flex align-center flex-column gap-8 `}
      >
        <LightlyFurnished
          className={
            furnishedLevel === "lightlyFurnished" ? styles.active : styles.icon
          }
        />
        <Typography
          variant="subtitle1"
          component="div"
          align="center"
          className={`${styles.inputLabel}`}
        >
          Lightly furnished
        </Typography>
      </div>
      <div
        onClick={() => setFurnishedLevel("moderatelyFurnished")}
        className={`${styles.iconContainer} flex align-center flex-column gap-8 `}
      >
        <MediumFurnished
          className={
            furnishedLevel === "moderatelyFurnished"
              ? styles.active
              : styles.icon
          }
        />
        <Typography
          variant="subtitle1"
          component="div"
          className={`${styles.inputLabel}`}
          align="center"
        >
          Moderately furnished
        </Typography>
      </div>
      <div
        onClick={() => setFurnishedLevel("highlyFurnished")}
        className={`${styles.iconContainer} flex align-center flex-column gap-8 `}
      >
        <HighlyFurnished
          className={
            furnishedLevel === "highlyFurnished" ? styles.active : styles.icon
          }
        />
        <Typography
          variant="subtitle1"
          component="div"
          className={`${styles.inputLabel}`}
          align="center"
        >
          Highly furnished
        </Typography>
      </div>
    </div>
  );

  return (
    <div
      className={`${styles.calculatorWrapper} ${className} border-radius-12 flex justify-center flex-wrap`}
    >
      <div
        className={`${styles.inputWrapper} flex flex-wrap align-center`}
      >
        <Typography
          variant="h6"
          component="div"
          className={`${styles.inputLabel}`}
        >
          I’m moving my
        </Typography>

        {formControl}
      </div>
      {furnishedLevelControl}
      <Box sx={{ width: "100%", maxWidth: "500px" }}>
        <Slider
          className="hours-calculator-slider"
          aria-label="Furnished Level"
          defaultValue={20}
          value={sliderValue}
          onChange={handleSliderChange}
          shiftStep={10}
          step={10}
          min={10}
          max={30}
          sx={{
            height: 8, // Thickness of the whole slider track
            "& .MuiSlider-track": {
              height: 12,
            },
            "& .MuiSlider-rail": {
              height: 12,
            },
            "& .MuiSlider-thumb": {
              height: 40,
              width: 40,
              backgroundColor: "#fff",
              border: "2px solid currentColor",
              "&:hover": {
                boxShadow: "0 0 0 8px rgba(0,0,0,0.16)",
              },
            },
          }}
        />
      </Box>
      <div
        className={`${styles.labelWrapper} flex flex-wrap justify-center  gap-8 align-bottom mt-16 mb-8`}
      >
        <Typography
          variant="h6"
          component="div"
          className={`${styles.calculatedValueLabel}`}
        >
          {calculatedValueLabel}
        </Typography>
        <Typography
          variant="h5"
          component="div"
          className={`${styles.calculatedValue}`}
        >
          {hoursNeeded}m<sup>3</sup>
        </Typography>
      </div>
      <div className="block">
    
           <Link href="/get-free-quote" className={"flex justify-center mt-8"}>
                        <Button variant="outlined">Get a fixed price quote</Button>
           </Link>
      </div>
    </div>
  );
}
