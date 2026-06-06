import React from 'react'
import Paper from '@mui/material/Paper';
import Skeleton from '@mui/material/Skeleton';
import styles from './Skeletons.module.scss';
import Stack from '@mui/material/Stack';
export default function MovingCardSkeleton() {
  return (
    <>
         <Paper className={`${styles.MovingCard} border-radius-12`} elevation={0} variant="outlined">
      <Stack spacing={1.5}>
        <Skeleton variant="text" width="60%" height={28} />
        <Stack direction="row" spacing={1}>
          <Skeleton variant="rounded" width={"30%"} height={28} />
          <Skeleton variant="rounded" width={"30%"} height={28} />
          <Skeleton variant="rounded" width={"30%"} height={28} />
        </Stack>
        <Skeleton variant="rounded" height={80} />
      </Stack>
    </Paper>

    <Paper className={`${styles.movingMap} border-radius-12 mt-16`} elevation={0} variant="outlined">
     
        <Skeleton variant="rectangular" width="100%"  height={"100%"} />
    
    </Paper>
    </>

  )
}
