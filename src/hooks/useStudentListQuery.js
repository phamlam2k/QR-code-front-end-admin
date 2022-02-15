import axios from "axios";
import { API_STUDENT} from "../config/endpointApi";
import { useQuery } from 'react-query'
import qs from 'qs'

const getStudentList = async({queryKey}) => {
    // eslint-disable-next-line no-unused-vars
    const [_,page, limit,keyword] = queryKey
    const params = {page, limit, keyword}
    const {data} =  await axios.get(API_STUDENT, {params, 
        paramsSerializer: (params) => {
            return qs.stringify(params, { arrayFormat: 'repeat' })
        },
    })
    return data
}

function useStudentListQuery (params) {
    return useQuery(['student', ...params], getStudentList, {
        keepPreviousData : true,
        refetchOnWindowFocus : false,
        staleTime : 5000
    })
}

export default useStudentListQuery