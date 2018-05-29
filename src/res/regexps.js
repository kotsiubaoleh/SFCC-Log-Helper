export const logRecordRegExp = new RegExp("\\[(\\d{4}-\\d{2}-\\d{2} \\d{2}:\\d{2}:\\d{2}\\.\\d\\d{1,3}) GMT\\] "+
    "(ERROR) (?:[^\\n]*) "+
    "STOREFRONT \\S* \\S* \\S* - "+
    "(?:The following message was generated more than 10 times within the last 180 seconds. It will be suppressed for 180 seconds: |"+
    "Exception occurred during request processing: )?"+
    "([^\\n]*)\\n"+
    "(?:"+
        "(?:"+
            "System Information\\n"+
            "-{18}\\n"+
            "RequestID: (\\S*)\\n"+
            "SessionType: (\\S*)\\n"+
            "SessionID: (\\S*)\\n"+
            "ServerName: (\\S*)\\n"+
            "ServerPort: (\\S*)\\n\\n"+
            "Request Information\\n"+
            "-{19}\\n"+
            "URI: (\\S*)\\n"+
            "Method: (\\S*)\\n"+
            "PathInfo: (\\S*)\\n"+
            "(?:QueryString: (\\S*)\\n)?"+
            "Remote Address: (\\S*)\\n\\n"+
            "Request Parameters\\n"+
            "-{18}\\n"+
            "((?:[^\\n]+=[^\\n]*\\n)*)\\n"+
        ")?"+
        "Stack trace <(?:ref:)?([0-9a-f]{32})>\\n"+
        "(com\\.demandware[^\\n]*\\n(?:\\tat [^\\n]*\\n|Caused by: [^\\n]*\\n)*)?"+
    ")?",'g');