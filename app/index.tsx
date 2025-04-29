import { router } from "expo-router";
import { Image, StyleSheet, Text, View, TouchableOpacity } from "react-native";

export const screenOptions = {
  headerShown: false,
};
export default function Index() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>My Todo</Text>
      <Image
        source={require("../assets/images/favicon.png")}
        style={styles.image}
        resizeMode="contain"
      />
      <TouchableOpacity
        style={styles.buttonContainer}
        onPress={() => router.push("/todo/home")}
      >
        <Text style={styles.button}>Let's get started</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    color: "#fff",
  },
  text: {
    fontSize: 50,
    fontWeight: "500",
    color: "#0818A8",
    fontFamily: "Winky-bold",
    // marginBottom: 20,
    marginTop: -30,
  },
  image: {
    width: 400,
    height: 500,
    marginBottom: 20,
    transform: [{ rotate: "-15deg" }],
  },
  buttonContainer: {
    width: "100%",
    backgroundColor: "#008080",
    borderRadius: 5,
    alignItems: "center",
    paddingVertical: 15,
  },
  button: {
    color: "#fff",
    fontFamily: "Winky-bold",
    fontSize: 20,
  },
});
