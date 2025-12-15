import { useState } from 'react';
import './LoginForm.css';

const ChevronRight = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 8 12" width="8" height="12">
    <path fill="currentColor" d="m1.4 0-1.075 1.075L5.25 6 .325 10.925 1.4 12l6-6z"></path>
  </svg>
);

function TextInput({ label, type = 'text', placeholder, required, value, onChange, name, error, onBlur }) {
  const isCompleted = value && value.trim() !== '' && !error;
  
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
          className={`${error ? 'input-error' : ''} ${isCompleted ? 'input-completed' : ''}`}
        />
        {isCompleted && (
          <span className="input-checkmark">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
          </span>
        )}
      </div>
      {error && <span className="error-message">{error}</span>}
    </div>
  );
}

export default function LoginForm({ onSwitchToSignup }) {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
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
    
    if (!formData.password || formData.password.trim() === '') {
      newErrors.password = 'Password is required';
    }
    
    setErrors(newErrors);
    setTouched({
      email: true,
      password: true
    });
    return Object.keys(newErrors).length === 0;
  };

  const isFormValid = formData.email && formData.password;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log('Login form submitted:', formData);
    }
  };

  const handleBlur = (name) => {
    setTouched(prev => ({ ...prev, [name]: true }));
    // Validate individual field on blur
    if (!formData[name] || formData[name].trim() === '') {
      setErrors(prev => ({ ...prev, [name]: `${name === 'email' ? 'Email' : 'Password'} is required` }));
    } else if (name === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setErrors(prev => ({ ...prev, email: 'Please enter a valid email address' }));
    } else {
      // Clear error if field is valid
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  return (
    <div className="login-screen">
      <div className="auth-layout">
        <div className="auth-header">
          <h2>Welcome back</h2>
          <p className="auth-description">Enter your details to access your account</p>
        </div>

        <div className="auth-content">
          <form className="login-form" onSubmit={handleSubmit}>
            <TextInput
              label="Email"
              type="email"
              placeholder="Email"
              required
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              error={errors.email}
              onBlur={() => handleBlur('email')}
            />

            <TextInput
              label="Password"
              type="password"
              placeholder="Password"
              required
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              error={errors.password}
              onBlur={() => handleBlur('password')}
            />

            <div className="forgot-password">
              <a href="#forgot-password" className="link">Forgot password?</a>
            </div>

            <button type="submit" className="button primary" disabled={!isFormValid}>
              Login
              <ChevronRight />
            </button>

            <div className="signup-link-section">
              <p className="signup-link-text">
                New to Spectinga?{' '}
                <button 
                  type="button"
                  className="link signup-link-button" 
                  onClick={onSwitchToSignup}
                >
                  Sign up
                </button>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

