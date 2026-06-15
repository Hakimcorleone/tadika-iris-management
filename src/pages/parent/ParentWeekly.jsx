import { useState } from "react";
import { WEEKLY_PLAN } from "../../data/sampleData.js";

export default function ParentWeekly({ selectedChild }) {
  const [activeDay, setActiveDay] = useState(0);
  const day = WEEKLY_PLAN.days[activeDay];

  return (
    <div className="scroll-top fi">
      <div className="top-bar">
        <p style={{fontSize:11,fontWeight:800,color:"#ABA099",letterSpacing:.5,textTransform:"uppercase"}}>{WEEKLY_PLAN.week}</p>
        <p className="serif" style={{fontSize:20,color:"#26201A"}}>What we're learning 📖</p>
      </div>

      {selectedChild && (
        <div className="context-pill">
          <span className="context-avatar" style={{background:selectedChild.accent}}>{selectedChild.avatar}</span>
          <span>
            <span className="context-label">Showing plan for</span>
            <span className="context-name">{selectedChild.name} · {selectedChild.className}</span>
          </span>
        </div>
      )}

      <div className="card" style={{background:"linear-gradient(135deg,#FDE8D8,#DBF0D0)"}}>
        <div style={{fontSize:32,marginBottom:8}}>🐾</div>
        <p className="serif" style={{fontSize:18,color:"#26201A",marginBottom:4}}>{WEEKLY_PLAN.theme}</p>
        <p style={{fontSize:13,color:"#7A6E66",lineHeight:1.5}}>{WEEKLY_PLAN.focus}</p>
      </div>

      <div className="day-tabs" role="tablist" aria-label="Week days">
        {WEEKLY_PLAN.days.map((d,i)=>(
          <button
            key={i}
            type="button"
            role="tab"
            aria-selected={activeDay===i}
            className={`day-tab${activeDay===i?" active":""}`}
            onClick={()=>setActiveDay(i)}
          >
            {d.short}
          </button>
        ))}
      </div>

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
