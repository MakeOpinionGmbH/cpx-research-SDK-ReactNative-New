import React, { FunctionComponent } from "react";
import {
  SafeAreaView,
  Text,
  View,
} from "react-native";

import styles from "./Header.style";

interface IProps
{
  title: string;
}

const Header: FunctionComponent<IProps> = ({ title }) => (
  <View style={styles.header}>
    <SafeAreaView>
      <View style={styles.headerContentWrapper}>
        <Text style={styles.headerText}>{title}</Text>
      </View>
    </SafeAreaView>
  </View>
);

export default Header;
