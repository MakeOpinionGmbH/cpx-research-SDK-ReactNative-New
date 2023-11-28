import React, { FunctionComponent, useContext } from "react";
import {
  View, Image, StyleProp, ViewStyle, TouchableWithoutFeedback, Text
} from "react-native";

import AppStoreContext, { IAppContext } from "../../context/context";
import { globalStyles } from "../../utils/styles";
import styles from "./NotificationWidget.style";

interface IProps
{
  containerHeight?: number;
  containerWidth?: number;
  onPress: () => void;
}

export const NotificationWidget: FunctionComponent<IProps> = ({
  containerHeight,
  containerWidth,
  onPress
}) =>
{
  const { appContext, appDispatch } = useContext<IAppContext>(AppStoreContext);

  if(!appContext.config.notificationWidget || !appContext.widgetImages.notification)
  {
    return null;
  }

  const {
    height,
    textColor,
    width
  } = appContext.config.notificationWidget;

  const renderedHeight = Math.min(height, (containerHeight || 0) * 0.25);
  const renderedWidth = Math.min(width, (containerWidth || 0) * 0.8);

  let containerStyle: StyleProp<ViewStyle> = {
    alignSelf: "center",
    height: renderedHeight,
    width: renderedWidth,
  };

  switch (appContext.config.notificationWidget.position)
  {
    case "top":
      containerStyle = {
        ...containerStyle,
        top: 0
      };
      break;
    case "bottom":
      containerStyle = {
        ...containerStyle,
        bottom: 0,
      };
      break;
  }

  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={[globalStyles.widgetsShadow, styles.container, containerStyle]}>
        <TouchableWithoutFeedback onPress={() =>
        {
          appDispatch({
            actionType: "setNotificationWidgetHiding",
            payload: { isHidden: true }
          });
        }}>
          <View style={styles.closeIconContainer}>
            <Text style={[styles.closeIcon, { color: textColor }]}>&times;</Text>
          </View>
        </TouchableWithoutFeedback>
        <Image
          source={{ uri: appContext.widgetImages.notification }}
          style={styles.image}
        />
      </View>
    </TouchableWithoutFeedback>
  );
};
