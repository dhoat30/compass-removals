
import styles from './LocationCarousel.module.scss';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import ServicesSectionCarousel from './LocationCarousel';
export default function LocationCarouselSection({ title, subtitle, description, cards }) {
  if (!cards) return null;
  return (
    <section id="our-services" className={`${styles.section} flex align-center justify-center`}>
      <Container maxWidth="xl" className={styles.container}>
        <div className={styles.titleWrapper}>
          <Typography variant="h5" component="div" className={`${styles.subtitle} center-align`}>
            {subtitle}
          </Typography>
          <Typography variant="h2" component="h2" className={`${styles.title} center-align` }>
            {title}
          </Typography>
          {description && <div
            className={`${styles.description} body1`}
            dangerouslySetInnerHTML={{ __html: description }}
          />}
          
         
        </div>
        <ServicesSectionCarousel cards={cards} />
      </Container>
    </section>
  );
}
