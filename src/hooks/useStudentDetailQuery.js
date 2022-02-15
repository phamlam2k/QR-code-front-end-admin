import axios from "axios";
import { API_STUDENT_DETAIL } from "../config/endpointApi";
import { bindParams } from "../config/function";
import { useQuery } from 'react-query'


const getStudentDetail = async(id) => {
    const {data} =  await axios.get(bindParams(API_STUDENT_DETAIL, {id}))
    return data
}

function useStudentDetailQuery (id) {
    return useQuery(['students', id], () => getStudentDetail(id),{
        enabled: !!id,
        refetchOnWindowFocus: false,
        staleTime: 500000
    })
}

export default useStudentDetailQuery