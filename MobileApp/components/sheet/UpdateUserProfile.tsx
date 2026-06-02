import React, { useState } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { Controller, useForm } from "react-hook-form";
import { COLORS } from "@/theme/colors";
import { SPACING } from "@/theme/spacing";
import { RADIUS } from "@/theme/radius";
import { FONT_SIZE, FONT_WEIGHT } from "@/theme/typography";
import { TEXTS } from "@/constants/plainText";
import Input from "@/components/common/Input";
import Button from "@/components/common/Button";
import { imagePicker } from "@/utils/imagePicker";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { updateAvatar, updateDetails } from "@/features/authSlice";
import Toast from "react-native-toast-message";
import { SafeAreaView } from "react-native-safe-area-context";
import { replaceHttp } from "@/utils/replaceHttp";

type Inputs = {
  fullName?: string;
  email?: string;
  phoneNumber?: string;
  avatar?: {
    uri: string;
    type: string;
    name: string;
  };
};

interface EditProfileBottomSheetProps {
  onClose: () => void;
}

const EditProfileBottomSheet = ({ onClose }: EditProfileBottomSheetProps) => {
  const { userData, loading } = useAppSelector(({ users }) => users);
  const dispatch = useAppDispatch();
  const [avatar, setAvatar] = useState<string | null>(
    replaceHttp(userData?.avatar) || null,
  );

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: {
      fullName: userData?.fullName || "",
      email: userData?.email || "",
      phoneNumber: userData?.phoneNumber?.toString() || "",
    },
  });

  const handleImagePick = async () => {
    const avatarData = await imagePicker();

    if (avatarData) {
      setAvatar(avatarData.uri);

      setValue("avatar", avatarData);
    }
  };

  const onSubmit = async (data: Inputs) => {
    const isFullNameChanged =
      data.fullName?.trim() && data.fullName !== userData?.fullName;

    const isEmailChanged = data.email?.trim() && data.email !== userData?.email;
    const isPhoneChanged = data.phoneNumber != userData?.phoneNumber;

    const isAvatarChanged = !!data.avatar;
    const hasAtLeastOneUpdate =
      isFullNameChanged || isEmailChanged || isPhoneChanged || isAvatarChanged;

    // Nothing updated
    if (!hasAtLeastOneUpdate) {
      Toast.show({
        type: "error",
        text1: TEXTS.EDIT_PROFILE.ERRORS.ONE_FIELD_REQUIRED,
      });

      return;
    }

    // Update Details
    if (isFullNameChanged || isEmailChanged || isPhoneChanged) {
      dispatch(
        updateDetails({
          fullName: data.fullName,
          email: data.email,
          phoneNumber: data.phoneNumber as any,
        }),
      )
        .unwrap()
        .then(() => {
          Toast.show({
            type: "success",
            text1: TEXTS.EDIT_PROFILE.SUCCESS,
          });
          onClose();
        });
    }

    // Update Avatar
    if (isAvatarChanged && data.avatar) {
      dispatch(
        updateAvatar({
          avatar: data.avatar,
        }),
      )
        .unwrap()
        .then(() => {
          Toast.show({
            type: "success",
            text1: TEXTS.EDIT_PROFILE.SUCCESS,
          });
          onClose();
        });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <Text style={styles.title}>{TEXTS.EDIT_PROFILE.TITLE}</Text>

        <Pressable onPress={onClose} style={styles.closeButton}>
          <Ionicons name="close-circle" size={30} color={COLORS.gray400} />
        </Pressable>
      </View>

      <View style={styles.divider} />

      {/* SCROLLABLE CONTENT */}
      <BottomSheetScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Avatar */}
        <Pressable style={styles.avatarContainer} onPress={handleImagePick}>
          {avatar ? (
            <Image source={{ uri: avatar }} style={styles.avatarImage} />
          ) : (
            <View style={styles.avatarPlaceholder}>
              <Ionicons
                name="camera-outline"
                size={28}
                color={COLORS.gray500}
              />

              <Text style={styles.avatarText}>{TEXTS.EDIT_PROFILE.UPLOAD}</Text>
            </View>
          )}
        </Pressable>

        {/* Inputs */}
        <View style={styles.inputsContainer}>
          {/* Full Name */}
          <Controller
            control={control}
            name="fullName"
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                label={TEXTS.EDIT_PROFILE.FULL_NAME_LABEL}
                placeholder={TEXTS.EDIT_PROFILE.FULL_NAME_PLACEHOLDER}
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                error={errors.fullName?.message}
              />
            )}
          />

          {/* Phone */}
          <Controller
            control={control}
            name="phoneNumber"
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                label={TEXTS.EDIT_PROFILE.PHONE_LABEL}
                placeholder={TEXTS.EDIT_PROFILE.PHONE_PLACEHOLDER}
                keyboardType="numeric"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                error={errors.phoneNumber?.message}
              />
            )}
          />

          {/* Email */}
          <Controller
            control={control}
            name="email"
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                label={TEXTS.EDIT_PROFILE.EMAIL_LABEL}
                placeholder={TEXTS.EDIT_PROFILE.EMAIL_PLACEHOLDER}
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                error={errors.email?.message}
              />
            )}
          />
        </View>
      </BottomSheetScrollView>

      {/* FIXED FOOTER */}
      <View style={styles.footer}>
        <Button
          title={TEXTS.EDIT_PROFILE.UPDATE}
          onPress={handleSubmit(onSubmit)}
          loading={loading === "pending"}
        />
      </View>
    </SafeAreaView>
  );
};

export default EditProfileBottomSheet;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },

  header: {
    paddingHorizontal: SPACING.lg,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },

  title: {
    fontSize: FONT_SIZE.xl,
    fontWeight: FONT_WEIGHT.bold,
    color: COLORS.black,
  },

  closeButton: {
    position: "absolute",
    right: SPACING.lg,
    top: SPACING.xs,
  },

  divider: {
    height: 1,
    backgroundColor: COLORS.border,
    marginTop: SPACING.md,
  },

  scrollContent: {
    padding: SPACING.lg,
    paddingBottom: SPACING["4xl"],
  },

  avatarContainer: {
    alignSelf: "center",
    marginBottom: SPACING.xl,
  },

  avatarImage: {
    width: 120,
    height: 120,
    borderRadius: RADIUS.full,
  },

  avatarPlaceholder: {
    width: 120,
    height: 120,
    borderRadius: RADIUS.full,
    borderWidth: 1,
    borderColor: COLORS.gray300,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.primary,
    gap: SPACING.xs,
  },

  avatarText: {
    fontSize: FONT_SIZE.xs,
    color: COLORS.gray500,
  },

  inputsContainer: {
    gap: SPACING.lg,
  },

  footer: {
    padding: SPACING.md,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    backgroundColor: COLORS.white,
  },
});
