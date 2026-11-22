import { useState } from 'react';
import { View, Text, TextInput, Pressable, KeyboardAvoidingView, Platform } from 'react-native';
import { Stack, router } from 'expo-router';
import { styles, colors } from '../theme/style';
import { signIn, signUp } from '../utils/data';
import { notify } from '../utils/notify';

export default function SignIn() {
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const isLogin = mode === 'login';

  const handleSubmit = async () => {
    if (submitting) {
      return;
    }
    if (!email.trim() || !password.trim() || (!isLogin && !name.trim())) {
      notify('Please fill in all fields.');
      return;
    }

    setSubmitting(true);
    if (isLogin) {
      const error = await signIn(email, password);
      setSubmitting(false);
      if (error) {
        notify(error);
        return;
      }
      router.replace('/user');
      return;
    }

    const { error, needsConfirmation } = await signUp(name, email, password);
    setSubmitting(false);
    if (error) {
      notify(error);
      return;
    }
    if (needsConfirmation) {
      notify('Account created. Confirm your email address, then log in.');
      setMode('login');
      return;
    }
    router.replace('/profile');
  };

  return (
    <KeyboardAvoidingView
      style={styles.authScreen}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <Stack.Screen options={{ title: isLogin ? 'Log In' : 'Create Account' }} />
      <View style={styles.authCard}>
        <Text style={styles.authTitle}>{isLogin ? 'Welcome Back' : 'Create Account'}</Text>
        <Text style={styles.authSubtitle}>
          {isLogin ? 'Log in to continue your glow journey' : 'Join LuxeDerm and start your glow journey'}
        </Text>

        {!isLogin && (
          <>
            <Text style={styles.authLabel}>Full Name</Text>
            <TextInput
              style={styles.authInput}
              placeholder="Your name"
              placeholderTextColor={colors.muted}
              value={name}
              onChangeText={setName}
              autoCapitalize="words"
              autoComplete="name"
              textContentType="name"
            />
          </>
        )}

        <Text style={styles.authLabel}>Email</Text>
        <TextInput
          style={styles.authInput}
          placeholder="you@example.com"
          placeholderTextColor={colors.muted}
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
          autoComplete="email"
          textContentType="emailAddress"
        />

        <Text style={styles.authLabel}>Password</Text>
        <TextInput
          style={styles.authInput}
          placeholder="••••••••"
          placeholderTextColor={colors.muted}
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          autoComplete={isLogin ? 'password' : 'new-password'}
        />

        <Pressable
          style={({ pressed }) => [styles.authButton, pressed && { opacity: 0.85, transform: [{ scale: 0.98 }] }]}
          onPress={handleSubmit}
        >
          <Text style={styles.authButtonText}>{isLogin ? 'Log In' : 'Create Account'}</Text>
        </Pressable>

        <Pressable onPress={() => setMode(isLogin ? 'signup' : 'login')}>
          <Text style={styles.authLink}>
            {isLogin ? "Don't have an account? " : 'Already have an account? '}
            <Text style={styles.authLinkStrong}>{isLogin ? 'Create Account' : 'Log In'}</Text>
          </Text>
        </Pressable>

        {isLogin && (
          <Text style={styles.authLink}>Demo: ava@luxederm.com · ava123</Text>
        )}
      </View>
    </KeyboardAvoidingView>
  );
}
