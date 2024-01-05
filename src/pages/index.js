import React from "react";
import {
  AboutSection,
  ContactSection,
  HeroSection,
  Page,
  Seo,
} from "gatsby-theme-portfolio-minimal";

export default function IndexPage() {
  return (
    <>
      <Seo title="Silesian Solutions" />
      <Page useSplashScreenAnimation>
        <HeroSection sectionId="hero" />
        <AboutSection sectionId="o-nas" heading="O nas" />
        <ContactSection sectionId="kontakt" heading="Kontakt" />
      </Page>
    </>
  );
}
