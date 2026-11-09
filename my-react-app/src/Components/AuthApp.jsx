import React, { useState } from 'react';
import '../Auth.css';
import { 
  signInWithEmailAndPassword, 
  GoogleAuthProvider, 
  signInWithPopup 
} from 'firebase/auth';
import { auth } from '../Firebase';

// Testing ke liye localhost, deploy karne par apna live Dashboard URL yahan daalein
const DASHBOARD_URL = "https://bookdashboard-coral.vercel.app";

export default function AuthApp({ onSwitchToSignUp }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  // 1. Google Sign-In Handler
  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      setLoading(true);
      const result = await signInWithPopup(auth, provider);
      console.log("Google User:", result.user);
      
      // Dashboard ko auth flag ke sath redirect karein
      window.location.href = `${DASHBOARD_URL}?auth=true`;
    } catch (error) {
      console.error("Google Auth Error:", error.message);
      alert("Google Sign-In Failed: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  // 2. Email & Password Sign-In Handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log("Logged In User:", userCredential.user);
      
      // Dashboard ko auth flag ke sath redirect karein
      window.location.href = `${DASHBOARD_URL}?auth=true`;
    } catch (error) {
      console.error("SignIn Error:", error.message);
      alert("Login Failed: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-card">
      {/* Tabs */}
      <div className="tabs-header">
        <button type="button" className="tab-btn active">
          Sign In
        </button>
        <button 
          type="button" 
          className="tab-btn" 
          onClick={onSwitchToSignUp}
        >
          Sign Up
        </button>
      </div>

      {/* Header */}
      <div className="auth-header">
        <h2>Welcome Back</h2>
        <p>Sign in to access your dashboard</p>
      </div>

      {/* Google Sign In Button */}
      <button 
        type="button" 
        className="google-btn" 
        onClick={handleGoogleSignIn}
        disabled={loading}
      >
        <svg className="google-svg" viewBox="0 0 24 24">
          <path
            fill="#4285F4"
            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
          />
          <path
            fill="#34A853"
            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
          />
          <path
            fill="#FBBC05"
            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
          />
          <path
            fill="#EA4335"
            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
          />
        </svg>
        <span>Sign in with Google</span>
      </button>

      {/* OR Divider */}
      <div className="divider-row">
        <span className="divider-line"></span>
        <span className="divider-text">OR</span>
        <span className="divider-line"></span>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="auth-form">
        <div className="form-group">
          <label htmlFor="email">Email Address</label>
          <input
            type="email"
            id="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        {/* Password with Eye Icon */}
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <div className="password-input-wrapper">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="button"
              className="eye-toggle-btn"
              onClick={() => setShowPassword(!showPassword)}
              aria-label="Toggle password visibility"
            >
              {showPassword ? (
                // Eye Off Icon
                <svg viewBox="0 0 24 24">
                  <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                  <line x1="1" y1="1" x2="23" y2="23" />
                </svg>
              ) : (
                // Eye Open Icon
                <svg viewBox="0 0 24 24">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              )}
            </button>
          </div>
        </div>

        <button type="submit" className="submit-btn" disabled={loading}>
          {loading ? "Signing In..." : "Sign In"}
        </button>
      </form>
    </div>
  );
}