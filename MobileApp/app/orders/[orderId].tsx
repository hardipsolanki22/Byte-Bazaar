import React, { useEffect } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  Pressable,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import {  Ionicons, MaterialIcons } from "@expo/vector-icons";
import { COLORS } from "@/theme/colors";
import { SPACING } from "@/theme/spacing";
import { RADIUS } from "@/theme/radius";
import { FONT_SIZE, FONT_WEIGHT } from "@/theme/typography";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useLocalSearchParams } from "expo-router";
import { getUserSingleOrder } from "@/features/orderSlice";
import PageHeader from "@/components/common/PageHeader";
import { getStatusConfig } from "@/services/orderStatusText";
import { TEXTS } from "@/constants/plainText";

const getStatusColor = (status: string) => {
  switch (status) {
    case "PENDING":
      return "#F59E0B";

    case "DELIVERED":
      return "#22C55E";

    case "CANCELLED":
      return "#EF4444";

    default:
      return COLORS.primary;
  }
};

const ProductCard = ({ item }: any) => {
  return (
    <Pressable style={styles.productCard}>
      <Image
        source={{ uri: item.product.mainImage }}
        style={styles.productImage}
      />

      <View style={styles.productInfo}>
        <Text numberOfLines={1} style={styles.productName}>
          {item.product.name}
        </Text>

        <Text style={styles.productMeta}>Quantity: {item.quantity}</Text>

        <Text style={styles.productPrice}>Price: ₹{item.product.price}</Text>
      </View>
    </Pressable>
  );
};

const OrderDetails = () => {
  const dispatch = useAppDispatch();
  const { orderId } = useLocalSearchParams<{ orderId: string }>();
  const { userSingleOrder, loading } = useAppSelector(({ orders }) => orders);

  useEffect(() => {
    dispatch(getUserSingleOrder(orderId));
  }, [dispatch]);

  const statusConfig = getStatusConfig(userSingleOrder?.status);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <PageHeader title={`#${orderId}`} />
      {/* Products */}
      {loading === "pending" ? (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color={COLORS.logo} />
        </View>
      ) : (
        <FlatList
          data={userSingleOrder?.order}
          keyExtractor={(item) => item.product._id}
          ItemSeparatorComponent={() => <View style={{ height: SPACING.md }} />}
          renderItem={({ item }) => <ProductCard item={item} />}
          style={styles.list}
          ListFooterComponent={
            <>
              {/* Payment Details */}
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>{TEXTS.CHECKOUT.PAYMENT_ORDER_DETAILS}</Text>

                <View style={styles.detailsContainer}>
                  <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>{TEXTS.CHECKOUT.PAYMENT_STATUS}</Text>

                    <Text
                      style={[
                        styles.paymentStatus,
                        {
                          color: getStatusColor(
                            userSingleOrder?.status as string,
                          ),
                        },
                      ]}
                    >
                      {userSingleOrder?.status}
                    </Text>
                  </View>

                  <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>{TEXTS.CHECKOUT.PAYMENT_METHOD}</Text>

                    <Text style={styles.detailValue}>
                      {userSingleOrder?.paymentType}
                    </Text>
                  </View>

                  <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>{TEXTS.CHECKOUT.ORDER_PRICE}</Text>

                    <Text style={styles.detailValue}>
                      ₹{userSingleOrder?.orderPrice}
                    </Text>
                  </View>

                  <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>{TEXTS.CHECKOUT.CART_TOTAL}</Text>

                    <Text style={styles.detailValue}>
                      ₹{userSingleOrder?.cartTotal}
                    </Text>
                  </View>

                  <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>{TEXTS.CHECKOUT.TOTAL_DISCOUNT}</Text>

                    <Text style={styles.discountText}>
                      ₹{userSingleOrder?.discountValue}
                    </Text>
                  </View>
                </View>
              </View>

              {/* Order Status */}
              <View style={styles.statusCard}>
                <View style={styles.statusTopRow}>
                  <View style={[styles.statusIconContainer, {
                    backgroundColor: statusConfig.bannerColor
                  }]}>
                    <Ionicons
                      name={statusConfig.icon as any}
                      size={18}
                      color={statusConfig.iconColor}
                    />
                  </View>

                  <View>
                    <Text style={styles.statusTitle}>
                      {userSingleOrder?.status}
                    </Text>
                  </View>
                </View>

                <View
                  style={[
                    styles.statusBanner,
                    {
                      backgroundColor: statusConfig.bannerColor,
                    },
                  ]}
                >
                  <Ionicons
                    name={statusConfig.icon as any}
                    size={16}
                    color={COLORS.white}
                  />

                  <Text style={styles.statusBannerText}>
                    {statusConfig.message}
                  </Text>
                </View>
              </View>

              {/* Delivery Address */}
              <View style={styles.addressCard}>
                <View style={styles.addressHeader}>
                  <MaterialIcons name="location-on" size={20} color={COLORS.black} />

                  <Text style={styles.addressTitle}>{TEXTS.CHECKOUT.DELIVERY_ADDRESS}</Text>
                </View>

                <Text style={styles.addressText}>
                  {userSingleOrder?.address.addressLine},{" "}
                  {userSingleOrder?.address.city},{" "}
                  {userSingleOrder?.address.state},{" "}
                  {userSingleOrder?.address.country} -{" "}
                  {userSingleOrder?.address.pincode}
                </Text>
              </View>
            </>
          }
        />
      )}
    </SafeAreaView>
  );
};

