import { StatusBar, StyleSheet } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "@/components/home/Header";
import Products from "@/components/home/Products";
import { COLORS } from "@/theme/colors";

const home = () => {
  return (
    <SafeAreaView style={styles.safeContainer} edges={["top"]}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.black} />
      <Header />
      <Products />
    </SafeAreaView>
  );
};

export default home;

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: COLORS.primary,

  },
});
