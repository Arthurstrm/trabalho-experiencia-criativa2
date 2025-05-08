import { useEffect, useRef } from 'react';

interface Usuario {
  id_usuario: number;
  nome: string;
  genero: string;
  dataNascimento: string; // Ou Date, dependendo de como você manipula no frontend
  cpf: string;
  email: string;
  telefone: string;
  senha?: string; // A senha geralmente não é armazenada no estado do frontend
  imagemPerfil?: any; // LONGBLOB pode ser tratado como 'any' no frontend inicialmente
}

interface LogoutCallback {
  (): void;
}

const useInactivityLogout = (timeoutMinutes = 5, onLogout?: LogoutCallback) => {
  const inactivityTimer = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const logout = () => {
      localStorage.removeItem('token');
      localStorage.removeItem('usuario');
      if (onLogout) {
        onLogout(); // Executa lógica adicional se fornecida
      }
      window.location.href = '/login?reason=inactivity';
    };

    const resetTimer = () => {
      if (inactivityTimer.current) {
        clearTimeout(inactivityTimer.current);
      }
      inactivityTimer.current = setTimeout(logout, timeoutMinutes * 60 * 1000);
    };

    const events = ['mousemove', 'keydown', 'click', 'scroll', 'touchstart'];

    const handleEvent = () => {
      resetTimer();
      localStorage.setItem('lastActivity', Date.now().toString());
    };

    events.forEach(event => {
      window.addEventListener(event, handleEvent);
    });

    resetTimer();

    return () => {
      if (inactivityTimer.current) {
        clearTimeout(inactivityTimer.current);
      }
      events.forEach(event => {
        window.removeEventListener(event, handleEvent);
      });
    };
  }, [timeoutMinutes, onLogout]);
};

export default useInactivityLogout;