import { parse } from './parser';

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

function addLog(logEntry) {
    let existingLogEntry = data.logs.find(entry => {
        if (entry.stackTrace.id && logEntry.stackTrace.id) {
            return entry.stackTrace.id === logEntry.stackTrace.id;
        } else {
            return entry.cause === logEntry.cause;
        }
    });
    if (existingLogEntry) {
        existingLogEntry.entries.push(logEntry.entries[0]);
    } else {
        data.logs.push(logEntry);
    }
}