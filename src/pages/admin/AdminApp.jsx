import { useState } from "react";
import { Ic } from "../../components/icon.jsx";

import AdminOverview from "./AdminOverview.jsx";
import AdminClasses from "./AdminClasses.jsx";
import AdminStudents from "./AdminStudents.jsx";
import AdminNotices from "./AdminNotices.jsx";
import AdminSettings from "./AdminSettings.jsx";

export default function AdminApp({ onLogout }) {
  const [tab, setTab] = useState("overview");
  const navItems = [
    {id:"overview", Icon:Ic.Home,  label:"Overview"},
    {id:"classes",  Icon:Ic.Book,  label:"Classes"},
    {id:"students", Icon:Ic.Users, label:"Students"},
    {id:"notices",  Icon:Ic.Bell,  label:"Notices"},
    {id:"settings", Icon:Ic.Set,   label:"Settings"},
  ];

  return (
    <div className="app fi">
      {tab==="overview" && <AdminOverview  onLogout={onLogout}/>}
      {tab==="classes"  && <AdminClasses   onLogout={onLogout}/>}
      {tab==="students" && <AdminStudents  onLogout={onLogout}/>}
      {tab==="notices"  && <AdminNotices   onLogout={onLogout}/>}
      {tab==="settings" && <AdminSettings  onLogout={onLogout}/>}

      <nav className="bottom-nav" aria-label="Admin sections">
        {navItems.map(n=>(
          <button
            key={n.id}
            type="button"
            className={`nav-item${tab===n.id?" active":""}`}
            onClick={()=>setTab(n.id)}
            aria-current={tab===n.id ? "page" : undefined}
          >
            <n.Icon/>{n.label}
          </button>
        ))}
      </nav>
    </div>
  );
}
