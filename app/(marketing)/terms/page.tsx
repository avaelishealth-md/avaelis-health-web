import type { Metadata } from "next";
import { marked } from "marked";
import { sanitizeHtml } from "@/lib/sanitize";

export const metadata: Metadata = {
  title: "Terms of Use",
  description:
    "The terms that apply to using the AvaElis Health website. General information only, not medical advice.",
  alternates: { canonical: "/terms" },
};

// Standard AU clinic website terms. Bracketed [placeholders] must be filled before go-live
// (ABN, State/Territory governing law, contact email + postal address).
const MD = `Last updated: 16 June 2026

These Terms of Use apply to the AvaElis Health website at avaelishealth.com.au (the website). The website is operated by AvaElis Health (ABN [clinic ABN]) (we, us, our). Please read these terms carefully. By accessing or using the website, you agree to be bound by them.

## Acceptance of these terms

By accessing, browsing, or using this website, you confirm that you have read, understood, and agree to be bound by these Terms of Use and by our Privacy Policy. If you do not agree with any part of these terms, please do not use the website.

These terms apply to all visitors and users of the website, whether you are a patient, a clinician, a potential partner, or simply reading our articles.

## General information only, not medical advice

The content on this website, including articles, summaries, and other materials, is provided for general information and educational purposes only. It is not medical advice and must not be treated as a substitute for advice from a qualified health practitioner who knows your individual circumstances.

Using this website, reading our content, or contacting us does not create a doctor-patient relationship between you and AvaElis Health or Dr Danny Cai. A doctor-patient relationship is only established through a formal consultation that we have agreed to and confirmed with you.

You should not rely on any information on this website to diagnose, treat, or manage any health condition, and you should not delay seeking, or disregard, professional medical advice because of something you have read here. Always consult your general practitioner or another suitably qualified health professional about your specific situation before making any decision about your health, and before starting, stopping, or changing any treatment.

## Not for emergencies

This website is not designed for medical emergencies and we do not monitor enquiries in real time. If you are experiencing a medical emergency, or you believe your life or someone else's life may be at risk, call 000 immediately or go to your nearest hospital emergency department.

## Enquiries and expressions of interest

If you submit an enquiry, subscribe to our newsletter, or request information through the website, you are making a request to us. Submitting any form does not create, confirm, or guarantee an appointment, consultation, treatment, or any other service.

We will respond to genuine enquiries personally to discuss next steps. An appointment or engagement only exists once we have expressly agreed and confirmed the arrangement directly with you. Please do not include any information in a form that you would not want to share, and please keep in mind the guidance above about emergencies and urgent health concerns.

You agree to provide accurate information when you contact us and to use the website's forms and features only for their intended, lawful purposes.

## Intellectual property

All content on this website, including text, articles, summaries, images, graphics, logos, and the AvaElis Health name and branding, is owned by or licensed to AvaElis Health and is protected by Australian and international intellectual property laws.

You may view and read the content for your own personal, non-commercial use. You must not copy, reproduce, republish, distribute, modify, adapt, or use any part of the website or its content for any other purpose without our prior written permission. The AvaElis Health name, logo, and branding must not be used without our written consent.

## Third-party links

The website may contain links to other websites or resources operated by third parties. These links are provided for your convenience and information only. We do not control, endorse, or take responsibility for the content, products, services, or privacy practices of any third-party website. Accessing any linked website is at your own risk, and we encourage you to read the terms and privacy policies of any third-party site you visit.

## No warranties

We aim to keep the information on this website accurate and up to date, but we make no representations or warranties of any kind, express or implied, about the completeness, accuracy, reliability, suitability, or availability of the website or its content.

The website and its content are provided on an "as is" and "as available" basis. We do not warrant that the website will be uninterrupted, secure, free of errors, or free of viruses or other harmful components.

## Limitation of liability

To the maximum extent permitted by law, AvaElis Health, Dr Danny Cai, and our staff and service providers will not be liable for any loss, damage, cost, or expense (including direct, indirect, incidental, special, or consequential loss) arising from or connected with your use of, or inability to use, this website or its content, or your reliance on any information provided on the website.

Nothing in these terms excludes, restricts, or modifies any consumer guarantee, right, or remedy that you have under the Australian Consumer Law or any other law that cannot be lawfully excluded or limited. Where our liability cannot be excluded but can be limited, our liability is limited to the extent permitted by law.

## Privacy

We take your privacy seriously. Our Privacy Policy explains how we collect, use, store, and protect the personal information you provide through the website, including any health information you choose to share with us. By using the website, you acknowledge that your personal information will be handled in accordance with our Privacy Policy. Please read it together with these Terms of Use.

## Changes to these terms

We may update or amend these Terms of Use from time to time to reflect changes in our practices or legal requirements. Any changes take effect once the updated terms are published on this website. The "Last updated" date at the top of this page shows when the terms were most recently changed. Your continued use of the website after any change means you accept the revised terms, so we encourage you to review this page from time to time.

## Governing law

These Terms of Use are governed by the laws of [State or Territory], Australia. You agree to submit to the non-exclusive jurisdiction of the courts of [State or Territory] and the courts of appeal from them in relation to any matter arising from or connected with these terms or your use of the website.

## Contact us

If you have any questions about these Terms of Use, please contact us at [privacy contact email] or by post at [clinic postal address].`;

export default async function TermsPage() {
  const html = sanitizeHtml(await marked.parse(MD));
  return (
    <>
      <div className="phero">
        <div className="wrap">
          <div className="breadcrumb">
            <a href="/">Home</a> / Terms of Use
          </div>
          <h1>Terms of Use</h1>
        </div>
      </div>
      <div className="pad-s wrap">
        <article className="article" dangerouslySetInnerHTML={{ __html: html }} />
      </div>
    </>
  );
}
