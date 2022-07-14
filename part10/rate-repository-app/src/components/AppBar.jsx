import { View, StyleSheet, ScrollView } from "react-native";
import { Link } from "react-router-native";
import Text from "./Text";
import Constants from "expo-constants";

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight * 3,
    paddingBottom: Constants.statusBarHeight,
    backgroundColor: "#24292e",
    padding: 36,
  },
});

const AppBar = () => {
  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <Link to="/" style={{ marginRight: 8 }}>
          <Text color="white" fontSize="subheading">
            Repositories
          </Text>
        </Link>
        <Link to="/sign-in">
          <Text color="white" fontSize="subheading">
            Sign in
          </Text>
        </Link>
      </ScrollView>
    </View>
  );
};

export default AppBar;
