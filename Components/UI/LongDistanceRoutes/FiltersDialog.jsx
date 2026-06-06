'use client';
import Dialog from "@mui/material/Dialog";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import useMediaQuery from "@mui/material/useMediaQuery";
import AutoCompleteFilter from "./RouterFilters/Filters/AutocompleteFilter";
import Input from "../Forms/InputFields/Input";

export default function FiltersDialog({
  open, onClose,
  movingFrom, setMovingFrom,
  movingTo, setMovingTo,
  dateValue, setDateValue,
  nzCitiesData,
}) {
  const fullScreen = !useMediaQuery(theme => theme.breakpoints.up("md"));

  const handleReset = () => {
    setMovingFrom(null);
    setMovingTo(null);
    setDateValue(null);
  };

  const handleApply = () => onClose();

  return (
    <Dialog fullScreen={fullScreen} open={open} onClose={onClose}   PaperProps={{
    sx: {
      width: "100%",              // ensures it expands to full available width
           // tweak this manually if you prefer a custom width
      borderRadius: 3,
    },
  }}>
      <AppBar position="sticky" color="default" elevation={0}>
        <Toolbar>
          <IconButton edge="start" onClick={onClose} aria-label="close">
            <CloseIcon />
          </IconButton>
          <Typography sx={{ ml: 2, flex: 1 }} variant="h6">Filters</Typography>
          <Button startIcon={<RestartAltIcon />} onClick={handleReset}>Reset</Button>
          <Button variant="contained" onClick={handleApply}>Apply</Button>
        </Toolbar>
      </AppBar>

      <Container sx={{ py: 2 }}>
        <Stack spacing={2}>
          <AutoCompleteFilter
            label="Moving from"
            options={nzCitiesData}
            value={movingFrom}
            onChange={(_, v) => setMovingFrom(v ?? null)}
          />
          <AutoCompleteFilter
            label="Moving to"
            options={nzCitiesData}
            value={movingTo}
            onChange={(_, v) => setMovingTo(v ?? null)}
          />
          <Input
            type="datePicker"
            label="Moving Date"
            value={dateValue}
            onChange={setDateValue}
            required={false}
            removeMargin
          />
        </Stack>
      </Container>
    </Dialog>
  );
}
