import React from "react";
import styles from "./SpaceCalculator.module.scss";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import CalculatorUI from "./CalculatorUI/CalculatorUI";

export default function SpaceCalculator({
  title,
  description,
  calculatedValueLabel,
  furnishedLevelData,
  price
}) {
  return (
    <section className={`${styles.section}`} id="space-calculator">
      <Container className={`${styles.container} grid align-center gap-40` } maxWidth="xl">
        <div className={`${styles.contentWrapper}`}>
          <Typography variant="h4" component="h2" className={`${styles.title}`}>
            {title}
          </Typography>
          <Typography variant="h5" component="h3" className={`${styles.price} mt-8`}>
            Average Price: ${price}m<sup>3</sup>
          </Typography>
          
          <div
            className={`${styles.description} dark-body1 body1`}
            dangerouslySetInnerHTML={{ __html: description }}
          ></div>     

    
        </div>
        <CalculatorUI furnishedLevelData={furnishedLevelData} calculatedValueLabel={calculatedValueLabel}  /> 
      </Container>
    </section>
  );
}
