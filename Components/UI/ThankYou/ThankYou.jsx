import Container from "@mui/material/Container";
import Image from "next/image";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import Button from "@mui/material/Button";
import styles from "./ThankYou.module.scss";
export default function ThankYou({
  title = "Thanks for your enquiry.",
  description = "We have received your information and we will get back you soon.",
}) {
  return (
    <section className={`${styles.section} flex align-center justify-center`}>
      <Container maxWidth="sm" className={`${styles.container} border-radius-12`}>
        <div className={`${styles.imageContainer}`}>
          <div className="image-wrapper" style={{paddingBottom: "86%"}}>
            <Image src="/congrats.png" alt="Thank you" fill />
          </div>
        </div>
        <div className="content-wrapper mt-16">
          <Typography
            variant="h4"
            component="h1"
            align="center"
            color="var(--light-on-surface)"
          >
            {title}
          </Typography>
          <Typography
            variant="subtitle1"
            component="p"
            align="center"
            color="var(--light-on-surface-variant)"
          >
            {description}
          </Typography>
          <div className="button-wrapper mt-16 flex justify-center align-center gap-16 flex-wrap">
            <Link href="/">
              <Button variant="outlined" color="primary" size="large">
                Go back
              </Button>
            </Link>
        
          </div>
        </div>
      </Container>
    </section>
  );
}
