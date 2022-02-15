import axios from "axios";
import { API_STUDENT } from "../config/endpointApi";
import { useQuery } from 'react-query'
import QueryString from "qs";

const getStudentSelect = async() => {
    
    const params = {page : 1, limit: 1000}
    const {data} =  await axios.get(API_STUDENT, {params} )
    return data
}

function useStudentSeclect () {
    const {data} =  useQuery(['student',  {page : 1, limit: 1000}], getStudentSelect, {
        keepPreviousData : true,
        refetchOnWindowFocus : false,
        staleTime : 5000
    })
    return data?.data?.data?.map((item) => ({
        value: item.id,
        label: item.name,
    }))
}

export default useStudentSeclect