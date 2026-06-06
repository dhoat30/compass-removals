'use client';
import * as React from "react";
import { styled } from "@mui/material/styles";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import styles from "./CustomAccordion.module.scss";
const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  "&:not(:last-child)": {
    borderBottom: 0,
  },
  "&:before": {
    display: "none",
  },
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary expandIcon={<ArrowForwardIosSharpIcon />} {...props} />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === "dark"
      ? "rgba(255, 255, 255, .05)"
      : "rgba(255, 255, 255, 1)",
  "& .MuiAccordionSummary-content": {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  paddingLeft: theme.spacing(2),
  paddingRight: theme.spacing(2),
  paddingTop: "0",
  paddingBottom: "8px",
background: "var(--light-surface-container-lowest)",
  borderTop: "1px solid rgba(0, 0, 0, .125)",
}));

export default function CustomAccordion({ qaData, className }) {
  const [expanded, setExpanded] = React.useState(false);

  if (!qaData) return null;

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false); // Ensure the correct panel is set
  };

  const faqList = qaData.map((item, index) => {
    const accordionPanel = `panel${index}`; // Ensure unique panel ID for each accordion
    return (
      <Accordion
      className={`${className}`}
        key={index}
        expanded={expanded === accordionPanel} // Expanded if the panel is the same as the current state
        onChange={handleChange(accordionPanel)} // Handle panel change
        sx={{
          background: "background: var(--light-surface-container-low)",
        }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls={`panel${index}a-content`}
          id={`panel${index}a-header`}
          sx={{background: "var(--light-surface-container-low)"}}
        >
          <Typography variant="subtitle1">{item.question}</Typography>
        </AccordionSummary>
        <AccordionDetails className={`${styles.details}`}>
        <div
              className={`${styles.answer} body1`}
              dangerouslySetInnerHTML={{ __html: item.answer }}
            />
        </AccordionDetails>
      </Accordion>
    );
  });

  return <div>{faqList}</div>;
}

