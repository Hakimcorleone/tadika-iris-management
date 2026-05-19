// ─────────────────────────────────────────────
// LOGIN SCREEN
// ─────────────────────────────────────────────
import { useState } from "react";
import { Ic } from "./icon.jsx";

export default function LoginScreen({ onLogin }) {
  const [selectedRole, setSelectedRole] = useState(null);
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [step, setStep] = useState("role"); // role | credentials

  const roles = [
    { id:"parent",  emoji:"👨‍👩‍👧", label:"Parent / Ibu Bapa", sub:"View your child's daily updates", bg:"#FDE8D8" },
    { id:"teacher", emoji:"📚",     label:"Teacher / Guru",      sub:"Manage classes and updates",        bg:"#DBF0D0" },
    { id:"admin",   emoji:"🏫",     label:"Admin / Pentadbir",   sub:"Full system access",               bg:"#D4EEFA" },
  ];

  return (
    <div className="login-page">
      {/* Logo */}
      <div style={{textAlign:"center",marginBottom:8}}>
        <div style={{width:76,height:76,background:"white",borderRadius:24,display:"flex",alignItems:"center",justifyContent:"center",fontSize:38,boxShadow:"0 8px 32px rgba(242,160,123,.28)",margin:"0 auto 16px"}}>🌸</div>
        <p className="serif" style={{fontSize:26,color:"#26201A",marginBottom:4}}>Nur Iris</p>
        <p style={{fontSize:13,color:"#7A6E66",fontWeight:600,letterSpacing:.4}}>PARENT PORTAL</p>
      </div>

      <div className="login-card" style={{marginTop:24}}>
        {step === "role" ? (
          <>
            <p className="serif" style={{fontSize:20,color:"#26201A",marginBottom:4}}>Welcome back 👋</p>
            <p style={{fontSize:13,color:"#7A6E66",marginBottom:20}}>Choose your role to continue.</p>
            {roles.map(r => (
              <button key={r.id} className={`role-btn${selectedRole===r.id?" selected":""}`} onClick={()=>setSelectedRole(r.id)}>
                <span className="role-icon" style={{background:r.bg}}>{r.emoji}</span>
                <div style={{flex:1}}>
                  <div style={{fontSize:14,fontWeight:700,color:"#26201A"}}>{r.label}</div>
                  <div style={{fontSize:12,color:"#7A6E66"}}>{r.sub}</div>
                </div>
                {selectedRole===r.id && <span style={{color:"#F2A07B"}}><Ic.Check/></span>}
              </button>
            ))}
            <button className="btn btn-peach btn-full" style={{marginTop:8}} disabled={!selectedRole} onClick={()=>setStep("credentials")}>
              Continue →
            </button>
          </>
        ) : (
          <>
            <button onClick={()=>setStep("role")} style={{background:"none",border:"none",color:"#7A6E66",fontSize:13,fontWeight:700,cursor:"pointer",marginBottom:16,fontFamily:"'Nunito',sans-serif",display:"flex",alignItems:"center",gap:6}}>
              ← Back
            </button>
            <p className="serif" style={{fontSize:20,color:"#26201A",marginBottom:4}}>Sign in</p>
            <p style={{fontSize:13,color:"#7A6E66",marginBottom:20}}>
              {roles.find(r=>r.id===selectedRole)?.emoji} {roles.find(r=>r.id===selectedRole)?.label}
            </p>
            <label style={{fontSize:12,fontWeight:700,color:"#7A6E66",display:"block",marginBottom:6,letterSpacing:.3}}>EMAIL ADDRESS</label>
            <input className="inp" type="email" placeholder="your@email.com" value={email} onChange={e=>setEmail(e.target.value)} />
            <label style={{fontSize:12,fontWeight:700,color:"#7A6E66",display:"block",marginBottom:6,letterSpacing:.3}}>PASSWORD</label>
            <input className="inp" type="password" placeholder="••••••••" value={pass} onChange={e=>setPass(e.target.value)} />
            <div style={{textAlign:"right",marginBottom:20}}>
              <span style={{fontSize:12,color:"#F2A07B",fontWeight:700,cursor:"pointer"}}>Forgot password?</span>
            </div>
            <button className="btn btn-peach btn-full" onClick={()=>onLogin(selectedRole)}>
              Sign In to Portal
            </button>
            <div style={{textAlign:"center",marginTop:14}}>
              <span style={{fontSize:12,color:"#ABA099"}}>Demo: click Sign In to enter the app</span>
            </div>
          </>
        )}
      </div>

      <p style={{marginTop:24,fontSize:11,color:"#ABA099",textAlign:"center"}}>
        © 2026 Nur Iris Preschool · All rights reserved
      </p>
    </div>
  );
}
