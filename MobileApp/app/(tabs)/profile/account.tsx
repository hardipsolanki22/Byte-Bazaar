import React, { useMemo, useRef } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { Feather } from "@expo/vector-icons";
import { COLORS } from "@/theme/colors";
import { SPACING } from "@/theme/spacing";
import { TEXTS } from "@/constants/plainText";
import { FONT_SIZE, FONT_WEIGHT } from "@/theme/typography";
import { useAppSelector } from "@/store/hooks";
import { BottomSheetBackdrop, BottomSheetModal } from "@gorhom/bottom-sheet";
import EditProfileBottomSheet from "@/components/sheet/UpdateUserProfile";

const Account = () => {
  const bottomSheetRef = useRef<BottomSheetModal>(null);
  const snapPoints = useMemo(() => ["100%"], []);
  const openBottomSheet = () => {
    bottomSheetRef.current?.present();
  };

  const closeBottomSheet = () => {
    bottomSheetRef.current?.dismiss();
  };

  const { userData } = useAppSelector(({ users }) => users);
  return (
    <>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>{TEXTS.ACCOUNT.TITLE}</Text>

          <Text style={styles.subtitle}>{TEXTS.ACCOUNT.SUBTITLE}</Text>
        </View>

        {/* Profile Card */}
        <View style={styles.profileCard}>
          <Pressable onPress={openBottomSheet} style={styles.editButton}>
            <Feather name="edit-2" size={16} color={COLORS.black} />
          </Pressable>

          <Image
            source={{
              uri: userData?.avatar,
            }}
            style={styles.profileImage}
          />

          <Text style={styles.userName}>{userData?.fullName}</Text>

          <Text style={styles.userEmail}>{userData?.email}</Text>

          <View style={styles.infoSection}>
            <View style={styles.infoRow}>
              <Text style={styles.label}>{TEXTS.ACCOUNT.FULL_NAME}</Text>

              <Text style={styles.value}>{userData?.fullName}</Text>
            </View>

            <View style={styles.rowDivider} />

            <View style={styles.infoRow}>
              <Text style={styles.label}>{TEXTS.ACCOUNT.EMAIL}</Text>

              <Text style={styles.value}>{userData?.email}</Text>
            </View>

            <View style={styles.rowDivider} />

            <View style={styles.infoRow}>
              <Text style={styles.label}>{TEXTS.ACCOUNT.PHONE}</Text>

              <Text style={styles.value}>{userData?.phoneNumber}</Text>
            </View>
          </View>
        </View>
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
            pressBehavior="close"
          />
        )}
      >
        <EditProfileBottomSheet onClose={closeBottomSheet} />
      </BottomSheetModal>
    </>
  );
};

export default Account;

const styles = StyleSheet.create({
  container: {
    flex: 1,
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

  profileCard: {
    margin: SPACING.md,

    backgroundColor: COLORS.white,
    borderRadius: 16,

    padding: SPACING.xl,

    borderWidth: 1,
    borderColor: COLORS.border,
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

  profileImage: {
    width: 120,
    height: 120,

    borderRadius: 60,

    alignSelf: "center",
  },

  userName: {
    marginTop: SPACING.md,

    fontSize: FONT_SIZE.lg,
    fontWeight: FONT_WEIGHT.bold,

    color: COLORS.black,
    textAlign: "center",
  },

  userEmail: {
    marginTop: SPACING.xs,

    fontSize: FONT_SIZE.sm,
    color: COLORS.gray,

    textAlign: "center",
  },

  infoSection: {
    marginTop: SPACING.xl,
  },

  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",

    paddingVertical: SPACING.md,
  },

  rowDivider: {
    height: 1,
    backgroundColor: COLORS.border,
  },

  label: {
    fontSize: FONT_SIZE.md,
    fontWeight: FONT_WEIGHT.medium,
    color: COLORS.gray,
  },

  value: {
    flex: 1,

    marginLeft: SPACING.md,

    textAlign: "right",

    fontSize: FONT_SIZE.md,
    fontWeight: FONT_WEIGHT.medium,

    color: COLORS.black,
  },
});
