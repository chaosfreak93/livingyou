import IWebInventory from './IWebInventory';

export interface ISystemEvents {
    'connection:Begin': () => void;
    // Discord Login
    'discord:Open': () => void;
    'discord:ProceedToken': (token: string) => void;
    'discord:ObtainToken': (reset: boolean) => void;
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
    'hud:ShowDriveHud': () => void;
    'hud:HideDriveHud': () => void;
    // Inventory
    'inventory:Open': (pockets: IWebInventory, backpack: IWebInventory, other: IWebInventory) => void;
    'inventory:Update': (pockets: IWebInventory, backpack: IWebInventory, other: IWebInventory) => void;
    'inventory:Close': () => void;
    'inventory:UseItem': () => void;
    'inventory:GiveItem': () => void;
    'inventory:DropItem': () => void;
    // Actions Menu
    'actionMenu:OpenInVehicleActions': (id: number) => void;
    'actionMenu:OpenPlayerActions': (id: number) => void;
    'actionMenu:OpenVehicleActions': (id: number) => void;
    'actionMenu:CloseActions': () => void;
    // Webview
    'webView:Info': (url: string) => void;
    // KeyManager
    'keyManager:KeyUp': (key: number) => void;
    'keyManager:KeyDown': (key: number) => void;
    // Ticks
    'player:StartTicks': () => void;
    'player:Tick': () => void;
    'player:Spawned': () => void;
    'player:StartScreenEffect': () => void;
    'player:StopScreenEffect': () => void;
    'player:StopAllScreenEffects': () => void;
    // World
    'world:UpdateTime': (hour: number, minute: number) => void;
    'world:UpdateWeather': (weather: string) => void;
    // Dev Tools
    'devTools:PosAndRot': () => void;
    'devTools:SpawnVehicle': (player: any, hash: string) => void;
    'devTools:DeleteVehicle': (player: any) => void;
}
