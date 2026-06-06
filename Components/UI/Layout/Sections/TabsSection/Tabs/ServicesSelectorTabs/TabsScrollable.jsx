import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import Button from "@mui/material/Button";
import Image from "next/image";
import useMediaQuery from "@mui/material/useMediaQuery";
import ServiceCard from "../../Card/ServiceCard";

function CustomTabPanel(props) {
  const {
    children,
    value,
    index,
    childCardsData,
    archivePageSlug,
    archiveButtonTitle,
    ...other
  } = props;
  const serviceCards = childCardsData.map((item, key) => {
  
    return (
      <ServiceCard
        key={item.id}
        cta={{
          label: "LEARN MORE",
          link: `/${archivePageSlug}/${item.slug}`,
        }}
        image={item.acf.hero_section.image}
        title={item.title.rendered}
        description={item.excerpt?.rendered}
      />
    );
  });

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <>
          <div className="cards-wrapper mt-40">{serviceCards}</div>
          <Link
            href={`/${archivePageSlug}`}
            className="mt-32 flex justify-center"
          >
            <Button
              variant="contained"
              color="primary"
              size="large"
              disableElevation
            >
              All {archiveButtonTitle} Services
            </Button>
          </Link>
        </>
      )}
    </div>
  );
}
export default function ServiceTabsScrollable({ tabsData }) {
  const [value, setValue] = React.useState(0);
  const isTablet = useMediaQuery("(max-width:750px)"); // Use 'sm' for small screens

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const tabs = tabsData.map((item, index) => {
    return <Tab key={index} label={item.title} />;
  });
  return (
    <div>
      <Tabs
        value={value}
        onChange={handleChange}
        variant={isTablet ? "scrollable" : "fullWidth"} // Use scrollable on mobile and fullWidth on desktop
        scrollButtons="true"
        allowScrollButtonsMobile={true}
        aria-label="scrollable auto tabs"
        textColor="primary"
        indicatorColor="primary"
        className="tabs-wrapper"
      >
        {tabs}
      </Tabs>
      {/* content panels  */}
      {tabsData.map((item, index) => {
        return (
          <CustomTabPanel
            key={325 + index}
            value={value}
            index={index}
            className="cards-container"
            childCardsData={item.data}
            archivePageSlug={item.slug}
            archiveButtonTitle={item.title}
          ></CustomTabPanel>
        );
      })}
    </div>
  );
}

