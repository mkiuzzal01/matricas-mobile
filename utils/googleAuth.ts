import { useEffect, useState, useCallback } from "react";
import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";
import {
  GoogleSignin,
  statusCodes,
} from "@react-native-google-signin/google-signin";

GoogleSignin.configure({
  webClientId: process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID,
  iosClientId: process.env.EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID,
  offlineAccess: true,
});

export function useGoogleAuth() {
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged(setUser);
    return unsubscribe;
  }, []);

  const signInWithGoogle = useCallback(async () => {
    try {
      setLoading(true);

      await GoogleSignin.hasPlayServices({
        showPlayServicesUpdateDialog: true,
      });

      const response = await GoogleSignin.signIn();

      const idToken = response.data?.idToken;

      if (!idToken) {
        throw new Error("Google Sign-In failed: ID token not found.");
      }

      const credential = auth.GoogleAuthProvider.credential(idToken);

      const userCredential = await auth().signInWithCredential(credential);

      return userCredential;
    } catch (error: any) {
      if (error?.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log("User cancelled Google Sign-In");
      } else if (error?.code === statusCodes.IN_PROGRESS) {
        console.log("Google Sign-In already in progress");
      } else if (error?.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        console.log("Google Play Services not available");
      } else {
        console.error("Google Sign-In Error:", error);
      }

      throw error;
    } finally {
      setLoading(false);
    }
  }, []);

  const signOut = useCallback(async () => {
    try {
      await GoogleSignin.signOut();
      await auth().signOut();
    } catch (error) {
      console.error("Sign Out Error:", error);
      throw error;
    }
  }, []);

  return {
    user,
    loading,
    signInWithGoogle,
    signOut,
    isAuthenticated: !!user,
  };
}
