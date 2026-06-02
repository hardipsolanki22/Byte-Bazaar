import {
  ActivityIndicator,
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect } from "react";
import { COLORS } from "@/theme/colors";
import { Product } from "@/types/product";
import { SPACING } from "@/theme/spacing";
import { RADIUS } from "@/theme/radius";
import Feather from "@expo/vector-icons/Feather";
import ImageSlider from "./ImageSlider";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { getProducts } from "@/features/productSlice";
import { Link } from "expo-router";

const Products = () => {
  const dispatch = useAppDispatch();
  const { loading, products } = useAppSelector((state) => state.products);

  useEffect(() => {
    if (!products?.length) dispatch(getProducts());
  }, [dispatch]);

  const productDetail = (product: Product) => {
    return (
      <Link
        href={`/products/${product.slug}` as any}
        style={styles.productDetailContainer}
      >
        <View style={styles.imageContainer}>
          <Image source={{ uri: product.mainImage }} style={styles.image} />
        </View>
        <View style={styles.textContainer}>
          <Text>{product.name}</Text>
          <Text>{product.price}</Text>
        </View>
        {product.averageRating && (
          <View style={styles.ratingContainer}>
            <View style={styles.ratingBox}>
              <Text style={{ color: COLORS.white }}>
                {product.averageRating}
              </Text>
              <Feather name="star" size={18} color={COLORS.white} />
            </View>
            <Text>{product.ratingCount} Ratings</Text>
          </View>
        )}
      </Link>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={products}
        renderItem={({ item }) => productDetail(item)}
        keyExtractor={(item) => item._id}
        ItemSeparatorComponent={() => <View style={{ height: SPACING.md }} />}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <>
            <ImageSlider />
            {!!!products?.length && loading === "pending" && (
              <View style={styles.loaderContainer}>
                <ActivityIndicator size="large" color={COLORS.logo} />
              </View>
            )}
          </>
        }
        ListHeaderComponentStyle={{ marginBottom: SPACING.md }}
      />
    </View>
  );
};

export default Products;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    marginHorizontal: SPACING.md,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  productDetailContainer: {
    flex: 1,
    alignItems: "center",
    padding: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: RADIUS.sm,
    gap: SPACING.md,
    backgroundColor: COLORS.white,
  },
  imageContainer: {
    width: "100%",
  },
  image: {
    width: "100%",
    height: 200,
  },
  textContainer: {
    width: "100%",
    marginTop: SPACING.md,
    gap: SPACING.sm,
  },
  ratingContainer: {
    marginTop: SPACING.md,
    flexDirection: "row",
    gap: SPACING.sm,
    width: "100%",
    alignItems: "center",
  },
  ratingBox: {
    padding: SPACING.sm,
    backgroundColor: COLORS.blue,
    flexDirection: "row",
    gap: SPACING.sm,
    borderRadius: RADIUS.sm,
  },
});
