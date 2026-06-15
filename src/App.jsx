import { useState } from "react";
import "./styles/global.css";
import LoginScreen from "./components/LoginScreen.jsx";
import ParentApp from "./pages/parent/ParentApp.jsx";
import TeacherApp from "./pages/teacher/TeacherApp.jsx";
import AdminApp from "./pages/admin/AdminApp.jsx";
import { useAppData } from "./data/appStore.js";

export default function NurIrisPortal() {
  const [role, setRole] = useState(null);
  const appData = useAppData();

  return (
    <>
      {!role
        ? <LoginScreen onLogin={setRole}/>
        : role === "parent"  ? <ParentApp  onLogout={() => setRole(null)} {...appData}/>
        : role === "teacher" ? <TeacherApp onLogout={() => setRole(null)} {...appData}/>
        :                     <AdminApp   onLogout={() => setRole(null)} {...appData}/>
      }
    </>
  );
}
