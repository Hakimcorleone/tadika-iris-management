import { useMemo, useState } from "react";
import { Ic } from "../../components/icon.jsx";

const blankStudent = {
  name: "",
  shortName: "",
  age: "",
  className: "",
  teacher: "",
  contact: "",
  pickup: "",
};

function EmptyState() {
  return (
    <div className="empty-state">
      <p className="serif">No students yet</p>
      <span>Add the first child profile here. Parent view will stay empty until real profiles exist.</span>
    </div>
  );
}

export default function AdminStudents({ onLogout, data, actions }) {
  const [query, setQuery] = useState("");
  const [form, setForm] = useState(blankStudent);
  const students = data?.students || [];

  const filteredStudents = useMemo(() => {
    const needle = query.trim().toLowerCase();
    if (!needle) return students;
    return students.filter(student => [student.name, student.className, student.teacher, student.contact]
      .join(" ")
      .toLowerCase()
      .includes(needle));
  }, [query, students]);

  function updateField(field, value) {
    setForm(prev => ({ ...prev, [field]: value }));
  }

  function addStudent(event) {
    event.preventDefault();
    if (!form.name.trim()) return;
    actions.addStudent(form);
    setForm(blankStudent);
  }

  return (
    <div className="scroll-top fi admin-students">
      <div className="top-bar row-between">
        <div>
          <p style={{fontSize:11,fontWeight:800,color:"#ABA099",letterSpacing:.5,textTransform:"uppercase"}}>Tenant records</p>
          <p className="serif" style={{fontSize:20,color:"#26201A"}}>Students</p>
        </div>
        <button type="button" aria-label="Log out" onClick={onLogout} className="icon-btn"><Ic.Out/></button>
      </div>

      <section className="card finance-section">
        <div className="sec-header">
          <div>
            <p className="serif" style={{fontSize:17,color:"#26201A"}}>Add child profile</p>
            <p className="section-sub">Use real records only. This also powers the parent child switcher.</p>
          </div>
          <span className="tag tag-sky">{students.length} total</span>
        </div>

        <form className="admin-form" onSubmit={addStudent}>
          <div className="form-grid two">
            <label className="form-field">
              <span>Child name</span>
              <input value={form.name} onChange={event => updateField("name", event.target.value)} placeholder="Full name" required />
            </label>
            <label className="form-field">
              <span>Short name</span>
              <input value={form.shortName} onChange={event => updateField("shortName", event.target.value)} placeholder="Display name" />
            </label>
            <label className="form-field">
              <span>Age</span>
              <input value={form.age} onChange={event => updateField("age", event.target.value)} inputMode="numeric" placeholder="Age" />
            </label>
            <label className="form-field">
              <span>Class</span>
              <input value={form.className} onChange={event => updateField("className", event.target.value)} placeholder="Class name" />
            </label>
            <label className="form-field">
              <span>Teacher</span>
              <input value={form.teacher} onChange={event => updateField("teacher", event.target.value)} placeholder="Teacher name" />
            </label>
            <label className="form-field">
              <span>Pickup</span>
              <input value={form.pickup} onChange={event => updateField("pickup", event.target.value)} placeholder="Pickup time" />
            </label>
          </div>
          <label className="form-field">
            <span>Parent contact</span>
            <input value={form.contact} onChange={event => updateField("contact", event.target.value)} placeholder="Parent name and phone" />
          </label>
          <button className="btn btn-peach btn-full" type="submit"><Ic.Plus/> Add student</button>
        </form>
      </section>

      <section className="card finance-section">
        <div className="sec-header">
          <div>
            <p className="serif" style={{fontSize:17,color:"#26201A"}}>Student directory</p>
            <p className="section-sub">Search and remove records from this tenant preview.</p>
          </div>
          <span className="badge">{filteredStudents.length}</span>
        </div>

        <input className="inp" placeholder="Search students, class, teacher..." value={query} onChange={event => setQuery(event.target.value)} />

        {filteredStudents.length === 0 ? <EmptyState/> : filteredStudents.map(student => (
          <div key={student.id} className="money-row student-row">
            <div className="avatar-c" style={{background:student.accent || "#FDE8D8"}}>{student.avatar || student.name?.slice(0, 1)}</div>
            <div className="money-row-main">
              <p className="money-row-title">{student.name}</p>
              <p className="money-row-sub">{student.className || "No class"} {student.age ? `- Age ${student.age}` : ""}</p>
              <p className="money-row-sub">{student.teacher || "No teacher"} - {student.contact || "No parent contact"}</p>
            </div>
            <button type="button" className="danger-icon-btn" aria-label={`Delete ${student.name}`} onClick={() => actions.deleteStudent(student.id)}>
              <Ic.X/>
            </button>
          </div>
        ))}
      </section>
    </div>
  );
}
