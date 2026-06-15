export const WEEKLY_PLAN = {
  theme: "Animals Around Us 🐾",
  focus: "Recognising animal names, sounds, and simple movement",
  week: "11–15 May 2026",
  days: [
    { short:"Mon", full:"Monday",    activity:"Storytelling + colouring activity",         meal:"Nasi lemak + air suam",    materials:"Colouring book, crayons",       reminder:"Bring your favourite animal toy tomorrow!" },
    { short:"Tue", full:"Tuesday",   activity:"Sensory play – animal textures & sounds",   meal:"Sandwich + milo suam",     materials:"Sensory box provided",           reminder:"Wear comfy clothes for outdoor play." },
    { short:"Wed", full:"Wednesday", activity:"Nature walk – spot birds and insects",       meal:"Fried rice + air suam",    materials:"Wear covered shoes",            reminder:"Early pickup at 12pm today." },
    { short:"Thu", full:"Thursday",  activity:"Music & movement – animal dance party",     meal:"Mihun goreng + buah",      materials:"Nothing extra needed",          reminder:"Photo day tomorrow – dress nicely! 📸" },
    { short:"Fri", full:"Friday",    activity:"Art & craft – make your animal mask",       meal:"Nasi goreng + air suam",   materials:"Bring old newspaper",           reminder:"School closed Monday – Hari Raya Haji 🎉" },
  ],
};

export const CHILDREN = [
  {
    id:"ayra",
    name:"Ayra Sofea",
    shortName:"Ayra",
    avatar:"🌸",
    age:5,
    className:"Kelas Pelangi 🌈",
    teacher:"Cikgu Nadia",
    status:"Present",
    attendance:"Arrived 7:42am",
    pickup:"1:00pm",
    contact:"Ibu Farah · 012-xxx xxxx",
    accent:"#FDE8D8",
    accent2:"#D4EEFA",
    note:"She was very engaged during storytelling today and even made up her own animal sounds. Wonderful imagination!",
    privateNote:"Loves storytelling and responds well to visual prompts.",
  },
  {
    id:"haziq",
    name:"Muhammad Haziq",
    shortName:"Haziq",
    avatar:"🚀",
    age:4,
    className:"Kelas Bintang ⭐",
    teacher:"Cikgu Ain",
    status:"Present",
    attendance:"Arrived 7:55am",
    pickup:"12:45pm",
    contact:"Ibu Farah · 012-xxx xxxx",
    accent:"#DBF0D0",
    accent2:"#FDF0CC",
    note:"He joined the music activity confidently today and helped tidy up after snack time.",
    privateNote:"Enjoys rhythm games and small group activities.",
  },
];

export const STUDENTS = [
  { name:"Ayra Sofea",       emoji:"🌸", status:"present" },
  { name:"Muhammad Haziq",   emoji:"🚀", status:"present" },
  { name:"Natasha Alya",     emoji:"🦋", status:"absent"  },
  { name:"Irfan Hakimi",     emoji:"⚡", status:"present" },
  { name:"Siti Humaira",     emoji:"🌺", status:"late"    },
  { name:"Daniel Haris",     emoji:"🐬", status:"present" },
  { name:"Aqila Raissa",     emoji:"🌟", status:"present" },
  { name:"Rayyan Aiman",     emoji:"🎯", status:"present" },
];

export const ANNOUNCEMENTS = [
  { emoji:"🏖️", title:"School closed – Hari Raya Haji",  body:"No classes on Monday, 18 May 2026. School resumes Tuesday as usual.", date:"Today",    urgent:true  },
  { emoji:"👨‍👩‍👧", title:"Parent-Teacher Day – 25 May",    body:"Schedule your slot via the office. Sessions from 9am to 12pm.",      date:"3 days ago",urgent:false },
  { emoji:"🎉", title:"End-of-Year Concert – Save Date", body:"Annual concert on 15 June at 4pm. More details coming soon.",         date:"5 days ago",urgent:false },
];

export const ADMIN_CLASSES = [
  { name:"Kelas Pelangi 🌈", teacher:"Cikgu Nadia", students:18, plan:true,  dot:"#F2A07B" },
  { name:"Kelas Bintang ⭐",  teacher:"Cikgu Ain",   students:17, plan:true,  dot:"#7FAF70" },
  { name:"Kelas Bulan 🌙",   teacher:"Cikgu Rania", students:16, plan:false, dot:"#6AAECB" },
  { name:"Kelas Matahari ☀️",teacher:"Cikgu Dina",  students:17, plan:false, dot:"#EFC55A" },
];

export const PHOTOS = [
  {e:"🎨",l:"Art session"},{e:"📚",l:"Story time"},{e:"🌿",l:"Garden"},{e:"🎵",l:"Music"},
  {e:"🎭",l:"Drama"},{e:"🧩",l:"Puzzle"},{e:"🏃",l:"Outdoor"},{e:"🍱",l:"Mealtime"},{e:"🖍️",l:"Drawing"},
];

export const TEACHER_NOTES = [
  { student:"Ayra Sofea", note:"She was very engaged during storytelling today and even made up her own animal sounds. Wonderful imagination!", date:"Today" },
  { student:"Muhammad Haziq", note:"He joined the music activity confidently today and helped tidy up after snack time.", date:"Today" },
];

export const PAYMENT_SUMMARY = {
  month:"May 2026",
  collected:48750,
  outstanding:8450,
  payrollDue:16800,
  eventCollected:6250,
};

