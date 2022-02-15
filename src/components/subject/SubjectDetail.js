import { Button, Col, Layout, notification, Row, Spin, Typography } from "antd"
import axios from "axios"
import QRCode from "react-qr-code"
import { useQueryClient } from "react-query"
import { useHistory } from "react-router-dom"
import { useParams } from "react-router-dom/cjs/react-router-dom.min"
import { API_SUBJECT_EDIT } from "../../config/endpointApi"
import getRole, { bindParams } from "../../config/function"
import useSubjectDetailQuery from "../../hooks/useSubjectDetailQuery"
import PrivateLayout from "../../layout/PrivateLayout"
import ErrorPage from "../page/404"

import "./SubjectDetail.css"

const SubjectDetail = () => {
    const {id} = useParams()
    const history = useHistory()
    const role = getRole()
    const queryClient = useQueryClient()

    const {
        data : subjectDetail,
        isError,
        isFetching
    } = useSubjectDetailQuery(id)

    const data = subjectDetail?.data

    const handleBack = () => {
        history.goBack()
    }

    const updateStatus = () => {
            axios.put(bindParams(API_SUBJECT_EDIT, { id }), { status: !data?.status }).then((res) => {
                if (res?.data?.code === 226) {
                  notification.error({
                    message: res?.data?.message,
                  });
                }
                if (res?.data?.code === 200) {
                  notification.success({
                    message: "Change status qr code",
                  });
                  queryClient.invalidateQueries(["subject"]);
                }
              });
    }

    if(isError) return <ErrorPage />

    return (
        <PrivateLayout>
            {isFetching ? <Spin /> : (
                <Layout className="layout-student-padd">
                    <Layout className="layout-student-detail">
                        <Row justify="space-between">
                            <Col md={24} className="layout-student-detail-photo">
                                <QRCode value={data?.qrcode}/>
                            </Col>
                            { role === 0 ? (
                                <>
                                    <Col md={11}>
                                        <Typography className="layout-student-detail-text">ID Student: </Typography>
                                        <p>{data?.id_subject}</p>
                                    </Col>
                                    <Col md={11}>
                                        <Typography className="layout-student-detail-text">Name of subject : </Typography>
                                        <p>{data?.name}</p>
                                    </Col>
                                    <Col md={11}>
                                        <Typography className="layout-student-detail-text">Number lesson: </Typography>
                                        <p>{data?.number_lesson}</p>
                                    </Col>
                                    <Col md={11}>
                                        <Typography className="layout-student-detail-text">Teacher : </Typography>
                                        <p>{data?.teacher?.name}</p>
                                    </Col>
                                </>
                            ) : null}
                            <Col md={24}>
                                <div className="layout-student-detail-btn">
                                    <Button className={data?.status === 0 ?  "layout-student-detail-btn-open" : "layout-student-detail-btn-close" } onClick={updateStatus}>
                                        {data?.status === 0 ? "Open" : "Close"}
                                    </Button>
                                    <Button className="layout-student-btn-back" onClick={handleBack}>
                                        Back
                                    </Button>
                                </div>
                            </Col>
                        </Row>
                    </Layout>
                </Layout>

            )}
        </PrivateLayout>
    )
}

export default SubjectDetail
