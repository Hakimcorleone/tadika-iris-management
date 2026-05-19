// ─────────────────────────────────────────────
// TEACHER APP
// ─────────────────────────────────────────────
import { useState } from "react";
import { Ic } from "../../components/icon.jsx";

import TeacherToday from "./TeacherToday.jsx";
import TeacherAttend from "./TeacherAttend.jsx";
import TeacherPlan from "./TeacherPlan.jsx";
import TeacherNotes from "./TeacherNotes.jsx";

export default function TeacherApp({ onLogout }) {
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