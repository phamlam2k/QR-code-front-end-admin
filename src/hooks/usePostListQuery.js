import axios from "axios";
import { API_POST } from "../config/endpointApi";
import { useQuery } from 'react-query'
import qs from 'qs'

const getPostList = async({queryKey}) => {
    // eslint-disable-next-line no-unused-vars
    const [_,page, limit,keyword] = queryKey
    const params = {page, limit, keyword}
    const {data} =  await axios.get(API_POST, {params, 
        paramsSerializer: (params) => {
            return qs.stringify(params, { arrayFormat: 'repeat' })
        },
    })
    return data
}

function usePostListQuery (params) {
    return useQuery(['post', ...params], getPostList, {
        keepPreviousData : true,
        refetchOnWindowFocus : false,
        staleTime : 5000
    })
}

export default usePostListQuery