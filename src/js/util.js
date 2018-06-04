export function toTimeString(logTime) {
    const date = new Date(logTime);
    return `${pad(date.getHours(),2)}:${pad(date.getMinutes(),2)}:${pad(date.getSeconds(),2)}.${pad(date.getMilliseconds(),3)}`;
}

function pad(number, digits) {
    const numStr = number.toString();
    return '0'.repeat(digits - numStr.length) + numStr;
}