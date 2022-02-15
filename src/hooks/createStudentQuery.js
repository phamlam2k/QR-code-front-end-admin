import axios from "axios"
import { useMutation } from "react-query"
import { API_STUDENT } from "../config/endpointApi"

const createStudentList = async (params) => {
    return await axios.post(API_STUDENT, params)
}

function createStudent(){
    // eslint-disable-next-line react-hooks/rules-of-hooks
    return useMutation(createStudentList)
}

export default createStudent