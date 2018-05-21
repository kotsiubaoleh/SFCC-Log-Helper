const regularExpression = new RegExp(require('../res/regex.txt'),'g');

function parseLogRecord(match) {
    return {
        entries: [{
            time: match[1],
            requestID: match[4],
            sessionType: match[5],
            sessionID: match[6],
            serverName: match[7],
            serverPort: match[8],
            URI: match[9],
            method: match[10],
            pathInfo: match[11],
            queryString: match[12],
            remoteAddress: match[13],
            params: match[14],
        }],
        stackTrace: {
            id: match[15],
            lines: match[16]
        },
        type: match[2],
        cause: match[3]
    };
}

export function parse(rawLog, callback) {
    let match;
    while(match = regularExpression.exec(rawLog)) {
        callback(parseLogRecord(match));
    }
}