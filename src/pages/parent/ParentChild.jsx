import { TEACHER_NOTES } from "../../data/sampleData.js";
import { Ic } from "../../components/icon.jsx";

export default function ParentChild({ onLogout }) {
  return (
    <div className="scroll-top fi">
      <div className="top-bar row-between">
        <p className="serif" style={{fontSize:20,color:"#26201A"}}>My Child</p>
        <button onClick={onLogout} style={{background:"none",border:"none",cursor:"pointer",color:"#ABA099"}}><Ic.Out/></button>
      </div>

      {/* Profile */}
      <div className="card" style={{textAlign:"center",paddingTop:28,paddingBottom:28}}>
        <div style={{width:80,height:80,borderRadius:24,background:"linear-gradient(135deg,#FDE8D8,#D4EEFA)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:40,margin:"0 auto 14px",boxShadow:"0 4px 20px rgba(0,0,0,.1)"}}>🌸</div>
        <p className="serif" style={{fontSize:22,color:"#26201A"}}>Ayra Sofea</p>
        <p style={{fontSize:13,color:"#7A6E66",marginTop:4}}>Age 5 · Kelas Pelangi 🌈</p>
        <div className="row" style={{justifyContent:"center",gap:8,marginTop:12}}>
          <span className="tag tag-sage">Active</span>
          <span className="tag tag-sky">Year 2026</span>
        </div>
      </div>

      {/* Details */}
      <div className="card">
        <p className="serif" style={{fontSize:16,color:"#26201A",marginBottom:12}}>Class information</p>
        {[
          {label:"Class Teacher", value:"Cikgu Nadia"},
          {label:"Class", value:"Kelas Pelangi 🌈"},
          {label:"School Hours", value:"7:30am – 1:00pm"},
          {label:"Parent Contact", value:"Ibu Farah · 012-xxx xxxx"},
        ].map((r,i)=>(
          <div key={i} className="row-between" style={{padding:"10px 0",borderBottom:i<3?"1px solid #F5EDE3":"none"}}>
            <span style={{fontSize:13,color:"#7A6E66",fontWeight:600}}>{r.label}</span>
            <span style={{fontSize:13,fontWeight:700,color:"#26201A"}}>{r.value}</span>
          </div>
        ))}
      </div>

      {/* Teacher Notes */}
      <div className="card">
        <p className="serif" style={{fontSize:16,color:"#26201A",marginBottom:12}}>Notes from teacher</p>
        {TEACHER_NOTES.map((n,i)=>(
          <div key={i} className="note-preview" style={{marginBottom:i<TEACHER_NOTES.length-1?10:0}}>
            <p style={{fontSize:11,fontWeight:800,color:"#C4980A",letterSpacing:.4,textTransform:"uppercase",marginBottom:6}}>✏️ {n.date}</p>
            <p style={{fontSize:13,color:"#26201A",lineHeight:1.6}}>"{n.note}"</p>
            <p style={{fontSize:11,color:"#ABA099",marginTop:6,fontWeight:600}}>— Cikgu Nadia</p>
          </div>
        ))}
      </div>
    </div>
  );
}