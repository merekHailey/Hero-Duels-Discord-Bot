//DICE ROLL

function RollDice()
{
    var dice;

    dice = Math.random() * 10000 % 20 + 1;

    return Math.floor(dice);
}
export default RollDice