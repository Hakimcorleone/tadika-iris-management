import { Ic } from "../../components/icon.jsx";
import ChildSwitcher from "../../components/ChildSwitcher.jsx";
import { todayLabel } from "../../data/appStore.js";

function EmptyParentState() {
  return (
    <div className="card empty-state parent-empty-card">
      <p className="serif">No child profile yet</p>
      <span>Ask the school admin to add your child profile. Once added, daily updates, plans, photos, and notices will appear here.</span>
    </div>
  );
}

export default function ParentToday({ onLogout, data, childrenList, selectedChild, selectedChildId, onSelectChild }) {
  const weeklyPlan = data?.weeklyPlan || { days: [] };
  const photos = data?.photos || [];
  const today = weeklyPlan.days?.[0] || null;
  const tomorrow = weeklyPlan.days?.[1] || null;

  return (
    <div className="scroll-top">
      <div className="top-bar row-between">
        <div>
          <p style={{fontSize:11,fontWeight:800,color:"#ABA099",letterSpacing:.5,textTransform:"uppercase"}}>{todayLabel()}</p>
          <p className="serif" style={{fontSize:18,color:"#26201A"}}>Parent portal</p>
        </div>
        <button type="button" aria-label="Log out" onClick={onLogout} className="icon-btn"><Ic.Out/></button>
      </div>

      <ChildSwitcher
        childrenList={childrenList}
        selectedChildId={selectedChildId}
        onSelectChild={onSelectChild}
      />

      {!selectedChild ? <EmptyParentState/> : (
        <>
          <div className="child-band" style={{background:`linear-gradient(135deg,${selectedChild.accent || "#FDE8D8"},${selectedChild.accent2 || "#D4EEFA"})`}}>
            <div className="child-avatar-lg" aria-hidden="true">{selectedChild.avatar || selectedChild.shortName?.slice(0, 1) || "S"}</div>
            <div style={{flex:1}}>
              <p style={{fontSize:11,fontWeight:800,color:"#7A6E66",letterSpacing:.4,textTransform:"uppercase"}}>Today for</p>
              <p className="serif" style={{fontSize:20,color:"#26201A"}}>{selectedChild.name}</p>
              <div className="row" style={{gap:8,marginTop:4,flexWrap:"wrap"}}>
                <span className="tag tag-sky">{selectedChild.className || "No class"}</span>
                <span className="tag tag-sage" style={{background:"#D8F5D0",color:"#5A9048"}}>{selectedChild.status || "Active"}</span>
                <span className="tag tag-peach">{selectedChild.attendance || "No attendance yet"}</span>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="row-between" style={{marginBottom:12}}>
              <div>
                <p className="serif" style={{fontSize:17,color:"#26201A"}}>Today at school</p>
                <p style={{fontSize:11,color:"#ABA099",fontWeight:700,marginTop:2}}>{selectedChild.className || "No class"} - {selectedChild.teacher || "No teacher"}</p>
              </div>
              <span className="tag tag-peach">{today?.full || "No plan"}</span>
            </div>
            {today ? (
              <div className="card-flat" style={{background:"#FDE8D8",marginBottom:10}}>
                <p style={{fontSize:11,fontWeight:800,color:"#F2A07B",letterSpacing:.4,textTransform:"uppercase",marginBottom:6}}>Today's Activity</p>
                <p style={{fontSize:14,fontWeight:600,color:"#26201A",lineHeight:1.5}}>{today.activity}</p>
              </div>
            ) : (
              <div className="empty-state compact align-left">
                <p className="serif">No daily plan yet</p>
                <span>The teacher has not published today's plan.</span>
              </div>
            )}
            {selectedChild.note && (
              <div style={{fontSize:12,color:"#7A6E66",fontWeight:600,lineHeight:1.6,background:"#F5EDE3",borderRadius:10,padding:"10px 12px"}}>
                <em>"{selectedChild.note}"</em>
              </div>
            )}
          </div>

          <div className="card" style={{background:"linear-gradient(135deg,#DBF0D0,#D4EEFA)"}}>
            <div className="row" style={{gap:10}}>
              <div>
                <p style={{fontSize:11,fontWeight:800,color:"#5A9048",letterSpacing:.4,textTransform:"uppercase",marginBottom:2}}>This Week's Theme</p>
                <p className="serif" style={{fontSize:17,color:"#26201A"}}>{weeklyPlan.theme || "No weekly theme yet"}</p>
                <p style={{fontSize:12,color:"#7A6E66",marginTop:2}}>{weeklyPlan.focus || "Weekly focus will appear after the teacher adds it."}</p>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="row" style={{gap:10}}>
              <div style={{width:40,height:40,borderRadius:12,background:"#FDF0CC",display:"flex",alignItems:"center",justifyContent:"center",fontWeight:900,color:"#A07820"}} aria-hidden="true">M</div>
              <div>
                <p style={{fontSize:11,fontWeight:800,color:"#ABA099",letterSpacing:.4,textTransform:"uppercase",marginBottom:2}}>Today's Meal</p>
                <p style={{fontSize:14,fontWeight:700,color:"#26201A"}}>{today?.meal || "No meal added yet"}</p>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="sec-header">
              <div>
                <p className="serif" style={{fontSize:17,color:"#26201A"}}>Photos from today</p>
                <p style={{fontSize:11,color:"#ABA099",fontWeight:700,marginTop:2}}>Filtered for {selectedChild.shortName || selectedChild.name}</p>
              </div>
            </div>
            {photos.length === 0 ? (
              <div className="empty-state compact align-left">
                <p className="serif">No photos yet</p>
                <span>Photos will appear after teachers upload real classroom moments.</span>
              </div>
            ) : (
              <div className="photo-strip">
                {photos.slice(0,5).map((p,i)=>(
                  <div key={p.id || i} className="photo-strip-item" aria-label={p.l}>{p.e}</div>
                ))}
              </div>
            )}
          </div>

          <div className="card" style={{background:"#EAE0F8",border:"none"}}>
            <div className="row" style={{gap:10}}>
              <div style={{fontSize:24}} aria-hidden="true">!</div>
              <div>
                <p style={{fontSize:11,fontWeight:800,color:"#9E85C2",letterSpacing:.4,textTransform:"uppercase",marginBottom:3}}>Reminder for Tomorrow</p>
                <p style={{fontSize:14,fontWeight:600,color:"#26201A"}}>{today?.reminder || "No reminder added yet"}</p>
              </div>
            </div>
          </div>

          {selectedChild.note && (
            <div className="note-preview">
              <p style={{fontSize:11,fontWeight:800,color:"#C4980A",letterSpacing:.4,textTransform:"uppercase",marginBottom:6}}>A little note from teacher</p>
              <p style={{fontSize:14,color:"#26201A",lineHeight:1.6}}>"{selectedChild.note}"</p>
              <p style={{fontSize:11,color:"#ABA099",marginTop:8,fontWeight:600}}>- {selectedChild.teacher || "Teacher"}, Today</p>
            </div>
          )}

          <div style={{height:14}}/>

          <div className="card-sm">
            <p style={{fontSize:11,fontWeight:800,color:"#ABA099",letterSpacing:.4,textTransform:"uppercase",marginBottom:8}}>What to bring tomorrow</p>
            <p style={{fontSize:14,fontWeight:600,color:"#26201A"}}>{tomorrow?.materials || "No materials added yet"}</p>
          </div>
        </>
      )}
    </div>
  );
}
