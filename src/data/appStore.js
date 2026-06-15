import { useCallback, useMemo, useState } from "react";

export const STORAGE_KEY = "nur-iris-saas-workspace-v1";
export const LEGACY_STORAGE_KEY = "nur-iris-tenant-data-v1";
export const DEFAULT_TENANT_ID = "tenant-demo";

export const PLAN_DEFINITIONS = {
  starter: {
    id: "starter",
    name: "Starter",
    monthlyFee: 199,
    setupFee: 1000,
    studentLimit: 100,
    staffLimit: 10,
    includedWhatsappMessages: 500,
    receiptStorageGb: 1,
  },
  growth: {
    id: "growth",
    name: "Growth",
    monthlyFee: 299,
    setupFee: 1500,
    studentLimit: 180,
    staffLimit: 20,
    includedWhatsappMessages: 1500,
    receiptStorageGb: 5,
  },
  selfHosted: {
    id: "selfHosted",
    name: "Self-hosted License",
    monthlyFee: 0,
    setupFee: 7000,
    studentLimit: 250,
    staffLimit: 30,
    includedWhatsappMessages: 0,
    receiptStorageGb: 0,
  },
};

export const SAAS_TABLES = [
  "tenants",
  "tenant_members",
  "students",
  "parents",
  "student_parent_links",
  "payments",
  "receipts",
  "event_collections",
  "payroll_items",
  "whatsapp_templates",
  "whatsapp_messages",
  "audit_logs",
];

export const EMPTY_WEEKLY_PLAN = {
  theme: "",
  focus: "",
  week: "",
  days: [],
};

export const EMPTY_APP_DATA = {
  children: [],
  students: [],
  parents: [],
  classes: [],
  announcements: [],
  photos: [],
  teacherNotes: [],
  weeklyPlan: EMPTY_WEEKLY_PLAN,
  studentPayments: [],
  teacherPayroll: [],
  eventCollections: [],
  receipts: [],
  whatsappTemplates: [],
  whatsappQueue: [],
  auditLogs: [],
};

export const EMPTY_PAYMENT_SUMMARY = {
  month: "",
  collected: 0,
  outstanding: 0,
  payrollDue: 0,
  eventCollected: 0,
  receiptCount: 0,
};

const arrayOf = value => Array.isArray(value) ? value : [];
const toMoneyNumber = value => Number.isFinite(Number(value)) ? Number(value) : 0;
const clean = value => String(value || "").trim();
const nowIso = () => new Date().toISOString();

function createId(prefix) {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return `${prefix}-${crypto.randomUUID().slice(0, 8)}`;
  }
  return `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`;
}

function monthLabel(date = new Date()) {
  return date.toLocaleDateString("en-MY", { month: "long", year: "numeric" });
}

