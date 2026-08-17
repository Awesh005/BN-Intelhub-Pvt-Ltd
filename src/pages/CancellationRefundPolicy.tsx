import PolicyPage, { PolicySection } from './PolicyPage';

const sections: PolicySection[] = [
  {
    title: 'Scope',
    paragraphs: [
      'This Cancellation and Fee Refund Policy applies to services, courses, training programs, and other paid offerings provided by BN IntelHub Pvt Ltd unless a separate written agreement states otherwise.',
    ],
  },
  {
    title: 'Cancellation Requests',
    paragraphs: [
      'If you need to cancel a booking, project, or enrollment, please notify us as early as possible by email or phone. Cancellation requests are reviewed based on the stage of work, the nature of the service, and any costs already incurred.',
    ],
    bullets: [
      'Service work already started may not be fully cancellable.',
      'Training or course enrollments may have separate class-specific rules.',
      'Cancellation approval depends on written confirmation from our team.',
    ],
  },
  {
    title: 'Refund Eligibility',
    paragraphs: [
      'Refunds, where applicable, are evaluated against the amount of work completed, materials shared, seats reserved, and administrative or processing costs. Any refund decision will be communicated after review of the request.',
    ],
    bullets: [
      'Advance payments may be partially refundable if work has not begun.',
      'Registration or processing fees may be non-refundable.',
      'Completed milestones, delivered materials, and active support periods are typically not refundable.',
    ],
  },
  {
    title: 'Processing Time',
    paragraphs: [
      'Approved refunds will be processed through the original payment method or another mutually agreed method within a reasonable timeframe, subject to banking or payment gateway timelines.',
    ],
  },
  {
    title: 'Company-Initiated Cancellations',
    paragraphs: [
      'If BN IntelHub Pvt Ltd must cancel a service or batch for operational reasons, we will offer rescheduling, service credit, or an eligible refund based on the circumstances.',
    ],
  },
  {
    title: 'Policy Updates',
    paragraphs: [
      'We may modify this policy when needed. The version posted on this page will be the current applicable policy.',
    ],
  },
];

export default function CancellationRefundPolicy() {
  return (
    <PolicyPage
      badgeText="Refund Policy"
      title="Cancellation and Fee Refund Policy"
      subtitle="This policy explains how cancellations and fee refund requests are handled for our services, courses, and other paid offerings."
      effectiveDate="Effective Date: April 28, 2026"
      sections={sections}
      contactEmail="bnintelhub.services@gmail.com"
    />
  );
}
