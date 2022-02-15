import axios from "axios"
import { useMutation } from "react-query"
import { API_TABLE_REGISTER } from "../config/endpointApi"

const createTableRegisterList = async (params) => {
    return await axios.post(API_TABLE_REGISTER, params)
}

function createTableRegister(){
    // eslint-disable-next-line react-hooks/rules-of-hooks
    return useMutation(createTableRegisterList)
}

export default createTableRegister