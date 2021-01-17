if (!window.mixins) {
  window.mixins = {};
}

mixins.DiceRollerMixin = Polymer.dedupingMixin(
  (base) =>
    class extends base {
      constructor() {
        super();
      }

      _attackRoll(ac, advantage, disadvantage, critOn19, rollObj) {
        let firstRoll = this._roll(20),
          secondRoll = this._roll(20),
          trueRoll = firstRoll;

        if (advantage) {
          trueRoll = firstRoll >= secondRoll ? firstRoll : secondRoll;
        } else if (disadvantage) {
          trueRoll = firstRoll <= secondRoll ? firstRoll : secondRoll;
        }

        let trueRollAndModifier = trueRoll + rollObj.toHit;

        if (trueRollAndModifier >= ac) {
          let damageDealt = [],
            isCrit = critOn19 ? trueRoll >= 19 : trueRoll === 20;

          for (let damage of rollObj.damages) {
            damageDealt.push({
              damageType: damage.damageType,
              damage: this._parseRollString(damage.damageRoll, isCrit),
            });
          }
          return {
            hit: true,
            crit: isCrit,
            attackRoll: trueRollAndModifier,
            damageDealt: damageDealt,
          };
        } else {
          return {
            hit: false,
            attackRoll: trueRollAndModifier,
          };
        }
      }

      _parseRollString(rollString, isCrit) {
        let rollStr = rollString.split(' ').join(''),
          rollTerms = rollStr.split('+'),
          total = 0;

        for (let rollTerm of rollTerms) {
          total += this._parseRollTerm(rollTerm, isCrit);
        }
        return total;
      }

      _parseRollTerm(rollTerm, isCrit) {
        let total = 0;

        if (rollTerm.indexOf('d') > -1) {
          let rollMatches = /(\d*)d(\d*)/g.exec(rollTerm);

          if (rollMatches.length === 3) {
            let multiple = parseInt(rollMatches[1]),
              sides = parseInt(rollMatches[2]);

            if (!isNaN(sides)) {
              if (!isNaN(multiple)) {
                for (let i = 0; i < multiple; i++) {
                  total += isCrit ? this._roll(sides) * 2 : this._roll(sides);
                }
              } else {
                total = isCrit ? this._roll(sides) * 2 : this._roll(sides);
              }
            }
          }
        } else {
          let intValue = parseInt(rollTerm);

          if (!isNaN(intValue)) {
            total = intValue;
          }
        }
        return total;
      }

      _roll(sides) {
        return Math.floor(Math.random() * sides + 1);
      }
    }
);
