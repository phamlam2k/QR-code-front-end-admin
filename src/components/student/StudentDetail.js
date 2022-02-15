import { Col, Image, Layout, Row, Spin, Typography } from "antd"
import { useParams } from "react-router-dom/cjs/react-router-dom.min"
import useStudentDetailQuery from "../../hooks/useStudentDetailQuery"
import PrivateLayout from "../../layout/PrivateLayout"
import ErrorPage from "../page/404"

import "./StudentDetail.css"

const StudentDetail = () => {
    const {id} = useParams()

    const {
        data : studentDetail,
        isError,
        isFetching
    } = useStudentDetailQuery(id)

    const data = studentDetail?.data

    if(isError) return <ErrorPage />

    return (
        <PrivateLayout>
            {isFetching ? <Spin /> : (
                <Layout className="layout-student-padd">
                    <Layout className="layout-student-detail">
                        <Row justify="space-between">
                            <Col md={24} className="layout-student-detail-photo">
                                <Image src={data?.photo}/>
                            </Col>
                            <Col md={11}>
                                <Typography className="layout-student-detail-text">ID Student: </Typography>
                                <p>{data?.id_student}</p>
                            </Col>
                            <Col md={11}>
                                <Typography className="layout-student-detail-text">Full Name : </Typography>
                                <p>{data?.name}</p>
                            </Col>
                            <Col md={11}>
                                <Typography className="layout-student-detail-text">Email: </Typography>
                                <p>{data?.email}</p>
                            </Col>
                            <Col md={11}>
                                <Typography className="layout-student-detail-text">Phone number : </Typography>
                                <p>{data?.phonenumber}</p>
                            </Col>
                        </Row>
                    </Layout>
                </Layout>

            )}
        </PrivateLayout>
    )
}

export default StudentDetail
