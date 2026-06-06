
import styles from './CardsSection.module.scss';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import CardsSectionCarousel from './CardsSectionCarousel';
export default function CardsSection ({ title, subtitle, description, cards }) {
  if (!cards) return null;

console.log(title)

  return (
    <section id="our-services" className={`${styles.section}`}>
      <Container maxWidth="xl" className={styles.container}>
        <div className={`${styles.titleWrapper} grid gap-16 space-between`}>
          <div>
          <Typography variant="h5" component="div" className={`${styles.subtitle}`}>
            {subtitle}
          </Typography>
          <Typography variant="h2" component="h2" className={`${styles.title}` }>
            {title}
          </Typography>
          </div>
          {description && 
            <div
            className={`${styles.description} heading-6 mt-8`}
            dangerouslySetInnerHTML={{ __html: description }}
          />
          }
        </div>
        </Container>
        <CardsSectionCarousel cards={cards} />
   
    </section>
  );
}
