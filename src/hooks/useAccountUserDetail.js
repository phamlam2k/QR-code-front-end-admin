import { API_USER_DETAIL } from "../config/endpointApi";
import { bindParams } from "../config/function";
import { useQuery } from 'react-query'
import axios from "axios";


const getUserDetail = async(id) => {
    const {data} =  await axios.get(bindParams(API_USER_DETAIL, {id}))
    return data
}

function useAccountUserDetail (id) {
    return useQuery(['user_account_detail', id], () => getUserDetail(id),{
        enabled: !!id,
        refetchOnWindowFocus: false,
        staleTime: 500000
    } )
}

export default useAccountUserDetail