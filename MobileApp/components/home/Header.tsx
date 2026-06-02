import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import { COLORS } from "@/theme/colors";
import { SPACING } from "@/theme/spacing";
import Logo from "@/assets/svg/Logo";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { getCategories } from "@/features/categorySlice";
import { getProductsByCategory } from "@/features/productSlice";
import { RADIUS } from "@/theme/radius";
import { FONT_WEIGHT } from "@/theme/typography";
import { useRouter } from "expo-router";
import { ROUTES_PATH } from "@/constants";
const Header = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { catagories, loading } = useAppSelector((state) => state.categories);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const cart = useAppSelector((state) => state.cart.cart);

  useEffect(() => {
    if (!catagories?.length) dispatch(getCategories());
  }, []);

  useEffect(() => {
    if (selectedCategory) dispatch(getProductsByCategory(selectedCategory));
  }, [selectedCategory]);

  return (
    <View style={styles.container}>
      <View style={styles.cartAndLogoContainer}>
        <Logo style={styles.logo} />
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
      </View>
        <FlatList
          data={catagories}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => setSelectedCategory(item.slug)}>
              <Text>{item.name}</Text>
            </TouchableOpacity>
          )}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item._id}
          ItemSeparatorComponent={() => <View style={{ width: SPACING.lg }} />}
          style={{
            marginVertical: SPACING.sm,
            borderColor: COLORS.border,
            borderWidth: 1,
            padding: SPACING.md,
          }}
        />
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
  },
  cartAndLogoContainer: {
    marginHorizontal: SPACING.md,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
  },
  logo: {
    width: 50,
    height: 50,
  },
  iconButton: {
    width: 42,
    height: 42,
    borderRadius: RADIUS.full,
    justifyContent: "center",
    alignItems: "center",
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
