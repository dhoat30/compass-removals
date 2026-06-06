import React from "react";
import styles from "./Stats.module.scss";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
export default function Stats({ statsData }) {

  const stats = statsData?.map((item, index) => {
    return (
      <div className={`${styles.statWrapper} center-align grid` } key={index}>
        <Typography className={`${styles.value}`} variant="h2" component="span">{item.value}</Typography>
        <Typography className={`${styles.label}`} variant="h6" component="span">{item.label}</Typography>

      </div>
    );
  });
  return (
    <section className={`${styles.section}`}>
      <Container maxWidth="lg" className={`${styles.container} flex gap-16 flex-wrap space-between `}>
        {stats}
      </Container>
    </section>
  );
}
