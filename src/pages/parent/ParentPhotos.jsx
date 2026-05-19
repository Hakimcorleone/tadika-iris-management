import { useState } from "react";
import { PHOTOS } from "../../data/sampleData.js";

export default function ParentPhotos({ onLogout }) {
  const weeks = ["This Week", "Last Week", "3 May week"];
  const [activeWeek, setActiveWeek] = useState(0);
  return (
    <div className="scroll-top fi">
      <div className="top-bar">
        <p className="serif" style={{fontSize:20,color:"#26201A"}}>Photo Memories 📸</p>
      </div>
      <div className="day-tabs">
        {weeks.map((w,i)=>(
          <button key={i} className={`day-tab${activeWeek===i?" active":""}`} onClick={()=>setActiveWeek(i)}>{w}</button>
        ))}
      </div>

      <div className="card" style={{padding:14}}>
        <p style={{fontSize:11,fontWeight:800,color:"#ABA099",letterSpacing:.4,textTransform:"uppercase",marginBottom:12}}>Kelas Pelangi 🌈 · Week of 12 May</p>
        <div className="photo-grid">
          {PHOTOS.map((p,i)=>(
            <div key={i} className="photo-thumb" title={p.l}>
              <span>{p.e}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="card-sm">
        <div className="row" style={{gap:10}}>
          <div style={{fontSize:22}}>💬</div>
          <p style={{fontSize:13,color:"#7A6E66",lineHeight:1.5,fontStyle:"italic"}}>"Such a wonderful week! The children were absolute stars during our animal storytelling session."</p>
        </div>
        <p style={{fontSize:11,color:"#ABA099",marginTop:8,fontWeight:600}}>— Cikgu Nadia</p>
      </div>
    </div>
  );
}