import axios from "axios"
import { useMutation } from "react-query"
import { API_TEACHER } from "../config/endpointApi"

const createTeacherList = async (params) => {
    return await axios.post(API_TEACHER, params)
}

function createTeacher(){
    // eslint-disable-next-line react-hooks/rules-of-hooks
    return useMutation(createTeacherList)
}

export default createTeacher