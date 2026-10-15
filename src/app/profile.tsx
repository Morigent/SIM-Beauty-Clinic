import { useState } from "react";
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
import { currentUser, logout, saveProfile } from "../utils/data";

export default function Profile() {
  const [name, setName] = useState(currentUser?.name ?? "");
  const [email, setEmail] = useState(currentUser?.email ?? "");
  const [phone, setPhone] = useState(currentUser?.phone ?? "");
  const [dob, setDob] = useState(currentUser?.dob ?? "");
  const [address, setAddress] = useState(currentUser?.address ?? "");

  if (!currentUser) {
    return <Redirect href="/sign-in" />;
  }

  const save = () => {
    saveProfile({
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim() || undefined,
      dob: dob.trim() || undefined,
      address: address.trim() || undefined,
    });
    router.replace("/user");
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
          value={email}
          onChangeText={setEmail}
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
            onPress={() => {
              logout();
              router.replace("/sign-in");
            }}
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
