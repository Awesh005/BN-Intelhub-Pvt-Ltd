import { motion, AnimatePresence } from "motion/react";
import {
  Menu,
  X,
  Home,
  BookOpen,
  Briefcase,
  Code,
  Users,
  Phone,
  ChevronRight,
} from "lucide-react";
import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { PrimaryButton } from "./ui/Buttons";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const location = useLocation();
  const navigate = useNavigate();

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

  const handleNavigation = (
    e: React.MouseEvent<HTMLAnchorElement>,
    to: string,
  ) => {
    e.preventDefault();
    if (to.startsWith("http://") || to.startsWith("https://")) {
      window.location.href = to;
      setIsOpen(false);
      return;
    }

    if (to.startsWith("/#")) {
      const id = to.substring(2);
      if (location.pathname !== "/") {
        navigate("/");
        setTimeout(() => {
          document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
        }, 100);
      } else {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      navigate(to);
      window.scrollTo(0, 0);
    }
    setIsOpen(false);
  };

  const menuItems = [
    { name: "Home", to: "/", icon: <Home size={20} /> },
    { name: "Programs", to: "/courses", icon: <BookOpen size={20} /> },
    { name: "Internship", to: "/internships", icon: <Briefcase size={20} /> },
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
      className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200 shadow-sm"
    >
      {/* 🔥 Scroll Progress Bar */}
      <div className="absolute top-0 left-0 w-full h-[3px] z-[60]">
        <div
          className="h-full bg-gradient-to-r from-blue-500 via-cyan-400 to-blue-600 transition-all duration-200 ease-out shadow-[0_0_10px_#3b82f6]"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link
            to="/"
            className="flex items-center flex-shrink-0"
            onClick={() => {
              setIsOpen(false);
              window.scrollTo(0, 0);
            }}
          >
            <img
              src="/logo.png"
              alt="BN IntelHub Pvt Ltd Logo"
              className="h-12 w-auto object-contain"
            />
          </Link>

          <div className="hidden lg:block">
            <div className="ml-10 flex items-center space-x-8">
              {menuItems.map((item) => (
                <a
                  key={item.name}
                  href={item.to}
                  onClick={(e) => handleNavigation(e, item.to)}
                  className={`px-3 py-2 text-sm font-medium transition-colors ${
                    location.pathname === item.to
                      ? "text-blue-600"
                      : "text-slate-600 hover:text-blue-600"
                  }`}
                >
                  {item.name}
                </a>
              ))}
              <PrimaryButton
                className="px-6 py-2.5 text-sm h-auto"
                onClick={() => {
                  if (location.pathname !== "/") {
                    navigate("/");
                    setTimeout(() => {
                      document
                        .getElementById("contact")
                        ?.scrollIntoView({ behavior: "smooth" });
                    }, 100);
                  } else {
                    document
                      .getElementById("contact")
                      ?.scrollIntoView({ behavior: "smooth" });
                  }
                }}
              >
                Contact Us
              </PrimaryButton>
            </div>
          </div>

          <div className="lg:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-slate-600 hover:text-slate-900 p-2 transition-transform active:scale-95"
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
              className="fixed inset-0 top-20 bg-slate-900/20 backdrop-blur-sm z-[-1]"
            />
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden bg-white border-b border-gray-200 shadow-xl overflow-hidden"
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
                      location.pathname === item.to
                        ? "text-blue-600 bg-blue-50 border border-blue-100"
                        : "text-slate-600 hover:text-blue-600 hover:bg-slate-50 border border-transparent"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      {item.icon}
                      {item.name}
                    </div>
                    <ChevronRight
                      size={16}
                      className={`opacity-50 ${location.pathname === item.to ? "text-blue-600" : ""}`}
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
                    className="w-full justify-center py-4 text-lg shadow-lg shadow-blue-500/20"
                    onClick={() => {
                      setIsOpen(false);
                      if (location.pathname !== "/") {
                        navigate("/");
                        setTimeout(() => {
                          document
                            .getElementById("contact")
                            ?.scrollIntoView({ behavior: "smooth" });
                        }, 100);
                      } else {
                        document
                          .getElementById("contact")
                          ?.scrollIntoView({ behavior: "smooth" });
                      }
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
