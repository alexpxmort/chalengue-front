import { useState, useCallback } from 'react';

type AlertType = 'success' | 'error' | 'warning' | 'info';

interface Alert {
  type: AlertType;
  message: string;
}

export const useCustomAlert = () => {
  const [alert, setAlert] = useState<Alert | null>(null);

  const showAlert = useCallback((type: AlertType, message: string) => {
    setAlert({ type, message });
    setTimeout(() => setAlert(null), 5000); 
  }, []);

  const closeAlert = useCallback(() => {
    setAlert(null);
  }, []);

  return {
    alert,
    showAlert,
    closeAlert,
  };
};