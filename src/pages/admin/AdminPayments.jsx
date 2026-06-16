import { useMemo, useState } from "react";
import { Ic } from "../../components/icon.jsx";

const money = value => `RM${Number(value || 0).toLocaleString("en-MY")}`;

const blankPayment = {
  child: "",
  parent: "",
  phone: "",
  className: "",
  fee: "Monthly Fee",
  invoiceNo: "",
  amount: "",
  dueDate: "",
  status: "Due",
  method: "Manual record",
  notes: "",
};

const blankPayroll = {
  teacher: "",
  role: "",
  amount: "",
  due: "",
  status: "Pending approval",
};

const blankEvent = {
  title: "",
  amountPerChild: "",
  target: "",
  collected: "",
  paid: "",
  total: "",
  due: "",
  status: "Draft",
};

function StatusTag({ status }) {
  const label = status || "Draft";
  const cls = label === "Paid" || label === "Ready" || label === "Open" || label === "Receipt queued"
    ? "tag-sage"
    : label === "Overdue" ? "tag-coral" : "tag-yellow";
  return <span className={`tag ${cls}`}>{label}</span>;
}

function ProofTag({ status }) {
  const label = status || "Not received";
  const cls = label === "Verified" ? "tag-sage" : label.includes("No") || label.includes("Not") ? "tag-coral" : "tag-yellow";
  return <span className={`tag ${cls}`}>{label}</span>;
}

function EmptyState({ title, text }) {
  return (
    <div className="empty-state">
      <p className="serif">{title}</p>
      <span>{text}</span>
    </div>
  );
}

function PaymentDetailPanel({ payment, receipt, queuedMessage, onDelete, onMarkPaid }) {
  if (!payment) {
    return (
      <aside className="payment-detail-card empty-detail">
        <p className="serif" style={{fontSize:20,color:"#26201A"}}>No payment selected</p>
        <p className="section-sub" style={{marginTop:6}}>Add a monthly fee record, then open it here for follow-up.</p>
      </aside>
    );
  }

  const isPaid = payment.status === "Paid";

  return (
    <aside className="payment-detail-card" aria-label={`${payment.child} payment details`}>
      <div className="payment-detail-head">
        <div>
          <p className="mini-eyebrow">Selected payment</p>
          <p className="serif" style={{fontSize:22,color:"#26201A"}}>{payment.child || "Unnamed child"}</p>
          <p className="money-row-sub">{payment.parent || "No parent"} - {payment.phone || "No phone"}</p>
        </div>
        <StatusTag status={payment.status}/>
      </div>

      <div className="payment-total-card">
        <span>{payment.fee || "Fee"}</span>
        <strong>{money(payment.amount)}</strong>
        <small>{payment.invoiceNo || "No invoice"} - Due {payment.dueDate || "not set"}</small>
      </div>

      <div className={`receipt-strip${receipt ? " ready" : ""}`}>
        <div>
          <p className="money-row-title">{receipt ? "Receipt generated" : "Receipt pending"}</p>
          <p className="money-row-sub">{receipt?.receiptNo || payment.receiptNo || "Mark paid to generate receipt"}</p>
        </div>
        <StatusTag status={queuedMessage ? "Receipt queued" : receipt ? "Ready" : "Not queued"}/>
      </div>

      <div className="detail-grid">
        <div>
          <span>Class</span>
          <strong>{payment.className || "Not assigned"}</strong>
        </div>
        <div>
          <span>Method</span>
          <strong>{payment.method || "Manual"}</strong>
        </div>
        <div>
          <span>Receipt</span>
          <strong>{receipt?.receiptNo || payment.receiptNo || "Not issued"}</strong>
        </div>
        <div>
          <span>Last reminder</span>
          <strong>{payment.lastReminder || "Not sent"}</strong>
        </div>
      </div>

      <div className="proof-panel">
        <div className="row-between" style={{gap:12}}>
          <div>
            <p className="money-row-title">Payment proof</p>
            <p className="money-row-sub">Received: {payment.proofReceivedAt || "Not received"}</p>
          </div>
          <ProofTag status={payment.proofStatus}/>
        </div>
      </div>

      <div className="detail-actions three">
        <button type="button" className="btn btn-sage"><Ic.Chat/> WhatsApp</button>
        <button type="button" className="btn btn-ghost" disabled={isPaid} onClick={() => onMarkPaid(payment)}>
          <Ic.Check/> {isPaid ? "Paid" : "Mark paid"}
        </button>
        <button type="button" className="btn btn-danger" onClick={() => onDelete(payment.id)}><Ic.X/> Delete</button>
      </div>

      <div className="timeline-card">
        <p className="money-row-title" style={{marginBottom:10}}>Reminder history</p>
        {(payment.reminders || []).length === 0 ? (
          <p className="money-row-sub">No reminders sent yet.</p>
        ) : payment.reminders.map((item, index) => (
          <div key={index} className="timeline-item">
            <span className="timeline-dot" />
            <div>
              <p className="money-row-title">{item.date} - {item.channel}</p>
              <p className="money-row-sub">{item.text}</p>
            </div>
          </div>
        ))}
      </div>

      {payment.notes && (
        <div className="note-preview" style={{marginTop:12}}>
          <p style={{fontSize:11,fontWeight:800,color:"#C4980A",letterSpacing:.4,textTransform:"uppercase",marginBottom:6}}>Admin note</p>
          <p style={{fontSize:13,color:"#26201A",lineHeight:1.6}}>{payment.notes}</p>
        </div>
      )}
    </aside>
  );
}

