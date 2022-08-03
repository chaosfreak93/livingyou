export const enum WebViewEvents {
    // Discord Auth
    DISCORD_AUTH_START_LOGIN = 'discordAuth:startLogin',
    // Character Selector
    CHAR_SELECTOR_READY = 'charSelector:Ready',
    CHAR_SELECTOR_SET_DATA = 'charSelector:SetData',
    CHAR_SELECTOR_SHOW_PED = 'charSelector:ShowPed',
    CHAR_SELECTOR_OPEN_CHAR_CREATOR = 'charSelector:OpenCharCreator',
    CHAR_SELECTOR_SELECT_CHARACTER = 'charSelector:SelectCharacter',
    // HUD
    HUD_READY = 'hud:Ready',
    HUD_OPEN_VEHICLE_HUD = 'hud:OpenVehicleHUD',
    HUD_CLOSE_VEHICLE_HUD = 'hud:CloseVehicleHUD',
    HUD_UPDATE_VEHICLE_DATA = 'hud:UpdateVehicleData',
}
