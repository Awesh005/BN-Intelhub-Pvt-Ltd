import { useState } from 'react';
import { motion } from 'motion/react';
import { CheckCircle, Code, Smartphone, Database, Cpu, Server, Wifi, Layers, User, FileText, Clock, Smile, Briefcase, GraduationCap, Users, Monitor, Megaphone, Settings, BarChart, TrendingUp, UserCheck, Search } from 'lucide-react';
import { SectionWrapper, Container } from '../components/ui/Layout';
import { Badge } from '../components/ui/Badge';
import { Card } from '../components/ui/Cards';
import Internships from '../components/Internships';
import InternshipEnquiryModal from '../components/InternshipEnquiryModal';

const colorMap: Record<string, { bg: string; bgHover: string; bgLight: string; text: string; shadow: string }> = {
  blue: { bg: 'bg-orange-500', bgHover: 'hover:bg-orange-400', bgLight: 'bg-orange-50', text: 'text-orange-600', shadow: 'shadow-orange-200' },
  green: { bg: 'bg-amber-500', bgHover: 'hover:bg-amber-400', bgLight: 'bg-amber-50', text: 'text-amber-700', shadow: 'shadow-amber-200' },
  purple: { bg: 'bg-slate-800', bgHover: 'hover:bg-slate-700', bgLight: 'bg-orange-50', text: 'text-orange-600', shadow: 'shadow-slate-200' },
  red: { bg: 'bg-orange-600', bgHover: 'hover:bg-orange-500', bgLight: 'bg-orange-50', text: 'text-orange-700', shadow: 'shadow-orange-200' },
  orange: { bg: 'bg-orange-500', bgHover: 'hover:bg-orange-400', bgLight: 'bg-orange-50', text: 'text-orange-600', shadow: 'shadow-orange-200' },
  indigo: { bg: 'bg-slate-800', bgHover: 'hover:bg-slate-700', bgLight: 'bg-amber-50', text: 'text-amber-700', shadow: 'shadow-slate-200' },
  cyan: { bg: 'bg-amber-500', bgHover: 'hover:bg-amber-400', bgLight: 'bg-amber-50', text: 'text-amber-700', shadow: 'shadow-amber-200' },
  pink: { bg: 'bg-orange-500', bgHover: 'hover:bg-orange-400', bgLight: 'bg-orange-50', text: 'text-orange-600', shadow: 'shadow-orange-200' },
  slate: { bg: 'bg-slate-600', bgHover: 'hover:bg-slate-700', bgLight: 'bg-slate-50', text: 'text-slate-600', shadow: 'shadow-slate-200' },
};

