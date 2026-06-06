import React from "react";
import styles from "./UspTable.module.scss";
import Container from "@mui/material/Container";
import Image from "next/image";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import Button from "@mui/material/Button";

export default function UspTable({ uspTableData }) {
    if(uspTableData === undefined) return null;
  const truckIcon = uspTableData.image_group.truck_icon;
  const trueIcon = uspTableData.image_group.true_icon;
  const secondaryTrueIcon = uspTableData.image_group.secondary_true_icon;
  const falseIcon = uspTableData.image_group.false_icon;
  return (
    <section className={`${styles.section}`}>
      <Container className={`${styles.headingContainer}`} maxWidth="lg">
        <Typography
          variant="h2"
          component="h2"
          align="center"
          className="pb-32"
        >
          Unbeatable Service
        </Typography>
        </Container>
        <Container className={`${styles.container} mt-56`} maxWidth="lg">
          <div className={`${styles.backgroundGradient} `}></div>
          <div className={`${styles.tableContainer} `}>
        <div className={`${styles.headerWrapper} `}>
          <div></div>
  
          <div
            className={`${styles.truckIcon} image-wrapper  flex align-center justify-center`}
          >
            {/* <Image
              src="/logo.png"
              alt="Logo"
              style={{ cursor: "pointer" }}
              quality={100}
              fill 
            /> */}
             <Typography variant="h6" component="div" align="center" className={`${styles.text}`}>
            Compass Removals
            </Typography>
          </div>
          <div
            className={`${styles.label} pt-16 pb-16 flex align-center justify-center`}
          >
            <Typography variant="h6" component="div" align="center" className={`${styles.text}`}>
              OTHERS
            </Typography>
          </div>
       
        </div>

        <div className={`${styles.tableWrapper}`}>
          {uspTableData.row.map((item, index) => {
                               
         let lastItem = (uspTableData.row.length -1) === index ? true : null;
        
            return (
              <div key={index} className={`${styles.rowWrapper}`}>
                <div className={`${styles.rowLabel} flex align-center `}>
                  <Typography variant="subtitle1" component="div" className={`${styles.text}`}>
                    {item.label}
                  </Typography>
                </div>
                <div
                  className={`${styles.rowValue} flex align-center justify-center`}
                >
                  {item.value.map((val, valIndex) => {

                    let icon = null;
                    let valueBackground =
                      valIndex === 0 ? styles.valueBackground : null;
                    if (val.true_or_false === true && valIndex === 0) {
                      icon = trueIcon;
                    } else if (val.true_or_false === true && (valIndex === 1 || valIndex === 2)) {
                      icon = secondaryTrueIcon;
                    }
                    
                    else {
                      icon = falseIcon;
                    }
                    return (
                      <div
                        key={valIndex}
                        className={`${styles.rowValueIcon} ${valueBackground} ${(lastItem && valIndex === 0) ? styles.borderLastItem : null }  flex align-center justify-center`}
                      >
                        <Typography variant="subtitle1" component="span" textAlign={"center"} className={`${styles.value}`}>{val.value}</Typography>
                     
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
        </div>
      </Container>
    </section>
  );
}
4532;
2250;
