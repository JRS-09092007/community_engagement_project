export type TranslationKey = keyof typeof translations.en;

export const translations = {
  en: {
    // Brand & Header
    brandName: 'Digital Citizen',
    brandNameSubtitle: 'डिजिटल नागरिक',
    tagline: 'Learn. Access. Stay Safe.',
    initiative: 'Educational Citizen Awareness Platform',
    
    // Navigation
    navHome: 'Home',
    navAbout: 'About',
    navServices: 'Services',
    navSchemes: 'Schemes',
    navCyberSafety: 'Cyber Safety',
    navQuiz: 'Quiz',
    navFeedback: 'Feedback',
    navLogin: 'Login',
    navDashboard: 'Dashboard',
    navLogout: 'Logout',

    // Hero Section
    heroTitlePrefix: 'Empowering Citizens Through ',
    heroTitleHighlight: 'Digital Governance',
    heroSubtitle: 'Learn how to safely access government digital services and welfare schemes from your phone or computer.',
    ctaExploreServices: 'Explore Services',
    ctaLearnSafety: 'Learn Cyber Safety',
    ctaTakeQuiz: 'Take the Quiz',

    // Section Titles
    quickFinderTitle: 'What do you need help with?',
    quickFinderSubtitle: 'Select a category or search below to find digital services & schemes',
    whyGovernanceTitle: 'Why Digital Governance Matters',
    whyGovernanceSubtitle: 'Modern digital services save time, reduce paperwork, and empower citizens with 24/7 access',
    whatIsCitizenTitle: 'What is a Digital Citizen?',
    whatIsCitizenSubtitle: 'A responsible citizen uses official services smartly and keeps personal data safe',
    personaTitle: 'Choose what describes you',
    personaSubtitle: 'Find tailored digital services and welfare schemes for your specific needs',
    popularServicesTitle: 'Essential Government Services',
    popularSchemesTitle: 'Welfare Schemes for Every Citizen',
    cyberSafetyTitle: 'Stay Safe Online',
    cyberSafetySubtitle: 'Simple guidelines to protect your Aadhaar, OTP, and personal details from online scams',
    officialVerificationTitle: 'Is this an official website?',
    officialVerificationSubtitle: 'Learn how to distinguish genuine government portals from suspicious websites',
    traditionalVsDigitalTitle: 'Traditional vs Digital Governance',

    // Categories / Persona
    catDocuments: 'Documents',
    catHealth: 'Health',
    catFarmers: 'Farmers',
    catStudents: 'Students',
    catVoting: 'Voting',
    catSchemes: 'Government Schemes',
    catAppointments: 'Appointments',
    catCyberSafety: 'Digital Safety',
    catOther: 'Other Services',

    personaStudent: 'Student',
    personaFarmer: 'Farmer',
    personaPatient: 'Patient / Family',
    personaVoter: 'Voter',
    personaSenior: 'Senior Citizen',
    personaGeneral: 'General Citizen',

    // Search
    searchPlaceholder: 'Search for a service, scheme, or safety guide...',
    filterAll: 'All',
    officialSource: 'Official Source',
    visitOfficialWebsite: 'Visit Official Website',
    learnHow: 'Learn How',
    checkEligibility: 'Check eligibility on official portal',

    // Cyber Safety Rules
    warningTitle: 'STOP. THINK. VERIFY.',
    warningText: 'Before entering your personal details or OTP anywhere, verify that you are on an official government portal.',
    neverShareTitle: 'Never Share',
    neverShareItems: 'OTP, MPIN, Bank PIN, Aadhaar OTP, Passwords',
    avoidTitle: 'Avoid',
    avoidItems: 'Unknown links, Prize messages, Unverified APK files, Fake callers',
    alwaysTitle: 'Always',
    alwaysItems: 'Use official .gov.in websites, Download apps from Play Store, Keep phone locked',
    helplineText: 'National Cyber Crime Helpline: Call 1930 or visit cybercrime.gov.in',

    // Traditional vs Digital
    tradHours: 'Fixed office hours & queues',
    tradTravel: 'Multiple trips & travel cost',
    tradPaper: 'Paper copies & manual forms',
    tradTracking: 'Difficult status tracking',
    
    digiAccess: '24/7 access from home/phone',
    digiTravel: 'Zero travel needed for online services',
    digiPaper: 'Secure digital document storage',
    digiTracking: 'Real-time online application tracking',
    digitalMessage: 'Digital systems do not replace citizens; they empower citizens.',

    // Footer & Disclaimer
    disclaimerTitle: 'Important Educational Notice',
    disclaimerText: 'This website is an educational community-engagement project created by students to spread awareness about Government of India digital services and welfare schemes. It is NOT an official Government of India portal. For official applications, payments, or verification, always visit the official government website directly.',
    builtForCommunity: 'Built as a Community Engagement Project',
    allRightsReserved: 'All rights reserved.'
  },
  mr: {
    // Brand & Header
    brandName: 'डिजिटल नागरिक',
    brandNameSubtitle: 'Digital Citizen',
    tagline: 'शिका. वापरा. सुरक्षित रहा.',
    initiative: 'शैक्षणिक नागरिक जागरूकता मंच',
    
    // Navigation
    navHome: 'मुख्य पृष्ठ',
    navAbout: 'आमच्याबद्दल',
    navServices: 'सेवा',
    navSchemes: 'योजना',
    navCyberSafety: 'सायबर सुरक्षा',
    navQuiz: 'क्विझ',
    navFeedback: 'प्रतिक्रिया',
    navLogin: 'लॉगिन',
    navDashboard: 'डॅशबोर्ड',
    navLogout: 'लॉगआउट',

    // Hero Section
    heroTitlePrefix: 'नागरिकांचे सक्षमीकरण ',
    heroTitleHighlight: 'डिजिटल प्रशासनाद्वारे',
    heroSubtitle: 'तुमच्या फोन किंवा संगणकावरून सरकारी डिजिटल सेवा आणि कल्याणकारी योजनांचा सुरक्षित वापर कसा करावा ते शिका.',
    ctaExploreServices: 'सेवा शोधा',
    ctaLearnSafety: 'सायबर सुरक्षा शिका',
    ctaTakeQuiz: 'क्विझ खेळा',

    // Section Titles
    quickFinderTitle: 'तुम्हाला कशात मदत हवी आहे?',
    quickFinderSubtitle: 'डिजिटल सेवा आणि योजना शोधण्यासाठी खालील वर्गवारी निवडा किंवा शोधा',
    whyGovernanceTitle: 'डिजिटल प्रशासन का महत्त्वाचे आहे?',
    whyGovernanceSubtitle: 'आधुनिक डिजिटल सेवा वेळ वाचवतात, कागदपत्रे कमी करतात आणि २४/७ सेवा देतात',
    whatIsCitizenTitle: 'डिजिटल नागरिक म्हणजे काय?',
    whatIsCitizenSubtitle: 'जबाबदार नागरिक अधिकृत सेवांचा हुशारीने वापर करतो आणि वैयक्तिक माहिती सुरक्षित ठेवतो',
    personaTitle: 'तुमच्या गरजेनुसार निवडा',
    personaSubtitle: 'तुमच्या आवश्यकतेनुसार डिजिटल सेवा आणि योजनांची माहिती मिळवा',
    popularServicesTitle: 'महत्त्वाच्या सरकारी सेवा',
    popularSchemesTitle: 'प्रत्येक नागरिकासाठी सरकारी योजना',
    cyberSafetyTitle: 'ऑनलाईन सुरक्षित रहा',
    cyberSafetySubtitle: 'आधार, OTP आणि वैयक्तिक माहिती ऑनलाईन फसवणुकीपासून सुरक्षित ठेवण्याचे सोपे नियम',
    officialVerificationTitle: 'ही अधिकृत वेबसाईट आहे का?',
    officialVerificationSubtitle: 'खरी सरकारी संकेतस्थळे आणि बनावट संकेतस्थळांमधील फरक कसा ओळखायचा ते शिका',
    traditionalVsDigitalTitle: 'पारंपारिक विरुद्ध डिजिटल प्रशासन',

    // Categories / Persona
    catDocuments: 'कागदपत्रे',
    catHealth: 'आरोग्य',
    catFarmers: 'शेतकरी',
    catStudents: 'विद्यार्थी',
    catVoting: 'मतदान',
    catSchemes: 'सरकारी योजना',
    catAppointments: 'अपॉइंटमेंट',
    catCyberSafety: 'डिजिटल सुरक्षा',
    catOther: 'इतर सेवा',

    personaStudent: 'विद्यार्थी',
    personaFarmer: 'शेतकरी',
    personaPatient: 'रुग्ण / कुटुंब',
    personaVoter: 'मतदार',
    personaSenior: 'जेष्ठ नागरिक',
    personaGeneral: 'सामान्य नागरिक',

    // Search
    searchPlaceholder: 'सेवा, योजना किंवा सुरक्षेबद्दल शोधा...',
    filterAll: 'सर्व',
    officialSource: 'अधिकृत स्रोत',
    visitOfficialWebsite: 'अधिकृत वेबसाईटला भेट द्या',
    learnHow: 'कसे वापरावे',
    checkEligibility: 'अधिकृत पोर्टलवर पात्रता तपासा',

    // Cyber Safety Rules
    warningTitle: 'थांबा. विचार करा. पडताळा.',
    warningText: 'कोणतीही वैयक्तिक माहिती किंवा OTP प्रविष्ट करण्यापूर्वी, आपण अधिकृत सरकारी पोर्टलवर आहात याची खात्री करा.',
    neverShareTitle: 'कधीही शेअर करू नका',
    neverShareItems: 'OTP, MPIN, बँक पिन, आधार OTP, पासवर्ड',
    avoidTitle: 'टाळा',
    avoidItems: 'अनोळखी लिंक्स, बक्षीसांचे मेसेज, अनोळखी APK फायली, संशयास्पद कॉल्स',
    alwaysTitle: 'नेहमी करा',
    alwaysItems: 'अधिकृत .gov.in संकेतस्थळे वापरा, Play Store वरून अॅप्स डाउनलोड करा',
    helplineText: 'राष्ट्रीय सायबर गुन्हे हेल्पलाइन: १९३० वर कॉल करा किंवा cybercrime.gov.in ला भेट द्या',

    // Traditional vs Digital
    tradHours: 'ठराविक कार्यालयीन वेळ आणि रांगा',
    tradTravel: 'वारंवार प्रवास आणि खर्च',
    tradPaper: 'कागदपत्रांची देवघेव आणि फॉर्म्स',
    tradTracking: 'अर्जाची स्थिती जाणून घेणे कठीण',
    
    digiAccess: 'घरातून/फोनवरून २४/७ उपलब्धता',
    digiTravel: 'प्रवासाची कोणतीही गरज नाही',
    digiPaper: 'सुरक्षित डिजिटल दस्तऐवज साठवणूक',
    digiTracking: 'अर्जाची स्थिती ऑनलाईन ट्रॅक करा',
    digitalMessage: 'डिजिटल प्रणाली नागरिकांना बदलत नाही; ती नागरिकांना सक्षम करते.',

    // Footer & Disclaimer
    disclaimerTitle: 'महत्त्वाची शैक्षणिक सूचना',
    disclaimerText: 'हे संकेतस्थळ भारत सरकारच्या डिजिटल सेवा आणि कल्याणकारी योजनांबद्दल जागरूकता पसरवण्यासाठी विद्यार्थ्यांनी तयार केलेला शैक्षणिक प्रकल्प आहे. हे अधिकृत सरकारी संकेतस्थळ नाही. अर्जासाठी आणि अधिकृत कामांसाठी नेहमी अधिकृत सरकारी पोर्टलचाच वापर करा.',
    builtForCommunity: 'समुदाय सहभाग प्रकल्प म्हणून निर्मित',
    allRightsReserved: 'सर्व हक्क सुरक्षित.'
  },
  hi: {
    // Brand & Header
    brandName: 'डिजिटल नागरिक',
    brandNameSubtitle: 'Digital Citizen',
    tagline: 'सीखें. उपयोग करें. सुरक्षित रहें.',
    initiative: 'शैक्षणिक नागरिक जागरूकता मंच',
    
    // Navigation
    navHome: 'मुख्य पृष्ठ',
    navAbout: 'हमारे बारे में',
    navServices: 'सेवाएं',
    navSchemes: 'योजनाएं',
    navCyberSafety: 'साइबर सुरक्षा',
    navQuiz: 'क्विज',
    navFeedback: 'प्रतिक्रिया',
    navLogin: 'लॉगिन',
    navDashboard: 'डैशबोर्ड',
    navLogout: 'लॉगआउट',

    // Hero Section
    heroTitlePrefix: 'नागरिकों का सशक्तिकरण ',
    heroTitleHighlight: 'डिजिटल शासन के माध्यम से',
    heroSubtitle: 'अपने फोन या कंप्यूटर से सरकारी डिजिटल सेवाओं और कल्याणकारी योजनाओं का सुरक्षित उपयोग करना सीखें।',
    ctaExploreServices: 'सेवाएं खोजें',
    ctaLearnSafety: 'साइबर सुरक्षा सीखें',
    ctaTakeQuiz: 'क्विज शुरू करें',

    // Section Titles
    quickFinderTitle: 'आपको किस सहायता की आवश्यकता है?',
    quickFinderSubtitle: 'डिजिटल सेवाओं और योजनाओं को खोजने के लिए श्रेणी चुनें या खोजें',
    whyGovernanceTitle: 'डिजिटल गवर्नेंस क्यों महत्वपूर्ण है?',
    whyGovernanceSubtitle: 'आधुनिक डिजिटल सेवाएं समय बचाती हैं, कागजी कार्रवाई कम करती हैं और 24/7 पहुंच प्रदान करती हैं',
    whatIsCitizenTitle: 'डिजिटल नागरिक क्या है?',
    whatIsCitizenSubtitle: 'एक जिम्मेदार नागरिक आधिकारिक सेवाओं का समझदारी से उपयोग करता है और व्यक्तिगत डेटा सुरक्षित रखता है',
    personaTitle: 'अपनी आवश्यकता के अनुसार चुनें',
    personaSubtitle: 'अपनी विशिष्ट आवश्यकताओं के लिए उपयुक्त डिजिटल सेवाएं और योजनाएं खोजें',
    popularServicesTitle: 'प्रमुख सरकारी सेवाएं',
    popularSchemesTitle: 'हर नागरिक के लिए कल्याणकारी योजनाएं',
    cyberSafetyTitle: 'ऑनलाइन सुरक्षित रहें',
    cyberSafetySubtitle: 'आधार, OTP और व्यक्तिगत जानकारी को ऑनलाइन धोखाधड़ी से बचाने के सरल नियम',
    officialVerificationTitle: 'क्या यह एक आधिकारिक वेबसाइट है?',
    officialVerificationSubtitle: 'असली सरकारी पोर्टल और फर्जी वेबसाइटों में अंतर करना सीखें',
    traditionalVsDigitalTitle: 'पारंपरिक बनाम डिजिटल गवर्नेंस',

    // Categories / Persona
    catDocuments: 'दस्तावेज़',
    catHealth: 'स्वास्थ्य',
    catFarmers: 'किसान',
    catStudents: 'छात्र',
    catVoting: 'मतदान',
    catSchemes: 'सरकारी योजनाएं',
    catAppointments: 'अपॉइंटमेंट',
    catCyberSafety: 'डिजिटल सुरक्षा',
    catOther: 'अन्य सेवाएं',

    personaStudent: 'छात्र',
    personaFarmer: 'किसान',
    personaPatient: 'मरीज़ / परिवार',
    personaVoter: 'मतदाता',
    personaSenior: 'वरिष्ठ नागरिक',
    personaGeneral: 'सामान्य नागरिक',

    // Search
    searchPlaceholder: 'सेवा, योजना या सुरक्षा गाइड खोजें...',
    filterAll: 'सभी',
    officialSource: 'आधिकारिक स्रोत',
    visitOfficialWebsite: 'आधिकारिक वेबसाइट पर जाएं',
    learnHow: 'उपयोग कैसे करें',
    checkEligibility: 'आधिकारिक पोर्टल पर पात्रता जांचें',

    // Cyber Safety Rules
    warningTitle: 'रुको। सोचो। जांचो।',
    warningText: 'अपनी व्यक्तिगत जानकारी या OTP दर्ज करने से पहले, सत्यापित करें कि आप किसी आधिकारिक सरकारी पोर्टल पर हैं।',
    neverShareTitle: 'कभी शेयर न करें',
    neverShareItems: 'OTP, MPIN, बैंक पिन, आधार OTP, पासवर्ड',
    avoidTitle: 'बचें',
    avoidItems: 'अज्ञात लिंक, इनाम के संदेश, अनधिकृत APK फाइलें, संदिग्ध कॉल',
    alwaysTitle: 'हमेशा करें',
    alwaysItems: 'आधिकारिक .gov.in वेबसाइटों का उपयोग करें, Play Store से ऐप डाउनलोड करें',
    helplineText: 'राष्ट्रीय साइबर अपराध हेल्पलाइन: 1930 पर कॉल करें या cybercrime.gov.in पर जाएं',

    // Traditional vs Digital
    tradHours: 'निश्चित कार्यालय समय और कतारें',
    tradTravel: 'बार-बार यात्रा और खर्च',
    tradPaper: 'कागजी प्रतियां और फॉर्म',
    tradTracking: 'आवेदन की स्थिति जानना कठिन',
    
    digiAccess: 'घर/फोन से 24/7 पहुंच',
    digiTravel: 'ऑनलाइन सेवाओं के लिए यात्रा की आवश्यकता नहीं',
    digiPaper: 'सुरक्षित डिजिटल दस्तावेज़ भंडारण',
    digiTracking: 'ऑनलाइन वास्तविक समय आवेदन ट्रैकिंग',
    digitalMessage: 'डिजिटल प्रणाली नागरिकों की जगह नहीं लेती; यह नागरिकों को सशक्त बनाती है।',

    // Footer & Disclaimer
    disclaimerTitle: 'महत्वपूर्ण शैक्षणिक सूचना',
    disclaimerText: 'यह वेबसाइट भारत सरकार की डिजिटल सेवाओं और कल्याणकारी योजनाओं के बारे में जागरूकता फैलाने के लिए छात्रों द्वारा बनाया गया एक शैक्षणिक प्रोजेक्ट है। यह आधिकारिक सरकारी वेबसाइट नहीं है। आधिकारिक आवेदनों और सेवाओं के लिए हमेशा आधिकारिक सरकारी पोर्टल का ही उपयोग करें।',
    builtForCommunity: 'सामुदायिक सहभागिता परियोजना के रूप में निर्मित',
    allRightsReserved: 'सर्वाधिकार सुरक्षित।'
  }
};
