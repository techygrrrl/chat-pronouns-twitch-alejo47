import * as Constants from "./constants";
import * as Actions from "./actions";
import { ISettings } from ".";

export const changeSettings = (settings: ISettings): Actions.SettingsChanged => ({
    type: Constants.SETTINGS_CHANGED,
    payload: settings
})