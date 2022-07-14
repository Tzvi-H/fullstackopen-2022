import Text from "./Text";
import theme from "../theme";
import { TextInput, Pressable, View, StyleSheet } from "react-native";
import { Formik, useField } from "formik";
import * as yup from "yup";

const validationSchema = yup.object().shape({
  username: yup.string().required("Username is required"),
  password: yup.string().required("Password is required"),
});

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
  },
  container: {
    padding: 8,
  },
  errorText: {
    color: "#d73a4a",
    marginLeft: 8,
  },
});

const initialValues = {
  username: "",
  password: "",
};

const SignInForm = ({ onSubmit }) => {
  const [usernameField, usernameMeta, usernameHelpers] = useField("username");
  const [passwordField, passwordMeta, passwordHelpers] = useField("password");

  const showUsernameError = usernameMeta.touched && usernameMeta.error;
  const showPasswordError = passwordMeta.touched && passwordMeta.error;

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Username"
        value={usernameField.value}
        onChangeText={(text) => usernameHelpers.setValue(text)}
        style={{
          ...styles.input,
          ...{ borderColor: usernameMeta.error ? "#d73a4a" : "gray" },
        }}
      />
      {showUsernameError && (
        <Text style={styles.errorText}>{usernameMeta.error}</Text>
      )}
      <TextInput
        secureTextEntry
        placeholder="Password"
        value={passwordField.value}
        onChangeText={(text) => passwordHelpers.setValue(text)}
        style={{
          ...styles.input,
          ...{ borderColor: passwordMeta.error ? "#d73a4a" : "gray" },
        }}
      />
      {showPasswordError && (
        <Text style={styles.errorText}>{passwordMeta.error}</Text>
      )}
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
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ handleSubmit }) => <SignInForm onSubmit={handleSubmit} />}
    </Formik>
  );
};

export default SignIn;
