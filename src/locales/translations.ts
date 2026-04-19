export type Locale = 'tc' | 'en' | 'ja' | 'zh-hans';

export interface LocaleOption {
  code: Locale;
  label: string;
  shortLabel: string;
}

export const localeOptions: LocaleOption[] = [
  { code: 'tc', label: '繁體中文', shortLabel: '繁中' },
  { code: 'en', label: 'English', shortLabel: 'EN' },
  { code: 'ja', label: '日本語', shortLabel: '日本語' },
  { code: 'zh-hans', label: '简体中文', shortLabel: '简中' }
];

export interface Translations {
  nav: {
    home: string;
    features: string;
    blog: string;
    pricing: string;
    helpCenter: string;
    login: string;
    tryForFree: string;
  };
  hero: {
    title: string;
    subtitle: string;
    tryForFree: string;
    bookDemo: string;
  };
  features: {
    sectionTitle: string;
    card1Title: string;
    card1Description: string;
    card2Title: string;
    card2Description: string;
    card3Title: string;
    card3Description: string;
    card4Title: string;
    card4Description: string;
    card5Title: string;
    card5Description: string;
    viewDetails: string;
    viewAllFeatures: string;
  };
  blog: {
    sectionTitle: string;
    readMore: string;
    viewAll: string;
    // Blog posts
    post1Meta: string;
    post1Title: string;
    post1Description: string;
    post2Meta: string;
    post2Title: string;
    post2Description: string;
    post3Meta: string;
    post3Title: string;
    post3Description: string;
  };
  blogPage: {
    title: string;
    subtitle: string;
    searchPlaceholder: string;
    // Sidebar categories
    allPosts: string;
    productUpdates: string;
    caseStudies: string;
    industryInsights: string;
    events: string;
    // Meta
    by: string;
    readTime: string;
    // Post navigation
    previousPost: string;
    nextPost: string;
    backToBlog: string;
  };
  pricing: {
    sectionTitle: string;
    freeTitle: string;
    freePrice: string;
    freeDescription: string;
    basicTitle: string;
    basicPrice: string;
    basicDescription: string;
    basicBadge: string;
    proTitle: string;
    proPrice: string;
    proDescription: string;
    proBadge: string;
    enterpriseTitle: string;
    enterprisePrice: string;
    enterpriseDescription: string;
    getStarted: string;
    tryBasic: string;
    upgradeToPro: string;
    contactSales: string;
    month: string;
    monthly: string;
    yearly: string;
    perYear: string;
    // Feature items
    guestDatabaseLimit: string;
    monthlyEmails: string;
    emailTemplates: string;
    eventsAndSessions: string;
    userLimit: string;
  };
  helpCenter: {
    sectionTitle: string;
    searchPlaceholder: string;
    browseTopics: string;
    gettingStarted: string;
    accountManagement: string;
    eventCreation: string;
    guestManagement: string;
    technicalSupport: string;
    billing: string;
  };
  helpCenterPage: {
    title: string;
    searchPlaceholder: string;
    popularTopics: string;
    stillNeedHelp: string;
    emailUs: string;
    joinCommunity: string;
    talkToSupport: string;
    // Sidebar categories
    gettingStarted: string;
    productOverview: string;
    invitationsRSVP: string;
    sessionsEvents: string;
    guestDatabase: string;
    pricingBilling: string;
    settingsPermissions: string;
    troubleshooting: string;
    // Topic cards
    topic1Title: string;
    topic1Description: string;
    topic2Title: string;
    topic2Description: string;
    topic3Title: string;
    topic3Description: string;
    topic4Title: string;
    topic4Description: string;
    topic5Title: string;
    topic5Description: string;
    topic6Title: string;
    topic6Description: string;
    // Tag chips
    tagBilling: string;
    tagDataSources: string;
    tagRestoring: string;
    tagMembers: string;
  };
  footer: {
    // Column headings
    company: string;
    resources: string;
    invitiFor: string;
    // Company links
    aboutUs: string;
    termsAndPrivacy: string;
    // Resources links
    helpCenter: string;
    pricing: string;
    blog: string;
    // INVITI For links
    enterprise: string;
    teams: string;
    individuals: string;
    // Copyright
    copyright: string;
  };
  banner: {
    message: string;
    cta: string;
  };
  cookieBanner: {
    message: string;
    cookiePolicy: string;
    acceptAll: string;
    managePreferences: string;
    rejectNonEssential: string;
  };
  demoBooking: {
    // Hero
    title: string;
    subtitle: string;
    ctaButton: string;
    // What we'll cover
    coverTitle: string;
    card1Title: string;
    card1Description: string;
    card2Title: string;
    card2Description: string;
    card3Title: string;
    card3Description: string;
    // Agenda
    agendaTitle: string;
    agendaTimeline: string;
    // What you'll get
    getTitle: string;
    get1: string;
    get2: string;
    get3: string;
    // Privacy & CTA
    privacyNote: string;
    bookingTitle: string;
    fallbackEmail: string;
  };
  payment: {
    // Header
    title: string;
    subtitle: string;
    close: string;
    // Plan summary
    planSummaryTitle: string;
    monthly: string;
    yearly: string;
    seats: string;
    contactSalesForSeats: string;
    // Account & Billing
    accountBillingTitle: string;
    email: string;
    emailPlaceholder: string;
    companyName: string;
    companyNamePlaceholder: string;
    taxId: string;
    taxIdPlaceholder: string;
    billingAddress: string;
    street: string;
    streetPlaceholder: string;
    city: string;
    cityPlaceholder: string;
    postalCode: string;
    postalCodePlaceholder: string;
    country: string;
    countryPlaceholder: string;
    // Payment method
    paymentMethodTitle: string;
    creditCard: string;
    bankTransfer: string;
    cardNumber: string;
    cardNumberPlaceholder: string;
    expiration: string;
    expirationPlaceholder: string;
    cvc: string;
    cvcPlaceholder: string;
    nameOnCard: string;
    nameOnCardPlaceholder: string;
    // Verification
    verificationTitle: string;
    sendCode: string;
    // Coupon
    couponTitle: string;
    couponPlaceholder: string;
    apply: string;
    // Agreement
    agreeTerms: string;
    termsLink: string;
    privacyLink: string;
    autoRenewNote: string;
    // Summary
    totalAmount: string;
    effectiveImmediately: string;
    // Actions
    upgradeNow: string;
    contactSales: string;
    backToPricing: string;
    // Plan names
    freePlan: string;
    basicPlan: string;
    proPlan: string;
    enterprisePlan: string;
  };
  about: {
    title: string;
    subtitle: string;
    section1Body: string;
    section2Body: string;
    section3Body: string;
  };
  terms: {
    title: string;
    subtitle: string;
  };
  enterpriseInquiry: {
    title: string;
    close: string;
    // Company & Contact
    companyName: string;
    companyNamePlaceholder: string;
    companyWebsite: string;
    companyWebsitePlaceholder: string;
    contactName: string;
    contactNamePlaceholder: string;
    jobTitle: string;
    jobTitlePlaceholder: string;
    email: string;
    emailPlaceholder: string;
    phone: string;
    phonePlaceholder: string;
    // Use case & scale
    currentTool: string;
    currentToolPlaceholder: string;
    currentToolOptions: {
      spreadsheet: string;
      crm: string;
      selfBuilt: string;
      other: string;
      none: string;
    };
    currentToolOther: string;
    currentToolOtherPlaceholder: string;
    selectOption: string;
    enterDescription: string;
    eventsPerQuarter: string;
    eventsPerQuarterOptions: {
      range1: string;
      range2: string;
      range3: string;
      range4: string;
    };
    guestListSize: string;
    guestListSizeOptions: {
      small: string;
      medium: string;
      large: string;
      extraLarge: string;
    };
    integrationNeeds: string;
    integrationOptions: {
      ticketing: string;
      crm: string;
      email: string;
      other: string;
    };
    // Consent
    consent: string;
    consentError: string;
    // Actions
    submit: string;
    submitting: string;
    orEmail: string;
    // Validation
    required: string;
    invalidEmail: string;
    // Success
    successMessage: string;
    viewInbox: string;
  };
}

