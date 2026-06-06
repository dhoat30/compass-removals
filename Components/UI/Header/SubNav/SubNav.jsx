import React, { useEffect, useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Link from "next/link";
import useActiveSection from "@/hooks/useActiveSection";
import styles from "./SubNav.module.scss";
function SubNav({ dataArr }) {
  //section id array for useActiveSection hook
  const sectionIDArr = dataArr.map((item) => {
    return item.acf_fc_layout;
  });
  //get active section
  const activeSection = useActiveSection(sectionIDArr);
  useEffect(() => {
    handleChange(null, sectionIDArr.indexOf(activeSection));
  }, [activeSection]);

  const [showSubnav, setShowSubnav] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 500) {
        setShowSubnav(true);
      } else {
        setShowSubnav(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  });

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const tab = dataArr.map((item, index) => {
    return (
      <Tab
        key={index}
        label={item.acf_fc_layout.replace(/_/g, " ")}
        component="a"
        href={`#${item.acf_fc_layout}`}
      />
    );
  });

  return (
    <>
      {showSubnav && (
        <section elevation={5} className={`${styles.section}`}>
          <Container className={`${styles.wrapper}`} maxWidth="xl" component="div">
            <Tabs
              value={value}
              onChange={handleChange}
              variant="scrollable"
              allowScrollButtonsMobile
              aria-label="scrollable force tabs example"
              textColor="secondary"
              indicatorColor="secondary"
              className={`${styles.tabsWrapper}`}
            >
              {tab}
            </Tabs>
            <Link
              className={`${styles.ctaLink}`}
              href="/book-consultation"
              target="_blank"
            >
              <Button size="sm" variant="contained" color="secondary">
                BOOK FREE CONSULTATION
              </Button>
            </Link>
          </Container>
        </section>
      )}
    </>
  );
}

export default SubNav;
