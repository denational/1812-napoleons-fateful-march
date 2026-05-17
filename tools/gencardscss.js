console.log(`/* CARDS */`)
for (let i = 0; i <= 107; ++i) {
    if (i <= 53)
        console.log(`.card_${i}{background-image: url(cards/ru/card_${i < 10 ? ("0" + i) : i}.png);}`)
    else
        console.log(`.card_${i}{background-image: url(cards/fr/card_${(i - 54) < 10 ? ("0" + (i - 54)) : (i - 54)}.png);}`)
}
