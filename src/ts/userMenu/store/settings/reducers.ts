import { Actions } from "./actions";
import * as Constants from "./constants";
import { defaultSettingsState, ISettings } from ".";

export const settingsReducer = (state: ISettings = defaultSettingsState, action: Actions) => {
    switch (action.type) {
        case Constants.SETTINGS_CHANGED:
            state = {
                ...action.payload
            };
            return state
        default:
            return state
    }
}