export default OrderDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  list: {
    height: "100%",
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  contentContainer: {
    padding: SPACING.lg,
    paddingBottom: 120,
  },

  header: {
    marginBottom: SPACING.xl,
  },

  headerTitle: {
    fontSize: FONT_SIZE.lg,
    fontWeight: FONT_WEIGHT.bold,
    marginBottom: SPACING.xs,
  },

  orderId: {
    fontSize: FONT_SIZE.sm,
    color: COLORS.gray,
  },

  productCard: {
    flexDirection: "row",
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.md,
    padding: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.border,
    margin: SPACING.sm,
  },

  productImage: {
    width: 90,
    height: 90,
    borderRadius: RADIUS.md,
    resizeMode: "cover",
  },

  productInfo: {
    flex: 1,
    marginLeft: SPACING.md,
    justifyContent: "center",
  },

  productName: {
    fontSize: FONT_SIZE.sm,
    fontWeight: FONT_WEIGHT.bold,
    marginBottom: SPACING.xs,
  },

  productMeta: {
    fontSize: FONT_SIZE.sm,
    color: COLORS.gray,
    marginBottom: 2,
  },

  productPrice: {
    fontSize: FONT_SIZE.sm,
    fontWeight: FONT_WEIGHT.bold,
  },

  section: {
    marginTop: SPACING["3xl"],
    margin: SPACING.sm,
  },

  sectionTitle: {
    fontSize: FONT_SIZE.md,
    fontWeight: FONT_WEIGHT.bold,
    marginBottom: SPACING.lg,
  },

  detailsContainer: {
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.md,
    padding: SPACING.lg,
    gap: SPACING.md,
  },

  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  detailLabel: {
    fontSize: FONT_SIZE.sm,
    color: COLORS.gray,
  },

  detailValue: {
    fontSize: FONT_SIZE.sm,
    fontWeight: FONT_WEIGHT.bold,
  },

  paymentStatus: {
    fontSize: FONT_SIZE.sm,
    fontWeight: FONT_WEIGHT.bold,
  },

  discountText: {
    fontSize: FONT_SIZE.sm,
    fontWeight: FONT_WEIGHT.bold,
    color: COLORS.success,
  },

  statusCard: {
    marginTop: SPACING["3xl"],
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.md,
    padding: SPACING.lg,
    margin: SPACING.sm,
  },

  statusTopRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  statusIconContainer: {
    width: 42,
    height: 42,
    borderRadius: RADIUS.full,
    justifyContent: "center",
    alignItems: "center",
    marginRight: SPACING.md,
  },

  statusTitle: {
    fontSize: FONT_SIZE.sm,
    fontWeight: FONT_WEIGHT.bold,
  },

  statusDate: {
    fontSize: FONT_SIZE.sm,
    color: COLORS.gray,
    marginTop: 2,
  },

  pendingBanner: {
    marginTop: SPACING.lg,
    backgroundColor: COLORS.yellow,
    borderRadius: RADIUS.md,
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.md,
    flexDirection: "row",
    alignItems: "center",
  },

  pendingBannerText: {
    flex: 1,
    marginLeft: SPACING.sm,
    color: COLORS.white,
    fontSize: FONT_SIZE.sm,
    fontWeight: FONT_WEIGHT.bold,
  },

  addressCard: {
    marginTop: SPACING.lg,
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.md,
    padding: SPACING.lg,
    margin: SPACING.sm,
  },

  addressHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: SPACING.md,
  },

  addressTitle: {
    marginLeft: SPACING.sm,
    fontSize: FONT_SIZE.sm,
    fontWeight: FONT_WEIGHT.bold,
  },

  addressText: {
    fontSize: FONT_SIZE.sm,
    color: COLORS.gray,
    lineHeight: 22,
  },
  statusBanner: {
    marginTop: SPACING.md,
    borderRadius: RADIUS.md,
    padding: SPACING.md,
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.sm,
  },

  statusBannerText: {
    flex: 1,
    color: COLORS.white,
    fontWeight: "600",
  },
});
