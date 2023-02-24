import { createLogger, format, transports } from "winston"

const logger = createLogger({
    transports: [
        new transports.File({
            level: "info",
            filename: "logs/info.log",
            format: format.combine(
                format.timestamp({ format: "MMM-DD-YYYY HH:mm:ss" }),
                format.align(),
                format.printf(
                    `(info) => ${info.level}: ${[info.timestamp]}: ${info.message}`
                )
            ),
        }),

        new transports.File({
            level: "error",
            filename: "logs/error.log",
            format: format.combine(
                format.timestamp({ format: "MMM-DD-YYYY HH:mm:ss" }),
                format.align(),
                format.printf(
                    `(info) => ${info.level}: ${[info.timestamp]}: ${info.message}`
                )
            ),
        }),

        new transports.File({
            level: "warn",
            filename: "logs/warn.log",
            format: format.combine(
                format.timestamp({ format: "MMM-DD-YYYY HH:mm:ss" }),
                format.align(),
                format.printf(
                    `(info) => ${info.level}: ${[info.timestamp]}: ${info.message}`
                )
            ),
        }),
    ],
})

export default logger