import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import React from "react";
import styles from "./Footer.module.scss";
export default function Copyright() {
  return (
    <div className={`${styles.copyrightWrapper} pt-8 pb-8`} >
      <Container maxWidth="lg" className="content-wrapper">
        <div className="copyright-wrapper flex space-between flex-wrap gap-16">
        <Typography variant="body1" component="span" className="center-align">
            © {new Date().getFullYear()} Compass Removals. All Rights Reserved. 
            </Typography>
          <a href="https://webduel.co.nz" rel="nofollow" target="_blank">
            <Typography variant="body1" component="div" className="center-align">
              Designed & Developed by <span className={styles.webduelLabel}>web<strong className={styles.duel}>duel</strong></span>
            </Typography>
          </a>
        </div>
    
      </Container>
    </div>
  );
}
