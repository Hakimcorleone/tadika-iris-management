import { useState } from "react";
import "./styles/global.css";
import LoginScreen from "./components/LoginScreen.jsx";
import ParentApp from "./pages/parent/ParentApp.jsx";
import TeacherApp from "./pages/teacher/TeacherApp.jsx";
import AdminApp from "./pages/admin/AdminApp.jsx";

// ─────────────────────────────────────────────
// ROOT
// ─────────────────────────────────────────────
export default function NurIrisPortal() {
  const [role, setRole] = useState(null);
  return (
    <>
      {!role
        ? <LoginScreen onLogin={setRole}/>
        : role==="parent"  ? <ParentApp  onLogout={()=>setRole(null)}/>
        : role==="teacher" ? <TeacherApp onLogout={()=>setRole(null)}/>
        :                    <AdminApp   onLogout={()=>setRole(null)}/>
      }
    </>
  );
}