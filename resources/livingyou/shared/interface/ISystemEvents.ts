export interface ISystemEvents {
    'connection:Begin',
    // Discord Login
    'discord:Open': () => void,
    'discord:ProceedToken',
    'discord:FinishAuth',
    'discord:Close': () => void,
    // Character Selector
    'charSelector:Open': () => void,
    'charSelector:SelectChar',
    'charSelector:Close': () => void,
    // Character Creator
    'charCreator:Open': () => void,
    'charCreator:FinishChar',
    'charCreator:Close': () => void,
    // HUD
    'hud:Open',
    // Webview
    'webView:Info',
    // KeyManager
    'keyManager:KeyUp',
    'keyManager:KeyDown',
    // Ticks
    'player:StartTicks',
    'player:Tick',
    // World
    'world:UpdateTime',
    'world:UpdateWeather',
    // Dev Tools
    'debug',
}
