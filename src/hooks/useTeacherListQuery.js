import axios from "axios";
import { API_TEACHER} from "../config/endpointApi";
import { useQuery } from 'react-query'
import qs from 'qs'

const getTeacherList = async({queryKey}) => {
    // eslint-disable-next-line no-unused-vars
    const [_,page, limit,keyword] = queryKey
    const params = {page, limit, keyword}
    const {data} =  await axios.get(API_TEACHER, {params, 
        paramsSerializer: (params) => {
            return qs.stringify(params, { arrayFormat: 'repeat' })
        },
    })

    return data
}

function useTeacherListQuery (params) {
    return useQuery(['teachers', ...params], getTeacherList, {
        keepPreviousData : true,
        refetchOnWindowFocus : false,
        staleTime : 5000
    })
}

export default useTeacherListQuery