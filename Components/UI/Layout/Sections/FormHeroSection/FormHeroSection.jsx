import React from "react";
import styles from "./FormHeroSection.module.scss";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Link from "next/link";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import HeroUSP from "@/Components/UI/USP/HeroUSP";
import Image from "next/image";
import Video from "@/Components/UI/Video/Video";
import GoogleReviewSnippet from "@/Components/UI/GoogleReviews/GoogleReviewCard/GoogleReviewSnippet";

export default function FormHeroSection({
  title,
  subtitle,
  reviewTitle,
  description,
  cta,
  graphicType,
  graphicData,
  uspData,
  reviewerPics,
}) {
  let graphic;
  if (graphicType === "new_graphic_type") {
    graphic = (
      <div className={`${styles.newGraphicType} grid align-bottom`}>
        <div className={`${styles.graphic}`}>
          <div
            className={`${styles.imageWraper1} image-wrapper border-radius-16`}
          >
            <Image
              src={graphicData[0].image.sizes.large}
              alt={
                graphicData[0].image.alt ||
                graphicData[0].token.subtitle +
                  " " +
                  graphicData[0].token.title +
                  " " +
                  graphicData[0].token.description
              }
              fill
              priority={true}
              sizes=" (max-width: 550px) 100vw, (max-width: 1100px) 50vw, 50vw"
            />
          </div>
          <div className={`${styles.token1}`}>
            <div className={`${styles.tokenContent}`}>
              <Typography
                variant="subtitle1"
                component="span"
                className={`${styles.subtitle} center-align block`}
              >
                {graphicData[0].token.subtitle}
              </Typography>
              <Typography
                variant="h4"
                component="span"
                className={`${styles.title} center-align block black`}
              >
                {graphicData[0].token.title}
              </Typography>
              <Typography
                variant="body2"
                component="span"
                className={`${styles.description} center-align block`}
              >
                {graphicData[0].token.description}
              </Typography>
            </div>
          </div>
        </div>

        <div className={`${styles.graphic}`}>
          <div
            className={`${styles.imageWraper2} image-wrapper border-radius-16`}
          >
            <Image
              src={graphicData[1].image.sizes.large}
              alt={
                graphicData[1].image.alt ||
                graphicData[1].token.subtitle +
                  " " +
                  graphicData[1].token.title +
                  " " +
                  graphicData[1].token.description
              }
              fill
              priority={true}
              sizes=" (max-width: 550px) 100vw, 50vw"
            />
          </div>
          <div className={`${styles.token2}`}>
            <div className={`${styles.tokenContent}`}>
              <Typography
                variant="subtitle1"
                component="span"
                className={`${styles.subtitle} center-align block`}
              >
                {graphicData[1].token.subtitle}
              </Typography>
              <Typography
                variant="h4"
                component="span"
                className={`${styles.title} center-align block black`}
              >
                {graphicData[1].token.title}
              </Typography>
              <Typography
                variant="body2"
                component="span"
                className={`${styles.description} center-align block`}
              >
                {graphicData[1].token.description}
              </Typography>
            </div>
          </div>
        </div>
      </div>
    );
  }
  if (graphicType === "image") {
    graphic = (
      <div
        className="image-wrapper border-radius-12"
        style={{ paddingBottom: "56%" }}
      >
        <Image
          src={graphicData.sizes.large}
          alt={graphicData.alt || title}
          fill
          className={`${styles.image}`}
        />
      </div>
    );
  }

  if (graphicType === "youtube_video") {
    graphic = (
      <Video
        videoID={graphicData.youtube_id}
        placeholderImage={graphicData.placeholder_image}
        priority={true}
      />
    );
  }
  return (
    <section className={`${styles.section}`}>
      <div className={`${styles.container}`}>
        <div className={`${styles.contentWrapper} max-width-lg`}>

          <GoogleReviewSnippet reviewerPics={reviewerPics} reviewTitle={reviewTitle} /> 

          <div
            dangerouslySetInnerHTML={{ __html: title }}
            className={`heading-1 center-align ${styles.title}`}
          />
          <div
            dangerouslySetInnerHTML={{ __html: description }}
            className={`heading-6 center-align mt-16 ${styles.description}`}
          />
          <HeroUSP data={uspData} />

          {cta && (
            <div className={`${styles.formWrapper} `} variant="outlined">
              {/* <Link href={cta.url}>
                <div className={`${styles.inputWrapper} flex gap-8 `}>
                  <div className={`${styles.input} flex align-center gap-8`}>
                    <HomeOutlinedIcon className={`${styles.icon}`} />
                    <Typography
                      variant="body1"
                      components="span"
                      sx={{ color: "var(--light-primary)", fontWeight: "500" }}
                    >
                      Number of bedrooms
                    </Typography>
                  </div>
                  <div className={`${styles.input} flex align-center gap-8`}>
                    <LocationOnOutlinedIcon className={`${styles.icon}`} />
                    <Typography
                      variant="body1"
                      components="span"
                      sx={{ color: "var(--light-primary)", fontWeight: "500" }}
                    >
                      Location
                    </Typography>
                  </div>
                </div>
              </Link> */}

              <Link href={cta.url} className="mt-16 block">
                <Button
                  className="block"
                  variant="contained"
                  disableElevation
                  size="large"
                >
                  {cta.title}
                </Button>
              </Link>
            </div>
          )}
        </div>
        <div className={`${styles.graphicWrapper} max-width-lg`}>{graphic}</div>
      </div>
    </section>
  );
}
