import axios from "axios";
import qs from "qs";
import { useQuery } from "react-query";
import { API_TABLE_REGISTER } from "../config/endpointApi";

const getTableRegisterList = async ({ queryKey }) => {
    // eslint-disable-next-line no-unused-vars
    const [_, page, limit, keyword] = queryKey;
    const params = {page, keyword, limit}

    const { data } = await axios.get(API_TABLE_REGISTER, { params , paramsSerializer : (params) => {
        return qs.stringify(params, { arrayFormat: 'repeat' })
    }})

    return data
}

function useTableRegisterListQuery (params){
    return useQuery(['table_register', ...params], getTableRegisterList,
    {
        keepPreviousData : true,
        refetchOnWindowFocus : false,
        staleTime : 500000000
    })
}

export default useTableRegisterListQuery