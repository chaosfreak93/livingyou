export const enum WebViewEvents {
    // Discord Auth
    DISCORD_AUTH_START_LOGIN = 'discordAuth:startLogin',
    // Character Selector
    CHAR_SELECTOR_READY = 'charSelector:Ready',
    CHAR_SELECTOR_SET_DATA = 'charSelector:SetData',
    CHAR_SELECTOR_SHOW_PED = 'charSelector:ShowPed',
    CHAR_SELECTOR_OPEN_CHAR_CREATOR = 'charSelector:OpenCharCreator',
    CHAR_SELECTOR_SELECT_CHARACTER = 'charSelector:SelectCharacter',
    // Character Creator
    CHAR_CREATOR_READY = 'charCreator:Ready',
    CHAR_CREATOR_SET_DATA = 'charCreator:SetData',
    CHAR_CREATOR_CHANGE_GENDER = 'charCreator:ChangeGender',
    CHAR_CREATOR_SET_HEAD_BLEND_DATA = 'charCreator:SetHeadBlendData',
    CHAR_CREATOR_SET_FACE_FEATURE = 'charCreator:SetFaceFeature',
    CHAR_CREATOR_SET_HEAD_OVERLAY = 'charCreator:SetHeadOverlay',
    CHAR_CREATOR_SET_HEAD_OVERLAY_COLOR = 'charCreator:SetHeadOverlayColor',
    CHAR_CREATOR_SET_EYE_COLOR = 'charCreator:SetEyeColor',
    CHAR_CREATOR_SET_HAIR_COLOR = 'charCreator:SetHairColor',
    CHAR_CREATOR_SET_CLOTHE = 'charCreator:SetClothe',
    CHAR_CREATOR_SET_PROP = 'charCreator:SetProp',
    CHAR_CREATOR_FINISH_CHARACTER = 'charCreator:FinishCharacter',
    // Inventory
    INVENTORY_READY = 'inventory:Ready',
    INVENTORY_SET_DATA = 'inventory:SetData',
    INVENTORY_USE_ITEM = 'inventory:UseItem',
    INVENTORY_DROP_ITEM = 'inventory:DropItem',
    // HUD
    HUD_READY = 'hud:Ready',
    HUD_OPEN_VEHICLE_HUD = 'hud:OpenVehicleHUD',
    HUD_CLOSE_VEHICLE_HUD = 'hud:CloseVehicleHUD',
    HUD_UPDATE_VEHICLE_DATA = 'hud:UpdateVehicleData',
}
