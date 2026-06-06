import Typography from "@mui/material/Typography";
import Image from "next/image";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import styles from "./HeroUSP.module.scss";
export default function HeroUSP({ data, className, twoColumnsGrid }) {
  if (!data) return;
  return (
    <div  className={`${className} ${styles.textUspContainer} mt-16 `} >
      {( data.text_usp && data?.text_usp?.length > 0 )
      
      && 
      <div className={`${styles.textUspWrapper} ${twoColumnsGrid && styles.twoColumnsGrid} usp-wrapper mb-16 grid space-between `} > 
      {data.text_usp.map((item, index) => { 

        return (
          <Typography
            variant="subtitle2"
            component="div"
            className={`flex align-center justify-center align-start mb-8 gap-4 ${styles.textUSP}`}
            key={index}

          >
            <CheckCircleIcon />
            <span> {item.value}</span>
          </Typography>
        );
      })}
    </div>
      }
 
      <div className="image-usp-wrapper flex gap-8 align-center flex-wrap">
        {data.image_usp &&
          data.image_usp.map((item, index) => {
            return (
              <Image
                key={index}
                src={item.image.url}
                alt={item.image.alt}
                width={item.image.width}
                height={item.image.height}
              />
            );
          })}
      </div>
    </div>
  );
}

