import 'dotenv/config';

// EntitySync
import './systems/syncEntity';
import './classes/CableCar';
import './classes/DroppedItemEntity';

// General
import './events/playerDeath';
import './events/playerDisconnect';
import './events/resourceStart';
import './events/resourceStop';
import './prototype/player';
import './systems/charCreator';
import './systems/charSelector';
import './systems/inventory';
import './systems/keyManager';
import './systems/login';
import './systems/tick';
import './systems/world';
import './utility/debug';