export function todayLabel(date = new Date()) {
  return date.toLocaleDateString("en-MY", {
    weekday: "long",
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export function createDefaultTenant(overrides = {}) {
  const plan = PLAN_DEFINITIONS[overrides.planId || "starter"];
  return {
    id: overrides.id || DEFAULT_TENANT_ID,
    slug: overrides.slug || "nur-iris-demo",
    schoolName: overrides.schoolName || "New School Tenant",
    legalName: overrides.legalName || "",
    ownerName: overrides.ownerName || "",
    ownerPhone: overrides.ownerPhone || "",
    ownerEmail: overrides.ownerEmail || "",
    planId: plan.id,
    subscriptionStatus: overrides.subscriptionStatus || "trial",
    currency: "MYR",
    setupFee: plan.setupFee,
    monthlyFee: plan.monthlyFee,
    studentLimit: plan.studentLimit,
    staffLimit: plan.staffLimit,
    includedWhatsappMessages: plan.includedWhatsappMessages,
    receiptStorageGb: plan.receiptStorageGb,
    timezone: "Asia/Kuala_Lumpur",
    locale: "ms-MY",
    billingAnchorDay: 1,
    createdAt: overrides.createdAt || nowIso(),
    integrations: {
      database: { provider: "local-adapter", status: "demo", note: "Swap with Supabase/Postgres adapter when credentials are ready." },
      payments: { provider: "manual", status: "not_connected", note: "Billplz or Stripe webhook can mark invoices paid." },
      whatsapp: { provider: "manual", status: "not_connected", note: "Cloud API token must stay server-side." },
      receipts: { provider: "local-generator", status: "ready", note: "Receipt records are generated from paid payments." },
      ...(overrides.integrations || {}),
    },
    featureFlags: {
      parentPortal: true,
      autoReceipts: true,
      whatsappQueue: true,
      paymentGateway: false,
      multiBranch: false,
      ...(overrides.featureFlags || {}),
    },
  };
}

export function normalizeTenant(raw) {
  const tenant = createDefaultTenant(raw || {});
  const plan = PLAN_DEFINITIONS[tenant.planId] || PLAN_DEFINITIONS.starter;
  return {
    ...tenant,
    setupFee: toMoneyNumber(tenant.setupFee) || plan.setupFee,
    monthlyFee: toMoneyNumber(tenant.monthlyFee) || plan.monthlyFee,
    studentLimit: toMoneyNumber(tenant.studentLimit) || plan.studentLimit,
    staffLimit: toMoneyNumber(tenant.staffLimit) || plan.staffLimit,
    includedWhatsappMessages: toMoneyNumber(tenant.includedWhatsappMessages),
    receiptStorageGb: toMoneyNumber(tenant.receiptStorageGb),
    integrations: {
      ...createDefaultTenant().integrations,
      ...(tenant.integrations || {}),
    },
    featureFlags: {
      ...createDefaultTenant().featureFlags,
      ...(tenant.featureFlags || {}),
    },
  };
}

export function normalizeAppData(raw) {
  const source = raw && typeof raw === "object" ? raw : {};
  return {
    ...EMPTY_APP_DATA,
    ...source,
    children: arrayOf(source.children),
    students: arrayOf(source.students),
    parents: arrayOf(source.parents),
    classes: arrayOf(source.classes),
    announcements: arrayOf(source.announcements),
    photos: arrayOf(source.photos),
    teacherNotes: arrayOf(source.teacherNotes),
    studentPayments: arrayOf(source.studentPayments),
    teacherPayroll: arrayOf(source.teacherPayroll),
    eventCollections: arrayOf(source.eventCollections),
    receipts: arrayOf(source.receipts),
    whatsappTemplates: arrayOf(source.whatsappTemplates),
    whatsappQueue: arrayOf(source.whatsappQueue),
    auditLogs: arrayOf(source.auditLogs),
    weeklyPlan: {
      ...EMPTY_WEEKLY_PLAN,
      ...(source.weeklyPlan || {}),
      days: arrayOf(source.weeklyPlan?.days),
    },
  };
}

export function createEmptyWorkspace(seedData = EMPTY_APP_DATA) {
  const tenant = createDefaultTenant();
  return {
    version: 1,
    adapter: "localStorage",
    currentTenantId: tenant.id,
    tenants: [tenant],
    dataByTenantId: {
      [tenant.id]: normalizeAppData(seedData),
    },
  };
}

export function normalizeWorkspace(raw) {
  if (!raw || !raw.tenants || !raw.dataByTenantId) return createEmptyWorkspace(raw);
  const tenants = arrayOf(raw.tenants).map(normalizeTenant);
  const currentTenantId = tenants.some(tenant => tenant.id === raw.currentTenantId)
    ? raw.currentTenantId
    : tenants[0]?.id || DEFAULT_TENANT_ID;
  const dataByTenantId = tenants.reduce((acc, tenant) => {
    acc[tenant.id] = normalizeAppData(raw.dataByTenantId?.[tenant.id]);
    return acc;
  }, {});

  return {
    version: 1,
    adapter: raw.adapter || "localStorage",
    currentTenantId,
    tenants,
    dataByTenantId,
  };
}

export function calculatePaymentSummary(data) {
  const studentPayments = arrayOf(data?.studentPayments);
  const teacherPayroll = arrayOf(data?.teacherPayroll);
  const eventCollections = arrayOf(data?.eventCollections);

  const collected = studentPayments
    .filter(payment => payment.status === "Paid")
    .reduce((sum, payment) => sum + toMoneyNumber(payment.amount), 0);
  const outstanding = studentPayments
    .filter(payment => payment.status !== "Paid")
    .reduce((sum, payment) => sum + toMoneyNumber(payment.amount), 0);
  const payrollDue = teacherPayroll.reduce((sum, item) => sum + toMoneyNumber(item.amount), 0);
  const eventCollected = eventCollections.reduce((sum, item) => sum + toMoneyNumber(item.collected), 0);

  return {
    ...EMPTY_PAYMENT_SUMMARY,
    month: monthLabel(),
    collected,
    outstanding,
    payrollDue,
    eventCollected,
    receiptCount: arrayOf(data?.receipts).length,
  };
}

export function getTenantUsage(tenant, data) {
  const payments = arrayOf(data?.studentPayments);
  const whatsappMessages = arrayOf(data?.whatsappQueue);
  return {
    students: arrayOf(data?.students).length,
    studentLimit: tenant?.studentLimit || PLAN_DEFINITIONS.starter.studentLimit,
    staff: new Set(arrayOf(data?.teacherPayroll).map(item => item.teacher).filter(Boolean)).size,
    staffLimit: tenant?.staffLimit || PLAN_DEFINITIONS.starter.staffLimit,
    payments: payments.length,
    receipts: arrayOf(data?.receipts).length,
    whatsappMessages: whatsappMessages.length,
    includedWhatsappMessages: tenant?.includedWhatsappMessages || 0,
  };
}

export function getSaasReadiness(tenant, data) {
  const usage = getTenantUsage(tenant, data);
  return [
    { key: "tenant", label: "Tenant profile", ready: Boolean(clean(tenant?.schoolName) && tenant?.id), detail: tenant?.slug || "No slug" },
    { key: "limits", label: "Plan limits", ready: usage.students <= usage.studentLimit, detail: `${usage.students}/${usage.studentLimit} students` },
    { key: "database", label: "Database adapter", ready: tenant?.integrations?.database?.status !== "not_connected", detail: tenant?.integrations?.database?.provider || "Not set" },
    { key: "receipts", label: "Receipt generator", ready: tenant?.featureFlags?.autoReceipts, detail: `${usage.receipts} receipts` },
    { key: "whatsapp", label: "WhatsApp path", ready: tenant?.featureFlags?.whatsappQueue, detail: tenant?.integrations?.whatsapp?.provider || "Manual" },
    { key: "audit", label: "Audit trail", ready: arrayOf(data?.auditLogs).length >= 0, detail: `${arrayOf(data?.auditLogs).length} events` },
  ];
}

function readWorkspace() {
  if (typeof window === "undefined") return createEmptyWorkspace();
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored) return normalizeWorkspace(JSON.parse(stored));

    const legacy = window.localStorage.getItem(LEGACY_STORAGE_KEY);
    if (legacy) return createEmptyWorkspace(JSON.parse(legacy));

    return createEmptyWorkspace();
  } catch {
    return createEmptyWorkspace();
  }
}

function writeWorkspace(workspace) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(normalizeWorkspace(workspace)));
}

