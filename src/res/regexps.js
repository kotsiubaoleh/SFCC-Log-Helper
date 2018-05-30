export const logRecordRegExp = new RegExp("\\[(\\d{4}-\\d{2}-\\d{2} \\d{2}:\\d{2}:\\d{2}\\.\\d\\d{1,3}) GMT\\] "+ //1 Time
    "(ERROR) (?:[^\\n]*) "+ //2 Type
    "STOREFRONT \\S* \\S* \\S* - "+
    "(?:The following message was generated more than 10 times within the last 180 seconds. It will be suppressed for 180 seconds: |"+
    "Exception occurred during request processing: )?"+
    "([^\\n]*)\\n"+ //3 Cause
    "(?:"+
        "(?:"+
            "System Information\\n"+
            "-{18}\\n"+
            "RequestID: (\\S*)\\n"+ //4 Request ID
            "SessionType: (\\S*)\\n"+ //5 Session type
            "SessionID: (\\S*)\\n"+ //6 Session ID
            "(?:Customer: (\\S*)\\n)?"+ //7 Customer
            "(?:login: (\\S*)\\n)?"+ //8 Login
            "ServerName: (\\S*)\\n"+ //9 Server name
            "ServerPort: (\\S*)\\n\\n"+ //10 Server port
            "Request Information\\n"+
            "-{19}\\n"+
            "URI: (\\S*)\\n"+ //11 URI
            "Method: (\\S*)\\n"+ //12 Method
            "PathInfo: (\\S*)\\n"+ //13 Path info
            "(?:QueryString: (\\S*)\\n)?"+ //14 Query string
            "Remote Address: (\\S*)\\n\\n"+ //15 Remote address
            "Request Parameters\\n"+
            "-{18}\\n"+
            "((?:[^\\n]+=[^\\n]*\\n|\\n)*)"+ 
        ")?"+//16 Request parameters
        "Stack trace <(?:ref:)?([0-9a-f]{32})>\\n"+ //17 Stack trace ID
        "(com\\.demandware[^\\n]*\\n(?:\\tat [^\\n]*\\n|Caused by: [^\\n]*\\n)*)?"+ //18 Lines
    ")?",'g');