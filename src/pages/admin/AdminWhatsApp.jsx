import { useState } from "react";
import { WHATSAPP_QUEUE, WHATSAPP_TEMPLATES } from "../../data/sampleData.js";
import { Ic } from "../../components/icon.jsx";

export default function AdminWhatsApp({ onLogout }) {
  const [selectedTemplate, setSelectedTemplate] = useState(WHATSAPP_TEMPLATES[0]);
  const [message, setMessage] = useState(WHATSAPP_TEMPLATES[0].message);

  function chooseTemplate(template) {
    setSelectedTemplate(template);
    setMessage(template.message);
  }

  return (
    <div className="scroll-top fi admin-whatsapp">
      <div className="top-bar row-between">
        <div>
          <p style={{fontSize:11,fontWeight:800,color:"#ABA099",letterSpacing:.5,textTransform:"uppercase"}}>Parent communication</p>
          <p className="serif" style={{fontSize:20,color:"#26201A"}}>WhatsApp Hub</p>
        </div>
        <button type="button" aria-label="Log out" onClick={onLogout} className="icon-btn"><Ic.Out/></button>
      </div>

      <section className="wa-hero">
        <div className="wa-bubble" aria-hidden="true">💬</div>
        <div>
          <p className="mini-eyebrow">Primary channel</p>
          <p className="serif" style={{fontSize:22,color:"#26201A"}}>Everything parents need, sent through WhatsApp.</p>
          <p className="section-sub" style={{marginTop:6}}>Use the app as the control room. Parents receive reminders, receipts, and event collection messages where they already are.</p>
        </div>
      </section>

      <section className="card">
        <div className="sec-header">
          <div>
            <p className="serif" style={{fontSize:17,color:"#26201A"}}>Message composer</p>
            <p className="section-sub">Draft first, then send through WhatsApp.</p>
          </div>
          <span className="tag tag-sage">No app install needed</span>
        </div>

        <label className="form-label" htmlFor="wa-audience">AUDIENCE</label>
        <select id="wa-audience" className="inp" value={selectedTemplate.title} onChange={event => chooseTemplate(WHATSAPP_TEMPLATES.find(template => template.title === event.target.value))}>
          {WHATSAPP_TEMPLATES.map(template => <option key={template.title}>{template.title}</option>)}
        </select>

        <p className="context-pill" style={{boxShadow:"none",marginBottom:12}}>
          <span className="context-avatar" style={{background:"#DBF0D0"}}>👥</span>
          <span>
            <span className="context-label">Audience</span>
            <span className="context-name">{selectedTemplate.audience}</span>
          </span>
        </p>

        <label className="form-label" htmlFor="wa-message">MESSAGE</label>
        <textarea id="wa-message" className="textarea wa-textarea" value={message} onChange={event => setMessage(event.target.value)} />
        <div className="wa-actions">
          <button type="button" className="btn btn-ghost"><Ic.Note/> Save draft</button>
          <button type="button" className="btn btn-sage"><Ic.Chat/> Prepare WhatsApp</button>
        </div>
      </section>

      <section className="card">
        <div className="sec-header">
          <div>
            <p className="serif" style={{fontSize:17,color:"#26201A"}}>Follow-up queue</p>
            <p className="section-sub">Who needs a WhatsApp nudge today.</p>
          </div>
          <span className="badge">{WHATSAPP_QUEUE.length}</span>
        </div>
        {WHATSAPP_QUEUE.map((item, index) => (
          <div key={index} className="wa-queue-row">
            <div className="wa-status-dot" />
            <div style={{flex:1}}>
              <p className="money-row-title">{item.name}</p>
              <p className="money-row-sub">{item.reason} · {item.child}</p>
            </div>
            <div style={{textAlign:"right"}}>
              <p className="money-amount">{item.amount}</p>
              <span className={`tag ${item.status === "Follow-up" ? "tag-coral" : "tag-yellow"}`}>{item.status}</span>
            </div>
          </div>
        ))}
      </section>

      <section className="card wa-template-list">
        <p className="serif" style={{fontSize:17,color:"#26201A",marginBottom:12}}>Quick templates</p>
        {WHATSAPP_TEMPLATES.map(template => (
          <button key={template.title} type="button" className="template-card" onClick={() => chooseTemplate(template)}>
            <span>
              <span className="money-row-title">{template.title}</span>
              <span className="money-row-sub">{template.audience}</span>
            </span>
            <Ic.Arr/>
          </button>
        ))}
      </section>
    </div>
  );
}
