import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS } from "@/theme/colors";
import { SPACING } from "@/theme/spacing";
import { TEXTS } from "@/constants/plainText";
import { FONT_SIZE, FONT_WEIGHT } from "@/theme/typography";
import Input from "@/components/common/Input";
import { RADIUS } from "@/theme/radius";
import Button from "@/components/common/Button";
import SocialButton from "@/components/common/SocialButton";
import GoogleImage from "@/assets/svg/Google";
import Facebook from "@/assets/svg/Faceboo";
import { useRouter } from "expo-router";
import { ROUTES_PATH } from "@/constants";
import { Controller, useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { UserLoginRequest } from "@/types/auth";
import { currentUser, loginUser } from "@/features/authSlice";
import Toast from "react-native-toast-message";
import { Linking } from "react-native";
const login = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector((state) => state.users);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<UserLoginRequest>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: UserLoginRequest) => {
    dispatch(loginUser(data))
      .unwrap()
      .then((data) => {
        dispatch(currentUser())
          .unwrap()
          .then(() => {
            Toast.show({
              type: "success",
              text1: data.message,
            });
            router.push(ROUTES_PATH.home);
          });
      })
      .catch((error) => {
        Toast.show({
          type: "error",
          text1: error.message,
        });
      });
  };

  const handleAuthGoogle = async () => {
    await Linking.openURL(process.env.EXPO_PUBLIC_GOOGLE_REDIRECT_URL as any);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.black} />

      <KeyboardAvoidingView
        style={styles.keyboardContainer}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View style={styles.loginConatiner}>
          <View style={styles.formConatiner}>
            <View style={styles.textContainer}>
              <Text style={styles.title}>{TEXTS.LOGIN.title}</Text>
              <Text style={styles.subtitle}>{TEXTS.LOGIN.subtitle}</Text>
            </View>

            <View style={styles.inputsContainer}>
              {/* EMAIL */}
              <Controller
                control={control}
                name="email"
                rules={{
                  required: TEXTS.LOGIN.errors.emailRequired,
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: TEXTS.LOGIN.errors.invalidEmail,
                  },
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <>
                    <Input
                      placeholder={TEXTS.LOGIN.emailPlaceholder}
                      label={TEXTS.LOGIN.emailLabel}
                      value={value}
                      onChangeText={onChange}
                      onBlur={onBlur}
                    />

                    {errors.email && (
                      <Text style={styles.errorText}>
                        {errors.email.message}
                      </Text>
                    )}
                  </>
                )}
              />

              {/* PASSWORD */}
              <Controller
                control={control}
                name="password"
                rules={{
                  required: TEXTS.LOGIN.errors.passwordRequired,
                  minLength: {
                    value: 6,
                    message: TEXTS.LOGIN.errors.passwordMinLength,
                  },
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <>
                    <Input
                      placeholder={TEXTS.LOGIN.passwordPlaceholder}
                      label={TEXTS.LOGIN.passwordLabel}
                      secureTextEntry
                      value={value}
                      onChangeText={onChange}
                      onBlur={onBlur}
                    />

                    {errors.password && (
                      <Text style={styles.errorText}>
                        {errors.password.message}
                      </Text>
                    )}
                  </>
                )}
              />

              <Button
                title={TEXTS.LOGIN.buttonTitle}
                variant="primary"
                fullWidth
                onPress={handleSubmit(onSubmit)}
                loading={loading === "pending"}
              />
            </View>

            <View style={styles.dividerContainer}>
              <View style={styles.line} />

              <Text style={styles.dividerText}>{TEXTS.LOGIN.continueWith}</Text>

              <View style={styles.line} />
            </View>

            <View style={styles.socialContainer}>
              <SocialButton title="Google" onPress={handleAuthGoogle}>
                <GoogleImage style={{ width: 20, height: 20 }} />
              </SocialButton>

              <SocialButton title="Facebook" onPress={() => {}}>
                <Facebook style={{ width: 20, height: 20 }} />
              </SocialButton>
            </View>

            <View style={styles.footer}>
              <Text style={styles.footerText}>{TEXTS.LOGIN.footerText}</Text>

              <Pressable onPress={() => router.push(ROUTES_PATH.auth.SIGNUP)}>
                <Text style={styles.signInText}>{TEXTS.LOGIN.signUp}</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primary,
    marginTop: SPACING.lg,
  },

  keyboardContainer: {
    flex: 1,
  },

  loginConatiner: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  formConatiner: {
    width: "90%",
    padding: SPACING.md,
    backgroundColor: COLORS.white,
    marginHorizontal: SPACING.md,
    borderRadius: RADIUS.md,
  },

  textContainer: {
    alignItems: "center",
    justifyContent: "center",
    gap: SPACING.xs,
  },

  title: {
    fontSize: FONT_SIZE.xl,
    fontWeight: "bold",
  },

  subtitle: {
    fontSize: 16,
    color: COLORS.gray,
  },

  inputsContainer: {
    marginTop: SPACING.lg,
    gap: SPACING.lg,
  },

  countryCodeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  countryContainer: {
    justifyContent: "space-between",
    gap: SPACING.xs,
    alignItems: "center",
    paddingRight: 12,
  },

  countryNumberText: {
    fontSize: 14,
    fontWeight: "500",
    color: COLORS.gray900,
  },

  countryText: {
    fontSize: FONT_SIZE.sm,
    fontWeight: FONT_WEIGHT.medium,
    color: COLORS.gray900,
  },

  divider: {
    width: "100%",
    borderColor: COLORS.gray300,
    borderBottomWidth: 1,
    marginTop: 2,
    paddingBottom: SPACING.xs,
  },

  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 24,
  },

  line: {
    flex: 1,
    height: 1,
    backgroundColor: COLORS.gray300,
  },

  dividerText: {
    marginHorizontal: 10,
    color: COLORS.gray400,
    paddingHorizontal: 4,
  },

  socialContainer: {
    flexDirection: "row",
    gap: SPACING.md,
  },

  footer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 24,
    gap: 4,
  },

  footerText: {
    fontSize: FONT_SIZE.sm,
    color: COLORS.gray900,
  },

  signInText: {
    fontSize: FONT_SIZE.sm,
    fontWeight: FONT_WEIGHT.semibold,
    color: COLORS.gray900,
  },

  errorText: {
    color: COLORS.error,
    fontSize: FONT_SIZE.xs,
    marginTop: -10,
  },
});
