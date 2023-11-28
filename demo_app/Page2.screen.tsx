import { StackScreenProps } from "@react-navigation/stack";
import React, { FunctionComponent } from "react";
import {
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import styles from "./screens.style";

const Page2Screen: FunctionComponent<StackScreenProps<any>> = ({ navigation }) => (
  <SafeAreaView style={styles.appWrapper}>
    <View style={styles.viewContainer}>
      <Text style={styles.text}>Demo App Page 2</Text>
      <TouchableOpacity style={styles.button} onPress={() => navigation.pop()}>
        <Text style={styles.buttonText}>Go Back</Text>
      </TouchableOpacity>
    </View>
  </SafeAreaView>
);

export default Page2Screen;
