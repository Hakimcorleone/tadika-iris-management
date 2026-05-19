import {
  WEEKLY_PLAN,
  PHOTOS,
  TEACHER_NOTES,
} from "../../data/sampleData.js";
import { Ic } from "../../components/icons.jsx";

export default function ParentToday({ onLogout }) {
  const today = WEEKLY_PLAN.days[0];
  return (
    <div className="scroll-top">
      {/* Top bar */}
      <div className="top-bar row-between">
        <div>
          <p style={{fontSize:11,fontWeight:800,color:"#ABA099",letterSpacing:.5,textTransform:"uppercase"}}>Sunday, 17 May 2026</p>
          <p className="serif" style={{fontSize:18,color:"#26201A"}}>Good morning! ☀️</p>
        </div>
        <button onClick={onLogout} style={{background:"none",border:"none",cursor:"pointer",color:"#ABA099"}}><Ic.Out/></button>
      </div>

      {/* Greeting / child band */}
      <div className="child-band">
        <div className="child-avatar-lg">🌸</div>
        <div style={{flex:1}}>
          <p style={{fontSize:11,fontWeight:800,color:"#7A6E66",letterSpacing:.4,textTransform:"uppercase"}}>Your Child</p>
          <p className="serif" style={{fontSize:20,color:"#26201A"}}>Ayra Sofea</p>
          <div className="row" style={{gap:8,marginTop:4}}>
            <span className="tag tag-sky">Kelas Pelangi 🌈</span>
            <span className="tag tag-sage" style={{background:"#D8F5D0",color:"#5A9048"}}>✓ Present</span>
          </div>
        </div>
      </div>

      {/* Today's Activity Card */}
      <div className="card">
        <div className="row-between" style={{marginBottom:12}}>
          <p className="serif" style={{fontSize:17,color:"#26201A"}}>Today at Nur Iris</p>
          <span className="tag tag-peach">Monday</span>
        </div>
        <div className="card-flat" style={{background:"#FDE8D8",marginBottom:10}}>
          <p style={{fontSize:11,fontWeight:800,color:"#F2A07B",letterSpacing:.4,textTransform:"uppercase",marginBottom:6}}>🎯 Today's Activity</p>
          <p style={{fontSize:14,fontWeight:600,color:"#26201A",lineHeight:1.5}}>{today.activity}</p>
        </div>
        <div style={{fontSize:12,color:"#7A6E66",fontWeight:600,lineHeight:1.6,background:"#F5EDE3",borderRadius:10,padding:"10px 12px"}}>
          💬 <em>"Today the children explored animal sounds through storytelling and a colouring session. Everyone was so imaginative!"</em>
        </div>
      </div>

      {/* Weekly Theme */}
      <div className="card" style={{background:"linear-gradient(135deg,#DBF0D0,#D4EEFA)"}}>
        <div className="row" style={{gap:10}}>
          <div style={{fontSize:28}}>🐾</div>
          <div>
            <p style={{fontSize:11,fontWeight:800,color:"#5A9048",letterSpacing:.4,textTransform:"uppercase",marginBottom:2}}>This Week's Theme</p>
            <p className="serif" style={{fontSize:17,color:"#26201A"}}>{WEEKLY_PLAN.theme}</p>
            <p style={{fontSize:12,color:"#7A6E66",marginTop:2}}>{WEEKLY_PLAN.focus}</p>
          </div>
        </div>
      </div>

      {/* Meal of the day */}
      <div className="card">
        <div className="row" style={{gap:10}}>
          <div style={{width:40,height:40,borderRadius:12,background:"#FDF0CC",display:"flex",alignItems:"center",justifyContent:"center",fontSize:22}}>🍱</div>
          <div>
            <p style={{fontSize:11,fontWeight:800,color:"#ABA099",letterSpacing:.4,textTransform:"uppercase",marginBottom:2}}>Today's Meal</p>
            <p style={{fontSize:14,fontWeight:700,color:"#26201A"}}>{today.meal}</p>
          </div>
        </div>
      </div>

      {/* Photo Memories */}
      <div className="card">
        <div className="sec-header">
          <p className="serif" style={{fontSize:17,color:"#26201A"}}>Photos from today</p>
          <span style={{fontSize:12,color:"#F2A07B",fontWeight:700,cursor:"pointer"}}>See all</span>
        </div>
        <div className="photo-strip">
          {PHOTOS.slice(0,5).map((p,i)=>(
            <div key={i} className="photo-strip-item">{p.e}</div>
          ))}
        </div>
      </div>

      {/* Reminder for tomorrow */}
      <div className="card" style={{background:"#EAE0F8",border:"none"}}>
        <div className="row" style={{gap:10}}>
          <div style={{fontSize:24}}>📌</div>
          <div>
            <p style={{fontSize:11,fontWeight:800,color:"#9E85C2",letterSpacing:.4,textTransform:"uppercase",marginBottom:3}}>Reminder for Tomorrow</p>
            <p style={{fontSize:14,fontWeight:600,color:"#26201A"}}>{today.reminder}</p>
          </div>
        </div>
      </div>

      {/* Teacher Note */}
      <div className="note-preview">
        <p style={{fontSize:11,fontWeight:800,color:"#C4980A",letterSpacing:.4,textTransform:"uppercase",marginBottom:6}}>✏️ A little note from teacher</p>
        <p style={{fontSize:14,color:"#26201A",lineHeight:1.6}}>
          "{TEACHER_NOTES[0].note}"
        </p>
        <p style={{fontSize:11,color:"#ABA099",marginTop:8,fontWeight:600}}>— Cikgu Nadia, {TEACHER_NOTES[0].date}</p>
      </div>

      <div style={{height:14}}/>

      {/* Materials needed */}
      <div className="card-sm">
        <p style={{fontSize:11,fontWeight:800,color:"#ABA099",letterSpacing:.4,textTransform:"uppercase",marginBottom:8}}>🎒 What to bring tomorrow</p>
        <p style={{fontSize:14,fontWeight:600,color:"#26201A"}}>{WEEKLY_PLAN.days[1].materials}</p>
      </div>
    </div>
  );
}
