import { useState } from "react";
import "./styles/global.css";

import {
  WEEKLY_PLAN,
  STUDENTS,
  ANNOUNCEMENTS,
  ADMIN_CLASSES,
  PHOTOS,
  TEACHER_NOTES,
} from "./data/sampleData";

import { Ic } from "./components/icon";
import LoginScreen from "./components/LoginScreen.jsx";


// ─────────────────────────────────────────────
// PARENT APP
// ─────────────────────────────────────────────
function ParentApp({ onLogout }) {
  const [tab, setTab] = useState("today");
  return (
    <div className="app fi">
      {tab==="today"    && <ParentToday    onLogout={onLogout}/>}
      {tab==="weekly"   && <ParentWeekly   onLogout={onLogout}/>}
      {tab==="photos"   && <ParentPhotos   onLogout={onLogout}/>}
      {tab==="notices"  && <ParentNotices  onLogout={onLogout}/>}
      {tab==="child"    && <ParentChild    onLogout={onLogout}/>}

      <nav className="bottom-nav">
        {[
          {id:"today",  Icon:Ic.Home,  label:"Today"},
          {id:"weekly", Icon:Ic.Cal,   label:"Weekly"},
          {id:"photos", Icon:Ic.Img,   label:"Photos"},
          {id:"notices",Icon:Ic.Bell,  label:"Notices"},
          {id:"child",  Icon:Ic.User,  label:"My Child"},
        ].map(n=>(
          <button key={n.id} className={`nav-item${tab===n.id?" active":""}`} onClick={()=>setTab(n.id)}>
            <n.Icon/>{n.label}
          </button>
        ))}
      </nav>
    </div>
  );
}

function ParentToday({ onLogout }) {
  const today = WEEKLY_PLAN.days[0];
  return (
    <div className="scroll-top">
      {/* Top bar */}
      <div className="top-bar row-between">
        <div>
          <p style={{fontSize:11,fontWeight:800,color:"#ABA099",letterSpacing:.5,textTransform:"uppercase"}}>Sunday, 17 May 2026</p>
          <p className="serif" style={{fontSize:18,color:"#26201A"}}>Good morning! ☀️</p>
        </div>
        <button onClick={onLogout} style={{background:"none",border:"none",cursor:"pointer",color:"#ABA099"}}><Ic.Out/></button>
      </div>

      {/* Greeting / child band */}
      <div className="child-band">
        <div className="child-avatar-lg">🌸</div>
        <div style={{flex:1}}>
          <p style={{fontSize:11,fontWeight:800,color:"#7A6E66",letterSpacing:.4,textTransform:"uppercase"}}>Your Child</p>
          <p className="serif" style={{fontSize:20,color:"#26201A"}}>Ayra Sofea</p>
          <div className="row" style={{gap:8,marginTop:4}}>
            <span className="tag tag-sky">Kelas Pelangi 🌈</span>
            <span className="tag tag-sage" style={{background:"#D8F5D0",color:"#5A9048"}}>✓ Present</span>
          </div>
        </div>
      </div>

      {/* Today's Activity Card */}
      <div className="card">
        <div className="row-between" style={{marginBottom:12}}>
          <p className="serif" style={{fontSize:17,color:"#26201A"}}>Today at Nur Iris</p>
          <span className="tag tag-peach">Monday</span>
        </div>
        <div className="card-flat" style={{background:"#FDE8D8",marginBottom:10}}>
          <p style={{fontSize:11,fontWeight:800,color:"#F2A07B",letterSpacing:.4,textTransform:"uppercase",marginBottom:6}}>🎯 Today's Activity</p>
          <p style={{fontSize:14,fontWeight:600,color:"#26201A",lineHeight:1.5}}>{today.activity}</p>
        </div>
        <div style={{fontSize:12,color:"#7A6E66",fontWeight:600,lineHeight:1.6,background:"#F5EDE3",borderRadius:10,padding:"10px 12px"}}>
          💬 <em>"Today the children explored animal sounds through storytelling and a colouring session. Everyone was so imaginative!"</em>
        </div>
      </div>

      {/* Weekly Theme */}
      <div className="card" style={{background:"linear-gradient(135deg,#DBF0D0,#D4EEFA)"}}>
        <div className="row" style={{gap:10}}>
          <div style={{fontSize:28}}>🐾</div>
          <div>
            <p style={{fontSize:11,fontWeight:800,color:"#5A9048",letterSpacing:.4,textTransform:"uppercase",marginBottom:2}}>This Week's Theme</p>
            <p className="serif" style={{fontSize:17,color:"#26201A"}}>{WEEKLY_PLAN.theme}</p>
            <p style={{fontSize:12,color:"#7A6E66",marginTop:2}}>{WEEKLY_PLAN.focus}</p>
          </div>
        </div>
      </div>

      {/* Meal of the day */}
      <div className="card">
        <div className="row" style={{gap:10}}>
          <div style={{width:40,height:40,borderRadius:12,background:"#FDF0CC",display:"flex",alignItems:"center",justifyContent:"center",fontSize:22}}>🍱</div>
          <div>
            <p style={{fontSize:11,fontWeight:800,color:"#ABA099",letterSpacing:.4,textTransform:"uppercase",marginBottom:2}}>Today's Meal</p>
            <p style={{fontSize:14,fontWeight:700,color:"#26201A"}}>{today.meal}</p>
          </div>
        </div>
      </div>

      {/* Photo Memories */}
      <div className="card">
        <div className="sec-header">
          <p className="serif" style={{fontSize:17,color:"#26201A"}}>Photos from today</p>
          <span style={{fontSize:12,color:"#F2A07B",fontWeight:700,cursor:"pointer"}}>See all</span>
        </div>
        <div className="photo-strip">
          {PHOTOS.slice(0,5).map((p,i)=>(
            <div key={i} className="photo-strip-item">{p.e}</div>
          ))}
        </div>
      </div>

      {/* Reminder for tomorrow */}
      <div className="card" style={{background:"#EAE0F8",border:"none"}}>
        <div className="row" style={{gap:10}}>
          <div style={{fontSize:24}}>📌</div>
          <div>
            <p style={{fontSize:11,fontWeight:800,color:"#9E85C2",letterSpacing:.4,textTransform:"uppercase",marginBottom:3}}>Reminder for Tomorrow</p>
            <p style={{fontSize:14,fontWeight:600,color:"#26201A"}}>{today.reminder}</p>
          </div>
        </div>
      </div>

      {/* Teacher Note */}
      <div className="note-preview">
        <p style={{fontSize:11,fontWeight:800,color:"#C4980A",letterSpacing:.4,textTransform:"uppercase",marginBottom:6}}>✏️ A little note from teacher</p>
        <p style={{fontSize:14,color:"#26201A",lineHeight:1.6}}>
          "{TEACHER_NOTES[0].note}"
        </p>
        <p style={{fontSize:11,color:"#ABA099",marginTop:8,fontWeight:600}}>— Cikgu Nadia, {TEACHER_NOTES[0].date}</p>
      </div>

      <div style={{height:14}}/>

      {/* Materials needed */}
      <div className="card-sm">
        <p style={{fontSize:11,fontWeight:800,color:"#ABA099",letterSpacing:.4,textTransform:"uppercase",marginBottom:8}}>🎒 What to bring tomorrow</p>
        <p style={{fontSize:14,fontWeight:600,color:"#26201A"}}>{WEEKLY_PLAN.days[1].materials}</p>
      </div>
    </div>
  );
}

