import { useEffect, useState } from "react";

export default function TeacherNotes({ data, actions }) {
  const students = data?.students || [];
  const notes = data?.teacherNotes || [];
  const [newNote, setNewNote] = useState("");
  const [student, setStudent] = useState(students[0]?.name || "");

  useEffect(() => {
    if (!student && students[0]?.name) setStudent(students[0].name);
  }, [student, students]);

  function addNote(event) {
    event.preventDefault();
    if (!student || !newNote.trim()) return;
    actions.addTeacherNote({ student, note: newNote });
    setNewNote("");
  }

  return (
    <div className="scroll-top fi">
      <div className="top-bar">
        <p className="serif" style={{fontSize:20,color:"#26201A"}}>Student Notes</p>
        <p style={{fontSize:12,color:"#7A6E66",marginTop:2}}>Private notes for individual children</p>
      </div>

      <form className="card" onSubmit={addNote}>
        <p className="serif" style={{fontSize:16,color:"#26201A",marginBottom:12}}>Add a note</p>
        <label style={{fontSize:11,fontWeight:800,color:"#ABA099",letterSpacing:.4,textTransform:"uppercase",display:"block",marginBottom:6}}>Student</label>
        <select className="sel" style={{width:"100%",marginBottom:12,display:"block"}} value={student} onChange={e=>setStudent(e.target.value)} disabled={students.length === 0}>
          {students.length === 0 ? <option value="">No students yet</option> : students.map(s=><option key={s.id || s.name} value={s.name}>{s.name}</option>)}
        </select>
        <label style={{fontSize:11,fontWeight:800,color:"#ABA099",letterSpacing:.4,textTransform:"uppercase",display:"block",marginBottom:6}}>Note</label>
        <textarea className="textarea" placeholder="Write a note for this child's parent..." value={newNote} onChange={e=>setNewNote(e.target.value)}/>
        <button className="btn btn-peach btn-full" type="submit" disabled={!student || !newNote.trim()}>Save Note</button>
      </form>

      <div className="card">
        <p className="serif" style={{fontSize:16,color:"#26201A",marginBottom:12}}>Recent notes</p>
        {notes.length === 0 ? (
          <div className="empty-state">
            <p className="serif">No notes yet</p>
            <span>Saved notes will appear here.</span>
          </div>
        ) : notes.map((n,i)=>(
          <div key={n.id || i} className="note-preview" style={{marginBottom:i<notes.length-1?12:0}}>
            <div className="row-between" style={{marginBottom:6}}>
              <p style={{fontSize:12,fontWeight:800,color:"#26201A"}}>{n.student}</p>
              <span style={{fontSize:11,color:"#ABA099",fontWeight:600}}>{n.date}</span>
            </div>
            <p style={{fontSize:13,color:"#26201A",lineHeight:1.6}}>"{n.note}"</p>
          </div>
        ))}
      </div>
    </div>
  );
}
