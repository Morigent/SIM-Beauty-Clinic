import "react-native-url-polyfill/auto";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient, type Session } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import { Platform } from "react-native";

const url = process.env.EXPO_PUBLIC_API_URL_SUPABASE;
const key = process.env.EXPO_PUBLIC_API_KEY_SUPABASE;

if (!url || !key) {
  throw new Error(
    "Supabase is not configured. Set EXPO_PUBLIC_API_URL_SUPABASE and EXPO_PUBLIC_API_KEY_SUPABASE in .env.",
  );
}

// Static web output renders every route in Node, where AsyncStorage's web
// backend reaches for `window`. The server only needs a session snapshot, so
// skip persistence there and let the browser bundle keep it.
const storage = typeof window === "undefined" ? undefined : AsyncStorage;

// The env URL points at the REST surface; auth and storage live on the same origin.
export const supabase = createClient(new URL(url).origin, key, {
  auth: {
    storage,
    autoRefreshToken: true,
    persistSession: true,
    // A confirmation link handed to the browser should restore its session;
    // native apps never receive one through the URL bar.
    detectSessionInUrl: Platform.OS === "web",
  },
});

/** `undefined` while the stored session is still being restored. */
export function useSession(): Session | null | undefined {
  const [session, setSession] = useState<Session | null | undefined>(undefined);

  useEffect(() => {
    void supabase.auth.getSession().then(({ data }) => {
      // A sign-in that landed before hydration finished wins over storage.
      setSession((current) => (current === undefined ? data.session : current));
    });
    const { data } = supabase.auth.onAuthStateChange((_event, next) => {
      setSession(next);
    });
    return () => data.subscription.unsubscribe();
  }, []);

  return session;
}
