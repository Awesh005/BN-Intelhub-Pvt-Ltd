import PolicyPage, { PolicySection } from './PolicyPage';

const sections: PolicySection[] = [
  {
    title: 'Acceptance of Terms',
    paragraphs: [
      'By using this website, submitting an enquiry, or engaging our services, you agree to be bound by these Terms and Conditions.',
      'If you do not agree with any part of these terms, please do not use the website or our services.',
    ],
  },
  {
    title: 'Use of Website',
    paragraphs: [
      'You agree to use this website only for lawful purposes and in a manner that does not disrupt the experience of other users or interfere with the operation of the site.',
    ],
    bullets: [
      'Do not attempt unauthorized access to the website or its systems.',
      'Do not submit false, misleading, or harmful information.',
      'Do not copy or reuse content without permission.',
    ],
  },
  {
    title: 'Services, Courses, and Enquiries',
    paragraphs: [
      'Information on this website is provided for general reference. Final scope, pricing, timelines, and deliverables for services, courses, internships, or training programs may be confirmed separately through discussion, proposal, or invoice.',
    ],
  },
  {
    title: 'Payments',
    paragraphs: [
      'Where payments apply, they must be made according to the agreed terms shared in writing or on the invoice. BN IntelHub Pvt Ltd may suspend or withhold services if payments are overdue or incomplete.',
    ],
  },
  {
    title: 'Intellectual Property',
    paragraphs: [
      'All website content, branding, text, graphics, and design elements are owned by BN IntelHub Pvt Ltd or used with permission. You may not reproduce or distribute them without prior written consent.',
    ],
  },
  {
    title: 'Limitation of Liability',
    paragraphs: [
      'We make reasonable efforts to keep the website accurate and available, but we do not guarantee uninterrupted access or error-free content. To the maximum extent permitted by law, BN IntelHub Pvt Ltd will not be liable for indirect or consequential losses arising from website use.',
    ],
  },
  {
    title: 'Changes to Terms',
    paragraphs: [
      'We may revise these Terms and Conditions at any time. Continued use of the website after changes are posted means you accept the updated terms.',
    ],
  },
];

export default function TermsAndConditions() {
  return (
    <PolicyPage
      badgeText="Terms & Conditions"
      title="Terms and Conditions"
      subtitle="These terms govern your use of the BN IntelHub website and the general rules that apply when you interact with our services and offerings."
      effectiveDate="Effective Date: April 28, 2026"
      sections={sections}
      contactEmail="bnintelhub.services@gmail.com"
    />
  );
}
