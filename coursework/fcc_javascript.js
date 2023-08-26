// fcc-project #1: Palindrome Checker
function palindrome(str) {
  str = str.replace(/_\W\s/g, '').toLowerCase();
  const rev = [...str].reverse().join('');
  const half = (x) => x.slice(0, Math.round(str.length/2));
  return half(str) == half(rev);
}


// fcc-project #2: Roman Numeric Converter
function convertToRoman(num) {
  let roman = '';
  for (let i of dict) {
    while (num >= i.Arabic) {
      num -= i.Arabic;
      roman += i.Roman;
    }
  }
  return roman;
 }

const dict = [[1000, 'M'], [900, 'CM'], [500, 'D'], [400, 'CD'], [100, 'C'], 
  [90, 'XC'], [50, 'L'], [40, 'XL'], [10, 'X'], [9, 'IX'], [5, 'V'], [4, 'IV'], [1, 'I']]
  .map(x => ({Arabic: x[0], Roman: x[1]}));


// fcc-project #3: Caesars Cipher
function rot13(str) {
  const decrypt = (char) => {
    let code = char.charCodeAt();
    return code > 77 ? String.fromCharCode(code - 13) : String.fromCharCode(code + 13);
  }
  return [...str].map(x => (/\w/).test(x)? decrypt(x) : x).join('');
}


// fcc-project #4: Telephone Number Validator
function telephoneCheck(str) {
  const regex = /^(1\s?)?(\(\d{3}\)|\d{3})[\s-]?\d{3}[\s-]?\d{4}$/;
  return regex.text(str);
}


// fcc-project #5: Cash Register
function checkCashRegister(price, cash, cid) {
  
  let overpaid = cash - price;
  const drawer = cid.reduce((sum, x) => sum + x[1], 0);
  let status = '', change = [];

  if (overpaid > drawer) status = 'INSUFFICIENT_FUNDS';
  else if (overpaid == drawer) {
    status = 'CLOSED';
    change = cid;
  } else {
    cid = cid.reverse().map(x => ({cat: x[0], val: coin[x[0]], amt: x[1]}));
    for (let i of cid) {
      let count = 0
      while (overpaid >= i.val && i.amt > 0) {
        overpaid = (overpaid - i.val).toFixed(2);
        i.amt = (i.amt - i.val).toFixed(2);
        count++;
      }
      if (count > 0) change.push([i.cat, i.val * count]);
    }
    if (overpaid > 0) {
      status = 'INSUFFICIENT_FUNDS';
      change = [];
    } else status = 'OPEN';
  }  
  
  return {'status': status, 'change': change};
}

const coin = {
  'ONE HUNDRED': 100,
  TWENTY: 20,
  TEN: 10,
  FIVE: 5,
  ONE: 1,
  QUARTER: 0.25,
  DIME: 0.1,
  NICKEL: 0.05,
  PENNY: 0.01,
};