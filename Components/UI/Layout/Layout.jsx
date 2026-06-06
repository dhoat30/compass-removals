import RowSection from "./Sections/RowSection/RowSection";
import ServicesSection from "./Sections/ServicesSection/ServicesSection";
import FaqAccordionSection from "./Sections/FaqAccordionSection/FaqAccordionSection";
import FormSection from "./Sections/FormSection/FormSection";
import FormHeroSection from "./Sections/FormHeroSection/FormHeroSection";
import RegularProcess from "./Sections/Process/RegularProcess";
import USP from "../USP/USP";
import Stats from "../Stats/Stats";
import LocationsCovered from "../LocationsCovered/LocationsCovered";
import HoursCalculator from "./Sections/HoursCalculator/HoursCalculator";
import ContactSection from "./Sections/ContactSection/ContactSection";
import SpaceCalculator from "./Sections/SpaceCalculator/SpaceCalculator";
import FooterCta from "../CTA/FooterCta";
import GoogleReviewsCarousel from "../GoogleReviews/GoogleReviewsCarousel";
import UspTable from "./Sections/UspTable/UspTable";
import VerticalTabs from "./Sections/VerticalTabs/VerticalTabs";
import CardsSection from "./Sections/CardsSection/CardsSection";
import TabsSection from "./Sections/TabsSection/TabsSection";
import LandingPageHeroSection from "./Sections/LandingPageHeroSection/LandingPageHeroSection";

