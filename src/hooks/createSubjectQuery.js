import axios from "axios"
import { useMutation } from "react-query"
import { API_SUBJECT } from "../config/endpointApi"

const createSubjectList = async (params) => {
    return await axios.post(API_SUBJECT, params)
}

function createSubject(){
    // eslint-disable-next-line react-hooks/rules-of-hooks
    return useMutation(createSubjectList)
}

export default createSubject