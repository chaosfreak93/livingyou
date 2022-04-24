export enum SYSTEM_EVENTS {
    BEGIN_CONNECTION = 'connection:Begin',
    // Discord Login
    DISCORD_OPEN = 'discord:Open',
    DISCORD_LOGIN = 'discord:Login',
    DISCORD_FINISH_AUTH = 'discord:FinishAuth',
    // Character Selector
    CHAR_SELECTOR_OPEN = 'charSelector:Open',
    CHAR_SELECTOR_SELECT_CHAR = 'charSelector:selectChar',
    CHAR_SELECTOR_CLOSE = 'charSelector:Close',
    // Character Creator
    CHAR_CREATOR_OPEN = 'charCreator:Open',
    CHAR_CREATOR_CLOSE = 'charCreator:Close',
    CHAR_CREATOR_FINISH_CHAR = 'charCreator:finishChar',
    // HUD
    HUD_OPEN = 'hud:Open',
    // Webview
    WEBVIEW_INFO = 'webview:Info',
}
