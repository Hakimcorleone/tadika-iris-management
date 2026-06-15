import { useEffect, useMemo, useState } from "react";
import { Ic } from "../../components/icon.jsx";
import { todayLabel } from "../../data/appStore.js";

export default function TeacherToday({ onLogout, data }) {
  const [published, setPublished] = useState(false);
  const [update, setUpdate] = useState("");
  const [reminder, setReminder] = useState("");
  const classOptions = useMemo(() => {
    return Array.from(new Set((data?.students || []).map(student => student.className).filter(Boolean)));
  }, [data?.students]);
  const [selectedClass, setSelectedClass] = useState(classOptions[0] || "");

  useEffect(() => {
    if (!selectedClass && classOptions[0]) setSelectedClass(classOptions[0]);
    if (selectedClass && classOptions.length > 0 && !classOptions.includes(selectedClass)) setSelectedClass(classOptions[0]);
  }, [classOptions, selectedClass]);

  const selectedCount = selectedClass
    ? (data?.students || []).filter(student => student.className === selectedClass).length
    : (data?.students || []).length;

  const actions = [
    {label:"Mark Attendance",sub:`${selectedCount} students`,bg:"#DBF0D0",color:"#5A9048"},
    {label:"Upload Photos",sub:"Tap to add",bg:"#D4EEFA",color:"#4A8AAA"},
    {label:"Add Reminder",sub:"For parents",bg:"#EAE0F8",color:"#7A65A0"},
    {label:"Add Child Note",sub:"Private note",bg:"#FDF0CC",color:"#A07820"},
  ];

  return (
    <div className="scroll-top fi">
      <div className="top-bar row-between">
        <div>
          <p style={{fontSize:11,fontWeight:800,color:"#ABA099",letterSpacing:.5,textTransform:"uppercase"}}>{todayLabel()}</p>
          <p className="serif" style={{fontSize:19,color:"#26201A"}}>Teacher workspace</p>
        </div>
        <button type="button" aria-label="Log out" onClick={onLogout} className="icon-btn"><Ic.Out/></button>
      </div>

      <div className="card" style={{padding:"14px 16px"}}>
        <div className="row-between">
          <div>
            <p style={{fontSize:11,fontWeight:800,color:"#ABA099",letterSpacing:.4,textTransform:"uppercase",marginBottom:2}}>Active Class</p>
            <p style={{fontSize:15,fontWeight:700,color:"#26201A"}}>{selectedClass || "No class yet"}</p>
          </div>
          <select className="sel" aria-label="Active class" value={selectedClass} onChange={e=>setSelectedClass(e.target.value)} disabled={classOptions.length === 0}>
            {classOptions.length === 0 ? <option value="">No classes</option> : classOptions.map(className => <option key={className}>{className}</option>)}
          </select>
        </div>
      </div>

      <div className="pub-bar">
        <div className="pub-dot" style={{background:published?"#7FAF70":"#EFC55A"}}/>
        <div style={{flex:1}}>
          <p style={{fontSize:13,fontWeight:700,color:"#26201A"}}>{published?"Today's update is live":"Update not published yet"}</p>
          <p style={{fontSize:11,color:"#7A6E66"}}>{published?"Parents can now see today's info":"Publish when real content is ready"}</p>
        </div>
        <button type="button" className={`btn btn-sm ${published?"btn-ghost":"btn-sage"}`} onClick={()=>setPublished(!published)}>
          {published?"Unpublish":"Publish"}
        </button>
      </div>

      <div className="action-grid">
        {actions.map((a,i)=>(
          <button key={i} type="button" className="action-card" aria-label={`${a.label}: ${a.sub}`}>
            <div className="action-icon" style={{background:a.bg,color:a.color}} aria-hidden="true">{i + 1}</div>
            <div>
              <p style={{fontSize:13,fontWeight:700,color:"#26201A"}}>{a.label}</p>
              <p style={{fontSize:11,color:"#7A6E66"}}>{a.sub}</p>
            </div>
          </button>
        ))}
      </div>

      <button type="button" className="dropzone">
        <div style={{fontSize:24,marginBottom:8,fontWeight:900,color:"#B06840"}} aria-hidden="true">+</div>
        <p style={{fontSize:14,fontWeight:700,color:"#B06840",marginBottom:4}}>Add classroom photos</p>
        <p style={{fontSize:12,color:"#A07A60"}}>Upload flow can connect to storage later</p>
      </button>

      <div className="card">
        <p className="serif" style={{fontSize:16,color:"#26201A",marginBottom:12}}>Today's class update</p>
        <textarea
          className="textarea"
          aria-label="Today's class update"
          placeholder="Write a short update about today's session..."
          value={update}
          onChange={e=>setUpdate(e.target.value)}
        />
        <p style={{fontSize:11,color:"#ABA099",marginBottom:12}}>This can later publish into the parent's Today view.</p>
        <textarea
          className="textarea"
          aria-label="Reminder for parents"
          placeholder="Reminder for parents..."
          value={reminder}
          onChange={e=>setReminder(e.target.value)}
        />
        <button type="button" className="btn btn-peach btn-full" onClick={()=>setPublished(true)}>
          {published ? "Update Saved" : "Save & Publish"}
        </button>
      </div>
    </div>
  );
}
