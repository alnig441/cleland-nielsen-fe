export class ErrorParser {

    handleError(error: any): Promise<any> {
        let err = {};

        console.log('error in parser: ', error)

        if (error.status === 401) {
            err = {
                status: error.status,
                message: `${error.statusText}/expired token - please login again`
            }
        }

        else {
            err = {
                status: `${error.status} - ${error.statusText}`,
                message: error.error.message,
            };
        }

        throw err;
    }
}