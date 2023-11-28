import React, { FunctionComponent, useContext } from "react";
import { Image, ImageSourcePropType, TouchableOpacity } from "react-native";

import AppStoreContext, { IAppContext } from "../../../context/context";
import styles from "./WebviewIcon.style";

interface IProps
{
  icon: ImageSourcePropType;
  isActive: boolean;
  onPress: () => void;
}

export const WebviewIcon: FunctionComponent<IProps> = ({
  icon,
  isActive,
  onPress,
}) =>
{
  const { appContext } = useContext<IAppContext>(AppStoreContext);

  return (
    <TouchableOpacity
      activeOpacity={.6}
      disabled={isActive}
      onPress={onPress}
      style={[styles.iconWrapper, isActive && { backgroundColor: appContext.config.accentColor }]}>
      <Image style={styles.iconImage} source={icon}/>
    </TouchableOpacity>
  );
};
