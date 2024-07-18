/**
 * Attributes are key-value pairs that can be used to provide additional context to log messages.
 */
export type Attributes = Record<string, unknown>;

/**
 * Context is an optional parameter that can be used to provide additional context to log messages.
 */
export type Context = { attributes?: Attributes };

/**
 * Message is the message to be logged.
 */
export type Message = string;

/**
 * LoggerLevel is the level of the log message.
 */
export type LoggerLevel = 'debug' | 'info' | 'warn' | 'error' | 'fatal';

/**
 * Logger is the interface that defines the methods to log messages.
 */
export abstract class Logger {
  abstract debug(message: Message, context?: Context): void;
  abstract info(message: Message, context?: Context): void;
  abstract warn(message: Message, context?: Context): void;
  abstract error(message: Message, context?: Context): void;
  abstract fatal(message: Message, context?: Context): void;
}
