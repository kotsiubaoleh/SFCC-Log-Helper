
export default {
    logRecord: /\[(?<timestamp>\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}(:?\.\d{1,3} GMT)?)\](?<rest>.*?)(?=\[\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}(:?\.\d{1,3} GMT)?\]|$)/gs,
    logBody: /(:? (?<type>ERROR|WARN|DEBUG|INFO) )?(?<message>.*?)(?<info>System Information\n-{18}.*|Stack trace <|$)/s
    // "(ERROR) (?:[^\\n]*) "+ // 2 Type
    // "[^\\n]* - "+
    // "(?:The following message was generated more than 10 times within the last 180 seconds. It will be suppressed for 180 seconds: )?"+
    // "([^\\n]*)\\n"+ // 3 Cause
    // "(?:"+
    //     "(?:"+
    //         "System Information\\n"+
    //         "-{18}\\n"+
    //         "([^]*?)"+ // 4 System Information
    //         "Request Information\\n"+
    //         "-{19}\\n"+
    //         "([^]*?)"+ // 5 Request Information
    //         "Request Parameters\\n"+
    //         "-{18}\\n"+
    //         "((?:[^\\n]+=[^\\n]*\\n|\\n)*)"+ 
    //     ")?"+// 6 Request parameters
    //     "Stack trace <(?:ref:)?([0-9a-f]{32})>\\n"+ // 7 Stack trace ID
    //     "(com\\.demandware[^\\n]*\\n(?:\\tat [^\\n]*\\n|Caused by: [^\\n]*\\n)*)?"+ // 8 Lines
    // ")?",'g');
}