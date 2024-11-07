import React from "react";
import { ContactSection, Page, Seo } from "gatsby-theme-portfolio-minimal";

export default function ContactPage() {
  return (
    <>
      <Seo title="Skontaktuj się z nami" />
      <Page>
        <ContactSection sectionId="kontakt" heading="Pozostajemy do Twojej dyspozycji" />
      </Page>
    </>
  );
}
