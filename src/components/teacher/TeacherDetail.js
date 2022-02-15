import { Col, Image, Layout, Row, Spin, Typography } from "antd"
import { useParams } from "react-router-dom/cjs/react-router-dom.min"
import useTeacherDetailQuery from "../../hooks/useTeacherDetailQuery"
import PrivateLayout from "../../layout/PrivateLayout"
import ErrorPage from "../page/404"

import "./TeacherDetail.css"

const TeacherDetail = () => {
    const {id} = useParams()

    const {
        data : teacherDetail,
        isError,
        isFetching
    } = useTeacherDetailQuery(id)

    const data = teacherDetail?.data

    if(isError) return <ErrorPage />

    return (
        <PrivateLayout>
            {isFetching ? <Spin /> : (
                <Layout className="layout-teacher-padd">
                    <Layout className="layout-teacher-detail">
                        <Row justify="space-between">
                            <Col md={24} className="layout-teacher-detail-photo">
                                <Image src={data?.photo}/>
                            </Col>
                            <Col md={11}>
                                <Typography className="layout-teacher-detail-text">ID Student: </Typography>
                                <p>{data?.id_teacher}</p>
                            </Col>
                            <Col md={11}>
                                <Typography className="layout-teacher-detail-text">Full Name : </Typography>
                                <p>{data?.name}</p>
                            </Col>
                            <Col md={11}>
                                <Typography className="layout-teacher-detail-text">Email: </Typography>
                                <p>{data?.email}</p>
                            </Col>
                            <Col md={11}>
                                <Typography className="layout-teacher-detail-text">Phone number : </Typography>
                                <p>{data?.phonenumber}</p>
                            </Col>
                        </Row>
                    </Layout>
                </Layout>

            )}
        </PrivateLayout>
    )
}

export default TeacherDetail
