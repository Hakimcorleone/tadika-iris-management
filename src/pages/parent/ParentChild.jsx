import { Ic } from "../../components/icon.jsx";
import ChildSwitcher from "../../components/ChildSwitcher.jsx";

function EmptyChildProfile() {
  return (
    <div className="card empty-state parent-empty-card">
      <p className="serif">No child profile yet</p>
      <span>The admin needs to add a child profile before parents can see class details here.</span>
    </div>
  );
}

export default function ParentChild({ onLogout, childrenList, selectedChild, selectedChildId, onSelectChild }) {
  const details = selectedChild ? [
    {label:"Class Teacher", value:selectedChild.teacher || "Not assigned"},
    {label:"Class", value:selectedChild.className || "Not assigned"},
    {label:"School Hours", value:"Not set"},
    {label:"Pickup Time", value:selectedChild.pickup || "Not set"},
    {label:"Parent Contact", value:selectedChild.contact || "Not set"},
  ] : [];

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

      {!selectedChild ? <EmptyChildProfile/> : (
        <>
          <div className="card child-profile-card" style={{background:`linear-gradient(135deg,${selectedChild.accent || "#FDE8D8"},${selectedChild.accent2 || "#D4EEFA"})`}}>
            <div className="profile-orbit" aria-hidden="true">
              <span>{selectedChild.avatar || selectedChild.shortName?.slice(0, 1) || "S"}</span>
            </div>
            <p className="serif" style={{fontSize:24,color:"#26201A"}}>{selectedChild.name}</p>
            <p style={{fontSize:13,color:"#7A6E66",marginTop:4}}>Age {selectedChild.age || "not set"} - {selectedChild.className || "No class"}</p>
            <div className="row" style={{justifyContent:"center",gap:8,marginTop:12,flexWrap:"wrap"}}>
              <span className="tag tag-sage">{selectedChild.status || "Active"}</span>
              <span className="tag tag-sky">Current year</span>
              <span className="tag tag-peach">{selectedChild.attendance || "No attendance yet"}</span>
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
            {selectedChild.note ? (
              <div className="note-preview" style={{marginBottom:10}}>
                <p style={{fontSize:11,fontWeight:800,color:"#C4980A",letterSpacing:.4,textTransform:"uppercase",marginBottom:6}}>Today</p>
                <p style={{fontSize:13,color:"#26201A",lineHeight:1.6}}>"{selectedChild.note}"</p>
                <p style={{fontSize:11,color:"#ABA099",marginTop:6,fontWeight:600}}>- {selectedChild.teacher || "Teacher"}</p>
              </div>
            ) : (
              <div className="empty-state compact align-left">
                <p className="serif">No notes yet</p>
                <span>Teacher notes will show here after real notes are published.</span>
              </div>
            )}
            {selectedChild.privateNote && (
              <div className="note-preview" style={{background:"#F5EDE3",borderLeftColor:"#D4EEFA"}}>
                <p style={{fontSize:11,fontWeight:800,color:"#5E9FBE",letterSpacing:.4,textTransform:"uppercase",marginBottom:6}}>Private profile note</p>
                <p style={{fontSize:13,color:"#26201A",lineHeight:1.6}}>{selectedChild.privateNote}</p>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
