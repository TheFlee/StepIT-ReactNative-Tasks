import { useEffect, useMemo, useState } from 'react';
import { router } from 'expo-router';
import type { Href } from 'expo-router';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { FormField } from '../../components/FormField';
import { ThemeToggle } from '../../components/ThemeToggle';
import { useAuth } from '../../contexts/auth';
import { useTheme } from '../../contexts/theme';

type FormData = {
  name: string;
  lastname: string;
  phone: string;
  email: string;
  password: string;
};

type FormErrors = Record<keyof FormData, string>;

type FieldConfig = {
  key: keyof FormData;
  label: string;
  placeholder: string;
  keyboardType?: 'default' | 'email-address' | 'phone-pad';
  secureTextEntry?: boolean;
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
};

const initialFormData: FormData = {
  name: '',
  lastname: '',
  phone: '',
  email: '',
  password: '',
};

const initialErrors: FormErrors = {
  name: '',
  lastname: '',
  phone: '',
  email: '',
  password: '',
};

const stepOneFields: FieldConfig[] = [
  {
    key: 'name',
    label: 'First name',
    placeholder: 'John',
  },
  {
    key: 'lastname',
    label: 'Last name',
    placeholder: 'Doe',
  },
  {
    key: 'phone',
    label: 'Phone',
    placeholder: '+1 000 000 0000',
    keyboardType: 'phone-pad',
  },
];

const stepTwoFields: FieldConfig[] = [
  {
    key: 'email',
    label: 'Email',
    placeholder: 'john@example.com',
    keyboardType: 'email-address',
    autoCapitalize: 'none',
  },
  {
    key: 'password',
    label: 'Password',
    placeholder: '8+ characters',
    secureTextEntry: true,
  },
];

const reviewFields: { key: keyof FormData; label: string }[] = [
  { key: 'name', label: 'First name' },
  { key: 'lastname', label: 'Last name' },
  { key: 'phone', label: 'Phone' },
  { key: 'email', label: 'Email' },
];

const STEP_LABELS = ['Personal', 'Account', 'Review'];
const HOME_ROUTE = '/' as Href;
const LOGIN_ROUTE = '/login' as Href;

function StepIndicator({
  step,
  isDarkMode,
}: {
  step: number;
  isDarkMode: boolean;
}) {
  return (
    <View className="w-full mb-10">
      <View className="flex-row items-start w-full">
        {[0, 1, 2].map((index) => {
          const item = index + 1;
          const isActive = step === item;
          const isDone = step > item;
          const filled = isActive || isDone;

          return (
            <View key={index} className="flex-1 items-center">
              <View className="flex-row items-center w-full">
                <View
                  className={`flex-1 h-px ${
                    index === 0
                      ? 'bg-transparent'
                      : step > index
                      ? 'bg-emerald-400'
                      : isDarkMode
                      ? 'bg-zinc-800'
                      : 'bg-zinc-200'
                  }`}
                />

                <View
                  className={`h-8 w-8 rounded-full items-center justify-center border ${
                    filled
                      ? 'border-emerald-400 bg-emerald-400'
                      : isDarkMode
                      ? 'border-zinc-800 bg-zinc-900'
                      : 'border-zinc-200 bg-zinc-100'
                  }`}
                >
                  {isDone ? (
                    <Text className="text-[10px] font-bold text-zinc-950">
                      OK
                    </Text>
                  ) : (
                    <View
                      className={`h-2 w-2 rounded-full ${
                        isActive
                          ? 'bg-zinc-950'
                          : isDarkMode
                          ? 'bg-zinc-700'
                          : 'bg-zinc-300'
                      }`}
                    />
                  )}
                </View>

                <View
                  className={`flex-1 h-px ${
                    index === 2
                      ? 'bg-transparent'
                      : step > item
                      ? 'bg-emerald-400'
                      : isDarkMode
                      ? 'bg-zinc-800'
                      : 'bg-zinc-200'
                  }`}
                />
              </View>

              <Text
                className={`mt-2 text-[10px] font-medium tracking-widest uppercase text-center ${
                  filled
                    ? isDarkMode
                      ? 'text-zinc-100'
                      : 'text-zinc-900'
                    : isDarkMode
                    ? 'text-zinc-500'
                    : 'text-zinc-400'
                }`}
              >
                {STEP_LABELS[index]}
              </Text>
            </View>
          );
        })}
      </View>
    </View>
  );
}

