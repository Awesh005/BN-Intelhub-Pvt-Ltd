import { GraduationCap, Briefcase, Users, Award, BookOpen, Rocket, CheckCircle, ArrowRight, Code, Database, Brain, BarChart, Laptop, Globe, AppWindow, Sparkles, School, Settings, Terminal, UserCheck, FileCheck, TrendingUp, Wrench, Wallet, Cloud, Smartphone, Layers, Server, Shield, PenTool, Cpu } from 'lucide-react';

export const COURSES = [
  // Full Stack & Web Development
  {
    id: 1,
    title: "Full Stack Web Development",
    description: "Comprehensive course covering frontend, backend, and database technologies.",
    icon: <Code />,
    level: "Advanced",
    duration: "6 Months",
    technologies: ["HTML/CSS", "JavaScript", "React", "Node.js", "MongoDB"]
  },
  {
    id: 2,
    title: "Java Training",
    description: "Complete Java programming from Core to Advanced concepts.",
    icon: <Code />,
    level: "Intermediate",
    duration: "4 Months",
    technologies: ["Core Java", "Advanced Java", "J2EE", "Spring", "Hibernate"]
  },
  {
    id: 3,
    title: "Python Programming",
    description: "Master Python for web development, data science, and automation.",
    icon: <Terminal />,
    level: "Beginner",
    duration: "3 Months",
    technologies: ["Python", "Django", "Flask", "NumPy", "Pandas"]
  },
  {
    id: 4,
    title: "Data Science",
    description: "Learn to analyze data and build predictive models.",
    icon: <BarChart />,
    level: "Advanced",
    duration: "6 Months",
    technologies: ["Python", "R", "Machine Learning", "Statistics", "Tableau"]
  },
  {
    id: 5,
    title: "Artificial Intelligence",
    description: "Build intelligent systems and neural networks.",
    icon: <Brain />,
    level: "Advanced",
    duration: "6 Months",
    technologies: ["Neural Networks", "Deep Learning", "NLP", "TensorFlow"]
  },
  {
    id: 6,
    title: "AWS Cloud",
    description: "Master Amazon Web Services for cloud computing and deployment.",
    icon: <Cloud />,
    level: "Intermediate",
    duration: "3 Months",
    technologies: ["EC2", "S3", "Lambda", "RDS", "VPC"]
  },
  {
    id: 7,
    title: "DevOps",
    description: "Learn CI/CD pipelines, containerization, and infrastructure as code.",
    icon: <Settings />,
    level: "Advanced",
    duration: "4 Months",
    technologies: ["Docker", "Kubernetes", "Jenkins", "Git", "Ansible"]
  },
  {
    id: 8,
    title: "Salesforce",
    description: "Become a certified Salesforce administrator and developer.",
    icon: <Cloud />,
    level: "Intermediate",
    duration: "4 Months",
    technologies: ["CRM", "Apex", "Visualforce", "Lightning", "Admin"]
  },
  {
    id: 9,
    title: "Hadoop & Big Data",
    description: "Process and analyze massive datasets using the Hadoop ecosystem.",
    icon: <Database />,
    level: "Advanced",
    duration: "4 Months",
    technologies: ["HDFS", "MapReduce", "Hive", "Pig", "Spark"]
  },
  {
    id: 10,
    title: "Selenium Testing",
    description: "Automated testing for web applications.",
    icon: <CheckCircle />,
    level: "Intermediate",
    duration: "2 Months",
    technologies: ["Java", "TestNG", "WebDriver", "Automation", "Frameworks"]
  },
  {
    id: 11,
    title: "C Language",
    description: "Foundation of programming with C.",
    icon: <Code />,
    level: "Beginner",
    duration: "2 Months",
    technologies: ["Pointers", "Structures", "File Handling", "Algorithms"]
  },
  {
    id: 12,
    title: "C++ Programming",
    description: "Object-oriented programming with C++.",
    icon: <Code />,
    level: "Beginner",
    duration: "2 Months",
    technologies: ["OOPs", "STL", "Templates", "Exception Handling"]
  },
  {
    id: 13,
    title: "Data Structures",
    description: "Master algorithms and data organization.",
    icon: <Layers />,
    level: "Intermediate",
    duration: "3 Months",
    technologies: ["Arrays", "Linked Lists", "Trees", "Graphs", "Sorting"]
  },
  {
    id: 14,
    title: "Core Java",
    description: "Strong foundation in Java programming.",
    icon: <Code />,
    level: "Beginner",
    duration: "2 Months",
    technologies: ["OOPs", "Collections", "Threads", "Exceptions"]
  },
  {
    id: 15,
    title: "Advanced Java",
    description: "Enterprise application development with Java.",
    icon: <Server />,
    level: "Advanced",
    duration: "3 Months",
    technologies: ["Servlets", "JSP", "JDBC", "Java Beans"]
  },
  {
    id: 16,
    title: "Spring Framework",
    description: "Build enterprise Java applications.",
    icon: <Layers />,
    level: "Advanced",
    duration: "2 Months",
    technologies: ["IOC", "AOP", "MVC", "Boot", "Security"]
  },
  {
    id: 17,
    title: "Hibernate",
    description: "ORM framework for Java applications.",
    icon: <Database />,
    level: "Advanced",
    duration: "1 Month",
    technologies: ["ORM", "Mapping", "HQL", "Caching"]
  },
  {
    id: 18,
    title: "Web Services",
    description: "Building and consuming APIs.",
    icon: <Globe />,
    level: "Intermediate",
    duration: "1 Month",
    technologies: ["REST", "SOAP", "JSON", "XML"]
  },
  {
    id: 19,
    title: "Struts",
    description: "MVC framework for Java web apps.",
    icon: <Layers />,
    level: "Advanced",
    duration: "1 Month",
    technologies: ["MVC", "Actions", "Interceptors", "Validation"]
  },
  {
    id: 20,
    title: "XML",
    description: "Data interchange format mastery.",
    icon: <Code />,
    level: "Beginner",
    duration: "1 Month",
    technologies: ["DTD", "Schema", "Parsing", "XSLT"]
  },
  {
    id: 21,
    title: "C#.NET",
    description: "Programming with Microsoft .NET framework.",
    icon: <AppWindow />,
    level: "Intermediate",
    duration: "3 Months",
    technologies: ["CLR", "FCL", "WinForms", "Delegates"]
  },
  {
    id: 22,
    title: "ASP.NET",
    description: "Web development with .NET.",
    icon: <Globe />,
    level: "Advanced",
    duration: "3 Months",
    technologies: ["Web Forms", "MVC", "Razor", "IIS"]
  },
  {
    id: 23,
    title: "SQL Server",
    description: "Microsoft's relational database management.",
    icon: <Database />,
    level: "Intermediate",
    duration: "2 Months",
    technologies: ["T-SQL", "Stored Procedures", "Triggers", "Indexing"]
  },
  {
    id: 24,
    title: "Oracle",
    description: "Enterprise database management system.",
    icon: <Database />,
    level: "Advanced",
    duration: "3 Months",
    technologies: ["PL/SQL", "Architecture", "Backup", "Recovery"]
  },
  {
    id: 25,
    title: "Android Development",
    description: "Build mobile apps for Android devices.",
    icon: <Smartphone />,
    level: "Intermediate",
    duration: "4 Months",
    technologies: ["Java/Kotlin", "Android Studio", "SDK", "Material Design"]
  },
  {
    id: 26,
    title: "iPhone (iOS) Development",
    description: "Create apps for the Apple ecosystem.",
    icon: <Smartphone />,
    level: "Intermediate",
    duration: "4 Months",
    technologies: ["Swift", "Xcode", "iOS SDK", "Cocoa Touch"]
  },
  {
    id: 27,
    title: "IoT (Internet of Things)",
    description: "Connect physical devices to the internet.",
    icon: <Cpu />,
    level: "Advanced",
    duration: "3 Months",
    technologies: ["Arduino", "Raspberry Pi", "Sensors", "Protocols"]
  },
  {
    id: 28,
    title: "RPA (Robotic Process Automation)",
    description: "Automate business processes.",
    icon: <Settings />,
    level: "Intermediate",
    duration: "2 Months",
    technologies: ["Bots", "Workflow", "Automation", "Efficiency"]
  },
  {
    id: 29,
    title: "Automation Anywhere",
    description: "Leading RPA platform training.",
    icon: <Settings />,
    level: "Intermediate",
    duration: "2 Months",
    technologies: ["Task Bots", "Meta Bots", "IQ Bots"]
  },
  {
    id: 30,
    title: "Blue Prism",
    description: "Enterprise RPA software training.",
    icon: <Settings />,
    level: "Intermediate",
    duration: "2 Months",
    technologies: ["Process Studio", "Object Studio", "Control Room"]
  },
  {
    id: 31,
    title: "Spring Boot",
    description: "Rapid application development with Spring.",
    icon: <Rocket />,
    level: "Advanced",
    duration: "2 Months",
    technologies: ["Microservices", "REST", "JPA", "Actuator"]
  },
  {
    id: 32,
    title: "CRT (Campus Recruitment Training)",
    description: "Prepare for placements and interviews.",
    icon: <Briefcase />,
    level: "All Levels",
    duration: "2 Months",
    technologies: ["Aptitude", "Reasoning", "Soft Skills", "Interview Prep"]
  },
  {
    id: 33,
    title: "Unix/Linux",
    description: "Operating system fundamentals and scripting.",
    icon: <Terminal />,
    level: "Intermediate",
    duration: "2 Months",
    technologies: ["Shell Scripting", "Commands", "Administration", "Permissions"]
  },
  {
    id: 34,
    title: "Digital Marketing",
    description: "Master online marketing strategies.",
    icon: <TrendingUp />,
    level: "Beginner",
    duration: "3 Months",
    technologies: ["SEO", "SEM", "Social Media", "Analytics", "Content"]
  },
  {
    id: 35,
    title: "PHP with MySQL",
    description: "Server-side scripting for web development.",
    icon: <Globe />,
    level: "Beginner",
    duration: "3 Months",
    technologies: ["PHP", "MySQL", "Apache", "Forms"]
  },
  {
    id: 36,
    title: "ASP.NET MVC",
    description: "Model-View-Controller pattern for .NET.",
    icon: <AppWindow />,
    level: "Advanced",
    duration: "2 Months",
    technologies: ["MVC Pattern", "Routing", "Razor", "Entity Framework"]
  },
  {
    id: 37,
    title: "HTML5 & CSS3",
    description: "Modern web design fundamentals.",
    icon: <PenTool />,
    level: "Beginner",
    duration: "2 Months",
    technologies: ["Semantic HTML", "Flexbox", "Grid", "Responsive Design"]
  },
  {
    id: 38,
    title: "HTML/JavaScript",
    description: "Interactive web development.",
    icon: <Code />,
    level: "Beginner",
    duration: "2 Months",
    technologies: ["DOM", "Events", "ES6+", "AJAX"]
  },
  {
    id: 39,
    title: "jQuery",
    description: "Fast, small, and feature-rich JavaScript library.",
    icon: <Code />,
    level: "Beginner",
    duration: "1 Month",
    technologies: ["Selectors", "Animations", "AJAX", "Plugins"]
  },
  {
    id: 40,
    title: "UI/UX Design",
    description: "User Interface and User Experience design.",
    icon: <PenTool />,
    level: "Intermediate",
    duration: "3 Months",
    technologies: ["Figma", "Adobe XD", "Prototyping", "Wireframing"]
  },
  {
    id: 41,
    title: "UI Technologies",
    description: "Frontend development tools and libraries.",
    icon: <Layers />,
    level: "Intermediate",
    duration: "3 Months",
    technologies: ["Bootstrap", "SASS", "Material UI", "Tailwind"]
  },
  {
    id: 42,
    title: "AngularJS",
    description: "Legacy JavaScript framework.",
    icon: <Code />,
    level: "Intermediate",
    duration: "2 Months",
    technologies: ["MVC", "Directives", "Services", "Dependency Injection"]
  },
  {
    id: 43,
    title: "Angular (2+)",
    description: "Modern TypeScript-based framework.",
    icon: <Code />,
    level: "Advanced",
    duration: "3 Months",
    technologies: ["TypeScript", "Components", "Modules", "RxJS"]
  },
  {
    id: 44,
    title: "NodeJS",
    description: "JavaScript runtime for backend development.",
    icon: <Server />,
    level: "Advanced",
    duration: "3 Months",
    technologies: ["Express", "NPM", "REST APIs", "Async Programming"]
  },
  {
    id: 45,
    title: "ReactJS",
    description: "Library for building user interfaces.",
    icon: <Code />,
    level: "Advanced",
    duration: "3 Months",
    technologies: ["Components", "Hooks", "Redux", "Virtual DOM"]
  },
  {
    id: 46,
    title: "Apache Spark",
    description: "Unified analytics engine for big data.",
    icon: <BarChart />,
    level: "Advanced",
    duration: "2 Months",
    technologies: ["RDD", "DataFrames", "Streaming", "MLlib"]
  },
  {
    id: 47,
    title: "Blockchain",
    description: "Decentralized ledger technology.",
    icon: <Shield />,
    level: "Advanced",
    duration: "4 Months",
    technologies: ["Cryptography", "Smart Contracts", "Ethereum", "Solidity"]
  }
];



