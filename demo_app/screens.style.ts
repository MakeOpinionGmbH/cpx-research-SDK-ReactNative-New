import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  appWrapper: {
    flex: 1,
  },
  button: {
    alignItems: "center",
    backgroundColor: "#2196F3FF",
    borderRadius: 4,
    justifyContent: "center",
    marginBottom: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  buttonText: {
    color: "white",
    fontWeight: "600"
  },
  text: {
    fontSize: 23,
    fontWeight: "700",
    marginBottom: 20,
  },
  viewContainer: {
    alignItems: "center",
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
  }
});

export default styles;
