import { useEffect, useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { Redirect, Stack, router } from "expo-router";
import { colors, fonts, fontSize, radius, spacing } from "../theme/style";
import { loadProfile, saveProfile, signOut } from "../utils/data";
import { notify } from "../utils/notify";
import { useSession } from "../utils/supabase";

export default function Profile() {
  const session = useSession();
  const [ready, setReady] = useState(false);
  const [saving, setSaving] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [dob, setDob] = useState("");
  const [address, setAddress] = useState("");

  useEffect(() => {
    if (!session) return;
    let cancelled = false;
    loadProfile()
      .then((profile) => {
        if (cancelled || !profile) return;
        setName(profile.fullName);
        setPhone(profile.phone ?? "");
        setDob(profile.dob ?? "");
        setAddress(profile.address ?? "");
      })
      .catch((error: Error) => notify(error.message))
      .finally(() => {
        if (!cancelled) setReady(true);
      });
    return () => {
      cancelled = true;
    };
  }, [session]);

  if (session === undefined) {
    return <View style={s.screen} />;
  }
  if (!session) {
    return <Redirect href="/sign-in" />;
  }
  if (!ready) {
    return <View style={s.screen} />;
  }

  const save = async () => {
    if (saving) return;
    setSaving(true);
    const error = await saveProfile({ fullName: name, phone, dob, address });
    setSaving(false);
    if (error) {
      notify(error);
      return;
    }
    router.replace("/user");
  };

  const handleSignOut = async () => {
    await signOut();
    router.replace("/sign-in");
  };

  return (
    <KeyboardAvoidingView
      style={s.screen}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <Stack.Screen
        options={{
          title: "Profile",
          headerStyle: { backgroundColor: colors.cream },
          headerShadowVisible: false,
          headerTintColor: colors.inkSoft,
        }}
      />
      <ScrollView contentContainerStyle={s.content}>
        <Text style={s.title}>Your profile</Text>
        <Text style={s.subtitle}>Complete your details to book faster.</Text>

        <Text style={s.label}>Full name</Text>
        <TextInput
          style={s.input}
          value={name}
          onChangeText={setName}
          placeholder="Your name"
          placeholderTextColor={colors.muted}
          autoCapitalize="words"
        />

        <Text style={s.label}>Email</Text>
        <TextInput
          style={s.input}
          value={session.user.email ?? ""}
          editable={false}
          placeholder="you@example.com"
          placeholderTextColor={colors.muted}
          autoCapitalize="none"
          keyboardType="email-address"
        />

        <Text style={s.label}>Phone</Text>
        <TextInput
          style={s.input}
          value={phone}
          onChangeText={setPhone}
          placeholder="+1 555 000 0000"
          placeholderTextColor={colors.muted}
          keyboardType="phone-pad"
        />

        <Text style={s.label}>Date of birth</Text>
        <TextInput
          style={s.input}
          value={dob}
          onChangeText={setDob}
          placeholder="YYYY-MM-DD"
          placeholderTextColor={colors.muted}
        />

        <Text style={s.label}>Address</Text>
        <TextInput
          style={[s.input, s.addressInput]}
          value={address}
          onChangeText={setAddress}
          placeholder="Street, city"
          placeholderTextColor={colors.muted}
          multiline
        />

        <Pressable
          style={({ pressed }) => [s.button, pressed && s.buttonPressed]}
          onPress={save}
        >
          <Text style={s.buttonText}>Save</Text>
        </Pressable>

        <View style={s.signOutRow}>
          <Pressable
            onPress={handleSignOut}
          >
            <Text style={s.signOutText}>Sign out</Text>
          </Pressable>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const s = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.cream },
  content: { padding: spacing.xl, paddingBottom: spacing.xxl },
  title: {
    fontFamily: fonts.heading,
    fontSize: fontSize.h2,
    color: colors.inkSoft,
  },
  subtitle: {
    fontFamily: fonts.body,
    fontSize: fontSize.small,
    color: colors.body,
    marginBottom: spacing.lg,
  },
  label: {
    fontFamily: fonts.bodyMedium,
    fontSize: fontSize.small,
    color: colors.inkSoft,
    marginBottom: spacing.xs,
  },
  input: {
    height: 48,
    paddingHorizontal: spacing.md,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.ink,
    borderRadius: radius.sm,
    fontFamily: fonts.body,
    fontSize: fontSize.base,
    color: colors.inkSoft,
    marginBottom: spacing.md,
  },
  addressInput: { height: 72, paddingTop: spacing.md, textAlignVertical: "top" },
  button: {
    alignItems: "center",
    backgroundColor: colors.tan,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: colors.ink,
    borderBottomWidth: 4,
    borderRadius: radius.sm,
    marginTop: spacing.sm,
  },
  buttonPressed: { borderBottomWidth: 1 },
  buttonText: {
    fontFamily: fonts.bodyMedium,
    fontSize: fontSize.base,
    color: colors.white,
  },
  signOutRow: { alignItems: "center", marginTop: spacing.lg },
  signOutText: {
    fontFamily: fonts.body,
    fontSize: fontSize.small,
    color: colors.body,
    textDecorationLine: "underline",
  },
});