function withTenant(record, tenantId) {
  return {
    tenantId,
    createdAt: nowIso(),
    updatedAt: nowIso(),
    ...record,
  };
}

function auditEvent(action, entityType, entityId, meta = {}) {
  return {
    id: createId("audit"),
    action,
    entityType,
    entityId,
    meta,
    actorRole: "admin",
    createdAt: nowIso(),
  };
}

function studentFromInput(input, tenantId) {
  const name = clean(input.name);
  const shortName = clean(input.shortName) || name.split(" ")[0] || "Student";
  const id = createId("student");
  const avatar = clean(input.avatar) || shortName.slice(0, 1).toUpperCase() || "S";
  return withTenant({
    id,
    name,
    shortName,
    avatar,
    emoji: avatar,
    age: toMoneyNumber(input.age) || "",
    className: clean(input.className),
    teacher: clean(input.teacher),
    status: clean(input.status) || "Active",
    attendance: "Not marked today",
    pickup: clean(input.pickup) || "",
    contact: clean(input.contact),
    accent: clean(input.accent) || "#FDE8D8",
    accent2: clean(input.accent2) || "#D4EEFA",
    note: "",
    privateNote: "",
  }, tenantId);
}

function paymentFromInput(input, tenantId) {
  const status = clean(input.status) || "Due";
  const dueDate = clean(input.dueDate) || "No due date";
  const amount = toMoneyNumber(input.amount);
  const invoiceNo = clean(input.invoiceNo) || `INV-${new Date().toISOString().slice(0, 10).replaceAll("-", "")}-${Math.floor(Math.random() * 900 + 100)}`;

  return withTenant({
    id: createId("pay"),
    child: clean(input.child),
    parent: clean(input.parent),
    phone: clean(input.phone),
    className: clean(input.className),
    fee: clean(input.fee) || "Monthly Fee",
    invoiceNo,
    receiptNo: status === "Paid" ? clean(input.receiptNo) || `RCT-${invoiceNo.replace("INV-", "")}` : "Not issued",
    amount,
    status,
    paidOn: status === "Paid" ? clean(input.paidOn) || "Paid today" : `Due ${dueDate}`,
    dueDate,
    method: clean(input.method) || "Manual record",
    proofStatus: status === "Paid" ? "Verified" : "Waiting for payment",
    proofReceivedAt: status === "Paid" ? "Today" : "Not received",
    lastReminder: "Not sent",
    notes: clean(input.notes),
    reminders: [],
  }, tenantId);
}

