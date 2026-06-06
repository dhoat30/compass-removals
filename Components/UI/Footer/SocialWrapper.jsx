import React from 'react'
import styles from './Footer.module.scss'
import Typography from "@mui/material/Typography";
import Link from "next/link";
import Image from "next/image";
export default function SocialWrapper({socialData}) {
  return (
    <div className={`${styles.socialWrapper}`}>
    <Typography variant="subtitle1" component="div">
      Follow Us
    </Typography>
    <div className={`${styles.socialLinks} mt-8 flex gap-8 flex-wrap`}>
      {socialData &&
        socialData.length > 0 &&
        socialData.map((social, index) => {
          return (
            <Link
              key={index}
              aria-label={social.social_media_name}
              href={social.link}
              target="_blank"
              className={`${styles.link}`}
            >
              <Image
                src={social.social_media_icon.url}
                alt={social.social_media_name}
                width="32"
                height="32"
              />
            </Link>
          );
        })}
    </div>
  </div>
  )
}
