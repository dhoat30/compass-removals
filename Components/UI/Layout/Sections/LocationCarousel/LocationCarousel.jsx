"use client";
import React, { useCallback } from "react";
import styles from "./LocationCarousel.module.scss";
import Image from "next/image";
import Link from "next/link";
import Typography from "@mui/material/Typography";
import useEmblaCarousel from "embla-carousel-react";
import PrevIcon from "@/Components/UI/Icons/PrevIcon";
import NextIcon from "@/Components/UI/Icons/NextIcon";
export default function LocationCarousel({ cards }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ align: 'start' });

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const cardsJSX = cards.map((card, index) => {
    return (
      <Link
        key={index}
        className={`${styles.card} embla__slide overflow-hidden border-radius-12`} href={card.url}
      >
        <div
          className={`${styles.imageWrapper} image-wrapper`}
          style={{ paddingBottom: "56%" }}
        >
          {card.image && 
             <Image
             className="image"
             src={card?.image?.sizes?.large}
             alt={card?.image?.alt || card.title}
             fill
             sizes="(max-width: 550px) 100vw, (max-width: 900px) 50vw, (max-width: 1100px) 33vw, 25vw"
           />
        }
       
        </div>
        <div className={styles.contentWrapper}>
          {card?.subtitle && (
            <Typography
              variant="h6"
              component="div"
              className={styles.subtitle}
            >
              {card.subtitle}
            </Typography>
          )}
          <Typography variant="h6" component="h3" className={styles.title}>
            {card.title}
          </Typography>
          {card.price && 
          <Typography
            variant="subtitle1"
            component="p"
            className={`${styles.price}`}
          >
           From: ${card.price}/{card.priceUnit} <sup>{card.power}</sup>
          </Typography>
             }
        </div>
      </Link>
    );
  });
  return (
    <div className={`${styles.cardsWrapper} embla mt-32`}>
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container">{cardsJSX}</div>
      </div>
      <div className="embla__buttons_wrapper flex gap-8 justify-end mt-16">
        <button className="embla__prev" onClick={scrollPrev} aria-label="Previous slide" data-direction="prev">
          <PrevIcon />
        </button>
        <button className="embla__next" onClick={scrollNext} aria-label="Next slide" data-direction="next">
          <NextIcon />
        </button>
      </div>
    </div>
  );
}
