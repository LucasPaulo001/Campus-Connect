"use client";

import React, {
  useContext,
  createContext,
  useState,
  useEffect,
} from "react";

import {
  login,
  register,
  profile,
  forgoutPass,
} from "@/api/auth";

import { INotification, IUser } from "@/types";
import { toast } from "sonner";
import { markNotificationAsReadAPI } from "@/api/notifications";

interface IAuthContextProps {
  loginFunc: (email: string, password: string) => Promise<void>;
  registerFunc: (data: any) => Promise<any>;

  loading: boolean;
  authLoading: boolean;

  loadProfile: () => Promise<void>;

  user: IUser | null;

  forgout_pass: (email: string) => Promise<any>;

  notification: INotification[];
  unreadCount: number;

  markNotificationAsRead: (
    notificationId: string
  ) => Promise<void>;
}

export const AuthContext = createContext<IAuthContextProps | undefined>(
  undefined
);

export const AuthProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [user, setUser] = useState<IUser | null>(null);

  const [authLoading, setAuthLoading] = useState(true);
  const [loading, setLoading] = useState(false);

  const [notification, setNotification] = useState<INotification[]>([]);

  const loadProfile = async () => {
    try {
      const res = await profile();

      setUser(res);
    } catch (err) {
      console.log("Usuário não autenticado.");
      setUser(null);
    }
  };

  /*
   * Verifica a sessão quando a aplicação inicia.
   */
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        await loadProfile();
      } finally {
        setAuthLoading(false);
      }
    };

    initializeAuth();
  }, []);

  /*
   * Login
   */
  const loginFunc = async (
    email: string,
    password: string
  ) => {
    try {
      setLoading(true);

      await login(email, password);

      await loadProfile();

      toast.success("Login realizado com sucesso.");
    } catch (err: any) {
      console.log(err);

      toast.warning(
        err?.response?.data?.error ||
          "Não foi possível realizar o login."
      );
    } finally {
      setLoading(false);
    }
  };

  /*
   * Registro
   */
  const registerFunc = async (data: any) => {
    try {
      setLoading(true);

      const res = await register(data);

      toast.success(res.message);
    } catch (err: any) {
      toast.warning(
        err?.response?.data?.error ||
          "Não foi possível realizar o cadastro."
      );
    } finally {
      setLoading(false);
    }
  };

  /*
   * Recuperação de senha
   */
  const forgout_pass = async (email: string) => {
    try {
      setLoading(true);

      const res = await forgoutPass(email);

      toast.success(res.message);
    } catch (err: any) {
      console.log(err);

      toast.warning(
        err?.response?.data?.error ||
          "Não foi possível solicitar a redefinição."
      );
    } finally {
      setLoading(false);
    }
  };

  /*
   * Marcar notificação como lida
   */
  const markNotificationAsRead = async (
    notificationId: string
  ) => {
    try {
      await markNotificationAsReadAPI(notificationId);

      setNotification((prev) =>
        prev.map((n) =>
          n.id === notificationId
            ? { ...n, read: true }
            : n
        )
      );

      toast.success("Notificação marcada como lida.");
    } catch (err) {
      console.log(err);
    }
  };

  const unreadCount = notification.filter(
    (n) => !n.readAt
  ).length;

  const contextValues: IAuthContextProps = {
    loginFunc,
    loading,
    authLoading,
    registerFunc,
    loadProfile,
    user,
    forgout_pass,
    markNotificationAsRead,
    notification,
    unreadCount,
  };

  return (
    <AuthContext.Provider value={contextValues}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error(
      "use o AuthContext dentro de um AuthProvider"
    );
  }

  return context;
};