function payrollFromInput(input, tenantId) {
  return withTenant({
    id: createId("payroll"),
    teacher: clean(input.teacher),
    role: clean(input.role),
    amount: toMoneyNumber(input.amount),
    status: clean(input.status) || "Pending approval",
    due: clean(input.due) || "No due date",
  }, tenantId);
}

function eventFromInput(input, tenantId) {
  return withTenant({
    id: createId("event"),
    title: clean(input.title),
    amountPerChild: toMoneyNumber(input.amountPerChild),
    target: toMoneyNumber(input.target),
    collected: toMoneyNumber(input.collected),
    paid: toMoneyNumber(input.paid),
    total: toMoneyNumber(input.total),
    due: clean(input.due) || "No due date",
    status: clean(input.status) || "Draft",
  }, tenantId);
}

function templateFromInput(input, tenantId) {
  return withTenant({
    id: createId("wa"),
    title: clean(input.title),
    audience: clean(input.audience),
    message: clean(input.message),
  }, tenantId);
}

function receiptFromPayment(payment, tenant) {
  const receiptNo = payment.receiptNo && payment.receiptNo !== "Not issued"
    ? payment.receiptNo
    : `RCT-${new Date().toISOString().slice(0, 10).replaceAll("-", "")}-${Math.floor(Math.random() * 900 + 100)}`;

  return withTenant({
    id: createId("receipt"),
    receiptNo,
    paymentId: payment.id,
    invoiceNo: payment.invoiceNo,
    schoolName: tenant?.schoolName || "School",
    child: payment.child,
    parent: payment.parent,
    phone: payment.phone,
    item: payment.fee || "Payment",
    amount: toMoneyNumber(payment.amount),
    currency: tenant?.currency || "MYR",
    issuedAt: nowIso(),
    channel: "whatsapp_queue",
    status: "generated",
    publicUrl: "",
  }, tenant?.id || payment.tenantId);
}

function receiptWhatsappMessage(receipt, tenantId) {
  return withTenant({
    id: createId("msg"),
    name: receipt.parent || receipt.child || "Parent",
    reason: "Payment receipt",
    child: receipt.child || "No child name",
    amount: `RM${receipt.amount.toLocaleString("en-MY")}`,
    status: "Receipt queued",
    receiptId: receipt.id,
    templateType: "utility_receipt",
  }, tenantId);
}

