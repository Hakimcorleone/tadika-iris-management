import { useState } from "react";
import { Ic } from "../../components/icon.jsx";
import { CHILDREN } from "../../data/sampleData.js";
import ParentToday from "./ParentToday.jsx";
import ParentWeekly from "./ParentWeekly.jsx";
import ParentPhotos from "./ParentPhotos.jsx";
import ParentNotices from "./ParentNotices.jsx";
import ParentChild from "./ParentChild.jsx";
import "./parent.css";

export default function ParentApp({ onLogout }) {
  const [tab, setTab] = useState("today");
  const [selectedChildId, setSelectedChildId] = useState(CHILDREN[0].id);
  const selectedChild = CHILDREN.find(child => child.id === selectedChildId) || CHILDREN[0];
  const childProps = {
    childrenList: CHILDREN,
    selectedChild,
    selectedChildId,
    onSelectChild: setSelectedChildId,
  };

  const navItems = [
    {id:"today",  Icon:Ic.Home,  label:"Today"},
    {id:"weekly", Icon:Ic.Cal,   label:"Weekly"},
    {id:"photos", Icon:Ic.Img,   label:"Photos"},
    {id:"notices",Icon:Ic.Bell,  label:"Notices"},
    {id:"child",  Icon:Ic.User,  label:CHILDREN.length > 1 ? "Children" : "My Child"},
  ];

  return (
    <div className="app fi">
      {tab==="today"    && <ParentToday    onLogout={onLogout} {...childProps}/>} 
      {tab==="weekly"   && <ParentWeekly   onLogout={onLogout} selectedChild={selectedChild}/>} 
      {tab==="photos"   && <ParentPhotos   onLogout={onLogout} selectedChild={selectedChild}/>} 
      {tab==="notices"  && <ParentNotices  onLogout={onLogout} selectedChild={selectedChild}/>} 
      {tab==="child"    && <ParentChild    onLogout={onLogout} {...childProps}/>} 

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
