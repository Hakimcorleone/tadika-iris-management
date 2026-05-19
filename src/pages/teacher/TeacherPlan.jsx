import { useState } from "react";
import { WEEKLY_PLAN } from "../../data/sampleData.js";
import { Ic } from "../../components/icon.jsx";

export default function TeacherPlan({ onLogout }) {
  const [activeDay, setActiveDay] = useState(0);
  return (
    <div className="scroll-top fi">
      <div className="top-bar row-between">
        <p className="serif" style={{fontSize:20,color:"#26201A"}}>Weekly Plan 📋</p>
        <button className="btn btn-peach btn-sm"><Ic.Plus/> New</button>
      </div>

      <div className="card" style={{background:"linear-gradient(135deg,#DBF0D0,#D4EEFA)"}}>
        <div className="row-between" style={{marginBottom:4}}>
          <span className="tag tag-sage">12–16 May</span>
          <span className="tag" style={{background:"rgba(255,255,255,.5)",color:"#26201A"}}>Pelangi 🌈</span>
        </div>
        <p className="serif" style={{fontSize:19,color:"#26201A",marginTop:8}}>{WEEKLY_PLAN.theme}</p>
        <p style={{fontSize:12,color:"#26201A",marginTop:4,opacity:.7}}>{WEEKLY_PLAN.focus}</p>
        <button className="btn btn-ghost btn-sm" style={{marginTop:14}}><Ic.Edit/> Edit Plan</button>
      </div>

      <div className="day-tabs">
        {WEEKLY_PLAN.days.map((d,i)=>(
          <button key={i} className={`day-tab${activeDay===i?" active":""}`} onClick={()=>setActiveDay(i)}>{d.short}</button>
        ))}
      </div>

      <div className="card fi" key={activeDay}>
        <p className="serif" style={{fontSize:18,color:"#26201A",marginBottom:14}}>{WEEKLY_PLAN.days[activeDay].full}</p>
        <label style={{fontSize:11,fontWeight:800,color:"#ABA099",letterSpacing:.4,textTransform:"uppercase",display:"block",marginBottom:6}}>Activity</label>
        <input className="inp" defaultValue={WEEKLY_PLAN.days[activeDay].activity}/>
        <label style={{fontSize:11,fontWeight:800,color:"#ABA099",letterSpacing:.4,textTransform:"uppercase",display:"block",marginBottom:6}}>Meal / Menu</label>
        <input className="inp" defaultValue={WEEKLY_PLAN.days[activeDay].meal}/>
        <label style={{fontSize:11,fontWeight:800,color:"#ABA099",letterSpacing:.4,textTransform:"uppercase",display:"block",marginBottom:6}}>Materials Needed</label>
        <input className="inp" defaultValue={WEEKLY_PLAN.days[activeDay].materials}/>
        <label style={{fontSize:11,fontWeight:800,color:"#ABA099",letterSpacing:.4,textTransform:"uppercase",display:"block",marginBottom:6}}>Parent Reminder</label>
        <input className="inp" defaultValue={WEEKLY_PLAN.days[activeDay].reminder}/>
        <button className="btn btn-sage btn-full">Save Day</button>
      </div>
    </div>
  );
}