// Traditional Chinese (Source of Truth)
export const tc: Translations = {
  nav: {
    home: '首頁',
    features: '功能特色',
    blog: '部落格',
    pricing: '方案價格',
    helpCenter: '幫助中心',
    login: '登入',
    tryForFree: '預約展示'
  },
  hero: {
    title: 'INVITI 讓您將寶貴的時間花在關係維護，而非重複的複製貼上',
    subtitle: '為活動主辦方設計的公關名單管理系統',
    tryForFree: '免費試用',
    bookDemo: '預約展示'
  },
  features: {
    sectionTitle: '產品功能',
    card1Title: '活動管理／場次管理',
    card1Description: '一站整合活動名單與寄信流程。',
    card2Title: '一鍵邀請與追蹤出席狀況',
    card2Description: '一鍵寄信、即時掌握貴賓出席狀況。',
    card3Title: '貴賓資料庫',
    card3Description: '集中管理貴賓資料，累積關係資產。',
    card4Title: '角色與權限',
    card4Description: '協作、權限控管、稽核軌跡。',
    card5Title: '郵件模板',
    card5Description: '多版本管理，快速套用變數。',
    viewDetails: '查看詳情',
    viewAllFeatures: '查看所有功能'
  },
  blog: {
    sectionTitle: '最新文章',
    readMore: '閱讀更多',
    viewAll: '查看全部',
    // Blog posts
    post1Meta: '客戶故事 • 5 分鐘閱讀',
    post1Title: 'Agency X 如何優化 50+ 場活動',
    post1Description: '了解一家領先的公關公司如何使用 INVITI 將邀請時間減少 70%。',
    post2Meta: '產品更新 • 3 分鐘閱讀',
    post2Title: '推出客製品牌功能',
    post2Description: '全新白標功能讓您使用品牌識別自訂邀請函。',
    post3Meta: '產業觀點 • 7 分鐘閱讀',
    post3Title: '活動管理的未來',
    post3Description: '2025 年及未來數位活動協調的趨勢與預測。'
  },
  blogPage: {
    title: '部落格',
    subtitle: '探索產品更新、客戶故事與產業觀點',
    searchPlaceholder: '搜尋文章…',
    allPosts: '最新',
    productUpdates: '產品更新',
    caseStudies: '客戶故事',
    industryInsights: '產業觀點',
    events: '活動花絮',
    by: '作者',
    readTime: '分鐘閱讀',
    previousPost: '上一篇',
    nextPost: '下一篇',
    backToBlog: '返回部落格'
  },
  pricing: {
    sectionTitle: '方案價格',
    freeTitle: '免費版',
    freePrice: 'NT$0',
    freeDescription: '開始探索 INVITI 的核心功能',
    basicTitle: '入門版',
    basicPrice: 'NT$600',
    basicDescription: '適合小型活動與初創團隊',
    basicBadge: '適合個人工作者',
    proTitle: '專業版',
    proPrice: 'NT$3,000',
    proDescription: '適合成長中的企業與定期活動',
    proBadge: '適合團隊',
    enterpriseTitle: '企業版',
    enterprisePrice: 'Custom',
    enterpriseDescription: '為大型組織量身打造的解決方案',
    getStarted: 'Get Started',
    tryBasic: 'Try Basic',
    upgradeToPro: 'Upgrade to Pro',
    contactSales: 'Contact Sales',
    month: 'month',
    monthly: 'Monthly',
    yearly: 'Yearly',
    perYear: ' / Year',
    guestDatabaseLimit: '貴賓資料庫人數',
    monthlyEmails: '每月寄送郵件數量',
    emailTemplates: '信件模板',
    eventsAndSessions: '活動／場次',
    userLimit: '使用者上限'
  },
  helpCenter: {
    sectionTitle: '幫助中心',
    searchPlaceholder: '搜尋幫助文章...',
    browseTopics: '瀏覽主題',
    gettingStarted: '入門指南',
    accountManagement: '帳號管理',
    eventCreation: '建立活動',
    guestManagement: '賓客管理',
    technicalSupport: '技術支援',
    billing: '帳務問題'
  },
  helpCenterPage: {
    title: '我們能如何幫助您？',
    searchPlaceholder: '搜尋任何內容...',
    popularTopics: '熱門主題',
    stillNeedHelp: '仍需要協助？',
    emailUs: '發送電子郵件',
    joinCommunity: '加入社群',
    talkToSupport: '聯絡客服',
    gettingStarted: '開始使用',
    productOverview: '產品概覽與角色',
    invitationsRSVP: '邀請與回覆確認',
    sessionsEvents: '場次與活動',
    guestDatabase: '賓客資料庫',
    pricingBilling: '方案與帳務',
    settingsPermissions: '設定與權限',
    troubleshooting: '疑難排解',
    topic1Title: '發送您的第一封邀請',
    topic1Description: '了解如何建立和發送您的第一封活動邀請函',
    topic2Title: '追蹤 RSVP 回覆',
    topic2Description: '即時監控賓客回覆並管理參與人數',
    topic3Title: '管理賓客標籤',
    topic3Description: '使用標籤分類和整理您的賓客資料',
    topic4Title: '匯入 CSV 檔案',
    topic4Description: '快速批次匯入賓客名單與聯絡資訊',
    topic5Title: '自訂邀請函範本',
    topic5Description: '打造符合品牌形象的精美邀請函',
    topic6Title: '設定活動提醒',
    topic6Description: '自動化提醒確保賓客不會錯過您的活動',
    tagBilling: '帳務',
    tagDataSources: '資料來源',
    tagRestoring: '還原內容',
    tagMembers: '新增成員'
  },
  footer: {
    company: '公司',
    resources: '資源',
    invitiFor: 'INVITI，適用於',
    aboutUs: '關於我們',
    termsAndPrivacy: '條款和隱私權',
    helpCenter: '幫助中心',
    pricing: '定價',
    blog: '部落格',
    enterprise: '企業',
    teams: '團隊',
    individuals: '個人',
    copyright: '© {year} 藝氣股份有限公司 Inviti All rights reserved.'
  },
  demoBooking: {
    title: '預約展示',
    subtitle: '我們會安排一場約30分鐘的線上會議，了解貴單位目前使用的公關名單管理工具、流程與痛點。',
    ctaButton: '在 Google 行事曆預約時間',
    coverTitle: '會議內容',
    card1Title: '了解現況',
    card1Description: '貴單位目前使用的公關名單管理工具、流程以及活動規模、頻率等',
    card2Title: '釐清痛點',
    card2Description: '目前使用工具或流程上遇到的問題',
    card3Title: '下一步',
    card3Description: '若確認貴單位的使用情境符合，我們將會為您開通帳號並協助創建第一個活動',
    agendaTitle: '30 分鐘議程',
    agendaTimeline: '0–5′ 需求簡述｜5–15′ 現況/痛點｜15–25′ 功能示範｜25–30′ Q&A/下一步',
    getTitle: '會後收穫',
    get1: '客製化流程建議',
    get2: '功能對應清單',
    get3: '試用與下一步',
    privacyNote: '只做需求理解，不會存取或保留你的名單資料。',
    bookingTitle: '立即預約',
    fallbackEmail: '若行事曆沒有合適時段，請來信 contact@inviti.vip'
  },
  banner: {
    message: '🎉 新功能上線！立即體驗 INVITI 的智能賓客管理系統',
    cta: '了解更多'
  },
  cookieBanner: {
    message: '我們使用 Cookie 來增強功能、分析流量並個人化內容。請參閱我們的',
    cookiePolicy: 'Cookie 政策',
    acceptAll: '接受全部',
    managePreferences: '管理偏好',
    rejectNonEssential: '拒絕非必要'
  },
  payment: {
    title: '升級至所選方案',
    subtitle: '完成付款以啟用方案功能',
    close: '關閉',
    planSummaryTitle: '方案摘要',
    monthly: '月付',
    yearly: '年付',
    seats: '座席數（使用者數）',
    contactSalesForSeats: 'Contact sales',
    accountBillingTitle: '帳號與帳單資訊',
    email: 'Email',
    emailPlaceholder: 'your@email.com',
    companyName: '公司名稱（選填）',
    companyNamePlaceholder: '輸入公司名稱',
    taxId: '統編 / VAT（選填）',
    taxIdPlaceholder: '輸入統一編號',
    billingAddress: '帳單地址',
    street: '街道地址',
    streetPlaceholder: '輸入街道地址',
    city: '城市',
    cityPlaceholder: '輸入城市',
    postalCode: '郵遞區號',
    postalCodePlaceholder: '輸入郵遞區號',
    country: '國家',
    countryPlaceholder: '選擇國家',
    paymentMethodTitle: '付款方式',
    creditCard: '信用卡',
    bankTransfer: 'Bank transfer / 電匯',
    cardNumber: '卡號',
    cardNumberPlaceholder: '1234 5678 9012 3456',
    expiration: '到期日',
    expirationPlaceholder: 'MM/YY',
    cvc: 'CVC',
    cvcPlaceholder: '123',
    nameOnCard: '持卡人姓名',
    nameOnCardPlaceholder: '輸入持卡人姓名',
    verificationTitle: '身份驗證（選填）',
    sendCode: '傳送驗證碼至 Email',
    couponTitle: '優惠券（選填）',
    couponPlaceholder: '輸入優惠券代碼',
    apply: 'Apply',
    agreeTerms: '我同意',
    termsLink: '服務條款',
    privacyLink: '隱私權政策',
    autoRenewNote: '到期後將自動續約，可於任何時候取消。',
    totalAmount: '應付金額',
    effectiveImmediately: '立即生效，按比例計算。',
    upgradeNow: '立即升級',
    contactSales: 'Contact sales',
    backToPricing: '返回定價',
    freePlan: '免費版',
    basicPlan: '入門版',
    proPlan: '專業版',
    enterprisePlan: '企業版'
  },
  about: {
    title: '關於我們',
    subtitle: '',
    section1Body: '藝氣股份有限公司 ARTSIE INC. 以成為「中文娛樂的整合者」為目標，打造下一個世代多元且有層次的娛樂場景。',
    section2Body: '從現場喜劇、綜藝節目到 DJ 派對，藝氣與各領域的指標品牌締結策略合作，一起擴大華語娛樂市場，讓台灣成為中文娛樂的重要基地。',
    section3Body: '同時，我們也專注於開發專屬娛樂產業的後勤管理工具，例如報帳系統、合約管理系統、公關名單管理系統等，期望成為中文娛樂市場最可靠的後勤夥伴。'
  },
  terms: {
    title: '隱私權政策',
    subtitle: ''
  },
  enterpriseInquiry: {
    title: '聯繫我們了解企業方案',
    close: '關閉',
    // Company & Contact
    companyName: '公司名稱',
    companyNamePlaceholder: '',
    companyWebsite: '公司網站 / 社群',
    companyWebsitePlaceholder: '選填：www.example.com 或社群帳號',
    contactName: '聯絡人姓名',
    contactNamePlaceholder: '請輸入您的姓名',
    jobTitle: '職稱（必填）',
    jobTitlePlaceholder: '',
    email: 'Email',
    emailPlaceholder: 'your@email.com',
    phone: '聯絡電話（必填）',
    phonePlaceholder: '+886 912-345-678',
    // Use case & scale
    currentTool: '貴單位目前使用的公關名單管理工具（必填）',
    currentToolPlaceholder: '請選擇',
    currentToolOptions: {
      spreadsheet: 'Google表單、試算表',
      crm: 'CRM系統',
      selfBuilt: '自建系統',
      other: '其他',
      none: '無'
    },
    currentToolOther: '若選擇「其他」，請簡述工具名稱或作法',
    currentToolOtherPlaceholder: '請輸入說明',
    selectOption: '請選擇一個選項',
    enterDescription: '請輸入說明',
    eventsPerQuarter: '每季活動數量',
    eventsPerQuarterOptions: {
      range1: '0–1 場',
      range2: '2–5 場',
      range3: '6–10 場',
      range4: '10 場以上'
    },
    guestListSize: '單場貴賓名單規模',
    guestListSizeOptions: {
      small: '少於 100 人',
      medium: '100–500 人',
      large: '500–2,000 人',
      extraLarge: '2,000 人以上'
    },
    integrationNeeds: '是否需要與既有系統整合',
    integrationOptions: {
      ticketing: '售票系統',
      crm: 'CRM 系統',
      email: 'Email 平台',
      other: '其他'
    },
    // Consent
    consent: '我同意將以上資訊用於後續聯繫與方案評估，並寄送一份副本至我的 Email。',
    consentError: '請同意資訊使用條款',
    // Actions
    submit: '送出需求',
    submitting: '送出中...',
    orEmail: '或直接來信 contact@inviti.vip',
    // Validation
    required: '此欄位為必填',
    invalidEmail: '請輸入有效的 Email 地址',
    // Success
    successMessage: '已送出，我們將儘快與您聯繫。',
    viewInbox: '查看收件匣'
  }
};

