import { ANNOUNCEMENTS } from "../../data/sampleData.js";

export default function ParentNotices({ onLogout }) {
  return (
    <div className="scroll-top fi">
      <div className="top-bar row-between">
        <p className="serif" style={{fontSize:20,color:"#26201A"}}>Notices & Reminders 📢</p>
        <span className="badge">2</span>
      </div>

      <div className="card">
        {ANNOUNCEMENTS.map((a,i)=>(
          <div key={i} className="ann-item">
            <div style={{width:44,height:44,borderRadius:14,background:a.urgent?"#FDE8D8":"#F5EDE3",display:"flex",alignItems:"center",justifyContent:"center",fontSize:22,flexShrink:0}}>
              {a.emoji}
            </div>
            <div style={{flex:1}}>
              <div className="row-between" style={{marginBottom:4}}>
                <p style={{fontSize:14,fontWeight:700,color:"#26201A"}}>{a.title}</p>
                {a.urgent && <span className="tag tag-coral">Urgent</span>}
              </div>
              <p style={{fontSize:12,color:"#7A6E66",lineHeight:1.5}}>{a.body}</p>
              <p style={{fontSize:11,color:"#ABA099",marginTop:5,fontWeight:600}}>{a.date}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Empty state example */}
      <div className="card" style={{textAlign:"center",padding:"28px 20px"}}>
        <div style={{fontSize:36,marginBottom:10}}>🌿</div>
        <p className="serif" style={{fontSize:16,color:"#26201A",marginBottom:6}}>All caught up!</p>
        <p style={{fontSize:13,color:"#7A6E66"}}>No special notes today — everything looks good.</p>
      </div>
    </div>
  );
}