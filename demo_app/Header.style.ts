import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#2196F3FF",
    elevation: 8,
    shadowColor: "#000",
    shadowOffset: {
      height: 2,
      width: 0
    },
    shadowOpacity: 0.18,
    shadowRadius: 3,
  },
  headerContentWrapper: {
    padding: 16,
  },
  headerText: {
    color: "white",
    fontSize: 20,
    fontWeight: "600",
    textAlign: "center"
  }
});

export default styles;
