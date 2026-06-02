import React, { useEffect, useRef, useState } from "react";
import {
  View,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { AntDesign, Entypo } from "@expo/vector-icons";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "@/theme/sizes";
import { COLORS } from "@/theme/colors";
import { SPACING } from "@/theme/spacing";
import { RADIUS } from "@/theme/radius";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { getHeroBanners } from "@/features/heroBannerSlice";

const ImageSlider = () => {
  const dispatch = useAppDispatch();
  const { banners, loading } = useAppSelector((state) => state.heroBanners);

  useEffect(() => {
    if (!banners?.length) dispatch(getHeroBanners());
  }, []);

  const [activeIndex, setActiveIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);

  const scrollToIndex = (index: number) => {
    if ((index >= 0 && index < (banners?.length ?? 0))) {
      flatListRef.current?.scrollToIndex({ index, animated: true });
    }
  };

  const onViewRef = useRef(({ viewableItems }: any) => {
    if (viewableItems.length > 0) {
      setActiveIndex(viewableItems[0].index);
    }
  });

  return (
    <View style={styles.container}>
      {/* SLIDER */}
      <FlatList
        ref={flatListRef}
        data={banners}
        keyExtractor={(item) => item._id}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <View style={styles.slide}>
            <Image source={{ uri: item.image }} style={styles.image} />
          </View>
        )}
        onViewableItemsChanged={onViewRef.current}
        viewabilityConfig={{ viewAreaCoveragePercentThreshold: 50 }}
      />

      <TouchableOpacity
        style={[styles.arrow, { left: 10 }]}
        onPress={() => scrollToIndex(activeIndex - 1)}
      >
        <Entypo name="chevron-left" size={10} color={COLORS.black} />
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.arrow, { right: 30 }]}
        onPress={() => scrollToIndex(activeIndex + 1)}
      >
        <AntDesign name="right" size={10} color={COLORS.black} />
      </TouchableOpacity>
      <View style={styles.dotsContainer}>
        {banners?.map((_, index) => (
          <View
            key={index}
            style={[styles.dot, activeIndex === index && styles.activeDot]}
          />
        ))}
      </View>
    </View>
  );
};

export default ImageSlider;

const styles = StyleSheet.create({
  container: {
    width: SCREEN_WIDTH,
  },

  slide: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT / 5,
    position: "relative",
  },

  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },

  arrow: {
    position: "absolute",
    top: "50%",
    backgroundColor: COLORS.border,
    padding: SPACING.sm,
    borderRadius: RADIUS.full,
  },

  dotsContainer: {
    position: "absolute",
    bottom: 10,
    flexDirection: "row",
    alignSelf: "center",
  },

  dot: {
    width: 8,
    height: 8,
    borderRadius: RADIUS.full,
    backgroundColor: COLORS.gray300,
    marginHorizontal: SPACING.xs,
  },

  activeDot: {
    backgroundColor: COLORS.white,
    width: 10,
    height: 10,
    borderRadius: RADIUS.full,
  },
});
