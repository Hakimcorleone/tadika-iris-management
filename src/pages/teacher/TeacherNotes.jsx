import { useState } from "react";
import { STUDENTS, TEACHER_NOTES } from "../../data/sampleData.js";

export default function TeacherNotes({ onLogout }) {
  const [newNote, setNewNote] = useState("");
  const [student, setStudent] = useState("Ayra Sofea");

  return (
    <div className="scroll-top fi">
      <div className="top-bar">
        <p className="serif" style={{fontSize:20,color:"#26201A"}}>Student Notes ✏️</p>
        <p style={{fontSize:12,color:"#7A6E66",marginTop:2}}>Private notes for individual children</p>
      </div>

      {/* Add note */}
      <div className="card">
        <p className="serif" style={{fontSize:16,color:"#26201A",marginBottom:12}}>Add a note</p>
        <label style={{fontSize:11,fontWeight:800,color:"#ABA099",letterSpacing:.4,textTransform:"uppercase",display:"block",marginBottom:6}}>Student</label>
        <select className="sel" style={{width:"100%",marginBottom:12,display:"block"}} value={student} onChange={e=>setStudent(e.target.value)}>
          {STUDENTS.map(s=><option key={s.name}>{s.name}</option>)}
        </select>
        <label style={{fontSize:11,fontWeight:800,color:"#ABA099",letterSpacing:.4,textTransform:"uppercase",display:"block",marginBottom:6}}>Note</label>
        <textarea className="textarea" placeholder="Write a note for this child's parent…" value={newNote} onChange={e=>setNewNote(e.target.value)}/>
        <button className="btn btn-peach btn-full">Send Note to Parent</button>
      </div>

      {/* Existing notes */}
      <div className="card">
        <p className="serif" style={{fontSize:16,color:"#26201A",marginBottom:12}}>Recent notes</p>
        {TEACHER_NOTES.map((n,i)=>(
          <div key={i} className="note-preview" style={{marginBottom:i<TEACHER_NOTES.length-1?12:0}}>
            <div className="row-between" style={{marginBottom:6}}>
              <p style={{fontSize:12,fontWeight:800,color:"#26201A"}}>👧 {n.student}</p>
              <span style={{fontSize:11,color:"#ABA099",fontWeight:600}}>{n.date}</span>
            </div>
            <p style={{fontSize:13,color:"#26201A",lineHeight:1.6}}>"{n.note}"</p>
          </div>
        ))}
      </div>
    </div>
  );
}
