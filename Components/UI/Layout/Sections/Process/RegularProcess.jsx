import styles from "./Process.module.scss";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Image from "next/image";
export default function RegularProcess({ title, description, cards, image }) {
  if (!cards) return null;
  const hasImage = image?.url && image?.width && image?.height;
  const imagePadding = hasImage ? (image.height / image.width) * 100 : null;

  const stepCards = cards.map((item, index) => {
    return (
      <div className={`${styles.stepWrapper}`} key={index}>
        <div className={`${styles.stepTitleNumberWrapper}`}>
          <Typography variant="h4" component="div" className={`${styles.stepNumber}`}>0{index + 1}</Typography>
        </div>
        <div className={`${styles.content}`}>
          <Typography variant="h6" component="h3">
            {item.title}
          </Typography>
          <Typography
            variant="body1"
            component="div"
            className="description"
            dangerouslySetInnerHTML={{ __html: item.description }}
          ></Typography>
        </div>
      </div>
    );
  });

  return (
    <section className={`${styles.section}`} id="process">
      <Container maxWidth="xl" className={`${styles.container} ${!hasImage ? styles.noImage : ""} grid gap-80 align-center`}>
        {hasImage && (
          <div className={`${styles.imageWrapper} image-wrapper border-radius-16`} style={{paddingBottom: `${imagePadding}%`}}>
            {/* <div className={`${styles.backgroundGradient} `}></div> */}
            <Image src={image.url} alt={image.alt || title} fill sizes="(max-width: 1100px) 100vw, (max-width: 1200px) 50vw" className="border-radius-16" />
          </div>
        )}
        <div className={`${styles.contentWrapper} `}>
          <div className={`${styles.titleWrapper}`}>
            <Typography
              variant="h4"
              component="h2"
              className={`${styles.heading}`}
              dangerouslySetInnerHTML={{ __html: title }}
            />
            {description && (
              <Typography
                variant="body1"
                component="div"
                className={`${styles.description}`}
                dangerouslySetInnerHTML={{ __html: description }}
              />
            )}
          </div>

          <div
            className={`${styles.stepsWrapper} grid gap-32 space-between mt-24 `}
          >
            {stepCards}
          </div>
        </div>
        
      </Container>
    </section>
  );
}
