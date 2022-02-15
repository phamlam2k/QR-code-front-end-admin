import axios from "axios";
import { API_TEACHER} from "../config/endpointApi";
import { useQuery } from 'react-query'

const getTeacherList = async() => {
    const params = { page: 1, limit: 1000 }
    const {data} =  await axios.get(API_TEACHER, {params})
    return data
}

function useTeacherSelect () {
    const {data} =  useQuery(['teachers'], getTeacherList, {
        keepPreviousData : true,
        refetchOnWindowFocus : false,
        staleTime : 5000
    })
    console.log(data)
    return data?.data?.data?.map((item) => ({
        value: item.id,
        label: item.name,
    }))
}

export default useTeacherSelect