"use client";
import React from "react";
import styles from "./RouterFilters.module.scss";
import AutoCompleteFilter from "./Filters/AutocompleteFilter";
import { nzCitiesData } from "@/utils/staticData/nzCitiesData";
import Input from "../../Forms/InputFields/Input";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
export default function RouterFilters({
  movingFromValue,
  movingToValue,
  dateValue,
  onChangeFrom,
  onChangeTo,
  onChangeDate,
  chips
}) {
  const handleReset = () => {
    onChangeFrom(null);
    onChangeTo(null);
    onChangeDate(null);
  };
  // 👇 check if any filter is active
  const isFiltered =
    Boolean(movingFromValue) || Boolean(movingToValue) || Boolean(dateValue);
  return (
    <div className={`${styles.filtersWrapper} `}>
      <div className={`${styles.filters} grid gap-16`}>
        <AutoCompleteFilter
          label="Moving from"
          options={nzCitiesData}
          value={movingFromValue}
          onChange={(_, newOption) => onChangeFrom(newOption ?? null)}
        />
        <AutoCompleteFilter
          label="Moving to"
          options={nzCitiesData}
          value={movingToValue}
          onChange={(_, newOption) => onChangeTo(newOption ?? null)}
        />
        <Input
          type="datePicker"
          label="Moving Date"
          value={dateValue}
          onChange={onChangeDate}
          required={false}
          removeMargin
        />
      </div>

           
  
      <div className={`${styles.buttonChipWrapper} mt-8 gap-16 flex justify-end `} style={{visibility: isFiltered ? 'visible' : 'hidden'}}>
            {chips.length > 0 && (
                  <Stack direction="row" spacing={1} sx={{ mt: 1, flexWrap: "wrap" }}>
                    {chips.map((c, i) => <Chip key={i} size="small" label={c.label} />)}
                  </Stack>
                )}
    <button className={styles.resetButton} onClick={handleReset}> Reset filters</button>
      </div>

    </div>
  );
}
