import { useMemo, useState } from "react";
import { Ic } from "../../components/icon.jsx";

const money = value => `RM${Number(value || 0).toLocaleString("en-MY")}`;

const blankTemplate = {
  title: "",
  audience: "",
  message: "",
};

function EmptyState({ title, text }) {
  return (
    <div className="empty-state compact">
      <p className="serif">{title}</p>
      <span>{text}</span>
    </div>
  );
}

export default function AdminWhatsApp({ onLogout, data, actions }) {
  const templates = data?.whatsappTemplates || [];
  const [selectedTemplateId, setSelectedTemplateId] = useState("");
  const [message, setMessage] = useState("");
  const [templateForm, setTemplateForm] = useState(blankTemplate);
  const selectedTemplate = templates.find(template => template.id === selectedTemplateId) || templates[0] || null;

  const followUpQueue = useMemo(() => {
    const unpaidPayments = (data?.studentPayments || [])
      .filter(payment => payment.status !== "Paid")
      .map(payment => ({
        id: `payment-${payment.id}`,
        name: payment.parent || payment.child || "Parent",
        reason: `${payment.status || "Due"} monthly fee`,
        child: payment.child || "No child name",
        amount: money(payment.amount),
        status: payment.status === "Overdue" ? "Follow-up" : "Ready to send",
      }));
    return [...unpaidPayments, ...(data?.whatsappQueue || [])];
  }, [data?.studentPayments, data?.whatsappQueue]);

  function chooseTemplate(templateId) {
    const template = templates.find(item => item.id === templateId);
    setSelectedTemplateId(templateId);
    setMessage(template?.message || "");
  }

  function updateTemplateField(field, value) {
    setTemplateForm(prev => ({ ...prev, [field]: value }));
  }

  function addTemplate(event) {
    event.preventDefault();
    if (!templateForm.title.trim() || !templateForm.message.trim()) return;
    const template = actions.addWhatsappTemplate(templateForm);
    setTemplateForm(blankTemplate);
    chooseTemplate(template.id);
  }

  function prepareWhatsApp() {
    const text = encodeURIComponent(message || selectedTemplate?.message || "");
    if (!text) return;
    window.open(`https://wa.me/?text=${text}`, "_blank", "noopener,noreferrer");
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
        <div className="wa-bubble" aria-hidden="true"><Ic.Chat/></div>
        <div>
          <p className="mini-eyebrow">Primary channel</p>
          <p className="serif" style={{fontSize:22,color:"#26201A"}}>Use the app as the control room; parents still receive messages in WhatsApp.</p>
          <p className="section-sub" style={{marginTop:6}}>Templates and queues are empty until you create real records.</p>
        </div>
      </section>

      <section className="card">
        <div className="sec-header">
          <div>
            <p className="serif" style={{fontSize:17,color:"#26201A"}}>Message composer</p>
            <p className="section-sub">Draft first, then prepare the WhatsApp message.</p>
          </div>
          <span className="tag tag-sage">No parent app needed</span>
        </div>

        <label className="form-label" htmlFor="wa-audience">TEMPLATE</label>
        <select id="wa-audience" className="inp" value={selectedTemplate?.id || ""} onChange={event => chooseTemplate(event.target.value)} disabled={templates.length === 0}>
          {templates.length === 0 ? <option value="">No templates yet</option> : templates.map(template => <option key={template.id} value={template.id}>{template.title}</option>)}
        </select>

        <p className="context-pill" style={{boxShadow:"none",marginBottom:12}}>
          <span className="context-avatar" style={{background:"#DBF0D0"}}><Ic.Users/></span>
          <span>
            <span className="context-label">Audience</span>
            <span className="context-name">{selectedTemplate?.audience || "Choose or create a template"}</span>
          </span>
        </p>

        <label className="form-label" htmlFor="wa-message">MESSAGE</label>
        <textarea id="wa-message" className="textarea wa-textarea" value={message} onChange={event => setMessage(event.target.value)} placeholder="Write a WhatsApp message..." />
        <div className="wa-actions">
          <button type="button" className="btn btn-ghost"><Ic.Note/> Save draft</button>
          <button type="button" className="btn btn-sage" onClick={prepareWhatsApp} disabled={!message.trim()}><Ic.Chat/> Prepare WhatsApp</button>
        </div>
      </section>

      <section className="card">
        <div className="sec-header">
          <div>
            <p className="serif" style={{fontSize:17,color:"#26201A"}}>Add template</p>
            <p className="section-sub">Keep reusable parent messages here.</p>
          </div>
        </div>
        <form className="admin-form" onSubmit={addTemplate}>
          <div className="form-grid two">
            <label className="form-field">
              <span>Title</span>
              <input value={templateForm.title} onChange={event => updateTemplateField("title", event.target.value)} placeholder="Template title" required />
            </label>
            <label className="form-field">
              <span>Audience</span>
              <input value={templateForm.audience} onChange={event => updateTemplateField("audience", event.target.value)} placeholder="Who should receive this" />
            </label>
          </div>
          <label className="form-field">
            <span>Message</span>
            <textarea value={templateForm.message} onChange={event => updateTemplateField("message", event.target.value)} placeholder="Message text" required />
          </label>
          <button type="submit" className="btn btn-peach btn-full"><Ic.Plus/> Add template</button>
        </form>
      </section>

      <section className="card">
        <div className="sec-header">
          <div>
            <p className="serif" style={{fontSize:17,color:"#26201A"}}>Follow-up queue</p>
            <p className="section-sub">Generated from unpaid payment records.</p>
          </div>
          <span className="badge">{followUpQueue.length}</span>
        </div>
        {followUpQueue.length === 0 ? (
          <EmptyState title="No follow-ups" text="Add due or overdue fees and they will appear here automatically." />
        ) : followUpQueue.map(item => (
          <div key={item.id} className="wa-queue-row">
            <div className="wa-status-dot" />
            <div style={{flex:1}}>
              <p className="money-row-title">{item.name}</p>
              <p className="money-row-sub">{item.reason} - {item.child}</p>
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
        {templates.length === 0 ? (
          <EmptyState title="No templates" text="Create your first WhatsApp template above." />
        ) : templates.map(template => (
          <div key={template.id} className="template-card template-row">
            <button type="button" className="template-select" onClick={() => chooseTemplate(template.id)}>
              <span>
                <span className="money-row-title">{template.title}</span>
                <span className="money-row-sub">{template.audience || "No audience"}</span>
              </span>
              <Ic.Arr/>
            </button>
            <button type="button" className="danger-icon-btn" aria-label={`Delete ${template.title}`} onClick={() => actions.deleteWhatsappTemplate(template.id)}><Ic.X/></button>
          </div>
        ))}
      </section>
    </div>
  );
}
