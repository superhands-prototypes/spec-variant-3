import { useEffect } from 'react';
import SignupForm from './SignupForm';
import LoginForm from './LoginForm';
import './Modal.css';

const CloseIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
);

export default function Modal({ isOpen, onClose, type = 'signup', onSwitchType }) {
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSwitchToSignup = () => {
    if (onSwitchType) {
      onSwitchType('signup');
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Close modal">
          <CloseIcon />
        </button>
        <div className="modal-body">
          {type === 'login' ? (
            <LoginForm onSwitchToSignup={handleSwitchToSignup} />
          ) : (
            <SignupForm />
          )}
        </div>
      </div>
    </div>
  );
}

