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
    let existingLogRecord = data.logs.find(record => {
        let logEntry = logRecord.entries[0];
        let existingEntry = record.entries.find(entry => {
            if (entry.stackTrace.id && logEntry.stackTrace.id) {
                if (entry.stackTrace.id === logEntry.stackTrace.id) {
                    logEntry.stackTrace.lines = entry.stackTrace.lines;
                    return true;
                } else if (entry.stackTrace.lines && logEntry.stackTrace.lines) {
                    if (entry.stackTrace.lines[0] === logEntry.stackTrace.lines[0]) {
                        return true;
                    }
                }
            }
            return false;
        })
        return existingEntry;
    });
    if (existingLogRecord) {
        const logEntry = logRecord.entries[0];
        existingLogRecord.entries.push(logEntry);
        if (logEntry.stackTrace.lines) {
            existingLogRecord.stackTrace = logEntry.stackTrace;
        }
    } else {
        if (!logRecord.entries[0].stackTrace.lines) {
            console.warn(++warningCount, logRecord.entries[0].fullText);
        }
        data.logs.push(logRecord);
    }
}