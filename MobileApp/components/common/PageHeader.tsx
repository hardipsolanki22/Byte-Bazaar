import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { SPACING } from "@/theme/spacing";
import { COLORS } from "@/theme/colors";
import { RADIUS } from "@/theme/radius";
import { FONT_SIZE, FONT_WEIGHT } from "@/theme/typography";
import { ROUTES_PATH } from "@/constants";
import { useAppSelector } from "@/store/hooks";

interface PageHeaderProps {
  title: string;
  showCart?: boolean;
  showBackButton?: boolean;
}

const PageHeader = ({ title, showCart = false,showBackButton = true }: PageHeaderProps) => {
  const router = useRouter();
  const cart = useAppSelector((state) => state.cart.cart);

  return (
    <View style={styles.header}>
      {/* Back Button */}
      {showBackButton ? (
        <Pressable onPress={() => router.back()} style={styles.iconButton}>
          <Ionicons name="arrow-back" size={24} color={COLORS.black} />
        </Pressable>
      ) : (
        <View style={styles.emptyView} />
      )}

      {/* Title */}
      <Text numberOfLines={1} style={styles.headerTitle}>
        {title}
      </Text>

      {/* Cart / Empty */}
      {showCart ? (
        <Pressable
          onPress={() => router.push(ROUTES_PATH.cart)}
          style={styles.iconButton}
        >
          <AntDesign name="shopping-cart" size={22} color={COLORS.black} />

          {/* Cart Count */}
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{cart?.items.length || 0}</Text>
          </View>
        </Pressable>
      ) : (
        <View style={styles.emptyView} />
      )}
    </View>
  );
};

export default PageHeader;

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.md,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    backgroundColor: COLORS.primary,
  },

  iconButton: {
    width: 42,
    height: 42,
    borderRadius: RADIUS.full,
    justifyContent: "center",
    alignItems: "center",
  },

  headerTitle: {
    flex: 1,
    textAlign: "center",
    fontSize: FONT_SIZE.lg,
    fontWeight: FONT_WEIGHT.bold,
    color: COLORS.black,
    marginHorizontal: SPACING.sm,
  },

  emptyView: {
    width: 42,
  },
  badge: {
    position: "absolute",
    top: 4,
    right: 2,
    minWidth: 18,
    height: 18,
    borderRadius: RADIUS.full,
    backgroundColor: COLORS.error,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 4,
  },

  badgeText: {
    fontSize: 10,
    fontWeight: FONT_WEIGHT.bold,
    color: COLORS.white,
  },
});
