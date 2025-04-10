import { useEffect } from 'react';
import { ToastProps } from '../types/types';

const Toast = ({ message, type, onClose }: ToastProps) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 1500);
    return () => clearTimeout(timer);
  }, [message, onClose]);
  return (
    <div
      style={{
        position: 'fixed',
        top: '20px',
        right: '20px',
        backgroundColor: type === 'success' ? '#4CAF50' : '#f44336',
        color: 'white',
        padding: '10px 20px',
        borderRadius: '5px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
        zIndex: '1000',
        opacity: 1,
        transition: 'opacity 0.5s ease-out',
      }}
    >
      {message}
    </div>
  );
};

export default Toast;
