require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('./config/db');
const Service = require('./models/Service');
const Scheme = require('./models/Scheme');
const Quiz = require('./models/Quiz');
const User = require('./models/User');

/**
 * Seed Database with Sample Data
 * Run this script to populate the database with initial data
 * Usage: node seed.js
 */

const seedData = async () => {
  try {
    if (mongoose.connection.readyState !== 1) {
      await connectDB();
    }

    console.log('Starting data seeding...');

    // Clear existing data
    await Service.deleteMany({});
    await Scheme.deleteMany({});
    await Quiz.deleteMany({});
    await User.deleteMany({});

    console.log('Cleared existing data');

    // Create admin user
    const adminUser = await User.create({
      name: 'Admin User',
      email: 'admin@digitalcitizen.gov.in',
      password: 'admin123',
      role: 'admin',
    });
    console.log('Admin user created');

    // Create sample user
    await User.create({
      name: 'Rahul Sharma',
      email: 'rahul@example.com',
      password: 'user123',
      role: 'user',
    });
    console.log('Sample user created');

    // Seed Services
    const services = [
      {
        title: 'DigiLocker',
        description:
          'DigiLocker is a digital locker service provided by the Ministry of Electronics and Information Technology (MeitY), Government of India. It enables Indian citizens to store and share digital versions of their important documents like Aadhaar, PAN, driving license, vehicle registration, and educational certificates. The platform uses Aadhaar-based eKYC for authentication and provides 1GB of free cloud storage per citizen.',
        shortDescription:
          'Digital document wallet for storing government-issued documents securely',
        category: 'Identity',
        icon: 'FileCheck',
        websiteUrl: 'https://digilocker.gov.in',
        appUrl: 'https://play.google.com/store/apps/details?id=com.digilocker.android',
        features: [
          'Access documents anytime, anywhere',
          'Share documents digitally with government agencies',
          'eSign documents using Aadhaar authentication',
          '1GB free cloud storage',
          'Integration with 1000+ government services',
          'Paperless verification process',
        ],
        eligibility: 'All Indian citizens with Aadhaar number',
        documents: ['Aadhaar Card', 'Mobile Number'],
        steps: [
          { title: 'Sign Up', description: 'Visit digilocker.gov.in and sign up using Aadhaar OTP' },
          { title: 'Verify Identity', description: 'Complete eKYC verification using Aadhaar' },
          { title: 'Upload Documents', description: 'Upload or pull documents from issuers' },
          { title: 'Access Anywhere', description: 'View and share documents digitally' },
        ],
        createdBy: adminUser._id,
      },
      {
        title: 'UMANG (Unified Mobile Application for New-age Governance)',
        description:
          'UMANG is a unified mobile application that provides access to various government services from Central to Local government bodies on a single platform. It offers over 1,200 services from 200+ departments across India. The app supports 13 Indian languages and allows citizens to access services like Aadhaar, PAN, EPFO, ESIC, Income Tax, and many more.',
        shortDescription:
          'One-stop mobile app for accessing all government services',
        category: 'Governance',
        icon: 'Smartphone',
        websiteUrl: 'https://web.umang.gov.in',
        appUrl: 'https://play.google.com/store/apps/details?id=in.gov.umang.negd.g2c',
        features: [
          'Access 1,200+ government services',
          'Available in 13 Indian languages',
          'Single sign-on for all services',
          'Track application status',
          'Download certificates and documents',
          'Multiple payment options integrated',
        ],
        eligibility: 'All Indian citizens',
        documents: ['Mobile Number', 'Aadhaar (optional)'],
        steps: [
          { title: 'Download App', description: 'Install UMANG from Play Store or App Store' },
          { title: 'Register', description: 'Register using mobile number and OTP' },
          { title: 'Link Aadhaar', description: 'Optional - Link Aadhaar for enhanced services' },
          { title: 'Access Services', description: 'Browse and use any government service' },
        ],
        createdBy: adminUser._id,
      },
      {
        title: 'Aadhaar',
        description:
          'Aadhaar is a 12-digit unique identity number issued by the Unique Identification Authority of India (UIDAI) to residents of India. It serves as proof of identity and address anywhere in India. The Aadhaar system is the largest biometric ID system in the world, with over 1.3 billion enrolled members. It enables direct benefit transfer, digital authentication, and eKYC services.',
        shortDescription:
          '12-digit unique identity number for Indian residents',
        category: 'Identity',
        icon: 'Fingerprint',
        websiteUrl: 'https://uidai.gov.in',
        appUrl: 'https://play.google.com/store/apps/details?id=in.gov.uidai.mAadhaarPlus',
        features: [
          'Proof of Identity and Address',
          'Digital Life Certificate',
          'eKYC for financial services',
          'Direct Benefit Transfer (DBT)',
          'Aadhaar Pay for cashless transactions',
          'Virtual ID for enhanced privacy',
        ],
        eligibility: 'All residents of India',
        documents: [
          'Proof of Identity (Passport, PAN, Voter ID)',
          'Proof of Address (Utility bill, bank statement)',
          'Date of Birth proof',
        ],
        steps: [
          { title: 'Book Appointment', description: 'Visit uidai.gov.in and book enrollment appointment' },
          { title: 'Visit Center', description: 'Go to Aadhaar Enrollment Center with documents' },
          { title: 'Biometric Capture', description: 'Provide photo, fingerprints, and iris scan' },
          { title: 'Receive Aadhaar', description: 'Get Aadhaar number via SMS and physical card by post' },
        ],
        createdBy: adminUser._id,
      },
      {
        title: 'PAN Card Services',
        description:
          'Permanent Account Number (PAN) is a 10-digit alphanumeric identifier issued by the Income Tax Department of India. It is mandatory for filing income tax returns, opening bank accounts, and high-value transactions. The e-PAN facility provides instant PAN allotment through Aadhaar-based eKYC.',
        shortDescription:
          '10-digit tax identification number for financial transactions',
        category: 'Finance',
        icon: 'CreditCard',
        websiteUrl: 'https://www.incometax.gov.in',
        appUrl: '',
        features: [
          'Online PAN application',
          'Instant e-PAN through Aadhaar',
          'PAN verification services',
          'Link PAN with Aadhaar',
          'Track application status',
          'Download e-PAN card',
        ],
        eligibility: 'All Indian citizens and foreign nationals',
        documents: ['Aadhaar Card (for e-PAN)', 'Photograph', 'Identity and Address proof'],
        steps: [
          { title: 'Visit Portal', description: 'Go to incometax.gov.in' },
          { title: 'Apply Online', description: 'Fill the PAN application form (Form 49A)' },
          { title: 'Submit Documents', description: 'Upload required documents' },
          { title: 'Make Payment', description: 'Pay the application fee online' },
        ],
        createdBy: adminUser._id,
      },
      {
        title: 'MyGov',
        description:
          'MyGov is a citizen engagement platform launched by the Government of India to promote active participation of Indian citizens in governance. Citizens can share ideas, suggestions, and creative solutions for government programs. The platform hosts various competitions, polls, discussions, and campaigns to foster participatory governance.',
        shortDescription:
          'Citizen engagement platform for participatory governance',
        category: 'Governance',
        icon: 'MessageSquare',
        websiteUrl: 'https://www.mygov.in',
        appUrl: 'https://play.google.com/store/apps/details?id=in.mygov',
        features: [
          'Participate in discussions and polls',
          'Submit creative content and ideas',
          'Join government campaigns',
          'Earn certificates and recognition',
          'Access latest government updates',
          'Participate in quizzes and competitions',
        ],
        eligibility: 'All Indian citizens',
        documents: ['Email ID or Mobile Number'],
        steps: [
          { title: 'Register', description: 'Sign up on mygov.in' },
          { title: 'Complete Profile', description: 'Fill in your profile details' },
          { title: 'Participate', description: 'Join discussions, polls, and campaigns' },
          { title: 'Earn Badges', description: 'Get recognition for participation' },
        ],
        createdBy: adminUser._id,
      },
      {
        title: 'e-Shram',
        description:
          'e-Shram is a national database for unorganized workers launched by the Ministry of Labour and Employment. It aims to register over 38 crore unorganized workers such as construction workers, migrant workers, gig and platform workers, street vendors, and domestic workers. Registered workers get an e-Shram card and are eligible for various social security benefits.',
        shortDescription:
          'National database for unorganized workers with social security benefits',
        category: 'Employment',
        icon: 'HardHat',
        websiteUrl: 'https://eshram.gov.in',
        appUrl: '',
        features: [
          'Universal Account Number (UAN) card',
          'Accident insurance coverage',
          'Social security benefits',
          'Access to welfare schemes',
          'Job opportunities portal',
          'Skill training programs',
        ],
        eligibility:
          'Unorganized workers aged 16-59 years',
        documents: ['Aadhaar Card', 'Bank Account', 'Mobile Number'],
        steps: [
          { title: 'Visit Portal', description: 'Go to eshram.gov.in' },
          { title: 'Enter Aadhaar', description: 'Enter Aadhaar number and verify with OTP' },
          { title: 'Fill Details', description: 'Enter personal and occupation details' },
          { title: 'Download Card', description: 'Download e-Shram card with UAN' },
        ],
        createdBy: adminUser._id,
      },
      {
        title: 'CoWIN',
        description:
          'CoWIN (Covid Vaccine Intelligence Network) is a robust, scalable, and extensible platform for COVID-19 vaccination registration and management. While initially developed for COVID-19, the platform has been expanded to support other vaccination programs. It provides features for vaccine registration, appointment scheduling, certificate download, and vaccination verification.',
        shortDescription:
          'Vaccination registration and certificate platform',
        category: 'Health',
        icon: 'Syringe',
        websiteUrl: 'https://cowin.gov.in',
        appUrl: 'https://play.google.com/store/apps/details?id=nic.goi.aarogyasetu',
        features: [
          'Vaccine registration for all age groups',
          'Book vaccination appointments',
          'Download vaccination certificate',
          'Verify vaccination status',
          'Manage family members',
          'International travel certificate',
        ],
        eligibility: 'All citizens',
        documents: ['Aadhaar or other ID proof', 'Mobile Number'],
        steps: [
          { title: 'Register', description: 'Register on cowin.gov.in or Aarogya Setu app' },
          { title: 'Verify', description: 'Verify with OTP' },
          { title: 'Add Members', description: 'Add self and family members' },
          { title: 'Book Slot', description: 'Search and book vaccination slot' },
        ],
        createdBy: adminUser._id,
      },
      {
        title: 'Passport Seva',
        description:
          'Passport Seva is an online portal for Indian passport services managed by the Ministry of External Affairs. It provides services for fresh passport applications, re-issue, tatkaal (urgent) passports, and miscellaneous services. The platform has simplified the passport application process with online form filling, appointment booking, and fee payment.',
        shortDescription:
          'Online passport application and management system',
        category: 'Travel',
        icon: 'Plane',
        websiteUrl: 'https://www.passportindia.gov.in',
        appUrl: 'https://play.google.com/store/apps/details?id=in.gov.mea.psp',
        features: [
          'Online passport application',
          'Appointment scheduling',
          'Fee payment online',
          'Track application status',
          'Tatkaal (urgent) service',
          'Police verification integration',
        ],
        eligibility: 'All Indian citizens',
        documents: [
          'Proof of Date of Birth',
          'Address proof',
          'Photo ID proof',
          'Old Passport (for re-issue)',
        ],
        steps: [
          { title: 'Register', description: 'Create account on Passport Seva portal' },
          { title: 'Fill Application', description: 'Complete the online application form' },
          { title: 'Pay Fee', description: 'Make online payment' },
          { title: 'Book Appointment', description: 'Schedule visit to Passport Seva Kendra' },
        ],
        createdBy: adminUser._id,
      },
    ];

    await Service.insertMany(services);
    console.log(`${services.length} services seeded`);

    // Seed Schemes
    const schemes = [
      {
        title: 'PM Kisan Samman Nidhi (PM-KISAN)',
        description:
          'PM-KISAN is a Central Sector Scheme with 100% funding from Government of India. Under the scheme, income support of Rs. 6,000 per year is provided to all farmer families across the country in three equal installments of Rs. 2,000 each every four months. The fund is transferred directly to the bank accounts of the beneficiaries.',
        shortDescription:
          'Direct income support of Rs. 6,000/year to farmer families',
        category: 'Farmer',
        ministry: 'Ministry of Agriculture & Farmers Welfare',
        launchedDate: new Date('2019-02-24'),
        icon: 'Wheat',
        benefits: [
          'Rs. 6,000 per year financial support',
          'Direct Benefit Transfer to bank account',
          'No intermediaries or middlemen',
          'Covers all landholding farmer families',
        ],
        eligibility:
          'All landholding farmers families with cultivable land',
        documents: [
          'Aadhaar Card',
          'Land Records',
          'Bank Account Details',
          'Mobile Number',
        ],
        applicationProcess:
          'Visit the official PM-KISAN portal or nearest Common Service Centre (CSC). Fill the application form with land details and bank account information. Verification is done by state government officials.',
        applicationUrl: 'https://pmkisan.gov.in',
        helpline: '011-23381092',
        budget: 'Rs. 75,000 Crore (Annual)',
        beneficiaries: '11 Crore+ farmers',
        createdBy: adminUser._id,
      },
      {
        title: 'Ayushman Bharat Pradhan Mantri Jan Arogya Yojana (AB-PMJAY)',
        description:
          'Ayushman Bharat PM-JAY is the largest health assurance scheme in the world which aims at providing a health cover of Rs. 5 lakhs per family per year for secondary and tertiary care hospitalization to over 12 crore poor and vulnerable families. It covers 3 days of pre-hospitalization and 15 days post-hospitalization expenses.',
        shortDescription:
          'Health coverage of Rs. 5 lakh per family per year',
        category: 'Health',
        ministry: 'Ministry of Health and Family Welfare',
        launchedDate: new Date('2018-09-23'),
        icon: 'Heart',
        benefits: [
          'Rs. 5 lakh health insurance per family per year',
          'Covers 1,949 treatment procedures',
          'Cashless treatment at empanelled hospitals',
          'Pre and post hospitalization expenses covered',
          'No cap on age or family size',
          'Covers pre-existing conditions from day one',
        ],
        eligibility:
          'Families identified in SECC 2011 database, covering poor and vulnerable families',
        documents: [
          'AB-PMJAY e-card or ration card',
          'Aadhaar Card',
          'Mobile Number',
        ],
        applicationProcess:
          'Check eligibility on pmjay.gov.in by entering mobile number. Download Ayushman app or visit nearest Ayushman Bharat Kendra. Get e-card issued after verification.',
        applicationUrl: 'https://pmjay.gov.in',
        helpline: '14555',
        budget: 'Rs. 6,400 Crore (Annual)',
        beneficiaries: '12 Crore+ families',
        createdBy: adminUser._id,
      },
      {
        title: 'Pradhan Mantri Awas Yojana (PMAY)',
        description:
          'PMAY is a flagship housing scheme aimed at providing affordable housing to all by 2022. The scheme has two components: PMAY-Urban and PMAY-Rural. Under the Credit Linked Subsidy Scheme (CLSS), beneficiaries can avail interest subsidy on home loans. The scheme also provides assistance for construction of houses and enhancement of existing dwellings.',
        shortDescription:
          'Housing for all with subsidized home loans',
        category: 'Housing',
        ministry: 'Ministry of Housing and Urban Affairs',
        launchedDate: new Date('2015-06-25'),
        icon: 'Home',
        benefits: [
          'Interest subsidy up to 6.5% on home loans',
          'Subsidy amount up to Rs. 2.67 lakh',
          'Affordable houses in urban areas',
          'Houses for Economically Weaker Sections',
          'Women ownership mandatory',
          'Green and sustainable construction',
        ],
        eligibility:
          'EWS/LIG/MIG families not owning a pucca house anywhere in India',
        documents: [
          'Aadhaar Card',
          'Income Certificate',
          'Bank Account Details',
          'Property Documents',
        ],
        applicationProcess:
          'Apply online at pmaymis.gov.in or through participating banks for CLSS. Fill the application form, upload documents, and track application status online.',
        applicationUrl: 'https://pmaymis.gov.in',
        helpline: '1800-11-6163',
        budget: 'Rs. 8.31 Lakh Crore',
        beneficiaries: '3 Crore+ houses sanctioned',
        createdBy: adminUser._id,
      },
      {
        title: 'National Pension System (NPS)',
        description:
          'National Pension System is a government-sponsored pension scheme open to all Indian citizens. It is a voluntary, defined contribution retirement savings scheme designed to enable systematic savings during the subscribers working life. NPS offers two types of accounts: Tier I (mandatory pension account) and Tier II (voluntary savings account).',
        shortDescription:
          'Voluntary retirement savings pension scheme',
        category: 'Financial Inclusion',
        ministry: 'Pension Fund Regulatory and Development Authority (PFRDA)',
        launchedDate: new Date('2004-01-01'),
        icon: 'PiggyBank',
        benefits: [
          'Market-linked returns on investments',
          'Additional tax benefits under Section 80CCD(1B)',
          'Low fund management charges',
          'Partial withdrawal facility',
          'Annuity options at retirement',
          'Portable across jobs and locations',
        ],
        eligibility:
          'Indian citizens aged 18-65 years',
        documents: [
          'Aadhaar Card',
          'PAN Card',
          'Cancelled Cheque',
          'Photograph',
        ],
        applicationProcess:
          'Open NPS account online through eNPS portal or through Points of Presence (PoP). Fill registration form, complete KYC, make initial contribution, and receive PRAN card.',
        applicationUrl: 'https://enps.nsdl.com',
        helpline: '1800-208-8282',
        budget: 'Voluntary contributions',
        beneficiaries: '4.5 Crore+ subscribers',
        createdBy: adminUser._id,
      },
      {
        title: 'Beti Bachao Beti Padhao (BBBP)',
        description:
          'Beti Bachao Beti Padhao is a flagship scheme to address the declining child sex ratio and related issues of empowerment of girls and women. The scheme focuses on awareness and advocacy campaigns, multi-sectoral interventions, and improving the efficiency of welfare services for girls.',
        shortDescription:
          'Scheme for girl child welfare and education',
        category: 'Women',
        ministry: 'Ministry of Women and Child Development',
        launchedDate: new Date('2015-01-22'),
        icon: 'Baby',
        benefits: [
          'Sukanya Samriddhi Account for girl child',
          'Scholarships for girls education',
          'Awareness campaigns on gender equality',
          'Improvement in child sex ratio',
          'Quality education for girls',
          'Skill development programs',
        ],
        eligibility:
          'All girl children and their families',
        documents: [
          "Girl Child's Birth Certificate",
          'Aadhaar Card of parents',
          'Bank Account Details',
        ],
        applicationProcess:
          'Open Sukanya Samriddhi Account at any post office or authorized bank. Fill the application form with child details, make initial deposit, and receive passbook.',
        applicationUrl: 'https://wcd.nic.in/bbbp-scheme',
        helpline: '181',
        budget: 'Rs. 848 Crore',
        beneficiaries: '640 districts covered',
        createdBy: adminUser._id,
      },
      {
        title: 'Pradhan Mantri Matru Vandana Yojana (PMMVY)',
        description:
          'PMMVY is a maternity benefit program providing partial wage compensation to women for wage-loss during childbirth and childcare. Pregnant women and lactating mothers receive Rs. 6,000 for the first living child to improve health seeking behaviour and compensate for wage loss.',
        shortDescription:
          'Maternity benefit of Rs. 6,000 for pregnant women',
        category: 'Women',
        ministry: 'Ministry of Women and Child Development',
        launchedDate: new Date('2017-01-01'),
        icon: 'Baby',
        benefits: [
          'Rs. 6,000 cash transfer in three installments',
          'Direct Benefit Transfer to bank account',
          'Promotes institutional delivery',
          'Supports first living child',
          'Antenatal care incentives',
        ],
        eligibility:
          'Pregnant women and lactating mothers for their first live birth',
        documents: [
          'Aadhaar Card',
          'Mother and Child Protection Card',
          'Bank Account Details',
          'Registration at Anganwadi Centre',
        ],
        applicationProcess:
          'Register at nearest Anganwadi Centre or Health Facility. Fill Form 1A, submit documents, and receive benefits in installments at different stages of pregnancy and child birth.',
        applicationUrl: 'https://wcd.nic.in/schemes/pradhan-mantri-matru-vandana-yojana',
        helpline: '181',
        budget: 'Rs. 2,700 Crore',
        beneficiaries: '3 Crore+ women',
        createdBy: adminUser._id,
      },
      {
        title: 'Pradhan Mantri Ujjwala Yojana',
        description:
          'PMUY aims to safeguard the health of women and children by providing them with clean cooking fuel - LPG. Under the scheme, 8 crore LPG connections were provided to BPL families with a financial support of Rs. 1,600 per connection. The scheme has been expanded to cover all poor families as per SECC 2011 data.',
        shortDescription:
          'Free LPG connections to women from poor families',
        category: 'Women',
        ministry: 'Ministry of Petroleum and Natural Gas',
        launchedDate: new Date('2016-05-01'),
        icon: 'Flame',
        benefits: [
          'Free LPG connection with stove',
          'First refill free',
          'Subsidy on subsequent refills',
          'Optional EMI facility for stove and refill',
          'Reduces indoor air pollution',
        ],
        eligibility:
          'Adult women belonging to BPL households',
        documents: [
          'BPL Certificate or ration card',
          'Aadhaar Card',
          'Bank Account Details',
          'Address Proof',
        ],
        applicationProcess:
          'Apply at nearest LPG distributor or through mylpg.in. Submit Ujjwala KYC form with documents. Connection is issued after verification.',
        applicationUrl: 'https://www.mylpg.in',
        helpline: '1800-233-3555',
        budget: 'Rs. 12,800 Crore',
        beneficiaries: '9.5 Crore+ connections',
        createdBy: adminUser._id,
      },
      {
        title: 'Sukanya Samriddhi Yojana (SSY)',
        description:
          'Sukanya Samriddhi Yojana is a small deposit scheme for girl children launched as part of Beti Bachao Beti Padhao campaign. Parents can open an SSY account anytime between the birth of a girl child and the time she attains 10 years of age. The account earns attractive interest and provides tax benefits.',
        shortDescription:
          'Savings scheme for girl child education and marriage',
        category: 'Women',
        ministry: 'Ministry of Finance',
        launchedDate: new Date('2015-01-22'),
        icon: 'Baby',
        benefits: [
          'Interest rate: 8.2% per annum (current)',
          'Tax deduction under Section 80C',
          'Tax-free maturity amount',
          'Minimum deposit: Rs. 250 per year',
          'Account matures after 21 years',
          'Partial withdrawal for education after 18 years',
        ],
        eligibility:
          'Girl child below 10 years of age',
        documents: [
          "Girl Child's Birth Certificate",
          'Identity proof of parent/guardian',
          'Address proof',
          'Photograph',
        ],
        applicationProcess:
          'Visit any post office or authorized bank. Fill the SSY application form, submit documents, make initial deposit (minimum Rs. 250), and receive passbook.',
        applicationUrl: 'https://www.indiapost.gov.in',
        helpline: '1800-266-6868',
        budget: 'Voluntary deposits',
        beneficiaries: '3 Crore+ accounts',
        createdBy: adminUser._id,
      },
      {
        title: 'National Scholarship Portal (NSP)',
        description:
          'National Scholarship Portal is a one-stop solution for students to apply for various scholarship schemes offered by Central Government, State Governments, and other government agencies. It simplifies the scholarship process from application to disbursement through Direct Benefit Transfer.',
        shortDescription:
          'Single platform for all government scholarships',
        category: 'Student',
        ministry: 'Ministry of Education',
        launchedDate: new Date('2016-07-01'),
        icon: 'GraduationCap',
        benefits: [
          'Single platform for all scholarships',
          'Direct Benefit Transfer to bank account',
          'Track application status online',
          'Wide range of scholarships available',
          'Simplified application process',
          'Renewal facility for existing scholarships',
        ],
        eligibility:
          'Students from Class 1 to PhD level meeting respective scholarship criteria',
        documents: [
          'Aadhaar Card',
          'Bank Account Details',
          'Educational certificates',
          'Income certificate',
          'Caste certificate (if applicable)',
        ],
        applicationProcess:
          'Register on scholarships.gov.in. Fill the scholarship application form, upload documents, and submit. Track application status through the portal.',
        applicationUrl: 'https://scholarships.gov.in',
        helpline: '0120-6619540',
        budget: 'Rs. 3,000 Crore+',
        beneficiaries: '5 Crore+ students',
        createdBy: adminUser._id,
      },
      {
        title: 'Mid-Day Meal Scheme (PM Poshan)',
        description:
          'PM Poshan (formerly Mid-Day Meal Scheme) is a Centrally Sponsored Scheme providing hot cooked meals to children studying in government and government-aided schools. The scheme aims to improve nutritional status of children, encourage regular attendance, and increase enrollment.',
        shortDescription:
          'Free nutritious meals for school children',
        category: 'Student',
        ministry: 'Ministry of Education',
        launchedDate: new Date('1995-08-15'),
        icon: 'Utensils',
        benefits: [
          'Hot cooked meal on all school days',
          'Nutritionally balanced diet',
          'Improved school attendance',
          'Social equality through shared meals',
          'Covers primary and upper primary students',
          'Special focus on disadvantaged groups',
        ],
        eligibility:
          'All children studying in Class I-VIII in government and aided schools',
        documents: ['School Enrollment'],
        applicationProcess:
          'Automatically available to all enrolled students in eligible schools. No separate application required.',
        applicationUrl: 'https://pmposhan.education.gov.in',
        helpline: '011-23382493',
        budget: 'Rs. 13,408 Crore',
        beneficiaries: '11.8 Crore students',
        createdBy: adminUser._id,
      },
      {
        title: 'Pradhan Mantri Vaya Vandana Yojana (PMVVY)',
        description:
          'PMVVY is a pension scheme for senior citizens aged 60 years and above. It provides an assured pension based on a guaranteed rate of return of 7.4% per annum. The scheme offers monthly, quarterly, half-yearly, and yearly pension modes.',
        shortDescription:
          'Pension scheme for senior citizens with 7.4% assured returns',
        category: 'Senior Citizen',
        ministry: 'Ministry of Finance',
        launchedDate: new Date('2017-07-21'),
        icon: 'Heart',
        benefits: [
          'Assured pension at 7.4% per annum',
          'Minimum pension: Rs. 1,000 per month',
          'Maximum pension: Rs. 9,250 per month',
          'Pension payment for 10 years',
          'Loan facility after 3 years',
          'Death benefit to nominee',
        ],
        eligibility:
          'Senior citizens aged 60 years and above',
        documents: [
          'Aadhaar Card',
          'Age proof',
          'Bank Account Details',
          'Photograph',
        ],
        applicationProcess:
          'Purchase policy from LIC of India online or through LIC agents. Fill application form, submit documents, and make payment.',
        applicationUrl: 'https://licindia.in',
        helpline: '1800-425-2466',
        budget: 'Rs. 15,000 Crore (Scheme corpus)',
        beneficiaries: '10 Lakh+ senior citizens',
        createdBy: adminUser._id,
      },
      {
        title: 'Indira Gandhi National Old Age Pension Scheme (IGNOAPS)',
        description:
          'IGNOAPS is a component of the National Social Assistance Programme (NSAP) providing pension to elderly people living below the poverty line. Beneficiaries receive Rs. 200 per month from the Central Government, with additional amount from respective State Governments.',
        shortDescription:
          'Monthly pension for BPL senior citizens',
        category: 'Senior Citizen',
        ministry: 'Ministry of Rural Development',
        launchedDate: new Date('1995-08-15'),
        icon: 'Heart',
        benefits: [
          'Monthly pension of Rs. 200 (Central) + State contribution',
          'Direct Benefit Transfer to bank account',
          'No contribution required from beneficiary',
          'Additional benefits in some states',
        ],
        eligibility:
          'Senior citizens aged 60 years and above belonging to BPL families',
        documents: [
          'BPL Card or ration card',
          'Age proof',
          'Aadhaar Card',
          'Bank Account Details',
        ],
        applicationProcess:
          'Apply through respective State Government portal or visit Block Development Office. Fill application form, submit documents, and undergo verification.',
        applicationUrl: 'https://nsap.nic.in',
        helpline: '1800-180-5131',
        budget: 'Rs. 9,500 Crore',
        beneficiaries: '2.9 Crore beneficiaries',
        createdBy: adminUser._id,
      },
      {
        title: 'Atal Pension Yojana (APY)',
        description:
          'Atal Pension Yojana is a pension scheme focused on unorganized sector workers. Subscribers receive a guaranteed minimum pension of Rs. 1,000 to Rs. 5,000 per month after attaining 60 years of age, depending on their contribution. The government co-contributes 50% of the subscriber contribution or Rs. 1,000 per annum, whichever is lower, for 5 years.',
        shortDescription:
          'Guaranteed pension of Rs. 1,000-5,000 for unorganized workers',
        category: 'Labour',
        ministry: 'Pension Fund Regulatory and Development Authority (PFRDA)',
        launchedDate: new Date('2015-06-01'),
        icon: 'PiggyBank',
        benefits: [
          'Guaranteed pension Rs. 1,000-5,000/month',
          'Government co-contribution for eligible subscribers',
          'Tax benefits under Section 80CCD',
          'Spouse continues to receive pension after subscriber death',
          'Return of corpus to nominee',
        ],
        eligibility:
          'Indian citizens aged 18-40 years with bank account',
        documents: [
          'Aadhaar Card',
          'Bank Account Details',
          'Mobile Number',
        ],
        applicationProcess:
          'Visit bank or post office offering APY. Fill the subscription form, provide Aadhaar and bank details, set auto-debit for contributions.',
        applicationUrl: 'https://npscra.nsdl.co.in',
        helpline: '1800-208-8282',
        budget: 'Rs. 400 Crore (Co-contribution)',
        beneficiaries: '4 Crore+ subscribers',
        createdBy: adminUser._id,
      },
      {
        title: 'Building and Other Construction Workers (BOCW) Welfare Scheme',
        description:
          'BOCW Welfare Scheme provides various benefits to registered construction workers including financial assistance for education, marriage, maternity, disability, and old age pension. The scheme is funded by cess collected under the Building and Other Construction Workers Welfare Cess Act, 1996.',
        shortDescription:
          'Comprehensive welfare scheme for construction workers',
        category: 'Labour',
        ministry: 'Ministry of Labour and Employment',
        launchedDate: new Date('1996-01-01'),
        icon: 'HardHat',
        benefits: [
          'Education assistance for children',
          'Marriage assistance',
          'Maternity benefit',
          'Disability pension',
          'Old age pension',
          'Medical and accident assistance',
          'Skill development training',
        ],
        eligibility:
          'Construction workers registered with State Welfare Board for at least 1 year',
        documents: [
          'BOCW Registration Card',
          'Aadhaar Card',
          'Bank Account Details',
          'Work experience certificate',
        ],
        applicationProcess:
          'Register with respective State BOCW Welfare Board. Submit application for specific benefit with required documents to the Board office.',
        applicationUrl: 'https://labour.gov.in',
        helpline: '1800-111-555',
        budget: 'State-specific',
        beneficiaries: '4 Crore+ registered workers',
        createdBy: adminUser._id,
      },
      {
        title: 'Pradhan Mantri Shram Yogi Maan-dhan (PM-SYM)',
        description:
          'PM-SYM is a voluntary pension scheme for unorganized workers with monthly income up to Rs. 15,000. Subscribers aged 18-40 years contribute Rs. 55-200 per month (matched by government) and receive Rs. 3,000 per month pension after 60 years of age.',
        shortDescription:
          'Pension of Rs. 3,000/month for unorganized workers',
        category: 'Labour',
        ministry: 'Ministry of Labour and Employment',
        launchedDate: new Date('2019-02-15'),
        icon: 'Wallet',
        benefits: [
          'Monthly pension of Rs. 3,000 after 60 years',
          'Government matches subscriber contribution',
          'Family pension to spouse after death',
          'Low monthly contribution (Rs. 55-200)',
          'Death benefit to nominee',
        ],
        eligibility:
          'Unorganized workers aged 18-40 years with income up to Rs. 15,000/month',
        documents: [
          'Aadhaar Card',
          'Bank Account with IFSC',
          'Mobile Number',
          'Age proof',
        ],
        applicationProcess:
          'Register at nearest CSC or labour office. Fill PM-SYM form with Aadhaar and bank details. Contribution is auto-debited from bank account.',
        applicationUrl: 'https://maandhan.in',
        helpline: '1800-267-6888',
        budget: 'Rs. 500 Crore (Annual)',
        beneficiaries: '50 Lakh+ subscribers',
        createdBy: adminUser._id,
      },
    ];

    await Scheme.insertMany(schemes);
    console.log(`${schemes.length} schemes seeded`);

    // Seed Quiz Questions
    const quizQuestions = [
      {
        question: 'What is the primary purpose of the Aadhaar card?',
        options: [
          'To open bank accounts only',
          'To serve as a proof of identity and address',
          'To get railway tickets',
          'To apply for passport only',
        ],
        correctAnswer: 1,
        category: 'Digital Services',
        difficulty: 'Easy',
        explanation:
          'Aadhaar serves as a proof of identity and address anywhere in India.',
      },
      {
        question: 'How much financial support does PM-KISAN provide per year?',
        options: ['Rs. 2,000', 'Rs. 4,000', 'Rs. 6,000', 'Rs. 10,000'],
        correctAnswer: 2,
        category: 'Welfare Schemes',
        difficulty: 'Easy',
        explanation:
          'PM-KISAN provides Rs. 6,000 per year in three installments of Rs. 2,000 each.',
      },
      {
        question: 'What is the health coverage amount under Ayushman Bharat PM-JAY?',
        options: [
          'Rs. 1 lakh',
          'Rs. 2 lakh',
          'Rs. 5 lakh',
          'Rs. 10 lakh',
        ],
        correctAnswer: 2,
        category: 'Health',
        difficulty: 'Easy',
        explanation:
          'Ayushman Bharat PM-JAY provides health coverage of Rs. 5 lakh per family per year.',
      },
      {
        question: 'Which ministry launched the DigiLocker service?',
        options: [
          'Ministry of Health',
          'Ministry of Education',
          'Ministry of Electronics and Information Technology',
          'Ministry of Finance',
        ],
        correctAnswer: 2,
        category: 'Digital Services',
        difficulty: 'Medium',
        explanation:
          'DigiLocker was launched by the Ministry of Electronics and Information Technology (MeitY).',
      },
      {
        question: 'What is the interest rate for Sukanya Samriddhi Yojana?',
        options: ['6.5%', '7.2%', '8.2%', '9.0%'],
        correctAnswer: 2,
        category: 'Welfare Schemes',
        difficulty: 'Medium',
        explanation:
          'The current interest rate for Sukanya Samriddhi Yojana is 8.2% per annum.',
      },
      {
        question: 'Under PMUY, who is eligible for a free LPG connection?',
        options: [
          'All women in India',
          'Women from BPL households',
          'Only urban women',
          'Working women only',
        ],
        correctAnswer: 1,
        category: 'Welfare Schemes',
        difficulty: 'Easy',
        explanation:
          'PM Ujjwala Yojana provides free LPG connections to women from BPL households.',
      },
      {
        question: 'What does UMANG stand for?',
        options: [
          'Unified Mobile App for National Growth',
          'Unified Mobile Application for New-age Governance',
          'Universal Mobile Access for National Governance',
          'United Mobile Application Network Gateway',
        ],
        correctAnswer: 1,
        category: 'Digital Services',
        difficulty: 'Medium',
        explanation:
          'UMANG stands for Unified Mobile Application for New-age Governance.',
      },
      {
        question: 'What is the minimum pension under Atal Pension Yojana?',
        options: [
          'Rs. 500 per month',
          'Rs. 1,000 per month',
          'Rs. 2,000 per month',
          'Rs. 3,000 per month',
        ],
        correctAnswer: 1,
        category: 'Finance',
        difficulty: 'Medium',
        explanation:
          'Atal Pension Yojana guarantees a minimum pension of Rs. 1,000 per month.',
      },
      {
        question: 'Who benefits from the Mid-Day Meal Scheme?',
        options: [
          'All school students',
          'Students in Class I-VIII of government and aided schools',
          'Only primary school students',
          'Only girls in government schools',
        ],
        correctAnswer: 1,
        category: 'Welfare Schemes',
        difficulty: 'Easy',
        explanation:
          'The Mid-Day Meal Scheme covers all children in Class I-VIII of government and aided schools.',
      },
      {
        question: 'What is the purpose of the National Scholarship Portal?',
        options: [
          'To provide student loans',
          'To apply for all government scholarships on a single platform',
          'To check exam results',
          'To apply for educational visas',
        ],
        correctAnswer: 1,
        category: 'Education',
        difficulty: 'Easy',
        explanation:
          'NSP is a single platform where students can apply for various government scholarships.',
      },
    ];

    await Quiz.insertMany(quizQuestions);
    console.log(`${quizQuestions.length} quiz questions seeded`);

    console.log('\nSeeding completed successfully!');
    console.log('Admin credentials: admin@digitalcitizen.gov.in / admin123');
    console.log('User credentials: rahul@example.com / user123');
    return true;
  } catch (error) {
    console.error('Seeding error:', error);
    throw error;
  }
};

if (require.main === module) {
  seedData().then(() => process.exit(0)).catch(() => process.exit(1));
}

module.exports = seedData;

