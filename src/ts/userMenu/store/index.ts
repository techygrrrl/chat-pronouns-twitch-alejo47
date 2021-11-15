import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import { settingsReducer } from "./settings/reducers";
import { defaultSettingsState, ISettings } from "./settings";

export interface IRootState {
    settings: ISettings;
}

export const defaultState: IRootState = {
    settings: defaultSettingsState,
}

const reducers = combineReducers<IRootState>({
    settings: settingsReducer,
});

export const store = createStore(reducers, composeWithDevTools(applyMiddleware(thunk)));