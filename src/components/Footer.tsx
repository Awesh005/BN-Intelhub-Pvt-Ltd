import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Mail,
  Phone,
  MapPin,
  ArrowRight,
} from "lucide-react";
import { Link } from 'react-router-dom';
import { InputField } from "./ui/InputField";
import { PrimaryButton } from "./ui/Buttons";
import { LocationTag } from "./ui/location-tag";

export default function Footer() {
  return (
    <footer className="bg-slate-900 border-t border-slate-800 pt-14 sm:pt-20 pb-10 text-slate-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12 mb-12 sm:mb-16">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <img
                src="/logoWhite.png"
                alt="BN IntelHub Pvt Ltd Logo"
                className="h-12 w-auto object-contain"
              />
            </div>

            <p className="text-slate-400 mb-6 max-w-md leading-relaxed">
              A premier EdTech and Software Development company committed to
              bridging the gap between academia and industry through world-class
              training and innovative software solutions.
            </p>
            <div className="flex gap-4 mb-8">
              {/* Instagram */}
              <a
                href="https://www.instagram.com/bn_intel_hub"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-slate-950 transition-colors bg-slate-800 p-2 rounded-full hover:bg-gradient-to-tr hover:from-orange-500 hover:to-yellow-400"
              >
                <Instagram size={20} />
              </a>

              {/* Facebook */}
              <a
                href="https://www.facebook.com/profile.php?id=61575484154751"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-slate-950 transition-colors bg-slate-800 p-2 rounded-full hover:bg-orange-400"
              >
                <Facebook size={20} />
              </a>

              <span
                aria-label="Twitter coming soon"
                title="Twitter coming soon"
                className="text-slate-500 bg-slate-800/70 p-2 rounded-full cursor-not-allowed"
              >
                <Twitter size={20} />
              </span>

              {/* LinkedIn */}
              <a
                href="https://www.linkedin.com/company/bn-intelhub-pvt-ltd/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-slate-950 transition-colors bg-slate-800 p-2 rounded-full hover:bg-orange-400"
              >
                <Linkedin size={20} />
              </a>
            </div>

            <div className="max-w-md">
              <h5 className="text-white font-bold mb-3">
                Subscribe to our newsletter
              </h5>
              <div className="flex flex-col sm:flex-row gap-2">
                <InputField
                  placeholder="Enter your email"
                  className="bg-slate-800 border-slate-700 text-white placeholder:text-slate-500"
                />
                <PrimaryButton
                  className="px-6 py-3 sm:py-2 text-sm border-none"
                  icon={<ArrowRight size={16} />}
                >
                  Subscribe
                </PrimaryButton>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6">Company</h4>
            <ul className="space-y-4 text-slate-400">
              <li>
                <Link to="/about" className="hover:text-orange-300 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <span className="text-slate-500 cursor-not-allowed" title="Careers page coming soon">
                  Careers
                </span>
              </li>
              <li>
                <Link to="/#services" className="hover:text-orange-300 transition-colors">
                  Development Services
                </Link>
              </li>
              <li>
                <Link to="/privacy-policy" className="hover:text-orange-300 transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms-and-conditions" className="hover:text-orange-300 transition-colors">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link to="/cancellation-refund-policy" className="hover:text-orange-300 transition-colors">
                  Cancellation & Refund Policy
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6">Contact Us</h4>

            <ul className="space-y-4 text-slate-400">
              {/* Address - Opens Google Maps */}
              <li className="flex items-start gap-3">
                <MapPin
                  size={20}
                  className="text-orange-400 mt-1 flex-shrink-0"
                />
                <a
                  href="https://www.google.com/maps/search/?api=1&query=STPI+Plot-8+Part+Namkum+Industrial+Area+Namkum+Ranchi+834010"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition"
                >
                  STPI- Plot -8 Part, Namkum <br />
                  Industrial Area, Namkum Ranchi - 834010
                </a>
              </li>

              {/* Phone - Direct Call */}
              <li className="flex items-center gap-3">
                <Phone size={20} className="text-orange-400 flex-shrink-0" />
                <a
                  href="tel:+918936078905"
                  className="hover:text-white transition"
                >
                  +91 8936078905
                </a>
              </li>

              {/* Email - Opens Mail App */}
              <li className="flex items-center gap-3">
                <Mail size={20} className="text-orange-400 flex-shrink-0" />
                <a
                  href="mailto:bnintelhub@gmail.com"
                  className="hover:text-white transition"
                >
                  bnintelhub@gmail.com
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={20} className="text-orange-400 flex-shrink-0" />
                <a
                  href="mailto:bnintelhub.services@gmail.com"
                  className="hover:text-white transition"
                >
                  bnintelhub.services@gmail.com
                </a>
              </li>
            </ul>

            <div className="mt-6 flex flex-col gap-3">
              <p className="text-xs uppercase tracking-widest text-slate-500">
                Local Time
              </p>
              <LocationTag city="Ranchi" country="India" timezone="IST" />
            </div>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-slate-500">
          <p>
            &copy; {new Date().getFullYear()} BN Intelhub Pvt Ltd. All rights
            reserved.
          </p>
          <div className="flex gap-6">
            <a
              href="https://maps.app.goo.gl/XGpoPUUBM7SBPjtTA"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white"
            >
              View on Map
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
