export default {
    toTimeString: function(date, showMilliseconds = true) {
        return `${padLeft(date.getHours(),2)}:\
        ${padLeft(date.getMinutes(),2)}:\
        ${padLeft(date.getSeconds(),2)}\
        ${showMilliseconds ? '.' + padLeft(date.getMilliseconds(),3) : ''}`;
    },

    toDateTimeString: function(date, showMilliseconds = true) {
        return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()} ${this.toTimeString(date, showMilliseconds)}`;
    },

    isToday: function(date) {
        const now = new Date();
        return Math.abs(now.getTime() - date.getTime()) < 24 * 60 * 60 * 1000;
    }
}

function padLeft(number, length) {
    const numStr = number.toString();
    return '0'.repeat(length - numStr.length) + numStr;
}