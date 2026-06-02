import { Image, Modal, Pressable, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { COLORS } from "@/theme/colors";
import { FONT_SIZE, FONT_WEIGHT } from "@/theme/typography";
import { SPACING } from "@/theme/spacing";
import { Ionicons } from "@expo/vector-icons";
import { Product } from "@/types/product";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import Toast from "react-native-toast-message";
import { addItemOrUpdateItemQuantity, getUserCart } from "@/features/cartSlice";
import Button from "./Button";
const UpdateProductQty = ({
  modalVisible,
  setModalVisible,
  product,
  quantity,
}: {
  modalVisible: boolean;
  setModalVisible: (visible: boolean) => void;
  product: Product;
  quantity: number;
}) => {
  const [quantityState, setQuantityState] = useState<number>(quantity);
  const loading = useAppSelector(({ cart }) => cart.loading);
  const dispatch = useAppDispatch();

  const increaseQuantity = () => {
    if (quantityState >= product.stock) {
      Toast.show({
        type: "error",
        text1: `Only ${product.stock} products are remaining.`,
      });
      return;
    }
    setQuantityState((prev) => prev + 1);
  };
  const decreaseQuantity = () => {
    if (quantityState <= 1) {
      setQuantityState(1);
      return;
    }
    setQuantityState((prev) => prev - 1);
  };

  const handleUpdateQty = () => {
    dispatch(
      addItemOrUpdateItemQuantity({
        productSlug: product.slug,
        quantity: quantityState,
      }),
    )
      .unwrap()
      .then(() => {
        dispatch(getUserCart())
          .unwrap()
          .then(() => {
            Toast.show({
              type: "success",
              text1: "Cart updated successfully",
            });
            setModalVisible(false);
          });
      })
      .catch((error: any) => {
        Toast.show({
          type: "error",
          text1: error.message,
        });
      });
  };

  return (
    <Modal
      visible={modalVisible}
      transparent
      animationType="fade"
      onRequestClose={() => setModalVisible(false)}
    >
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          {/* Close Button */}
          <Pressable
            style={styles.closeButton}
            onPress={() => setModalVisible(false)}
          >
            <Ionicons name="close-circle" size={30} color="#999" />
          </Pressable>

          {/* Product Info */}
          <View style={styles.productRow}>
            <Image
              source={{
                uri: product.mainImage,
              }}
              style={styles.productImage}
            />

            <View style={{ flex: 1 }}>
              <Text numberOfLines={2} style={styles.productName}>
                {product.name}
              </Text>

              <Text style={styles.priceText}>Price: ₹{product.price}</Text>
            </View>
          </View>

          {/* Qty */}
          <View style={styles.qtyContainer}>
            <Text style={styles.qtyLabel}>Qty</Text>

            <Pressable style={styles.qtyButton} onPress={increaseQuantity}>
              <Text style={styles.qtyButtonText}>+</Text>
            </Pressable>

            <Text style={styles.qtyText}>{quantityState}</Text>

            <Pressable style={styles.qtyButton} onPress={decreaseQuantity}>
              <Text style={styles.qtyButtonText}>-</Text>
            </Pressable>
          </View>

          <View style={styles.divider} />

          {/* Total */}
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Total Price</Text>

            <Text style={styles.totalPrice}>
              ₹{product.price * quantityState}
            </Text>
          </View>

          <View style={styles.divider} />

          {/* Buttons */}
          <Button
            title="Update Quantity"
            onPress={handleUpdateQty}
            disabled={loading === "pending"}
            style={styles.updateButton}
          />
        </View>
      </View>
    </Modal>
  );
};

export default UpdateProductQty;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
    padding: SPACING.lg,
  },

  modalContainer: {
    width: "100%",
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: SPACING.lg,
    position: "relative",
  },

  closeButton: {
    position: "absolute",
    right: 10,
    top: 10,
    zIndex: 10,
  },

  productRow: {
    flexDirection: "row",
    gap: SPACING.md,
    marginTop: SPACING.lg,
  },

  productImage: {
    width: 90,
    height: 90,
    borderRadius: 8,
  },

  // your typography style
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

  priceText: {
    marginTop: SPACING.sm,
    fontSize: FONT_SIZE.md,
    fontWeight: FONT_WEIGHT.medium,
    color: COLORS.black,
  },

  qtyContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: SPACING.xl,
    gap: SPACING.md,
  },

  qtyLabel: {
    fontSize: FONT_SIZE.md,
    color: COLORS.black,
  },

  qtyButton: {
    width: 36,
    height: 36,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },

  qtyButtonText: {
    fontSize: 22,
    fontWeight: "600",
  },

  qtyText: {
    fontSize: FONT_SIZE.md,
    fontWeight: FONT_WEIGHT.medium,
  },

  divider: {
    height: 1,
    backgroundColor: "#EAEAEA",
    marginVertical: SPACING.lg,
  },

  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  totalLabel: {
    fontSize: FONT_SIZE.md,
    color: COLORS.black,
  },

  totalPrice: {
    fontSize: FONT_SIZE.md,
    fontWeight: FONT_WEIGHT.bold,
    color: COLORS.black,
  },

  updateButton: {
    backgroundColor: COLORS.black,
    height: 48,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },

  updateButtonText: {
    color: COLORS.white,
    fontWeight: FONT_WEIGHT.bold,
    fontSize: FONT_SIZE.md,
  },
});
