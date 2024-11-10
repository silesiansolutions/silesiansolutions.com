import React from "react";
import { Page, Seo } from "gatsby-theme-portfolio-minimal";
import { ContactSection } from "../sections/Contact";

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
