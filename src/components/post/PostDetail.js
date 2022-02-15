import { Button, Image, Layout, notification, Typography } from "antd"
import { useParams } from "react-router-dom"
import usePostDetailQuery from "../../hooks/usePostDetailQuery"
import PrivateLayout from "../../layout/PrivateLayout"
import ReactHtmlParser from 'react-html-parser';

import './PostDetail.css'
import { useHistory } from "react-router-dom";
import axios from "axios";
import { bindParams } from "../../config/function";
import { API_POST_DETAIL } from "../../config/endpointApi";
import { ADMIN_POST } from "../../config/path";
import { useQueryClient } from "react-query";
import ErrorPage from "../page/404";

const PostDetail = () => {
    const {id} = useParams()
    const history = useHistory()
    const queryClient = useQueryClient()
    
    const {
        data: postDetail,
        isError
    } = usePostDetailQuery(id)
    
    const data = postDetail?.data

    const handleBack = () => {
        history.goBack()
    }
    
    const handleAccept = () => {
        axios.put(bindParams(API_POST_DETAIL, {id}), { permission: 1})
            .then((res) => {
                if(res?.data?.code === 404){
                    notification.error({
                        message: res?.data?.message
                    })
                }
                if(res?.data?.code === 200){
                    notification.success({
                        message: "You have successfully granted permission"
                    })
                    queryClient.invalidateQueries(['post'])
                    queryClient.invalidateQueries(['post_detail'])
                    history.push(ADMIN_POST)
                }
            })
    }

    if(isError) return <ErrorPage />

    return (
        <PrivateLayout>
            <Layout className="post-detail">
                <div className="post-detail-content">
                    <Typography.Title level={2}>{data?.title}</Typography.Title>
                    <Image src={data?.photo}/>
                    <div className="post-detail-content-description">
                        <Typography>Author : {data?.teacher?.name}</Typography>
                    </div>
                    <div className="post-detail-content-description">
                        <Typography>{ReactHtmlParser(data?.description)}</Typography>
                    </div>
                    <div className="post-detail-content-date">
                        <Typography>Hà Nội, {data?.date}</Typography>
                    </div>
                    <div className="post-detail-content-btn">
                        {
                            data?.permisson === 0 ? (
                                <Button onClick={handleAccept} type="primary">Accept</Button>

                            ) : null
                        }
                        <Button onClick={handleBack}>Back</Button>
                    </div>
                </div>
            </Layout>
        </PrivateLayout>
    )
}

export default PostDetail
