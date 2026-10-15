import { useState } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { Stack } from "expo-router";
import { colors, fonts, fontSize, radius, spacing } from "../../theme/style";

// ponytail: placeholder credential, no backend yet. Move to a server-side check
// (env var / API call) before this panel is exposed publicly.
const ADMIN_PASSWORD = "admin";

// Session lives in module scope: survives in-app navigation, resets on reload.
let authed = false;

const stats = [
  { label: "Bookings", value: "0" },
  { label: "Clients", value: "0" },
  { label: "Services", value: "0" },
];

export default function Admin() {
  const [signedIn, setSignedIn] = useState(authed);

  if (!signedIn) {
    return <AdminLogin onSuccess={() => setSignedIn(true)} />;
  }

  return (
    <ScrollView style={s.screen} contentContainerStyle={s.content}>
      <Stack.Screen options={{ title: "Admin", headerShown: false }} />

      <Text style={s.title}>Admin</Text>
      <Text style={s.subtitle}>Internal panel. Not linked from the site.</Text>

      <View style={s.row}>
        {stats.map((stat) => (
          <View key={stat.label} style={s.card}>
            <Text style={s.value}>{stat.value}</Text>
            <Text style={s.label}>{stat.label}</Text>
          </View>
        ))}
      </View>

      <Pressable
        style={s.outline}
        onPress={() => {
          authed = false;
          setSignedIn(false);
        }}
      >
        <Text style={s.outlineText}>Sign out</Text>
      </Pressable>
    </ScrollView>
  );
}

function AdminLogin({ onSuccess }: { onSuccess: () => void }) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const submit = () => {
    if (password !== ADMIN_PASSWORD) {
      setError("Wrong password.");
      return;
    }
    authed = true;
    onSuccess();
  };

  return (
    <View style={s.loginScreen}>
      <Stack.Screen options={{ title: "Admin", headerShown: false }} />

      <View style={s.loginCard}>
        <Text style={s.title}>Admin</Text>
        <Text style={s.subtitle}>Restricted area.</Text>

        <TextInput
          style={s.input}
          value={password}
          onChangeText={(text) => {
            setPassword(text);
            setError("");
          }}
          placeholder="Password"
          placeholderTextColor={colors.muted}
          secureTextEntry
          autoFocus
          onSubmitEditing={submit}
        />

        {error ? <Text style={s.error}>{error}</Text> : null}

        <Pressable style={s.button} onPress={submit}>
          <Text style={s.buttonText}>Enter</Text>
        </Pressable>
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.cream },
  content: { padding: spacing.xl, gap: spacing.lg, paddingTop: spacing.section },
  loginScreen: {
    flex: 1,
    backgroundColor: colors.cream,
    alignItems: "center",
    justifyContent: "center",
    padding: spacing.xl,
  },
  loginCard: {
    width: "100%",
    maxWidth: 360,
    padding: spacing.xl,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.ink,
    borderBottomWidth: 4,
    borderRadius: radius.md,
    gap: spacing.md,
  },
  title: {
    fontFamily: fonts.heading,
    fontSize: fontSize.h2,
    color: colors.inkSoft,
  },
  subtitle: {
    fontFamily: fonts.body,
    fontSize: fontSize.small,
    color: colors.body,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.line,
    borderRadius: radius.sm,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    fontFamily: fonts.body,
    fontSize: fontSize.base,
    color: colors.inkSoft,
    backgroundColor: colors.cream,
  },
  error: {
    fontFamily: fonts.body,
    fontSize: fontSize.small,
    color: "#B3261E",
  },
  button: {
    paddingVertical: spacing.md,
    borderRadius: radius.sm,
    backgroundColor: colors.tan,
    alignItems: "center",
  },
  buttonText: {
    fontFamily: fonts.bodyMedium,
    fontSize: fontSize.base,
    color: colors.white,
  },
  row: { flexDirection: "row", gap: spacing.md },
  card: {
    flex: 1,
    padding: spacing.lg,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.ink,
    borderBottomWidth: 4,
    borderRadius: radius.md,
    gap: spacing.xs,
  },
  value: {
    fontFamily: fonts.heading,
    fontSize: fontSize.price,
    color: colors.tanDark,
  },
  label: {
    fontFamily: fonts.body,
    fontSize: fontSize.caption,
    color: colors.muted,
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  outline: {
    alignSelf: "flex-start",
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.lg,
    borderWidth: 1,
    borderColor: colors.line,
    borderRadius: radius.sm,
  },
  outlineText: {
    fontFamily: fonts.body,
    fontSize: fontSize.small,
    color: colors.body,
  },
});
