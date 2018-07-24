export class ErrorParser {
    handleError(error: any): Promise<any> {
        let err = {};

        if (error.status === 401) {
            err = {
                status: error.status,
                message: 'unauthorized/expired token - please login again'
            }
        }

        throw err || error;
    }
}