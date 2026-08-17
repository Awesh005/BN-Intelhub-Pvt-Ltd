import { useEffect, useRef, useState, type ChangeEvent, type FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, CheckCircle } from 'lucide-react';
import { createPortal } from 'react-dom';
import { markSubmission, sanitizeEmail, sanitizePhone, sanitizeText, validateSubmission } from '@/lib/formSecurity';

interface BootcampEnquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const bootcampOptions = [
  'Web Development',
  'Android',
  'Data Analytics',
  'Full Stack AI - PHP/Java/Node/Python',
];

const callTimeOptions = [
  '9:00 AM - 12:00 PM',
  '12:00 PM - 3:00 PM',
  '3:00 PM - 6:00 PM',
  '6:00 PM - 9:00 PM',
];

const graduationYears = Array.from({ length: 9 }, (_, index) => String(2024 + index));

export default function BootcampEnquiryModal({ isOpen, onClose }: BootcampEnquiryModalProps) {
  const [formData, setFormData] = useState({
    occupation: '',
    bootcamp: '',
    callTime: '',
    graduationYear: '',
    fullName: '',
    email: '',
    contactNumber: '',
    dob: '',
    education: '',
    collegeName: '',
    fieldOfStudy: '',
    city: '',
    notes: '',
    website: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const startedAtRef = useRef(Date.now());

  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => setIsSuccess(false), 300);
      return;
    }

    const previousStyles = {
      overflow: document.body.style.overflow,
      htmlOverflow: document.documentElement.style.overflow,
      overscrollBehavior: document.body.style.overscrollBehavior,
    };

    document.body.style.overflow = 'hidden';
    document.body.style.overscrollBehavior = 'contain';
    document.documentElement.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = previousStyles.overflow;
      document.body.style.overscrollBehavior = previousStyles.overscrollBehavior;
      document.documentElement.style.overflow = previousStyles.htmlOverflow;
    };
  }, [isOpen]);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    const submissionError = validateSubmission({
      formKey: 'bootcamp-enquiry',
      honeypot: formData.website,
      startedAt: startedAtRef.current,
    });
    if (submissionError) {
      alert(submissionError);
      return;
    }

    const googleFormData = new URLSearchParams();
    // 13 Mapped Fields for Google Form
    googleFormData.append('entry.1768448150', sanitizeText(formData.occupation)); // Occupation
    googleFormData.append('entry.536429472', sanitizeText(formData.bootcamp)); // Choose Bootcamp
    googleFormData.append('entry.1633201764', sanitizeText(formData.callTime)); // Preferred Call Time
    googleFormData.append('entry.1846757746', sanitizeText(formData.graduationYear)); // Graduation Year
    googleFormData.append('entry.660211658', sanitizeText(formData.fullName)); // Full Name
    googleFormData.append('entry.1823693603', sanitizeEmail(formData.email)); // Email
    googleFormData.append('entry.456355933', sanitizePhone(formData.contactNumber)); // Contact Number
    googleFormData.append('entry.705121525', sanitizeText(formData.dob)); // Date of Birth
    googleFormData.append('entry.509702465', sanitizeText(formData.education)); // Education
    googleFormData.append('entry.1254208559', sanitizeText(formData.collegeName)); // College Name
    googleFormData.append('entry.1531935208', sanitizeText(formData.fieldOfStudy)); // Field Of Study
    googleFormData.append('entry.1123157707', sanitizeText(formData.city)); // City
    googleFormData.append('entry.2138539477', sanitizeText(formData.notes)); // Anything Else

    try {
      setIsSubmitting(true);
      // Using the exact Google Form URL provided by the user for Option B setup
      await fetch(
        'https://docs.google.com/forms/d/e/1FAIpQLSc8zjmpEByjl_HE0C0GwCZOQkT0LR8fpLUzoujzXEn2XcBn6w/formResponse',
        {
          method: 'POST',
          mode: 'no-cors',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          body: googleFormData.toString(),
        }
      );

      markSubmission('bootcamp-enquiry');
      setIsSuccess(true);

      setFormData({
        occupation: '',
        bootcamp: '',
        callTime: '',
        graduationYear: '',
        fullName: '',
        email: '',
        contactNumber: '',
        dob: '',
        education: '',
        collegeName: '',
        fieldOfStudy: '',
        city: '',
        notes: '',
        website: '',
      });
      startedAtRef.current = Date.now();
      
      // Auto close modal after 3 seconds
      setTimeout(() => {
        onClose();
      }, 3000);
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('There was an error submitting the form. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100000] flex items-center justify-center p-3 sm:p-4 bg-slate-950/60 backdrop-blur-sm overscroll-contain">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="bootcamp-enquiry-title"
            className="bg-white rounded-lg w-full max-w-3xl max-h-[92dvh] sm:max-h-[90vh] overflow-hidden shadow-2xl flex flex-col"
          >
            <div className="p-5 sm:p-6 border-b border-slate-100 flex justify-between items-center bg-white z-10">
              <div>
                <h2 id="bootcamp-enquiry-title" className="text-xl sm:text-2xl font-bold text-slate-900">
                  Hey! We are happy to guide you into becoming a confident engineer
                </h2>
                <p className="text-sm text-slate-500 mt-1">Fill the form and our team will call you back.</p>
              </div>
              <button type="button" onClick={onClose} aria-label="Close bootcamp enquiry" className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
                <X size={24} className="text-slate-500" />
              </button>
            </div>

            {isSuccess ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center p-12 py-20 text-center"
              >
                <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mb-6 shadow-inner">
                  <CheckCircle className="w-10 h-10 text-emerald-600" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-2">Application Submitted!</h3>
                <p className="text-slate-500 max-w-sm">
                  Thank you for applying to the Bootcamp. Our team will contact you shortly to guide you further.
                </p>
              </motion.div>
            ) : (
            <form onSubmit={handleSubmit} className="p-5 sm:p-6 space-y-5 sm:space-y-6 overflow-y-auto overscroll-contain">
              <input
                type="text"
                name="website"
                tabIndex={-1}
                autoComplete="off"
                value={formData.website}
                onChange={handleChange}
                className="hidden"
                aria-hidden="true"
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Occupation</label>
                  <select
                    name="occupation"
                    value={formData.occupation}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white focus:border-orange-500 focus:ring-2 focus:ring-orange-100 outline-none transition-all"
                  >
                    <option value="">Select Occupation</option>
                    <option value="Student">Student</option>
                    <option value="Working">Working</option>
                    <option value="Gap Year">Gap Year</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Choose Bootcamp *</label>
                  <select
                    name="bootcamp"
                    required
                    value={formData.bootcamp}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white focus:border-orange-500 focus:ring-2 focus:ring-orange-100 outline-none transition-all"
                  >
                    <option value="">Select Choose Bootcamp</option>
                    {bootcampOptions.map(option => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Preferred Call Time</label>
                  <select
                    name="callTime"
                    value={formData.callTime}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white focus:border-orange-500 focus:ring-2 focus:ring-orange-100 outline-none transition-all"
                  >
                    <option value="">Select Preferred Call Time</option>
                    {callTimeOptions.map(option => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Graduation Year</label>
                  <select
                    name="graduationYear"
                    value={formData.graduationYear}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white focus:border-orange-500 focus:ring-2 focus:ring-orange-100 outline-none transition-all"
                  >
                    <option value="">Select Graduation Year</option>
                    {graduationYears.map(year => (
                      <option key={year} value={year}>{year}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Full Name *</label>
                  <input
                    type="text"
                    name="fullName"
                    required
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="Enter Full Name"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-100 outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Email *</label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter Email"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-100 outline-none transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Contact Number *</label>
                  <input
                    type="tel"
                    name="contactNumber"
                    required
                    value={formData.contactNumber}
                    onChange={handleChange}
                    placeholder="Enter Contact Number"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-100 outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Date of Birth *</label>
                  <input
                    type="text"
                    name="dob"
                    required
                    value={formData.dob}
                    onChange={handleChange}
                    placeholder="dd-mm-yyyy"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-100 outline-none transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Education *</label>
                  <input
                    type="text"
                    name="education"
                    required
                    value={formData.education}
                    onChange={handleChange}
                    placeholder="Enter Education"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-100 outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">College Name *</label>
                  <input
                    type="text"
                    name="collegeName"
                    required
                    value={formData.collegeName}
                    onChange={handleChange}
                    placeholder="Enter College Name"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-100 outline-none transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Field Of Study *</label>
                  <input
                    type="text"
                    name="fieldOfStudy"
                    required
                    value={formData.fieldOfStudy}
                    onChange={handleChange}
                    placeholder="Enter Field Of Study"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-100 outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">City *</label>
                  <input
                    type="text"
                    name="city"
                    required
                    value={formData.city}
                    onChange={handleChange}
                    placeholder="Enter City"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-100 outline-none transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Anything Else You Would Like to Share</label>
                <textarea
                  name="notes"
                  rows={4}
                  value={formData.notes}
                  onChange={handleChange}
                  placeholder="Enter Anything Else You Would Like to Share"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-100 outline-none transition-all resize-none"
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-orange-500 text-slate-950 font-semibold text-base shadow-md shadow-orange-950/10 hover:bg-orange-400 transition disabled:cursor-not-allowed disabled:bg-slate-400 disabled:text-white"
                >
                  {isSubmitting ? 'Submitting...' : 'Get a Call Back'}
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="inline-flex items-center justify-center px-6 py-3 rounded-lg border border-slate-200 text-slate-700 font-semibold text-base hover:bg-slate-50 transition"
                >
                  Cancel
                </button>
              </div>
            </form>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
}
