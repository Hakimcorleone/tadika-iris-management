import { Ic } from "../../components/icon.jsx";
import ChildSwitcher from "../../components/ChildSwitcher.jsx";

export default function ParentChild({ onLogout, childrenList, selectedChild, selectedChildId, onSelectChild }) {
  const details = [
    {label:"Class Teacher", value:selectedChild.teacher},
    {label:"Class", value:selectedChild.className},
    {label:"School Hours", value:"7:30am – 1:00pm"},
    {label:"Pickup Time", value:selectedChild.pickup},
    {label:"Parent Contact", value:selectedChild.contact},
  ];

  return (
    <div className="scroll-top fi">
      <div className="top-bar row-between">
        <div>
          <p style={{fontSize:11,fontWeight:800,color:"#ABA099",letterSpacing:.5,textTransform:"uppercase"}}>Parent profiles</p>
          <p className="serif" style={{fontSize:20,color:"#26201A"}}>Children</p>
        </div>
        <button type="button" aria-label="Log out" onClick={onLogout} className="icon-btn"><Ic.Out/></button>
      </div>

      <ChildSwitcher
        compact
        childrenList={childrenList}
        selectedChildId={selectedChildId}
        onSelectChild={onSelectChild}
      />

      <div className="card child-profile-card" style={{background:`linear-gradient(135deg,${selectedChild.accent},${selectedChild.accent2})`}}>
        <div className="profile-orbit" aria-hidden="true">
          <span>{selectedChild.avatar}</span>
        </div>
        <p className="serif" style={{fontSize:24,color:"#26201A"}}>{selectedChild.name}</p>
        <p style={{fontSize:13,color:"#7A6E66",marginTop:4}}>Age {selectedChild.age} · {selectedChild.className}</p>
        <div className="row" style={{justifyContent:"center",gap:8,marginTop:12,flexWrap:"wrap"}}>
          <span className="tag tag-sage">Active</span>
          <span className="tag tag-sky">Year 2026</span>
          <span className="tag tag-peach">{selectedChild.attendance}</span>
        </div>
      </div>

      <div className="card">
        <p className="serif" style={{fontSize:16,color:"#26201A",marginBottom:12}}>Class information</p>
        {details.map((r,i)=>(
          <div key={i} className="row-between info-row">
            <span style={{fontSize:13,color:"#7A6E66",fontWeight:600}}>{r.label}</span>
            <span style={{fontSize:13,fontWeight:700,color:"#26201A",textAlign:"right"}}>{r.value}</span>
          </div>
        ))}
      </div>

      <div className="card">
        <p className="serif" style={{fontSize:16,color:"#26201A",marginBottom:12}}>Notes from teacher</p>
        <div className="note-preview" style={{marginBottom:10}}>
          <p style={{fontSize:11,fontWeight:800,color:"#C4980A",letterSpacing:.4,textTransform:"uppercase",marginBottom:6}}>✏️ Today</p>
          <p style={{fontSize:13,color:"#26201A",lineHeight:1.6}}>"{selectedChild.note}"</p>
          <p style={{fontSize:11,color:"#ABA099",marginTop:6,fontWeight:600}}>— {selectedChild.teacher}</p>
        </div>
        <div className="note-preview" style={{background:"#F5EDE3",borderLeftColor:"#D4EEFA"}}>
          <p style={{fontSize:11,fontWeight:800,color:"#5E9FBE",letterSpacing:.4,textTransform:"uppercase",marginBottom:6}}>Private profile note</p>
          <p style={{fontSize:13,color:"#26201A",lineHeight:1.6}}>{selectedChild.privateNote}</p>
        </div>
      </div>
    </div>
  );
}