export default function Register() {
  const { isDarkMode } = useTheme();
  const { user, isLoading, register, skipAuthorization } = useAuth();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [errors, setErrors] = useState<FormErrors>(initialErrors);

  const fields = useMemo(
    () => (step === 1 ? stepOneFields : stepTwoFields),
    [step]
  );

  useEffect(() => {
    if (!isLoading && user) {
      router.replace(HOME_ROUTE);
    }
  }, [isLoading, user]);

  const validate = (targetStep: number) => {
    const nextErrors: FormErrors = { ...initialErrors };

    if (targetStep >= 1) {
      if (!formData.name.trim()) nextErrors.name = 'Required';
      if (!formData.lastname.trim()) nextErrors.lastname = 'Required';
      if (!formData.phone.trim()) nextErrors.phone = 'Required';
    }

    if (targetStep >= 2) {
      if (!formData.email.trim()) {
        nextErrors.email = 'Required';
      } else if (!formData.email.includes('@')) {
        nextErrors.email = 'Invalid email address';
      }

      if (formData.password.length < 8) {
        nextErrors.password = 'Must be at least 8 characters';
      }
    }

    setErrors(nextErrors);
    return Object.values(nextErrors).every((error) => !error);
  };

  const handleChange = (field: keyof FormData, value: string) => {
    setFormData((current) => ({
      ...current,
      [field]: value,
    }));

    setErrors((current) => ({
      ...current,
      [field]: '',
    }));
  };

  const goToStep = (targetStep: number) => {
    if (targetStep === 1) {
      setStep(1);
      return;
    }

    if (targetStep === 2 && validate(1)) {
      setStep(2);
      return;
    }

    if (targetStep === 3 && validate(2)) {
      setStep(3);
    }
  };

  const handleSubmit = async () => {
    if (!validate(2)) return;

    await register(formData);
    router.replace(HOME_ROUTE);
  };

  const handleSkip = async () => {
    await skipAuthorization();
    router.replace(HOME_ROUTE);
  };

  return (
    <SafeAreaView
      className={`flex-1 ${isDarkMode ? 'bg-zinc-950' : 'bg-white'}`}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 24}
        className="flex-1"
      >
        <ScrollView
          contentContainerClassName="flex-grow px-8 pt-12 pb-28"
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode={Platform.OS === 'ios' ? 'interactive' : 'on-drag'}
          showsVerticalScrollIndicator={false}
        >
          <View className="mb-10">
            <View className="mb-3 flex-row items-center justify-between">
              <Text
                className={`text-[11px] font-semibold uppercase tracking-[0.25rem] ${
                  isDarkMode ? 'text-emerald-300' : 'text-emerald-600'
                }`}
              >
                Registration
              </Text>
              <ThemeToggle />
            </View>

            <Text
              className={`text-4xl font-semibold leading-tight ${
                isDarkMode ? 'text-zinc-50' : 'text-zinc-900'
              }`}
            >
              Create your{'\n'}account.
            </Text>
          </View>

          <StepIndicator step={step} isDarkMode={isDarkMode} />

          {step < 3 ? (
            <View>
              {fields.map((field) => (
                <FormField
                  key={field.key}
                  label={field.label}
                  placeholder={field.placeholder}
                  value={formData[field.key]}
                  error={errors[field.key]}
                  isDarkMode={isDarkMode}
                  keyboardType={field.keyboardType}
                  secureTextEntry={field.secureTextEntry}
                  autoCapitalize={field.autoCapitalize}
                  onChangeText={(value) => handleChange(field.key, value)}
                />
              ))}
            </View>
          ) : (
            <View>
              <Text
                className={`text-[11px] font-semibold tracking-[0.2rem] uppercase mb-6 ${
                  isDarkMode ? 'text-zinc-500' : 'text-zinc-400'
                }`}
              >
                Confirm details
              </Text>

              <View className="gap-5">
                {reviewFields.map((field, index) => (
                  <View
                    key={field.key}
                    className={
                      index < reviewFields.length - 1
                        ? `pb-5 border-b ${
                            isDarkMode ? 'border-zinc-800' : 'border-zinc-100'
                          }`
                        : ''
                    }
                  >
                    <Text
                      className={`text-[10px] font-semibold tracking-[0.18rem] uppercase mb-1 ${
                        isDarkMode ? 'text-zinc-500' : 'text-zinc-400'
                      }`}
                    >
                      {field.label}
                    </Text>

                    <Text
                      className={`text-base ${
                        isDarkMode ? 'text-zinc-50' : 'text-zinc-900'
                      }`}
                    >
                      {formData[field.key] || '-'}
                    </Text>
                  </View>
                ))}
              </View>
            </View>
          )}

          <View className="flex-1 min-h-[40px]" />

          <View className="gap-3 mt-8">
            <TouchableOpacity
              activeOpacity={0.85}
              onPress={step === 3 ? handleSubmit : () => goToStep(step + 1)}
              className={`rounded-full py-4 items-center ${
                isDarkMode ? 'bg-zinc-50' : 'bg-zinc-900'
              }`}
            >
              <Text
                className={`text-sm font-semibold tracking-widest uppercase ${
                  isDarkMode ? 'text-zinc-950' : 'text-white'
                }`}
              >
                {step === 3 ? 'Submit' : 'Continue'}
              </Text>
            </TouchableOpacity>

            {step > 1 ? (
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => setStep((current) => current - 1)}
                className="py-3 items-center"
              >
                <Text
                  className={`text-sm font-medium ${
                    isDarkMode ? 'text-zinc-400' : 'text-zinc-500'
                  }`}
                >
                  &lt; Back
                </Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => router.replace(LOGIN_ROUTE)}
                className="py-3 items-center"
              >
                <Text
                  className={`text-sm font-medium ${
                    isDarkMode ? 'text-zinc-400' : 'text-zinc-500'
                  }`}
                >
                  Already have an account
                </Text>
              </TouchableOpacity>
            )}

            <TouchableOpacity
              activeOpacity={0.7}
              onPress={handleSkip}
              className="py-3 items-center"
            >
              <Text
                className={`text-sm font-medium ${
                  isDarkMode ? 'text-emerald-300' : 'text-emerald-600'
                }`}
              >
                Skip authorization
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
