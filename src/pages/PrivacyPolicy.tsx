import PolicyPage, { PolicySection } from './PolicyPage';

const sections: PolicySection[] = [
  {
    title: 'Information We Collect',
    paragraphs: [
      'We may collect personal details you share with us through contact forms, enquiry forms, WhatsApp messages, email, or direct conversations with our team.',
      'This can include your name, phone number, email address, organization name, course interest, internship interest, and any information you choose to provide.',
    ],
    bullets: [
      'Contact details submitted through forms or email.',
      'Project, course, or internship enquiry details.',
      'Basic website usage data such as browser type, device type, and page visits.',
    ],
  },
  {
    title: 'How We Use Your Information',
    paragraphs: [
      'We use the information we collect to respond to enquiries, provide services, share course or internship information, improve our website, and communicate with you about updates relevant to your request.',
      'We may also use the information to maintain records, manage support requests, and improve customer experience.',
    ],
  },
  {
    title: 'Sharing and Disclosure',
    paragraphs: [
      'We do not sell or rent your personal information. We may share limited information with trusted team members, service providers, or legal authorities only when necessary to operate our business or comply with law.',
    ],
  },
  {
    title: 'Data Security',
    paragraphs: [
      'We take reasonable technical and organizational measures to protect your information. However, no electronic transmission or storage system is completely secure, and we cannot guarantee absolute security.',
    ],
  },
  {
    title: 'Cookies and Analytics',
    paragraphs: [
      'Our website may use cookies or similar technologies to improve performance, understand usage, and enhance user experience. You can control cookie behavior through your browser settings.',
    ],
  },
  {
    title: 'Your Choices',
    paragraphs: [
      'You may contact us to update, correct, or request deletion of personal information you have shared with us, subject to legal and operational requirements.',
    ],
  },
  {
    title: 'Changes to This Policy',
    paragraphs: [
      'We may update this Privacy Policy from time to time. Any changes will be reflected on this page with an updated effective date.',
    ],
  },
];

export default function PrivacyPolicy() {
  return (
    <PolicyPage
      badgeText="Privacy Policy"
      title="Privacy Policy"
      subtitle="This policy explains how BN IntelHub Pvt Ltd collects, uses, and protects personal information shared through our website and communication channels."
      effectiveDate="Effective Date: April 28, 2026"
      sections={sections}
      contactEmail="bnintelhub@gmail.com"
    />
  );
}
