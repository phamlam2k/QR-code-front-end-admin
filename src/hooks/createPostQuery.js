import axios from "axios"
import { useMutation } from "react-query"
import { API_POST } from "../config/endpointApi"

const createPost = async (params) => {
    return await axios.post(API_POST, params)
}

function createPostList(){
    // eslint-disable-next-line react-hooks/rules-of-hooks
    return useMutation(createPost)
}

export default createPostList