//Valid Card
function isValidCard(card: string)
{
    if (card.toLowerCase() == 'tiberius' || card.toLowerCase() == 'tiberius ulfnod' || card.toLowerCase() == 'cork' || card.toLowerCase() == 'cork grayscale' || card.toLowerCase() == 'frizzagigg' || card.toLowerCase() == 'frizzagigg of the flame' || card.toLowerCase() == 'frizz' || card.toLowerCase() == 'grau')
    {
        return true;
    }
    else 
    {
    return false;
    }
}
export default isValidCard