/**
 * Created by liuwensa on 2017/8/30.
 * 随机获取指定长度的字符串（密码）
 */

 'use strict';

 /**
  * getRandomNum
  * @param {*} lbound 
  * @param {*} ubound 
  */
function getRandomNum(lbound, ubound) {
    return (Math.floor(Math.random() * (ubound - lbound)) + lbound);
}

/**
 * getRandomChar
 * @param {*} number 
 * @param {*} lower 
 * @param {*} upper 
 * @param {*} other 
 */
function getRandomChar(number, lower, upper, other) {
    const numberChars = '0123456789';
    const lowerChars  = 'abcdefghijklmnopqrstuvwxyz';
    const upperChars  = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const otherChars  = "`~!@#$%^&*()-_=+[{]}\\|;:'\",<.>/? ";
    let charSet     = '';
    if (number == true)
        charSet += numberChars;
    if (lower == true)
        charSet += lowerChars;
    if (upper == true)
        charSet += upperChars;
    if (other == true)
        charSet += otherChars;
    return charSet.charAt(getRandomNum(0, charSet.length));
}

/**
 * getPassword
 * @param {*} length 
 * @param {*} isNumber 
 * @param {*} isLower 
 * @param {*} isUpper 
 * @param {*} isOther 
 */
function getPassword(length, isNumber, isLower, isUpper, isOther) {
    let rc = ''
    for (let i = 0; i < length; i++) {
        rc += getRandomChar(isNumber, isLower, isUpper, isOther);
    }
    return rc;
}


console.log(getPassword(6, 1, 1, 1, 1))