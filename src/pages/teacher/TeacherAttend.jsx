import { useState } from "react";
import { STUDENTS } from "../../data/sampleData.js";

export default function TeacherAttend({ onLogout }) {
  const [students, setStudents] = useState(STUDENTS);

  const setStatus = (i, status) => {
    setStudents(prev => prev.map((s, idx) => idx===i ? {...s, status} : s));
  };

  const counts = {
    present: students.filter(s=>s.status==="present").length,
    absent:  students.filter(s=>s.status==="absent").length,
    late:    students.filter(s=>s.status==="late").length,
  };

  return (
    <div className="scroll-top fi">
      <div className="top-bar">
        <p className="serif" style={{fontSize:20,color:"#26201A"}}>Attendance ✅</p>
        <p style={{fontSize:12,color:"#7A6E66",marginTop:2}}>Kelas Pelangi 🌈 · 17 May 2026</p>
      </div>

      {/* Summary */}
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
        {students.map((s,i)=>(
          <div key={i} className="stu-row">
            <div className="avatar-c" style={{background:s.status==="present"?"#DBF0D0":s.status==="absent"?"#FDE8D8":"#FDF0CC"}}>{s.emoji}</div>
            <div style={{flex:1}}>
              <p style={{fontSize:13,fontWeight:700,color:"#26201A"}}>{s.name}</p>
            </div>
            <div className="att-btns">
              {[
                {id:"present",label:"✓",activeBg:"#7FAF70",activeC:"white",inactiveBg:"#DBF0D0",inactiveC:"#7FAF70"},
                {id:"late",   label:"⏰",activeBg:"#EFC55A",activeC:"white",inactiveBg:"#FDF0CC",inactiveC:"#A07820"},
                {id:"absent", label:"✗",activeBg:"#E8726A",activeC:"white",inactiveBg:"#FDE8D8",inactiveC:"#E8726A"},
              ].map(b=>(
                <button key={b.id} className="att-btn"
                  style={{
                    background:s.status===b.id?b.activeBg:b.inactiveBg,
                    color:s.status===b.id?b.activeC:b.inactiveC,
                    borderColor:s.status===b.id?b.activeBg:"transparent",
                  }}
                  onClick={()=>setStatus(i,b.id)}>
                  {b.label}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      <button className="btn btn-sage btn-full" style={{marginBottom:14}}>Save Attendance</button>
    </div>
  );
}
