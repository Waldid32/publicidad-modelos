import { useState, useEffect } from 'react';
import axios from 'axios';

interface AuthData {
  token: string | null;
  userId: string | null;
  role: string | null;
  username: string | null;
  nombreCompleto: string | null;
  isAuthenticated: boolean;
}

export function useAuth(): AuthData & { isLoading: boolean } {
  const [auth, setAuth] = useState<AuthData>({
    token: null,
    userId: null,
    role: null,
    username: null,
    nombreCompleto: null,
    isAuthenticated: false,
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAuthData = async () => {
      try {
        setIsLoading(true);
        const { data } = await axios.get('/api/auth/user');

        setAuth({
          token: 'valid', // No exponemos el token real por seguridad
          userId: data.userId,
          role: data.role,
          username: data.username,
          nombreCompleto: data.nombreCompleto,
          isAuthenticated: data.isAuthenticated,
        });
      } catch {
        // Si hay un error, asumimos que no está autenticado
        setAuth({
          token: null,
          userId: null,
          role: null,
          username: null,
          nombreCompleto: null,
          isAuthenticated: false,
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchAuthData();
  }, []);

  return { ...auth, isLoading };
}
