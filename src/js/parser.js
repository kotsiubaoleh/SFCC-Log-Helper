import regexps from '../res/regexps';

export function parse(rawLog, callback) {
    let match = regexps.logRecord.exec(rawLog);
    do {
        const recordGroups = match.groups;
        match = regexps.logBody.exec(recordGroups.rest);
        const messageGroups = match.groups;
        const logRecord = {
            timestamp: new Date(recordGroups.timestamp),
            type: messageGroups.type,
            message: messageGroups.message
        };
        callback(logRecord);
    } while (match = regexps.logRecord.exec(rawLog));
}