import { Col, Layout, Row, Typography } from "antd"
import { useParams } from "react-router-dom"
import useAccountUserDetail from "../../hooks/useAccountUserDetail"
import PrivateLayout from "../../layout/PrivateLayout"
import ErrorPage from "../page/404"
import "./UserDetail.css"

const UserDetail = () => {
    const { id }= useParams()

    const {
        data : userDetail,
        isError,
    } = useAccountUserDetail(id)

    const data = userDetail?.data

    if(isError) return <ErrorPage />

    return (
        <PrivateLayout>
            <Layout className="layout-user-detail"> 
                <Row justify="space-between">
                    <Col md={11}>
                        <Typography.Title level={3}>ID User : </Typography.Title>
                        <Typography>{data?.id_student}</Typography>
                    </Col>
                    <Col md={11}>
                        <Typography.Title level={3}>Name : </Typography.Title>
                        <Typography>{data?.name}</Typography>
                    </Col>
                    <Col md={11}>
                        <Typography.Title level={3}>Email : </Typography.Title>
                        <Typography>{data?.email}</Typography>
                    </Col>
                    <Col md={11}>
                        <Typography.Title level={3}>Password : </Typography.Title>
                        <Typography>{data?.password}</Typography>
                    </Col>
                </Row>
            </Layout>
        </PrivateLayout>
    )
}

export default UserDetail
