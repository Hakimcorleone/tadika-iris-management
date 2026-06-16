import { useState } from "react";
import { Ic } from "../../components/icon.jsx";

function SettingRow({ icon, title, text, tag }) {
  return (
    <div className="card-sm" style={{marginBottom:10}}>
      <div className="list-item" style={{padding:0,border:"none"}}>
        <div style={{width:44,height:44,borderRadius:14,background:"#F5EDE3",display:"flex",alignItems:"center",justifyContent:"center",color:"#7A6E66",flexShrink:0}}>{icon}</div>
        <div style={{flex:1,minWidth:0}}>
          <p style={{fontSize:14,fontWeight:800,color:"#26201A"}}>{title}</p>
          <p style={{fontSize:12,color:"#7A6E66",lineHeight:1.45}}>{text}</p>
        </div>
        {tag ? <span className="tag tag-sky">{tag}</span> : <Ic.Arr/>}
      </div>
    </div>
  );
}

export default function AdminSettings({ onLogout, tenant, data, actions }) {
  const [profile, setProfile] = useState({
    schoolName: tenant?.schoolName || "",
    ownerName: tenant?.ownerName || "",
    ownerPhone: tenant?.ownerPhone || "",
    ownerEmail: tenant?.ownerEmail || "",
  });

  const students = data?.students?.length || 0;
  const payments = data?.studentPayments?.length || 0;
  const receipts = data?.receipts?.length || 0;
  const queue = data?.whatsappQueue?.length || 0;

  function setField(field, value) {
    setProfile(prev => ({ ...prev, [field]: value }));
  }

  function saveProfile(event) {
    event.preventDefault();
    actions.updateTenantProfile(profile);
  }

  function resetRecords() {
    if (window.confirm("Clear all demo records? School profile will stay.")) {
      actions.resetTenantData();
    }
  }

  return (
    <div className="scroll-top fi admin-settings">
      <div className="top-bar row-between">
        <div>
          <p style={{fontSize:11,fontWeight:800,color:"#ABA099",letterSpacing:.5,textTransform:"uppercase"}}>Admin</p>
          <p className="serif" style={{fontSize:20,color:"#26201A"}}>Settings</p>
        </div>
        <button type="button" aria-label="Log out" onClick={onLogout} className="icon-btn"><Ic.Out/></button>
      </div>

      <section className="settings-hero">
        <div>
          <p className="mini-eyebrow">School profile</p>
          <p className="serif" style={{fontSize:24,color:"#26201A"}}>{tenant?.schoolName || "New School"}</p>
          <p className="section-sub">Manage basic school details before connecting real authentication and database.</p>
        </div>
        <div className="settings-hero-metric">
          <span>Records</span>
          <strong>{students} students</strong>
        </div>
      </section>

      <form className="settings-panel admin-form" onSubmit={saveProfile}>
        <div className="sec-header">
          <div>
            <p className="serif" style={{fontSize:17,color:"#26201A"}}>School details</p>
            <p className="section-sub">These values will later move into the school profile table.</p>
          </div>
          <span className="tag tag-sage">Editable</span>
        </div>

        <div className="form-grid two">
          <label className="form-field">
            <span>School name</span>
            <input value={profile.schoolName} onChange={event => setField("schoolName", event.target.value)} placeholder="School name" required />
          </label>
          <label className="form-field">
            <span>Owner name</span>
            <input value={profile.ownerName} onChange={event => setField("ownerName", event.target.value)} placeholder="Owner" />
          </label>
          <label className="form-field">
            <span>Owner WhatsApp</span>
            <input value={profile.ownerPhone} onChange={event => setField("ownerPhone", event.target.value)} placeholder="6012..." />
          </label>
          <label className="form-field">
            <span>Owner email</span>
            <input value={profile.ownerEmail} onChange={event => setField("ownerEmail", event.target.value)} placeholder="owner@email.com" />
          </label>
        </div>
        <button type="submit" className="btn btn-peach btn-full"><Ic.Check/> Save profile</button>
      </form>

      <section className="card">
        <div className="sec-header">
          <div>
            <p className="serif" style={{fontSize:17,color:"#26201A"}}>Setup status</p>
            <p className="section-sub">Current app modules, kept simple until the real backend is connected.</p>
          </div>
        </div>
        <SettingRow icon={<Ic.User/>} title="Login & access" text="Demo sign-in is active. Supabase Auth will replace it next." tag="Next" />
        <SettingRow icon={<Ic.Money/>} title="Payments" text={`${payments} payment records and ${receipts} generated receipts.`} tag="Live" />
        <SettingRow icon={<Ic.Chat/>} title="WhatsApp" text={`${queue} queued WhatsApp follow-ups or receipts.`} tag="Queue" />
        <SettingRow icon={<Ic.Users/>} title="Students & parents" text={`${students} student profiles. Parent linking comes with database setup.`} tag="Ready" />
      </section>

      <section className="settings-panel danger-zone">
        <div>
          <p className="serif" style={{fontSize:17,color:"#26201A"}}>Demo records</p>
          <p className="section-sub">Use this before onboarding actual school data.</p>
        </div>
        <button type="button" className="btn btn-danger" onClick={resetRecords}><Ic.X/> Clear records</button>
      </section>

      <div style={{paddingBottom:8}}>
        <button className="btn btn-full" style={{background:"#FDE8D8",color:"#D06040"}} onClick={onLogout}>
          <Ic.Out/> Sign Out
        </button>
      </div>
    </div>
  );
}
