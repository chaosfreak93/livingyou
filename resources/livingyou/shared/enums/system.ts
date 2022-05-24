export enum SYSTEM_EVENTS {
    BEGIN_CONNECTION = 'connection:Begin',
    // Discord Login
    DISCORD_OPEN = 'discord:Open',
    DISCORD_PROCEED_TOKEN = 'discord:ProceedToken',
    DISCORD_FINISH_AUTH = 'discord:FinishAuth',
    DISCORD_CLOSE = 'discord:Close',
    // Character Selector
    CHAR_SELECTOR_OPEN = 'charSelector:Open',
    CHAR_SELECTOR_SELECT_CHAR = 'charSelector:SelectChar',
    CHAR_SELECTOR_CLOSE = 'charSelector:Close',
    // Character Creator
    CHAR_CREATOR_OPEN = 'charCreator:Open',
    CHAR_CREATOR_CLOSE = 'charCreator:Close',
    CHAR_CREATOR_FINISH_CHAR = 'charCreator:FinishChar',
    // HUD
    HUD_OPEN = 'hud:Open',
    // Webview
    WEBVIEW_INFO = 'webView:Info',
    // KeyManager
    KEY_MANAGER_KEY_UP = 'keyManager:KeyUp',
    KEY_MANAGER_KEY_DOWN = 'keyManager:KeyDown',
    // Ticks
    PLAYER_START_TICKS = 'player:StartTicks',
    PLAYER_TICK = 'player:Tick',
    // World
    WORLD_UPDATE_TIME = 'world:UpdateTime',
    WORLD_UPDATE_WEATHER = 'world:UpdateWeather',
    // Dev Tools
    DEBUG = 'debug',
}
