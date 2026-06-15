import { useState } from "react";
import { Ic } from "../../components/icon.jsx";
import ParentToday from "./ParentToday.jsx";
import ParentWeekly from "./ParentWeekly.jsx";
import ParentPhotos from "./ParentPhotos.jsx";
import ParentNotices from "./ParentNotices.jsx";
import ParentChild from "./ParentChild.jsx";
import "./parent.css";

export default function ParentApp({ onLogout, data }) {
  const childrenList = data?.children || [];
  const [tab, setTab] = useState("today");
  const [selectedChildId, setSelectedChildId] = useState(childrenList[0]?.id || "");
  const selectedChild = childrenList.find(child => child.id === selectedChildId) || childrenList[0] || null;
  const childProps = {
    data,
    childrenList,
    selectedChild,
    selectedChildId: selectedChild?.id || "",
    onSelectChild: setSelectedChildId,
  };

  const navItems = [
    {id:"today",  Icon:Ic.Home,  label:"Today"},
    {id:"weekly", Icon:Ic.Cal,   label:"Weekly"},
    {id:"photos", Icon:Ic.Img,   label:"Photos"},
    {id:"notices",Icon:Ic.Bell,  label:"Notices"},
    {id:"child",  Icon:Ic.User,  label:childrenList.length > 1 ? "Children" : "My Child"},
  ];

  return (
    <div className="app fi">
      {tab === "today"    && <ParentToday    onLogout={onLogout} {...childProps}/>} 
      {tab === "weekly"   && <ParentWeekly   onLogout={onLogout} {...childProps}/>} 
      {tab === "photos"   && <ParentPhotos   onLogout={onLogout} {...childProps}/>} 
      {tab === "notices"  && <ParentNotices  onLogout={onLogout} {...childProps}/>} 
      {tab === "child"    && <ParentChild    onLogout={onLogout} {...childProps}/>} 

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
