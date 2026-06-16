import { useMemo, useState } from "react";
import { Ic } from "../../components/icon.jsx";

const money = value => `RM${Number(value || 0).toLocaleString("en-MY")}`;
const titleCase = value => String(value || "").replace(/_/g, " ").replace(/\b\w/g, char => char.toUpperCase());

function statusTone(status) {
  if (["ready", "demo", "connected", "active"].includes(status)) return "tag-sage";
  if (["not_connected", "blocked"].includes(status)) return "tag-coral";
  return "tag-yellow";
}

export default function AdminSettings({ onLogout, tenant, workspace, usage, readiness, plans, saasTables, actions }) {
  const [profile, setProfile] = useState({
    schoolName: tenant?.schoolName || "",
    slug: tenant?.slug || "",
    legalName: tenant?.legalName || "",
    ownerName: tenant?.ownerName || "",
    ownerPhone: tenant?.ownerPhone || "",
    ownerEmail: tenant?.ownerEmail || "",
    subscriptionStatus: tenant?.subscriptionStatus || "trial",
  });

  const planList = useMemo(() => Object.values(plans || {}), [plans]);
  const readyCount = (readiness || []).filter(item => item.ready).length;
  const currentPlan = (plans || {})[tenant?.planId] || planList[0];

  function setField(field, value) {
    setProfile(prev => ({ ...prev, [field]: value }));
  }

  function saveProfile(event) {
    event.preventDefault();
    const slug = profile.slug
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9-]+/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-|-$/g, "") || "school-tenant";
    const nextProfile = { ...profile, slug };
    actions.updateTenantProfile(nextProfile);
    setProfile(nextProfile);
  }

  function toggleIntegration(key, integration) {
    const nextStatus = integration?.status === "ready" ? "demo" : "ready";
    actions.updateIntegration(key, { status: nextStatus });
  }

  function resetTenant() {
    if (window.confirm("Reset all records for this tenant? Tenant profile and plan will stay.")) {
      actions.resetTenantData();
    }
  }

  return (
    <div className="scroll-top fi admin-settings">
      <div className="top-bar row-between">
        <div>
          <p style={{fontSize:11,fontWeight:800,color:"#ABA099",letterSpacing:.5,textTransform:"uppercase"}}>Tenant console</p>
          <p className="serif" style={{fontSize:20,color:"#26201A"}}>SaaS settings</p>
        </div>
        <button type="button" aria-label="Log out" onClick={onLogout} className="icon-btn"><Ic.Out/></button>
      </div>

      <section className="settings-hero">
        <div>
          <p className="mini-eyebrow">Workspace</p>
          <p className="serif" style={{fontSize:24,color:"#26201A"}}>{tenant?.schoolName || "New School Tenant"}</p>
          <p className="section-sub">/{tenant?.slug || "tenant"} - {workspace?.tenants?.length || 1} tenant - {readyCount}/{readiness?.length || 0} readiness checks</p>
        </div>
        <div className="settings-hero-metric">
          <span>{currentPlan?.name || "Starter"}</span>
          <strong>{money(currentPlan?.monthlyFee || 0)}/mo</strong>
        </div>
      </section>

      <section className="settings-grid">
        <form className="settings-panel admin-form" onSubmit={saveProfile}>
          <div className="sec-header">
            <div>
              <p className="serif" style={{fontSize:17,color:"#26201A"}}>Tenant profile</p>
              <p className="section-sub">This is the school account boundary for future database row-level security.</p>
            </div>
            <span className="tag tag-sky">tenant_id</span>
          </div>

          <div className="form-grid two">
            <label className="form-field">
              <span>School name</span>
              <input value={profile.schoolName} onChange={event => setField("schoolName", event.target.value)} placeholder="School name" required />
            </label>
            <label className="form-field">
              <span>Tenant slug</span>
              <input value={profile.slug} onChange={event => setField("slug", event.target.value)} placeholder="school-slug" required />
            </label>
            <label className="form-field">
              <span>Legal name</span>
              <input value={profile.legalName} onChange={event => setField("legalName", event.target.value)} placeholder="Registered company" />
            </label>
            <label className="form-field">
              <span>Status</span>
              <select value={profile.subscriptionStatus} onChange={event => setField("subscriptionStatus", event.target.value)}>
                <option value="trial">trial</option>
                <option value="active">active</option>
                <option value="paused">paused</option>
              </select>
            </label>
            <label className="form-field">
              <span>Owner name</span>
              <input value={profile.ownerName} onChange={event => setField("ownerName", event.target.value)} placeholder="Owner" />
            </label>
            <label className="form-field">
              <span>Owner WhatsApp</span>
              <input value={profile.ownerPhone} onChange={event => setField("ownerPhone", event.target.value)} placeholder="6012..." />
            </label>
          </div>
          <label className="form-field">
            <span>Owner email</span>
            <input value={profile.ownerEmail} onChange={event => setField("ownerEmail", event.target.value)} placeholder="owner@email.com" />
          </label>
          <button type="submit" className="btn btn-peach btn-full"><Ic.Check/> Save tenant</button>
        </form>

        <div className="settings-panel">
          <div className="sec-header">
            <div>
              <p className="serif" style={{fontSize:17,color:"#26201A"}}>Usage guardrails</p>
              <p className="section-sub">Plan limits make the product safer to sell and easier to scale.</p>
            </div>
            <span className="tag tag-sage">SaaS</span>
          </div>
          <div className="usage-grid">
            <div><span>Students</span><strong>{usage?.students || 0}/{usage?.studentLimit || 0}</strong></div>
            <div><span>Staff</span><strong>{usage?.staff || 0}/{usage?.staffLimit || 0}</strong></div>
            <div><span>Receipts</span><strong>{usage?.receipts || 0}</strong></div>
            <div><span>WhatsApp queue</span><strong>{usage?.whatsappMessages || 0}/{usage?.includedWhatsappMessages || 0}</strong></div>
          </div>
        </div>
      </section>

      <section className="settings-panel">
        <div className="sec-header">
          <div>
            <p className="serif" style={{fontSize:17,color:"#26201A"}}>Commercial plans</p>
            <p className="section-sub">Switch the tenant between sellable packages without changing code.</p>
          </div>
          <span className="badge">{planList.length}</span>
        </div>
        <div className="plan-grid">
          {planList.map(plan => (
            <button key={plan.id} type="button" className={`plan-card${tenant?.planId === plan.id ? " active" : ""}`} onClick={() => actions.updateTenantPlan(plan.id)}>
              <div className="row-between" style={{gap:12}}>
                <strong>{plan.name}</strong>
                {tenant?.planId === plan.id && <span className="tag tag-sage">Current</span>}
              </div>
              <p>{money(plan.setupFee)} setup</p>
              <h3>{plan.monthlyFee ? `${money(plan.monthlyFee)}/mo` : "One-time"}</h3>
              <small>{plan.studentLimit} students - {plan.staffLimit} staff - {plan.includedWhatsappMessages} WhatsApp</small>
            </button>
          ))}
        </div>
      </section>

      <section className="settings-panel">
        <div className="sec-header">
          <div>
            <p className="serif" style={{fontSize:17,color:"#26201A"}}>Integrations</p>
            <p className="section-sub">Keep secrets server-side later; this UI stores only provider intent and readiness status.</p>
          </div>
          <span className="tag tag-yellow">Adapter layer</span>
        </div>
        {Object.entries(tenant?.integrations || {}).map(([key, integration]) => (
          <div key={key} className="integration-row">
            <div>
              <p className="money-row-title">{titleCase(key)}</p>
              <p className="money-row-sub">{integration.provider || "not set"} - {integration.note || "No note"}</p>
            </div>
            <div className="integration-actions">
              <span className={`tag ${statusTone(integration.status)}`}>{titleCase(integration.status)}</span>
              <button type="button" className="btn btn-ghost btn-sm" onClick={() => toggleIntegration(key, integration)}>
                <Ic.Check/> {integration.status === "ready" ? "Demo" : "Ready"}
              </button>
            </div>
          </div>
        ))}
      </section>

      <section className="settings-panel">
        <div className="sec-header">
          <div>
            <p className="serif" style={{fontSize:17,color:"#26201A"}}>Database contract</p>
            <p className="section-sub">These tables are the minimum shape for Supabase/Postgres when you connect a real backend.</p>
          </div>
          <span className="badge">{saasTables?.length || 0}</span>
        </div>
        <div className="schema-grid">
          {(saasTables || []).map(table => <span key={table} className="schema-pill">{table}</span>)}
        </div>
      </section>

      <section className="settings-panel danger-zone">
        <div>
          <p className="serif" style={{fontSize:17,color:"#26201A"}}>Tenant data</p>
          <p className="section-sub">Useful before onboarding a real school. Profile, plan and integrations stay intact.</p>
        </div>
        <button type="button" className="btn btn-danger" onClick={resetTenant}><Ic.X/> Reset records</button>
      </section>

      <div style={{paddingBottom:8}}>
        <button className="btn btn-full" style={{background:"#FDE8D8",color:"#D06040"}} onClick={onLogout}>
          <Ic.Out/> Sign Out
        </button>
      </div>
    </div>
  );
}
