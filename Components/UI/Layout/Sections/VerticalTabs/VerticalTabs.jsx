'use client'

import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import styles from "./VerticalTabs.module.scss";
import Image from 'next/image';
import Container from '@mui/material/Container';

export default function VerticalTabs({title, description, cards, showTitle = false}) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div  className={`${styles.section} vertical-tabs`}>
        <Container maxWidth="xl" className={`${styles.container}`}>
    
     
      {cards && cards.length > 0 && cards.map((card, index) => { 
        const paddingBottom = (card.icon.height / card.icon.width) * 100 + '%'; // Calculate padding-bottom percentage
        return (
            <TabPanel value={value} index={index} key={index} className={`${styles.tabPanel}`}> 
                <div className={`${styles.imageWrapper} image-wrapper border-radius-16 `} style={{paddingBottom: paddingBottom}}>
                    <Image src={card.icon.sizes.large} alt={card.icon.alt || card.title} fill sizes=" (max-width: 1000px) 100vw, 50vw" />
                    </div>
          </TabPanel>
        )
      })} 
<div className={`${styles.tabsWrapper}`}>
      <div className={`${styles.titleWrapper}`}>
        <Typography variant="h4" component="h2" >
            {title}
            </Typography>
            <Typography variant="subtitle1" component="p" className="description mt-8">
            {description}
            </Typography>
      </div>
    <Tabs
        className={`${styles.tabs} mt-24`}
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        sx={{ borderRight: 1, borderColor: 'divider' }}
      > 
    
      {cards && cards.length > 0 && cards.map((card, index) => { 
        return (
            <Tab className={`${styles.tab} mb-8`}  sx={{ maxWidth: 'none', textAlign: "left", '&.Mui-selected': {
            color: 'var(--light-on-primary-container) !important',       // text color
            backgroundColor: 'var(--light-primary-container) !important',  // example active bg
            } }}  key={index} label={<TabNavigation title={card.title} description={card.description} image={card.icon}     isActive={value === index}/> } {...a11yProps(index)} />
        )
      })} 
      </Tabs>
      </div>
      </Container>
    </div>
  );
}

function TabNavigation({title, description, image, isActive }) {
    const paddingBottom = (image.height / image.width) * 100 + '%'; // Calculate padding-bottom percentage 
    return ( 
        <div className={`${styles.tabNavigation}`}>
            <Typography variant="subtitle1" component="h3" sx={{textTransform: "captialise !important", color: "unset", }} >
                {title}
                </Typography>
                <Typography variant="body1" component="p" sx={{textTransform: "initial !important", color: "unset"}} >
                {description}
                </Typography>
                {isActive && (
                <div className={`${styles.imageWrapper} image-wrapper border-radius-16 mt-16`} style={{paddingBottom: paddingBottom}}>
                    <Image src={image.sizes.large} alt={image.alt || title} fill sizes="(max-width: 600px) 100vw, (max-width: 1200px) 50vw, 33vw" />
                </div>
                )} 
        </div>
    )
}

function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`vertical-tabpanel-${index}`}
        aria-labelledby={`vertical-tab-${index}`}
        {...other}
        style={{
          width: '100%',
          height: '100%',
          overflow: 'hidden',  // ✅ no scroll here
        }}
      >
        {value === index && <div style={{height: "100%"}}>{children}</div>}
      </div>
    );
  }
  
  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };
  
  function a11yProps(index) {
    return {
      id: `vertical-tab-${index}`,
      'aria-controls': `vertical-tabpanel-${index}`,
    };
  }