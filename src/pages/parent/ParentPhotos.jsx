import { useState } from "react";

export default function ParentPhotos({ data, selectedChild }) {
  const photos = data?.photos || [];
  const weeks = ["This Week", "Last Week", "Earlier"];
  const [activeWeek, setActiveWeek] = useState(0);
  return (
    <div className="scroll-top fi">
      <div className="top-bar">
        <p className="serif" style={{fontSize:20,color:"#26201A"}}>Photo memories</p>
      </div>
      <div className="day-tabs">
        {weeks.map((w,i)=>(
          <button key={i} type="button" className={`day-tab${activeWeek===i?" active":""}`} onClick={()=>setActiveWeek(i)}>{w}</button>
        ))}
      </div>

      <div className="card" style={{padding:14}}>
        <p style={{fontSize:11,fontWeight:800,color:"#ABA099",letterSpacing:.4,textTransform:"uppercase",marginBottom:12}}>
          {selectedChild?.className || "No class selected"}
        </p>
        {photos.length === 0 ? (
          <div className="empty-state">
            <p className="serif">No photos yet</p>
            <span>Teachers have not uploaded real photos for this tenant.</span>
          </div>
        ) : (
          <div className="photo-grid">
            {photos.map((p,i)=>(
              <div key={p.id || i} className="photo-thumb" title={p.l}>
                <span>{p.e}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}