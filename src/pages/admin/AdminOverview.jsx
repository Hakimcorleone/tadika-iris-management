import { ADMIN_CLASSES, ANNOUNCEMENTS } from "../../data/sampleData.js";
import { Ic } from "../../components/icon.jsx";

export default function AdminOverview({ onLogout }) {
  const stats = [
    {label:"Classes",  val:4,  emoji:"🏫", bg:"#FDE8D8"},
    {label:"Students", val:68, emoji:"👦", bg:"#DBF0D0"},
    {label:"Teachers", val:6,  emoji:"📚", bg:"#D4EEFA"},
    {label:"Parents",  val:94, emoji:"👨‍👩‍👧", bg:"#EAE0F8"},
  ];
  return (
    <div className="scroll-top fi">
      <div className="top-bar row-between">
        <div>
          <p style={{fontSize:11,fontWeight:800,color:"#ABA099",letterSpacing:.5,textTransform:"uppercase"}}>Sunday, 17 May 2026</p>
          <p className="serif" style={{fontSize:19,color:"#26201A"}}>Good morning, Pn. Laila 🌸</p>
        </div>
        <button onClick={onLogout} style={{background:"none",border:"none",cursor:"pointer",color:"#ABA099"}}><Ic.Out/></button>
      </div>

      {/* Stats */}
      <div className="stats-grid">
        {stats.map((s,i)=>(
          <div key={i} className="stat-card" style={{background:s.bg}}>
            <div style={{fontSize:24,marginBottom:4}}>{s.emoji}</div>
            <p style={{fontSize:26,fontWeight:800,color:"#26201A"}}>{s.val}</p>
            <p style={{fontSize:12,fontWeight:700,color:"#7A6E66"}}>{s.label}</p>
          </div>
        ))}
      </div>

      {/* Weekly plan status */}
      <div className="card">
        <div className="sec-header">
          <p className="serif" style={{fontSize:16,color:"#26201A"}}>Weekly Plan Status</p>
          <span className="tag tag-coral">2 missing</span>
        </div>
        {ADMIN_CLASSES.map((c,i)=>(
          <div key={i} className="list-item">
            <div style={{width:10,height:10,borderRadius:"50%",background:c.dot,flexShrink:0}}/>
            <div style={{flex:1}}>
              <p style={{fontSize:13,fontWeight:700,color:"#26201A"}}>{c.name}</p>
              <p style={{fontSize:11,color:"#7A6E66"}}>{c.teacher}</p>
            </div>
            {c.plan
              ? <span className="tag tag-sage">Ready</span>
              : <span className="tag tag-coral">Missing</span>
            }
          </div>
        ))}
      </div>

      {/* Announcements */}
      <div className="card">
        <div className="sec-header">
          <p className="serif" style={{fontSize:16,color:"#26201A"}}>Recent Announcements</p>
          <button className="btn btn-ghost btn-sm"><Ic.Plus/> New</button>
        </div>
        {ANNOUNCEMENTS.map((a,i)=>(
          <div key={i} className="list-item">
            <span style={{fontSize:22}}>{a.emoji}</span>
            <div style={{flex:1}}>
              <p style={{fontSize:13,fontWeight:700,color:"#26201A"}}>{a.title}</p>
              <p style={{fontSize:11,color:"#7A6E66"}}>{a.date}</p>
            </div>
            {a.urgent && <span className="tag tag-coral">Urgent</span>}
          </div>
        ))}
      </div>

      {/* Today's updates */}
      <div className="card">
        <p className="serif" style={{fontSize:16,color:"#26201A",marginBottom:12}}>Today's Updates</p>
        {[
          {class:"Kelas Pelangi 🌈",status:"Published",teacher:"Cikgu Nadia",time:"8:42am"},
          {class:"Kelas Bintang ⭐",status:"Published",teacher:"Cikgu Ain",time:"9:10am"},
          {class:"Kelas Bulan 🌙",  status:"Pending",  teacher:"Cikgu Rania",time:"—"},
          {class:"Kelas Matahari ☀️",status:"Pending", teacher:"Cikgu Dina",time:"—"},
        ].map((u,i)=>(
          <div key={i} className="list-item">
            <div style={{width:8,height:8,borderRadius:"50%",background:u.status==="Published"?"#7FAF70":"#EFC55A",flexShrink:0}}/>
            <div style={{flex:1}}>
              <p style={{fontSize:13,fontWeight:700,color:"#26201A"}}>{u.class}</p>
              <p style={{fontSize:11,color:"#7A6E66"}}>{u.teacher}</p>
            </div>
            <div style={{textAlign:"right"}}>
              <span className={`tag ${u.status==="Published"?"tag-sage":"tag-yellow"}`}>{u.status}</span>
              {u.time!=="—" && <p style={{fontSize:10,color:"#ABA099",marginTop:3}}>{u.time}</p>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
