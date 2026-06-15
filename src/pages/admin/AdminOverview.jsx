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

function ReadinessTag({ ready }) {
  return <span className={`tag ${ready ? "tag-sage" : "tag-yellow"}`}>{ready ? "Ready" : "Open"}</span>;
}

export default function AdminOverview({ onLogout, data, tenant, usage, readiness }) {
  const paymentSummary = data?.paymentSummary || {};
  const classes = data?.classes || [];
  const students = data?.students || [];
  const announcements = data?.announcements || [];
  const queue = data?.whatsappQueue || [];
  const teacherNames = new Set((data?.teacherPayroll || []).map(item => item.teacher).filter(Boolean));
  const parentNames = new Set((data?.studentPayments || []).map(item => item.parent).filter(Boolean));
  const readyCount = (readiness || []).filter(item => item.ready).length;

  const stats = [
    {label:"Students", val:students.length, bg:"#DBF0D0", sub:`${usage?.students || 0}/${usage?.studentLimit || tenant?.studentLimit || 0} limit`},
    {label:"Parents",  val:parentNames.size, bg:"#FDE8D8", sub:"from payments"},
    {label:"Teachers", val:teacherNames.size, bg:"#D4EEFA", sub:`${usage?.staff || 0}/${usage?.staffLimit || tenant?.staffLimit || 0} limit`},
    {label:"Receipts", val:data?.receipts?.length || 0, bg:"#EAE0F8", sub:"generated"},
  ];

  const setupItems = [
    { label:"Student profiles", value:students.length, ready:students.length > 0 },
    { label:"Monthly fee records", value:data?.studentPayments?.length || 0, ready:(data?.studentPayments?.length || 0) > 0 },
    { label:"Receipt records", value:data?.receipts?.length || 0, ready:tenant?.featureFlags?.autoReceipts },
    { label:"WhatsApp queue", value:queue.length, ready:tenant?.featureFlags?.whatsappQueue },
  ];

  return (
    <div className="scroll-top fi">
      <div className="top-bar row-between">
        <div>
          <p style={{fontSize:11,fontWeight:800,color:"#ABA099",letterSpacing:.5,textTransform:"uppercase"}}>{todayLabel()}</p>
          <p className="serif" style={{fontSize:19,color:"#26201A"}}>SaaS operator view</p>
        </div>
        <button type="button" aria-label="Log out" onClick={onLogout} className="icon-btn"><Ic.Out/></button>
      </div>

      <section className="tenant-hero-card">
        <div>
          <p className="mini-eyebrow">Current tenant</p>
          <p className="serif" style={{fontSize:24,color:"#26201A"}}>{tenant?.schoolName || "New School Tenant"}</p>
          <p className="section-sub">/{tenant?.slug || "tenant"} - {tenant?.subscriptionStatus || "trial"} - {tenant?.timezone || "Asia/Kuala_Lumpur"}</p>
        </div>
        <div className="tenant-plan-pill">
          <span>{tenant?.planId || "starter"}</span>
          <strong>{money(tenant?.monthlyFee || 0)}/mo</strong>
        </div>
      </section>

      <section className="owner-priority-card">
        <div>
          <p className="mini-eyebrow">Owner finance snapshot</p>
          <p className="serif" style={{fontSize:22,color:"#26201A"}}>Payments, receipts, and WhatsApp follow-ups</p>
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
            <span>Queue</span>
            <strong>{queue.length}</strong>
          </div>
        </div>
      </section>

      <div className="stats-grid">
        {stats.map((s,i)=>(
          <div key={i} className="stat-card" style={{background:s.bg}}>
            <p style={{fontSize:26,fontWeight:800,color:"#26201A"}}>{s.val}</p>
            <p style={{fontSize:12,fontWeight:800,color:"#7A6E66"}}>{s.label}</p>
            <p style={{fontSize:10,fontWeight:800,color:"#A79B93",marginTop:3}}>{s.sub}</p>
          </div>
        ))}
      </div>

      <div className="card">
        <div className="sec-header">
          <div>
            <p className="serif" style={{fontSize:16,color:"#26201A"}}>SaaS readiness</p>
            <p className="section-sub">{readyCount}/{readiness?.length || 0} foundation checks ready for backend handoff.</p>
          </div>
          <span className="tag tag-sky">Tenant scoped</span>
        </div>
        {(readiness || []).map(item => (
          <div key={item.key} className="list-item setup-row">
            <div className={`setup-dot${item.ready ? " ready" : ""}`}/>
            <div style={{flex:1}}>
              <p style={{fontSize:13,fontWeight:800,color:"#26201A"}}>{item.label}</p>
              <p style={{fontSize:11,color:"#7A6E66"}}>{item.detail}</p>
            </div>
            <ReadinessTag ready={item.ready}/>
          </div>
        ))}
      </div>

      <div className="card">
        <div className="sec-header">
          <p className="serif" style={{fontSize:16,color:"#26201A"}}>Setup progress</p>
          <span className="tag tag-sky">Live data</span>
        </div>
        {setupItems.map(item => (
          <div key={item.label} className="list-item setup-row">
            <div className={`setup-dot${item.ready ? " ready" : ""}`}/>
            <div style={{flex:1}}>
              <p style={{fontSize:13,fontWeight:800,color:"#26201A"}}>{item.label}</p>
              <p style={{fontSize:11,color:"#7A6E66"}}>{item.value} records</p>
            </div>
            <ReadinessTag ready={item.ready}/>
          </div>
        ))}
      </div>

      <div className="card">
        <div className="sec-header">
          <p className="serif" style={{fontSize:16,color:"#26201A"}}>Classes</p>
          <span className="tag tag-peach">{classes.length}</span>
        </div>
        {classes.length === 0 ? (
          <EmptyState title="No classes yet" text="Classes can be normalized into a tenant-scoped table when the database is connected." />
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
          <EmptyState title="No announcements" text="Announcements remain tenant-scoped and can be added as a later module." />
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