export const SERVICES = [
  {
    id: 1,
    title: "Web Development",
    description: "Custom, responsive, and SEO-friendly websites tailored to your brand.",
    icon: <Globe />
  },
  {
    id: 2,
    title: "Mobile App Development",
    description: "Native and cross-platform mobile applications for iOS and Android.",
    icon: <Smartphone />
  },
  {
    id: 3,
    title: "Software Development",
    description: "Scalable and robust software solutions for enterprise needs.",
    icon: <Code />
  },
  {
    id: 4,
    title: "AI & Automation Solutions",
    description: "Intelligent automation and predictive analytics to streamline operations.",
    icon: <Cpu />
  },
  {
    id: 5,
    title: "Graphic Designing",
    description: "Creative visual designs that communicate your brand message effectively.",
    icon: <PenTool />
  },
  {
    id: 6,
    title: "Video Production & Editing",
    description: "High-quality video content creation and professional editing services.",
    icon: <Sparkles />
  },
  {
    id: 7,
    title: "Digital Marketing",
    description: "Strategic marketing solutions to boost your online presence and growth.",
    icon: <TrendingUp />
  },
  {
    id: 8,
    title: "Cloud & IT Support",
    description: "Reliable cloud infrastructure management and technical support.",
    icon: <Cloud />
  },
  {
    id: 9,
    title: "Training & Development",
    description: "Corporate training and skill development programs for teams.",
    icon: <GraduationCap />
  }
];


