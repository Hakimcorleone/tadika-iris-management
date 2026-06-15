import { useState } from "react";
import { Ic } from "../../components/icon.jsx";
import ParentToday from "./ParentToday.jsx";
import ParentWeekly from "./ParentWeekly.jsx";
import ParentPhotos from "./ParentPhotos.jsx";
import ParentNotices from "./ParentNotices.jsx";
import ParentChild from "./ParentChild.jsx";

export default function ParentApp({ onLogout }) {
  const [tab, setTab] = useState("today");
  const navItems = [
    {id:"today",  Icon:Ic.Home,  label:"Today"},
    {id:"weekly", Icon:Ic.Cal,   label:"Weekly"},
    {id:"photos", Icon:Ic.Img,   label:"Photos"},
    {id:"notices",Icon:Ic.Bell,  label:"Notices"},
    {id:"child",  Icon:Ic.User,  label:"My Child"},
  ];

  return (
    <div className="app fi">
      {tab==="today"    && <ParentToday    onLogout={onLogout}/>}
      {tab==="weekly"   && <ParentWeekly   onLogout={onLogout}/>}
      {tab==="photos"   && <ParentPhotos   onLogout={onLogout}/>}
      {tab==="notices"  && <ParentNotices  onLogout={onLogout}/>}
      {tab==="child"    && <ParentChild    onLogout={onLogout}/>}

      <nav className="bottom-nav" aria-label="Parent sections">
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
