import { useEffect, useRef } from 'react';

const useInactivityLogout = (timeoutMinutes = 5) => {
  // Corrigindo a declaração do useRef com valor inicial null
  const inactivityTimer = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const logout = () => {
      localStorage.removeItem('token');
      window.location.href = '/login?reason=inactivity';
    };

    const resetTimer = () => {
      // Limpa o timer existente com verificação de null
      if (inactivityTimer.current) {
        clearTimeout(inactivityTimer.current);
      }
      
      // Configura novo timer
      inactivityTimer.current = setTimeout(logout, timeoutMinutes * 60 * 1000);
    };

    // Eventos que resetam o timer
    const events = ['mousemove', 'keydown', 'click', 'scroll', 'touchstart'];

    const handleEvent = () => {
      resetTimer();
      localStorage.setItem('lastActivity', Date.now().toString());
    };

    // Adiciona listeners
    events.forEach(event => {
      window.addEventListener(event, handleEvent);
    });

    // Inicia o timer
    resetTimer();

    // Limpeza
    return () => {
      if (inactivityTimer.current) {
        clearTimeout(inactivityTimer.current);
      }
      events.forEach(event => {
        window.removeEventListener(event, handleEvent);
      });
    };
  }, [timeoutMinutes]);
};

export default useInactivityLogout;