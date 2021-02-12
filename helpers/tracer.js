module.exports = require("tracer").colorConsole({
    format: [
        "{{timestamp}} <{{title}}> {{message}} (in {{path}}:{{line}})", //default format
        {
            log: "{{message}}", //Log format
            error:
                "=================ERROR=================\nTime : {{timestamp}} \nType : {{title}} \nMessage:{{message}}\nFile : {{path}}:{{line}}:{{pos}})\nCall Stack:\n{{stack}}", // error format
        },
    ],
});
