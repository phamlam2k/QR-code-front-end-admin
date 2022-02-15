import axios from "axios";
import { API_SUBJECT } from "../config/endpointApi";
import { useQuery } from 'react-query'

const getSubjectList = async() => {
    const params = {page: 1, limit: 1000}
    const {data} =  await axios.get(API_SUBJECT, {params})
    return data
}

function useSubjectSeclect () {
    const {data} =  useQuery(['subject'], getSubjectList, {
        keepPreviousData : true,
        refetchOnWindowFocus : false,
        staleTime : 5000
    })
    
    return data?.data?.data?.map((item) => ({
        value: item.id,
        label: item.name,
    }))
}

export default useSubjectSeclect