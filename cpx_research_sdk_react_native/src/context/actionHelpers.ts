import axios from "axios";

import { endpoints, urls } from "../utils/globals";
import { ICornerWidgetStyle, INotificationWidgetStyle, ISidebarWidgetStyle } from "./context";

interface IGetCpxImageRequestParams
{
  backgroundcolor: string;
  corner: number;
  emptycolor: "transparent";
  height: number;
  position: string;
  text: string;
  textcolor: string;
  textsize: number;
  type: "corner" | "screen" | "side";
  width: number;
}

export const getWidgetImageRequestParams = (
  type: "corner" | "screen" | "side",
  widgetStyle: INotificationWidgetStyle | ISidebarWidgetStyle | ICornerWidgetStyle
): IGetCpxImageRequestParams => ({
  backgroundcolor: "." + widgetStyle.backgroundColor.substring(1),
  corner: widgetStyle.roundedCorners,
  emptycolor: "transparent",
  height: "height" in widgetStyle ? widgetStyle.height : widgetStyle.size,
  position: widgetStyle.position,
  text: widgetStyle.text,
  textcolor: "." + widgetStyle.textColor.substring(1),
  textsize: widgetStyle.textSize,
  type,
  width: "width" in widgetStyle ? widgetStyle.width : widgetStyle.size,
});

export const buildWidgetImageUrl = (params: IGetCpxImageRequestParams): string =>
{
  console.log("build " + params.type + " widget image url");

  return axios.getUri({
    params,
    url: urls.imagesUrl + endpoints.imagesEndpoint
  });
};