// English
export const en: Translations = {
  nav: {
    home: 'Home',
    features: 'Features',
    blog: 'Blog',
    pricing: 'Pricing',
    helpCenter: 'Help Center',
    login: 'Log in',
    tryForFree: 'Book a Demo'
  },
  hero: {
    title: 'Simplify Your Guest Invitations with INVITI',
    subtitle: 'A complete PR guest list management system for event organizers',
    tryForFree: 'Book a Demo',
    bookDemo: 'Book a Demo'
  },
  features: {
    sectionTitle: 'Product Features',
    card1Title: 'Event & Session Management',
    card1Description: 'Multi-session setup, time and venue all in one place, linked with email variables.',
    card2Title: 'Automated Invitations & Tracking',
    card2Description: 'Batch sending, reply mapping, real-time status updates.',
    card3Title: 'Centralized Guest Database',
    card3Description: 'Tags, deduplication, cross-event reuse.',
    card4Title: 'Roles & Permissions',
    card4Description: 'Collaboration, access control, audit trails.',
    card5Title: 'Email Templates',
    card5Description: 'Multi-version management, quick variable application.',
    viewDetails: 'View Details',
    viewAllFeatures: 'View All Features'
  },
  blog: {
    sectionTitle: 'Latest from Our Blog',
    readMore: 'Read More',
    viewAll: 'View All',
    // Blog posts
    post1Meta: 'Case Study • 5 min read',
    post1Title: 'How Agency X Streamlined 50+ Events',
    post1Description: 'Learn how a leading PR agency reduced invitation time by 70% using INVITI.',
    post2Meta: 'Product Update • 3 min read',
    post2Title: 'Introducing Custom Branding',
    post2Description: 'New white-label features let you customize invitations with your brand identity.',
    post3Meta: 'Industry Insight • 7 min read',
    post3Title: 'The Future of Event Management',
    post3Description: 'Trends and predictions for digital event coordination in 2025 and beyond.'
  },
  blogPage: {
    title: 'Blogs',
    subtitle: 'Explore product updates, customer stories, and industry insights',
    searchPlaceholder: 'Search articles…',
    allPosts: 'All',
    productUpdates: 'Product Updates',
    caseStudies: 'Case Studies',
    industryInsights: 'Industry Insights',
    events: 'Events',
    by: 'By',
    readTime: 'min read',
    previousPost: 'Previous',
    nextPost: 'Next',
    backToBlog: 'Back to Blog'
  },
  pricing: {
    sectionTitle: 'Pricing Plans',
    freeTitle: 'Free',
    freePrice: '$0',
    freeDescription: 'Start exploring INVITI core features',
    basicTitle: 'Basic',
    basicPrice: '$20',
    basicDescription: 'Perfect for small events and startups',
    basicBadge: 'For individuals',
    proTitle: 'Pro',
    proPrice: '$100',
    proDescription: 'For growing businesses and regular events',
    proBadge: 'For teams',
    enterpriseTitle: 'Enterprise',
    enterprisePrice: 'Custom',
    enterpriseDescription: 'Tailored solutions for large organizations',
    getStarted: 'Get Started',
    tryBasic: 'Try Basic',
    upgradeToPro: 'Upgrade to Pro',
    contactSales: 'Contact Sales',
    month: 'month',
    monthly: 'Monthly',
    yearly: 'Yearly',
    perYear: ' / Year',
    guestDatabaseLimit: 'Guest database',
    monthlyEmails: 'Monthly email sends',
    emailTemplates: 'Email templates',
    eventsAndSessions: 'Events / Sessions',
    userLimit: 'User limit'
  },
  helpCenter: {
    sectionTitle: 'Help Center',
    searchPlaceholder: 'Search help articles...',
    browseTopics: 'Browse Topics',
    gettingStarted: 'Getting Started',
    accountManagement: 'Account Management',
    eventCreation: 'Event Creation',
    guestManagement: 'Guest Management',
    technicalSupport: 'Technical Support',
    billing: 'Billing'
  },
  helpCenterPage: {
    title: 'How can we help?',
    searchPlaceholder: 'Search for anything...',
    popularTopics: 'Popular topics',
    stillNeedHelp: 'Still need help?',
    emailUs: 'Email us',
    joinCommunity: 'Join our community',
    talkToSupport: 'Talk to support',
    gettingStarted: 'Getting started',
    productOverview: 'Product overview & roles',
    invitationsRSVP: 'Invitations & RSVP',
    sessionsEvents: 'Sessions & events',
    guestDatabase: 'Guest database',
    pricingBilling: 'Pricing & billing',
    settingsPermissions: 'Settings & permissions',
    troubleshooting: 'Troubleshooting',
    topic1Title: 'Send your first invitation',
    topic1Description: 'Learn how to create and send your first event invitation',
    topic2Title: 'Track RSVPs',
    topic2Description: 'Monitor guest responses and manage attendance in real-time',
    topic3Title: 'Manage guest tags',
    topic3Description: 'Use tags to categorize and organize your guest data',
    topic4Title: 'Import a CSV',
    topic4Description: 'Quickly bulk import guest lists and contact information',
    topic5Title: 'Customize invitation templates',
    topic5Description: 'Create beautiful invitations that match your brand',
    topic6Title: 'Set up event reminders',
    topic6Description: 'Automate reminders to ensure guests don\'t miss your event',
    tagBilling: 'Billing',
    tagDataSources: 'Data sources',
    tagRestoring: 'Restoring content',
    tagMembers: 'Adding members'
  },
  footer: {
    company: 'Company',
    resources: 'Resources',
    invitiFor: 'INVITI for',
    aboutUs: 'About Us',
    termsAndPrivacy: 'Terms & Privacy',
    helpCenter: 'Help Center',
    pricing: 'Pricing',
    blog: 'Blog',
    enterprise: 'Enterprise',
    teams: 'Teams',
    individuals: 'Individuals',
    copyright: '© {year} Inviti All rights reserved.'
  },
  demoBooking: {
    title: 'Book a Demo',
    subtitle: 'We\'ll set up a ~30-minute online meeting to understand your PR list tools, workflows, and pain points, then demonstrate how INVITI can help.',
    ctaButton: 'Book on Google Calendar',
    coverTitle: 'What We\'ll Cover',
    card1Title: 'Current Setup',
    card1Description: 'Your existing list tools, collaboration methods, email workflows',
    card2Title: 'Pain Points',
    card2Description: 'Data duplication, response tracking, handoff issues between team members',
    card3Title: 'Product Demo',
    card3Description: 'See invitations, RSVP tracking, and database management in action',
    agendaTitle: '30-Minute Agenda',
    agendaTimeline: '0-5\' Overview | 5-15\' Current State/Pain Points | 15-25\' Feature Demo | 25-30\' Q&A/Next Steps',
    getTitle: 'What You\'ll Get',
    get1: 'Customized workflow recommendations',
    get2: 'Feature compatibility checklist',
    get3: 'Trial access and next steps',
    privacyNote: 'We only discuss requirements—no access to or storage of your guest data.',
    bookingTitle: 'Book Now',
    fallbackEmail: 'If no suitable time slots, email us at contact@inviti.vip'
  },
  banner: {
    message: '🎉 New Feature Launch! Experience INVITI\'s Smart Guest Management System',
    cta: 'Learn More'
  },
  cookieBanner: {
    message: 'We use cookies to enhance functionality, analyze traffic, and personalize content. See our',
    cookiePolicy: 'Cookie Policy',
    acceptAll: 'Accept all',
    managePreferences: 'Manage preferences',
    rejectNonEssential: 'Reject non-essential'
  },
  payment: {
    title: 'Upgrade to Selected Plan',
    subtitle: 'Complete payment to activate plan features',
    close: 'Close',
    planSummaryTitle: 'Plan Summary',
    monthly: 'Monthly',
    yearly: 'Yearly',
    seats: 'Seats (Users)',
    contactSalesForSeats: 'Contact sales',
    accountBillingTitle: 'Account & Billing Information',
    email: 'Email',
    emailPlaceholder: 'your@email.com',
    companyName: 'Company Name (Optional)',
    companyNamePlaceholder: 'Enter company name',
    taxId: 'Tax ID / VAT (Optional)',
    taxIdPlaceholder: 'Enter tax ID',
    billingAddress: 'Billing Address',
    street: 'Street Address',
    streetPlaceholder: 'Enter street address',
    city: 'City',
    cityPlaceholder: 'Enter city',
    postalCode: 'Postal Code',
    postalCodePlaceholder: 'Enter postal code',
    country: 'Country',
    countryPlaceholder: 'Select country',
    paymentMethodTitle: 'Payment Method',
    creditCard: 'Credit Card',
    bankTransfer: 'Bank Transfer',
    cardNumber: 'Card Number',
    cardNumberPlaceholder: '1234 5678 9012 3456',
    expiration: 'Expiration',
    expirationPlaceholder: 'MM/YY',
    cvc: 'CVC',
    cvcPlaceholder: '123',
    nameOnCard: 'Name on Card',
    nameOnCardPlaceholder: 'Enter cardholder name',
    verificationTitle: 'Verification (Optional)',
    sendCode: 'Send verification code to Email',
    couponTitle: 'Coupon (Optional)',
    couponPlaceholder: 'Enter coupon code',
    apply: 'Apply',
    agreeTerms: 'I agree to the',
    termsLink: 'Terms of Service',
    privacyLink: 'Privacy Policy',
    autoRenewNote: 'Auto-renews after expiration. Cancel anytime.',
    totalAmount: 'Total Amount',
    effectiveImmediately: 'Effective immediately, prorated.',
    upgradeNow: 'Upgrade Now',
    contactSales: 'Contact sales',
    backToPricing: 'Back to Pricing',
    freePlan: 'Free',
    basicPlan: 'Basic',
    proPlan: 'Pro',
    enterprisePlan: 'Enterprise'
  },
  about: {
    title: 'About Us',
    subtitle: '',
    section1Body: 'ARTSIE INC. aims to become the "Integrator of Chinese Entertainment," creating diverse and multi-layered entertainment experiences for the next generation.',
    section2Body: 'From live comedy and variety shows to DJ parties, ARTSIE forms strategic partnerships with leading brands across various fields to expand the Chinese-language entertainment market, making Taiwan an important hub for Chinese entertainment.',
    section3Body: 'At the same time, we focus on developing specialized backend management tools for the entertainment industry, such as expense management systems, contract management systems, and PR guest list management systems, with the goal of becoming the most reliable backend partner in the Chinese entertainment market.'
  },
  terms: {
    title: 'Privacy Policy',
    subtitle: ''
  },
  enterpriseInquiry: {
    title: 'Contact Us for Enterprise Plan',
    close: 'Close',
    // Company & Contact
    companyName: 'Company Name',
    companyNamePlaceholder: '',
    companyWebsite: 'Company Website / Social',
    companyWebsitePlaceholder: 'Optional: www.example.com or social handle',
    contactName: 'Contact Name',
    contactNamePlaceholder: 'Enter your name',
    jobTitle: 'Job Title (Required)',
    jobTitlePlaceholder: '',
    email: 'Email',
    emailPlaceholder: 'your@email.com',
    phone: 'Phone Number (Required)',
    phonePlaceholder: '+1 234-567-8900',
    // Use case & scale
    currentTool: 'Current PR Guest List Management Tool (Required)',
    currentToolPlaceholder: 'Please select',
    currentToolOptions: {
      spreadsheet: 'Google Forms / Spreadsheets',
      crm: 'CRM System',
      selfBuilt: 'Self-built System',
      other: 'Other',
      none: 'None'
    },
    currentToolOther: 'If you selected "Other", please describe the tool or method',
    currentToolOtherPlaceholder: 'Please enter description',
    selectOption: 'Please select an option',
    enterDescription: 'Please enter description',
    eventsPerQuarter: 'Events per Quarter',
    eventsPerQuarterOptions: {
      range1: '0–1 events',
      range2: '2–5 events',
      range3: '6–10 events',
      range4: '10+ events'
    },
    guestListSize: 'Guest List Size per Event',
    guestListSizeOptions: {
      small: 'Under 100',
      medium: '100–500',
      large: '500–2,000',
      extraLarge: '2,000+'
    },
    integrationNeeds: 'Integration Requirements',
    integrationOptions: {
      ticketing: 'Ticketing System',
      crm: 'CRM System',
      email: 'Email Platform',
      other: 'Other'
    },
    // Consent
    consent: 'I agree to the use of this information for follow-up contact and plan evaluation, and to receive a copy via email.',
    consentError: 'Please agree to the terms',
    // Actions
    submit: 'Submit Inquiry',
    submitting: 'Submitting...',
    orEmail: 'Or email us at contact@inviti.vip',
    // Validation
    required: 'This field is required',
    invalidEmail: 'Please enter a valid email address',
    // Success
    successMessage: 'Submitted! We\'ll get back to you soon.',
    viewInbox: 'View Inbox'
  }
};

