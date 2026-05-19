import { ADMIN_CLASSES } from "../../data/sampleData.js";
import { Ic } from "../../components/icon.jsx";

export default function AdminClasses({ onLogout }) {
  return (
    <div className="scroll-top fi">
      <div className="top-bar row-between">
        <p className="serif" style={{fontSize:20,color:"#26201A"}}>Classes 🏫</p>
        <button className="btn btn-peach btn-sm"><Ic.Plus/> Add</button>
      </div>

      {ADMIN_CLASSES.map((c,i)=>(
        <div key={i} className="card" style={{marginBottom:12}}>
          <div className="row-between" style={{marginBottom:12}}>
            <div className="row" style={{gap:10}}>
              <div style={{width:44,height:44,borderRadius:14,background:c.bg||"#F5EDE3",display:"flex",alignItems:"center",justifyContent:"center",fontSize:22}}>
                {c.name.split(" ")[1]}
              </div>
              <div>
                <p style={{fontSize:15,fontWeight:700,color:"#26201A"}}>{c.name}</p>
                <p style={{fontSize:12,color:"#7A6E66"}}>{c.teacher}</p>
              </div>
            </div>
            <span className={`tag ${c.plan?"tag-sage":"tag-coral"}`}>{c.plan?"Plan Ready":"No Plan"}</span>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
            <div className="card-flat" style={{marginBottom:0,textAlign:"center"}}>
              <p style={{fontSize:18,fontWeight:800,color:"#26201A"}}>{c.students}</p>
              <p style={{fontSize:11,fontWeight:700,color:"#7A6E66"}}>Students</p>
            </div>
            <div className="card-flat" style={{marginBottom:0,textAlign:"center"}}>
              <p style={{fontSize:18,fontWeight:800,color:"#26201A"}}>2026</p>
              <p style={{fontSize:11,fontWeight:700,color:"#7A6E66"}}>Year</p>
            </div>
          </div>
          <div className="row" style={{gap:8,marginTop:12}}>
            <button className="btn btn-ghost btn-sm" style={{flex:1}}><Ic.Edit/> Edit</button>
            {!c.plan && <button className="btn btn-peach btn-sm" style={{flex:1}}><Ic.Plus/> Add Plan</button>}
          </div>
        </div>
      ))}
    </div>
  );
}
