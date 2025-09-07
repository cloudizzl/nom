import { createContext, useContext, useEffect, useState } from "react";
import { pb } from "../lib/pocketbase";

const defaultAuthContext = {
    currentUser: null,
    setCurrentUser: () => {},
    login: async () => ({ success: false, error: null }),
    logout: () => {}
};

const AuthContext = createContext(defaultAuthContext);

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // check if there's a valid auth session
        if (pb.authStore.isValid && pb.authStore.record) {
            setCurrentUser(pb.authStore.record);
        }
        setLoading(false);

        const removeListener = pb.authStore.onChange(() => {
            if (pb.authStore.isValid && pb.authStore.record) {
                setCurrentUser(pb.authStore.record);
            } else {
                setCurrentUser(null);
            }
        });

        // cleanup
        return () => {
            removeListener();
        };
    }, []);

    const value = {
        currentUser,
        setCurrentUser,

        // login with pocketbase
        login: async (identity, password) => {
            try {
                const authData = await pb.collection('users').authWithPassword(identity, password);
                setCurrentUser(authData.record);
                console.log("User logged in:", authData.record);
                return { success: true };
            } catch (error) {
                return { success: false, error };
            }
        },

        logout: () => {
            pb.authStore.clear();
            setCurrentUser(null);
            console.log("User logged out");
            return { success: true };
        }
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);

    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }

    return context;
};