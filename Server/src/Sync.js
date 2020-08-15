const processChanges = require("./processChanges.js")
const oldText =
    `
La cosa más difícil es conocernos a nosotros mismos;
la más fácil es hablar mal de los demás (Tales de Mileto)

No puedo enseñar nada a nadie. Solo puedo hacerles pensar (Sócrates)

No juzgamos a las personas que amamos (Jean-Paul Sartre)

El conocimiento es poder (Francis Bacon)

El amor inmaduro dice: “te amo porque te necesito”. 
El maduro dice: “te necesito porque te amo” (Erich Fromm)
`;

const newText =
    `
La cosa más difícil es conocernos a nosotros mismos; 
la más fácil es hablar mal de los demás (Tales de Mileto)

No juzgamos a las personas que amamos (Jean-Paul Sartre)

El amor inmaduro dice: “te amo porque te necesito”. 
El maduro dice: “te necesito porque te amo” (Erich Fromm)

La peor lucha es la que no se hace (Karl Marx)

La pobreza no viene por la disminución de las riquezas, 
sino por la multiplicación de los deseos (Platón)

No lastimes a los demás con lo que te causa dolor a ti mismo (Buda)
`;
let res = JSON.stringify(processChanges.getDiff("demo", oldText, newText));
let ss = processChanges.applyDiff(oldText,JSON.parse(res))
console.log("===============================================")
console.log(ss)