'use client';
import React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

export default function AutoCompleteFilter({ label, options, value, onChange }) {
  return (
    <Autocomplete
      options={options}
      getOptionLabel={(opt) => opt?.label ?? ''}
      isOptionEqualToValue={(opt, val) => opt?.value === val?.value}
      value={value ?? null}
      onChange={onChange}
      clearOnEscape
      renderInput={(params) => (
        <TextField {...params} label={label} variant="outlined" />
      )}
    />
  );
}