export function useAppData() {
  const [workspace, setWorkspace] = useState(readWorkspace);

  const commitWorkspace = useCallback(updater => {
    let nextWorkspace;
    setWorkspace(prev => {
      const current = normalizeWorkspace(prev);
      nextWorkspace = normalizeWorkspace(typeof updater === "function" ? updater(current) : updater);
      writeWorkspace(nextWorkspace);
      return nextWorkspace;
    });
    return nextWorkspace;
  }, []);

  const currentTenant = useMemo(() => {
    const normalized = normalizeWorkspace(workspace);
    return normalized.tenants.find(tenant => tenant.id === normalized.currentTenantId) || normalized.tenants[0] || createDefaultTenant();
  }, [workspace]);

  const commitTenantData = useCallback(updater => {
    const tenantId = currentTenant.id;
    return commitWorkspace(prev => {
      const currentData = normalizeAppData(prev.dataByTenantId?.[tenantId]);
      const nextData = normalizeAppData(typeof updater === "function" ? updater(currentData, currentTenant) : updater);
      return {
        ...prev,
        dataByTenantId: {
          ...prev.dataByTenantId,
          [tenantId]: nextData,
        },
      };
    });
  }, [commitWorkspace, currentTenant]);

  const actions = useMemo(() => ({
    addTenant(input = {}) {
      const tenant = normalizeTenant({ ...input, id: createId("tenant") });
      commitWorkspace(prev => ({
        ...prev,
        currentTenantId: tenant.id,
        tenants: [tenant, ...prev.tenants],
        dataByTenantId: {
          ...prev.dataByTenantId,
          [tenant.id]: normalizeAppData(),
        },
      }));
      return tenant;
    },
    switchTenant(tenantId) {
      commitWorkspace(prev => ({ ...prev, currentTenantId: tenantId }));
    },
    updateTenantProfile(patch) {
      commitWorkspace(prev => ({
        ...prev,
        tenants: prev.tenants.map(tenant => tenant.id === currentTenant.id ? normalizeTenant({ ...tenant, ...patch }) : tenant),
      }));
    },
    updateTenantPlan(planId) {
      const plan = PLAN_DEFINITIONS[planId] || PLAN_DEFINITIONS.starter;
      commitWorkspace(prev => ({
        ...prev,
        tenants: prev.tenants.map(tenant => tenant.id === currentTenant.id ? normalizeTenant({
          ...tenant,
          planId: plan.id,
          setupFee: plan.setupFee,
          monthlyFee: plan.monthlyFee,
          studentLimit: plan.studentLimit,
          staffLimit: plan.staffLimit,
          includedWhatsappMessages: plan.includedWhatsappMessages,
          receiptStorageGb: plan.receiptStorageGb,
        }) : tenant),
      }));
    },
    updateIntegration(key, patch) {
      commitWorkspace(prev => ({
        ...prev,
        tenants: prev.tenants.map(tenant => tenant.id === currentTenant.id ? normalizeTenant({
          ...tenant,
          integrations: {
            ...tenant.integrations,
            [key]: { ...(tenant.integrations?.[key] || {}), ...patch },
          },
        }) : tenant),
      }));
    },
    addStudent(input) {
      const student = studentFromInput(input, currentTenant.id);
      commitTenantData(prev => ({
        ...prev,
        students: [student, ...prev.students],
        children: [student, ...prev.children],
        auditLogs: [auditEvent("create", "student", student.id, { name: student.name }), ...prev.auditLogs],
      }));
      return student;
    },
    deleteStudent(id) {
      commitTenantData(prev => ({
        ...prev,
        students: prev.students.filter(student => student.id !== id),
        children: prev.children.filter(child => child.id !== id),
        auditLogs: [auditEvent("delete", "student", id), ...prev.auditLogs],
      }));
    },
    addPayment(input) {
      const payment = paymentFromInput(input, currentTenant.id);
      commitTenantData(prev => ({
        ...prev,
        studentPayments: [payment, ...prev.studentPayments],
        auditLogs: [auditEvent("create", "payment", payment.id, { amount: payment.amount }), ...prev.auditLogs],
      }));
      return payment;
    },
    updatePayment(id, patch) {
      commitTenantData(prev => ({
        ...prev,
        studentPayments: prev.studentPayments.map(payment => payment.id === id ? { ...payment, ...patch, updatedAt: nowIso() } : payment),
        auditLogs: [auditEvent("update", "payment", id, patch), ...prev.auditLogs],
      }));
    },
    markPaymentPaid(id) {
      let result = null;
      commitTenantData(prev => {
        const existing = prev.studentPayments.find(payment => payment.id === id);
        if (!existing) return prev;
        const receipt = prev.receipts.find(item => item.paymentId === id) || receiptFromPayment(existing, currentTenant);
        const paidPayment = {
          ...existing,
          status: "Paid",
          paidOn: "Paid today",
          receiptNo: receipt.receiptNo,
          method: existing.method || "Manual record",
          proofStatus: "Verified",
          proofReceivedAt: "Today",
          updatedAt: nowIso(),
        };
        const hasReceipt = prev.receipts.some(item => item.paymentId === id);
        const queuedMessage = receiptWhatsappMessage(receipt, currentTenant.id);
        result = { payment: paidPayment, receipt };
        return {
          ...prev,
          studentPayments: prev.studentPayments.map(payment => payment.id === id ? paidPayment : payment),
          receipts: hasReceipt ? prev.receipts : [receipt, ...prev.receipts],
          whatsappQueue: [queuedMessage, ...prev.whatsappQueue],
          auditLogs: [auditEvent("paid", "payment", id, { receiptNo: receipt.receiptNo }), ...prev.auditLogs],
        };
      });
      return result;
    },
    deletePayment(id) {
      commitTenantData(prev => ({
        ...prev,
        studentPayments: prev.studentPayments.filter(payment => payment.id !== id),
        receipts: prev.receipts.filter(receipt => receipt.paymentId !== id),
        whatsappQueue: prev.whatsappQueue.filter(message => message.receiptId !== id),
        auditLogs: [auditEvent("delete", "payment", id), ...prev.auditLogs],
      }));
    },
    addPayroll(input) {
      const payroll = payrollFromInput(input, currentTenant.id);
      commitTenantData(prev => ({
        ...prev,
        teacherPayroll: [payroll, ...prev.teacherPayroll],
        auditLogs: [auditEvent("create", "payroll", payroll.id, { amount: payroll.amount }), ...prev.auditLogs],
      }));
      return payroll;
    },
    deletePayroll(id) {
      commitTenantData(prev => ({
        ...prev,
        teacherPayroll: prev.teacherPayroll.filter(item => item.id !== id),
        auditLogs: [auditEvent("delete", "payroll", id), ...prev.auditLogs],
      }));
    },
    addEvent(input) {
      const event = eventFromInput(input, currentTenant.id);
      commitTenantData(prev => ({
        ...prev,
        eventCollections: [event, ...prev.eventCollections],
        auditLogs: [auditEvent("create", "event_collection", event.id, { target: event.target }), ...prev.auditLogs],
      }));
      return event;
    },
    deleteEvent(id) {
      commitTenantData(prev => ({
        ...prev,
        eventCollections: prev.eventCollections.filter(item => item.id !== id),
        auditLogs: [auditEvent("delete", "event_collection", id), ...prev.auditLogs],
      }));
    },
    addWhatsappTemplate(input) {
      const template = templateFromInput(input, currentTenant.id);
      commitTenantData(prev => ({
        ...prev,
        whatsappTemplates: [template, ...prev.whatsappTemplates],
        auditLogs: [auditEvent("create", "whatsapp_template", template.id), ...prev.auditLogs],
      }));
      return template;
    },
    deleteWhatsappTemplate(id) {
      commitTenantData(prev => ({
        ...prev,
        whatsappTemplates: prev.whatsappTemplates.filter(template => template.id !== id),
        auditLogs: [auditEvent("delete", "whatsapp_template", id), ...prev.auditLogs],
      }));
    },
    addTeacherNote(input) {
      const note = withTenant({
        id: createId("note"),
        student: clean(input.student),
        note: clean(input.note),
        date: "Today",
      }, currentTenant.id);
      commitTenantData(prev => ({
        ...prev,
        teacherNotes: [note, ...prev.teacherNotes],
        auditLogs: [auditEvent("create", "teacher_note", note.id), ...prev.auditLogs],
      }));
      return note;
    },
    resetTenantData() {
      commitTenantData({
        ...EMPTY_APP_DATA,
        auditLogs: [auditEvent("reset", "tenant_data", currentTenant.id)],
      });
    },
    resetAll() {
      commitWorkspace(createEmptyWorkspace());
    },
  }), [commitTenantData, commitWorkspace, currentTenant]);

  const normalizedWorkspace = useMemo(() => normalizeWorkspace(workspace), [workspace]);
  const tenant = useMemo(() => {
    return normalizedWorkspace.tenants.find(item => item.id === normalizedWorkspace.currentTenantId) || normalizedWorkspace.tenants[0] || createDefaultTenant();
  }, [normalizedWorkspace]);
  const data = useMemo(() => {
    const normalized = normalizeAppData(normalizedWorkspace.dataByTenantId?.[tenant.id]);
    return {
      ...normalized,
      paymentSummary: calculatePaymentSummary(normalized),
    };
  }, [normalizedWorkspace, tenant.id]);
  const usage = useMemo(() => getTenantUsage(tenant, data), [tenant, data]);
  const readiness = useMemo(() => getSaasReadiness(tenant, data), [tenant, data]);

  return {
    workspace: normalizedWorkspace,
    tenant,
    plans: PLAN_DEFINITIONS,
    saasTables: SAAS_TABLES,
    usage,
    readiness,
    data,
    actions,
  };
}
