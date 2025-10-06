"use client";
import React from "react";
import ZigZagCardsSection from "./Sections/ZigZagCardsSection";
import RowSection from "./Sections/RowSection";
import ServicesSection from "./Sections/ServicesSection";

import Packages from "./Sections/Packages";
import FaqAccordionSection from "./Sections/FaqAccordionSection";
import ServiceChecklist from "./Sections/ServiceChecklist";
import MenuSection from "./Sections/MenuSection";
import MenuSection2 from "./Sections/MenuSection2";

import ComboDealsSection from "./Sections/ComboDealsSection";
import RowStatusSection from "./Sections/RowStatusSection";
import BackgroundImageRowSection from "./Sections/BackgroundImageRowSection";
import CateringPackageSection from "./Sections/CateringPackageSection";
import JustImageHero from "../Hero/JustImageHero/JustImageHero";
import PosterSection from "./Sections/PosterSection";
import ImageGridSection from "./Sections/ImageGridSection";
import BeigeSection from "./Sections/BeigeSection";
import ProcessSection from "./Sections/ProcessSection";
import BulkCurryOptions from "./Sections/BulkCurryOptions";
import CenterAlignedRow from "./Sections/CenterAlignedRow";
import CelebrationSection from "./Sections/CelebrationSection";
import RowSectionWhite from "./Sections/RowSectionWhite";
export default function Layout({
  sections,
  comboDealsData,
  cateringPackagesData,
  className,
}) {
  if (!sections) return null;
  console.log("sections", sections);
  const sectionsJSX = sections.map((section, index) => {
    if (section.acf_fc_layout === "zigzag_cards") {
      return (
        <ZigZagCardsSection
          key={index}
          title={section.title}
          subtitle={section.subtitle}
          cards={section.cards}
        />
      );
    }
    if(section.acf_fc_layout === "process"){ 
      return <ProcessSection 
      key={index}
      title={section.title}
      description={section.description}
      backgroundImage = {section.background_image}
      cards={section.cards}
      extraInfoGroup={section.extra_info_group}
      /> 
    }
    if(section.acf_fc_layout === "bulk_curry_options"){
     return <BulkCurryOptions
        key={index}
      title={section.title}
      termsAndConditions={section.terms_and_conditions}
      link = {section.link}
      cards={section.cards}
     /> 
    } 
    if(section.acf_fc_layout === "celebration_section"){
      return <CelebrationSection
        key={index}
        title={section.title}
        description={section.description}
        images={section.images}
      />
    }
    if(section.acf_fc_layout === "center_aligned_row"){
      return <CenterAlignedRow 
      key={index}
      title={section.title}
      link={section.link}
      />; 
    }
    if(section.acf_fc_layout === "beige_section"){ 
      return (<BeigeSection 
      key={index}
      title={section.title}
      description={section.description}
      backgroundImage={section.background_image}
 
      /> )
    } 
    if (section.acf_fc_layout === "row") {
      return (
        <RowSection
          key={index}
          title={section.title}
          description={section.description}
          imageAlignment={section.image_alignment}
          image={section.image}
          ctaGroup={section.cta_group}
          bulletPoints={section.bullet_points}
          showBeforeAfterImages={section.show_before_after_images}
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
       if (section.acf_fc_layout === "white_row") {
      return (
        <RowSectionWhite
          key={index}
          title={section.title}
          description={section.description}
          imageAlignment={section.image_alignment}
          image={section.image}
          ctaGroup={section.cta_group}
          bulletPoints={section.bullet_points}
          showBeforeAfterImages={section.show_before_after_images}
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
    if (section.acf_fc_layout === "background_image_row") {
      return (
        <BackgroundImageRowSection
          key={index}
          subtitle={section.subtitle}
          title={section.title}
          description={section.description}
          image={section.background_image}
          ctaGroup={section.cta_group}
          contentAlignment={section.content_alignment}
        />
      );
    }
    if (section.acf_fc_layout === "stats_row") {
      return (
        <RowStatusSection
          key={index}
          subtitle={section.subtitle}
          title={section.title}
          description={section.description}
          statsArray={section.stats}
          image={section.images.main_image}
          firstSmallImage={section.images.first_small_image}
          secondSmallImage={section.images.second_small_image}
          ctaGroup={section.cta_group}
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
          cards={section.card}
          sectionCtaGroup={section.cta_group}
        />
      );
    }
 

    if (section.acf_fc_layout === "packages") {
      return (
        <Packages
          key={index}
          serviceName={section.service_name}
          title={section.title}
          packagesArray={section.package}
          termsAndConditions={section.terms_conditions}
        />
      );
    }
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
    if (section.acf_fc_layout === "service_checklist") {
      return (
        <ServiceChecklist
          key={index}
          title={section.title}
          description={section.description}
          cards={section.items}
        />
      );
    }
    if (section.acf_fc_layout === "menu_section") {
      return (
        <MenuSection
          key={index}
          title={section.title}
          description={section.description}
          cards={section.items}
          backgroundImage = {section.background_image}
        />
      );
    }
        if (section.acf_fc_layout === "menu_section_2") {
      return (
        <MenuSection2
          key={index}
          title={section.title}
          description={section.description}
          cards={section.items}
          backgroundImage = {section.background_image}
          termsAndConditions={section.terms_and_conditions}
          link={section.link}
          extraInfoGroup={section.extra_info_group}
        />
      );
    }
    if (section.acf_fc_layout === "combo_deals") {
      if (!comboDealsData || section.show_combo_deals === false) return null;
      return (
        <ComboDealsSection
          key={index}
          title={comboDealsData.title}
          description={comboDealsData.description}
          cards={comboDealsData.combo_info}
          
        />
      );
    }
    if(section.acf_fc_layout === "image_grid_section"){
      return <ImageGridSection 
      key={index} 
      title={section.title}
      description={section.description}
      mainImage={section.main_image} 
        images={section.images}
      link = {section.link}

      /> 
    } 
    if (section.acf_fc_layout === "catering_packages") {
      if (!cateringPackagesData || section.show_catering_packages === false) {
        return null;
      }
      return (
        <CateringPackageSection
          key={index}
          title={cateringPackagesData.title}
          description={cateringPackagesData.description}
          cards={cateringPackagesData.combo_info}
        />
      );
    }
    if (section.acf_fc_layout === "hero_section") {
    
      return <JustImageHero 
      key={index}
      heroTitleImage={section.title_image}
      description={section.description}
      desktopImage={section.desktop_image}
      mobileImage={section.mobile_image}
      ctaArr={section.cta_repeater}

      /> 
    }
    if (section.acf_fc_layout === "poster_section") {
     
      return <PosterSection
      key={index}
      title={section.title}
      cards={section.cards}
      themeStyle = {section.theme_style}
      /> 
    }
  });

  return <div className={className}>{sectionsJSX} </div>;
}
