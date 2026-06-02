import { withLayoutContext } from "expo-router";
import {
  createMaterialTopTabNavigator,
  MaterialTopTabNavigationEventMap,
  MaterialTopTabNavigationOptions,
} from "@react-navigation/material-top-tabs";
import { ParamListBase, TabNavigationState } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";

import { COLORS } from "@/theme/colors";
import { FONT_SIZE, FONT_WEIGHT } from "@/theme/typography";
import { SPACING } from "@/theme/spacing";

const { Navigator } = createMaterialTopTabNavigator();

export const MaterialTopTabs = withLayoutContext<
  MaterialTopTabNavigationOptions,
  typeof Navigator,
  TabNavigationState<ParamListBase>,
  MaterialTopTabNavigationEventMap
>(Navigator);

const Layout = () => {
  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: COLORS.white }}
      edges={["top"]}
    >
      <MaterialTopTabs
        screenOptions={{
          tabBarScrollEnabled: false,

          tabBarStyle: {
            backgroundColor: COLORS.white,
            elevation: 0,
            shadowOpacity: 0,

            borderBottomWidth: 1,
            borderBottomColor: COLORS.border,
          },

          tabBarIndicatorStyle: {
            backgroundColor: COLORS.black,
            height: 3,
            borderRadius: 999,
          },

          tabBarLabelStyle: {
            fontSize: FONT_SIZE.sm,
            fontWeight: FONT_WEIGHT.semibold,
            textTransform: "none",
          },

          tabBarActiveTintColor: COLORS.black,

          tabBarInactiveTintColor: COLORS.gray,

          tabBarItemStyle: {
            paddingVertical: SPACING.xs,
          },

          tabBarPressColor: "transparent",
        }}
      />
    </SafeAreaView>
  );
};

export default Layout;
