import { useState } from 'react';
import './SignupForm.css';

const RegisterIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 40 40" width="40" height="40">
    <circle cx="20" cy="20" r="20" fill="#2E44ED"></circle>
    <path stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m24 26 3-3m0 0 3 3m-3-3v6m-7-5.5h-4.5c-1.396 0-2.093 0-2.661.172a4 4 0 0 0-2.667 2.667C10 26.907 10 27.604 10 29m12.5-13.5a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0"></path>
  </svg>
);

const ChevronDown = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 12 8" width="12" height="8">
    <path fill="#5f6e95" d="m6 7.375-6-6L1.075.3 6 5.25 10.925.325 12 1.4z"></path>
  </svg>
);

const CheckboxUnchecked = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" width="24" height="24">
    <mask id="a" width="24" height="24" x="0" y="0" maskUnits="userSpaceOnUse">
      <path fill="#D9D9D9" d="M0 0h24v24H0z"></path>
    </mask>
    <g mask="url(#a)">
      <path fill="#5f6e95" d="M3.5 20.5v-17h17v17zM5 19h14V5H5z"></path>
    </g>
  </svg>
);

const CheckboxChecked = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" width="24" height="24">
    <mask id="a" width="24" height="24" x="0" y="0" maskUnits="userSpaceOnUse">
      <path fill="#D9D9D9" d="M0 0h24v24H0z"></path>
    </mask>
    <g mask="url(#a)">
      <path fill="#2e44ed" d="M3.5 20.5v-17h17v17zM5 19h14V5H5z"></path>
      <path fill="#2e44ed" d="M10.6 16.2l-3.65-3.65 1.05-1.05 2.6 2.6 5.95-5.95 1.05 1.05z"></path>
    </g>
  </svg>
);

const GBFlag = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 480" width="24" height="18">
    <path fill="#012169" d="M0 0h640v480H0z"/>
    <path fill="#FFF" d="m75 0 244 181L562 0h78v62L400 241l240 178v61h-80L320 301 81 480H0v-60l239-178L0 64V0z"/>
    <path fill="#C8102E" d="m424 281 216 159v40L369 281zm-184 20 6 35L54 480H0zM640 0v3L391 191l2-44L590 0zM0 0l239 176h-60L0 42z"/>
    <path fill="#FFF" d="M241 0v480h160V0zM0 160v160h640V160z"/>
    <path fill="#C8102E" d="M0 193v96h640v-96zM273 0v480h96V0z"/>
  </svg>
);

function TextInput({ label, type = 'text', placeholder, required, value, onChange, name }) {
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
        />
      </div>
    </div>
  );
}

function PhoneInput({ value, onChange }) {
  return (
    <div className="phone-input">
      <label>Mobile phone</label>
      <div className="phone-wrapper">
        <div className="country-selector">
          <div className="country-selected">
            <GBFlag />
            <span>+44</span>
          </div>
          <ChevronDown />
        </div>
        <div className="phone-field">
          <input
            type="tel"
            placeholder="Mobile phone"
            required
            pattern="[0-9]+"
            value={value}
            onChange={onChange}
          />
        </div>
      </div>
    </div>
  );
}

function Switch({ label, checked, onChange }) {
  return (
    <div className={`switch ${checked ? 'switch--active' : ''}`} onClick={onChange}>
      <div className="switch-toggle" role="checkbox" aria-checked={checked}>
        <span className="switch-toggle__background"></span>
        <span className="switch-toggle__indicator"></span>
      </div>
      <span className="switch__label">{label}</span>
    </div>
  );
}

function Checkbox({ checked, onChange, children }) {
  return (
    <div className="checkbox-input">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
      />
      <label onClick={onChange}>
        {checked ? <CheckboxChecked /> : <CheckboxUnchecked />}
        <span>{children}</span>
      </label>
    </div>
  );
}

export default function SignupForm() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    password: '',
  });
  const [whatsapp, setWhatsapp] = useState(false);
  const [sms, setSms] = useState(true);
  const [agreed, setAgreed] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const isFormValid = formData.firstName && formData.lastName && formData.phone && formData.email && formData.password && agreed;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isFormValid) {
      console.log('Form submitted:', formData);
    }
  };

  return (
    <div className="signup-screen screen">
      <div className="auth-layout">
        <div className="auth-header">
          <RegisterIcon />
          <h2>Buy machinery at dealer-only prices</h2>
          <p className="auth-description">Enter your details to access our stock today</p>
        </div>

        <div className="auth-content">
          <form className="signup-form" onSubmit={handleSubmit}>
            <div className="form-row">
              <TextInput
                label="First name"
                placeholder="First name"
                required
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
              />
              <TextInput
                label="Last name"
                placeholder="Last name"
                required
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
              />
            </div>

            <PhoneInput
              value={formData.phone}
              onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
            />

            <TextInput
              label="Email"
              type="email"
              placeholder="Email"
              required
              name="email"
              value={formData.email}
              onChange={handleInputChange}
            />

            <TextInput
              label="Password"
              type="password"
              placeholder="Password"
              required
              name="password"
              value={formData.password}
              onChange={handleInputChange}
            />

            <div className="notifications-section">
              <h3 className="notifications-title">Additional notifications about new sales</h3>
              <div className="notifications-switches">
                <Switch
                  label="WhatsApp"
                  checked={whatsapp}
                  onChange={() => {
                    if (!whatsapp) setSms(false);
                    setWhatsapp(!whatsapp);
                  }}
                />
                <Switch
                  label="SMS"
                  checked={sms}
                  onChange={() => {
                    if (!sms) setWhatsapp(false);
                    setSms(!sms);
                  }}
                />
              </div>
            </div>

            <div className="checkbox-section">
              <Checkbox
                checked={agreed}
                onChange={() => setAgreed(!agreed)}
              >
                I agree to the{' '}
                <a href="/terms-conditions" target="_blank" className="link">
                  Terms & conditions
                </a>{' '}
                and the{' '}
                <a href="/privacy-policy" target="_blank" className="link">
                  Privacy policy
                </a>.
              </Checkbox>
            </div>

            <button type="submit" className="button primary" disabled={!isFormValid}>
              Get Started
            </button>
          </form>
        </div>

        <p className="auth-link">
          Already have an account?&nbsp;<a href="/login">Login</a>
        </p>
      </div>
    </div>
  );
}
