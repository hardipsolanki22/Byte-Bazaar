import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "@/theme/colors";
import { SPACING } from "@/theme/spacing";
import { RADIUS } from "@/theme/radius";
import { SafeAreaView } from "react-native-safe-area-context";
import Button from "@/components/common/Button";
import { TEXTS } from "@/constants/plainText";
import { FONT_SIZE, FONT_WEIGHT } from "@/theme/typography";
import PageHeader from "@/components/common/PageHeader";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { calRatingPercentage } from "@/services/calRatingPercentage";
import { getProduct } from "@/features/productSlice";
import { getRating } from "@/features/ratingSlice";
import Toast from "react-native-toast-message";
import { addItemOrUpdateItemQuantity, getUserCart } from "@/features/cartSlice";
import { ROUTES_PATH } from "@/constants";
import { replaceHttp } from "@/utils/replaceHttp";

const ProductDetails = () => {
  const { slug } = useLocalSearchParams<{ slug: string }>();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [selectedThumbnail, setSelectedThumbnail] = useState("");
  const { loading: productLoading, singleProduct } = useAppSelector(
    (state) => state.products,
  );
  const { loading: ratingLoading, rating } = useAppSelector(
    (state) => state.ratings,
  );
  const { cart, loading } = useAppSelector((state) => state.cart);
  const cartItem = cart?.items;

  useEffect(() => {
    dispatch(getProduct(slug));
    dispatch(getRating(slug));
  }, [dispatch]);

  const handleAddToCartItem = (productSlug: string) => {
    const productInCart = cartItem?.find((item) => item.product.slug === slug);
    dispatch(
      addItemOrUpdateItemQuantity({
        productSlug,
        quantity: (productInCart?.quantity && productInCart?.quantity + 1) || 1,
      }),
    )
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
      .catch((error: any) => {
        Toast.show({
          type: "error",
          text1: error.message,
        });
      });
  };

  const handleBuytItem = (productSlug: string) => {
    dispatch(addItemOrUpdateItemQuantity({ productSlug, quantity: 1 }))
      .unwrap()
      .then((data) => {
        dispatch(getUserCart())
          .unwrap()
          .then(() => {
            Toast.show({
              type: "success",
              text1: data.message,
            });
            router.push(ROUTES_PATH.cart);
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
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />
      <PageHeader title={TEXTS.ProductDetails.title} showCart />
      {productLoading === "pending" || ratingLoading === "pending" ? (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color={COLORS.logo} />
        </View>
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {/* Product Image Section */}
          <View style={styles.productDetailContainer}>
            <View style={styles.imageContainer}>
              <Image
                source={{
                  uri:
                    selectedThumbnail || replaceHttp(singleProduct?.mainImage),
                }}
                style={styles.image}
                resizeMode="cover"
              />
            </View>

            {/* Thumbnail Images */}
            <FlatList
              horizontal
              data={singleProduct?.subImages}
              keyExtractor={(item) => item.toString()}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.thumbnailList}
              renderItem={({ item, index }) => (
                <Pressable
                  onPress={() =>
                    setSelectedThumbnail(replaceHttp(item) as string)
                  }
                  style={[
                    styles.thumbnailWrapper,
                    index === 0 && styles.activeThumbnail,
                  ]}
                >
                  <Image
                    source={{ uri: replaceHttp(item) }}
                    style={styles.thumbnailImage}
                    resizeMode="cover"
                  />
                </Pressable>
              )}
            />

            {/* Buttons */}
            <View style={styles.buttonContainer}>
              <Button
                title={TEXTS.ProductDetails.addToCart}
                variant="outline"
                onPress={() => handleAddToCartItem(slug)}
                fullWidth={false}
                disabled={loading === "pending"}
              />
              <Button
                title={TEXTS.ProductDetails.buyNow}
                fullWidth={false}
                variant="primary"
                onPress={() => handleBuytItem(slug)}
                disabled={loading === "pending"}
              />
            </View>
          </View>

          {/* Product Details */}
          <View style={styles.textContainer}>
            <Text style={styles.productTitle}>{singleProduct?.name}</Text>

            <Text style={styles.productDescription}>
              {singleProduct?.description}
            </Text>

            <Text style={styles.price}>₹{singleProduct?.price}</Text>

            {/* Stock */}
            <View style={styles.stockContainer}>
              <Text style={styles.stockText}>
                {singleProduct && singleProduct?.stock > 0
                  ? TEXTS.ProductDetails.IN_STOCK
                  : TEXTS.ProductDetails.OUT_OF_STOCK}
              </Text>
            </View>

            {/* Rating */}
            <View style={styles.ratingContainer}>
              <View style={styles.ratingBox}>
                <Ionicons name="star" size={14} color={COLORS.white} />
                <Text style={styles.ratingText}>
                  {singleProduct?.productRating.averageRating}
                </Text>
              </View>

              <Text style={styles.reviewText}>
                ({singleProduct?.productRating.totalReviews}{" "}
                {TEXTS.ProductDetails.reviews})
              </Text>
            </View>
          </View>

          {/* Ratings & Reviews */}
          {singleProduct && singleProduct?.productRating.totalRatings > 0 && (
            <>
              <View style={styles.reviewSection}>
                <Text style={styles.reviewTitle}>
                  {TEXTS.ProductDetails.reviews} & Ratings
                </Text>

                {/* Overall Rating */}
                <View style={styles.overallRatingContainer}>
                  <Text style={styles.overallRating}>
                    {singleProduct?.productRating.averageRating}
                  </Text>

                  <Ionicons
                    name="star"
                    size={20}
                    color={COLORS.yellow}
                    style={{ marginLeft: 4 }}
                  />
                </View>

                <Text style={styles.ratingSubText}>
                  {singleProduct?.productRating.totalRatings}{" "}
                  {TEXTS.ProductDetails.reviews},
                </Text>
                <Text style={styles.ratingSubText}>
                  {singleProduct?.productRating.totalReviews}{" "}
                  {TEXTS.ProductDetails.reviews}
                </Text>

                {/* Rating Bars */}
                <View style={styles.progressSection}>
                  <View style={styles.progressRow}>
                    <Text style={styles.progressLabel}>Excellent</Text>
                    <View style={styles.progressBarBackground}>
                      <View
                        style={[
                          styles.progressBarFill,
                          {
                            width: calRatingPercentage(
                              rating?.excellent ?? 0,
                              singleProduct?.productRating.totalRatings ?? 0,
                            ),
                          },
                        ]}
                      />
                    </View>
                    <Text style={styles.progressPercentage}>
                      {calRatingPercentage(
                        rating?.excellent ?? 0,
                        singleProduct?.productRating.totalRatings ?? 0,
                      )}
                    </Text>
                  </View>
                </View>
                <View style={styles.progressSection}>
                  <View style={styles.progressRow}>
                    <Text style={styles.progressLabel}>Good</Text>
                    <View style={styles.progressBarBackground}>
                      <View
                        style={[
                          styles.progressBarFill,
                          {
                            width: `${calRatingPercentage(rating?.good ?? 0, singleProduct?.productRating.totalRatings ?? 0)}`,
                          },
                        ]}
                      />
                    </View>
                    <Text style={styles.progressPercentage}>
                      {calRatingPercentage(
                        rating?.good ?? 0,
                        singleProduct?.productRating.totalRatings ?? 0,
                      )}
                    </Text>
                  </View>
                </View>
                <View style={styles.progressSection}>
                  <View style={styles.progressRow}>
                    <Text style={styles.progressLabel}>Average</Text>
                    <View style={styles.progressBarBackground}>
                      <View
                        style={[
                          styles.progressBarFill,
                          {
                            width: `${calRatingPercentage(rating?.average ?? 0, singleProduct?.productRating.totalRatings ?? 0)}`,
                          },
                        ]}
                      />
                    </View>
                    <Text style={styles.progressPercentage}>
                      {calRatingPercentage(
                        rating?.average ?? 0,
                        singleProduct?.productRating.totalRatings ?? 0,
                      )}
                    </Text>
                  </View>
                </View>
                <View style={styles.progressSection}>
                  <View style={styles.progressRow}>
                    <Text style={styles.progressLabel}>Poor</Text>
                    <View style={styles.progressBarBackground}>
                      <View
                        style={[
                          styles.progressBarFill,
                          {
                            width: `${calRatingPercentage(rating?.poor ?? 0, singleProduct?.productRating.totalRatings ?? 0)}`,
                          },
                        ]}
                      />
                    </View>
                    <Text style={styles.progressPercentage}>
                      {calRatingPercentage(
                        rating?.poor ?? 0,
                        singleProduct?.productRating.totalRatings ?? 0,
                      )}
                    </Text>
                  </View>
                </View>
                <View style={styles.progressSection}>
                  <View style={styles.progressRow}>
                    <Text style={styles.progressLabel}>Terrible</Text>
                    <View style={styles.progressBarBackground}>
                      <View
                        style={[
                          styles.progressBarFill,
                          {
                            width: `${calRatingPercentage(rating?.terrible ?? 0, singleProduct?.productRating.totalRatings ?? 0)}`,
                          },
                        ]}
                      />
                    </View>
                    <Text style={styles.progressPercentage}>
                      {calRatingPercentage(
                        rating?.terrible ?? 0,
                        singleProduct?.productRating.totalRatings ?? 0,
                      )}
                    </Text>
                  </View>
                </View>
              </View>

              {/* USER REVIEW CARD */}

              {/* Top Row */}
              {rating?.users.map((user) => (
                <View key={user._id} style={styles.userReviewCard}>
                  <View style={styles.userInfoRow}>
                    {/* Avatar */}
                    <Image
                      source={{
                        uri: replaceHttp(user.user.avatar),
                      }}
                      style={styles.userImage}
                    />

                    {/* Name + Date */}
                    <View style={styles.userDetails}>
                      <Text style={styles.userName}>{user.user.fullName}</Text>

                      <View style={styles.reviewMetaRow}>
                        {/* Rating */}
                        <View style={styles.ratingBox}>
                          <Ionicons
                            name="star"
                            size={14}
                            color={COLORS.white}
                          />
                          <Text style={styles.ratingText}>
                            {String(user.rating)}
                          </Text>
                        </View>

                        <Text style={styles.dot}>•</Text>

                        <Text style={styles.reviewDate}>
                          <Text style={styles.reviewDate}>
                            {user?.createdAt
                              ? new Date(user.createdAt).toLocaleDateString(
                                  "gu-IN",
                                )
                              : "No Date"}
                          </Text>
                        </Text>
                      </View>
                    </View>
                  </View>

                  {/* Review Text */}
                  <Text style={styles.reviewDescription}>{user.comment}</Text>
                </View>
              ))}
            </>
          )}
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

export default ProductDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primary,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  scrollContent: {
    marginHorizontal: SPACING.md,
  },

  productDetailContainer: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: RADIUS.sm,
    padding: SPACING.md,
  },

  imageContainer: {
    width: "100%",
    borderRadius: RADIUS.sm,
    overflow: "hidden",
  },

  image: {
    width: "100%",
    height: 320,
  },

  thumbnailList: {
    marginTop: SPACING.md,
    gap: SPACING.sm,
  },

  thumbnailWrapper: {
    width: 70,
    height: 70,
    borderRadius: RADIUS.sm,
    borderWidth: 1,
    borderColor: COLORS.border,
    overflow: "hidden",
    marginRight: SPACING.sm,
  },

  activeThumbnail: {
    borderColor: COLORS.white,
    borderWidth: 2,
  },

  thumbnailImage: {
    width: "100%",
    height: "100%",
  },

  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: SPACING.lg,
    gap: SPACING.md,
  },

  cartButtonText: {
    color: COLORS.black,
    fontWeight: "600",
    fontSize: 15,
  },

  buyButtonText: {
    color: COLORS.white,
    fontWeight: "700",
    fontSize: 15,
  },

  textContainer: {
    marginTop: SPACING.lg,
    gap: SPACING.md,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    paddingBottom: SPACING.lg,
  },

  productTitle: {
    fontSize: FONT_SIZE.lg,
    fontWeight: FONT_WEIGHT.bold,
    lineHeight: SPACING.xl,
  },

  productDescription: {
    fontSize: FONT_SIZE.md,
    lineHeight: SPACING.lg,
  },

  price: {
    fontSize: FONT_SIZE.lg,
    fontWeight: FONT_WEIGHT.bold,
    color: COLORS.black,
    marginTop: SPACING.sm,
  },

  stockContainer: {
    alignSelf: "flex-start",
    backgroundColor: COLORS.greenStatus,
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xs,
    borderRadius: RADIUS.md,
  },

  stockText: {
    color: COLORS.white,
    fontSize: FONT_SIZE.sm,
    fontWeight: FONT_WEIGHT.bold,
  },

  ratingContainer: {
    marginTop: SPACING.sm,
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.sm,
  },

  ratingBox: {
    backgroundColor: COLORS.blue,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xs,
    borderRadius: RADIUS.sm,
    gap: 4,
  },

  ratingText: {
    color: COLORS.white,
    fontWeight: FONT_WEIGHT.bold,
    fontSize: FONT_SIZE.md,
  },

  reviewText: {
    color: COLORS.gray,
    fontSize: FONT_SIZE.md,
  },

  reviewSection: {
    marginTop: SPACING.lg,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    paddingBottom: SPACING.xl,
  },

  reviewTitle: {
    fontSize: FONT_SIZE.lg,
    fontWeight: FONT_WEIGHT.bold,
    color: COLORS.black,
    marginBottom: SPACING.lg,
  },

  overallRatingContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },

  overallRating: {
    fontSize: FONT_SIZE.xl,
    fontWeight: FONT_WEIGHT.bold,
    color: COLORS.black,
  },

  ratingSubText: {
    textAlign: "center",
    color: COLORS.gray,
    fontSize: FONT_SIZE.md,
    marginTop: SPACING.xs,
  },

  progressSection: {
    marginTop: SPACING.lg,
    gap: SPACING.md,
  },

  progressRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  progressLabel: {
    width: 70,
    fontSize: FONT_SIZE.md,
    color: COLORS.gray,
  },

  progressBarBackground: {
    flex: 1,
    height: 12,
    backgroundColor: COLORS.border,
    borderRadius: RADIUS.full,
    overflow: "hidden",
    marginHorizontal: SPACING.sm,
  },

  progressBarFill: {
    height: "100%",
    backgroundColor: COLORS.yellow,
    borderRadius: RADIUS.full,
  },

  progressPercentage: {
    width: 40,
    textAlign: "right",
    fontSize: 14,
    color: COLORS.gray,
  },

  userReviewCard: {
    marginTop: SPACING.md,
    borderTopColor: COLORS.border,
    paddingBottom: SPACING.lg,
  },

  userInfoRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  userImage: {
    width: 50,
    height: 50,
    borderRadius: RADIUS.full,
  },

  userDetails: {
    marginLeft: SPACING.md,
    gap: 8,
  },

  userName: {
    fontSize: 16,
    fontWeight: FONT_WEIGHT.bold,
  },

  reviewMetaRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  userRatingBox: {
    backgroundColor: COLORS.blue,
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xs,
    borderRadius: RADIUS.sm,
  },

  userRatingText: {
    color: COLORS.white,
    fontWeight: FONT_WEIGHT.bold,
    fontSize: FONT_SIZE.md,
  },

  dot: {
    marginHorizontal: SPACING.sm,
    color: COLORS.gray,
    fontSize: FONT_SIZE.lg,
  },

  reviewDate: {
    color: COLORS.gray,
    fontSize: 15,
  },

  reviewDescription: {
    marginTop: SPACING.lg,
    fontSize: FONT_SIZE.md,
    lineHeight: 25,
  },
});
