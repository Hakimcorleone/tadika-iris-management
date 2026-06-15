import { useCallback, useMemo, useState } from "react";

export const STORAGE_KEY = "nur-iris-tenant-data-v1";

export const EMPTY_WEEKLY_PLAN = {
  theme: "",
  focus: "",
  week: "",
  days: [],
};

export const EMPTY_APP_DATA = {
  children: [],
  students: [],
  classes: [],
  announcements: [],
  photos: [],
  teacherNotes: [],
  weeklyPlan: EMPTY_WEEKLY_PLAN,
  studentPayments: [],
  teacherPayroll: [],
  eventCollections: [],
  whatsappTemplates: [],
  whatsappQueue: [],
};

export const EMPTY_PAYMENT_SUMMARY = {
  month: "",
  collected: 0,
  outstanding: 0,
  payrollDue: 0,
  eventCollected: 0,
};

const arrayOf = value => Array.isArray(value) ? value : [];
const toMoneyNumber = value => Number.isFinite(Number(value)) ? Number(value) : 0;
const clean = value => String(value || "").trim();

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

export function normalizeAppData(raw) {
  const source = raw && typeof raw === "object" ? raw : {};
  return {
    ...EMPTY_APP_DATA,
    ...source,
    children: arrayOf(source.children),
    students: arrayOf(source.students),
    classes: arrayOf(source.classes),
    announcements: arrayOf(source.announcements),
    photos: arrayOf(source.photos),
    teacherNotes: arrayOf(source.teacherNotes),
    studentPayments: arrayOf(source.studentPayments),
    teacherPayroll: arrayOf(source.teacherPayroll),
    eventCollections: arrayOf(source.eventCollections),
    whatsappTemplates: arrayOf(source.whatsappTemplates),
    whatsappQueue: arrayOf(source.whatsappQueue),
    weeklyPlan: {
      ...EMPTY_WEEKLY_PLAN,
      ...(source.weeklyPlan || {}),
      days: arrayOf(source.weeklyPlan?.days),
    },
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
  };
}

function readStoredData() {
  if (typeof window === "undefined") return EMPTY_APP_DATA;
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    return normalizeAppData(stored ? JSON.parse(stored) : EMPTY_APP_DATA);
  } catch {
    return EMPTY_APP_DATA;
  }
}

function writeStoredData(data) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(normalizeAppData(data)));
}

function studentFromInput(input) {
  const name = clean(input.name);
  const shortName = clean(input.shortName) || name.split(" ")[0] || "Student";
  const id = createId("student");
  const avatar = clean(input.avatar) || shortName.slice(0, 1).toUpperCase() || "S";
  const base = {
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
  };
  return base;
}

function paymentFromInput(input) {
  const status = clean(input.status) || "Due";
  const dueDate = clean(input.dueDate) || "No due date";
  const amount = toMoneyNumber(input.amount);
  const invoiceNo = clean(input.invoiceNo) || `INV-${new Date().toISOString().slice(0, 10).replaceAll("-", "")}-${Math.floor(Math.random() * 900 + 100)}`;

  return {
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
  };
}

function payrollFromInput(input) {
  return {
    id: createId("payroll"),
    teacher: clean(input.teacher),
    role: clean(input.role),
    amount: toMoneyNumber(input.amount),
    status: clean(input.status) || "Pending approval",
    due: clean(input.due) || "No due date",
  };
}

function eventFromInput(input) {
  const target = toMoneyNumber(input.target);
  const collected = toMoneyNumber(input.collected);
  const total = toMoneyNumber(input.total);
  const paid = toMoneyNumber(input.paid);

  return {
    id: createId("event"),
    title: clean(input.title),
    amountPerChild: toMoneyNumber(input.amountPerChild),
    target,
    collected,
    paid,
    total,
    due: clean(input.due) || "No due date",
    status: clean(input.status) || "Draft",
  };
}

function templateFromInput(input) {
  return {
    id: createId("wa"),
    title: clean(input.title),
    audience: clean(input.audience),
    message: clean(input.message),
  };
}

export function useAppData() {
  const [storedData, setStoredData] = useState(readStoredData);

  const commit = useCallback(updater => {
    let nextData;
    setStoredData(prev => {
      const current = normalizeAppData(prev);
      nextData = normalizeAppData(typeof updater === "function" ? updater(current) : updater);
      writeStoredData(nextData);
      return nextData;
    });
    return nextData;
  }, []);

  const actions = useMemo(() => ({
    addStudent(input) {
      const student = studentFromInput(input);
      commit(prev => ({
        ...prev,
        students: [student, ...prev.students],
        children: [student, ...prev.children],
      }));
      return student;
    },
    deleteStudent(id) {
      commit(prev => ({
        ...prev,
        students: prev.students.filter(student => student.id !== id),
        children: prev.children.filter(child => child.id !== id),
      }));
    },
    addPayment(input) {
      const payment = paymentFromInput(input);
      commit(prev => ({ ...prev, studentPayments: [payment, ...prev.studentPayments] }));
      return payment;
    },
    updatePayment(id, patch) {
      commit(prev => ({
        ...prev,
        studentPayments: prev.studentPayments.map(payment => payment.id === id ? { ...payment, ...patch } : payment),
      }));
    },
    deletePayment(id) {
      commit(prev => ({ ...prev, studentPayments: prev.studentPayments.filter(payment => payment.id !== id) }));
    },
    addPayroll(input) {
      const payroll = payrollFromInput(input);
      commit(prev => ({ ...prev, teacherPayroll: [payroll, ...prev.teacherPayroll] }));
      return payroll;
    },
    deletePayroll(id) {
      commit(prev => ({ ...prev, teacherPayroll: prev.teacherPayroll.filter(item => item.id !== id) }));
    },
    addEvent(input) {
      const event = eventFromInput(input);
      commit(prev => ({ ...prev, eventCollections: [event, ...prev.eventCollections] }));
      return event;
    },
    deleteEvent(id) {
      commit(prev => ({ ...prev, eventCollections: prev.eventCollections.filter(item => item.id !== id) }));
    },
    addWhatsappTemplate(input) {
      const template = templateFromInput(input);
      commit(prev => ({ ...prev, whatsappTemplates: [template, ...prev.whatsappTemplates] }));
      return template;
    },
    deleteWhatsappTemplate(id) {
      commit(prev => ({ ...prev, whatsappTemplates: prev.whatsappTemplates.filter(template => template.id !== id) }));
    },
    addTeacherNote(input) {
      const note = {
        id: createId("note"),
        student: clean(input.student),
        note: clean(input.note),
        date: "Today",
      };
      commit(prev => ({ ...prev, teacherNotes: [note, ...prev.teacherNotes] }));
      return note;
    },
    resetAll() {
      commit(EMPTY_APP_DATA);
    },
  }), [commit]);

  const data = useMemo(() => {
    const normalized = normalizeAppData(storedData);
    return {
      ...normalized,
      paymentSummary: calculatePaymentSummary(normalized),
    };
  }, [storedData]);

  return { data, actions };
}
