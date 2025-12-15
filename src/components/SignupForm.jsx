import { useState } from 'react';
import './SignupForm.css';

const GoogleIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.874 2.684-6.615z" fill="#4285F4"/>
    <path d="M9 18c2.43 0 4.467-.806 5.956-2.184l-2.908-2.258c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332C2.438 15.983 5.482 18 9 18z" fill="#34A853"/>
    <path d="M3.964 10.707c-.18-.54-.282-1.117-.282-1.707s.102-1.167.282-1.707V4.96H.957C.348 6.175 0 7.55 0 9s.348 2.825.957 4.04l3.007-2.333z" fill="#FBBC05"/>
    <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0 5.482 0 2.438 2.017.957 4.96L3.964 7.293C4.672 5.163 6.656 3.58 9 3.58z" fill="#EA4335"/>
  </svg>
);

const ArrowRight = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" width="20" height="20">
    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
  </svg>
);

function TextInput({ label, type = 'text', placeholder, required, value, onChange, name, error, onBlur }) {
  return (
    <div className="text-input">
      {label && <label>{label}</label>}
      <div className="input-wrapper">
        <input
          type={type}
          placeholder={placeholder}
          required={required}
          value={value}
          onChange={onChange}
          name={name}
          onBlur={onBlur}
          className={error ? 'input-error' : ''}
        />
      </div>
      {error && <span className="error-message">{error}</span>}
    </div>
  );
}

export default function SignupForm() {
  const [formData, setFormData] = useState({
    email: '',
  });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.email || formData.email.trim() === '') {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    setErrors(newErrors);
    setTouched({
      email: true
    });
    return Object.keys(newErrors).length === 0;
  };

  const isFormValid = formData.email && !errors.email;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log('Signup form submitted:', formData);
    }
  };

  const handleGoogleSignup = (e) => {
    e.preventDefault();
    console.log('Continue with Google');
  };

  const handleBlur = (name) => {
    setTouched(prev => ({ ...prev, [name]: true }));
    // Validate individual field on blur
    if (!formData[name] || formData[name].trim() === '') {
      setErrors(prev => ({ ...prev, [name]: 'Email is required' }));
    } else if (name === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setErrors(prev => ({ ...prev, email: 'Please enter a valid email address' }));
    } else {
      // Clear error if field is valid
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  return (
    <div className="signup-screen">
      <div className="auth-layout">
        <div className="auth-header">
          <h2>Welcome to Spectinga</h2>
        </div>

        <div className="auth-content">
          <form className="signup-form" onSubmit={handleSubmit}>
            <button 
              type="button"
              className="button google-button" 
              onClick={handleGoogleSignup}
            >
              <GoogleIcon />
              Continue with Google
            </button>

            <div className="divider">
              <span className="divider-line"></span>
              <span className="divider-text">or</span>
              <span className="divider-line"></span>
            </div>

            <TextInput
              label="Email"
              type="email"
              placeholder=""
              required
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              error={errors.email}
              onBlur={() => handleBlur('email')}
            />

            <button type="submit" className="button primary continue-button">
              Continue with email
              <ArrowRight />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
