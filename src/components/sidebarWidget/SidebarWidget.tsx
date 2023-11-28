import React, { FunctionComponent, useContext } from "react";
import {
  View, Image, StyleProp, ViewStyle, TouchableWithoutFeedback
} from "react-native";

import AppStoreContext, { IAppContext } from "../../context/context";
import { globalStyles } from "../../utils/styles";
import styles from "./SidebarWidget.style";

interface IProps
{
  containerHeight?: number;
  containerWidth?: number;
  onPress: () => void;
}

export const SidebarWidget: FunctionComponent<IProps> = ({
  containerHeight,
  containerWidth,
  onPress
}) =>
{
  const { appContext } = useContext<IAppContext>(AppStoreContext);

  if(!appContext.config.sidebarWidget || !appContext.widgetImages.sidebar)
  {
    return null;
  }

  const { height, width } = appContext.config.sidebarWidget;

  const renderedHeight = Math.min(height, (containerHeight || 0) * 0.8);
  const renderedWidth = Math.min(width, (containerWidth || 0) * 0.25);

  let containerStyle: StyleProp<ViewStyle> = {
    height: renderedHeight,
    top: "50%",
    transform: [{ translateY: -(renderedHeight / 2) }],
    width: renderedWidth,
  };

  switch (appContext.config.sidebarWidget.position)
  {
    case "left":
      containerStyle = {
        ...containerStyle,
        left: 0,
        shadowOffset: { height: 0, width: 1 }
      };
      break;
    case "right":
      containerStyle = {
        ...containerStyle,
        right: 0,
        shadowOffset: { height: 0, width: -1 },
      };
      break;
  }

  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={[globalStyles.widgetsShadow, styles.container, containerStyle]}>
        <Image
          source={{ uri: appContext.widgetImages.sidebar }}
          style={styles.image}
        />
      </View>
    </TouchableWithoutFeedback>
  );
};
