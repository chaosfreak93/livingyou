import 'dotenv/config';

// EntitySync
import './entitySync/entitySync';
import './entitySync/CableCar';
import './entitySync/DroppedItemEntity';
import './entitySync/TextLabel';

// General
import './events/playerDeath';
import './events/playerDisconnect';
import './events/resourceStart';
import './events/resourceStop';
import './prototype/player';
import './prototype/vehicle';
import './systems/actionMenu';
import './systems/charCreator';
import './systems/charSelector';
import './systems/inventory';
import './systems/keyManager';
import './systems/login';
import './systems/tick';
import './systems/world';
import './utility/debug';
