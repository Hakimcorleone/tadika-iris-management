import { useState } from "react";
import { ANNOUNCEMENTS } from "../../data/sampleData.js";

export default function AdminNotices({ onLogout }) {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  return (
    <div className="scroll-top fi">
      <div className="top-bar">
        <p className="serif" style={{fontSize:20,color:"#26201A"}}>Announcements 📢</p>
      </div>

      {/* Compose */}
      <div className="card">
        <p className="serif" style={{fontSize:16,color:"#26201A",marginBottom:12}}>New announcement</p>
        <label style={{fontSize:11,fontWeight:800,color:"#ABA099",letterSpacing:.4,textTransform:"uppercase",display:"block",marginBottom:6}}>Title</label>
        <input className="inp" placeholder="e.g. School Holiday Notice" value={title} onChange={e=>setTitle(e.target.value)}/>
        <label style={{fontSize:11,fontWeight:800,color:"#ABA099",letterSpacing:.4,textTransform:"uppercase",display:"block",marginBottom:6}}>Message</label>
        <textarea className="textarea" placeholder="Write your message here…" value={body} onChange={e=>setBody(e.target.value)}/>
        <div className="row-between">
          <div>
            <label style={{fontSize:12,fontWeight:700,color:"#7A6E66"}}>
              <input type="checkbox" style={{marginRight:6}}/>
              Mark as urgent
            </label>
          </div>
          <button className="btn btn-peach">Send to All</button>
        </div>
      </div>

      {/* Existing */}
      <div className="card">
        <p className="serif" style={{fontSize:16,color:"#26201A",marginBottom:12}}>Published</p>
        {ANNOUNCEMENTS.map((a,i)=>(
          <div key={i} className="ann-item">
            <span style={{fontSize:22}}>{a.emoji}</span>
            <div style={{flex:1}}>
              <div className="row-between">
                <p style={{fontSize:13,fontWeight:700,color:"#26201A"}}>{a.title}</p>
                {a.urgent && <span className="tag tag-coral">Urgent</span>}
              </div>
              <p style={{fontSize:12,color:"#7A6E66",marginTop:3,lineHeight:1.4}}>{a.body}</p>
              <p style={{fontSize:11,color:"#ABA099",marginTop:5,fontWeight:600}}>{a.date}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
