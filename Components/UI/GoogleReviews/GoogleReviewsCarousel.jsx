"use client";

import React, { useCallback, useMemo } from "react";
import Container from "@mui/material/Container";
import Link from "next/link";
import Button from "@mui/material/Button";
import CallMadeOutlinedIcon from "@mui/icons-material/CallMadeOutlined";
import GoogleReviewCard from "./GoogleReviewCard/GoogleReviewCard";
import Typography from "@mui/material/Typography";
import styles from "./GoogleReviewsCarousle.module.scss";
import useEmblaCarousel from "embla-carousel-react";
import AutoScroll from "embla-carousel-auto-scroll";

export default function GoogleReviewsCarousel({ data }) {
  const reviews = Array.isArray(data) ? data : data?.reviews;
  const hasReviews = Array.isArray(reviews) && reviews.length > 0;

  // ✅ AutoScroll plugin
  const autoScroll = useMemo(
    () =>
      AutoScroll({
        speed: 0.6, // increase for faster
        startDelay: 0,
        stopOnInteraction: false, // keep moving after button clicks / drag
        stopOnMouseEnter: false, // IMPORTANT: do NOT pause on carousel hover
        // If your users drag, Embla will stop momentarily then continue
      }),
    [],
  );

  const [emblaRef, emblaApi] = useEmblaCarousel(
    { align: "start", loop: true },
    [autoScroll],
  );

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  // ✅ Pause ONLY when hovering a card
  const handleCardMouseEnter = useCallback(() => {
    if (!emblaApi) return;
    const plugin = emblaApi.plugins()?.autoScroll;
    plugin?.stop?.();
  }, [emblaApi]);

  const handleCardMouseLeave = useCallback(() => {
    if (!emblaApi) return;
    const plugin = emblaApi.plugins()?.autoScroll;
    plugin?.play?.();
  }, [emblaApi]);

  if (!hasReviews) return null;

  // filter review comment
  const filteredReviewData = reviews.filter((item) => {
    const rating = item.stars ?? item.rating;
    const text = item.text ?? item.snippet;
    return rating === 5 && typeof text === "string" && text.trim().length > 0;
  });

  const testimonialCardsJSX = filteredReviewData.map((item, index) => {
    if (index > 10) return null;
    return (
      <GoogleReviewCard
        key={index}
        name={item.name ?? item.user?.name}
        description={item.text ?? item.snippet}
        customerPic={item.reviewerPhotoUrl ?? item.user?.thumbnail}
        characterLimit={80}
      />
    );
  });

  return (
    <section className={`${styles.section}`}>
      <Container maxWidth="xl" className={`${styles.container}`}>
        <div className={`${styles.titleRow}`}>
          <Typography
            variant="h2"
            component="h2"
            className="title"
            align="center"
          >
            Google Reviews
          </Typography>
          <Typography
            variant="h6"
            component="p"
            className="description mt-16 medium"
            align="center"
            color="var(--light-on-surface-variant)"
          >
            Explore authentic customer feedback and see why people trust us.
            Each review reflects the quality and dedication we bring to every
            service we provide.
          </Typography>
        </div>
      </Container>
      <div className="carousel-wrapper embla mt-32">
        <div className="embla__viewport" ref={emblaRef}>
          <div className="embla__container">{testimonialCardsJSX}</div>
        </div>
        {/* 
          <div className="embla__controls ">
            <div className="embla__dots">
              {scrollSnaps.map((_, index) => (
                <DotButton
                  key={index}
                  onClick={() => onDotButtonClick(index)}
                  className={"embla__dot".concat(
                    index === selectedIndex ? " embla__dot--selected" : "",
                  )}
                />
              ))}
            </div>
            <div className="embla__buttons">
              <PrevButton
                onClick={onPrevButtonClick}
                disabled={prevBtnDisabled}
              />
              <NextButton
                onClick={onNextButtonClick}
                disabled={nextBtnDisabled}
              />
            </div>
          </div> */}
      </div>
      {/* <Container maxWidth="xl" className="cta-wrapper mt-16 flex justify-center flex-wrap gap-16">
        <Link href={"https://g.page/r/CRY0fyyR4ApsEBM/review"} target="_blank">
          <Button variant={`contained`} endIcon={<CallMadeOutlinedIcon />}>
            Leave a Review
          </Button>
        </Link>
        <Link href="/customer-reviews">
          <Button variant={`outlined`}>Read All Reviews</Button>
        </Link>
      </Container> */}
    </section>
  );
}
