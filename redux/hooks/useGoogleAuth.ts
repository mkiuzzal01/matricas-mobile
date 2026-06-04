import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import { useEffect } from "react";
import { GoogleAuthProvider, signInWithCredential } from "firebase/auth";
import { auth } from "@/utils/firebase ";

WebBrowser.maybeCompleteAuthSession();

export const useGoogleAuth = () => {
  const [request, response, promptAsync] = Google.useAuthRequest({
    clientId: process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID,
  });

  useEffect(() => {
    const signIn = async () => {
      if (response?.type === "success") {
        const idToken = response.authentication?.idToken;

        if (!idToken) return;

        const credential = GoogleAuthProvider.credential(idToken);

        await signInWithCredential(auth, credential);
      }
    };

    signIn();
  }, [response]);

  return { promptAsync, request };
};
