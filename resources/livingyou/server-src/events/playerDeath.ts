import * as alt from 'alt-server';
import { On } from '../systems/eventSystem/on';

export default class PlayerDeath {
    @On('playerDeath')
    static playerDeath(victim: alt.Player, killer: alt.Entity, weaponHash: number): void {
        victim.spawn(victim.pos);
        victim.clearBloodDamage();
    }

    @On('playerDamage')
    static playerDamage(
        victim: alt.Player,
        attacker: alt.Entity,
        healthDamage: number,
        armourDamage: number,
        weaponHash: number
    ): void {
        if (victim.health <= 0) {
            victim.health = victim.maxHealth;
        }
    }
}
