import { Button, Col, Form, Layout, notification, Row, Typography } from "antd"
import { useParams } from "react-router-dom"
import PrivateLayout from "../../layout/PrivateLayout"
import useAccountUserDetail from "../../hooks/useAccountUserDetail"
import InputCommon from "../../common/InputCommon"
import { useHistory } from "react-router-dom"
import { useEffect } from "react"
import axios from "axios"
import { bindParams } from "../../config/function"
import { useQueryClient } from "react-query"
import { API_USER_DETAIL } from "../../config/endpointApi"
import { ADMIN_USER } from "../../config/path"
import ErrorPage from "../page/404"

const UpdateUser = () => {
    const {id} = useParams()
    const [form] = Form.useForm()
    const history = useHistory()
    const queryClient = useQueryClient()

    const {
        data: userDetail,
        isError,
      } = useAccountUserDetail(id);
    
    const data = userDetail?.data;

    useEffect(() => {
        const {
          id_student,
          name,
          email,
          password,
        } = { ...data }
        
        if(id_student !== undefined){
            form.setFieldsValue(
            {
              id_user : id_student,
              name: name, 
              email: email,
              password: password,
            })
        }
    });
    
    const onFinish = (value) => {
        if(id){
            value.id = parseInt(id)
        }
        axios.put(bindParams(API_USER_DETAIL, { id }), value).then((res) => {
            if (res?.data?.code === 226) {
              notification.error({
                message: res?.data?.message,
              });
            }
            if (res?.data?.code === 200) {
              notification.success({
                message: `Update user ${value?.name} success`,
              });
              queryClient.invalidateQueries(["user_account"]);
              queryClient.invalidateQueries(["user_account_detail"]);
              history.push(ADMIN_USER);
            }
        });
    }

    if(isError) return <ErrorPage />

    return (
        <PrivateLayout>
            <Layout className="layout-create-subject">
        <Form
          layout="vertical"
          className="layout-create-subject-form"
          onFinish={onFinish}
          form={form}
        >
          <Typography className="layout-create-subject-form-content">
            Update subject form
          </Typography>
          <Row justify="space-between">
            <Col md={11}>
              <Form.Item
                name={"id_user"}
                label="ID User"
                rules={[
                  {
                    required: true,
                    message: "Please fill your input ID Subject",
                  },
                ]}
              >
                <InputCommon size="large" placeholder={"Subject ID"} />
              </Form.Item>
            </Col>
            <Col md={11}>
              <Form.Item
                name={"name"}l
                label="Name"
                rules={[
                  {
                    required: true,
                    message: "Please fill your input name",
                  },
                ]}
              >
                <InputCommon size="large" placeholder={"Name"} />
              </Form.Item>
            </Col>
            <Col md={11}>
              <Form.Item
                name={"email"}l
                label="Email"
                rules={[
                  {
                    required: true,
                    message: "Please fill your input email",
                  },
                ]}
              >
                <InputCommon size="large" placeholder={"Email"} />
              </Form.Item>
            </Col>
            <Col md={11}>
              <Form.Item
                name={"password"}l
                label="Password"
                rules={[
                  {
                    required: true,
                    message: "Please fill your input password",
                  },
                ]}
              >
                <InputCommon size="large" placeholder={"Password"} />
              </Form.Item>
            </Col>
          </Row>
          <div className="layout-create-subject-form-button">
            <Button
              htmlType="submit"
              className="btn btn-common"
              size="large"
            >
              Update User
            </Button>
            <Button
              htmlType="button"
              className="layout-create-subject-form-button-back"
              size="large"
              onClick={() => {
                history.goBack();
              }}
            >
              Back
            </Button>
          </div>
        </Form>
      </Layout>
        </PrivateLayout>
    )
}

export default UpdateUser
