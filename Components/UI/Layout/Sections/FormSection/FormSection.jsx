import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import HeroUSP from "../../../USP/HeroUSP";
import Image from "next/image";
import BeforeAfter from "../../../BeforeAfterSlider/BeforeAfter";
import GetQuoteForm from "@/Components/UI/Forms/GetQuoteForm";
import Video from "@/Components/UI/Video/Video";
import styles from "./FormSection.module.scss";
import GoogleReviewSnippet from "@/Components/UI/GoogleReviews/GoogleReviewCard/GoogleReviewSnippet";
export default function FormSection({
  title,
  description,
  usp,
  graphic,
  reviewerPics,
}) {
  let graphicComponent = null;

  if (graphic.graphic_type === "image" && graphic.image) {
    const paddingBottom = (graphic.image.height / graphic.image.width) * 100;
    graphicComponent = (
      <div
        className="image-wrapper border-radius-12"
        style={{ paddingBottom: `${paddingBottom}%` }}
      >
        <Image
          src={graphic.image.url}
          alt={graphic.image.alt}
          fill
          sizes="(max-width: 1000px) 100vw, 50vw"
          priority
        />
      </div>
    );
  }
  if (graphic.graphic_type === "before_after") {
    graphicComponent = (
      <div className="border-radius-12 overflow-hidden">
        <BeforeAfter
          data={{
            beforeImage: graphic.before_after_image.before,
            afterImage: graphic.before_after_image.after,
          }}
        />
      </div>
    );
  }
  if (graphic.graphic_type === "video") {
    graphicComponent = (
      <Video
        videoHosted={"self"}
        url={graphic.video.video.url}
        placeholderImage={graphic.video.placeholder_image}
        showCompressedImage={true}
      />
    );
  }
  if (graphic.graphic_type === "youtube_video") {
    graphicComponent = (
      <Video
        videoHosted={"youtube"}
        videoID={graphic.youtube_video.youtube_id}
        placeholderImage={graphic.youtube_video.placeholder_image}
        showCompressedImage={true}
      />
    );
  }
  return (
    <section className={`${styles.section}`}>
      <Container maxWidth="lg" className={`${styles.container}`}>
        <div className={`${styles.grid} grid gap-24`}>
          <div className={`${styles.contentWrapper} `}>
            <GoogleReviewSnippet
              reviewTitle={"Loved by Tauranga locals"}
              reviewerPics={reviewerPics}
              leftAligned={true}
            />
            <Typography component={"h1"} variant={"h2"} className="title">
              {title}
            </Typography>
            <Typography
              component={"div"}
              variant={"h6"}
              className="description mt-8 regular"
            >
              {description}
            </Typography>
            <HeroUSP data={usp} className="mb-32" twoColumnsGrid={true} />
            {graphicComponent}
          </div>
          <Paper
            className={`${styles.formWrapper} border-radius-12`}
            variant="outlined"
          >
            <GetQuoteForm hideTitle={true} />
          </Paper>
        </div>
      </Container>
    </section>
  );
}