export default function InternshipPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProgram, setSelectedProgram] = useState("");

  const openModal = (programTitle?: string) => {
    setSelectedProgram(programTitle ?? "");
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProgram("");
  };

  const techPrograms = [
    {
      title: "Web Development",
      icon: <Code className="w-6 h-6" />,
      duration: "3-4 Months",
      tools: {
        "Frontend": "HTML, CSS, JS, React, Vue.js, Angular",
        "Backend": "Node.js, Express.js, Python, Java, Php Etc",
        "Database": "SQL, NoSQL",
        "DevOps": "Hosting, Github, Docker"
      },
      color: "blue"
    },
    {
      title: "Android Development",
      icon: <Smartphone className="w-6 h-6" />,
      duration: "3-4 Months",
      tools: {
        "Frontend": "React Native, Flutter, Java Android",
        "Backend": "Node.js, Express.js, Python, Java, Php Etc",
        "Database": "SQL, NoSQL",
        "DevOps": "Hosting, Github, Docker"
      },
      color: "green"
    },
    {
      title: "Data Science",
      icon: <Database className="w-6 h-6" />,
      duration: "5-6 Months",
      tools: {
        "Core": "Python / R, Data Handling, Visualization, EDA",
        "Advanced": "ML, Deep Learning, Cloud(Big Data), SQL, Math, Stats",
        "Deployment": "Flask / FastAPI",
        "Specializations": "NLP, Computer Vision, Time Series"
      },
      color: "purple"
    },
    {
      title: "Robotics",
      icon: <Cpu className="w-6 h-6" />,
      duration: "9 Months",
      tools: {
        "Core": "Math & Physics, Electronics & Microcontrollers, Programming (Python/C++)",
        "Hardware": "Motors & Sensors, PID & Control Systems",
        "Advanced": "ROS & Simulation, CAD & Mechanical Design, Vision & AI, Autonomous Robots"
      },
      color: "orange"
    },
    {
      title: "Big Data",
      icon: <Server className="w-6 h-6" />,
      duration: "3-4 Months",
      tools: {
        "Basics": "Big Data basics, Python/Java/Scala, SQL & NoSQL",
        "Frameworks": "Hadoop (HDFS, MapReduce), Spark, Kafka",
        "Tools": "Airflow / ETL, Cloud Big Data tools, Analytics & visualization"
      },
      color: "indigo"
    },
    {
      title: "IOT",
      icon: <Wifi className="w-6 h-6" />,
      duration: "5-6 Months",
      tools: {
        "Basics": "IoT basics, Microcontrollers (Arduino / ESP32 / Raspberry Pi)",
        "Hardware": "Sensors & Actuators, C / Python / MicroPython",
        "Network": "Networking, Cloud & dashboards, Security",
        "Advanced": "Edge AI, IIoT, Smart automation"
      },
      color: "cyan"
    },
    {
      title: "Full-Stack AI",
      icon: <Layers className="w-6 h-6" />,
      duration: "9 Months",
      tools: {
        "Core": "ML, DL, NLP, CV, RL, Generative AI, Robotics",
        "Applications": "Industry Applications, Emerging AI...etc"
      },
      color: "pink"
    }
  ];

  const managementPrograms = [
    {
      title: "Basic IT & Computer Skills",
      icon: <Monitor className="w-6 h-6" />,
      duration: "2-3 Months",
      tools: {
        "Office Tools": "MS Office (Excel, Word, PowerPoint)",
        "Collaboration": "Google Workspace",
        "Communication": "Email professionalism"
      },
      color: "blue"
    },
    {
      title: "Digital Marketing",
      icon: <Megaphone className="w-6 h-6" />,
      duration: "3-4 Months",
      tools: {
        "Social Media": "Marketing (Fb, Insta, Youtube, Linkedin, Email)",
        "Content": "SEO basics, Ads, Content writing, Canva designing",
        "Analytics": "Website analytics"
      },
      color: "pink"
    },
    {
      title: "Business Tools",
      icon: <Settings className="w-6 h-6" />,
      duration: "2-3 Months",
      tools: {
        "CRM": "CRM software (Zoho, HubSpot)",
        "Management": "ERP basics, Project management tools (Trello, Asana, ClickUp)"
      },
      color: "slate"
    },
    {
      title: "Data & Analytics",
      icon: <BarChart className="w-6 h-6" />,
      duration: "3-4 Months",
      tools: {
        "Excel": "Excel advanced (Pivot table, formulas)",
        "Analysis": "Data entry automation, Business forecasting basics",
        "Visualization": "Data visualization (Power BI)"
      },
      color: "indigo"
    },
    {
      title: "Sales & Business Development",
      icon: <TrendingUp className="w-6 h-6" />,
      duration: "2-3 Months",
      tools: {
        "Lead Gen": "Lead generation tools",
        "Sales Tools": "LinkedIn sales tools",
        "Outreach": "Cold email tools"
      },
      color: "green"
    },
    {
      title: "Corporate Skills",
      icon: <UserCheck className="w-6 h-6" />,
      duration: "2-3 Months",
      tools: {
        "Documentation": "Writing, Report making, Proposal creation",
        "Communication": "Client communication, Technical presentation",
        "Operations": "Operations management tools"
      },
      color: "orange"
    }
  ];

  const packages = [
    { name: "Mentorship", value: "One to One", icon: <User className="w-5 h-5" /> },
    { name: "CRT", value: "Aptitude Test", icon: <GraduationCap className="w-5 h-5" /> },
    { name: "Resume Building", value: "One to One", icon: <FileText className="w-5 h-5" /> },
    { name: "Discipline", value: "One to One", icon: <Clock className="w-5 h-5" /> },
    { name: "Personality Development", value: "One to One", icon: <Smile className="w-5 h-5" /> },
    { name: "100% Placement Assistance", value: "One to One", icon: <Briefcase className="w-5 h-5" /> },
    { name: "Class Type", value: "Online / Offline Test", icon: <CheckCircle className="w-5 h-5" /> },
    { name: "Per Batch Size", value: "30 Students", icon: <Users className="w-5 h-5" /> },
  ];

  const filteredTechPrograms = techPrograms.filter(program =>
    program.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    Object.values(program.tools).some(tool => tool.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const filteredManagementPrograms = managementPrograms.filter(program =>
    program.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    Object.values(program.tools).some(tool => tool.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="pt-20">
      <Internships onEnrollClick={() => openModal()} />

      <SectionWrapper background="light">
        <Container>
          <div className="text-center mb-12 sm:mb-16">
            <Badge variant="outline" className="mb-4 bg-white">
              Our Programs
            </Badge>
            <h2 className="text-2xl sm:text-3xl font-bold font-display text-slate-900 mb-4">
              Choose Your Internship Program
            </h2>
            <p className="text-slate-600 text-sm sm:text-base max-w-2xl mx-auto mb-8">
              Comprehensive training with hands-on experience in the latest technologies and management skills.
            </p>

            <div className="max-w-full sm:max-w-md mx-auto relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search for internships (e.g., Web, Python, Marketing)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 text-sm sm:text-base rounded-xl border border-slate-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-100 outline-none transition-all shadow-sm"
              />
            </div>
          </div>

          {filteredTechPrograms.length > 0 && (
            <div className="mb-12">
              <h3 className="text-xl sm:text-2xl font-bold text-slate-800 mb-6 border-l-4 border-orange-500 pl-4">
                For IT / Technical Students
              </h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-8">
                {filteredTechPrograms.map((program, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="h-full p-5 sm:p-6 border-slate-200 hover:border-orange-300 transition-colors shadow-sm hover:shadow-md">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
                      <div className="flex items-center gap-4">
                        <div className={`p-3 rounded-xl ${colorMap[program.color as keyof typeof colorMap].bgLight} ${colorMap[program.color as keyof typeof colorMap].text}`}>
                          {program.icon}
                        </div>
                        <div>
                          <h3 className="text-xl sm:text-2xl font-extrabold text-orange-700 mb-1">{program.title}</h3>
                          <span className="text-xs sm:text-sm font-medium text-slate-500 bg-slate-100 px-2 py-1 rounded-md inline-block">
                            {program.duration}
                          </span>
                        </div>
                      </div>
                      <button 
                        onClick={() => openModal(program.title)}
                        className={`w-full sm:w-auto sm:self-start px-4 py-2 rounded-lg font-semibold text-white text-sm ${colorMap[program.color as keyof typeof colorMap].bg} ${colorMap[program.color as keyof typeof colorMap].bgHover} transition-colors shadow-md ${colorMap[program.color as keyof typeof colorMap].shadow}`}
                      >
                        Enroll Now
                      </button>
                    </div>

                    <div className="space-y-4">
                      <h4 className="text-xs sm:text-sm font-semibold text-slate-700 uppercase tracking-wider">Tools & Technologies</h4>
                      <div className="grid gap-3">
                        {Object.entries(program.tools).map(([key, value], i) => (
                          <div key={i} className="flex flex-col sm:flex-row sm:gap-3 gap-1 text-sm">
                            <span className="font-medium text-slate-700 min-w-[90px] sm:min-w-[110px]">{key}:</span>
                            <span className="text-slate-600 break-words">{value}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </Card>
                </motion.div>
                ))}
              </div>
            </div>
          )}

          {filteredManagementPrograms.length > 0 && (
            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-slate-800 mb-6 border-l-4 border-amber-500 pl-4">
                For BBA / MBA Students
              </h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-8">
                {filteredManagementPrograms.map((program, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="h-full p-5 sm:p-6 border-slate-200 hover:border-amber-300 transition-colors shadow-sm hover:shadow-md">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
                      <div className="flex items-center gap-4">
                        <div className={`p-3 rounded-xl ${colorMap[program.color as keyof typeof colorMap].bgLight} ${colorMap[program.color as keyof typeof colorMap].text}`}>
                          {program.icon}
                        </div>
                        <div>
                          <h3 className="text-xl sm:text-2xl font-extrabold text-amber-700 mb-1">{program.title}</h3>
                          <span className="text-xs sm:text-sm font-medium text-slate-500 bg-slate-100 px-2 py-1 rounded-md inline-block">
                            {program.duration}
                          </span>
                        </div>
                      </div>
                      <button 
                        onClick={() => openModal(program.title)}
                        className={`w-full sm:w-auto sm:self-start px-4 py-2 rounded-lg font-semibold text-white text-sm ${colorMap[program.color as keyof typeof colorMap].bg} ${colorMap[program.color as keyof typeof colorMap].bgHover} transition-colors shadow-md ${colorMap[program.color as keyof typeof colorMap].shadow}`}
                      >
                        Enroll Now
                      </button>
                    </div>

                    <div className="space-y-4">
                      <h4 className="text-xs sm:text-sm font-semibold text-slate-700 uppercase tracking-wider">Tools & Skills</h4>
                      <div className="grid gap-3">
                        {Object.entries(program.tools).map(([key, value], i) => (
                          <div key={i} className="flex flex-col sm:flex-row sm:gap-3 gap-1 text-sm">
                            <span className="font-medium text-slate-700 min-w-[90px] sm:min-w-[110px]">{key}:</span>
                            <span className="text-slate-600 break-words">{value}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </Card>
                </motion.div>
                ))}
              </div>
            </div>
          )}

          {filteredTechPrograms.length === 0 && filteredManagementPrograms.length === 0 && (
            <div className="text-center py-12">
              <p className="text-slate-500 text-lg">No internship programs found matching "{searchQuery}"</p>
            </div>
          )}
        </Container>
      </SectionWrapper>

      <SectionWrapper background="white">
        <Container>
          <div className="bg-slate-900 rounded-lg p-6 sm:p-8 md:p-12 text-white overflow-hidden relative">
            <div className="relative z-10">
              <div className="text-center mb-12">
                <h2 className="text-2xl sm:text-3xl font-bold font-display mb-4">All-Inclusive Internship Package</h2>
                <p className="text-slate-400 text-sm sm:text-base max-w-2xl mx-auto">
                  Every internship program comes with our comprehensive support system to ensure your success.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {packages.map((pkg, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                    className="bg-slate-800/50 backdrop-blur-sm p-5 sm:p-6 rounded-xl border border-slate-700 hover:border-orange-500/50 transition-colors"
                  >
                    <div className="flex items-center gap-3 mb-3 text-orange-300">
                      {pkg.icon}
                      <h3 className="font-bold text-white">{pkg.name}</h3>
                    </div>
                    <p className="text-slate-300 text-sm font-medium pl-8 border-l-2 border-slate-700">
                      {pkg.value}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </SectionWrapper>

      <InternshipEnquiryModal
        isOpen={isModalOpen}
        onClose={closeModal}
        selectedProgram={selectedProgram}
      />
    </div>
  );
}
