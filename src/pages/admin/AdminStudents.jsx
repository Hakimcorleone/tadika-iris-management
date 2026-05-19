import { STUDENTS } from "../../data/sampleData.js";
import { Ic } from "../../components/icon.jsx";

export default function AdminStudents({ onLogout }) {
  return (
    <div className="scroll-top fi">
      <div className="top-bar row-between">
        <p className="serif" style={{fontSize:20,color:"#26201A"}}>Students 👦</p>
        <button className="btn btn-peach btn-sm"><Ic.Plus/> Add</button>
      </div>

      <input className="inp" placeholder="🔍  Search students…"/>

      <div className="row" style={{gap:8,marginBottom:14}}>
        {["All","Pelangi","Bintang","Bulan","Matahari"].map((f,i)=>(
          <button key={i} className={`day-tab${i===0?" active":""}`}>{f}</button>
        ))}
      </div>

      <div className="card">
        {STUDENTS.map((s,i)=>(
          <div key={i} className="list-item">
            <div className="avatar-c" style={{background:"#FDE8D8"}}>{s.emoji}</div>
            <div style={{flex:1}}>
              <p style={{fontSize:13,fontWeight:700,color:"#26201A"}}>{s.name}</p>
              <p style={{fontSize:11,color:"#7A6E66"}}>Kelas Pelangi 🌈 · Age 5</p>
            </div>
            <Ic.Arr/>
          </div>
        ))}
      </div>

      <div className="card" style={{textAlign:"center",padding:"16px"}}>
        <p style={{fontSize:13,color:"#7A6E66",fontWeight:600}}>Showing 8 of 68 students</p>
        <button className="btn btn-ghost btn-sm" style={{marginTop:8}}>Load more</button>
      </div>
    </div>
  );
}
