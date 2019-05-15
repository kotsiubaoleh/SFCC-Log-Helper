export default {
    toTimeString: function(date) {
        return `${padLeft(date.getHours(),2)}:${padLeft(date.getMinutes(),2)}:${padLeft(date.getSeconds(),2)}.${padLeft(date.getMilliseconds(),3)}`;
    },

    toDateTimeString: function(date) {
        return `${date.getYear()}-${date.getMonth()}-${date.getDate()} ${this.toTimeString(date)}`;
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