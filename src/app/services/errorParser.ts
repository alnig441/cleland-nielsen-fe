export class ErrorParser {

    handleError(error: any): Promise<any> {
        let err = {};

        console.log('error in parser: ', error)

        if (error.status === 401) {
            err = {
                status: error.status,
                message: 'unauthorized/expired token - please login again'
            }
        }

        else {
            err = error;
        }

        throw err;
    }
}