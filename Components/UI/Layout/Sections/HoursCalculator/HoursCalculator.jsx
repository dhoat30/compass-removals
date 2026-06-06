import React from "react";
import styles from "./HoursCalculator.module.scss";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import CalculatorUI from "./CalculatorUI/CalculatorUI";

export default function HoursCalculator({
  title,
  description,
  calculatedValueLabel,
  furnishedLevelData,
  price
}) {

  return (
    <section className={`${styles.section}`} id="hours-calculator">
      <Container className={`${styles.container} grid align-center gap-40` } maxWidth="xl">
        <div className={`${styles.contentWrapper}`}>
          <Typography variant="h4" component="h2" className={`${styles.title}`}>
            {title}
          </Typography>
          <Typography variant="h5" component="h3" className={`${styles.price} mt-8`}>
            Average Price: ${price} per half hour
          </Typography>

          <div
            className={`${styles.description} dark-body1 body1`}
            dangerouslySetInnerHTML={{ __html: description }}
          ></div>
        </div>
        <CalculatorUI furnishedLevelData={furnishedLevelData} calculatedValueLabel={calculatedValueLabel} /> 
      </Container>
    </section>
  );
}
