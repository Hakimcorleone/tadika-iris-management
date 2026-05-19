// ─────────────────────────────────────────────
// ADMIN APP
// ─────────────────────────────────────────────
import { useState } from "react";
import { Ic } from "../../components/icon.jsx";

import AdminOverview from "./AdminOverview.jsx";
import AdminClasses from "./AdminClasses.jsx";
import AdminStudents from "./AdminStudents.jsx";
import AdminNotices from "./AdminNotices.jsx";
import AdminSettings from "./AdminSettings.jsx";

export default function AdminApp({ onLogout }) {
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