export default function ParentNotices({ data }) {
  const announcements = data?.announcements || [];
  return (
    <div className="scroll-top fi">
      <div className="top-bar row-between">
        <p className="serif" style={{fontSize:20,color:"#26201A"}}>Notices & reminders</p>
        <span className="badge">{announcements.length}</span>
      </div>

      <div className="card">
        {announcements.length === 0 ? (
          <div className="empty-state">
            <p className="serif">No notices yet</p>
            <span>School announcements will appear here once the admin publishes them.</span>
          </div>
        ) : announcements.map((a,i)=>(
          <div key={a.id || i} className="ann-item">
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
    </div>
  );
}