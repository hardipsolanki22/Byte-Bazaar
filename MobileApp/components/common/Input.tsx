import React, { useState } from "react";
import {
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  TextStyle,
  View,
  ViewStyle,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "@/theme/colors";
import { FONT_SIZE, FONT_WEIGHT } from "@/theme/typography";
import { RADIUS } from "@/theme/radius";
import { SPACING } from "@/theme/spacing";

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  containerStyle?: StyleProp<ViewStyle>;
  inputContainerStyle?: StyleProp<ViewStyle>;
  inputStyle?: StyleProp<TextStyle>;
  leftIcon?: React.ReactNode;
}

const Input = ({
  label,
  error,
  secureTextEntry,
  containerStyle,
  inputContainerStyle,
  inputStyle,
  leftIcon,
  ...props
}: InputProps) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const isPassword = secureTextEntry;

  return (
    <View style={[styles.container, containerStyle]}>
      {label ? <Text style={styles.label}>{label}</Text> : null}

      <View
        style={[
          styles.inputContainer,
          error && styles.errorBorder,
          inputContainerStyle,
        ]}
      >
        {leftIcon ? <View style={styles.leftIcon}>{leftIcon}</View> : null}

        <TextInput
          placeholderTextColor={COLORS.gray400}
          style={[styles.input, inputStyle]}
          secureTextEntry={isPassword && !isPasswordVisible}
          {...props}
        />

        {isPassword && (
          <Pressable
            onPress={() => setIsPasswordVisible((prev) => !prev)}
            hitSlop={10}
            style={styles.rightIcon}
          >
            <Ionicons
              name={isPasswordVisible ? "eye-off-outline" : "eye-outline"}
              size={22}
              color={COLORS.gray500}
            />
          </Pressable>
        )}
      </View>

      {error ? <Text style={styles.errorText}>{error}</Text> : null}
    </View>
  );
};
export default Input;

const styles = StyleSheet.create({
  container: {
    gap: SPACING.xs,
  },

  label: {
    fontSize: FONT_SIZE.sm,
    fontWeight: FONT_WEIGHT.medium,
    color: COLORS.gray900,
  },

  inputContainer: {
    minHeight: 30,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: COLORS.gray300,
    borderRadius: RADIUS.sm,
    paddingHorizontal: SPACING.base,
    backgroundColor: COLORS.white,
  },

  input: {
    flex: 1,
    color: COLORS.gray900,
    fontSize: FONT_SIZE.md,
    fontWeight: FONT_WEIGHT.regular,
    paddingVertical: SPACING.sm,
  },

  leftIcon: {
    marginRight: SPACING.sm,
  },

  rightIcon: {
    marginLeft: SPACING.sm,
  },

  errorBorder: {
    borderColor: COLORS.error,
  },

  errorText: {
    fontSize: FONT_SIZE.xs,
    fontWeight: FONT_WEIGHT.medium,
    color: COLORS.error,
  },
});
