import { useMemo, useState } from "react";

import useMediaQuery from "@mui/material/useMediaQuery";
import Button from "@mui/material/Button";
import Badge from "@mui/material/Badge";
import TuneIcon from "@mui/icons-material/Tune";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import FiltersDialog from "./FiltersDialog"; // mobile/tablet overlay
import RouterFilters from "./RouterFilters/RouterFilters";
import styles from "./FiltersBar.module.scss";

export default function FiltersBar({
  movingFrom, setMovingFrom,
  movingTo, setMovingTo,
  dateValue, setDateValue,
  nzCitiesData,
}) {
  const isDesktop = useMediaQuery(theme => theme.breakpoints.up("lg"));
  const activeCount = [movingFrom, movingTo, dateValue].filter(Boolean).length;

  const chips = useMemo(() => {
    const arr = [];
    if (movingFrom) arr.push({ label: `From: ${movingFrom.label}` });
    if (movingTo)   arr.push({ label: `To: ${movingTo.label}` });
    if (dateValue)  arr.push({ label: `Date: ${dateValue.format("DD MMM")}` });
    return arr;
  }, [movingFrom, movingTo, dateValue]);

  const [open, setOpen] = useState(false);

  if (isDesktop) {
    return (
      <>
      <div className={styles.filtersBarDesktop}>
        <RouterFilters
          movingFromValue={movingFrom}
          movingToValue={movingTo}
          dateValue={dateValue}
          onChangeFrom={setMovingFrom}
          onChangeTo={setMovingTo}
          onChangeDate={setDateValue}
          chips={chips}
        />
      
        </div>
      </>
    );
  }

  // Mobile / Tablet
  return (
    <>
      <Stack className={styles.mobileFilterBar} direction="row" alignItems="center" justifyContent="space-between" sx={{ gap: 1 }}>
        <Badge color="primary" badgeContent={activeCount} overlap="circular">
          <Button
            variant="outlined"
            startIcon={<TuneIcon />}
            onClick={() => setOpen(true)}
          >
            Filters
          </Button>
        </Badge>

        {/* Selected chips (truncate to save space) */}
        <Stack direction="row" spacing={1} sx={{ overflowX: "auto", maxWidth: "70%" }}>
          {chips.map((c, i) => <Chip key={i} size="small" label={c.label} />)}
        </Stack>
      </Stack>

      <FiltersDialog
        open={open}
        onClose={() => setOpen(false)}
        movingFrom={movingFrom}
        movingTo={movingTo}
        dateValue={dateValue}
        setMovingFrom={setMovingFrom}
        setMovingTo={setMovingTo}
        setDateValue={setDateValue}
        nzCitiesData={nzCitiesData}
      />
    </>
  );
}
