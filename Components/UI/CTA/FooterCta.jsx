import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Link from "next/link";
import React from "react";
import styles from "./FooterCTA.module.scss";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";

export default function FooterCta({ title, description, ctaArray }) {
  const phoneNumber = process.env.NEXT_PUBLIC_PHONE_NUMBER;
  const hasCtas = Array.isArray(ctaArray) && ctaArray.some((cta) => cta?.link?.url);

  return (
    <section className={`${styles.section}`}>
      <Container maxWidth="lg">
        <div className={`${styles.wrapper}`}>
          <div className={`${styles.contentWrapper}`}>
            <Typography
              component="h2"
              variant="h2"
              sx={{ fontWeight: 700 }}
              align="center"
              color="white"
              className="title"
            >
              {title}

            </Typography>
            <Typography
              component="div"
              variant="h5"
              align="center"
              color="white"
              sx={{ fontWeight: 400 }}

              className="description mt-16 "
            >
              {description}
            </Typography>
            {/* <Typography
              component="p"
              variant="body1"
              align="center"
              color="white"
              className="description mt-16"
            >
            
            </Typography> */}
            <div className="button-wrapper flex justify-center mt-24 gap-16 flex-wrap">
              {hasCtas ? ctaArray.map((cta, index) => {
                if (!cta?.link?.url) return null;
                return <Link href={cta.link.url} key={index}>
                  <Button
                    size="large"
                    variant="contained"
                    sx={{
                      background: "white",
                      color: "var(--dark-on-primary)",
                      "&:hover": {
                        background: "#eaeaea",
                      },
                    }}
                  >
                    {cta.link.title}
                  </Button>
                </Link>
              })
                : (
                  <>
                    <Link href="/#get-quote-form" className={`${styles.quoteButton}`}>

                      <Button
                        size="large"
                        variant="contained"
                        className="flex gap-4"
                        sx={{
                          background: "white",
                          color: "var(--dark-on-primary)",

                          "&:hover": {
                            background: "#eaeaea",
                          },
                        }}
                      >
                        <span>GET FREE QUOTE</span>
                        <ArrowForwardIcon fontSize="small" />

                      </Button>
                    </Link>
                    {phoneNumber && (
                      <Link href={`tel:${phoneNumber}`} className={`${styles.phoneButton}`}>
                        <Button
                          size="large"
                          variant="outlined"
                           className="flex gap-4"

                          sx={{
                            border: "1px solid white",
                            color: "white",
                            
                            "&:hover": {
                              background: "#ffffff40",
                            },
                          }}
                        >
                          <LocalPhoneIcon fontSize="small" />
                          <span>{phoneNumber}</span>

                        </Button>
                      </Link>
                    )}
                  </>
                )}

              {/* <Link href="/get-free-quote">
              <Button
                size="large"
                variant="outlined"
                sx={{
                  border: "1px solid white",
                  color: "white",
                  "&:hover": {
                    border: "1px solid #eaeaea",
                  },
                }}
              >
                {cta.label}
              </Button>
            </Link> */}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
