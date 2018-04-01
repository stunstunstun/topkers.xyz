import { createLogger, format, transports } from 'winston'

const {
  combine,
  timestamp,
  label,
  printf,
} = format

const myFormat = printf(info => `${info.timestamp} [${info.label}] ${info.level}: ${info.message}`)
const logger = createLogger({
  level: 'info',
  format: combine(
    label({
      label: '🐧  blahblah',
    }),
    timestamp(),
    myFormat,
  ),
  transports: [
    new transports.Console(),
  ],
})

export default logger
