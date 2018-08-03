import { ErrorParser } from "../services/errorParser";

const errorParser = new ErrorParser();

export class MethodNotPermitted {

    rejectMethod():Promise<any> {
        return Promise.reject({ status: 405, message: 'insufficient permissions'})
            .catch(errorParser.handleError)
    }
}