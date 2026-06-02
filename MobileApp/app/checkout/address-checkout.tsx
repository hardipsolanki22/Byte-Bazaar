import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Fontisto from "@expo/vector-icons/Fontisto";
import { COLORS } from "@/theme/colors";
import { SPACING } from "@/theme/spacing";
import { RADIUS } from "@/theme/radius";
import { FONT_SIZE, FONT_WEIGHT } from "@/theme/typography";
import Button from "@/components/common/Button";
import { TEXTS } from "@/constants/plainText";
import { useRouter } from "expo-router";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { getAddresses } from "@/features/addressSlice";
import { BottomSheetBackdrop, BottomSheetModal } from "@gorhom/bottom-sheet";
import AddAddressBottomSheet from "@/components/sheet/AddOrUpdateAddress";
import PageHeader from "@/components/common/PageHeader";
import { ROUTES_PATH } from "@/constants";
import { setAddressId } from "@/features/checkoutSlice"

const Checkout = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { addresses, loading } = useAppSelector((state) => state.addresses);
  const cart = useAppSelector((state) => state.cart.cart);
  const primaryAddress = addresses?.find((a) => a.isPrimary);

  const bottomSheetRef = useRef<BottomSheetModal>(null);
  const snapPoints = useMemo(() => ["100%"], []);
  const openBottomSheet = () => {
    bottomSheetRef.current?.present();
  };

  const closeBottomSheet = () => {
    bottomSheetRef.current?.dismiss();
  };

  useEffect(() => {
    if (!addresses?.length) dispatch(getAddresses());
  }, [dispatch]);

  const renderAddressItem = ({ item }: any) => {
    return (
      <View style={styles.addressCard}>
        {item.isPrimary ? (
          <Fontisto name="radio-btn-active" size={24} color="black" />
        ) : (
          <Fontisto name="radio-btn-passive" size={24} color="black" />
        )}

        {/* Address Info */}
        <View style={styles.addressContent}>
          <Text style={styles.addressTitle}>{item.addressLine}</Text>

          <Text style={styles.addressText}>
            {item.city}, {item.state}, {item.country} - {item.pincode}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <PageHeader title="Select Address" />
      <View style={styles.container}>
        {/* SCROLLABLE CONTENT */}
        {loading === "pending" ? (
          <View style={styles.loaderContainer}>
            <ActivityIndicator size="large" color={COLORS.logo} />
          </View>
        ) : (
          <FlatList
            data={addresses}
            keyExtractor={(item) => item._id}
            renderItem={renderAddressItem}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.listContent}
            ListFooterComponent={
              <View style={styles.priceContainer}>
                {/* Price Details */}
                <Text style={styles.priceTitle}>{TEXTS.CHECKOUT.PRICE_DETAILS}</Text>

                <View style={styles.priceBox}>
                  <View style={styles.priceRow}>
                    <Text style={styles.priceLabel}>{TEXTS.CHECKOUT.TOTAL_PRICE}</Text>

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
            ListEmptyComponent={
              <View style={styles.emptyContainer}>
                <Text style={styles.emptyTitle}>
                  {TEXTS.CHECKOUT.NO_ADDRESS_TITLE}
                </Text>

                <Text style={styles.emptySubtitle}>
                  {TEXTS.CHECKOUT.NO_ADDRESS_SUBTITLE}
                </Text>
              </View>
            }
          />
        )}

        {/* FIXED CONTINUE BUTTON */}
      </View>
      <View style={styles.checkoutContainer}>
        <Button
          title={TEXTS.CHECKOUT.ADD_NEW_ADDRESS}
          onPress={openBottomSheet}
          textStyle={styles.addButtonText}
        />
        <Button
          textStyle={styles.addButtonText}
          title={TEXTS.CHECKOUT.CONTINUE}
          disabled={!addresses?.length || !primaryAddress}
          onPress={() => {
            dispatch(setAddressId(primaryAddress?._id || ""));
            router.push(ROUTES_PATH.paymentCheckout);
          }}
        />
      </View>

      <BottomSheetModal
        ref={bottomSheetRef}
        snapPoints={snapPoints}
        enablePanDownToClose
        backdropComponent={(props) => (
          <BottomSheetBackdrop
            {...props}
            disappearsOnIndex={-1}
            appearsOnIndex={0}
            opacity={0.4}
          />
        )}
      >
        <AddAddressBottomSheet
          title={"Add Address"}
          onClose={closeBottomSheet}
        />
      </BottomSheetModal>
    </SafeAreaView>
  );
};

export default Checkout;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    flex: 1,
    padding: SPACING.md,
  },

  headerContainer: {
    gap: SPACING.md,
    marginBottom: SPACING.xl,
  },

  sectionTitle: {
    fontSize: FONT_SIZE.lg,
    fontWeight: FONT_WEIGHT.bold,
    color: COLORS.black,
  },

  addButtonText: {
    fontSize: FONT_SIZE.sm,
  },

  listContent: {
    paddingBottom: SPACING["4xl"],
    flexGrow: 1,
    marginTop: SPACING.lg,
  },

  addressCard: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: RADIUS.lg,
    padding: SPACING.lg,
    flexDirection: "row",
    alignItems: "flex-start",
    gap: SPACING.md,
    marginBottom: SPACING.xl,
    backgroundColor: COLORS.white,
  },

  radioOuter: {
    width: 22,
    height: 22,
    borderRadius: RADIUS.full,
    borderWidth: 2,
    borderColor: COLORS.black,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 2,
  },

  radioInner: {
    width: 10,
    height: 10,
    borderRadius: RADIUS.full,
    backgroundColor: COLORS.black,
  },

  addressContent: {
    flex: 1,
    gap: SPACING.xs,
  },

  addressTitle: {
    fontSize: FONT_SIZE.md,
    fontWeight: FONT_WEIGHT.bold,
    color: COLORS.black,
  },

  addressText: {
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
    padding: SPACING.md,
    backgroundColor: COLORS.white,
    margin: SPACING.lg,
    gap: SPACING.md,
    width: "100%",
  },

  emptyContainer: {
    paddingVertical: SPACING["5xl"],
    justifyContent: "center",
    alignItems: "center",
  },

  emptyTitle: {
    fontSize: FONT_SIZE.lg,
    fontWeight: FONT_WEIGHT.bold,
    color: COLORS.black,
    marginBottom: SPACING.sm,
    textAlign: "center",
  },

  emptySubtitle: {
    fontSize: FONT_SIZE.md,
    color: COLORS.gray,
    textAlign: "center",
    lineHeight: 22,
    paddingHorizontal: SPACING.lg,
  },
  checkoutContainer: {
    backgroundColor: COLORS.white,
    padding: SPACING.md,
    gap: SPACING.md,
  },
});
