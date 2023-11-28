import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  closeIcon: {
    fontSize: 20,
    lineHeight: 20
  },
  closeIconContainer: {
    alignItems: "center",
    height: 34,
    justifyContent: "center",
    position: "absolute",
    right: 0,
    top: 0,
    width: 32,
    zIndex: 1
  },
  container: {
    position: "absolute",
    shadowOffset: { height: 1, width: 0 },
  },
  image: {
    height: "100%",
    resizeMode: "cover",
    width: "100%",
  }
});

export default styles;
