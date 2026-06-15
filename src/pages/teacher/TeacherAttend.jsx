import { useEffect, useState } from "react";
import { todayLabel } from "../../data/appStore.js";

export default function TeacherAttend({ data }) {
  const [students, setStudents] = useState(data?.students || []);

  useEffect(() => {
    setStudents(data?.students || []);
  }, [data?.students]);

  const setStatus = (i, status) => {
    setStudents(prev => prev.map((s, idx) => idx === i ? {...s, status} : s));
  };

  const counts = {
    present: students.filter(s=>s.status === "present" || s.status === "Present").length,
    absent:  students.filter(s=>s.status === "absent" || s.status === "Absent").length,
    late:    students.filter(s=>s.status === "late" || s.status === "Late").length,
  };

  return (
    <div className="scroll-top fi">
      <div className="top-bar">
        <p className="serif" style={{fontSize:20,color:"#26201A"}}>Attendance</p>
        <p style={{fontSize:12,color:"#7A6E66",marginTop:2}}>{todayLabel()}</p>
      </div>

      <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:10,marginBottom:14}}>
        {[
          {label:"Present",count:counts.present,bg:"#DBF0D0",c:"#5A9048"},
          {label:"Absent", count:counts.absent, bg:"#FDE8D8",c:"#D06040"},
          {label:"Late",   count:counts.late,   bg:"#FDF0CC",c:"#A07820"},
        ].map((s,i)=>(
          <div key={i} className="stat-card" style={{background:s.bg,textAlign:"center"}}>
            <p style={{fontSize:22,fontWeight:800,color:s.c}}>{s.count}</p>
            <p style={{fontSize:11,fontWeight:700,color:s.c,letterSpacing:.3}}>{s.label}</p>
          </div>
        ))}
      </div>

      <div className="card">
        {students.length === 0 ? (
          <div className="empty-state">
            <p className="serif">No students yet</p>
            <span>Admin must add student profiles before attendance can be marked.</span>
          </div>
        ) : students.map((s,i)=>(
          <div key={s.id || i} className="stu-row">
            <div className="avatar-c" style={{background:s.status === "present" ? "#DBF0D0" : s.status === "absent" ? "#FDE8D8" : "#FDF0CC"}}>{s.emoji || s.avatar || s.name?.slice(0, 1)}</div>
            <div style={{flex:1}}>
              <p style={{fontSize:13,fontWeight:700,color:"#26201A"}}>{s.name}</p>
              <p style={{fontSize:11,color:"#7A6E66"}}>{s.className || "No class"}</p>
            </div>
            <div className="att-btns">
              {[
                {id:"present",label:"OK",activeBg:"#7FAF70",activeC:"white",inactiveBg:"#DBF0D0",inactiveC:"#7FAF70"},
                {id:"late",   label:"Late",activeBg:"#EFC55A",activeC:"white",inactiveBg:"#FDF0CC",inactiveC:"#A07820"},
                {id:"absent", label:"Out",activeBg:"#E8726A",activeC:"white",inactiveBg:"#FDE8D8",inactiveC:"#E8726A"},
              ].map(b=>(
                <button key={b.id} type="button" className="att-btn"
                  style={{
                    background:s.status === b.id ? b.activeBg : b.inactiveBg,
                    color:s.status === b.id ? b.activeC : b.inactiveC,
                    borderColor:s.status === b.id ? b.activeBg : "transparent",
                  }}
                  onClick={()=>setStatus(i,b.id)}>
                  {b.label}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      <button className="btn btn-sage btn-full" type="button" style={{marginBottom:14}} disabled={students.length === 0}>Save Attendance</button>
    </div>
  );
}
