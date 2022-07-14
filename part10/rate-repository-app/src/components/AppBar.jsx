import { View, StyleSheet } from "react-native";
import { Link } from "react-router-native";
import Text from "./Text";
import Constants from "expo-constants";

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight * 3,
    paddingBottom: Constants.statusBarHeight,
    backgroundColor: "#24292e",
    padding: 36,
    flexDirection: "row",
  },
});

const AppBar = () => {
  return (
    <View style={styles.container}>
      <Link to="/" style={{ marginRight: 8 }}>
        <Text color="textSecondary" fontSize="subheading">
          Repositories
        </Text>
      </Link>
      <Link to="/sign-in">
        <Text color="textSecondary" fontSize="subheading">
          Sign in
        </Text>
      </Link>
    </View>
  );
};

export default AppBar;
