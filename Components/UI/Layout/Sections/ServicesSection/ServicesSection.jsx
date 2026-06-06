
import styles from './ServicesSection.module.scss';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import ServicesSectionCarousel from './ServicesSectionCarousel';
export default function ServicesSection({ title, subtitle, description, cards }) {
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
          <div
            className={`${styles.description} body1 center-align mt-8`}
            dangerouslySetInnerHTML={{ __html: description }}
          />
         
        </div>
        <ServicesSectionCarousel cards={cards} />
      </Container>
    </section>
  );
}
