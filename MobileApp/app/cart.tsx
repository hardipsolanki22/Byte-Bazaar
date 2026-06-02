import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { COLORS } from "@/theme/colors";
import { SPACING } from "@/theme/spacing";
import { RADIUS } from "@/theme/radius";
import { FONT_SIZE, FONT_WEIGHT } from "@/theme/typography";
import Button from "@/components/common/Button";
import { SafeAreaView } from "react-native-safe-area-context";
import PageHeader from "@/components/common/PageHeader";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { getUserCart, removeItemFromCart } from "@/features/cartSlice";
import { Product } from "@/types/product";
import Toast from "react-native-toast-message";
import Input from "@/components/common/Input";
import { applyCoupon } from "@/features/couponSlice";
import { useRouter } from "expo-router";
import { ROUTES_PATH } from "@/constants";
import UpdateProductQty from "@/components/common/UpdateProductQty";
import { TEXTS } from "@/constants/plainText";
import { replaceHttp } from "@/utils/replaceHttp";

const Cart = () => {
  const dispatch = useAppDispatch();
  const { cart, loading } = useAppSelector(({ cart }) => cart);
  const { loading: couponLoading } = useAppSelector(({ coupons }) => coupons);
  const [couponCode, setCouponCode] = React.useState<string>("");
  const [modalVisible, setModalVisible] = useState(false);
  const [item, setItem] = useState<{ product: Product; quantity: number } | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (!cart?.items.length) dispatch(getUserCart());
  }, [dispatch]);

  const handleremoveItemFromCart = (slug: string) => {
    dispatch(removeItemFromCart(slug))
      .unwrap()
      .then((data) => {
        dispatch(getUserCart())
          .unwrap()
          .then(() => {
            Toast.show({
              type: "success",
              text1: data.message,
            });
          });
      })
      .catch((error) => {
        console.log("error while remove item from cart: ", error.message);
      });
  };

  const renderCartItem = ({ item }: any) => {
    return (
      <View style={styles.productCard}>
        {/* Product Info */}
        <View style={styles.productRow}>
          {/* Image */}
          <Image
            source={{ uri: replaceHttp(item.product.mainImage)  }}
            style={styles.productImage}
          />

          {/* Product Details */}
          <View style={styles.detailsContainer}>
            <Text numberOfLines={2} style={styles.productName}>
              {item.product.name}
            </Text>

            <Text style={styles.productText}>Quantity:{item.quantity}</Text>

            <View style={styles.ratingContainer}>
              <Text style={styles.productText}>Rating:</Text>

              <AntDesign name="star" size={14} color={COLORS.yellow} />

              <Text style={styles.productText}>
                {item.product.productRating.averageRating} |{" "}
                {item.product.productRating.totalReviews} reviews
              </Text>
            </View>

            <Text style={styles.priceText}>Price: ₹{item.product.price}</Text>
          </View>
        </View>

        {/* Buttons */}
        <Button
          title="Update Quantity"
          onPress={() => {
            setItem({ product: item.product, quantity: item.quantity });
            setModalVisible(true);
          }}
          disabled={loading === "pending"}
          style={styles.updateButton}
        />
        <Button
          title="Remove"
          variant="outline"
          onPress={() => handleremoveItemFromCart(item.product.slug)}
          style={styles.removeButton}
          disabled={loading === "pending"}
        />
      </View>
    );
  };

  const applyCouponHandler = (couponCode: string) => {
    dispatch(applyCoupon(couponCode))
      .unwrap()
      .then((couponData) => {
        dispatch(getUserCart())
          .unwrap()
          .then(() => {
            Toast.show({
              type: "success",
              text1: couponData.message,
            });
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
    <SafeAreaView style={styles.container}>
      <PageHeader title="Cart" />
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        {modalVisible && (
          <UpdateProductQty
            modalVisible={modalVisible}
            setModalVisible={setModalVisible}
            product={item?.product as Product}
            quantity={item?.quantity as number}
          />
        )}

        <View style={styles.cartContainer}>
          {!!!cart?.items.length && loading === "pending" ? (
            <View style={styles.loaderContainer}>
              <ActivityIndicator size="large" color={COLORS.logo} />
            </View>
          ) : (
            <FlatList
              data={cart?.items}
              keyExtractor={(item) => item.product._id}
              showsVerticalScrollIndicator={false}
              renderItem={renderCartItem}
              ListHeaderComponent={
                <View style={styles.productDetails}>
                  <Text style={styles.priceTitle}>{TEXTS.CART.PRODUCTS}</Text>
                </View>
              }
              ListFooterComponent={
                <View style={styles.priceContainer}>
                  {/* Price Details */}
                  <Text style={styles.priceTitle}>{TEXTS.CART.PRICE_DETAILS}</Text>

                  <View style={styles.priceBox}>
                    <View style={styles.priceRow}>
                      <Text style={styles.priceLabel}>
                        Total Products Price:
                      </Text>

                      <Text style={styles.priceValue}>
                        + ₹{cart?.cartTotal}
                      </Text>
                    </View>

                    <View style={styles.priceRow}>
                      <Text style={styles.discountLabel}>{TEXTS.CART.TOTAL_DISCOUNT}:</Text>

                      <Text style={styles.discountValue}>
                        - ₹{cart?.discountValue}
                      </Text>
                    </View>

                    <View style={styles.innerDivider} />

                    <View style={styles.priceRow}>
                      <Text style={styles.totalLabel}>{TEXTS.CART.TOTAL_PRICE}:</Text>

                      <Text style={styles.totalValue}>
                        ₹ {cart?.discountedTotal}
                      </Text>
                    </View>
                  </View>

                  {/* Coupon */}
                  <View style={styles.couponContainer}>
                    <Input
                      label=""
                      placeholder="Enter Coupon Code"
                      style={{ width: "60%" }}
                      value={couponCode}
                      onChangeText={(text) => setCouponCode(text)}
                    />

                    <Button
                      title="Apply"
                      variant="outline"
                      onPress={() => applyCouponHandler(couponCode)}
                      fullWidth={false}
                      loading={couponLoading === "pending"}
                    />
                  </View>
                </View>
              }
            />
          )}

          {/* Checkout */}
        </View>
        <View style={styles.checkoutContainer}>
          <Button
            title="Proceed to Checkout"
            onPress={() => router.push(ROUTES_PATH.addressCheckout)}
            style={styles.checkoutButton}
            disabled={!cart?.items.length}
          />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Cart;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  header: {
    backgroundColor: COLORS.white,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  title: {
    fontSize: FONT_SIZE.lg,
    fontWeight: FONT_WEIGHT.bold,
    color: COLORS.black,
  },

  divider: {
    height: 1,
    backgroundColor: COLORS.border,
    marginTop: SPACING.sm,
    marginBottom: SPACING.lg,
  },
  productDetails: {
    marginTop: SPACING.lg,
  },

  productCard: {
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.sm,
    padding: SPACING.md,
    marginBottom: SPACING.lg,
  },

  productRow: {
    flexDirection: "row",
    gap: SPACING.md,
  },

  productImage: {
    width: 90,
    height: 90,
    borderRadius: RADIUS.md,
  },

  detailsContainer: {
    flex: 1,
  },

  productName: {
    fontSize: FONT_SIZE.md,
    fontWeight: FONT_WEIGHT.bold,
    color: COLORS.black,
    lineHeight: 22,
  },

  productText: {
    marginTop: SPACING.xs,
    fontSize: FONT_SIZE.sm,
    fontWeight: FONT_WEIGHT.regular,
    color: COLORS.gray,
  },

  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 2,
  },

  priceText: {
    marginTop: SPACING.sm,
    fontSize: FONT_SIZE.md,
    fontWeight: FONT_WEIGHT.medium,
    color: COLORS.black,
  },

  updateButton: {
    marginTop: SPACING.lg,
  },

  removeButton: {
    marginTop: SPACING.md,
    height: 45,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: RADIUS.md,
    justifyContent: "center",
    alignItems: "center",
  },

  removeButtonText: {
    fontSize: FONT_SIZE.sm,
    fontWeight: FONT_WEIGHT.medium,
    color: COLORS.black,
  },

  priceContainer: {
    marginTop: SPACING.lg,
    marginBottom: SPACING.xl,
  },

  priceTitle: {
    fontSize: FONT_SIZE.md,
    fontWeight: FONT_WEIGHT.bold,
    color: COLORS.black,
    marginBottom: SPACING.lg,
  },

  priceBox: {
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.lg,
    padding: SPACING.lg,
  },

  priceRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: SPACING.md,
  },

  priceLabel: {
    fontSize: FONT_SIZE.md,
    color: COLORS.black,
  },

  priceValue: {
    fontSize: FONT_SIZE.md,
    color: COLORS.black,
  },

  discountLabel: {
    fontSize: FONT_SIZE.md,
    color: COLORS.success,
  },

  discountValue: {
    fontSize: FONT_SIZE.md,
    color: COLORS.success,
  },

  innerDivider: {
    height: 1,
    backgroundColor: COLORS.border,
    marginVertical: SPACING.sm,
  },

  totalLabel: {
    fontSize: FONT_SIZE.md,
    fontWeight: FONT_WEIGHT.bold,
    color: COLORS.black,
  },

  totalValue: {
    fontSize: FONT_SIZE.md,
    fontWeight: FONT_WEIGHT.bold,
    color: COLORS.black,
  },

  couponContainer: {
    width: "100%",
    flexDirection: "row",
    gap: SPACING.md,
    justifyContent: "center",
    alignItems: "center",
    marginTop: SPACING.xl,
  },

  couponInput: {
    flex: 1,
    height: 45,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: RADIUS.md,
    justifyContent: "center",
    paddingHorizontal: SPACING.md,
    backgroundColor: COLORS.white,
  },

  couponText: {
    fontSize: FONT_SIZE.sm,
    color: COLORS.gray,
  },

  applyButton: {
    width: 90,
    height: 45,
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: RADIUS.md,
    justifyContent: "center",
    alignItems: "center",
  },

  applyButtonText: {
    fontSize: FONT_SIZE.sm,
    fontWeight: FONT_WEIGHT.medium,
    color: COLORS.black,
  },

  checkoutButton: {
    marginVertical: SPACING.md,
  },
  cartContainer: {
    flex: 1,
    paddingHorizontal: SPACING.md,
  },
  checkoutContainer: {
    backgroundColor: COLORS.white,
    padding: SPACING.md,
  },
});
