import { useState } from "react";
import { Ic } from "../../components/icon.jsx";

export default function TeacherToday({ onLogout }) {
  const [published, setPublished] = useState(false);
  const [update, setUpdate] = useState("");
  const [reminder, setReminder] = useState("");
  const [selectedClass, setSelectedClass] = useState("Kelas Pelangi 🌈");
  const todayLabel = "Monday, 11 May 2026";

  const actions = [
    {icon:"✅",label:"Mark Attendance",sub:"8/8 today",bg:"#DBF0D0",color:"#5A9048"},
    {icon:"📸",label:"Upload Photos",sub:"Tap to add",bg:"#D4EEFA",color:"#4A8AAA"},
    {icon:"📌",label:"Add Reminder",sub:"For parents",bg:"#EAE0F8",color:"#7A65A0"},
    {icon:"✏️",label:"Add Child Note",sub:"Private note",bg:"#FDF0CC",color:"#A07820"},
  ];

  return (
    <div className="scroll-top fi">
      <div className="top-bar row-between">
        <div>
          <p style={{fontSize:11,fontWeight:800,color:"#ABA099",letterSpacing:.5,textTransform:"uppercase"}}>{todayLabel}</p>
          <p className="serif" style={{fontSize:19,color:"#26201A"}}>Good morning, Cikgu Nadia 🌿</p>
        </div>
        <button type="button" aria-label="Log out" onClick={onLogout} className="icon-btn"><Ic.Out/></button>
      </div>

      <div className="card" style={{padding:"14px 16px"}}>
        <div className="row-between">
          <div>
            <p style={{fontSize:11,fontWeight:800,color:"#ABA099",letterSpacing:.4,textTransform:"uppercase",marginBottom:2}}>Active Class</p>
            <p style={{fontSize:15,fontWeight:700,color:"#26201A"}}>{selectedClass}</p>
          </div>
          <select className="sel" aria-label="Active class" value={selectedClass} onChange={e=>setSelectedClass(e.target.value)}>
            <option>Kelas Pelangi 🌈</option>
            <option>Kelas Bintang ⭐</option>
          </select>
        </div>
      </div>

      <div className="pub-bar">
        <div className="pub-dot" style={{background:published?"#7FAF70":"#EFC55A"}}/>
        <div style={{flex:1}}>
          <p style={{fontSize:13,fontWeight:700,color:"#26201A"}}>{published?"Today's update is live ✓":"Update not published yet"}</p>
          <p style={{fontSize:11,color:"#7A6E66"}}>{published?"Parents can now see today's info":"Publish when you're ready"}</p>
        </div>
        <button type="button" className={`btn btn-sm ${published?"btn-ghost":"btn-sage"}`} onClick={()=>setPublished(!published)}>
          {published?"Unpublish":"Publish"}
        </button>
      </div>

      <div className="action-grid">
        {actions.map((a,i)=>(
          <button key={i} type="button" className="action-card" aria-label={`${a.label}: ${a.sub}`}>
            <div className="action-icon" style={{background:a.bg}} aria-hidden="true">{a.icon}</div>
            <div>
              <p style={{fontSize:13,fontWeight:700,color:"#26201A"}}>{a.label}</p>
              <p style={{fontSize:11,color:"#7A6E66"}}>{a.sub}</p>
            </div>
          </button>
        ))}
      </div>

      <button type="button" className="dropzone">
        <div style={{fontSize:28,marginBottom:8}} aria-hidden="true">📸</div>
        <p style={{fontSize:14,fontWeight:700,color:"#B06840",marginBottom:4}}>Drop photos here</p>
        <p style={{fontSize:12,color:"#A07A60"}}>or tap to select from camera roll</p>
      </button>

      <div className="card">
        <p className="serif" style={{fontSize:16,color:"#26201A",marginBottom:12}}>Today's class update</p>
        <textarea
          className="textarea"
          aria-label="Today's class update"
          placeholder="Write a short update about today's session… (optional)"
          value={update}
          onChange={e=>setUpdate(e.target.value)}
        />
        <p style={{fontSize:11,color:"#ABA099",marginBottom:12}}>This appears alongside the weekly plan on the parent's Today view.</p>
        <textarea
          className="textarea"
          aria-label="Reminder for parents"
          placeholder="Reminder for parents (e.g. bring newspaper tomorrow)…"
          value={reminder}
          onChange={e=>setReminder(e.target.value)}
        />
        <button type="button" className="btn btn-peach btn-full" onClick={()=>setPublished(true)}>
          {published ? "✓ Update Saved" : "Save & Publish"}
        </button>
      </div>

      <p style={{fontSize:12,color:"#ABA099",textAlign:"center",marginBottom:8}}>
        Only fill in what you need — the rest is already covered by the weekly plan.
      </p>
    </div>
  );
}
