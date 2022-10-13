import pino from "pino";

const logger = pino({
  transport: {
    target: 'pino-pretty'
  }
});

global.logger = logger;

export default logger;