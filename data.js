// Data management utilities

// Default portfolio data
const defaultPortfolioData = [
    {
        id: 1,
        title: 'E-Commerce Platform Security',
        category: 'Cybersecurity',
        description: 'Implementasi sistem keamanan berlapis pada platform e-commerce dengan enkripsi SSL/TLS dan PCI compliance.',
        tags: ['Security Audit', 'Penetration Testing', 'Compliance'],
        color: 'from-blue-500 to-cyan-500',
    },
    {
        id: 2,
        title: 'Mobile Banking Application',
        category: 'Development',
        description: 'Aplikasi mobile banking dengan fitur transfer, pembayaran, dan investasi. React Native + Node.js backend.',
        tags: ['React Native', 'Node.js', 'Mobile Security'],
        color: 'from-purple-500 to-pink-500',
    },
    {
        id: 3,
        title: 'Corporate Dashboard UI',
        category: 'Design',
        description: 'Redesign dashboard untuk perusahaan multinasional dengan fokus pada user experience dan accessibility.',
        tags: ['UI Design', 'UX Research', 'Figma'],
        color: 'from-orange-500 to-red-500',
    },
    {
        id: 4,
        title: 'Healthcare Management System',
        category: 'Full-Stack',
        description: 'Sistem manajemen rumah sakit lengkap dengan appointment scheduling, medical records, dan billing system.',
        tags: ['Next.js', 'PostgreSQL', 'HIPAA Compliance'],
        color: 'from-green-500 to-emerald-500',
    },
    {
        id: 5,
        title: 'Real-time Analytics Platform',
        category: 'Development',
        description: 'Platform analytics real-time dengan visualisasi data interaktif dan machine learning predictions.',
        tags: ['React', 'D3.js', 'Python ML'],
        color: 'from-indigo-500 to-blue-500',
    },
    {
        id: 6,
        title: 'Social Media Redesign',
        category: 'Design',
        description: 'Redesign interface media sosial dengan focus pada engagement metrics dan user retention.',
        tags: ['UI/UX', 'Prototyping', 'User Testing'],
        color: 'from-pink-500 to-rose-500',
    },
];

// Default certifications data
const defaultCertificationsData = [
    {
        id: 1,
        title: 'CEH (Certified Ethical Hacker)',
        issuer: 'EC-Council',
        year: '2023',
        type: 'certification',
    },
    {
        id: 2,
        title: 'AWS Solutions Architect',
        issuer: 'Amazon Web Services',
        year: '2023',
        type: 'certification',
    },
    {
        id: 3,
        title: 'Google Cloud Professional',
        issuer: 'Google Cloud',
        year: '2022',
        type: 'certification',
    },
    {
        id: 4,
        title: 'ISO 27001 Security Lead',
        issuer: 'ISO',
        year: '2022',
        type: 'certification',
    },
];

// Services data
const servicesData = [
    {
        icon: 'fa-lock',
        title: 'Cybersecurity & Penetration Testing',
        description: 'Identifikasi dan amankan kerentanan sistem Anda dengan penetration testing profesional dan audit keamanan menyeluruh.',
        features: ['Vulnerability Scanning', 'Security Audit', 'Risk Assessment'],
    },
    {
        icon: 'fa-code',
        title: 'Full-Stack Development',
        description: 'Aplikasi web dan mobile yang scalable dengan teknologi terkini. Backend yang robust dan frontend yang intuitif.',
        features: ['Web Applications', 'Mobile Apps', 'API Development'],
    },
    {
        icon: 'fa-palette',
        title: 'UI/UX Web Design',
        description: 'Desain user interface yang modern dan user experience yang luar biasa untuk meningkatkan engagement pengguna.',
        features: ['UI Design', 'UX Research', 'Prototyping'],
    },
];

// Skills data
const skillsData = [
    {
        category: 'Cybersecurity',
        skills: [
            { name: 'Penetration Testing', level: 95 },
            { name: 'Network Security', level: 90 },
            { name: 'Vulnerability Assessment', level: 92 },
            { name: 'Ethical Hacking', level: 88 },
        ],
    },
    {
        category: 'Frontend Development',
        skills: [
            { name: 'React.js', level: 95 },
            { name: 'TypeScript', level: 92 },
            { name: 'Tailwind CSS', level: 95 },
            { name: 'Next.js', level: 93 },
            { name: 'UI/UX Design', level: 88 },
        ],
    },
    {
        category: 'Backend Development',
        skills: [
            { name: 'Node.js', level: 93 },
            { name: 'Python', level: 90 },
            { name: 'PostgreSQL', level: 92 },
            { name: 'MongoDB', level: 88 },
            { name: 'API Design', level: 94 },
        ],
    },
    {
        category: 'Tools & Infrastructure',
        skills: [
            { name: 'Docker', level: 90 },
            { name: 'Git', level: 95 },
            { name: 'CI/CD Pipeline', level: 87 },
            { name: 'Linux', level: 92 },
        ],
    },
];

// Load portfolio data from localStorage or return default
function loadPortfolioData() {
    const stored = localStorage.getItem('portfolioData');
    if (stored) {
        try {
            return JSON.parse(stored);
        } catch (e) {
            console.error('Error parsing portfolio data:', e);
        }
    }
    return defaultPortfolioData;
}

// Save portfolio data to localStorage
function savePortfolioData(data) {
    localStorage.setItem('portfolioData', JSON.stringify(data));
    // Trigger custom event
    window.dispatchEvent(new CustomEvent('dataUpdated'));
}

// Load certifications data from localStorage or return default
function loadCertificationsData() {
    const stored = localStorage.getItem('certificationsData');
    if (stored) {
        try {
            return JSON.parse(stored);
        } catch (e) {
            console.error('Error parsing certifications data:', e);
        }
    }
    return defaultCertificationsData;
}

// Save certifications data to localStorage
function saveCertificationsData(data) {
    localStorage.setItem('certificationsData', JSON.stringify(data));
    // Trigger custom event
    window.dispatchEvent(new CustomEvent('dataUpdated'));
}

