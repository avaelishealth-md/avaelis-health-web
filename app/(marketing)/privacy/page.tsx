import type { Metadata } from "next";
import { marked } from "marked";
import { sanitizeHtml } from "@/lib/sanitize";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How AvaElis Health collects, uses, stores and protects your personal information, in line with the Australian Privacy Principles.",
  alternates: { canonical: "/privacy" },
};

// Standard AU clinic privacy policy. Bracketed [placeholders] must be filled before go-live
// (ABN, legal entity, postal address, State/Territory, privacy contact email).
const MD = `Last updated: 16 June 2026

AvaElis Health ("AvaElis Health", "we", "us" or "our") is committed to protecting the privacy of people who visit our website and contact us. This policy explains how we collect, use, store, disclose and protect personal information through our website at avaelishealth.com.au.

We handle personal information in accordance with the Privacy Act 1988 (Cth) and the Australian Privacy Principles (APPs). By using our website or submitting information through it, you agree to the practices described in this policy.

## Who we are

AvaElis Health is an Australian boutique longevity and preventive medicine clinic led by Dr Danny Cai (GP, FRACGP). Our website is an information and enquiry resource. Visitors can read articles and submit an enquiry, and we then respond personally to arrange a consultation where appropriate. We do not sell products or take payment through this website.

For privacy questions, you can contact us using the details in the "How to contact us" section below.

## What personal information we collect

We only collect personal information that is reasonably necessary for our activities. The information we collect through the website depends on how you choose to interact with us.

**Enquiry form.** When you submit an enquiry, we collect your full name, your email address, the type of enquiry you are making (for example, whether you are enquiring as a patient, a clinician or a partner) and the free-text message you write about what is prompting your enquiry.

**Newsletter form.** When you subscribe to our newsletter, we collect your email address.

**Clinician talk-summary form.** When you request a talk summary, we collect your full name, your email address and your profession or role.

**Website usage information.** When you visit our website, we automatically collect limited technical information about your visit, such as pages viewed and general usage patterns, through cookies and analytics (see the "Cookies and analytics" section below).

### Sensitive and health information

The free-text message in our enquiry form lets you describe what is prompting your enquiry. You may choose to include health-related details in that message. Health information is a type of sensitive information under the Privacy Act 1988 (Cth) and is given extra protection.

We do not require you to provide health information through the website, and we ask that you share only what you are comfortable sharing at this early stage. Where you do provide health or other sensitive information, we collect, use and disclose it only with your consent and only for the purposes described in this policy, such as responding to your enquiry and arranging an appropriate consultation. More detailed health information is usually gathered later, directly with you, as part of your care.

## Why we collect and use your information

We collect and use personal information to:

- respond to your enquiry and communicate with you;
- arrange and prepare for consultations where appropriate;
- send you information you have specifically requested, such as a newsletter or a talk summary;
- maintain a record of our communications with you;
- understand how our website is used so that we can improve it; and
- meet our legal and professional obligations.

If we wish to use your information for a purpose that is not described in this policy, we will seek your consent unless we are otherwise permitted or required to do so by law.

## Cookies and analytics

Our website uses cookies, which are small files stored on your device, to help the site work and to understand how visitors use it. We use Google Analytics, a web analytics service, to collect information about website usage, such as the pages people visit and how they move through the site. This information is used in aggregate to help us improve the website and is generally not used to identify you personally.

You can set your browser to refuse some or all cookies, or to alert you when a website sets a cookie. If you disable cookies, some parts of our website may not function as intended. Google provides its own information about how it collects and processes data through its services, which you can review on the Google website.

## Who we share your information with

We do not sell your personal information. We do not trade or rent it to third parties.

We share personal information only where it is necessary to operate our website and respond to you, and only with service providers who are bound to protect it and to use it only for the purposes we engage them for. These include:

- an email marketing and customer relationship management (CRM) provider, which we use to manage enquiries and newsletter subscriptions;
- an analytics provider (Google Analytics), as described above;
- an email delivery provider, which we use to send transactional emails such as a requested talk summary; and
- secure website hosting and IT service providers who support the website and store its data.

We may also disclose personal information where we are required or authorised to do so by law, or to protect the safety of any person.

## Overseas storage and disclosure

Some of the service providers we use may store or process personal information on servers located outside Australia. This means that, in some cases, your personal information may be stored or handled overseas.

Where this occurs, we take reasonable steps to ensure that the information continues to be handled in a manner consistent with the Australian Privacy Principles. By providing your information to us through this website, you consent to it being stored and processed in this way.

## How we keep your information secure

We take reasonable steps to protect personal information from misuse, interference and loss, and from unauthorised access, modification or disclosure. These steps include using reputable service providers with their own security measures, limiting access to personal information to those who need it, and using secure hosting for the website and its data.

No method of transmitting or storing information over the internet is completely secure. While we work to protect your personal information, we cannot guarantee absolute security, and any information you send to us online is at your own risk.

## How long we keep your information

We keep personal information only for as long as it is needed for the purposes described in this policy, or for as long as we are required to keep it to meet our legal and professional obligations. When personal information is no longer required, we take reasonable steps to securely delete or de-identify it. If you ask us to remove you from our newsletter list, we will action that request promptly.

## Accessing and correcting your information

You have the right to ask for access to the personal information we hold about you, and to ask us to correct it if it is inaccurate, out of date, incomplete or misleading.

To make a request, please contact us using the details in the "How to contact us" section below. We may need to verify your identity before providing access. In most cases we will respond within a reasonable period. If we are unable to provide access or make a correction, we will explain why, where we are permitted to do so.

## Making a privacy complaint

If you have a concern about how we have handled your personal information, please contact us first using the details below. We take privacy concerns seriously and will work with you to resolve the matter, and we will respond within a reasonable period.

If you are not satisfied with our response, you can lodge a complaint with the Office of the Australian Information Commissioner (OAIC):

- Website: www.oaic.gov.au
- Phone: 1300 363 992

## Children's privacy

Our website is intended for adults and is not directed at children. We do not knowingly collect personal information from children through the website. If you believe a child has provided us with personal information, please contact us so that we can take appropriate steps.

## Changes to this policy

We may update this policy from time to time to reflect changes in our practices or legal obligations. The current version will always be available on this website, and the "Last updated" date at the top shows when it was last revised. We encourage you to review this policy periodically.

## How to contact us

If you have any questions about this policy or about how we handle your personal information, you can contact us at:

- Email: info@avaelishealth.com.au

We will do our best to answer your questions and resolve any concerns.`;

export default async function PrivacyPage() {
  const html = sanitizeHtml(await marked.parse(MD));
  return (
    <>
      <div className="phero">
        <div className="wrap">
          <div className="breadcrumb">
            <a href="/">Home</a> / Privacy Policy
          </div>
          <h1>Privacy Policy</h1>
        </div>
      </div>
      <div className="pad-s wrap">
        <article className="article" dangerouslySetInnerHTML={{ __html: html }} />
      </div>
    </>
  );
}
