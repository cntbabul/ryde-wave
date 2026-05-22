import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { useSignUp } from '@clerk/expo/legacy';
import { Link, useRouter } from 'expo-router';

export default function SignUpScreen() {
  const { signUp, setActive, isLoaded: isSignUpLoaded } = useSignUp();
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [code, setCode] = useState('');
  const [pendingVerification, setPendingVerification] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSignUp = async () => {
    if (!isSignUpLoaded) return;
    setLoading(true);
    setError('');

    try {
      await signUp.create({
        emailAddress: email,
        password,
      });

      // Send the verification email to the user
      await signUp.prepareEmailAddressVerification({ strategy: 'email_code' });

      setPendingVerification(true);
    } catch (err: any) {
      console.error(err);
      setError(err?.errors?.[0]?.message || 'An error occurred during registration.');
    } finally {
      setLoading(false);
    }
  };

  const handleVerify = async () => {
    if (!isSignUpLoaded) return;
    setLoading(true);
    setError('');

    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code,
      });

      if (completeSignUp.status === 'complete') {
        await setActive({ session: completeSignUp.createdSessionId });
        router.replace('/(tabs)');
      } else {
        setError('Verification is incomplete. Please try again.');
      }
    } catch (err: any) {
      console.error(err);
      setError(err?.errors?.[0]?.message || 'Verification failed. Please check the code.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer} keyboardShouldPersistTaps="handled">
        <View style={styles.headerContainer}>
          <Text style={styles.title}>
            {pendingVerification ? 'Verify your email' : 'Create Account'}
          </Text>
          <Text style={styles.subtitle}>
            {pendingVerification
              ? `We sent a 6-digit confirmation code to ${email}`
              : 'Join Ryde Wave and experience premium rides'}
          </Text>
        </View>

        {error ? (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{error}</Text>
          </View>
        ) : null}

        {!pendingVerification ? (
          <View style={styles.formContainer}>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Email Address</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter your email"
                placeholderTextColor="#94A3B8"
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                keyboardType="email-address"
                autoComplete="email"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Password</Text>
              <TextInput
                style={styles.input}
                placeholder="Choose a strong password"
                placeholderTextColor="#94A3B8"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                autoCapitalize="none"
                autoComplete="password"
              />
            </View>

            <TouchableOpacity
              style={styles.submitButton}
              onPress={handleSignUp}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="#FFFFFF" />
              ) : (
                <Text style={styles.submitButtonText}>Create Account</Text>
              )}
            </TouchableOpacity>

            <View style={styles.footerContainer}>
              <Text style={styles.footerText}>Already have an account? </Text>
              <Link href="/(auth)/sign-in" asChild>
                <TouchableOpacity>
                  <Text style={styles.signInLinkText}>Sign In</Text>
                </TouchableOpacity>
              </Link>
            </View>
          </View>
        ) : (
          <View style={styles.formContainer}>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Verification Code</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter 6-digit code"
                placeholderTextColor="#94A3B8"
                value={code}
                onChangeText={setCode}
                keyboardType="number-pad"
                maxLength={6}
                autoCapitalize="none"
              />
            </View>

            <TouchableOpacity
              style={styles.submitButton}
              onPress={handleVerify}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="#FFFFFF" />
              ) : (
                <Text style={styles.submitButtonText}>Verify Email</Text>
              )}
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.backButton}
              onPress={() => setPendingVerification(false)}
              disabled={loading}
            >
              <Text style={styles.backButtonText}>Back to Sign Up</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F172A',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
    paddingVertical: 40,
  },
  headerContainer: {
    alignItems: 'center',
    marginBottom: 36,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#F8FAFC',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 15,
    color: '#94A3B8',
    textAlign: 'center',
    lineHeight: 22,
  },
  errorContainer: {
    backgroundColor: '#7F1D1D',
    borderWidth: 1,
    borderColor: '#F87171',
    borderRadius: 12,
    padding: 14,
    marginBottom: 24,
  },
  errorText: {
    color: '#FEE2E2',
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
  },
  formContainer: {
    width: '100%',
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#E2E8F0',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#1E293B',
    borderWidth: 1,
    borderColor: '#334155',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    color: '#F8FAFC',
  },
  submitButton: {
    backgroundColor: '#0274DF',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 10,
    shadowColor: '#0274DF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  submitButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  backButton: {
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 12,
  },
  backButtonText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#94A3B8',
  },
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 28,
  },
  footerText: {
    fontSize: 14,
    color: '#94A3B8',
  },
  signInLinkText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#38BDF8',
  },
});
