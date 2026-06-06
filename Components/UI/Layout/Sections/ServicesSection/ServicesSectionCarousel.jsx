"use client";
import React, { useCallback } from "react";
import styles from "./ServicesSection.module.scss";
import Image from "next/image";
import Link from "next/link";
import Typography from "@mui/material/Typography";
import useEmblaCarousel from "embla-carousel-react";
import {DotButton, useDotButton} from "@/Components/UI/Embla/EmblaCarouselDotButtons";
import { PrevButton, NextButton, usePrevNextButtons } from "@/Components/UI/Embla/EmblaCarouselArrowButtons";
export default function ServicesSectionCarousel({ cards }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ align: 'start' });
  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick
  } = usePrevNextButtons(emblaApi)
 
  const { selectedIndex, scrollSnaps, onDotButtonClick } =
    useDotButton(emblaApi)

  const cardsJSX = cards.map((card, index) => {
    return (
      <div
        key={index}
        className={`${styles.card} embla__slide border-radius-12 overflow-hidden`}
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
        <div className={`${styles.contentWrapper} mt-8`}>
          {card?.subtitle && (
            <Typography
              variant="h6"
              component="div"
              className={styles.subtitle}
            >
              {card.subtitle}
            </Typography>
          )}
          <Typography variant="h6" component="h3" className={`${styles.title} center-align`}>
            {card.title}
          </Typography>
          <Typography
            variant="body1"
            component="p"
            className={`${styles.description} center-align`}
          >
            {card.description}
          </Typography>
          {card.cta &&
            card.cta.map((item, indexKey) => {
              return (
                
                <Link className="flex justify-center" key={indexKey} href={item.link.url}>
                  <Typography variant="subtitle1" component="span" className="flex gap-2 text-link" >
                  {item.link.title}
                  </Typography>
                </Link>
              );
            })}
        </div>
      </div>
    );
  });
  return (
    <div className={`${styles.cardsWrapper} embla mt-32`}>
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container">{cardsJSX}</div>
      </div>
   <div className="embla__controls ">
        <div className="embla__dots">
          {scrollSnaps.map((_, index) => (
            <DotButton
              key={index}
              onClick={() => onDotButtonClick(index)}
              className={'embla__dot'.concat(
                index === selectedIndex ? ' embla__dot--selected' : ''
              )}
            />
          ))}
        </div>
        <div className="embla__buttons">
          <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
          <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
        </div>
      
      </div>
    </div>
  );
}
