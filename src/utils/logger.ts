import pino from "pino";
import { Logger } from "pino";

const logger:Logger = pino({
  transport: {
    target: 'pino-pretty'
  }
});

export default logger;