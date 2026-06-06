import React from "react";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import Button from "@mui/material/Button";
import Link from "next/link";
import Container from "@mui/material/Container";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import BeforeAfter from "../../../BeforeAfterSlider/BeforeAfter";
import styles from "./RowSection.module.scss";
import CustomAccordion from "@/Components/UI/Accordion/CustomAccordion";
export default function RowSection({
  title,
  subtitle,
  description,
  imageAlignment,
  image,
  ctaGroup,
  bulletPoints,
  showBeforeAfterImages,
  beforeImage,
  afterImage,
  accordionData, 
  backgroundColor, 
  fontColor
}) {
  const imgPadding = (image.height / image.width) * 100;
  const contentAlignment = imageAlignment === "left" ? "2 / 3" : "1 / 2";

  return (
    <section className={`${styles.section}`} id="services" style={{background: backgroundColor ? backgroundColor : null}}>
      <Container maxWidth="xl">
        <div className={`${styles.wrapper}`}>
          <div
            className={`${styles.contentWrapper} `}
            style={{ gridColumn: contentAlignment }}
          >
            <Typography variant="h6" component="div" className={`${styles.subtitle}`} sx={{color: fontColor}}>
              {subtitle}
            </Typography>
            <Typography variant="h4" component="h2" className={`${styles.title}`} sx={{color: "var(--light-primary)"}}>
              {title}
            </Typography>

            <div
              className={`${styles.description} ${fontColor ? "dark-body1" : null  } body1 mb-16 mt-16`}
              dangerouslySetInnerHTML={{ __html: description }}
              style={{color: "white !important"}}
            />

            {bulletPoints && bulletPoints?.length > 0 &&
              bulletPoints.map((item, index) => {
                return (
                  <div
                    key={index}
                    className="bullet-point flex align-center gap-8 mt-8"
                  >
                    <CheckCircleIcon
                      sx={{ color: "var(--light-on-primary-fixed-variant)" }}
                    />
                    <Typography
                      variant="subtitle1"
                      component="span"
                      color="var(--light-on-primary-fixed-variant)"
                    >
                      {item.text}
                    </Typography>
                  </div>
                );
              })}
      <CustomAccordion qaData = {accordionData}  /> 
                <div className="button-wrapper mt-16">
            {ctaGroup?.cta && (
              <Link href={ctaGroup.cta.url} className="cta mt-16 inline-block">
                <Button variant={ctaGroup.cta_type} color="primary" sx={{color: `${fontColor && fontColor}`, border: `1px solid ${fontColor && fontColor}`}}>
                  {ctaGroup.cta.title}
                </Button>
              </Link>
            )}
            </div> 
          </div>

          {/* image wrapper */}
          {showBeforeAfterImages ? (
            <div className={`${styles.imageContainer}`}>
              <BeforeAfter
                showTitle={false}
                data={{ beforeImage, afterImage }}
              />
            </div>
          ) : (
            <div
              className={`${styles.imageWrapper} image-wrapper`}
              style={{ paddingBottom: `${imgPadding}%` }}
            >
              {image && 
               <Image
               src={image.url}
               alt={image.alt}
               fill
               sizes="(max-width: 1100px) 100vw, 50vw"
             />
              }
             
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}
