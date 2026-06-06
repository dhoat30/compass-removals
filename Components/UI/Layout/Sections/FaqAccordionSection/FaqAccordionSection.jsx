import React from "react";
import CustomAccordion from "../../../Accordion/CustomAccordion";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import styles from "./FaqAccordionSection.module.scss";
function FaqAccordionSection({ title, description, qaData }) {
  if (!qaData) return null;
  return (
    <section className={`${styles.section}`}>
      <Container maxWidth="md">
        <div className={`${styles.gridWrapper} `}>
          <div className={`${styles.titleWrapper}`}>
            <Typography variant="h4" component="h2">
              {title}
            </Typography>
            <Typography
              variant="body1"
              component="p"
              className="description mt-16"
            >
              {description}
            </Typography>
          </div>
          <CustomAccordion qaData={qaData} />
        </div>
      </Container>
    </section>
  );
}

export default FaqAccordionSection;