export default function Layout({
  uspTable,
  sections,
  uspData,
  statsData,
  locationsCovered,
  hoursCalculatorData,
  spaceCalculatorData,
  contactInfo,
  socialData,
  servicesData,
  googleReviewsData,
  reviewerPics,
  routeId,
  serviceJobs,
}) {
  if (!sections) return null;
  const sectionsJSX = sections.map((section, index) => {

    // if (4 === 4) {
    //   return (
    //     <section key={index} className={` flex align-center`}>
    //       <ClientOnlyJobsMap jobs={serviceJobs} />
    //     </section>
    //   );
    // }
    if (section.acf_fc_layout === "tabs_section") {
      return (
        <TabsSection
          key={index}
          title={section.title}
          description={section.description}
          cards={section.cards}
        />
      );
    }
    if (section.acf_fc_layout === "row_layout") {
      let remappedAccordion;
      if (section.accordion) {
        remappedAccordion = section?.accordion?.map(({ title, value }) => ({
          question: title,
          answer: value,
        }));
      }

      return (
        <RowSection
          key={index}
          subtitle={section.subtitle}
          title={section.title}
          description={section.description}
          imageAlignment={section.image_alignment}
          image={section.image}
          ctaGroup={section.cta_group}
          bulletPoints={section.bullet_points}
          accordionData={remappedAccordion}
          showBeforeAfterImages={section.show_before_after_images}
          backgroundColor={section.background_color}
          fontColor={section.font_color}
          beforeImage={
            section.show_before_after_images &&
            section.before_after_images.before_image
          }
          afterImage={
            section.show_before_after_images &&
            section.before_after_images.after_image
          }
        />
      );
    }
    if (section.acf_fc_layout === "services") {
      return (
        <ServicesSection
          key={index}
          title={section.title}
          subtitle={section.subtitle}
          description={section.description}
          cards={section.cards}
        />
      );
    }
    if (section.acf_fc_layout === "cards_section") {
      return (
        <CardsSection
          key={index}
          title={section.section_title}
          description={section.section_description}
          cards={section.cards}
        />
      );
    }
    if (section.acf_fc_layout === "process") {
      return (
        <RegularProcess
          key={index}
          title={section.title}
          description={section.description}
          cards={section.cards}
          image={section.image}
        />
      );
    }

    // if (section.acf_fc_layout === "tabs_section") {
    //   return    <GradientTabs   key={index}
    //   title={section.section_title}
    //   description={section.section_description}
    //   cards={section.tabs}/>
    // }

    // if (section.acf_fc_layout === "packages") {
    //   return (
    //     <Packages
    //       key={index}
    //       serviceName={section.service_name}
    //       title={section.title}
    //       packagesArray={section.package}
    //       termsAndConditions={section.terms_conditions}
    //     />
    //   );
    // }
    if (section.acf_fc_layout === "local_faq") {
      return (
        <FaqAccordionSection
          key={index}
          title={section.section_title}
          description={section.section_description}
          qaData={section.items}
        />
      );
    }

  

    if (section.acf_fc_layout === "form_hero_section") {
      let graphicData;
      if (section.graphic_type === "new_graphic_type") {
        graphicData = section.new_graphic_type;
      }
      if (section.graphic_type === "image") {
        graphicData = section.image;
      }
      if (section.graphic_type === "youtube_video") {
        graphicData = section.youtube_video_group;
      }
      return (
        <FormHeroSection
          key={index}
          title={section.title}
          subtitle={section.subtitle}
          description={section.description}
          cta={section.cta}
          graphicType={section.graphic_type}
          graphicData={graphicData}
          uspData={section.usp}
          reviewTitle={section.review_title}
          reviewerPics={reviewerPics}
        />
      );
    }
if (section.acf_fc_layout === "landing_page_hero_section") {
     
      return (
        <LandingPageHeroSection key={index}
        aboveTitleUsp={section.above_title_usp}
          trustSnippet={section.trust_snippet}
          title={section.title}
          subtitle={section.subtitle}
          description={section.description}
          cta={section.cta}
        
          uspData={section.usp}
          reviewTitle={section.review_title}
          reviewerPics={reviewerPics}/> 
     
      );
    }
      if (section.acf_fc_layout === "form_section") {
      return (
        <FormSection
          key={index}
          title={section.title}
          description={section.description}
          usp={{ text_usp: section.text_usp, image_usp: section.image_usp }}
          graphic={section.graphic}
          reviewerPics={reviewerPics}
        />
      );
    }
    if (section.acf_fc_layout === "show_usp" && section.show_usp) {
      return (
        <VerticalTabs
          key={index}
          title={uspData.section_title}
          description={uspData.section_description}
          cards={uspData.items}
          showTitle={true}
        />
      );
    }
    if (section.acf_fc_layout === "show_stats" && section.show_stats) {
      return <Stats key={index} statsData={statsData} />;
    }
    if (section.acf_fc_layout === "show_locations" && section.show_locations) {
      if (!locationsCovered) return null;
      return (
        <LocationsCovered
          key={index}
          title={locationsCovered.title}
          description={locationsCovered.description}
          locations={locationsCovered.locations}
          image={locationsCovered.image}
        />
      );
    }
    if (section.acf_fc_layout === "locations_covered") {
      return (
        <LocationsCovered
          key={index}
          title={section.title}
          description={section.description}
          locations={section.locations}
          image={section.image}
        />
      );
    }

    if (
      section.acf_fc_layout === "show_hours_calculator" &&
      section.show_hours_calculator
    ) {
      if (!hoursCalculatorData) return null;
      return (
        <HoursCalculator
          key={index}
          title={hoursCalculatorData.title}
          description={hoursCalculatorData.description}
          calculatedValueLabel={hoursCalculatorData.calculated_value_label}
          furnishedLevelData={hoursCalculatorData.furnished_level}
          price={section.price}
        />
      );
    }
    if (
      section.acf_fc_layout === "show_space_calculator" &&
      section.show_space_calculator
    ) {
      if (!spaceCalculatorData) return null;
      return (
        <SpaceCalculator
          key={index}
          title={spaceCalculatorData.title}
          description={spaceCalculatorData.description}
          calculatedValueLabel={spaceCalculatorData.calculated_value_label}
          furnishedLevelData={spaceCalculatorData.furnished_level}
          price={section.price}
        />
      );
    }
    if (section.acf_fc_layout === "show_services" && section.show_services) {
      if (servicesData === undefined) return null;
      return (
        <ServicesSection
          key={index}
          title={servicesData.title}
          subtitle={servicesData.subtitle}
          description={servicesData.description}
          cards={servicesData.cards}
        />
      );
    }
    if (section.acf_fc_layout === "contact") {
      return (
        <ContactSection
          key={index}
          title={section.title}
          description={section.description}
          map={section.map}
          uspData={section.usp}
          contactInfo={contactInfo}
          socialData={socialData}
        ></ContactSection>
      );
    }
    if (section.acf_fc_layout === "cta_section") {
      return (
        <FooterCta
          key={index}
          title={section.title}
          description={section.description}
          ctaArray={section.cta}
        />
      );
    }
    if (
      section.acf_fc_layout === "show_reviews" &&
      googleReviewsData
    ) {
      return <GoogleReviewsCarousel key={index} data={googleReviewsData} />;
    }

    if (section.acf_fc_layout === "show_usp_table") {
      console.log("usp table data", uspTable);
      return <UspTable key={index} uspTableData={uspTable} />;
    }
  });

  return <section>{sectionsJSX} </section>;
}