export default function AdminPayments({ onLogout, data, actions, tenant, usage }) {
  const [view, setView] = useState("fees");
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selectedPaymentId, setSelectedPaymentId] = useState(null);
  const [paymentForm, setPaymentForm] = useState(blankPayment);
  const [payrollForm, setPayrollForm] = useState(blankPayroll);
  const [eventForm, setEventForm] = useState(blankEvent);

  const paymentSummary = data?.paymentSummary || {};
  const studentPayments = data?.studentPayments || [];
  const teacherPayroll = data?.teacherPayroll || [];
  const eventCollections = data?.eventCollections || [];
  const students = data?.students || [];
  const receipts = data?.receipts || [];
  const whatsappQueue = data?.whatsappQueue || [];
  const totalFees = Number(paymentSummary.collected || 0) + Number(paymentSummary.outstanding || 0);
  const collectionRate = totalFees > 0 ? Math.round((Number(paymentSummary.collected || 0) / totalFees) * 100) : 0;

  const filteredPayments = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return studentPayments.filter(payment => {
      const matchesStatus = statusFilter === "All" || payment.status === statusFilter;
      const matchesQuery = !needle || [payment.child, payment.parent, payment.className, payment.invoiceNo]
        .join(" ")
        .toLowerCase()
        .includes(needle);
      return matchesStatus && matchesQuery;
    });
  }, [query, statusFilter, studentPayments]);

  const selectedPayment = filteredPayments.find(payment => payment.id === selectedPaymentId) || filteredPayments[0] || null;
  const selectedReceipt = selectedPayment
    ? receipts.find(receipt => receipt.paymentId === selectedPayment.id || receipt.receiptNo === selectedPayment.receiptNo)
    : null;
  const selectedQueueMessage = selectedPayment
    ? whatsappQueue.find(message => message.paymentId === selectedPayment.id || (selectedReceipt && message.receiptId === selectedReceipt.id))
    : null;

  function updatePaymentField(field, value) {
    setPaymentForm(prev => ({ ...prev, [field]: value }));
  }

  function updatePayrollField(field, value) {
    setPayrollForm(prev => ({ ...prev, [field]: value }));
  }

  function updateEventField(field, value) {
    setEventForm(prev => ({ ...prev, [field]: value }));
  }

  function addPayment(event) {
    event.preventDefault();
    if (!paymentForm.child.trim() || !paymentForm.amount) return;
    const record = actions.addPayment(paymentForm);
    if (paymentForm.status === "Paid") actions.markPaymentPaid(record.id);
    setSelectedPaymentId(record.id);
    setPaymentForm(blankPayment);
  }

  function addPayroll(event) {
    event.preventDefault();
    if (!payrollForm.teacher.trim() || !payrollForm.amount) return;
    actions.addPayroll(payrollForm);
    setPayrollForm(blankPayroll);
  }

  function addEvent(event) {
    event.preventDefault();
    if (!eventForm.title.trim()) return;
    actions.addEvent(eventForm);
    setEventForm(blankEvent);
  }

  function deletePayment(id) {
    actions.deletePayment(id);
    setSelectedPaymentId(null);
  }

  function markPaid(payment) {
    if (!payment || payment.status === "Paid") return;
    actions.markPaymentPaid(payment.id);
  }

  return (
    <div className="scroll-top fi admin-money">
      <div className="top-bar row-between">
        <div>
          <p style={{fontSize:11,fontWeight:800,color:"#ABA099",letterSpacing:.5,textTransform:"uppercase"}}>{tenant?.schoolName || paymentSummary.month || "Current tenant"}</p>
          <p className="serif" style={{fontSize:20,color:"#26201A"}}>Payments</p>
        </div>
        <button type="button" aria-label="Log out" onClick={onLogout} className="icon-btn"><Ic.Out/></button>
      </div>

      <section className="money-hero">
        <div>
          <p className="mini-eyebrow">Collected monthly fees</p>
          <p className="money-hero-value">{money(paymentSummary.collected)}</p>
          <p className="money-hero-sub">{collectionRate}% collection rate from tenant records</p>
        </div>
        <div className="money-ring" style={{background:`conic-gradient(var(--sage) 0 ${collectionRate}%, rgba(255,255,255,.18) ${collectionRate}% 100%)`}} aria-label={`${collectionRate}% collected`}>
          <span>{collectionRate}%</span>
        </div>
      </section>

      <div className="finance-grid">
        <div className="finance-card peach">
          <p className="finance-label">Outstanding</p>
          <p className="finance-value">{money(paymentSummary.outstanding)}</p>
          <p className="finance-sub">Unpaid monthly fees</p>
        </div>
        <div className="finance-card sage">
          <p className="finance-label">Payroll Due</p>
          <p className="finance-value">{money(paymentSummary.payrollDue)}</p>
          <p className="finance-sub">Teacher payout records</p>
        </div>
        <div className="finance-card sky">
          <p className="finance-label">Event Collection</p>
          <p className="finance-value">{money(paymentSummary.eventCollected)}</p>
          <p className="finance-sub">Ad-hoc collection received</p>
        </div>
        <div className="finance-card lilac">
          <p className="finance-label">Receipts</p>
          <p className="finance-value">{paymentSummary.receiptCount || receipts.length}</p>
          <p className="finance-sub">WhatsApp queue {usage?.whatsappMessages || whatsappQueue.length}</p>
        </div>
      </div>

      <div className="segmented" role="tablist" aria-label="Payment views">
        {[
          ["fees", "Monthly"],
          ["payroll", "Payroll"],
          ["events", "Events"],
        ].map(([id, label]) => (
          <button key={id} type="button" role="tab" aria-selected={view===id} className={view===id ? "active" : ""} onClick={() => setView(id)}>{label}</button>
        ))}
      </div>

      {view === "fees" && (
        <section className="fees-layout">
          <div className="card finance-section">
            <div className="sec-header">
              <div>
                <p className="serif" style={{fontSize:17,color:"#26201A"}}>Student monthly fees</p>
                <p className="section-sub">Tenant-scoped invoices now. API billing can replace this local adapter later.</p>
              </div>
              <span className="badge">{studentPayments.length}</span>
            </div>

            <form className="admin-form add-record-panel" onSubmit={addPayment}>
              <div className="form-grid two">
                <label className="form-field">
                  <span>Student</span>
                  <input list="student-payment-options" value={paymentForm.child} onChange={event => updatePaymentField("child", event.target.value)} placeholder="Child name" required />
                </label>
                <label className="form-field">
                  <span>Parent</span>
                  <input value={paymentForm.parent} onChange={event => updatePaymentField("parent", event.target.value)} placeholder="Parent name" />
                </label>
                <label className="form-field">
                  <span>Phone</span>
                  <input value={paymentForm.phone} onChange={event => updatePaymentField("phone", event.target.value)} placeholder="WhatsApp number" />
                </label>
                <label className="form-field">
                  <span>Class</span>
                  <input value={paymentForm.className} onChange={event => updatePaymentField("className", event.target.value)} placeholder="Class name" />
                </label>
                <label className="form-field">
                  <span>Amount</span>
                  <input value={paymentForm.amount} onChange={event => updatePaymentField("amount", event.target.value)} inputMode="decimal" placeholder="0" required />
                </label>
                <label className="form-field">
                  <span>Due date</span>
                  <input value={paymentForm.dueDate} onChange={event => updatePaymentField("dueDate", event.target.value)} placeholder="e.g. 30 Jun 2026" />
                </label>
              </div>
              <datalist id="student-payment-options">
                {students.map(student => <option key={student.id} value={student.name} />)}
              </datalist>
              <div className="form-grid two compact-grid">
                <label className="form-field">
                  <span>Status</span>
                  <select value={paymentForm.status} onChange={event => updatePaymentField("status", event.target.value)}>
                    <option>Due</option>
                    <option>Overdue</option>
                    <option>Paid</option>
                  </select>
                </label>
                <label className="form-field">
                  <span>Invoice no.</span>
                  <input value={paymentForm.invoiceNo} onChange={event => updatePaymentField("invoiceNo", event.target.value)} placeholder="Auto if blank" />
                </label>
              </div>
              <label className="form-field">
                <span>Admin note</span>
                <textarea value={paymentForm.notes} onChange={event => updatePaymentField("notes", event.target.value)} placeholder="Optional note for follow-up" />
              </label>
              <button type="submit" className="btn btn-peach btn-full"><Ic.Plus/> Add monthly fee</button>
            </form>

            <div className="payment-toolbar">
              <label className="payment-search">
                <span>Search</span>
                <input value={query} onChange={event => setQuery(event.target.value)} placeholder="Student, parent, invoice..." />
              </label>
              <div className="status-pills" aria-label="Payment status filter">
                {['All', 'Paid', 'Due', 'Overdue'].map(status => (
                  <button key={status} type="button" className={statusFilter === status ? "active" : ""} onClick={() => setStatusFilter(status)}>{status}</button>
                ))}
              </div>
            </div>

            <div className="payment-results-count">{filteredPayments.length} records shown</div>

            {filteredPayments.length === 0 ? (
              <EmptyState title="No fee records" text="Add a monthly fee above. Nothing fake is bundled in this tenant anymore." />
            ) : filteredPayments.map(payment => {
              const receipt = receipts.find(item => item.paymentId === payment.id || item.receiptNo === payment.receiptNo);
              return (
                <button
                  key={payment.id}
                  type="button"
                  className={`money-row payment-row${selectedPayment?.id === payment.id ? " active" : ""}`}
                  onClick={() => setSelectedPaymentId(payment.id)}
                >
                  <div className="money-row-main">
                    <p className="money-row-title">{payment.child || "Unnamed child"}</p>
                    <p className="money-row-sub">{payment.parent || "No parent"} - {payment.className || "No class"}</p>
                    <p className="money-row-sub">{payment.invoiceNo || "No invoice"} - {receipt ? receipt.receiptNo : payment.proofStatus || "No proof"}</p>
                  </div>
                  <div className="money-row-side">
                    <p className="money-amount">{money(payment.amount)}</p>
                    <StatusTag status={payment.status}/>
                    <p className="money-row-sub">{payment.paidOn || payment.dueDate || "No date"}</p>
                  </div>
                </button>
              );
            })}
          </div>

          <PaymentDetailPanel
            payment={selectedPayment}
            receipt={selectedReceipt}
            queuedMessage={selectedQueueMessage}
            onDelete={deletePayment}
            onMarkPaid={markPaid}
          />
        </section>
      )}

      {view === "payroll" && (
        <section className="card finance-section">
          <div className="sec-header">
            <div>
              <p className="serif" style={{fontSize:17,color:"#26201A"}}>Teacher payroll</p>
              <p className="section-sub">Add payout obligations. These numbers feed the owner snapshot.</p>
            </div>
            <span className="badge">{teacherPayroll.length}</span>
          </div>

          <form className="admin-form add-record-panel" onSubmit={addPayroll}>
            <div className="form-grid two">
              <label className="form-field">
                <span>Teacher</span>
                <input value={payrollForm.teacher} onChange={event => updatePayrollField("teacher", event.target.value)} placeholder="Teacher name" required />
              </label>
              <label className="form-field">
                <span>Role</span>
                <input value={payrollForm.role} onChange={event => updatePayrollField("role", event.target.value)} placeholder="Role" />
              </label>
              <label className="form-field">
                <span>Amount</span>
                <input value={payrollForm.amount} onChange={event => updatePayrollField("amount", event.target.value)} inputMode="decimal" placeholder="0" required />
              </label>
              <label className="form-field">
                <span>Due</span>
                <input value={payrollForm.due} onChange={event => updatePayrollField("due", event.target.value)} placeholder="e.g. 25 Jun 2026" />
              </label>
            </div>
            <label className="form-field">
              <span>Status</span>
              <select value={payrollForm.status} onChange={event => updatePayrollField("status", event.target.value)}>
                <option>Pending approval</option>
                <option>Pending attendance</option>
                <option>Ready</option>
                <option>Paid</option>
              </select>
            </label>
            <button type="submit" className="btn btn-sage btn-full"><Ic.Plus/> Add payroll</button>
          </form>

          {teacherPayroll.length === 0 ? (
            <EmptyState title="No payroll records" text="Add teacher payouts here before moving to an accounting backend." />
          ) : teacherPayroll.map(teacher => (
            <div key={teacher.id} className="money-row">
              <div className="money-row-main">
                <p className="money-row-title">{teacher.teacher}</p>
                <p className="money-row-sub">{teacher.role || "No role"} - Due {teacher.due || "not set"}</p>
              </div>
              <div className="money-row-side">
                <p className="money-amount">{money(teacher.amount)}</p>
                <StatusTag status={teacher.status}/>
              </div>
              <button type="button" className="danger-icon-btn" aria-label={`Delete ${teacher.teacher}`} onClick={() => actions.deletePayroll(teacher.id)}><Ic.X/></button>
            </div>
          ))}
        </section>
      )}

      {view === "events" && (
        <section className="card finance-section">
          <div className="sec-header">
            <div>
              <p className="serif" style={{fontSize:17,color:"#26201A"}}>Event collections</p>
              <p className="section-sub">Create ad-hoc collections and track how much has been collected.</p>
            </div>
            <span className="badge">{eventCollections.length}</span>
          </div>

          <form className="admin-form add-record-panel" onSubmit={addEvent}>
            <div className="form-grid two">
              <label className="form-field"><span>Event</span><input value={eventForm.title} onChange={event => updateEventField("title", event.target.value)} placeholder="Event name" required /></label>
              <label className="form-field"><span>Amount / child</span><input value={eventForm.amountPerChild} onChange={event => updateEventField("amountPerChild", event.target.value)} inputMode="decimal" placeholder="0" /></label>
              <label className="form-field"><span>Target</span><input value={eventForm.target} onChange={event => updateEventField("target", event.target.value)} inputMode="decimal" placeholder="0" /></label>
              <label className="form-field"><span>Collected</span><input value={eventForm.collected} onChange={event => updateEventField("collected", event.target.value)} inputMode="decimal" placeholder="0" /></label>
              <label className="form-field"><span>Paid count</span><input value={eventForm.paid} onChange={event => updateEventField("paid", event.target.value)} inputMode="numeric" placeholder="0" /></label>
              <label className="form-field"><span>Total count</span><input value={eventForm.total} onChange={event => updateEventField("total", event.target.value)} inputMode="numeric" placeholder="0" /></label>
              <label className="form-field"><span>Due</span><input value={eventForm.due} onChange={event => updateEventField("due", event.target.value)} placeholder="Due date" /></label>
              <label className="form-field">
                <span>Status</span>
                <select value={eventForm.status} onChange={event => updateEventField("status", event.target.value)}>
                  <option>Draft</option>
                  <option>Open</option>
                  <option>Closed</option>
                </select>
              </label>
            </div>
            <button type="submit" className="btn btn-peach btn-full"><Ic.Plus/> Add event collection</button>
          </form>

          {eventCollections.length === 0 ? (
            <EmptyState title="No event collections" text="Add trips, shirts, concerts, or one-off collections when needed." />
          ) : eventCollections.map(event => {
            const pct = Number(event.target || 0) > 0 ? Math.min(100, Math.round((Number(event.collected || 0) / Number(event.target || 0)) * 100)) : 0;
            return (
              <div key={event.id} className="event-card">
                <div className="row-between" style={{gap:12}}>
                  <div>
                    <p className="money-row-title">{event.title}</p>
                    <p className="money-row-sub">{money(event.amountPerChild)} per child - Due {event.due || "not set"}</p>
                  </div>
                  <StatusTag status={event.status}/>
                </div>
                <div className="progress-line"><span style={{width:`${pct}%`}}/></div>
                <div className="row-between event-footer">
                  <p className="money-row-sub">{event.paid || 0}/{event.total || 0} paid</p>
                  <p className="money-amount">{money(event.collected)} / {money(event.target)}</p>
                </div>
                <div className="record-actions">
                  <button type="button" className="btn btn-ghost btn-sm"><Ic.Chat/> WhatsApp reminder</button>
                  <button type="button" className="btn btn-danger btn-sm" onClick={() => actions.deleteEvent(event.id)}><Ic.X/> Delete</button>
                </div>
              </div>
            );
          })}
        </section>
      )}
    </div>
  );
}
