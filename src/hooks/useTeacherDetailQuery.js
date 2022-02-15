import axios from "axios";
import { API_TEACHER_DETAIL } from "../config/endpointApi";
import { bindParams } from "../config/function";
import { useQuery } from 'react-query'


const getTeacherDetail = async(id) => {
    const {data} =  await axios.get(bindParams(API_TEACHER_DETAIL, {id}))
    return data
}

function useTeacherDetailQuery (id) {
    return useQuery(['teachers', id], () => getTeacherDetail(id),{
        enabled: !!id,
        refetchOnWindowFocus: false,
        staleTime: 500000
    } )
}

export default useTeacherDetailQuery