import React, { useState } from 'react';
import SignInCard from './Components/AuthApp';
import SignUpCard from './Components/SignUpCard';
import './Auth.css';

export default function App() {
  const [activeView, setActiveView] = useState('signup');

  return (
    <div className="auth-wrapper">
      {activeView === 'signin' ? (
        <SignInCard onSwitchToSignUp={() => setActiveView('signup')} />
      ) : (
        <SignUpCard onSwitchToSignIn={() => setActiveView('signin')} />
      )}
    </div>
  );
}