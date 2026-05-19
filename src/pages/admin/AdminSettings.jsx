import { Ic } from "../../components/icon.jsx";

export default function AdminSettings({ onLogout }) {
  return (
    <div className="scroll-top fi">
      <div className="top-bar">
        <p className="serif" style={{fontSize:20,color:"#26201A"}}>Settings ⚙️</p>
      </div>

      {[
        {emoji:"🏫",label:"School Profile",sub:"Name, address, contact"},
        {emoji:"📚",label:"Manage Teachers",sub:"6 teachers registered"},
        {emoji:"👨‍👩‍👧",label:"Manage Parents",sub:"94 accounts"},
        {emoji:"🗓️",label:"Academic Calendar",sub:"Set terms and holidays"},
        {emoji:"🔔",label:"Notification Settings",sub:"Push & email preferences"},
      ].map((s,i)=>(
        <div key={i} className="card-sm" style={{marginBottom:10}}>
          <div className="list-item" style={{padding:0,border:"none"}}>
            <div style={{width:44,height:44,borderRadius:14,background:"#F5EDE3",display:"flex",alignItems:"center",justifyContent:"center",fontSize:22,flexShrink:0}}>{s.emoji}</div>
            <div style={{flex:1}}>
              <p style={{fontSize:14,fontWeight:700,color:"#26201A"}}>{s.label}</p>
              <p style={{fontSize:12,color:"#7A6E66"}}>{s.sub}</p>
            </div>
            <Ic.Arr/>
          </div>
        </div>
      ))}

      <div style={{marginTop:20,paddingBottom:8}}>
        <button className="btn btn-full" style={{background:"#FDE8D8",color:"#D06040"}} onClick={onLogout}>
          <Ic.Out/> Sign Out
        </button>
      </div>

      <p style={{fontSize:11,color:"#ABA099",textAlign:"center",marginTop:12}}>
        Nur Iris Parent Portal · v1.0.0
      </p>
    </div>
  );
}