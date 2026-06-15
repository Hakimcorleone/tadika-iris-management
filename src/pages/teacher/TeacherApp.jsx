import { useState } from "react";
import { Ic } from "../../components/icon.jsx";

import TeacherToday from "./TeacherToday.jsx";
import TeacherAttend from "./TeacherAttend.jsx";
import TeacherPlan from "./TeacherPlan.jsx";
import TeacherNotes from "./TeacherNotes.jsx";

export default function TeacherApp({ onLogout }) {
  const [tab, setTab] = useState("today");
  const navItems = [
    {id:"today",  Icon:Ic.Home, label:"Today"},
    {id:"attend", Icon:Ic.Users,label:"Attend", ariaLabel:"Attendance"},
    {id:"plan",   Icon:Ic.Cal,  label:"Plan"},
    {id:"notes",  Icon:Ic.Note, label:"Notes"},
  ];

  return (
    <div className="app fi">
      {tab==="today"   && <TeacherToday    onLogout={onLogout}/>}
      {tab==="attend"  && <TeacherAttend   onLogout={onLogout}/>}
      {tab==="plan"    && <TeacherPlan     onLogout={onLogout}/>}
      {tab==="notes"   && <TeacherNotes    onLogout={onLogout}/>}

      <nav className="bottom-nav" aria-label="Teacher sections">
        {navItems.map(n=>(
          <button
            key={n.id}
            type="button"
            className={`nav-item${tab===n.id?" active":""}`}
            onClick={()=>setTab(n.id)}
            aria-label={n.ariaLabel || n.label}
            aria-current={tab===n.id ? "page" : undefined}
          >
            <n.Icon/>{n.label}
          </button>
        ))}
      </nav>
    </div>
  );
}
