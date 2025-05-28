import axios from "axios";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface userStore {
  isAuthenticated: boolean;
  user: {
    id?: string;
    email?: string;
    fullName?: string;
  } | null;
  setUser: (user: userStore["user"]) => void;
  checkAuth: () => Promise<void>;
  logout: () => Promise<void>;
}

const userAuthStore = create<userStore>()(
  devtools(
    persist(
      (set) => ({
        isAuthenticated: false,
        user: null,
        setUser: (user: userStore["user"]) => set(() => ({ user: user })),
        checkAuth: async () => {
          try {
            const response = await axios.get(
              `http://localhost:4000/api/verify`,
              {
                withCredentials: true,
              }
            );
            if (response.data.valid) {
              set({
                isAuthenticated: true,
                user: response.data.user,
              });
              console.log("User is authenticated:", response.data.user);
            } else {
              set({
                isAuthenticated: false,
                user: null,
              });
              console.log("User is not authenticated");
            }
          } catch (error) {
            set({
              isAuthenticated: false,
              user: null,
            });
          }
        },
        logout: async () => {
          try {
            const response = await axios.get(
              `http://localhost:4000/api/signout`,
              {
                withCredentials: true,
              }
            );
            set({
              isAuthenticated: false,

              user: null,
            });
          } catch (error) {
           
            set({
              isAuthenticated: false,

              user: null,
            });
          }
        },
      }),
      {
        name: "user-auth-storage",
        partialize: (state) => ({
          isAuthenticated: state.isAuthenticated,
          user: state.user,
        }),
      }
    ),
    {
      name: "user-auth-store", // Name for devtools
    }
  )
);

export default userAuthStore;
