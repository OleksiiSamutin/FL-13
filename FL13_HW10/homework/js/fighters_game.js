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

        this.getName = function(){
            return nameFighter;
        }

        this.getDamage = function() {
            return damageFighter;
        }

        this.getStrength = function() {
            return strengthFighter;
        }

        this.getAgility = function() {
            return agilityFighter;
        }

        this.getHealth = function() {
            return hpFighter;
        }

        this.heal = function(numberOfHeal){
          if (this.getHealth() + numberOfHeal > totalHp) {
              hpFighter = totalHp;
          } else {
              hpFighter += numberOfHeal;
          }
        }
        this.dealDamage = function(dealedDamage) {
        if (dealedDamage > hpFighter) {
            hpFighter = 0;
        } else {
            hpFighter -= dealedDamage;
        }


    }
      this.addLoss = function() {
        loss++;
    }
      this.addWin = function(){
        win++;
      }

      this.logCombatHistory = function() {
         return `Name: ${this.getName()}, Wins: ${win}, Losses: ${loss}`
     }
}






    attack(defender) {
        let prob = 100 - defender.getAgility() - defender.getStrength();
        let real = Number.parseInt(Math.random() * 100);
        if (prob >= real) {
            defender.dealDamage(this.getDamage());
            console.log(`${this.getName()} makes ${this.getDamage()} damage to ${defender.getName()}`);
        } else {
            console.log(`${this.getName()} attack missed`);
        }
    }


}
const myFighter = new Fighter({ name: 'Maximus', damage: 20, strength: 20, agility: 15, hp: 100 });
const secondFighter = new Fighter({ name: 'Commodus', damage: 25, strength: 30, agility: 25,hp: 90 });
battle(secondFighter,myFighter);
console.log(myFighter.getHealth())
console.log(secondFighter.getHealth())
myFighter.heal(120)
secondFighter.heal(100)
battle(secondFighter,myFighter);
console.log(secondFighter.logCombatHistory())
console.log(myFighter.logCombatHistory())

let name1 = myFighter.getName();
console.log(name1);
let name2 = myFighter._name;
console.log(myFighter.getDamage());
console.log(myFighter.getStrength());
console.log(myFighter.getAgility());
console.log(myFighter.getHealth());
battle(myFighter, secondFighter);
battle(myFighter,secondFighter);
myFighter.heal(100);
secondFighter.heal(100);
battle(secondFighter,myFighter);
console.log(myFighter.logCombatHistory());
console.log(secondFighter.logCombatHistory());