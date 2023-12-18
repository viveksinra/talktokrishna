import { useRouter, useSegments } from "expo-router";
import React, { useEffect, useState } from "react";
import { authService } from "../services";
import * as SecureStore from "expo-secure-store";

const AuthContext = React.createContext(null);

// This hook can be used to access the user info.
export function useAuth() {
  return React.useContext(AuthContext);
}

// This hook will protect the route access based on user authentication.
function useProtectedRoute(authState) {
  const segments = useSegments();
  const router = useRouter();

  React.useEffect(() => {
    const inAuthGroup = segments[0] === "(auth)";

    if (
      // If the user is not signed in and the initial segment is not anything in the auth group.
      authState.authenticated === false &&
      !inAuthGroup
    ) {
      // Redirect to the sign-in page.
      router.replace("/login");
    } else if (authState.authenticated && inAuthGroup) {
      // Redirect away from the sign-in page.
      router.replace("/");
    }
  }, [authState.authenticated, segments]);
}

export function Provider(props) {
  const [user, setAuth] = React.useState(null);
  const [authState, setAuthState] = useState({
    token: null,
    authenticated: null,
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadToken = async () => {
      setLoading(true);
      const token = await SecureStore.getItemAsync("TOKEN_KEY");
      setLoading(false);
      if (token) {
        setAuthState({ token, authenticated: true });
      } else {
        setAuthState({ token: null, authenticated: false });
      }
    };
    loadToken();
  }, []);

  useProtectedRoute(authState, loading);

  const logIn = async (email, password) => {
    const result = await authService.login(email, password);

    if (!result.error) {
      setAuthState({
        token: result.data.accessToken,
        authenticated: true,
      });

      await SecureStore.setItemAsync(
        "TOKEN_KEY",
        JSON.stringify(result.data.accessToken)
      );
      return result;
    } else {
      return result;
    }
  };

  const logOut = async () => {
    await SecureStore.deleteItemAsync("TOKEN_KEY");

    setAuthState({
      token: null,
      authenticated: null,
    });
  };

  return (
    <AuthContext.Provider
      value={{
        logIn,
        logOut,
        authState,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}