function ParentWeekly({ onLogout }) {
  const [activeDay, setActiveDay] = useState(0);
  const day = WEEKLY_PLAN.days[activeDay];

  return (
    <div className="scroll-top fi">
      <div className="top-bar">
        <p style={{fontSize:11,fontWeight:800,color:"#ABA099",letterSpacing:.5,textTransform:"uppercase"}}>{WEEKLY_PLAN.week}</p>
        <p className="serif" style={{fontSize:20,color:"#26201A"}}>What we're learning 📖</p>
      </div>

      {/* Theme banner */}
      <div className="card" style={{background:"linear-gradient(135deg,#FDE8D8,#DBF0D0)"}}>
        <div style={{fontSize:32,marginBottom:8}}>🐾</div>
        <p className="serif" style={{fontSize:18,color:"#26201A",marginBottom:4}}>{WEEKLY_PLAN.theme}</p>
        <p style={{fontSize:13,color:"#7A6E66",lineHeight:1.5}}>{WEEKLY_PLAN.focus}</p>
      </div>

      {/* Day tabs */}
      <div className="day-tabs">
        {WEEKLY_PLAN.days.map((d,i)=>(
          <button key={i} className={`day-tab${activeDay===i?" active":""}`} onClick={()=>setActiveDay(i)}>{d.short}</button>
        ))}
      </div>

      {/* Day detail */}
      <div className="card fi" key={activeDay}>
        <p className="serif" style={{fontSize:19,color:"#26201A",marginBottom:14}}>{day.full}</p>

        {[
          {icon:"🎯",label:"Activity",value:day.activity,bg:"#FDE8D8",c:"#F2A07B"},
          {icon:"🍱",label:"Meal",value:day.meal,bg:"#DBF0D0",c:"#7FAF70"},
          {icon:"🎒",label:"What to Bring",value:day.materials,bg:"#D4EEFA",c:"#6AAECB"},
          {icon:"📌",label:"Reminder",value:day.reminder,bg:"#EAE0F8",c:"#9E85C2"},
        ].map((item,i)=>(
          <div key={i} style={{background:item.bg,borderRadius:12,padding:"12px 14px",marginBottom:10}}>
            <p style={{fontSize:10,fontWeight:800,color:item.c,letterSpacing:.4,textTransform:"uppercase",marginBottom:4}}>{item.icon} {item.label}</p>
            <p style={{fontSize:14,fontWeight:600,color:"#26201A",lineHeight:1.5}}>{item.value}</p>
          </div>
        ))}
      </div>

      {/* Week at a glance */}
      <div className="card">
        <p className="serif" style={{fontSize:16,color:"#26201A",marginBottom:12}}>Week at a glance</p>
        {WEEKLY_PLAN.days.map((d,i)=>(
          <div key={i} className="row" style={{paddingBottom:10,marginBottom:10,borderBottom:i<4?"1px solid #F5EDE3":"none",gap:12}}>
            <div style={{width:38,height:38,borderRadius:10,background:"#F5EDE3",display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,fontWeight:800,color:"#7A6E66",flexShrink:0}}>{d.short}</div>
            <p style={{fontSize:13,color:"#26201A",fontWeight:600,lineHeight:1.4}}>{d.activity}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function ParentPhotos({ onLogout }) {
  const weeks = ["This Week", "Last Week", "3 May week"];
  const [activeWeek, setActiveWeek] = useState(0);
  return (
    <div className="scroll-top fi">
      <div className="top-bar">
        <p className="serif" style={{fontSize:20,color:"#26201A"}}>Photo Memories 📸</p>
      </div>
      <div className="day-tabs">
        {weeks.map((w,i)=>(
          <button key={i} className={`day-tab${activeWeek===i?" active":""}`} onClick={()=>setActiveWeek(i)}>{w}</button>
        ))}
      </div>

      <div className="card" style={{padding:14}}>
        <p style={{fontSize:11,fontWeight:800,color:"#ABA099",letterSpacing:.4,textTransform:"uppercase",marginBottom:12}}>Kelas Pelangi 🌈 · Week of 12 May</p>
        <div className="photo-grid">
          {PHOTOS.map((p,i)=>(
            <div key={i} className="photo-thumb" title={p.l}>
              <span>{p.e}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="card-sm">
        <div className="row" style={{gap:10}}>
          <div style={{fontSize:22}}>💬</div>
          <p style={{fontSize:13,color:"#7A6E66",lineHeight:1.5,fontStyle:"italic"}}>"Such a wonderful week! The children were absolute stars during our animal storytelling session."</p>
        </div>
        <p style={{fontSize:11,color:"#ABA099",marginTop:8,fontWeight:600}}>— Cikgu Nadia</p>
      </div>
    </div>
  );
}

function ParentNotices({ onLogout }) {
  return (
    <div className="scroll-top fi">
      <div className="top-bar row-between">
        <p className="serif" style={{fontSize:20,color:"#26201A"}}>Notices & Reminders 📢</p>
        <span className="badge">2</span>
      </div>

      <div className="card">
        {ANNOUNCEMENTS.map((a,i)=>(
          <div key={i} className="ann-item">
            <div style={{width:44,height:44,borderRadius:14,background:a.urgent?"#FDE8D8":"#F5EDE3",display:"flex",alignItems:"center",justifyContent:"center",fontSize:22,flexShrink:0}}>
              {a.emoji}
            </div>
            <div style={{flex:1}}>
              <div className="row-between" style={{marginBottom:4}}>
                <p style={{fontSize:14,fontWeight:700,color:"#26201A"}}>{a.title}</p>
                {a.urgent && <span className="tag tag-coral">Urgent</span>}
              </div>
              <p style={{fontSize:12,color:"#7A6E66",lineHeight:1.5}}>{a.body}</p>
              <p style={{fontSize:11,color:"#ABA099",marginTop:5,fontWeight:600}}>{a.date}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Empty state example */}
      <div className="card" style={{textAlign:"center",padding:"28px 20px"}}>
        <div style={{fontSize:36,marginBottom:10}}>🌿</div>
        <p className="serif" style={{fontSize:16,color:"#26201A",marginBottom:6}}>All caught up!</p>
        <p style={{fontSize:13,color:"#7A6E66"}}>No special notes today — everything looks good.</p>
      </div>
    </div>
  );
}

function ParentChild({ onLogout }) {
  return (
    <div className="scroll-top fi">
      <div className="top-bar row-between">
        <p className="serif" style={{fontSize:20,color:"#26201A"}}>My Child</p>
        <button onClick={onLogout} style={{background:"none",border:"none",cursor:"pointer",color:"#ABA099"}}><Ic.Out/></button>
      </div>

      {/* Profile */}
      <div className="card" style={{textAlign:"center",paddingTop:28,paddingBottom:28}}>
        <div style={{width:80,height:80,borderRadius:24,background:"linear-gradient(135deg,#FDE8D8,#D4EEFA)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:40,margin:"0 auto 14px",boxShadow:"0 4px 20px rgba(0,0,0,.1)"}}>🌸</div>
        <p className="serif" style={{fontSize:22,color:"#26201A"}}>Ayra Sofea</p>
        <p style={{fontSize:13,color:"#7A6E66",marginTop:4}}>Age 5 · Kelas Pelangi 🌈</p>
        <div className="row" style={{justifyContent:"center",gap:8,marginTop:12}}>
          <span className="tag tag-sage">Active</span>
          <span className="tag tag-sky">Year 2026</span>
        </div>
      </div>

      {/* Details */}
      <div className="card">
        <p className="serif" style={{fontSize:16,color:"#26201A",marginBottom:12}}>Class information</p>
        {[
          {label:"Class Teacher", value:"Cikgu Nadia"},
          {label:"Class", value:"Kelas Pelangi 🌈"},
          {label:"School Hours", value:"7:30am – 1:00pm"},
          {label:"Parent Contact", value:"Ibu Farah · 012-xxx xxxx"},
        ].map((r,i)=>(
          <div key={i} className="row-between" style={{padding:"10px 0",borderBottom:i<3?"1px solid #F5EDE3":"none"}}>
            <span style={{fontSize:13,color:"#7A6E66",fontWeight:600}}>{r.label}</span>
            <span style={{fontSize:13,fontWeight:700,color:"#26201A"}}>{r.value}</span>
          </div>
        ))}
      </div>

      {/* Teacher Notes */}
      <div className="card">
        <p className="serif" style={{fontSize:16,color:"#26201A",marginBottom:12}}>Notes from teacher</p>
        {TEACHER_NOTES.map((n,i)=>(
          <div key={i} className="note-preview" style={{marginBottom:i<TEACHER_NOTES.length-1?10:0}}>
            <p style={{fontSize:11,fontWeight:800,color:"#C4980A",letterSpacing:.4,textTransform:"uppercase",marginBottom:6}}>✏️ {n.date}</p>
            <p style={{fontSize:13,color:"#26201A",lineHeight:1.6}}>"{n.note}"</p>
            <p style={{fontSize:11,color:"#ABA099",marginTop:6,fontWeight:600}}>— Cikgu Nadia</p>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// TEACHER APP
// ─────────────────────────────────────────────
function TeacherApp({ onLogout }) {
  const [tab, setTab] = useState("today");
  return (
    <div className="app fi">
      {tab==="today"   && <TeacherToday    onLogout={onLogout}/>}
      {tab==="attend"  && <TeacherAttend   onLogout={onLogout}/>}
      {tab==="plan"    && <TeacherPlan     onLogout={onLogout}/>}
      {tab==="notes"   && <TeacherNotes    onLogout={onLogout}/>}

      <nav className="bottom-nav">
        {[
          {id:"today",  Icon:Ic.Home, label:"Today"},
          {id:"attend", Icon:Ic.Users,label:"Attend."},
          {id:"plan",   Icon:Ic.Cal,  label:"Plan"},
          {id:"notes",  Icon:Ic.Note, label:"Notes"},
        ].map(n=>(
          <button key={n.id} className={`nav-item${tab===n.id?" active":""}`} onClick={()=>setTab(n.id)}>
            <n.Icon/>{n.label}
          </button>
        ))}
      </nav>
    </div>
  );
}

function TeacherToday({ onLogout }) {
  const [published, setPublished] = useState(false);
  const [update, setUpdate] = useState("");
  const [reminder, setReminder] = useState("");
  const [selectedClass, setSelectedClass] = useState("Kelas Pelangi 🌈");

  const actions = [
    {icon:"✅",label:"Mark Attendance",sub:"8/8 today",bg:"#DBF0D0",color:"#5A9048"},
    {icon:"📸",label:"Upload Photos",sub:"Tap to add",bg:"#D4EEFA",color:"#4A8AAA"},
    {icon:"📌",label:"Add Reminder",sub:"For parents",bg:"#EAE0F8",color:"#7A65A0"},
    {icon:"✏️",label:"Add Child Note",sub:"Private note",bg:"#FDF0CC",color:"#A07820"},
  ];

  return (
    <div className="scroll-top fi">
      <div className="top-bar row-between">
        <div>
          <p style={{fontSize:11,fontWeight:800,color:"#ABA099",letterSpacing:.5,textTransform:"uppercase"}}>Sunday, 17 May 2026</p>
          <p className="serif" style={{fontSize:19,color:"#26201A"}}>Good morning, Cikgu Nadia 🌿</p>
        </div>
        <button onClick={onLogout} style={{background:"none",border:"none",cursor:"pointer",color:"#ABA099"}}><Ic.Out/></button>
      </div>

      {/* Class selector */}
      <div className="card" style={{padding:"14px 16px"}}>
        <div className="row-between">
          <div>
            <p style={{fontSize:11,fontWeight:800,color:"#ABA099",letterSpacing:.4,textTransform:"uppercase",marginBottom:2}}>Active Class</p>
            <p style={{fontSize:15,fontWeight:700,color:"#26201A"}}>{selectedClass}</p>
          </div>
          <select className="sel" value={selectedClass} onChange={e=>setSelectedClass(e.target.value)}>
            <option>Kelas Pelangi 🌈</option>
            <option>Kelas Bintang ⭐</option>
          </select>
        </div>
      </div>

      {/* Publish status bar */}
      <div className="pub-bar">
        <div className="pub-dot" style={{background:published?"#7FAF70":"#EFC55A"}}/>
        <div style={{flex:1}}>
          <p style={{fontSize:13,fontWeight:700,color:"#26201A"}}>{published?"Today's update is live ✓":"Update not published yet"}</p>
          <p style={{fontSize:11,color:"#7A6E66"}}>{published?"Parents can now see today's info":"Publish when you're ready"}</p>
        </div>
        <button className={`btn btn-sm ${published?"btn-ghost":"btn-sage"}`} onClick={()=>setPublished(!published)}>
          {published?"Unpublish":"Publish"}
        </button>
      </div>

      {/* Quick Actions */}
      <div className="action-grid">
        {actions.map((a,i)=>(
          <div key={i} className="action-card">
            <div className="action-icon" style={{background:a.bg}}>{a.icon}</div>
            <div>
              <p style={{fontSize:13,fontWeight:700,color:"#26201A"}}>{a.label}</p>
              <p style={{fontSize:11,color:"#7A6E66"}}>{a.sub}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Photo upload */}
      <div className="dropzone">
        <div style={{fontSize:28,marginBottom:8}}>📸</div>
        <p style={{fontSize:14,fontWeight:700,color:"#B06840",marginBottom:4}}>Drop photos here</p>
        <p style={{fontSize:12,color:"#A07A60"}}>or tap to select from camera roll</p>
      </div>

      {/* Quick update */}
      <div className="card">
        <p className="serif" style={{fontSize:16,color:"#26201A",marginBottom:12}}>Today's class update</p>
        <textarea
          className="textarea"
          placeholder="Write a short update about today's session… (optional)"
          value={update}
          onChange={e=>setUpdate(e.target.value)}
        />
        <p style={{fontSize:11,color:"#ABA099",marginBottom:12}}>This appears alongside the weekly plan on the parent's Today view.</p>
        <textarea
          className="textarea"
          placeholder="Reminder for parents (e.g. bring newspaper tomorrow)…"
          value={reminder}
          onChange={e=>setReminder(e.target.value)}
        />
        <button className="btn btn-peach btn-full" onClick={()=>setPublished(true)}>
          {published ? "✓ Update Saved" : "Save & Publish"}
        </button>
      </div>

      <p style={{fontSize:12,color:"#ABA099",textAlign:"center",marginBottom:8}}>
        Only fill in what you need — the rest is already covered by the weekly plan.
      </p>
    </div>
  );
}

function TeacherAttend({ onLogout }) {
  const [students, setStudents] = useState(STUDENTS);

  const setStatus = (i, status) => {
    setStudents(prev => prev.map((s, idx) => idx===i ? {...s, status} : s));
  };

  const counts = {
    present: students.filter(s=>s.status==="present").length,
    absent:  students.filter(s=>s.status==="absent").length,
    late:    students.filter(s=>s.status==="late").length,
  };

  return (
    <div className="scroll-top fi">
      <div className="top-bar">
        <p className="serif" style={{fontSize:20,color:"#26201A"}}>Attendance ✅</p>
        <p style={{fontSize:12,color:"#7A6E66",marginTop:2}}>Kelas Pelangi 🌈 · 17 May 2026</p>
      </div>

      {/* Summary */}
      <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:10,marginBottom:14}}>
        {[
          {label:"Present",count:counts.present,bg:"#DBF0D0",c:"#5A9048"},
          {label:"Absent", count:counts.absent, bg:"#FDE8D8",c:"#D06040"},
          {label:"Late",   count:counts.late,   bg:"#FDF0CC",c:"#A07820"},
        ].map((s,i)=>(
          <div key={i} className="stat-card" style={{background:s.bg,textAlign:"center"}}>
            <p style={{fontSize:22,fontWeight:800,color:s.c}}>{s.count}</p>
            <p style={{fontSize:11,fontWeight:700,color:s.c,letterSpacing:.3}}>{s.label}</p>
          </div>
        ))}
      </div>

      <div className="card">
        {students.map((s,i)=>(
          <div key={i} className="stu-row">
            <div className="avatar-c" style={{background:s.status==="present"?"#DBF0D0":s.status==="absent"?"#FDE8D8":"#FDF0CC"}}>{s.emoji}</div>
            <div style={{flex:1}}>
              <p style={{fontSize:13,fontWeight:700,color:"#26201A"}}>{s.name}</p>
            </div>
            <div className="att-btns">
              {[
                {id:"present",label:"✓",activeBg:"#7FAF70",activeC:"white",inactiveBg:"#DBF0D0",inactiveC:"#7FAF70"},
                {id:"late",   label:"⏰",activeBg:"#EFC55A",activeC:"white",inactiveBg:"#FDF0CC",inactiveC:"#A07820"},
                {id:"absent", label:"✗",activeBg:"#E8726A",activeC:"white",inactiveBg:"#FDE8D8",inactiveC:"#E8726A"},
              ].map(b=>(
                <button key={b.id} className="att-btn"
                  style={{
                    background:s.status===b.id?b.activeBg:b.inactiveBg,
                    color:s.status===b.id?b.activeC:b.inactiveC,
                    borderColor:s.status===b.id?b.activeBg:"transparent",
                  }}
                  onClick={()=>setStatus(i,b.id)}>
                  {b.label}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      <button className="btn btn-sage btn-full" style={{marginBottom:14}}>Save Attendance</button>
    </div>
  );
}

function TeacherPlan({ onLogout }) {
  const [activeDay, setActiveDay] = useState(0);
  return (
    <div className="scroll-top fi">
      <div className="top-bar row-between">
        <p className="serif" style={{fontSize:20,color:"#26201A"}}>Weekly Plan 📋</p>
        <button className="btn btn-peach btn-sm"><Ic.Plus/> New</button>
      </div>

      <div className="card" style={{background:"linear-gradient(135deg,#DBF0D0,#D4EEFA)"}}>
        <div className="row-between" style={{marginBottom:4}}>
          <span className="tag tag-sage">12–16 May</span>
          <span className="tag" style={{background:"rgba(255,255,255,.5)",color:"#26201A"}}>Pelangi 🌈</span>
        </div>
        <p className="serif" style={{fontSize:19,color:"#26201A",marginTop:8}}>{WEEKLY_PLAN.theme}</p>
        <p style={{fontSize:12,color:"#26201A",marginTop:4,opacity:.7}}>{WEEKLY_PLAN.focus}</p>
        <button className="btn btn-ghost btn-sm" style={{marginTop:14}}><Ic.Edit/> Edit Plan</button>
      </div>

      <div className="day-tabs">
        {WEEKLY_PLAN.days.map((d,i)=>(
          <button key={i} className={`day-tab${activeDay===i?" active":""}`} onClick={()=>setActiveDay(i)}>{d.short}</button>
        ))}
      </div>

      <div className="card fi" key={activeDay}>
        <p className="serif" style={{fontSize:18,color:"#26201A",marginBottom:14}}>{WEEKLY_PLAN.days[activeDay].full}</p>
        <label style={{fontSize:11,fontWeight:800,color:"#ABA099",letterSpacing:.4,textTransform:"uppercase",display:"block",marginBottom:6}}>Activity</label>
        <input className="inp" defaultValue={WEEKLY_PLAN.days[activeDay].activity}/>
        <label style={{fontSize:11,fontWeight:800,color:"#ABA099",letterSpacing:.4,textTransform:"uppercase",display:"block",marginBottom:6}}>Meal / Menu</label>
        <input className="inp" defaultValue={WEEKLY_PLAN.days[activeDay].meal}/>
        <label style={{fontSize:11,fontWeight:800,color:"#ABA099",letterSpacing:.4,textTransform:"uppercase",display:"block",marginBottom:6}}>Materials Needed</label>
        <input className="inp" defaultValue={WEEKLY_PLAN.days[activeDay].materials}/>
        <label style={{fontSize:11,fontWeight:800,color:"#ABA099",letterSpacing:.4,textTransform:"uppercase",display:"block",marginBottom:6}}>Parent Reminder</label>
        <input className="inp" defaultValue={WEEKLY_PLAN.days[activeDay].reminder}/>
        <button className="btn btn-sage btn-full">Save Day</button>
      </div>
    </div>
  );
}

function TeacherNotes({ onLogout }) {
  const [newNote, setNewNote] = useState("");
  const [student, setStudent] = useState("Ayra Sofea");

  return (
    <div className="scroll-top fi">
      <div className="top-bar">
        <p className="serif" style={{fontSize:20,color:"#26201A"}}>Student Notes ✏️</p>
        <p style={{fontSize:12,color:"#7A6E66",marginTop:2}}>Private notes for individual children</p>
      </div>

      {/* Add note */}
      <div className="card">
        <p className="serif" style={{fontSize:16,color:"#26201A",marginBottom:12}}>Add a note</p>
        <label style={{fontSize:11,fontWeight:800,color:"#ABA099",letterSpacing:.4,textTransform:"uppercase",display:"block",marginBottom:6}}>Student</label>
        <select className="sel" style={{width:"100%",marginBottom:12,display:"block"}} value={student} onChange={e=>setStudent(e.target.value)}>
          {STUDENTS.map(s=><option key={s.name}>{s.name}</option>)}
        </select>
        <label style={{fontSize:11,fontWeight:800,color:"#ABA099",letterSpacing:.4,textTransform:"uppercase",display:"block",marginBottom:6}}>Note</label>
        <textarea className="textarea" placeholder="Write a note for this child's parent…" value={newNote} onChange={e=>setNewNote(e.target.value)}/>
        <button className="btn btn-peach btn-full">Send Note to Parent</button>
      </div>

      {/* Existing notes */}
      <div className="card">
        <p className="serif" style={{fontSize:16,color:"#26201A",marginBottom:12}}>Recent notes</p>
        {TEACHER_NOTES.map((n,i)=>(
          <div key={i} className="note-preview" style={{marginBottom:i<TEACHER_NOTES.length-1?12:0}}>
            <div className="row-between" style={{marginBottom:6}}>
              <p style={{fontSize:12,fontWeight:800,color:"#26201A"}}>👧 {n.student}</p>
              <span style={{fontSize:11,color:"#ABA099",fontWeight:600}}>{n.date}</span>
            </div>
            <p style={{fontSize:13,color:"#26201A",lineHeight:1.6}}>"{n.note}"</p>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// ADMIN APP
// ─────────────────────────────────────────────
function AdminApp({ onLogout }) {
  const [tab, setTab] = useState("overview");
  return (
    <div className="app fi">
      {tab==="overview" && <AdminOverview  onLogout={onLogout}/>}
      {tab==="classes"  && <AdminClasses   onLogout={onLogout}/>}
      {tab==="students" && <AdminStudents  onLogout={onLogout}/>}
      {tab==="notices"  && <AdminNotices   onLogout={onLogout}/>}
      {tab==="settings" && <AdminSettings  onLogout={onLogout}/>}

      <nav className="bottom-nav">
        {[
          {id:"overview", Icon:Ic.Home,  label:"Overview"},
          {id:"classes",  Icon:Ic.Book,  label:"Classes"},
          {id:"students", Icon:Ic.Users, label:"Students"},
          {id:"notices",  Icon:Ic.Bell,  label:"Notices"},
          {id:"settings", Icon:Ic.Set,   label:"Settings"},
        ].map(n=>(
          <button key={n.id} className={`nav-item${tab===n.id?" active":""}`} onClick={()=>setTab(n.id)}>
            <n.Icon/>{n.label}
          </button>
        ))}
      </nav>
    </div>
  );
}

function AdminOverview({ onLogout }) {
  const stats = [
    {label:"Classes",  val:4,  emoji:"🏫", bg:"#FDE8D8"},
    {label:"Students", val:68, emoji:"👦", bg:"#DBF0D0"},
    {label:"Teachers", val:6,  emoji:"📚", bg:"#D4EEFA"},
    {label:"Parents",  val:94, emoji:"👨‍👩‍👧", bg:"#EAE0F8"},
  ];
  return (
    <div className="scroll-top fi">
      <div className="top-bar row-between">
        <div>
          <p style={{fontSize:11,fontWeight:800,color:"#ABA099",letterSpacing:.5,textTransform:"uppercase"}}>Sunday, 17 May 2026</p>
          <p className="serif" style={{fontSize:19,color:"#26201A"}}>Good morning, Pn. Laila 🌸</p>
        </div>
        <button onClick={onLogout} style={{background:"none",border:"none",cursor:"pointer",color:"#ABA099"}}><Ic.Out/></button>
      </div>

      {/* Stats */}
      <div className="stats-grid">
        {stats.map((s,i)=>(
          <div key={i} className="stat-card" style={{background:s.bg}}>
            <div style={{fontSize:24,marginBottom:4}}>{s.emoji}</div>
            <p style={{fontSize:26,fontWeight:800,color:"#26201A"}}>{s.val}</p>
            <p style={{fontSize:12,fontWeight:700,color:"#7A6E66"}}>{s.label}</p>
          </div>
        ))}
      </div>

      {/* Weekly plan status */}
      <div className="card">
        <div className="sec-header">
          <p className="serif" style={{fontSize:16,color:"#26201A"}}>Weekly Plan Status</p>
          <span className="tag tag-coral">2 missing</span>
        </div>
        {ADMIN_CLASSES.map((c,i)=>(
          <div key={i} className="list-item">
            <div style={{width:10,height:10,borderRadius:"50%",background:c.dot,flexShrink:0}}/>
            <div style={{flex:1}}>
              <p style={{fontSize:13,fontWeight:700,color:"#26201A"}}>{c.name}</p>
              <p style={{fontSize:11,color:"#7A6E66"}}>{c.teacher}</p>
            </div>
            {c.plan
              ? <span className="tag tag-sage">Ready</span>
              : <span className="tag tag-coral">Missing</span>
            }
          </div>
        ))}
      </div>

      {/* Announcements */}
      <div className="card">
        <div className="sec-header">
          <p className="serif" style={{fontSize:16,color:"#26201A"}}>Recent Announcements</p>
          <button className="btn btn-ghost btn-sm"><Ic.Plus/> New</button>
        </div>
        {ANNOUNCEMENTS.map((a,i)=>(
          <div key={i} className="list-item">
            <span style={{fontSize:22}}>{a.emoji}</span>
            <div style={{flex:1}}>
              <p style={{fontSize:13,fontWeight:700,color:"#26201A"}}>{a.title}</p>
              <p style={{fontSize:11,color:"#7A6E66"}}>{a.date}</p>
            </div>
            {a.urgent && <span className="tag tag-coral">Urgent</span>}
          </div>
        ))}
      </div>

      {/* Today's updates */}
      <div className="card">
        <p className="serif" style={{fontSize:16,color:"#26201A",marginBottom:12}}>Today's Updates</p>
        {[
          {class:"Kelas Pelangi 🌈",status:"Published",teacher:"Cikgu Nadia",time:"8:42am"},
          {class:"Kelas Bintang ⭐",status:"Published",teacher:"Cikgu Ain",time:"9:10am"},
          {class:"Kelas Bulan 🌙",  status:"Pending",  teacher:"Cikgu Rania",time:"—"},
          {class:"Kelas Matahari ☀️",status:"Pending", teacher:"Cikgu Dina",time:"—"},
        ].map((u,i)=>(
          <div key={i} className="list-item">
            <div style={{width:8,height:8,borderRadius:"50%",background:u.status==="Published"?"#7FAF70":"#EFC55A",flexShrink:0}}/>
            <div style={{flex:1}}>
              <p style={{fontSize:13,fontWeight:700,color:"#26201A"}}>{u.class}</p>
              <p style={{fontSize:11,color:"#7A6E66"}}>{u.teacher}</p>
            </div>
            <div style={{textAlign:"right"}}>
              <span className={`tag ${u.status==="Published"?"tag-sage":"tag-yellow"}`}>{u.status}</span>
              {u.time!=="—" && <p style={{fontSize:10,color:"#ABA099",marginTop:3}}>{u.time}</p>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function AdminClasses({ onLogout }) {
  return (
    <div className="scroll-top fi">
      <div className="top-bar row-between">
        <p className="serif" style={{fontSize:20,color:"#26201A"}}>Classes 🏫</p>
        <button className="btn btn-peach btn-sm"><Ic.Plus/> Add</button>
      </div>

      {ADMIN_CLASSES.map((c,i)=>(
        <div key={i} className="card" style={{marginBottom:12}}>
          <div className="row-between" style={{marginBottom:12}}>
            <div className="row" style={{gap:10}}>
              <div style={{width:44,height:44,borderRadius:14,background:c.bg||"#F5EDE3",display:"flex",alignItems:"center",justifyContent:"center",fontSize:22}}>
                {c.name.split(" ")[1]}
              </div>
              <div>
                <p style={{fontSize:15,fontWeight:700,color:"#26201A"}}>{c.name}</p>
                <p style={{fontSize:12,color:"#7A6E66"}}>{c.teacher}</p>
              </div>
            </div>
            <span className={`tag ${c.plan?"tag-sage":"tag-coral"}`}>{c.plan?"Plan Ready":"No Plan"}</span>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
            <div className="card-flat" style={{marginBottom:0,textAlign:"center"}}>
              <p style={{fontSize:18,fontWeight:800,color:"#26201A"}}>{c.students}</p>
              <p style={{fontSize:11,fontWeight:700,color:"#7A6E66"}}>Students</p>
            </div>
            <div className="card-flat" style={{marginBottom:0,textAlign:"center"}}>
              <p style={{fontSize:18,fontWeight:800,color:"#26201A"}}>2026</p>
              <p style={{fontSize:11,fontWeight:700,color:"#7A6E66"}}>Year</p>
            </div>
          </div>
          <div className="row" style={{gap:8,marginTop:12}}>
            <button className="btn btn-ghost btn-sm" style={{flex:1}}><Ic.Edit/> Edit</button>
            {!c.plan && <button className="btn btn-peach btn-sm" style={{flex:1}}><Ic.Plus/> Add Plan</button>}
          </div>
        </div>
      ))}
    </div>
  );
}

function AdminStudents({ onLogout }) {
  return (
    <div className="scroll-top fi">
      <div className="top-bar row-between">
        <p className="serif" style={{fontSize:20,color:"#26201A"}}>Students 👦</p>
        <button className="btn btn-peach btn-sm"><Ic.Plus/> Add</button>
      </div>

      <input className="inp" placeholder="🔍  Search students…"/>

      <div className="row" style={{gap:8,marginBottom:14}}>
        {["All","Pelangi","Bintang","Bulan","Matahari"].map((f,i)=>(
          <button key={i} className={`day-tab${i===0?" active":""}`}>{f}</button>
        ))}
      </div>

      <div className="card">
        {STUDENTS.map((s,i)=>(
          <div key={i} className="list-item">
            <div className="avatar-c" style={{background:"#FDE8D8"}}>{s.emoji}</div>
            <div style={{flex:1}}>
              <p style={{fontSize:13,fontWeight:700,color:"#26201A"}}>{s.name}</p>
              <p style={{fontSize:11,color:"#7A6E66"}}>Kelas Pelangi 🌈 · Age 5</p>
            </div>
            <Ic.Arr/>
          </div>
        ))}
      </div>

      <div className="card" style={{textAlign:"center",padding:"16px"}}>
        <p style={{fontSize:13,color:"#7A6E66",fontWeight:600}}>Showing 8 of 68 students</p>
        <button className="btn btn-ghost btn-sm" style={{marginTop:8}}>Load more</button>
      </div>
    </div>
  );
}

function AdminNotices({ onLogout }) {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  return (
    <div className="scroll-top fi">
      <div className="top-bar">
        <p className="serif" style={{fontSize:20,color:"#26201A"}}>Announcements 📢</p>
      </div>

      {/* Compose */}
      <div className="card">
        <p className="serif" style={{fontSize:16,color:"#26201A",marginBottom:12}}>New announcement</p>
        <label style={{fontSize:11,fontWeight:800,color:"#ABA099",letterSpacing:.4,textTransform:"uppercase",display:"block",marginBottom:6}}>Title</label>
        <input className="inp" placeholder="e.g. School Holiday Notice" value={title} onChange={e=>setTitle(e.target.value)}/>
        <label style={{fontSize:11,fontWeight:800,color:"#ABA099",letterSpacing:.4,textTransform:"uppercase",display:"block",marginBottom:6}}>Message</label>
        <textarea className="textarea" placeholder="Write your message here…" value={body} onChange={e=>setBody(e.target.value)}/>
        <div className="row-between">
          <div>
            <label style={{fontSize:12,fontWeight:700,color:"#7A6E66"}}>
              <input type="checkbox" style={{marginRight:6}}/>
              Mark as urgent
            </label>
          </div>
          <button className="btn btn-peach">Send to All</button>
        </div>
      </div>

      {/* Existing */}
      <div className="card">
        <p className="serif" style={{fontSize:16,color:"#26201A",marginBottom:12}}>Published</p>
        {ANNOUNCEMENTS.map((a,i)=>(
          <div key={i} className="ann-item">
            <span style={{fontSize:22}}>{a.emoji}</span>
            <div style={{flex:1}}>
              <div className="row-between">
                <p style={{fontSize:13,fontWeight:700,color:"#26201A"}}>{a.title}</p>
                {a.urgent && <span className="tag tag-coral">Urgent</span>}
              </div>
              <p style={{fontSize:12,color:"#7A6E66",marginTop:3,lineHeight:1.4}}>{a.body}</p>
              <p style={{fontSize:11,color:"#ABA099",marginTop:5,fontWeight:600}}>{a.date}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function AdminSettings({ onLogout }) {
  return (
    <div className="scroll-top fi">
      <div className="top-bar">
        <p className="serif" style={{fontSize:20,color:"#26201A"}}>Settings ⚙️</p>
      </div>

      {[
        {emoji:"🏫",label:"School Profile",sub:"Name, address, contact"},
        {emoji:"📚",label:"Manage Teachers",sub:"6 teachers registered"},
        {emoji:"👨‍👩‍👧",label:"Manage Parents",sub:"94 accounts"},
        {emoji:"🗓️",label:"Academic Calendar",sub:"Set terms and holidays"},
        {emoji:"🔔",label:"Notification Settings",sub:"Push & email preferences"},
      ].map((s,i)=>(
        <div key={i} className="card-sm" style={{marginBottom:10}}>
          <div className="list-item" style={{padding:0,border:"none"}}>
            <div style={{width:44,height:44,borderRadius:14,background:"#F5EDE3",display:"flex",alignItems:"center",justifyContent:"center",fontSize:22,flexShrink:0}}>{s.emoji}</div>
            <div style={{flex:1}}>
              <p style={{fontSize:14,fontWeight:700,color:"#26201A"}}>{s.label}</p>
              <p style={{fontSize:12,color:"#7A6E66"}}>{s.sub}</p>
            </div>
            <Ic.Arr/>
          </div>
        </div>
      ))}

      <div style={{marginTop:20,paddingBottom:8}}>
        <button className="btn btn-full" style={{background:"#FDE8D8",color:"#D06040"}} onClick={onLogout}>
          <Ic.Out/> Sign Out
        </button>
      </div>

      <p style={{fontSize:11,color:"#ABA099",textAlign:"center",marginTop:12}}>
        Nur Iris Parent Portal · v1.0.0
      </p>
    </div>
  );
}

// ─────────────────────────────────────────────
// ROOT
// ─────────────────────────────────────────────
export default function NurIrisPortal() {
  const [role, setRole] = useState(null);
  return (
    <>
      {!role
        ? <LoginScreen onLogin={setRole}/>
        : role==="parent"  ? <ParentApp  onLogout={()=>setRole(null)}/>
        : role==="teacher" ? <TeacherApp onLogout={()=>setRole(null)}/>
        :                    <AdminApp   onLogout={()=>setRole(null)}/>
      }
    </>
  );
}