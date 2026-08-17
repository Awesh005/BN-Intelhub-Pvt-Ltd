import { useEffect, useRef, useState, type ChangeEvent, type FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Upload } from 'lucide-react';
import { createPortal } from 'react-dom';
import { SERVICES } from '../constants';
import { markSubmission, sanitizeEmail, sanitizePhone, sanitizeText, validateSubmission } from '@/lib/formSecurity';

interface ServiceEnquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ServiceEnquiryModal({ isOpen, onClose }: ServiceEnquiryModalProps) {
  const [formData, setFormData] = useState({
    companyName: '',
    name: '',
    mobile: '',
    email: '',
    address: '',
    service: '',
    logo: null as File | null,
    website: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const startedAtRef = useRef(Date.now());

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData(prev => ({ ...prev, logo: e.target.files![0] }));
    }
  };

  useEffect(() => {
    if (!isOpen) return;

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

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    const submissionError = validateSubmission({
      formKey: "service-enquiry",
      honeypot: formData.website,
      startedAt: startedAtRef.current,
    });
    if (submissionError) {
      alert(submissionError);
      return;
    }

    const googleFormData = new FormData();
    googleFormData.append("entry.1828417104", sanitizeText(formData.companyName));
    googleFormData.append("entry.1111826503", sanitizeText(formData.name));
    googleFormData.append("entry.892921490", sanitizePhone(formData.mobile));
    googleFormData.append("entry.1272589738", sanitizeEmail(formData.email));
    googleFormData.append("entry.1624026859", sanitizeText(formData.address));
    googleFormData.append("entry.1447897846", sanitizeText(formData.service));

    try {
      setIsSubmitting(true);
      await fetch(
        "https://docs.google.com/forms/d/e/1FAIpQLSc612j-Qs45RXe5bIN5pxmv2MH6f7nY4wbrkemnXPJRI6H6bw/formResponse",
        {
          method: "POST",
          mode: "no-cors",
          body: googleFormData,
        }
      );

      markSubmission("service-enquiry");
      alert("Enquiry submitted successfully!");

      setFormData({
        companyName: '',
        name: '',
        mobile: '',
        email: '',
        address: '',
        service: '',
        logo: null,
        website: '',
      });
      startedAtRef.current = Date.now();

      onClose();
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("There was an error submitting the form. Please try again.");
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
            aria-labelledby="service-enquiry-title"
            className="bg-white rounded-lg w-full max-w-2xl max-h-[92dvh] sm:max-h-[90vh] overflow-hidden shadow-2xl flex flex-col"
          >
            <div className="p-5 sm:p-6 border-b border-slate-100 flex justify-between items-center bg-white z-10">
              <h2 id="service-enquiry-title" className="text-xl sm:text-2xl font-bold text-slate-900">Service Enquiry</h2>
              <button type="button" onClick={onClose} aria-label="Close service enquiry" className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
                <X size={24} className="text-slate-500" />
              </button>
            </div>
            
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
                  <label className="block text-sm font-medium text-slate-700 mb-2">Company Name</label>
                  <input
                    type="text"
                    name="companyName"
                    required
                    value={formData.companyName}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-100 outline-none transition-all"
                    placeholder="Your Company"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Name</label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-100 outline-none transition-all"
                    placeholder="John Doe"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Mobile No.</label>
                  <input
                    type="tel"
                    name="mobile"
                    required
                    value={formData.mobile}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-100 outline-none transition-all"
                    placeholder="+91 98765 43210"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Email</label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-100 outline-none transition-all"
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Address</label>
                <textarea
                  name="address"
                  required
                  rows={3}
                  value={formData.address}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-100 outline-none transition-all resize-none"
                  placeholder="Your business address..."
                ></textarea>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Service Name</label>
                  <select
                    name="service"
                    required
                    value={formData.service}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-100 outline-none transition-all bg-white"
                  >
                    <option value="">Select a service</option>
                    {SERVICES.map(service => (
                      <option key={service.id} value={service.title}>{service.title}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Logo (Optional)</label>
                  <div className="relative">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="hidden"
                      id="logo-upload"
                    />
                    <label
                      htmlFor="logo-upload"
                      className="flex items-center justify-center w-full px-4 py-3 rounded-xl border border-dashed border-slate-300 hover:border-orange-500 hover:bg-orange-50 cursor-pointer transition-all text-slate-500"
                    >
                      <Upload size={20} className="mr-2" />
                      <span className="truncate">{formData.logo ? formData.logo.name : 'Upload Logo'}</span>
                    </label>
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-orange-500 hover:bg-orange-400 disabled:bg-slate-400 disabled:cursor-not-allowed text-slate-950 disabled:text-white font-bold py-4 rounded-xl transition-colors shadow-lg shadow-orange-200"
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Enquiry'}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
}
