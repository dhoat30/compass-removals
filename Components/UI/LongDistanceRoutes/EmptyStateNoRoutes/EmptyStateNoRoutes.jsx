// components/LongDistanceRoutes/EmptyStateNoRoutes.jsx
'use client';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import DirectionsIcon from '@mui/icons-material/Directions';
import Link from 'next/link';

export default function EmptyStateNoRoutes({ onReset, onShowAll }) {
  return (
    <Paper
      elevation={0}
      variant="outlined"
      sx={{
        p: { xs: 3, sm: 4 },
        textAlign: 'center',
        borderStyle: 'dashed',
        borderColor: 'divider',
      }}
      role="status"
      aria-live="polite"
    >
      <Stack spacing={2} alignItems="center">
        <HelpOutlineIcon sx={{ fontSize: 40, opacity: 0.7 }} />
        <Typography variant="h6">No routes match your filters</Typography>
        <Typography variant="body2" color="text.secondary" sx={{ maxWidth: 600 }}>
          Try adjusting the date or changing “Moving from / Moving to”. You can also reset all
          filters to see every available long-distance route.
        </Typography>

        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5} sx={{ mt: 1 }}>
          <Button
            variant="contained"
            startIcon={<RestartAltIcon />}
            onClick={onReset}
          >
            Reset filters
          </Button>

          <Button
            variant="outlined"
            startIcon={<DirectionsIcon />}
            onClick={onShowAll}
          >
            Show all routes
          </Button>

          {/* Optional: contact fallback */}
          <Button
            component={Link}
            href="/contact-us"
            variant="text"
          >
            Contact us
          </Button>
        </Stack>
      </Stack>
    </Paper>
  );
}
