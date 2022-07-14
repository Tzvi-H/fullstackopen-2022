import Text from "./Text";
import theme from "../theme";
import { TextInput, Pressable, View, StyleSheet } from "react-native";
import { Formik, useField } from "formik";

const styles = StyleSheet.create({
  button: {
    backgroundColor: theme.colors.primary,
    padding: 12,
    borderRadius: 4,
    overflow: "hidden",
    margin: 8,
    alignSelf: "stretch",
    textAlign: "center",
  },
  input: {
    alignSelf: "stretch",
    borderWidth: 1,
    borderRadius: 4,
    margin: 8,
    padding: 12,
    borderColor: "gray",
  },
  container: {
    padding: 8,
  },
});

const initialValues = {
  username: "",
  password: "",
};

const SignInForm = ({ onSubmit }) => {
  const [usernameField, usernameMeta, usernameHelpers] = useField("username");
  const [passwordField, passwordMeta, passwordHelpers] = useField("password");

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Username"
        value={usernameField.value}
        onChangeText={(text) => usernameHelpers.setValue(text)}
        style={styles.input}
      />
      <TextInput
        secureTextEntry
        placeholder="Password"
        value={passwordField.value}
        onChangeText={(text) => passwordHelpers.setValue(text)}
        style={styles.input}
      />
      <Pressable onPress={onSubmit}>
        <Text color="white" fontSize="subheading" style={styles.button}>
          Sign in
        </Text>
      </Pressable>
    </View>
  );
};

const SignIn = () => {
  const onSubmit = (values) => {
    console.log(values);
  };

  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit}>
      {({ handleSubmit }) => <SignInForm onSubmit={handleSubmit} />}
    </Formik>
  );
};

export default SignIn;