// Japanese
export const ja: Translations = {
  nav: {
    home: 'ホーム',
    features: '機能',
    blog: 'ブログ',
    pricing: '料金',
    helpCenter: 'ヘルプセンター',
    login: 'ログイン',
    tryForFree: 'デモを予約'
  },
  hero: {
    title: 'INVITI でゲスト招待を簡素化',
    subtitle: 'イベント主催者のための完全な PR ゲストリスト管理システム',
    tryForFree: 'デモを予約',
    bookDemo: 'デモを予約'
  },
  features: {
    sectionTitle: '製品機能',
    card1Title: 'イベント・セッション管理',
    card1Description: 'マルチセッション設定、時間と会場を一元管理、メール変数と連動。',
    card2Title: '自動招待状と追跡',
    card2Description: '一括送信、返信対応、リアルタイムステータス更新。',
    card3Title: '一元化されたゲストデータベース',
    card3Description: 'タグ、重複排除、イベント間再利用。',
    card4Title: '役割と権限',
    card4Description: 'コラボレーション、アクセス制御、監査証跡。',
    card5Title: 'メールテンプレート',
    card5Description: 'マルチバージョン管理、変数の迅速な適用。',
    viewDetails: '詳細を見る',
    viewAllFeatures: 'すべての機能を見る'
  },
  blog: {
    sectionTitle: 'ブログの最新情報',
    readMore: '続きを読む',
    viewAll: 'すべて表示',
    // Blog posts
    post1Meta: '事例研究 • 5 分で読む',
    post1Title: 'Agency X が 50 以上のイベントを効率化',
    post1Description: '大手 PR エージェンシーが INVITI を使用して招待時間を 70% 削減した方法をご覧ください。',
    post2Meta: '製品アップデート • 3 分で読む',
    post2Title: 'カスタムブランディングの導入',
    post2Description: '新しいホワイトラベル機能で、ブランドアイデンティティに合わせて招待状をカスタマイズできます。',
    post3Meta: '業界インサイト • 7 分で読む',
    post3Title: 'イベント管理の未来',
    post3Description: '2025 年以降のデジタルイベントコーディネーションのトレンドと予測。'
  },
  blogPage: {
    title: 'Blogs',
    subtitle: '製品アップデート、顧客事例、業界インサイトを探索',
    searchPlaceholder: '記事を検索…',
    allPosts: 'すべて',
    productUpdates: '製品アップデート',
    caseStudies: '顧客事例',
    industryInsights: '業界インサイト',
    events: 'イベント',
    by: '作成者',
    readTime: '分で読む',
    previousPost: '前へ',
    nextPost: '次へ',
    backToBlog: 'ブログに戻る'
  },
  pricing: {
    sectionTitle: '料金プラン',
    freeTitle: '無料版',
    freePrice: '¥0',
    freeDescription: 'INVITIの主要機能を体験',
    basicTitle: 'ベーシック',
    basicPrice: '¥2,200',
    basicDescription: '小規模イベントやスタートアップに最適',
    basicBadge: '個人向け',
    proTitle: 'プロ',
    proPrice: '¥11,000',
    proDescription: '成長企業や定期イベント向け',
    proBadge: 'チーム向け',
    enterpriseTitle: 'エンタープライズ',
    enterprisePrice: 'カスタム',
    enterpriseDescription: '大規模組織向けカスタマイズソリューション',
    getStarted: 'Get Started',
    tryBasic: 'Try Basic',
    upgradeToPro: 'Upgrade to Pro',
    contactSales: 'Contact Sales',
    month: 'month',
    monthly: 'Monthly',
    yearly: 'Yearly',
    perYear: ' / 年',
    guestDatabaseLimit: 'ゲストデータベース',
    monthlyEmails: '月間メール送信数',
    emailTemplates: 'メールテンプレート',
    eventsAndSessions: 'イベント／セッション',
    userLimit: 'ユーザー上限'
  },
  helpCenter: {
    sectionTitle: 'ヘルプセンター',
    searchPlaceholder: 'ヘルプ記事を検索...',
    browseTopics: 'トピックを閲覧',
    gettingStarted: 'はじめに',
    accountManagement: 'アカウント管理',
    eventCreation: 'イベント作成',
    guestManagement: 'ゲスト管理',
    technicalSupport: '技術サポート',
    billing: '請求'
  },
  helpCenterPage: {
    title: 'どのようにお手伝いできますか？',
    searchPlaceholder: '何でも検索...',
    popularTopics: '人気のトピック',
    stillNeedHelp: 'まだヘルプが必要ですか？',
    emailUs: 'メールでお問い合わせ',
    joinCommunity: 'コミュニティに参加',
    talkToSupport: 'サポートに連絡',
    gettingStarted: 'はじめに',
    productOverview: '製品概要と役割',
    invitationsRSVP: '招待状と出欠確認',
    sessionsEvents: 'セッションとイベント',
    guestDatabase: 'ゲストデータベース',
    pricingBilling: '料金と請求',
    settingsPermissions: '設定と権限',
    troubleshooting: 'トラブルシューティング',
    topic1Title: '最初の招待状を送信',
    topic1Description: 'イベント招待状の作成と送信方法を学ぶ',
    topic2Title: '出欠確認を追跡',
    topic2Description: 'ゲストの返信をリアルタイムで監視・管理',
    topic3Title: 'ゲストタグを管理',
    topic3Description: 'タグを使用してゲストデータを分類・整理',
    topic4Title: 'CSVをインポート',
    topic4Description: 'ゲストリストと連絡先情報を一括インポート',
    topic5Title: '招待状テンプレートをカスタマイズ',
    topic5Description: 'ブランドに合った美しい招待状を作成',
    topic6Title: 'イベントリマインダーを設定',
    topic6Description: '自動リマインダーでゲストの出席を確保',
    tagBilling: '請求',
    tagDataSources: 'データソース',
    tagRestoring: 'コンテンツの復元',
    tagMembers: 'メンバーの追加'
  },
  footer: {
    company: '会社',
    resources: 'リソース',
    invitiFor: 'INVITIの対象',
    aboutUs: '会社概要',
    termsAndPrivacy: '利用規約とプライバシー',
    helpCenter: 'ヘルプセンター',
    pricing: '料金',
    blog: 'ブログ',
    enterprise: '企業',
    teams: 'チーム',
    individuals: '個人',
    copyright: '© {year} Inviti All rights reserved.'
  },
  demoBooking: {
    title: 'デモを予約',
    subtitle: '約30分のオンラインミーティングを設定しPRリストツール、ワークフロー、課題を把握した後、INVITIがどのように支援できるかをデモンストレーションします。',
    ctaButton: 'Google カレンダーで予約',
    coverTitle: '会議内容',
    card1Title: '現状の把握',
    card1Description: '現在お使いのリストツール、協業方法、メール送信フロー',
    card2Title: '課題の特定',
    card2Description: 'データ重複、返信追跡、チーム間の引継ぎなどの問題',
    card3Title: '製品デモ',
    card3Description: '招待状、RSVP追跡、データベース管理を実際の状況で確認',
    agendaTitle: '30分間のアジェンダ',
    agendaTimeline: '0-5分 概要説明｜5-15分 現状/課題｜15-25分 機能デモ｜25-30分 質疑応答/次のステップ',
    getTitle: '得られるもの',
    get1: 'カスタマイズされたワークフロー提案',
    get2: '機能対応チェックリスト',
    get3: 'トライアルアクセスと次のステップ',
    privacyNote: '要件の把握のみを行います。ゲストデータへのアクセスや保存は行いません。',
    bookingTitle: '今すぐ予約',
    fallbackEmail: '適切な時間帯がない場合は、contact@inviti.vip までメールでご連絡ください'
  },
  banner: {
    message: '🎉 新機能リリース！INVITI のスマートゲスト管理システムを体験',
    cta: '詳細を見る'
  },
  cookieBanner: {
    message: '機能の強化、トラフィックの分析、コンテンツのパーソナライズのために Cookie を使用しています。詳細については、',
    cookiePolicy: 'Cookie ポリシー',
    acceptAll: 'すべて承認',
    managePreferences: '設定を管理',
    rejectNonEssential: '必須以外を拒否'
  },
  payment: {
    title: '選択したプランにアップグレード',
    subtitle: 'お支払いを完了してプラン機能を有効化',
    close: '閉じる',
    planSummaryTitle: 'プラン概要',
    monthly: '月払い',
    yearly: '年払い',
    seats: '座席数（ユーザー数）',
    contactSalesForSeats: '営業担当にお問い合わせ',
    accountBillingTitle: 'アカウント・請求情報',
    email: 'メールアドレス',
    emailPlaceholder: 'your@email.com',
    companyName: '会社名（任意）',
    companyNamePlaceholder: '会社名を入力',
    taxId: '税番号 / VAT（任意）',
    taxIdPlaceholder: '税番号を入力',
    billingAddress: '請求先住所',
    street: '番地',
    streetPlaceholder: '番地を入力',
    city: '市区町村',
    cityPlaceholder: '市区町村を入力',
    postalCode: '郵便番号',
    postalCodePlaceholder: '郵便番号を入力',
    country: '国',
    countryPlaceholder: '国を選択',
    paymentMethodTitle: 'お支払い方法',
    creditCard: 'クレジットカード',
    bankTransfer: '銀行振込',
    cardNumber: 'カード番号',
    cardNumberPlaceholder: '1234 5678 9012 3456',
    expiration: '有効期限',
    expirationPlaceholder: 'MM/YY',
    cvc: 'CVC',
    cvcPlaceholder: '123',
    nameOnCard: 'カード名義',
    nameOnCardPlaceholder: 'カード名義を入力',
    verificationTitle: '本人確認（任意）',
    sendCode: 'メールに確認コードを送信',
    couponTitle: 'クーポン（任意）',
    couponPlaceholder: 'クーポンコードを入力',
    apply: '適用',
    agreeTerms: '同意します',
    termsLink: '利用規約',
    privacyLink: 'プライバシーポリシー',
    autoRenewNote: '有効期限後に自動更新されます。いつでもキャンセル可能。',
    totalAmount: '合計金額',
    effectiveImmediately: '即時有効、日割り計算。',
    upgradeNow: '今すぐアップグレード',
    contactSales: '営業担当にお問い合わせ',
    backToPricing: 'プランに戻る',
    freePlan: '無料版',
    basicPlan: 'ベーシック',
    proPlan: 'プロ',
    enterprisePlan: 'エンタープライズ'
  },
  about: {
    title: '私たちについて',
    subtitle: '',
    section1Body: '藝氣股份有限公司 ARTSIE INC. は「中国語エンターテインメントの統合者」となることを目標に、次世代の多様で多層的なエンターテインメントシーンを創造しています。',
    section2Body: 'ライブコメディ、バラエティ番組から DJ パーティーまで、藝氣は各分野のリーディングブランドと戦略的パートナーシップを結び、中国語エンターテインメント市場を拡大し、台湾を中国語エンターテインメントの重要な拠点にしています。',
    section3Body: '同時に、経費管理システム、契約管理システム、PR ゲストリスト管理システムなど、エンターテインメント産業専用のバックエンド管理ツールの開発にも注力し、中国語エンターテインメント市場で最も信頼できるバックエンドパートナーとなることを目指しています。'
  },
  terms: {
    title: 'プライバシーポリシー',
    subtitle: ''
  },
  enterpriseInquiry: {
    title: 'エンタープライズプランについてお問い合わせ',
    close: '閉じる',
    // Company & Contact
    companyName: '会社名',
    companyNamePlaceholder: '',
    companyWebsite: '会社のウェブサイト / SNS',
    companyWebsitePlaceholder: '任意：www.example.com または SNS アカウント',
    contactName: '担当者名',
    contactNamePlaceholder: 'お名前を入力してください',
    jobTitle: '役職（必須）',
    jobTitlePlaceholder: '',
    email: 'メールアドレス',
    emailPlaceholder: 'your@email.com',
    phone: '電話番号（必須）',
    phonePlaceholder: '+81 90-1234-5678',
    // Use case & scale
    currentTool: '貴社が現在使用している PR ゲストリスト管理ツール（必須）',
    currentToolPlaceholder: '選択してください',
    currentToolOptions: {
      spreadsheet: 'Google フォーム・スプレッドシート',
      crm: 'CRM システム',
      selfBuilt: '自社開発システム',
      other: 'その他',
      none: 'なし'
    },
    currentToolOther: '「その他」を選択した場合、ツール名または方法を簡単に説明してください',
    currentToolOtherPlaceholder: '説明を入力してください',
    selectOption: 'オプションを選択してください',
    enterDescription: '説明を入力してください',
    eventsPerQuarter: '四半期ごとのイベント数',
    eventsPerQuarterOptions: {
      range1: '0–1 回',
      range2: '2–5 回',
      range3: '6–10 回',
      range4: '10 回以上'
    },
    guestListSize: 'イベントごとのゲストリスト規模',
    guestListSizeOptions: {
      small: '100 人未満',
      medium: '100–500 人',
      large: '500–2,000 人',
      extraLarge: '2,000 人以上'
    },
    integrationNeeds: '既存システムとの連携の必要性',
    integrationOptions: {
      ticketing: 'チケットシステム',
      crm: 'CRM システム',
      email: 'メールプラットフォーム',
      other: 'その他'
    },
    // Consent
    consent: '上記の情報を後続の連絡とプラン評価に使用し、メールでコピーを受け取ることに同意します。',
    consentError: '規約に同意してください',
    // Actions
    submit: 'お問い合わせ送信',
    submitting: '送信中...',
    orEmail: 'または contact@inviti.vip までメールで',
    // Validation
    required: 'この項目は必須です',
    invalidEmail: '有効なメールアドレスを入力してください',
    // Success
    successMessage: '送信されました！すぐにご連絡いたします。',
    viewInbox: '受信トレイを見る'
  }
};

