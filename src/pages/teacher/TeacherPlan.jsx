import { useState } from "react";
import { Ic } from "../../components/icon.jsx";

export default function TeacherPlan({ data }) {
  const [activeDay, setActiveDay] = useState(0);
  const weeklyPlan = data?.weeklyPlan || { days: [] };
  const days = weeklyPlan.days || [];
  const active = days[activeDay] || null;

  return (
    <div className="scroll-top fi">
      <div className="top-bar row-between">
        <p className="serif" style={{fontSize:20,color:"#26201A"}}>Weekly Plan</p>
        <button className="btn btn-peach btn-sm" type="button"><Ic.Plus/> New</button>
      </div>

      <div className="card" style={{background:"linear-gradient(135deg,#DBF0D0,#D4EEFA)"}}>
        <div className="row-between" style={{marginBottom:4}}>
          <span className="tag tag-sage">{weeklyPlan.week || "No week"}</span>
          <span className="tag" style={{background:"rgba(255,255,255,.5)",color:"#26201A"}}>Teacher plan</span>
        </div>
        <p className="serif" style={{fontSize:19,color:"#26201A",marginTop:8}}>{weeklyPlan.theme || "No weekly plan yet"}</p>
        <p style={{fontSize:12,color:"#26201A",marginTop:4,opacity:.7}}>{weeklyPlan.focus || "Add real plan content when plan editing is connected."}</p>
        <button className="btn btn-ghost btn-sm" type="button" style={{marginTop:14}} disabled={days.length === 0}><Ic.Edit/> Edit Plan</button>
      </div>

      {days.length === 0 ? (
        <div className="card empty-state">
          <p className="serif">No plan days yet</p>
          <span>This tenant starts clean. Add weekly plan records later through a real planner workflow.</span>
        </div>
      ) : (
        <>
          <div className="day-tabs">
            {days.map((d,i)=>(
              <button key={i} type="button" className={`day-tab${activeDay===i?" active":""}`} onClick={()=>setActiveDay(i)}>{d.short || `Day ${i + 1}`}</button>
            ))}
          </div>

          <div className="card fi" key={activeDay}>
            <p className="serif" style={{fontSize:18,color:"#26201A",marginBottom:14}}>{active?.full || "Day plan"}</p>
            <label style={{fontSize:11,fontWeight:800,color:"#ABA099",letterSpacing:.4,textTransform:"uppercase",display:"block",marginBottom:6}}>Activity</label>
            <input className="inp" defaultValue={active?.activity || ""}/>
            <label style={{fontSize:11,fontWeight:800,color:"#ABA099",letterSpacing:.4,textTransform:"uppercase",display:"block",marginBottom:6}}>Meal / Menu</label>
            <input className="inp" defaultValue={active?.meal || ""}/>
            <label style={{fontSize:11,fontWeight:800,color:"#ABA099",letterSpacing:.4,textTransform:"uppercase",display:"block",marginBottom:6}}>Materials Needed</label>
            <input className="inp" defaultValue={active?.materials || ""}/>
            <label style={{fontSize:11,fontWeight:800,color:"#ABA099",letterSpacing:.4,textTransform:"uppercase",display:"block",marginBottom:6}}>Parent Reminder</label>
            <input className="inp" defaultValue={active?.reminder || ""}/>
            <button className="btn btn-sage btn-full" type="button">Save Day</button>
          </div>
        </>
      )}
    </div>
  );
}
