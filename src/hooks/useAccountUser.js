import axios from "axios"
import QueryString from "qs"
import { useQuery } from "react-query"
import { API_LOGIN } from "../config/endpointApi"


const useAccountList = async ({queryKey}) => {
    // eslint-disable-next-line no-unused-vars
    const [_,page, limit] = queryKey
    const params = {page, limit}
    const { data } = await axios.get(API_LOGIN, {params ,
        paramsSerializer: (params) => {
            return QueryString.stringify(params, {arrayFormat : 'repeat'})
        },
    })

    return data
}

function UserAccountUser(params) {
    return useQuery(['user_account', ...params], useAccountList, {
        keepPreviousData: true,
        refetchOnWindowFocus: false,
        staleTime: 5000
    })
}

export default UserAccountUser