import { useSignUp } from '@clerk/expo';
import { Ionicons } from '@expo/vector-icons';
import { Link, useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  ActivityIndicator,
  Image,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

export default function SignUpScreen() {
  const { signUp } = useSignUp();
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [code, setCode] = useState('');
  const [pendingVerification, setPendingVerification] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSignUp = async () => {
    if (!signUp) return;
    setLoading(true);
    setError('');

    try {
      const { error: createError } = await signUp.create({
        emailAddress: email,
        password,
      });

      if (createError) {
        setError((createError as any).errors?.[0]?.message || createError.message || 'An error occurred during registration.');
        return;
      }

      // Send the verification email to the user
      const { error: sendError } = await signUp.verifications.sendEmailCode();

      if (sendError) {
        setError((sendError as any).errors?.[0]?.message || sendError.message || 'Failed to send verification code.');
        return;
      }

      setPendingVerification(true);
    } catch (err: any) {
      console.error(err);
      setError(err?.errors?.[0]?.message || err?.message || 'An error occurred during registration.');
    } finally {
      setLoading(false);
    }
  };

  const handleVerify = async () => {
    if (!signUp) return;
    setLoading(true);
    setError('');

    try {
      const { error: verifyError } = await signUp.verifications.verifyEmailCode({
        code,
      });

      if (verifyError) {
        setError((verifyError as any).errors?.[0]?.message || verifyError.message || 'Verification failed. Please check the code.');
        return;
      }

      if (signUp.status === 'complete') {
        const { error: finalizeError } = await signUp.finalize();
        if (finalizeError) {
          setError((finalizeError as any).errors?.[0]?.message || finalizeError.message || 'Failed to complete sign up.');
        } else {
          router.replace('/(root)/(tabs)');
        }
      } else {
        setError('Verification is incomplete. Please try again.');
      }
    } catch (err: any) {
      console.error(err);
      setError(err?.errors?.[0]?.message || err?.message || 'Verification failed. Please check the code.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className="flex-1 bg-slate-900"
    >
      <ScrollView contentContainerClassName="flex-grow justify-center px-6 py-10" keyboardShouldPersistTaps="handled">
        <View className="items-center mb-9">
          <Image
            source={require("@/assets/images/kribb.png")}
            className="w-36 h-16 mb-8"
            resizeMode="contain"
          />
          <Text className="text-3xl font-bold text-slate-50 mb-2 text-center">
            {pendingVerification ? 'Verify your email' : 'Create Account'}
          </Text>
          <Text className="text-[15px] text-slate-400 text-center leading-[22px]">
            {pendingVerification
              ? `We sent a 6-digit confirmation code to ${email}`
              : 'Join Ryde Wave and experience premium rides'}
          </Text>
        </View>

        {error ? (
          <View className="bg-red-900 border border-red-400 rounded-xl p-[14px] mb-6">
            <Text className="text-red-100 text-sm font-medium text-center">{error}</Text>
          </View>
        ) : null}

        {!pendingVerification ? (
          <View className="w-full">
            <View className="mb-5">
              <Text className="text-sm font-semibold text-slate-200 mb-2">Email Address</Text>
              <TextInput
                className="bg-slate-800 border border-slate-700 rounded-xl px-4 py-[14px] text-base text-slate-50"
                placeholder="Enter your email"
                placeholderTextColor="#94A3B8"
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                keyboardType="email-address"
                autoComplete="email"
              />
            </View>

            <View className="mb-5">
              <Text className="text-sm font-semibold text-slate-200 mb-2">Password</Text>
              <View className="relative justify-center">
                <TextInput
                  className="bg-slate-800 border border-slate-700 rounded-xl pl-4 pr-12 py-[14px] text-base text-slate-50"
                  placeholder="Choose a strong password"
                  placeholderTextColor="#94A3B8"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={!showPassword}
                  autoCapitalize="none"
                  autoComplete="password"
                />
                <Pressable
                  className="absolute right-4"
                  onPress={() => setShowPassword(!showPassword)}
                >
                  <Ionicons
                    name={showPassword ? 'eye-off' : 'eye'}
                    size={24}
                    color="#94A3B8"
                  />
                </Pressable>
              </View>
            </View>

            <TouchableOpacity
              className="bg-[#0274DF] rounded-xl py-4 items-center mt-2.5 shadow-md shadow-[#0274DF]/30 elevation-4"
              onPress={handleSignUp}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="#FFFFFF" />
              ) : (
                <Text className="text-base font-bold text-white">Create Account</Text>
              )}
            </TouchableOpacity>

            <View className="flex-row justify-center items-center mt-7">
              <Text className="text-sm text-slate-400">Already have an account? </Text>
              <Link href="/(auth)/sign-in" asChild>
                <TouchableOpacity>
                  <Text className="text-sm font-bold text-sky-400">Sign In</Text>
                </TouchableOpacity>
              </Link>
            </View>
          </View>
        ) : (
          <View className="w-full">
            <View className="mb-5">
              <Text className="text-sm font-semibold text-slate-200 mb-2">Verification Code</Text>
              <TextInput
                className="bg-slate-800 border border-slate-700 rounded-xl px-4 py-[14px] text-base text-slate-50"
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
              className="bg-[#0274DF] rounded-xl py-4 items-center mt-2.5 shadow-md shadow-[#0274DF]/30 elevation-4"
              onPress={handleVerify}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="#FFFFFF" />
              ) : (
                <Text className="text-base font-bold text-white">Verify Email</Text>
              )}
            </TouchableOpacity>

            <TouchableOpacity
              className="py-4 items-center mt-3"
              onPress={() => setPendingVerification(false)}
              disabled={loading}
            >
              <Text className="text-[15px] font-semibold text-slate-400">Back to Sign Up</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}


