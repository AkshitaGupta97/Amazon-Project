
//  *****   Automated Test    ****** test code via code
// this is basic test case -> tells whether code is working or not

import {formatCurrency} from '../scripts/utility_code/formatMoney.js'

console.log('Test suited : formatCurrency');

if(formatCurrency(2095) === '20.95'){
    console.log('passed');
}
else {
    console.log('failed');   
}

if(formatCurrency(0) === '0.00'){
    console.log('passed 0');
}
else {
    console.log('failed 0 ');
}

// edge case = test with tricky value

if(formatCurrency(2000.5) === '20.01'){
    console.log('passed 2000.5');
}
else{
    console.log('failed 2000.5');
}

if(formatCurrency(2000.4) === '20.00'){
    console.log('passed 2000.4');
}
else{
    console.log('failed 2000.4');
}

