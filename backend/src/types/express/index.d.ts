import * as express from 'express';

declare global {
    namespace Express {
        interface Request {
            file: { buffer; originalname: string };
            currentUser: CurrentUser;
        }
    }
}
