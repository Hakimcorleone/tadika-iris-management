import { useState } from "react";
import { Ic } from "./icon.jsx";

export default function LoginScreen({ onLogin }) {
  const [selectedRole, setSelectedRole] = useState(null);
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [step, setStep] = useState("role");

  const roles = [
    { id:"parent",  emoji:"👨‍👩‍👧", label:"Parent / Ibu Bapa", sub:"View your child's daily updates", bg:"#FDE8D8" },
    { id:"teacher", emoji:"📚",     label:"Teacher / Guru",      sub:"Manage classes and updates",        bg:"#DBF0D0" },
    { id:"admin",   emoji:"🏫",     label:"Admin / Pentadbir",   sub:"Full system access",               bg:"#D4EEFA" },
  ];

  const activeRole = roles.find(role => role.id === selectedRole);

  return (
    <div className="login-page">
      <div className="portal-brand" aria-label="Nur Iris Portal">
        <div className="portal-logo" aria-hidden="true">🌸</div>
        <p className="serif portal-name">Nur Iris</p>
        <p className="portal-eyebrow">SCHOOL PORTAL</p>
      </div>

      <div className="login-card" style={{marginTop:24}}>
        {step === "role" ? (
          <>
            <p className="serif login-title">Welcome back 👋</p>
            <p className="login-subtitle">Choose your workspace to continue.</p>
            {roles.map(r => (
              <button
                key={r.id}
                type="button"
                className={`role-btn${selectedRole===r.id?" selected":""}`}
                onClick={()=>setSelectedRole(r.id)}
                aria-pressed={selectedRole===r.id}
              >
                <span className="role-icon" style={{background:r.bg}} aria-hidden="true">{r.emoji}</span>
                <span style={{flex:1}}>
                  <span className="role-label">{r.label}</span>
                  <span className="role-subtitle">{r.sub}</span>
                </span>
                {selectedRole===r.id && <span className="role-check" aria-hidden="true"><Ic.Check/></span>}
              </button>
            ))}
            <button
              className="btn btn-peach btn-full"
              style={{marginTop:8}}
              type="button"
              disabled={!selectedRole}
              onClick={()=>setStep("credentials")}
            >
              Continue →
            </button>
          </>
        ) : (
          <form onSubmit={(event)=>{ event.preventDefault(); onLogin(selectedRole); }}>
            <button type="button" className="back-link" onClick={()=>setStep("role")}>
              ← Back
            </button>
            <p className="serif login-title">Sign in</p>
            <p className="role-pill">
              <span aria-hidden="true">{activeRole?.emoji}</span> {activeRole?.label}
            </p>
            <label className="form-label" htmlFor="portal-email">EMAIL ADDRESS</label>
            <input
              id="portal-email"
              className="inp"
              type="email"
              placeholder="your@email.com"
              value={email}
              autoComplete="email"
              onChange={e=>setEmail(e.target.value)}
            />
            <label className="form-label" htmlFor="portal-password">PASSWORD</label>
            <input
              id="portal-password"
              className="inp"
              type="password"
              placeholder="••••••••"
              value={pass}
              autoComplete="current-password"
              onChange={e=>setPass(e.target.value)}
            />
            <div style={{textAlign:"right",marginBottom:20}}>
              <button type="button" className="link-btn">Forgot password?</button>
            </div>
            <button className="btn btn-peach btn-full" type="submit">
              Sign In to Portal
            </button>
            <p className="demo-note">Demo mode: sign in to preview the selected workspace.</p>
          </form>
        )}
      </div>

      <p className="footer-note">
        © 2026 Nur Iris Preschool · All rights reserved
      </p>
    </div>
  );
}
