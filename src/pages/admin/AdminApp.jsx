import { useState } from "react";
import { Ic } from "../../components/icon.jsx";

import AdminOverview from "./AdminOverview.jsx";
import AdminPayments from "./AdminPayments.jsx";
import AdminWhatsApp from "./AdminWhatsApp.jsx";
import AdminStudents from "./AdminStudents.jsx";
import AdminSettings from "./AdminSettings.jsx";
import "./admin.css";

export default function AdminApp({ onLogout, data, actions, tenant, workspace, usage, readiness, plans, saasTables }) {
  const [tab, setTab] = useState("overview");
  const sharedProps = { onLogout, data, actions, tenant, workspace, usage, readiness, plans, saasTables };
  const navItems = [
    {id:"overview", Icon:Ic.Home,  label:"Overview"},
    {id:"payments", Icon:Ic.Money, label:"Payments"},
    {id:"whatsapp", Icon:Ic.Chat,  label:"WhatsApp"},
    {id:"students", Icon:Ic.Users, label:"Students"},
    {id:"settings", Icon:Ic.Set,   label:"Settings"},
  ];

  return (
    <div className="app fi admin-app">
      {tab === "overview" && <AdminOverview  {...sharedProps}/>} 
      {tab === "payments" && <AdminPayments  {...sharedProps}/>} 
      {tab === "whatsapp" && <AdminWhatsApp  {...sharedProps}/>} 
      {tab === "students" && <AdminStudents  {...sharedProps}/>} 
      {tab === "settings" && <AdminSettings  {...sharedProps}/>} 

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