export const WHY_CHOOSE_US = [
  {
    id: 1,
    title: "Real Industry Projects",
    description: "Work on live projects that solve real-world business problems.",
    icon: <Briefcase />
  },
  {
    id: 2,
    title: "1:1 Mentorship",
    description: "Personalized guidance from experienced industry professionals.",
    icon: <UserCheck />
  },
  {
    id: 3,
    title: "Internship Certificate",
    description: "Earn a recognized certificate to boost your resume and career.",
    icon: <FileCheck />
  },
  {
    id: 4,
    title: "Placement Assistance",
    description: "Dedicated support to help you land your dream job.",
    icon: <TrendingUp />
  },
  {
    id: 5,
    title: "Practical Learning Approach",
    description: "Focus on hands-on coding and implementation over theory.",
    icon: <Wrench />
  },
  {
    id: 6,
    title: "Affordable Pricing",
    description: "High-quality education made accessible with competitive pricing.",
    icon: <Wallet />
  }
];

export const STATS = [
  { label: "Active Students", value: "5,000+", icon: <Users /> },
  { label: "Placements", value: "1,200+", icon: <Briefcase /> },
  { label: "Courses", value: "50+", icon: <BookOpen /> },
  { label: "Hiring Partners", value: "200+", icon: <Award /> },
];

export const TESTIMONIALS = [
  {
    id: 1,
    name: "Rahul Sharma",
    role: "Software Engineer at Google",
    content: "BN Intelhub transformed my career. The hands-on projects and mentorship were invaluable.",
    avatar: "./image1.png"
  },
  {
    id: 2,
    name: "Vikram Singh",
    role: "Data Scientist at Amazon",
    content: "The curriculum is up-to-date with industry standards. I got placed within a month of completion.",
    avatar: "./image2.png"
  },
  {
    id: 3,
    name: "Sanjay Verma",
    role: "Software Engineer",
    content: "Excellent instructors and a supportive community. Highly recommended for anyone looking to upskill.",
    avatar: "./image3.png"
  }
];
