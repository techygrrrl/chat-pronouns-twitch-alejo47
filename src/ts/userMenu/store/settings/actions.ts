import * as Constants from "./constants";
import { ISettings } from ".";

export interface SettingsChanged {
    type: typeof Constants.SETTINGS_CHANGED,
    payload: ISettings
}

export type Actions = SettingsChanged