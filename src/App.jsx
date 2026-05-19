import { useState } from "react";
import "./styles/global.css";
import { Ic } from "./components/icon";
import LoginScreen from "./components/LoginScreen.jsx";
import ParentApp from "./pages/parent/ParentApp.jsx";
import TeacherApp from "./pages/teacher/TeacherApp.jsx";

import {
  WEEKLY_PLAN,
  STUDENTS,
  ANNOUNCEMENTS,
  ADMIN_CLASSES,
  PHOTOS,
  TEACHER_NOTES,
} from "./data/sampleData";

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