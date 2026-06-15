import { useMemo, useState } from "react";
import {
  EVENT_COLLECTIONS,
  PAYMENT_SUMMARY,
  STUDENT_PAYMENTS,
  TEACHER_PAYROLL,
} from "../../data/sampleData.js";
import { Ic } from "../../components/icon.jsx";

const money = value => `RM${value.toLocaleString("en-MY")}`;

function StatusTag({ status }) {
  const cls = status === "Paid" || status === "Ready" ? "tag-sage" : status === "Overdue" ? "tag-coral" : "tag-yellow";
  return <span className={`tag ${cls}`}>{status}</span>;
}

function ProofTag({ status }) {
  const cls = status === "Verified" ? "tag-sage" : status.includes("No") ? "tag-coral" : "tag-yellow";
  return <span className={`tag ${cls}`}>{status}</span>;
}

function PaymentDetailPanel({ payment }) {
  if (!payment) return null;

  return (
    <aside className="payment-detail-card" aria-label={`${payment.child} payment details`}>
      <div className="payment-detail-head">
        <div>
          <p className="mini-eyebrow">Selected payment</p>
          <p className="serif" style={{fontSize:22,color:"#26201A"}}>{payment.child}</p>
          <p className="money-row-sub">{payment.parent} · {payment.phone}</p>
        </div>
        <StatusTag status={payment.status}/>
      </div>

      <div className="payment-total-card">
        <span>{payment.fee}</span>
        <strong>{money(payment.amount)}</strong>
        <small>{payment.invoiceNo} · Due {payment.dueDate}</small>
      </div>

      <div className="detail-grid">
        <div>
          <span>Class</span>
          <strong>{payment.className}</strong>
        </div>
        <div>
          <span>Method</span>
          <strong>{payment.method}</strong>
        </div>
        <div>
          <span>Receipt</span>
          <strong>{payment.receiptNo}</strong>
        </div>
        <div>
          <span>Last reminder</span>
          <strong>{payment.lastReminder}</strong>
        </div>
      </div>

      <div className="proof-panel">
        <div className="row-between" style={{gap:12}}>
          <div>
            <p className="money-row-title">Payment proof</p>
            <p className="money-row-sub">Received: {payment.proofReceivedAt}</p>
          </div>
          <ProofTag status={payment.proofStatus}/>
        </div>
      </div>

      <div className="detail-actions">
        <button type="button" className="btn btn-sage"><Ic.Chat/> WhatsApp</button>
        <button type="button" className="btn btn-ghost"><Ic.Check/> Mark paid</button>
      </div>

      <div className="timeline-card">
        <p className="money-row-title" style={{marginBottom:10}}>Reminder history</p>
        {payment.reminders.map((item, index) => (
          <div key={index} className="timeline-item">
            <span className="timeline-dot" />
            <div>
              <p className="money-row-title">{item.date} · {item.channel}</p>
              <p className="money-row-sub">{item.text}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="note-preview" style={{marginTop:12}}>
        <p style={{fontSize:11,fontWeight:800,color:"#C4980A",letterSpacing:.4,textTransform:"uppercase",marginBottom:6}}>Admin note</p>
        <p style={{fontSize:13,color:"#26201A",lineHeight:1.6}}>{payment.notes}</p>
      </div>
    </aside>
  );
}

export default function AdminPayments({ onLogout }) {
  const [view, setView] = useState("fees");
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selectedPaymentId, setSelectedPaymentId] = useState(STUDENT_PAYMENTS[0].id);
  const collectionRate = Math.round((PAYMENT_SUMMARY.collected / (PAYMENT_SUMMARY.collected + PAYMENT_SUMMARY.outstanding)) * 100);

  const filteredPayments = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return STUDENT_PAYMENTS.filter(payment => {
      const matchesStatus = statusFilter === "All" || payment.status === statusFilter;
      const matchesQuery = !needle || [payment.child, payment.parent, payment.className, payment.invoiceNo].join(" ").toLowerCase().includes(needle);
      return matchesStatus && matchesQuery;
    });
  }, [query, statusFilter]);

  const selectedPayment = STUDENT_PAYMENTS.find(payment => payment.id === selectedPaymentId) || filteredPayments[0] || STUDENT_PAYMENTS[0];

  return (
    <div className="scroll-top fi admin-money">
      <div className="top-bar row-between">
        <div>
          <p style={{fontSize:11,fontWeight:800,color:"#ABA099",letterSpacing:.5,textTransform:"uppercase"}}>{PAYMENT_SUMMARY.month}</p>
          <p className="serif" style={{fontSize:20,color:"#26201A"}}>Payments</p>
        </div>
        <button type="button" aria-label="Log out" onClick={onLogout} className="icon-btn"><Ic.Out/></button>
      </div>

      <section className="money-hero">
        <div>
          <p className="mini-eyebrow">Collected this month</p>
          <p className="money-hero-value">{money(PAYMENT_SUMMARY.collected)}</p>
          <p className="money-hero-sub">{collectionRate}% of May fees collected</p>
        </div>
        <div className="money-ring" aria-label={`${collectionRate}% collected`}>
          <span>{collectionRate}%</span>
        </div>
      </section>

      <div className="finance-grid">
        <div className="finance-card peach">
          <p className="finance-label">Outstanding</p>
          <p className="finance-value">{money(PAYMENT_SUMMARY.outstanding)}</p>
          <p className="finance-sub">Needs parent follow-up</p>
        </div>
        <div className="finance-card sage">
          <p className="finance-label">Payroll Due</p>
          <p className="finance-value">{money(PAYMENT_SUMMARY.payrollDue)}</p>
          <p className="finance-sub">Teachers · 25 May</p>
        </div>
        <div className="finance-card sky">
          <p className="finance-label">Event Collection</p>
          <p className="finance-value">{money(PAYMENT_SUMMARY.eventCollected)}</p>
          <p className="finance-sub">Active events</p>
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
                <p className="section-sub">Search, filter, open details, then follow up through WhatsApp.</p>
              </div>
              <button type="button" className="btn btn-ghost btn-sm"><Ic.Chat/> Remind</button>
            </div>

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

            {filteredPayments.map(payment => (
              <button
                key={payment.id}
                type="button"
                className={`money-row payment-row${selectedPayment.id === payment.id ? " active" : ""}`}
                onClick={() => setSelectedPaymentId(payment.id)}
              >
                <div className="money-row-main">
                  <p className="money-row-title">{payment.child}</p>
                  <p className="money-row-sub">{payment.parent} · {payment.className}</p>
                  <p className="money-row-sub">{payment.invoiceNo} · {payment.proofStatus}</p>
                </div>
                <div className="money-row-side">
                  <p className="money-amount">{money(payment.amount)}</p>
                  <StatusTag status={payment.status}/>
                  <p className="money-row-sub">{payment.paidOn}</p>
                </div>
              </button>
            ))}
          </div>

          <PaymentDetailPanel payment={selectedPayment}/>
        </section>
      )}

      {view === "payroll" && (
        <section className="card finance-section">
          <div className="sec-header">
            <div>
              <p className="serif" style={{fontSize:17,color:"#26201A"}}>Teacher payroll</p>
              <p className="section-sub">Prepare payout before salary date.</p>
            </div>
            <button type="button" className="btn btn-sage btn-sm">Approve</button>
          </div>
          {TEACHER_PAYROLL.map((teacher, index) => (
            <div key={index} className="money-row">
              <div className="money-row-main">
                <p className="money-row-title">{teacher.teacher}</p>
                <p className="money-row-sub">{teacher.role} · Due {teacher.due}</p>
              </div>
              <div className="money-row-side">
                <p className="money-amount">{money(teacher.amount)}</p>
                <StatusTag status={teacher.status}/>
              </div>
            </div>
          ))}
        </section>
      )}

      {view === "events" && (
        <section className="card finance-section">
          <div className="sec-header">
            <div>
              <p className="serif" style={{fontSize:17,color:"#26201A"}}>Event collections</p>
              <p className="section-sub">Create ad-hoc collections and track parent payments.</p>
            </div>
            <button type="button" className="btn btn-peach btn-sm"><Ic.Plus/> Event</button>
          </div>
          {EVENT_COLLECTIONS.map((event, index) => {
            const pct = Math.round((event.collected / event.target) * 100);
            return (
              <div key={index} className="event-card">
                <div className="row-between" style={{gap:12}}>
                  <div>
                    <p className="money-row-title">{event.title}</p>
                    <p className="money-row-sub">RM{event.amountPerChild} per child · Due {event.due}</p>
                  </div>
                  <span className={`tag ${event.status === "Open" ? "tag-sage" : "tag-yellow"}`}>{event.status}</span>
                </div>
                <div className="progress-line"><span style={{width:`${pct}%`}}/></div>
                <div className="row-between">
                  <p className="money-row-sub">{event.paid}/{event.total} paid</p>
                  <p className="money-amount">{money(event.collected)} / {money(event.target)}</p>
                </div>
                <button type="button" className="btn btn-ghost btn-full"><Ic.Chat/> WhatsApp collection reminder</button>
              </div>
            );
          })}
        </section>
      )}
    </div>
  );
}
