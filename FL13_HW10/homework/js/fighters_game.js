
function battle(firstFighter, secondFighter) {
    if (firstFighter.getHealth() === 0) {
        return console.log(`${firstFighter.getName()} is dead and can't fight.`)
    } else if (secondFighter.getHealth() === 0) {
        return console.log(`${secondFighter.getName()} is dead and can't fight.`)
    } else {
        while (firstFighter.getHealth() > 0 && secondFighter.getHealth() > 0) {
            firstFighter.attack(secondFighter);
            secondFighter.attack(firstFighter);
        }
        if (firstFighter.getHealth() === 0) {
            firstFighter.addLoss();
            secondFighter.addWin();
            return console.log(`${secondFighter.getName()} has won!`);
        } else {
            secondFighter.addLoss();
            firstFighter.addWin();
            return console.log(`${firstFighter.getName()} has won!`);
        }
    }

}


class Fighter {

    constructor({ name, damage, strength, agility, hp }) {
        let win = 0;
        let loss = 0;
        let nameFighter = name;
        let damageFighter = damage;
        let totalHp = hp;
        let strengthFighter = strength;
        let agilityFighter = agility;
        let hpFighter = hp;

        this.getName = function () {
            return nameFighter;
        }

        this.getDamage = function () {
            return damageFighter;
        }

        this.getStrength = function () {
            return strengthFighter;
        }

        this.getAgility = function () {
            return agilityFighter;
        }

        this.getHealth = function () {
            return hpFighter;
        }

        this.heal = function (numberOfHeal) {
            if (this.getHealth() + numberOfHeal > totalHp) {
                hpFighter = totalHp;
            } else {
                hpFighter += numberOfHeal;
            }
        }
        this.dealDamage = function (dealedDamage) {
            if (dealedDamage > hpFighter) {
                hpFighter = 0;
            } else {
                hpFighter -= dealedDamage;
            }


        }
        this.addLoss = function () {
            loss++;
        }
        this.addWin = function () {
            win++;
        }

        this.logCombatHistory = function () {
            return `Name: ${this.getName()}, Wins: ${win}, Losses: ${loss}`
        }
    }


    attack(defender) {
        const MAX_PROB = 100;
        let prob = MAX_PROB - defender.getAgility() - defender.getStrength();
        let real = Number.parseInt(Math.random() * MAX_PROB);
        if (prob >= real) {
            defender.dealDamage(this.getDamage());
            console.log(`${this.getName()} makes ${this.getDamage()} damage to ${defender.getName()}`);
        } else {
            console.log(`${this.getName()} attack missed`);
        }
    }


}
