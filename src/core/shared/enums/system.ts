export enum SYSTEM_EVENTS {
    BEGIN_CONNECTION = 'connection:Begin',
    // Discord Login
    DISCORD_OPEN = 'discord:Open',
    DISCORD_LOGIN = 'discord:Login',
    DISCORD_FINISH_AUTH = 'discord:FinishAuth',
    // Character Selector
    CHAR_SELECTOR_OPEN = 'charSelector:Open',
    // Character Creator
    CHAR_CREATOR_OPEN = 'charCreator:Open',
    CHAR_CREATOR_FINISH_CHAR = 'charCreator:finishChar',
    // Webview
    WEBVIEW_INFO = 'webview:Info',
}
