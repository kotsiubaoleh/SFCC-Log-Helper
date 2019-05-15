import { parse } from './parser';

let warningCount = 0;

export const data = {
    logs: [],
    rawLog: null
};

export function init(logString) {
    parse(logString, function(log) {
        addLog(log);
    });
    data.rawLog = logString;
}

function addLog(logRecord) {
    data.logs.push(logRecord);
}