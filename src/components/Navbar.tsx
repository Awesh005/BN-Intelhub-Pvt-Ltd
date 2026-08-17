import { motion, AnimatePresence } from "motion/react";
import {
  Menu,
  X,
  Home,
  BookOpen,
  Briefcase,
  Code,
  GraduationCap,
  Users,
  Phone,
  ChevronRight,
} from "lucide-react";
import { useState, useEffect, type MouseEvent } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { PrimaryButton } from "./ui/Buttons";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const location = useLocation();
  const navigate = useNavigate();

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const isActive = (to: string) => {
    if (to.startsWith("http")) return false;
    if (to === "/") return location.pathname === "/";
    return location.pathname === to;
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      const totalScroll =
        document.documentElement.scrollTop || document.body.scrollTop;
      const windowHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;

      if (windowHeight > 0) {
        setScrollProgress((totalScroll / windowHeight) * 100);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const handleNavigation = (
    e: MouseEvent<HTMLAnchorElement>,
    to: string,
  ) => {
    e.preventDefault();
    if (to.startsWith("http://") || to.startsWith("https://")) {
      window.location.href = to;
      setIsOpen(false);
      return;
    }

    if (to.startsWith("/#")) {
      const hash = to.slice(1);
      const id = hash.slice(1);

      if (location.pathname === "/" && location.hash === hash) {
        scrollToSection(id);
      } else {
        navigate(to);
      }
    } else if (location.pathname === to) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      navigate(to);
    }
    setIsOpen(false);
  };

  const menuItems = [
    { name: "Home", to: "/", icon: <Home size={20} /> },
    { name: "Programs", to: "/courses", icon: <BookOpen size={20} /> },
    { name: "Bootcamp", to: "/internships", icon: <GraduationCap size={20} /> },
    { name: "Internship", to: "/bootcamp", icon: <Briefcase size={20} /> },
    {
      name: "Development Services",
      to: "https://service.bnintelhub.com/",
      icon: <Code size={20} />,
    },
    { name: "About Us", to: "/about", icon: <Users size={20} /> },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 border-b transition-all duration-300 ${
        scrolled
          ? "border-slate-200/90 bg-white/95 shadow-lg shadow-slate-900/5 backdrop-blur-md"
          : "border-slate-200 bg-white/88 shadow-sm backdrop-blur-sm"
      }`}
    >
      {/* Scroll progress bar */}
      <div className="absolute top-0 left-0 w-full h-[3px] z-30">
        <div
          className="h-full bg-gradient-to-r from-orange-500 via-yellow-300 to-amber-500 transition-all duration-200 ease-out shadow-[0_0_10px_rgba(249,115,22,0.6)]"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-white/95 lg:bg-transparent">
        <div className="flex items-center justify-between h-20">
          <Link
            to="/"
            className="flex items-center flex-shrink-0 rounded-lg"
            onClick={() => {
              setIsOpen(false);
              window.scrollTo(0, 0);
            }}
          >
            <img
              src="/logo.png"
              alt="BN IntelHub Pvt Ltd Logo"
              className="h-10 sm:h-12 w-auto object-contain"
            />
          </Link>

          <div className="hidden lg:block">
            <div className="ml-10 flex items-center gap-2 xl:gap-5">
              {menuItems.map((item) => (
                <a
                  key={item.name}
                  href={item.to}
                  onClick={(e) => handleNavigation(e, item.to)}
                  className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                    isActive(item.to)
                      ? "text-orange-600"
                      : "text-slate-600 hover:bg-orange-50 hover:text-orange-600"
                  }`}
                >
                  {item.name}
                </a>
              ))}
              <PrimaryButton
                  className="px-6 py-2.5 text-sm h-auto"
                  onClick={() => {
                    if (location.pathname === "/" && location.hash === "#contact") {
                      scrollToSection("contact");
                    } else {
                      navigate("/#contact");
                    }
                    setIsOpen(false);
                }}
              >
                Contact Us
              </PrimaryButton>
            </div>
          </div>

          <div className="lg:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              aria-label={isOpen ? "Close menu" : "Open menu"}
              aria-expanded={isOpen}
              className="rounded-lg text-slate-600 hover:bg-slate-100 hover:text-slate-900 p-2 transition-transform active:scale-95"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 top-20 z-0 bg-slate-900/35 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="relative z-10 lg:hidden bg-white border-b border-gray-200 shadow-xl overflow-y-auto max-h-[calc(100vh-5rem)]"
            >
              <div className="px-4 pt-4 pb-8 space-y-3">
                {menuItems.map((item, index) => (
                  <motion.a
                    key={item.name}
                    href={item.to}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    onClick={(e) => handleNavigation(e, item.to)}
                    className={`flex items-center justify-between px-4 py-4 rounded-xl text-base font-medium transition-all ${
                      isActive(item.to)
                        ? "text-orange-700 bg-orange-50 border border-orange-100"
                        : "text-slate-600 hover:text-orange-700 hover:bg-orange-50 border border-transparent"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      {item.icon}
                      {item.name}
                    </div>
                    <ChevronRight
                      size={16}
                      className={`opacity-50 ${isActive(item.to) ? "text-orange-600" : ""}`}
                    />
                  </motion.a>
                ))}

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="pt-4"
                >
                  <PrimaryButton
                    className="w-full justify-center py-4 text-lg shadow-lg shadow-orange-500/20"
                    onClick={() => {
                      if (location.pathname === "/" && location.hash === "#contact") {
                        scrollToSection("contact");
                      } else {
                        navigate("/#contact");
                      }
                      setIsOpen(false);
                    }}
                  >
                    <Phone size={20} className="mr-2" />
                    Contact Us
                  </PrimaryButton>
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
