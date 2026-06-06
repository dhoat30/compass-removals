import MenuItem from "@mui/material/MenuItem";
import Checkbox from "@mui/material/Checkbox";
import ListItemText from "@mui/material/ListItemText";
import OutlinedInput from "@mui/material/OutlinedInput";
import Typography from "@mui/material/Typography";
import InputLabel from "@mui/material/InputLabel";
import React from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import FormLabel from "@mui/material/FormLabel";
import Slider from "@mui/material/Slider";
import Chip from "@mui/material/Chip";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import styles from "./Input.module.scss";
import DateInput from "./DateInput";
import { useState } from "react";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from "dayjs";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import ClearIcon from "@mui/icons-material/Close";
// styling for select
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export default function Input({
  label,
  type,
  value,
  onChange,
  onBlur,
  required,
  autoComplete,
  errorMessage,
  isInvalid,
  options,
  multipleValue,
  lightTheme,
  min,
  max,
  note,
  id, 
  removeMargin = false, 
  ...props
}) {

    const [open, setOpen] = useState(false);

  if (type === "radio") {
    return (
      <FormControl
        error={required ? isInvalid : null}
        variant="standard"
        sx={{ marginTop: "16px" }}
        fullWidth
      >
        <FormLabel className="radio-label">
          <Typography variant="h6" component="div">
            {label}
          </Typography>
        </FormLabel>
        <RadioGroup
          aria-labelledby="error-radios"
          name="quiz"
       
          value={value}
          onChange={onChange}
          sx={{ marginTop: "8px" }}
        >
          {options.map((option, index) => (
            <FormControlLabel
              color="white"
              sx={{ color: "rgba(255, 255, 255, 0.7)" }}
              key={index}
              value={option.value}
              control={<Radio  />}
              label={option.label}
            />
          ))}
        </RadioGroup>
        <FormHelperText error={isInvalid}>
          {isInvalid && errorMessage}
        </FormHelperText>
      </FormControl>
    );
  } else if (type === "select") {
    return (
      <FormControl
        error={required ? isInvalid : null}
        sx={{ marginTop: "16px ", }}
     
        fullWidth={true}
      >
        <InputLabel id="multiple-checkbox-label" sx={{ width: "100%" }}           color={"secondary"}
>
          {label}
        </InputLabel>
        <Select
          sx={{ width: "100%" }}
          labelId="multiple-checkbox-label"
          id="multiple-checkbox"
          multiple={multipleValue}
          value={value}
          onChange={onChange}
          input={<OutlinedInput label={label} />}
          color={"secondary"}
          renderValue={
            multipleValue
              ? (selected) => selected.join(", ")
              : (selected) => selected.toString()
          }
          MenuProps={MenuProps}
        >
          {options.map((option, index) => (
            <MenuItem key={index} value={option.value}>
              <Checkbox
                        color={"secondary"}

                checked={value.indexOf(option.value) > -1}
              />
              <ListItemText
                primary={option.label}
              />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    );
  } else if (type == "checkbox") {
    return (
      <FormControl
        error={required ? isInvalid : null}
        variant="standard"
        sx={{ marginTop: "16px " }}
      >
        <FormLabel className="radio-label">
          <Typography variant="h6" component="div">
            {label}
          </Typography>
        </FormLabel>

        <FormGroup
          aria-labelledby="checkbox"
          name="checkbox group"
          value={value}
          onChange={onChange}
          sx={{ marginTop: "8px" }}
        >
          {options.map((option, index) => (
            <FormControlLabel
              key={index}
              value={option.value}
              control={
                <Checkbox
                  checked={value.indexOf(option.value) > -1}
                  name={option.label}
                />
              }
              label={option.label}
            />
          ))}
        </FormGroup>

        <FormHelperText error={isInvalid}>
          {isInvalid && errorMessage}
        </FormHelperText>
      </FormControl>
    );
  } else if (type === "slider") {
    return (
      <div className="slider-container">
        <FormLabel className="radio-label">
          <Typography variant="h6" component="div">
            {label}
          </Typography>
        </FormLabel>
        <div className="slider-wrapper">
          <Slider
            aria-label="Default"
            valueLabelDisplay="auto"
            value={value}
            onChange={onChange}
            min={min}
            max={max}
          />
          <TextField
            value={value ? value : min}
            size="small"
            onChange={onChange}
            inputProps={{
              step: 1,
              min: min,
              max: max,
              type: "number",
              "aria-labelledby": "input-slider",
            }}
          />
        </div>
        {note && <FormHelperText>{note}</FormHelperText>}

        <FormHelperText error={isInvalid}>
          {isInvalid && errorMessage}
        </FormHelperText>
      </div>
    );
  } else if (type === "chip" && options.length > 0) {
    const handleChipClick = (optionValue) => {
      let currentValues = Array.isArray(value) ? [...value] : [];
      if (currentValues.includes(optionValue)) {
        currentValues = currentValues.filter((item) => item !== optionValue); // Remove if already present
      } else {
        currentValues.push(optionValue); // Add if not present
      }
      onChange(currentValues); // Pass back the updated array to the parent component
    };

    return (
      <FormControl
        error={required ? isInvalid : null}
        style={{ marginTop: "16px" }}
      >
        <Typography variant="h6" component="div">
          {label}
        </Typography>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "16px",
            marginTop: "16px",
          }}
        >
          {options.map((option, index) => (
            <Chip
              key={index}
              label={option.label}
              onClick={() => handleChipClick(option.value)}
              variant={value.includes(option.value) ? "filled" : "outlined"}
              color="secondary"
            />
          ))}
        </div>
        <FormHelperText error={isInvalid}>
          {isInvalid && errorMessage}
        </FormHelperText>
      </FormControl>
    );
  } 
  else if(type==="datePicker"){
    return           <FormControl
      fullWidth
                color="secondary"

      required={required}
      error={required ? isInvalid : null}
      sx={{ marginTop: removeMargin ? "0" : "24px", position: "relative" }}
    >
      <LocalizationProvider dateAdapter={AdapterDayjs}           color="secondary"
>
        <DatePicker
          label={label}
          value={value ?? null}
          onChange={onChange}
          format="DD/MM/YYYY"
          minDate={dayjs()}
          open={open}
          onOpen={() => setOpen(true)}
          onClose={() => setOpen(false)}
          color="secondary"
          slotProps={{
            textField: {
              color: "secondary",
              variant: "outlined",
              fullWidth: true,
              helperText: isInvalid ? errorMessage : "",
              error: isInvalid,
              inputProps: { readOnly: true },
              onClick: () => setOpen(true),
              onKeyDown: (e) => {
                if (e.key === "Enter" || e.key === " ") setOpen(true);
              },
            },
          }}
        />
      </LocalizationProvider>

      {value ? (
        <IconButton
          aria-label="Clear date"
          size="small"
          onClick={(e) => {
            e.stopPropagation();
            onChange(null);
          }}
          color={"secondary"}
          sx={{
            position: "absolute",
            right: 44,         // leave space for the calendar icon (~48px)
            top: "50%",
            transform: "translateY(-50%)",
            zIndex: 1,
          }}
        >
          <ClearIcon fontSize="small" color={"secondary"}
/>
        </IconButton>
      ) : null}
    </FormControl>
  } 
  else if (
    type === "text" ||
    type === "email" ||
    type === "tel" ||
    type === "textarea"
  ) {
    return (
      <TextField
        sx={{
          marginTop: "16px",
        }}
        label={label}
        type={type}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        required={required}
        color="secondary"
        variant="outlined"
     name={id}
     id={id}
        fullWidth
        autoComplete={autoComplete}
        helperText={isInvalid && errorMessage}
        error={required ? isInvalid : null}
        multiline={type === "textarea" ? true : false}
        minRows={type === "textarea" ? 3 : null}
      />
    );
  }
}

