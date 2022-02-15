import axios from "axios"
import QueryString from "qs"
import { useEffect, useMemo, useState } from "react"
import { useQuery } from "react-query"
import { useLocation } from "react-router-dom"
import { API_ATTENDANCE } from "../config/endpointApi"

const initParams = {
    page: 1,
    student_id: '',
    subject_id: '',
    limit: 10
}

const useAttedanceList = async ({queryKey}) => {
    // eslint-disable-next-line no-unused-vars
    const [_, params] = queryKey
    const { data } = await axios.get(API_ATTENDANCE, { params , paramsSerializer: (params) => {
        return QueryString.stringify(params)
    },})

    return data
}

export default function useAttendanceQuery(){
    const location = useLocation()
    const initialParams = useMemo(() => {
        let params = {}
        if (location.search) {
            params = QueryString.parse(location.search.substring(1))
        }
        return {...params}
    }, [location.search])
    
    const [params, setParams] = useState(initialParams)

    const setFilters = (filterData) => {
        return filterData
    }
    
    const query = useQuery(["attendance_list", params], useAttedanceList, {
        keepPreviousData: true,
        refetchOnWindowFocus: false,
        staleTime: 50000000
    })

    useEffect(() => {
        if(!location.search){
            setParams({ ...initParams})
        }   
    }, [location.search])

    return  { ...query, setFilters, filter: params}
}