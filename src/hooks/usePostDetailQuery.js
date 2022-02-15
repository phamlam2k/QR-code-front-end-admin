import axios from "axios";
import { API_POST_DETAIL } from "../config/endpointApi";
import { bindParams } from "../config/function";
import { useQuery } from 'react-query'


const getPostDetail = async(id) => {
    const {data} =  await axios.get(bindParams(API_POST_DETAIL, {id}))
    return data
}

function usePostDetailQuery (id) {
    return useQuery(['post_detail', id], () => getPostDetail(id),{
        enabled: !!id,
        refetchOnWindowFocus: false,
        staleTime: 500000
    } )
}

export default usePostDetailQuery