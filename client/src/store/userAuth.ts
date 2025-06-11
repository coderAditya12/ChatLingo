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
  onboard: {
    fullName: string;
    bio: string;
    nativeLanguage: string;
    learningLanguage: string;
    location: string;
    profilePicture: string;
  } | null;
  setUser: (user: userStore["user"]) => void;
  setOnboard: (onboard: userStore["onboard"]) => void;
  checkAuth: () => Promise<boolean>;
  logout: () => Promise<void>;
}

const userAuthStore = create<userStore>()(
  devtools(
    persist(
      (set) => ({
        isAuthenticated: false,
        user: null,
        onboard: null,
        setUser: (user) => set(() => ({ user })),
        setOnboard: (onboard) => set(() => ({ onboard })),
        checkAuth: async () => {
          try {
            const response = await axios.get(
              `${process.env.NEXT_PUBLIC_ROOT_URL}/auth/verify`,
              { withCredentials: true }
            );

            if (!response.data.valid) {
              set({ isAuthenticated: false, user: null });
              return false;
            }

            set({
              isAuthenticated: true,
              user: response.data.user,
            });
            return true;
          } catch (error) {
            set({ isAuthenticated: false, user: null });
            return false;
          }
        },
        logout: async () => {
          try {
            await axios.get(`${process.env.NEXT_PUBLIC_ROOT_URL}/api/signout`, {
              withCredentials: true,
            });
          } finally {
            set({ isAuthenticated: false, user: null });
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
    { name: "user-auth-store" }
  )
);

export default userAuthStore;

// import axios from "axios";
// import { create } from "zustand";
// import { devtools, persist } from "zustand/middleware";

// interface userStore {
//   isAuthenticated: boolean;
//   token: string | null;
//   user: {
//     id?: string;
//     email?: string;
//     fullName?: string;
//   } | null;
//   setUser: (user: userStore["user"]) => void;
//   checkAuth: () => Promise<boolean>;
//   logout: () => Promise<void>;
// }

// const userAuthStore = create<userStore>()(
//   devtools(
//     persist(
//       (set) => ({
//         isAuthenticated: false,
//         token: null,
//         user: null,
//         setUser: (user: userStore["user"]) => set(() => ({ user: user })),
//         checkAuth: async () => {
//           try {
//             const response = await axios.get(
//               `http://localhost:4000/api/auth/verify`,
//               {
//                 withCredentials: true,
//               }
//             );
//             if (!response.data.valid) {
//               set({
//                 isAuthenticated: false,
//                 user: null,
//               });
//               return false;
//             }
//             set({
//               isAuthenticated: true,
//               user: response.data.user,
//               token: response.data.accesstoken,
//             });
//             return true;
//           } catch (error) {
//             set({
//               isAuthenticated: false,
//               user: null,
//             });
//             return false;
//           }
//         },
//         logout: async () => {
//           try {
//             const response = await axios.get(
//               `http://localhost:4000/api/signout`,
//               {
//                 withCredentials: true,
//               }
//             );
//             set({
//               isAuthenticated: false,

//               user: null,
//             });
//           } catch (error) {
//             set({
//               isAuthenticated: false,

//               user: null,
//             });
//           }
//         },
//       }),
//       {
//         name: "user-auth-storage",
//         partialize: (state) => ({
//           isAuthenticated: state.isAuthenticated,
//           user: state.user,
//         }),
//       }
//     ),
//     {
//       name: "user-auth-store", // Name for devtools
//     }
//   )
// );

// export default userAuthStore;
