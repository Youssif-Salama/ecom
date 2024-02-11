export const catchASyncError = (fn) => {
    return (req, res, next) => {
        fn(req, res, next).catch(error => next(error));
    }
}

export class AppError extends Error {
    constructor(status, message) {
        super(message);
        this.status = status;
    }
}