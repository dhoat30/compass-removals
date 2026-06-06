"use client";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import BreadCrumb from "../BreadCrumb/BreadCrumb";
import styles from "./Hero.module.scss";
export default function BreadcrumbHero({
  title,
  description,
  showBreadcrumb = true,
}) {
  return (
    <div className={`${styles.titleWrapper}`}>
      <Container maxWidth="lg" className="Container">
        {showBreadcrumb && <BreadCrumb className="justify-center" />}

        <div className="title">
          <Typography variant="h2" component="h1">
            {title}
          </Typography>
          <Typography variant="body1" component="p" className="mt-16">
            {description}
          </Typography>
        </div>
      </Container>
    </div>
  );
}

