
import caller from 'caller';
export class AppError extends Error {
  constructor(statusCode, body) {
    super(body);
    this.statusCode = statusCode;
    this.body = body;
    this.lambdaName = process.env.AWS_LAMBDA_FUNCTION_NAME || 'UnknownLambda';
    this.fileName = caller();
    this.methodName = this.getMethodName();
    this.stackTrace = this.stack;
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }

  getMethodName() {
    const stackLines = this.stack.split('\n');
    if (stackLines.length > 2) {
      const callerLine = stackLines[2].trim();
      const match = callerLine.match(/at (.+) \((.+):(\d+):(\d+)\)/);
      if (match) {
        return `${match[2]}:${match[1]}`;
      }
    }
    return 'UnknownMethod';
  }
}