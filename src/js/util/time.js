export default {
    toTimeString(date, showMilliseconds = true) {
        return `${padLeft(date.getHours(),2)}:\
        ${padLeft(date.getMinutes(),2)}:\
        ${padLeft(date.getSeconds(),2)}\
        ${showMilliseconds ? '.' + padLeft(date.getMilliseconds(),3) : ''}`;
    },

    toDateTimeString(date, showMilliseconds = true) {
        return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()} \
        ${this.toTimeString(date, showMilliseconds)}`;
    },

    isToday(date) {
        const now = new Date();
        return Math.abs(now.getTime() - date.getTime()) < 24 * 60 * 60 * 1000;
    },

    getElapsedTime(from, to) {
        const elapsed = to - from;
        if (elapsed < 2 * 1000) {
            return '1 second';
        } else if (elapsed < 60 * 1000) {
            return `${Math.floor(elapsed / 1000)} seconds`;
        } else if (elapsed < 2 * 60 * 1000) {
            return '1 minute';
        } else if (elapsed < 60 * 60 * 1000) {
            return `${Math.floor(elapsed / (60 * 1000))} minutes`;
        } else if (elapsed < 2 * 60 * 60 * 1000) {
            return '1 hour';
        } else if (elapsed < 24 * 60 * 60 * 1000) {
            return `${Math.floor(elapsed / (60 * 60 * 1000))} hours`;
        } else if (elapsed < 2 * 24 * 60 * 60 * 1000) {
            return '1 day';
        } else {
            return `${Math.floor(elapsed / (24 * 60 * 60 * 1000))} days`;
        }
    }
}

function padLeft(number, length) {
    const numStr = number.toString();
    return '0'.repeat(length - numStr.length) + numStr;
}