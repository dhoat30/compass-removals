import Typography from "@mui/material/Typography";
import Image from "next/image";
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';import styles from "./HeroUSP.module.scss";
export default function HeroUSPBox({ data, className, twoColumnsGrid }) {
  if (!data) return;
  return (
    <div  className={`${className} ${styles.textUspContainerBox} flex justify-center `} >
      {( data.text_usp && data?.text_usp?.length > 0 )
      
      && 
      <div className={`${styles.textUspWrapper} ${twoColumnsGrid && styles.twoColumnsGrid} usp-wrapper mb-16 flex flex-wrap mt-16 gap-16  `} > 
      {data.text_usp.map((item, index) => { 

        return (
          <Typography
            variant="subtitle1"
            component="div"
            className={`flex align-center justify-center align-start  gap-4 ${styles.textUSP}`}
            key={index}

          >
            <CheckCircleOutlineOutlinedIcon className={`${styles.icon}`}  />
            <span> {item.value}</span>
          </Typography>
        );
      })}
    </div>
      }
 
    </div>
  );
}

