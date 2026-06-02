import React from "react";
import {  ScrollView, StyleSheet, Text, View } from "react-native";
import { Feather } from "@expo/vector-icons";
import { COLORS } from "@/theme/colors";
import { SPACING } from "@/theme/spacing";
import { RADIUS } from "@/theme/radius";
import { FONT_SIZE, FONT_WEIGHT } from "@/theme/typography";
import { TEXTS } from "@/constants/plainText";
import Input from "@/components/common/Input";
import Button from "@/components/common/Button";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { changePassword, logOutUser } from "@/features/authSlice";
import { useRouter } from "expo-router";
import { ROUTES_PATH } from "@/constants";
import { Controller, useForm } from "react-hook-form";
import Toast from "react-native-toast-message";

interface ChangePasswordFormData {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}

const Security = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const loading = useAppSelector((state) => state.users.loading);

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ChangePasswordFormData>({
    defaultValues: {
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const logoutHandler = () => {
    dispatch(logOutUser())
      .unwrap()
      .then(() => {
        router.replace(ROUTES_PATH.auth.LOGIN);
      });
  };

  const handleChangePassword = (data: ChangePasswordFormData) => {
    dispatch(changePassword(data))
      .unwrap()
      .then((data) => {
        Toast.show({
          type: "success",
          text1: data.message,
        });
      })
      .catch((error) => {
        Toast.show({
          type: "error",
          text1: error.message,
        });
      });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{TEXTS.SECURITY.TITLE}</Text>

        <Text style={styles.subtitle}>{TEXTS.SECURITY.SUBTITLE}</Text>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Change Password Card */}
        <View style={styles.card}>
          <View style={styles.iconContainer}>
            <Feather name="lock" size={28} color={COLORS.black} />
          </View>

          <Text style={styles.cardTitle}>{TEXTS.SECURITY.CHANGE_PASSWORD}</Text>

          <Text style={styles.cardSubtitle}>
            {TEXTS.SECURITY.CHANGE_PASSWORD_SUBTITLE}
          </Text>

          <View style={styles.inputContainer}>
            <Controller
              control={control}
              name="oldPassword"
              rules={{
                required: TEXTS.SECURITY.ERRORS.OLD_PASSWORD_REQUIRED,
              }}
              render={({ field: { onChange, value } }) => (
                <Input
                  label={TEXTS.SECURITY.OLD_PASSWORD}
                  placeholder="Old password"
                  placeholderTextColor={COLORS.gray}
                  value={value}
                  onChangeText={onChange}
                  error={errors.oldPassword?.message}
                />
              )}
            />
          </View>

          <View style={styles.inputContainer}>
            <Controller
              control={control}
              name="newPassword"
              rules={{
                required: TEXTS.SECURITY.ERRORS.NEW_PASSWORD_REQUIRED,
                minLength: {
                  value: 6,
                  message: TEXTS.SECURITY.ERRORS.PASSWORD_MIN_LENGTH,
                },
              }}
              render={({ field: { onChange, value } }) => (
                <Input
                  label={TEXTS.SECURITY.NEW_PASSWORD}
                  placeholder="New password"
                  placeholderTextColor={COLORS.gray}
                  value={value}
                  onChangeText={onChange}
                  error={errors.newPassword?.message}
                />
              )}
            />
          </View>

          <View style={styles.inputContainer}>
            <Controller
              control={control}
              name="confirmPassword"
              rules={{
                required: TEXTS.SECURITY.ERRORS.CONFIRM_PASSWORD_REQUIRED,
                validate: (value) =>
                  value === watch("newPassword") || TEXTS.SECURITY.ERRORS.PASSWORD_MISMATCH,
              }}
              render={({ field: { onChange, value } }) => (
                <Input
                  label={TEXTS.SECURITY.CONFIRM_PASSWORD}
                  placeholder="Confirm password"
                  placeholderTextColor={COLORS.gray}
                  value={value}
                  onChangeText={onChange}
                  error={errors.confirmPassword?.message}
                />
              )}
            />
          </View>

          <Button
            onPress={handleSubmit(handleChangePassword)}
            title={TEXTS.SECURITY.UPDATE_PASSWORD}
            style={styles.updatedBtn}
            loading={loading === "pending"}
          />
        </View>

        {/* Logout Card */}
        <View style={styles.logoutCard}>
          <View style={styles.iconContainer}>
            <Feather name="log-out" size={28} color={COLORS.error} />
          </View>

          <Text style={styles.cardTitle}>{TEXTS.SECURITY.LOGOUT}</Text>

          <Text style={styles.cardSubtitle}>
            {TEXTS.SECURITY.LOGOUT_SUBTITLE}
          </Text>

          <Button
            variant="danger"
            onPress={logoutHandler}
            loading={loading === "pending"}
            title={TEXTS.SECURITY.LOGOUT}
            style={styles.logoutButton}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default Security;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  header: {
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.md,
    paddingBottom: SPACING.lg,
    backgroundColor: COLORS.white,
  },

  scrollContent: {
    padding: SPACING.md,
    paddingBottom: SPACING["4xl"],
  },

  title: {
    fontSize: FONT_SIZE.xl,
    fontWeight: FONT_WEIGHT.bold,
    color: COLORS.black,
    textAlign: "center",
  },

  subtitle: {
    marginTop: SPACING.xs,
    fontSize: FONT_SIZE.sm,
    color: COLORS.gray,
    textAlign: "center",
    lineHeight: 20,
  },

  card: {
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.lg,
    padding: SPACING.lg,
    marginBottom: SPACING.lg,

    borderWidth: 1,
    borderColor: COLORS.border,
  },

  logoutCard: {
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.lg,
    padding: SPACING.lg,

    borderWidth: 1,
    borderColor: COLORS.border,
  },

  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: COLORS.gray100,

    alignSelf: "center",

    justifyContent: "center",
    alignItems: "center",

    marginBottom: SPACING.md,
  },

  cardTitle: {
    fontSize: FONT_SIZE.lg,
    fontWeight: FONT_WEIGHT.bold,
    color: COLORS.black,
    textAlign: "center",
  },

  cardSubtitle: {
    marginTop: SPACING.xs,
    fontSize: FONT_SIZE.sm,
    color: COLORS.gray,
    textAlign: "center",
    lineHeight: 20,
  },

  inputContainer: {
    marginTop: SPACING.md,
  },

  updatedBtn: {
    marginTop: SPACING.xl,
  },

  logoutButton: {
    marginTop: SPACING.lg,
  },
});
