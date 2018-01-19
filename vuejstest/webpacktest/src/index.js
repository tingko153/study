import calc from './utils/utility';

let x = 51;
let y = 31;
let str = `<h2>${x} + ${y} = ${calc.add(x, y)}</h2>`;

document.getElementById('app').innerHTML = str;