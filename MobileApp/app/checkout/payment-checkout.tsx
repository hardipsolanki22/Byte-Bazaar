import React, { useEffect, useState } from "react";

import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

import Fontisto from "@expo/vector-icons/Fontisto";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { COLORS } from "@/theme/colors";
import { SPACING } from "@/theme/spacing";
import { RADIUS } from "@/theme/radius";
import { FONT_SIZE, FONT_WEIGHT } from "@/theme/typography";

import Button from "@/components/common/Button";
import PageHeader from "@/components/common/PageHeader";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { loadAddressId } from "@/features/checkoutSlice";
import { paymentMethods } from "@/constants/paymentMethods";
import { PaymentMethodType } from "@/types/checkout";
import { createOrder } from "@/features/orderSlice";
import {
  initPaymentSheet,
  presentPaymentSheet,
} from "@stripe/stripe-react-native";
import { router } from "expo-router";
import { ROUTES_PATH } from "@/constants";
import { getUserCart } from "@/features/cartSlice";
import { TEXTS } from "@/constants/plainText";

const Payment = () => {
  const [selectedPaymentMethod, setSelectedPaymentMethod] =
    useState<PaymentMethodType>("COD");
  const dispatch = useAppDispatch();
  const addressId = useAppSelector(({ checkout }) => checkout.addressId);
  const cart = useAppSelector(({ cart }) => cart.cart);
  const orderLoading = useAppSelector(({ orders }) => orders.loading);
  useEffect(() => {
    const loadCheckoutData = async () => {
      const addressId = await AsyncStorage.getItem("checkout_addressId");
      dispatch(loadAddressId(addressId));
    };
    loadCheckoutData();
  }, []);

  const renderPaymentItem = ({ item }: any) => {
    const isSelected = selectedPaymentMethod === item.type;

    return (
      <Pressable
        style={[styles.paymentCard, isSelected && styles.selectedPaymentCard]}
        onPress={() => setSelectedPaymentMethod(item.type)}
      >
        {/* LEFT CONTENT */}
        <View style={styles.paymentLeftContainer}>
          {/* RADIO */}
          {isSelected ? (
            <Fontisto name="radio-btn-active" size={22} color="black" />
          ) : (
            <Fontisto name="radio-btn-passive" size={22} color="black" />
          )}

          {/* ICON */}
          <View
            style={[styles.iconContainer, { backgroundColor: item.iconBg }]}
          >
            <MaterialCommunityIcons
              name={item.icon as any}
              size={22}
              color={COLORS.white}
            />
          </View>

          {/* TEXT */}
          <View style={styles.paymentTextContainer}>
            <Text style={styles.paymentTitle}>{item.title}</Text>

            <Text style={styles.paymentSubtitle}>{item.subtitle}</Text>
          </View>
        </View>
      </Pressable>
    );
  };
  const handlePlaceOrder = () => {
    if (!addressId) return;
    dispatch(
      createOrder({
        addressId,
        paymentType: selectedPaymentMethod as "COD" | "STRIPE",
      }),
    )
      .unwrap()
      .then(async (res) => {
        if (res.clientSecret) {
          const initResponse = await initPaymentSheet({
            merchantDisplayName: "Byte Bazaar",
            paymentIntentClientSecret: res.clientSecret,
          });
          if (initResponse.error) {
            console.log(initResponse.error);
            return;
          }
          const paymentResponse = await presentPaymentSheet();
          if (paymentResponse.error) {
            console.log(paymentResponse.error);
            return;
          }
          dispatch(getUserCart())
            .unwrap()
            .then(() => {
              router.push(ROUTES_PATH.paymentSucess);
            });
        } else {
          dispatch(getUserCart())
            .unwrap()
            .then(() => {
              router.push(ROUTES_PATH.paymentSucess);
            });
        }
      })
      .catch((error) => {
        console.log("Error while placing order: ", error);
      });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <PageHeader title="Payment" />

      <View style={styles.container}>
        <FlatList
          data={paymentMethods}
          keyExtractor={(item) => item.id}
          renderItem={renderPaymentItem}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContent}
          ListFooterComponent={
            <View style={styles.priceContainer}>
              {/* Price Details */}
              <Text style={styles.priceTitle}>{TEXTS.CHECKOUT.PRICE_DETAILS}</Text>

              <View style={styles.priceBox}>
                <View style={styles.priceRow}>
                  <Text style={styles.priceLabel}>{TEXTS.CHECKOUT.TOTAL_PRODUCTS_PRICE}</Text>

                  <Text style={styles.priceValue}>+ ₹{cart?.cartTotal}</Text>
                </View>

                <View style={styles.priceRow}>
                  <Text style={styles.discountLabel}>{TEXTS.CHECKOUT.TOTAL_DISCOUNT}</Text>

                  <Text style={styles.discountValue}>
                    - ₹{cart?.discountValue}
                  </Text>
                </View>

                <View style={styles.innerDivider} />

                <View style={styles.priceRow}>
                  <Text style={styles.totalLabel}>{TEXTS.CHECKOUT.TOTAL_PRICE}</Text>

                  <Text style={styles.totalValue}>
                    ₹ {cart?.discountedTotal}
                  </Text>
                </View>
              </View>
            </View>
          }
        />
      </View>

      {/* FOOTER */}
      <View style={styles.footer}>
        <Button
          loading={orderLoading === "pending"}
          title="Place Order"
          onPress={handlePlaceOrder}
        />
      </View>
    </SafeAreaView>
  );
};

export default Payment;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },

  container: {
    flex: 1,
    padding: SPACING.md,
  },

  listContent: {
    paddingTop: SPACING.lg,
    paddingBottom: SPACING["4xl"],
  },

  paymentCard: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: RADIUS.lg,
    padding: SPACING.lg,
    backgroundColor: COLORS.white,
    marginBottom: SPACING.lg,
  },

  selectedPaymentCard: {
    backgroundColor: COLORS.paymentMethod,
  },

  paymentLeftContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: SPACING.md,
  },

  iconContainer: {
    borderRadius: RADIUS.md,
    justifyContent: "center",
    alignItems: "center",
  },

  paymentTextContainer: {
    flex: 1,
    gap: SPACING.sm,
  },

  paymentTitle: {
    fontSize: FONT_SIZE.md,
    fontWeight: FONT_WEIGHT.bold,
    color: COLORS.black,
    lineHeight: 24,
  },

  paymentSubtitle: {
    fontSize: FONT_SIZE.md,
    color: COLORS.gray,
    lineHeight: 22,
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

  footer: {
    backgroundColor: COLORS.white,
    padding: SPACING.md,
  },
});
