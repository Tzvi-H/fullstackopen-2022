import { View, StyleSheet, Pressable } from "react-native";
import Text from "./Text";
import Constants from "expo-constants";

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    paddingBottom: Constants.statusBarHeight,
    backgroundColor: "#24292e",
  },
});

const AppBar = () => {
  return (
    <View style={styles.container}>
      <Pressable>
        <Text color="textSecondary" fontSize="subheading">
          Repositories
        </Text>
      </Pressable>
    </View>
  );
};

export default AppBar;
