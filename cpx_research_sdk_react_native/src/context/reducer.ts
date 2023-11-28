import {
  ISetNotificationWidgetHiding,
  ISetCpxState, IGetWidgetImages, IUpdateAppContext
} from "./actionInterfaces";
import {
  getWidgetImages,
  setCpxState, setNotificationWidgetHiding, updateAppContext
} from "./actions";
import { IAppStore } from "./context";

const appReducer = (state: IAppStore, action: IAppContextActions): IAppStore | void =>
{
  switch (action.actionType)
  {
    case "setNotificationWidgetHiding":
      return setNotificationWidgetHiding(state, action.payload);
    case "setCpxState":
      return setCpxState(state, action.payload);
    case "getWidgetImages":
      return getWidgetImages(state);
    case "updateAppContext":
      return updateAppContext(state, action.payload);
  }
};

export default appReducer;

export type IAppContextActions =
  ISetCpxState |
  IGetWidgetImages |
  IUpdateAppContext |
  ISetNotificationWidgetHiding;
