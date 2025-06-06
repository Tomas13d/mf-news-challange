import React, { createContext, useContext, useState, useEffect } from "react";
import { loginReq, registerReq } from "../services/Auth";
import { User } from "../types/User";
import { useRouter } from "next/router";
import { closeAlert, showError, showSuccess } from "@/utils/showAlert";

interface AuthContextProps {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userJson = localStorage.getItem("user");
    if (token && userJson) setUser(JSON.parse(userJson));
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const { user, token } = await loginReq(email, password);
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      setUser(user);
      router.push("/");
    } catch (err) {
      showError("Error de inicio de sesión", "Credenciales incorrectas");
      return;
    }
  };

  const register = async (name: string, email: string, password: string) => {
    try {
      await registerReq(name, email, password);
      closeAlert();
      showSuccess("¡Registro exitoso!", "Ahora puedes iniciar sesión");
      router.push("/login");
    } catch (err) {
      closeAlert();
      showError("Error al registrar", "Vuelve a intentarlo más tarde");
      throw err;
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    router.push("/");
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
