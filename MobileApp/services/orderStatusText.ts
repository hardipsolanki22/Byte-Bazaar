import { COLORS } from "@/theme/colors";

export const getStatusConfig = (status?: string) => {
  switch (status) {
    case "DELIVERED":
      return {
        icon: "gift-outline",
        iconColor: COLORS.white,
        bannerColor: COLORS.greenStatus,
        message: "Yay! Your order reached on time.",
      };

    case "PENDING":
      return {
        icon: "car-sport-outline",
        iconColor: COLORS.white,
        bannerColor: COLORS.yellow,
        message: "Your order is pending and will be processed soon.",
      };

    case "CANCELLED":
      return {
        icon: "cube-outline",
        iconColor: COLORS.white,
        bannerColor: COLORS.error,
        message: "We're sorry — this order was cancelled.",
      };

    default:
      return {
        icon: "information-circle-outline",
        iconColor: COLORS.white,
        bannerColor: COLORS.gray,
        message: "Order status unavailable.",
      };
  }
};

