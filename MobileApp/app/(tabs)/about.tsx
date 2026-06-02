import React, { useEffect, useState } from "react";

import {
  ActivityIndicator,
  Image,
  Linking,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { Feather } from "@expo/vector-icons";

import { COLORS } from "@/theme/colors";
import { SPACING } from "@/theme/spacing";
import { RADIUS } from "@/theme/radius";
import { FONT_SIZE, FONT_WEIGHT } from "@/theme/typography";

import { TEXTS } from "@/constants/plainText";
import { SafeAreaView } from "react-native-safe-area-context";

const about = () => {
  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <View style={styles.header}>
        <Text style={styles.title}>{TEXTS.ABOUT.TITLE}</Text>

        <Text style={styles.subtitle}>{TEXTS.ABOUT.SUBTITLE}</Text>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Profile Card */}
        <View style={styles.card}>
          <Image
            source={require("@/assets/images/me.png")}
            style={styles.avatar}
          />

          <Text style={styles.name}>{TEXTS.ABOUT.DEVELOPER_NAME}</Text>

          <Text style={styles.role}>{TEXTS.ABOUT.ROLE}</Text>

          <Text style={styles.bio}>{TEXTS.ABOUT.BIO}</Text>
        </View>

        {/* App Info */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>{TEXTS.ABOUT.APPLICATION}</Text>

          <View style={styles.infoRow}>
            <Text style={styles.label}>{TEXTS.ABOUT.APP_NAME_LABEL}</Text>

            <Text style={styles.value}>{TEXTS.ABOUT.APP_NAME}</Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.label}>{TEXTS.ABOUT.VERSION_LABEL}</Text>

            <Text style={styles.value}>{TEXTS.ABOUT.APP_VERSION}</Text>
          </View>
        </View>

        {/* Developer Info */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>{TEXTS.ABOUT.DEVELOPER}</Text>

          <View style={styles.infoRow}>
            <Text style={styles.label}>{TEXTS.ABOUT.DEVELOPER_LABEL}</Text>

            <Text style={styles.value}>{TEXTS.ABOUT.DEVELOPER_NAME}</Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.label}>{TEXTS.ABOUT.GITHUB}</Text>

            <Text style={styles.value}>@{TEXTS.ABOUT.GITHUB_USERNAME}</Text>
          </View>
        </View>

        {/* Connect */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>{TEXTS.ABOUT.CONTACT_TITLE}</Text>

          <Pressable
            style={styles.linkButton}
            onPress={() =>
              Linking.openURL("https://github.com/hardipsolanki22")
            }
          >
            <Feather name="github" size={18} color={COLORS.black} />

            <Text style={styles.linkText}>github.com/hardipsolanki22</Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default about;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  header: {
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.md,
    paddingBottom: SPACING.lg,
    backgroundColor: COLORS.white,
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
  },

  scrollContent: {
    padding: SPACING.md,
    paddingBottom: SPACING["4xl"],
  },

  card: {
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.lg,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: SPACING.lg,
    marginBottom: SPACING.lg,
  },

  avatar: {
    width: 110,
    height: 110,
    borderRadius: RADIUS.full,
    alignSelf: "center",
  },

  name: {
    marginTop: SPACING.md,
    fontSize: FONT_SIZE.lg,
    fontWeight: FONT_WEIGHT.bold,
    color: COLORS.black,
    textAlign: "center",
  },

  role: {
    marginTop: SPACING.xs,
    fontSize: FONT_SIZE.sm,
    color: COLORS.gray,
    textAlign: "center",
  },

  bio: {
    marginTop: SPACING.md,
    textAlign: "center",
    color: COLORS.gray,
    lineHeight: 22,
    fontSize: FONT_SIZE.sm,
  },

  sectionTitle: {
    fontSize: FONT_SIZE.md,
    fontWeight: FONT_WEIGHT.bold,
    color: COLORS.black,
    marginBottom: SPACING.md,
  },

  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: SPACING.md,
  },

  label: {
    fontSize: FONT_SIZE.md,
    color: COLORS.gray,
  },

  value: {
    fontSize: FONT_SIZE.md,
    fontWeight: FONT_WEIGHT.medium,
    color: COLORS.black,
  },

  linkButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.sm,
  },

  linkText: {
    fontSize: FONT_SIZE.md,
    color: COLORS.black,
  },
});
