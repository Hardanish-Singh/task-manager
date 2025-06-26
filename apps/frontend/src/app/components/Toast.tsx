import { useEffect } from 'react';
import { ToastProps } from '../types/types';

const TIMEOUT = 500;

const Toast = ({ message, type, onClose }: ToastProps) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, TIMEOUT);
    return () => clearTimeout(timer);
  }, [message, onClose]);

  return (
    <div
      className={`
      fixed top-5 right-5 
      px-5 py-2 
      rounded 
      text-white 
      shadow-lg 
      z-[1000] 
      transition-opacity duration-500 
      ${type === 'success' ? 'bg-green-500' : 'bg-red-500'}
    `}
    >
      {message}
    </div>
  );
};

export default Toast;
