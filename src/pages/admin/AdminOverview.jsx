import { Ic } from "../../components/icon.jsx";
import { todayLabel } from "../../data/appStore.js";

const money = value => `RM${Number(value || 0).toLocaleString("en-MY")}`;

function EmptyState({ title, text }) {
  return (
    <div className="empty-state compact">
      <p className="serif">{title}</p>
      <span>{text}</span>
    </div>
  );
}

export default function AdminOverview({ onLogout, data }) {
  const paymentSummary = data?.paymentSummary || {};
  const classes = data?.classes || [];
  const students = data?.students || [];
  const announcements = data?.announcements || [];
  const whatsappQueue = data?.whatsappQueue || [];
  const teacherNames = new Set((data?.teacherPayroll || []).map(item => item.teacher).filter(Boolean));
  const parentNames = new Set((data?.studentPayments || []).map(item => item.parent).filter(Boolean));

  const stats = [
    {label:"Classes",  val:classes.length, bg:"#FDE8D8"},
    {label:"Students", val:students.length, bg:"#DBF0D0"},
    {label:"Teachers", val:teacherNames.size, bg:"#D4EEFA"},
    {label:"Parents",  val:parentNames.size, bg:"#EAE0F8"},
  ];

  const setupItems = [
    { label:"Student profiles", value:students.length, ready:students.length > 0 },
    { label:"Monthly fee records", value:data?.studentPayments?.length || 0, ready:(data?.studentPayments?.length || 0) > 0 },
    { label:"Payroll records", value:data?.teacherPayroll?.length || 0, ready:(data?.teacherPayroll?.length || 0) > 0 },
    { label:"WhatsApp templates", value:data?.whatsappTemplates?.length || 0, ready:(data?.whatsappTemplates?.length || 0) > 0 },
  ];

  return (
    <div className="scroll-top fi">
      <div className="top-bar row-between">
        <div>
          <p style={{fontSize:11,fontWeight:800,color:"#ABA099",letterSpacing:.5,textTransform:"uppercase"}}>{todayLabel()}</p>
          <p className="serif" style={{fontSize:19,color:"#26201A"}}>Admin workspace</p>
        </div>
        <button type="button" aria-label="Log out" onClick={onLogout} className="icon-btn"><Ic.Out/></button>
      </div>

      <section className="owner-priority-card">
        <div>
          <p className="mini-eyebrow">Owner snapshot</p>
          <p className="serif" style={{fontSize:22,color:"#26201A"}}>Money, students, and WhatsApp follow-ups</p>
        </div>
        <div className="owner-snapshot-grid">
          <div>
            <span>Collected</span>
            <strong>{money(paymentSummary.collected)}</strong>
          </div>
          <div>
            <span>Outstanding</span>
            <strong>{money(paymentSummary.outstanding)}</strong>
          </div>
          <div>
            <span>WhatsApp Queue</span>
            <strong>{whatsappQueue.length}</strong>
          </div>
        </div>
      </section>

      <div className="stats-grid">
        {stats.map((s,i)=>(
          <div key={i} className="stat-card" style={{background:s.bg}}>
            <p style={{fontSize:26,fontWeight:800,color:"#26201A"}}>{s.val}</p>
            <p style={{fontSize:12,fontWeight:700,color:"#7A6E66"}}>{s.label}</p>
          </div>
        ))}
      </div>

      <div className="card">
        <div className="sec-header">
          <p className="serif" style={{fontSize:16,color:"#26201A"}}>Setup progress</p>
          <span className="tag tag-sky">Live data</span>
        </div>
        {setupItems.map((item, index) => (
          <div key={item.label} className="list-item setup-row">
            <div className={`setup-dot${item.ready ? " ready" : ""}`}/>
            <div style={{flex:1}}>
              <p style={{fontSize:13,fontWeight:800,color:"#26201A"}}>{item.label}</p>
              <p style={{fontSize:11,color:"#7A6E66"}}>{item.value} records</p>
            </div>
            <span className={`tag ${item.ready ? "tag-sage" : "tag-yellow"}`}>{item.ready ? "Ready" : "Empty"}</span>
          </div>
        ))}
      </div>

      <div className="card">
        <div className="sec-header">
          <p className="serif" style={{fontSize:16,color:"#26201A"}}>Classes</p>
          <span className="tag tag-peach">{classes.length}</span>
        </div>
        {classes.length === 0 ? (
          <EmptyState title="No classes yet" text="Add student profiles first, then class data can be expanded from there." />
        ) : classes.map((c,i)=>(
          <div key={c.id || i} className="list-item">
            <div style={{width:10,height:10,borderRadius:"50%",background:c.dot || "#F2A07B",flexShrink:0}}/>
            <div style={{flex:1}}>
              <p style={{fontSize:13,fontWeight:700,color:"#26201A"}}>{c.name}</p>
              <p style={{fontSize:11,color:"#7A6E66"}}>{c.teacher || "No teacher assigned"}</p>
            </div>
            <span className="tag tag-sage">Active</span>
          </div>
        ))}
      </div>

      <div className="card">
        <div className="sec-header">
          <p className="serif" style={{fontSize:16,color:"#26201A"}}>Announcements</p>
          <span className="badge">{announcements.length}</span>
        </div>
        {announcements.length === 0 ? (
          <EmptyState title="No announcements" text="When announcements are connected later, they will appear here without demo content." />
        ) : announcements.map((a,i)=>(
          <div key={a.id || i} className="list-item">
            <div style={{flex:1}}>
              <p style={{fontSize:13,fontWeight:700,color:"#26201A"}}>{a.title}</p>
              <p style={{fontSize:11,color:"#7A6E66"}}>{a.date}</p>
            </div>
            {a.urgent && <span className="tag tag-coral">Urgent</span>}
          </div>
        ))}
      </div>
    </div>
  );
}