export const STUDENT_PAYMENTS = [
  {
    id:"inv-ayra-may",
    child:"Ayra Sofea",
    parent:"Ibu Farah",
    phone:"+60 12-345 7788",
    className:"Kelas Pelangi 🌈",
    fee:"Monthly Fee",
    invoiceNo:"INV-2026-0501",
    receiptNo:"RCT-2026-0314",
    amount:850,
    status:"Paid",
    paidOn:"3 May",
    dueDate:"15 May 2026",
    method:"FPX",
    proofStatus:"Verified",
    proofReceivedAt:"3 May, 9:14am",
    lastReminder:"Not needed",
    notes:"Sibling payment received together with Haziq.",
    reminders:[
      { date:"1 May", channel:"Invoice", text:"May fee invoice created" },
      { date:"3 May", channel:"Receipt", text:"Receipt sent through WhatsApp" },
    ],
  },
  {
    id:"inv-haziq-may",
    child:"Muhammad Haziq",
    parent:"Ibu Farah",
    phone:"+60 12-345 7788",
    className:"Kelas Bintang ⭐",
    fee:"Monthly Fee",
    invoiceNo:"INV-2026-0502",
    receiptNo:"RCT-2026-0315",
    amount:780,
    status:"Paid",
    paidOn:"3 May",
    dueDate:"15 May 2026",
    method:"FPX",
    proofStatus:"Verified",
    proofReceivedAt:"3 May, 9:15am",
    lastReminder:"Not needed",
    notes:"Paid together with Ayra. Keep sibling invoice grouping visible in backend later.",
    reminders:[
      { date:"1 May", channel:"Invoice", text:"May fee invoice created" },
      { date:"3 May", channel:"Receipt", text:"Receipt sent through WhatsApp" },
    ],
  },
  {
    id:"inv-natasha-may",
    child:"Natasha Alya",
    parent:"Pn. Mira",
    phone:"+60 13-210 8821",
    className:"Kelas Pelangi 🌈",
    fee:"Monthly Fee",
    invoiceNo:"INV-2026-0503",
    receiptNo:"—",
    amount:850,
    status:"Due",
    paidOn:"Due 15 May",
    dueDate:"15 May 2026",
    method:"WhatsApp reminder",
    proofStatus:"Waiting for payment",
    proofReceivedAt:"—",
    lastReminder:"10 May, 10:22am",
    notes:"Parent usually pays after WhatsApp reminder. Keep tone soft.",
    reminders:[
      { date:"1 May", channel:"Invoice", text:"May fee invoice sent" },
      { date:"10 May", channel:"WhatsApp", text:"Gentle reminder sent to Pn. Mira" },
    ],
  },
  {
    id:"inv-irfan-may",
    child:"Irfan Hakimi",
    parent:"En. Hafiz",
    phone:"+60 17-555 0198",
    className:"Kelas Bulan 🌙",
    fee:"Monthly Fee",
    invoiceNo:"INV-2026-0504",
    receiptNo:"—",
    amount:780,
    status:"Overdue",
    paidOn:"Due 7 May",
    dueDate:"7 May 2026",
    method:"2 reminders",
    proofStatus:"No proof yet",
    proofReceivedAt:"—",
    lastReminder:"12 May, 5:45pm",
    notes:"Second follow-up needed. Suggest direct WhatsApp with payment link and due amount.",
    reminders:[
      { date:"1 May", channel:"Invoice", text:"May fee invoice sent" },
      { date:"8 May", channel:"WhatsApp", text:"First overdue reminder sent" },
      { date:"12 May", channel:"WhatsApp", text:"Second follow-up sent" },
    ],
  },
];

export const TEACHER_PAYROLL = [
  { teacher:"Cikgu Nadia", role:"Lead Teacher", amount:3200, status:"Ready", due:"25 May" },
  { teacher:"Cikgu Ain", role:"Teacher", amount:2800, status:"Ready", due:"25 May" },
  { teacher:"Cikgu Rania", role:"Teacher", amount:2600, status:"Pending attendance", due:"25 May" },
  { teacher:"Cikgu Dina", role:"Assistant Teacher", amount:2200, status:"Pending approval", due:"25 May" },
];

export const EVENT_COLLECTIONS = [
  { title:"Zoo Trip", amountPerChild:65, target:4420, collected:3380, paid:52, total:68, due:"20 May", status:"Open" },
  { title:"Sports Day T-shirt", amountPerChild:28, target:1904, collected:1512, paid:54, total:68, due:"24 May", status:"Open" },
  { title:"Concert Costume Deposit", amountPerChild:50, target:3400, collected:1350, paid:27, total:68, due:"31 May", status:"Draft" },
];

export const WHATSAPP_TEMPLATES = [
  { title:"Monthly fee reminder", audience:"Parents with due fees", message:"Assalamualaikum, gentle reminder for May school fee. You may pay before 15 May. Thank you." },
  { title:"Event collection", audience:"Selected event parents", message:"Assalamualaikum, collection for Zoo Trip is now open. Amount: RM65 per child. Please share payment proof here." },
  { title:"Receipt confirmation", audience:"Single parent", message:"Payment received. Thank you, we have updated your child's payment record." },
];

export const WHATSAPP_QUEUE = [
  { name:"Pn. Mira", reason:"May fee due", child:"Natasha Alya", amount:"RM850", status:"Ready to send" },
  { name:"En. Hafiz", reason:"May fee overdue", child:"Irfan Hakimi", amount:"RM780", status:"Follow-up" },
  { name:"Zoo Trip parents", reason:"Event collection", child:"52/68 paid", amount:"RM65 each", status:"Broadcast draft" },
];