// Simplified Chinese
export const zhHans: Translations = {
  nav: {
    home: '首页',
    features: '功能特色',
    blog: '博客',
    pricing: '方案价格',
    helpCenter: '帮助中心',
    login: '登录',
    tryForFree: '预约展示'
  },
  hero: {
    title: 'INVITI 让您将宝贵的时间花在关系维护，而非重复的复制贴上',
    subtitle: '为活动主办方设计的公关名单管理系统',
    tryForFree: '免费试用',
    bookDemo: '预约展示'
  },
  features: {
    sectionTitle: '产品功能',
    card1Title: '活动管理／场次管理',
    card1Description: '一站整合活动名单与寄信流程。',
    card2Title: '一键邀请与追踪出席状况',
    card2Description: '一键寄信、即时掌握贵宾出席状况。',
    card3Title: '贵宾资料库',
    card3Description: '集中管理贵宾资料，累积关系资产。',
    card4Title: '角色与权限',
    card4Description: '协作、权限控管、稽核轨迹。',
    card5Title: '邮件模板',
    card5Description: '多版本管理，快速套用变量。',
    viewDetails: '查看详情',
    viewAllFeatures: '查看所有功能'
  },
  blog: {
    sectionTitle: '最新文章',
    readMore: '阅读更多',
    viewAll: '查看全部',
    // Blog posts
    post1Meta: '客户故事 • 5 分钟阅读',
    post1Title: 'Agency X 如何优化 50+ 场活动',
    post1Description: '了解一家领先的公关公司如何使用 INVITI 将邀请时间减少 70%。',
    post2Meta: '产品更新 • 3 分钟阅读',
    post2Title: '推出定制品牌功能',
    post2Description: '全新白标功能让您使用品牌识别自定义邀请函。',
    post3Meta: '产业观点 • 7 分钟阅读',
    post3Title: '活动管理的未来',
    post3Description: '2025 年及未来数字活动协调的趋势与预测。'
  },
  blogPage: {
    title: 'Blogs',
    subtitle: '探索产品更新、客户故事与产业观点',
    searchPlaceholder: '搜索文章…',
    allPosts: '最新',
    productUpdates: '产品更新',
    caseStudies: '客户故事',
    industryInsights: '产业观点',
    events: '活动花絮',
    by: '作者',
    readTime: '分钟阅读',
    previousPost: '上一篇',
    nextPost: '下一篇',
    backToBlog: '返回博客'
  },
  pricing: {
    sectionTitle: '方案价格',
    freeTitle: '免费版',
    freePrice: '¥0',
    freeDescription: '开始探索 INVITI 的核心功能',
    basicTitle: '入门版',
    basicPrice: '¥99',
    basicDescription: '适合小型活动与初创团队',
    basicBadge: '适合个人工作者',
    proTitle: '专业版',
    proPrice: '¥499',
    proDescription: '适合成长中的企业与定期活动',
    proBadge: '适合团队',
    enterpriseTitle: '企业版',
    enterprisePrice: 'Custom',
    enterpriseDescription: '为大型组织量身打造的解决方案',
    getStarted: 'Get Started',
    tryBasic: 'Try Basic',
    upgradeToPro: 'Upgrade to Pro',
    contactSales: 'Contact Sales',
    month: 'month',
    monthly: 'Monthly',
    yearly: 'Yearly',
    perYear: ' / 年',
    guestDatabaseLimit: '宾客资料库人数',
    monthlyEmails: '每月发送邮件数量',
    emailTemplates: '邮件模板',
    eventsAndSessions: '活动／场次',
    userLimit: '用户上限'
  },
  helpCenter: {
    sectionTitle: '帮助中心',
    searchPlaceholder: '搜索帮助文章...',
    browseTopics: '浏览主题',
    gettingStarted: '入门指南',
    accountManagement: '账号管理',
    eventCreation: '创建活动',
    guestManagement: '宾客管理',
    technicalSupport: '技术支持',
    billing: '账务问题'
  },
  helpCenterPage: {
    title: '我们能如何帮助您？',
    searchPlaceholder: '搜索任何内容...',
    popularTopics: '热门主题',
    stillNeedHelp: '仍需要协助？',
    emailUs: '发送电子邮件',
    joinCommunity: '加入社群',
    talkToSupport: '联系客服',
    gettingStarted: '开始使用',
    productOverview: '产品概览与角色',
    invitationsRSVP: '邀请与回复确认',
    sessionsEvents: '场次与活动',
    guestDatabase: '宾客资料库',
    pricingBilling: '方案与账务',
    settingsPermissions: '设置与权限',
    troubleshooting: '疑难排解',
    topic1Title: '发送您的第一封邀请',
    topic1Description: '了解如何创建和发送您的第一封活动邀请函',
    topic2Title: '追踪 RSVP 回复',
    topic2Description: '实时监控宾客回复并管理参与人数',
    topic3Title: '管理宾客标签',
    topic3Description: '使用标签分类和整理您的宾客资料',
    topic4Title: '导入 CSV 文件',
    topic4Description: '快速批次导入宾客名单与联系信息',
    topic5Title: '自定义邀请函模板',
    topic5Description: '打造符合品牌形象的精美邀请函',
    topic6Title: '设置活动提醒',
    topic6Description: '自动化提醒确保宾客不会错过您的活动',
    tagBilling: '账务',
    tagDataSources: '数据来源',
    tagRestoring: '还原内容',
    tagMembers: '添加成员'
  },
  footer: {
    company: '公司',
    resources: '资源',
    invitiFor: 'INVITI，适用于',
    aboutUs: '关于我们',
    termsAndPrivacy: '条款和隐私权',
    helpCenter: '帮助中心',
    pricing: '定价',
    blog: '博客',
    enterprise: '企业',
    teams: '团队',
    individuals: '个人',
    copyright: '© {year} 艺气股份有限公司 Inviti All rights reserved.'
  },
  demoBooking: {
    title: '预约展示',
    subtitle: '我们会安排一场约 30 分钟的线上会议，先了解你的公关名单工具、流程与痛点，再示范 INVITI 如何解决。',
    ctaButton: '在 Google 日历预约时间',
    coverTitle: '会议内容',
    card1Title: '了解现况',
    card1Description: '你目前使用的名单工具、协作方式、寄信流程',
    card2Title: '厘清痛点',
    card2Description: '数据重复、回复追踪、跨同事交接等问题',
    card3Title: '产品示范',
    card3Description: '用你的情境展示：邀请、RSVP 追踪、数据库管理',
    agendaTitle: '30 分钟议程',
    agendaTimeline: '0–5′ 需求简述｜5–15′ 现况/痛点｜15–25′ 功能示范｜25–30′ Q&A/下一步',
    getTitle: '会后收获',
    get1: '客制化流程建议',
    get2: '功能对应清单',
    get3: '试用与下一步',
    privacyNote: '只做需求理解，不会存取或保留你的名单数据。',
    bookingTitle: '立即预约',
    fallbackEmail: '若日历没有合适时段，请来信 contact@inviti.vip'
  },
  banner: {
    message: '🎉 新功能上线！立即体验 INVITI 的智能宾客管理系统',
    cta: '了解更多'
  },
  cookieBanner: {
    message: '我们使用 Cookie 来增强功能、分析流量并个性化内容。请参阅我们的',
    cookiePolicy: 'Cookie 政策',
    acceptAll: '接受全部',
    managePreferences: '管理偏好',
    rejectNonEssential: '拒绝非必要'
  },
  payment: {
    title: '升级至所选方案',
    subtitle: '完成付款以启用方案功能',
    close: '关闭',
    planSummaryTitle: '方案摘要',
    monthly: '月付',
    yearly: '年付',
    seats: '座席数（使用者数）',
    contactSalesForSeats: 'Contact sales',
    accountBillingTitle: '账号与账单信息',
    email: 'Email',
    emailPlaceholder: 'your@email.com',
    companyName: '公司名称（选填）',
    companyNamePlaceholder: '输入公司名称',
    taxId: '统编 / VAT（选填）',
    taxIdPlaceholder: '输入统一编号',
    billingAddress: '账单地址',
    street: '街道地址',
    streetPlaceholder: '输入街道地址',
    city: '城市',
    cityPlaceholder: '输入城市',
    postalCode: '邮递区号',
    postalCodePlaceholder: '输入邮递区号',
    country: '国家',
    countryPlaceholder: '选择国家',
    paymentMethodTitle: '付款方式',
    creditCard: '信用卡',
    bankTransfer: 'Bank transfer / 电汇',
    cardNumber: '卡号',
    cardNumberPlaceholder: '1234 5678 9012 3456',
    expiration: '到期日',
    expirationPlaceholder: 'MM/YY',
    cvc: 'CVC',
    cvcPlaceholder: '123',
    nameOnCard: '持卡人姓名',
    nameOnCardPlaceholder: '输入持卡人姓名',
    verificationTitle: '身份验证（选填）',
    sendCode: '传送验证码至 Email',
    couponTitle: '优惠券（选填）',
    couponPlaceholder: '输入优惠券代码',
    apply: 'Apply',
    agreeTerms: '我同意',
    termsLink: '服务条款',
    privacyLink: '隐私权政策',
    autoRenewNote: '到期后将自动续约，可于任何时候取消。',
    totalAmount: '应付金额',
    effectiveImmediately: '立即生效，按比例计算。',
    upgradeNow: '立即升级',
    contactSales: 'Contact sales',
    backToPricing: '返回定价',
    freePlan: '免费版',
    basicPlan: '入门版',
    proPlan: '专业版',
    enterprisePlan: '企业版'
  },
  about: {
    title: '关于我们',
    subtitle: '',
    section1Body: '艺气股份有限公司 ARTSIE INC. 以成为「中文娱乐的整合者」为目标，打造下一个世代多元且有层次的娱乐场景。',
    section2Body: '从现场喜剧、综艺节目到 DJ 派对，艺气与各领域的指标品牌缔结策略合作，一起扩大华语娱乐市场，让台湾成为中文娱乐的重要基地。',
    section3Body: '同时，我们也专注于开发专属娱乐产业的后勤管理工具，例如报帐系统、合约管理系统、公关名单管理系统等，期望成为中文娱乐市场最可靠的后勤伙伴。'
  },
  terms: {
    title: '隐私权政策',
    subtitle: ''
  },
  enterpriseInquiry: {
    title: '联系我们了解企业方案',
    close: '关闭',
    // Company & Contact
    companyName: '公司名称',
    companyNamePlaceholder: '',
    companyWebsite: '公司网站 / 社交媒体',
    companyWebsitePlaceholder: '选填：www.example.com 或社交账号',
    contactName: '联络人姓名',
    contactNamePlaceholder: '请输入您的姓名',
    jobTitle: '职称（必填）',
    jobTitlePlaceholder: '',
    email: 'Email',
    emailPlaceholder: 'your@email.com',
    phone: '联络电话（必填）',
    phonePlaceholder: '+86 138-1234-5678',
    // Use case & scale
    currentTool: '贵单位目前使用的公关名单管理工具（必填）',
    currentToolPlaceholder: '请选择',
    currentToolOptions: {
      spreadsheet: 'Google表单、电子表格',
      crm: 'CRM系统',
      selfBuilt: '自建系统',
      other: '其他',
      none: '无'
    },
    currentToolOther: '若选择"其他"，请简述工具名称或做法',
    currentToolOtherPlaceholder: '请输入说明',
    selectOption: '请选择一个选项',
    enterDescription: '请输入说明',
    eventsPerQuarter: '每季活动数量',
    eventsPerQuarterOptions: {
      range1: '0–1 场',
      range2: '2–5 场',
      range3: '6–10 场',
      range4: '10 场以上'
    },
    guestListSize: '单场宾客名单规模',
    guestListSizeOptions: {
      small: '少于 100 人',
      medium: '100–500 人',
      large: '500–2,000 人',
      extraLarge: '2,000 人以上'
    },
    integrationNeeds: '是否需要与既有系统整合',
    integrationOptions: {
      ticketing: '票务系统',
      crm: 'CRM 系统',
      email: 'Email 平台',
      other: '其他'
    },
    // Consent
    consent: '我同意将以上信息用于后续联系与方案评估，并发送一份副本至我的 Email。',
    consentError: '请同意信息使用条款',
    // Actions
    submit: '提交需求',
    submitting: '提交中...',
    orEmail: '或直接来信 contact@inviti.vip',
    // Validation
    required: '此字段为必填',
    invalidEmail: '请输入有效的 Email 地址',
    // Success
    successMessage: '已提交，我们将尽快与您联系。',
    viewInbox: '查看收件箱'
  }
};

export const translations: Record<Locale, Translations> = {
  tc,
  en,
  ja,
  'zh-hans': zhHans
};

export function getTranslations(locale: Locale): Translations {
  return translations[locale] || tc; // Fallback to TC as source of truth
}