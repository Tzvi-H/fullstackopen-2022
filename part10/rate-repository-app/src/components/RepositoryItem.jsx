import { View, Image, StyleSheet } from "react-native";
import Text from "./Text";
import theme from "../theme";

const styles = StyleSheet.create({
  tinyLogo: {
    width: 50,
    height: 50,
    marginRight: 12,
    borderRadius: 4,
  },
  logo: {
    width: 66,
    height: 58,
  },
  container: {
    padding: 36,
    backgroundColor: "white",
  },
  flexContainerRow: {
    flexDirection: "row",
  },
  flexContainerColumn: {
    flexDirection: "column",
    fontSize: theme.fontSizes.subheading,
  },
  button: {
    backgroundColor: theme.colors.primary,
    padding: 6,
    borderRadius: 4,
    overflow: "hidden",
  },
});

const RepositoryItem = ({ item }) => {
  return (
    <View style={styles.container}>
      <View style={styles.flexContainerRow}>
        <Image
          style={styles.tinyLogo}
          source={{
            uri: item.ownerAvatarUrl,
          }}
        />

        <View style={styles.flexContainerColumn}>
          <Text
            color="textPrimary"
            fontSize="subheading"
            fontWeight="bold"
            style={{ margin: 4 }}
          >
            {item.fullName}
          </Text>
          <Text
            color="textSecondary"
            fontSize="subheading"
            style={{ margin: 4 }}
          >
            {item.description}
          </Text>
          <Text
            color="white"
            fontSize="subheading"
            style={{
              ...styles.button,
              ...{ margin: 4, alignSelf: "flex-start" },
            }}
          >
            {item.language}
          </Text>
        </View>
      </View>

      <View
        style={{
          ...styles.flexContainerRow,
          justifyContent: "space-around",
          marginTop: 14,
        }}
      >
        <View style={styles.flexContainerColumn}>
          <Text
            color="textPrimary"
            fontWeight="bold"
            style={{ marginBottom: 4 }}
          >
            {polishCount(item.stargazersCount)}
          </Text>
          <Text color="textSecondary">Stars</Text>
        </View>

        <View style={styles.flexContainerColumn}>
          <Text
            color="textPrimary"
            fontWeight="bold"
            style={{ marginBottom: 8 }}
          >
            {polishCount(item.forksCount)}
          </Text>
          <Text color="textSecondary">Forks</Text>
        </View>

        <View style={styles.flexContainerColumn}>
          <Text
            color="textPrimary"
            fontWeight="bold"
            style={{ marginBottom: 8 }}
          >
            {polishCount(item.reviewCount)}
          </Text>
          <Text color="textSecondary">Reviews</Text>
        </View>

        <View style={styles.flexContainerColumn}>
          <Text
            color="textPrimary"
            fontWeight="bold"
            style={{ marginBottom: 8 }}
          >
            {polishCount(item.ratingAverage)}
          </Text>
          <Text color="textSecondary">Rating</Text>
        </View>
      </View>
    </View>
  );
};

const polishCount = (num) => {
  if (num < 1000) return num;

  return (num / 1000).toFixed(1) + "k";
};

export default RepositoryItem;
