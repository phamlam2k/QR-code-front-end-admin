import axios from "axios";
import { API_SUBJECT_DETAIL } from "../config/endpointApi";
import { bindParams } from "../config/function";
import { useQuery } from 'react-query'


const getSubjectDetail = async(id) => {
    const {data} =  await axios.get(bindParams(API_SUBJECT_DETAIL, {id}))
    return data
}

function useSubjectDetailQuery (id) {
    return useQuery(['subject', id], () => getSubjectDetail(id),{
        enabled: !!id,
        refetchOnWindowFocus: false,
        staleTime: 500000
    } )
}

export default useSubjectDetailQuery