// ─────────────────────────────────────────────
// SAMPLE DATA
// ─────────────────────────────────────────────
export const WEEKLY_PLAN = {
  theme: "Animals Around Us 🐾",
  focus: "Recognising animal names, sounds, and simple movement",
  week: "12–16 May 2026",
  days: [
    { short:"Mon", full:"Monday",    activity:"Storytelling + colouring activity",         meal:"Nasi lemak + air suam",    materials:"Colouring book, crayons",       reminder:"Bring your favourite animal toy tomorrow!" },
    { short:"Tue", full:"Tuesday",   activity:"Sensory play – animal textures & sounds",   meal:"Sandwich + milo suam",     materials:"Sensory box provided",           reminder:"Wear comfy clothes for outdoor play." },
    { short:"Wed", full:"Wednesday", activity:"Nature walk – spot birds and insects",       meal:"Fried rice + air suam",    materials:"Wear covered shoes",            reminder:"Early pickup at 12pm today." },
    { short:"Thu", full:"Thursday",  activity:"Music & movement – animal dance party",     meal:"Mihun goreng + buah",      materials:"Nothing extra needed",          reminder:"Photo day tomorrow – dress nicely! 📸" },
    { short:"Fri", full:"Friday",    activity:"Art & craft – make your animal mask",       meal:"Nasi goreng + air suam",   materials:"Bring old newspaper",           reminder:"School closed Monday – Hari Raya Haji 🎉" },
  ],
};

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
  { student:"Muhammad Haziq", note:"Needed a bit of encouragement during craft, but finished with a big smile. Great effort!", date:"Yesterday" },
];
