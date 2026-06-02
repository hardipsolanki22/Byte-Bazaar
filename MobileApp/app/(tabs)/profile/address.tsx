import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Feather, Ionicons } from "@expo/vector-icons";
import { COLORS } from "@/theme/colors";
import { SPACING } from "@/theme/spacing";
import { FONT_SIZE, FONT_WEIGHT } from "@/theme/typography";
import { TEXTS } from "@/constants/plainText";
import Button from "@/components/common/Button";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { getAddresses } from "@/features/addressSlice";
import { BottomSheetBackdrop, BottomSheetModal } from "@gorhom/bottom-sheet";
import AddAddressBottomSheet from "@/components/sheet/AddOrUpdateAddress";

const Address = () => {
  const dispatch = useAppDispatch();

  const { addresses, loading } = useAppSelector(({ addresses }) => addresses);
  const [isUAddressUpdate, setIsUAddressUpdate] = useState(false);

  const [updateAddressId, setUpdateAddressId] = useState("");
  useEffect(() => {
    dispatch(getAddresses());
  }, [dispatch]);

  const bottomSheetRef = useRef<BottomSheetModal>(null);
  const snapPoints = useMemo(() => ["100%"], []);
  const openBottomSheet = () => {
    bottomSheetRef.current?.present();
  };

  const closeBottomSheet = () => {
    bottomSheetRef.current?.dismiss();
  };

  const renderAddressItem = ({ item }: any) => {
    return (
      <View style={styles.card}>
        <Pressable
          onPress={() => {
            setIsUAddressUpdate(true);
            setUpdateAddressId(item._id);
            openBottomSheet();
          }}
          style={styles.editButton}
        >
          <Feather name="edit-2" size={16} color={COLORS.black} />
        </Pressable>

        <View style={styles.cardHeader}>
          <View style={styles.locationBadge}>
            <Ionicons name="location" size={20} color={COLORS.black} />
          </View>

          <Text style={styles.addressType}>
            {item.isPrimary ? TEXTS.ADDRESS.HOME : TEXTS.ADDRESS.OTHER}
          </Text>
        </View>

        <View style={styles.infoContainer}>
          <Text style={styles.addressLine}>{item.addressLine}</Text>

          <Text style={styles.addressText}>
            {item.city}, {item.state}
          </Text>

          <Text style={styles.addressText}>
            {item.country} - {item.pincode}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>{TEXTS.ADDRESS.TITLE}</Text>

          <Text style={styles.subtitle}>{TEXTS.ADDRESS.SUBTITLE}</Text>

          <View style={styles.divider} />
        </View>
        {loading === "pending" ? (
          <View style={styles.loaderContainer}>
            <ActivityIndicator size="large" color={COLORS.logo} />
          </View>
        ) : (
          <FlatList
            data={addresses}
            keyExtractor={(item) => item._id}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.listContent}
            renderItem={renderAddressItem}
            ListFooterComponent={
              <Button
                title={TEXTS.ADDRESS.ADD_NEW}
                onPress={() => {
                  (setIsUAddressUpdate(false),
                    setUpdateAddressId(""),
                    openBottomSheet());
                }}
                style={styles.addButton}
              />
            }
          />
        )}
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
          title={isUAddressUpdate ? "Update Address" : "Add Address"}
          onClose={closeBottomSheet}
          updateAddressId={updateAddressId}
        />
      </BottomSheetModal>
    </>
  );
};

export default Address;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  iconContainer: {
    marginBottom: SPACING.md,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    backgroundColor: COLORS.white,
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.md,
    paddingBottom: SPACING.lg,
  },

  title: {
    fontSize: FONT_SIZE.xl,
    fontWeight: FONT_WEIGHT.bold,
    color: COLORS.black,
    textAlign: "center",
  },

  subtitle: {
    marginTop: SPACING.xs,
    fontSize: FONT_SIZE.sm,
    color: COLORS.gray,
    textAlign: "center",
    lineHeight: 20,
  },

  listContent: {
    padding: SPACING.md,
    paddingBottom: SPACING["4xl"],
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.border,
    marginVertical: SPACING.xl,
  },
  card: {
    backgroundColor: COLORS.white,
    borderRadius: 16,

    padding: SPACING.lg,
    marginBottom: SPACING.md,

    borderWidth: 1,
    borderColor: COLORS.border,
  },

  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: SPACING.md,
  },

  locationBadge: {
    width: 40,
    height: 40,
    borderRadius: 20,

    backgroundColor: COLORS.gray100,

    justifyContent: "center",
    alignItems: "center",

    marginRight: SPACING.sm,
  },

  editButton: {
    position: "absolute",
    top: SPACING.md,
    right: SPACING.md,

    width: 34,
    height: 34,

    borderRadius: 17,

    backgroundColor: COLORS.gray100,

    justifyContent: "center",
    alignItems: "center",

    zIndex: 10,
  },
  infoContainer: {
    gap: SPACING.xs,
  },

  addressType: {
    fontSize: FONT_SIZE.md,
    fontWeight: FONT_WEIGHT.bold,
    color: COLORS.black,
  },

  addressLine: {
    fontSize: FONT_SIZE.md,
    fontWeight: FONT_WEIGHT.medium,
    color: COLORS.black,
    lineHeight: 22,
  },

  addressText: {
    fontSize: FONT_SIZE.sm,
    color: COLORS.gray,
    lineHeight: 20,
  },
  addButton: {
    marginTop: SPACING.sm,
    marginBottom: SPACING.xl,
  },
});
