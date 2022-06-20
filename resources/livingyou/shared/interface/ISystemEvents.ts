import IInventory from './IInventory';

export interface ISystemEvents {
    'connection:Begin': () => void;
    // Discord Login
    'discord:Open': () => void;
    'discord:ProceedToken': (token: string) => void;
    'discord:Close': () => void;
    // Character Selector
    'charSelector:Open': () => void;
    'charSelector:SelectChar': (character: string) => void;
    'charSelector:Close': () => void;
    // Character Creator
    'charCreator:Open': () => void;
    'charCreator:FinishChar': (character: string) => void;
    'charCreator:Close': () => void;
    // HUD
    'hud:Update': () => void;
    // Inventory
    'inventory:Open': (inventory: IInventory) => void;
    'inventory:Close': () => void;
    // Webview
    'webView:Info': (url: string) => void;
    // KeyManager
    'keyManager:KeyUp': (key: number) => void;
    'keyManager:KeyDown': (key: number) => void;
    // Ticks
    'player:StartTicks': () => void;
    'player:Tick': () => void;
    'player:Spawned': () => void;
    // World
    'world:UpdateTime': (hour: number, minute: number) => void;
    'world:UpdateWeather': (weather: string) => void;
    // Dev Tools
    'devTools:debug': () => void;
}
