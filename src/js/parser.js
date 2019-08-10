import regexps from '../res/regexps';

export default { 
    *getLogRecords(rawLog) {
        let match = regexps.logRecord.exec(rawLog);
        if (!match) {
            console.error(`Parse Error! Content:\n${rawLog}`);
            return;
        }
        do {
            const recordGroups = match.groups;
            match = regexps.logBody.exec(recordGroups.rest);
            const messageGroups = match.groups;
            const logRecord = {
                timestamp: new Date(recordGroups.timestamp),
                type: messageGroups.type ? messageGroups.type.toLowerCase() : 'message',
                message: messageGroups.message
            };
            yield(logRecord);
        } while (match = regexps.logRecord.exec(rawLog));
    }
}