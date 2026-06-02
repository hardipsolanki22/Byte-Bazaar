import React from "react";
import {
  ActivityIndicator,
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  ViewStyle,
  TextStyle,
} from "react-native";
import { COLORS } from "@/theme/colors";
import { FONT_SIZE, FONT_WEIGHT } from "@/theme/typography";
import { RADIUS } from "@/theme/radius";
import { SPACING } from "@/theme/spacing";

type ButtonVariant =
  | "primary"
  | "secondary"
  | "outline"
  | "ghost"
  | "danger";

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: ButtonVariant;
  loading?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
}

const Button = ({
  title,
  onPress,
  variant = "primary",
  loading = false,
  disabled = false,
  fullWidth = true,
  style,
  textStyle,
}: ButtonProps) => {
  const isDisabled = disabled || loading;

  return (
    <Pressable
      disabled={isDisabled}
      onPress={onPress}
      style={({ pressed }) => [
        styles.button,
        variantStyles[variant],
        fullWidth && styles.fullWidth,
        pressed && !isDisabled && styles.pressed,
        isDisabled && styles.disabled,
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator color={getLoaderColor(variant)} />
      ) : (
        <Text
          style={[
            styles.text,
            textVariantStyles[variant],
            textStyle,
          ]}
        >
          {title}
        </Text>
      )}
    </Pressable>
  );
};

export default Button;

const getLoaderColor = (
  variant: ButtonVariant
) => {
  switch (variant) {
    case "outline":
    case "ghost":
      return COLORS.primary;
    case "danger":
      return COLORS.white;
    default:
      return COLORS.white;
  }
};

const variantStyles = StyleSheet.create({
  primary: {
    backgroundColor: COLORS.black,
  },

  secondary: {
    backgroundColor: COLORS.gray900,
  },

  outline: {
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.primary,
  },

  ghost: {
    backgroundColor: "transparent",
  },

  danger: {
    backgroundColor: COLORS.error,
  },
});

const textVariantStyles = StyleSheet.create({
  primary: {
    color: COLORS.white,
  },

  secondary: {
    color: COLORS.white,
  },

  outline: {
    color: COLORS.black,
  },

  ghost: {
    color: COLORS.primary,
  },

  danger: {
    color: COLORS.white,
  },
});

const styles = StyleSheet.create({
  button: {
    height: 45,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: SPACING.sm,
    borderRadius: RADIUS.sm,
    paddingHorizontal: SPACING.xl,
  },

  fullWidth: {
    width: "100%",
  },

  pressed: {
    opacity: 0.8,
  },

  disabled: {
    opacity: 0.5,
  },

  text: {
    fontSize: FONT_SIZE.md,
    fontWeight: FONT_WEIGHT.semibold,
  },
});