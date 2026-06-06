
'use client'
import * as React from "react";
import Tabs,  { tabsClasses } from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import PropTypes from "prop-types";
import BeforeAfter from "@/Components/UI/BeforeAfterSlider/BeforeAfter";
import Link from "next/link";
import Button from "@mui/material/Button";
import Image from "next/image";
import useMediaQuery from "@mui/material/useMediaQuery";

export default function ScrollableTabs({ tabsData }) {
  const [value, setValue] = React.useState(0);
  const isTablet = useMediaQuery("(max-width:750px)"); // Use 'sm' for small screens

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const tabs = tabsData.map((item, index) => {
    return <Tab key={index} label={item.title}  
    sx={{
      maxWidth: "none",
      marginRight: index !== tabsData.length - 1 ? "16px" : 0, // add 16px gap except last

      borderBottom: "2px solid var(--light-outline-variant)", // grey underline for ALL tabs
      "&.Mui-selected": {
        color: "var(--light-secondary)",
        borderBottom: "2px solid transparent", // hide grey when active
      },
    }}/>;
  });
  return (
      <div>
        <Tabs
          value={value}
          onChange={handleChange}
          variant={isTablet ? "scrollable" : "standard"} // Use scrollable on mobile and fullWidth on desktop
          scrollButtons="true"
          aria-label="scrollable auto tabs"
         textColor="secondary"
  indicatorColor="secondary"
          className="tabs-wrapper"
          centered={ !isTablet }
          sx={{
            color: "var(--light-secondary)", 
            [`& .${tabsClasses.scrollButtons}`]: {
              '&.Mui-disabled': { opacity: 0.3 },
            },
          }}
          slotProps={{
            indicator: {
              sx: {
                color: "red", 
                height: "2px",
                backgroundColor: "var(--light-secondary)",
              },
            },
          }}
        >
          {tabs}
        </Tabs>
        {/* content panels  */}
        {tabsData.map((item, index) => {
          return (
            <CustomTabPanel
              key={100 + index}
              value={value}
              index={index}
              className="description-wrapper"
              description={item.description}
              title={item.title}
              ctaArray={item.buttons}
              images={item.images}
            ></CustomTabPanel>
          );
        })}
      </div>
  );
}


function CustomTabPanel(props) {
  const {
    children,
    value,
    index,
    description,
    title,
    images,
    ctaArray,
    ...other
  } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <div className="tab-content-wrapper">
             <div className="content-wrapper">
     
            <Typography
              color="var(--dark-on-surface)"
              variant="body1"
              component="div"
              className="description heading-5 mt-24  mb-24 center-align"
              dangerouslySetInnerHTML={{ __html: description }}
            />
            { (ctaArray && ctaArray.length > 0) &&   
            <div className="cta-wrapper flex gap-8 flex-wrap mt-24">
              {ctaArray.map((cta, index) => {
                  return (
                    <Link key={index} href={cta.url} className="cta">
                      <Button
                        variant={`${index === 0 ? "contained" : "outlined"}`}
                        color="secondary"
                        disableElevation
                      >
                        {cta.label}
                      </Button>
                    </Link>
                  );
                })}
            </div>
            }
          </div>
          <div className="image-container border-radius-16" >
            {images.before_image && images.after_image && (
              <BeforeAfter
                showTitle={false}
                data={{
                  beforeImage: images.before_image,
                  afterImage: images.after_image,
                }}
              />
            )}
            {images.after_image && !images.before_image && (
              <div
                className="image-wrapper border-radius-16"
                style={{
              
                  paddingBottom: `${
                    (images.after_image.height / images.after_image.width) * 100
                  }%`,
                }}
              >
                <Image
                  src={images.after_image.url}
                  alt={images.after_image.url}
                  fill
                />
              </div>
            )}
          </div>
       
        </div>
      )}
    </div>
  );
}
