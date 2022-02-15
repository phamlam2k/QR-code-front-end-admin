import axios from "axios";
import { API_SUBJECT } from "../config/endpointApi";
import { useQuery } from 'react-query'
import qs from 'qs'

const getSubjectList = async({queryKey}) => {
    // eslint-disable-next-line no-unused-vars
    const name = JSON.parse(localStorage.getItem("user")).name
    const admin = JSON.parse(localStorage.getItem("user")).admin

    const [_,page, limit,keyword] = queryKey
    const params = {page, limit, keyword, name: name, admin: admin}
    const {data} =  await axios.get(API_SUBJECT, {params, 
        paramsSerializer: (params) => {
            return qs.stringify(params, { arrayFormat: 'repeat' })
        }
    })
    return data
}

function useSubjectListQuery (params) {
    return useQuery(['subject', ...params], getSubjectList, {
        keepPreviousData : true,
        refetchOnWindowFocus : false,
        staleTime : 5000
    })
}

export default useSubjectListQuery