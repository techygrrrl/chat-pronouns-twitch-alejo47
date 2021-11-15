import { settingsReducer } from "./reducers"

export interface ISettings {
    backgroundColor?: string;
    foregroundColor?: string;
    outlineColor?: string;
    display: 'badge-compact' | 'badge-large' | 'on-username-hover' | 'on-badge-hover';
    fontMultiplier: number;
}

export const defaultSettingsState: ISettings = {
    backgroundColor: 'transparent',
    foregroundColor: 'inherit',
    outlineColor: 'inherit',
    display: 'badge-large',
    fontMultiplier: 1,
}
