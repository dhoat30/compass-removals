import React, { useState } from "react";
import Image from "next/image";
import Typography from "@mui/material/Typography";
import StarIcon from "@mui/icons-material/Star";
import GoogleIcon from "../../Icons/GoogleIcon";
import styles from '../GoogleReviewsCarousle.module.scss'
export default function GoogleReviewCard({ name, description, customerPic, className, showFacebookLogo, characterLimit = 180 }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const numberOfStars = 5;
  const starsJSX = Array.from({ length: numberOfStars }, (_, index) => (
    <StarIcon key={index} sx={{ color: "#FABB05", fontSize: "1rem" }} />
  ));

  const toggleExpand = () => {
    setIsExpanded((prev) => !prev);
  };

  // Limit description to 200 characters if not expanded
  const shortDescription =
    description.length > characterLimit
      ? description.slice(0, characterLimit) + "..."
      : description;
let sourceLogo = showFacebookLogo ? <Image src="/facebook-reviews.png" alt="facebook page" width={96} height={24}/> :   <GoogleIcon />;
  return (
    <div className={`${className} ${styles.slide} embla__slide border-radius-8`}>
      <div className={`${styles.profileWrapper}`}>
        <Image
          src={customerPic}
          alt={`${name} profile picture`}
          width="40"
          height="40"
        />
        <div className={`${styles.nameWrapper}`}>
          <Typography variant="subtitle1" component="h3">
            {name}
          </Typography>
          {starsJSX}
        </div>
      </div>
      <div className={`${styles.descriptionWrapper} mt-16 mb-16`}>
        <Typography variant="body1" component="p" className="mb-16">
          {isExpanded ? description : shortDescription}
        </Typography>
        {description.length > characterLimit && (
          <button onClick={toggleExpand} className={`${styles.readMorebutton}`}>
            {isExpanded ? "Read Less" : "Read More"}
          </button>
        )}
      </div>
        {sourceLogo}
    </div>
  );
}


