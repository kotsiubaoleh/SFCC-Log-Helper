import { logRecordRegExp } from '../res/regexps';

function parseLogRecord(match) {
    const stackTraceLines = match[18] ? match[18].split('\n') : null;
    return {
        entries: [{
            fullText: match[0],
            time: new Date(match[1]),
            system: {
                requestID: match[4],
                sessionType: match[5],
                sessionID: match[6],
                customer: match[7],
                login: match[8],
                serverName: match[9],
                serverPort: match[10],
            },
            request: {
                URI: match[11],
                method: match[12],
                pathInfo: match[13],
                queryString: match[14],
                remoteAddress: match[15],
            },
            params: match[16],
            stackTrace: {
                id: match[17],
                lines: stackTraceLines
            }
        }],
        stackTrace: {
            id: match[17],
            lines: stackTraceLines
        },
        type: match[2],
        cause: match[3]
    };
}

export function parse(rawLog, callback) {
    let match;
    while(match = logRecordRegExp.exec(rawLog)) {
        callback(parseLogRecord(match));
    }
}