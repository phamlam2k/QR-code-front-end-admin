import { Button, Col,Form, InputNumber, Layout, notification, Row, Select, Typography } from "antd"
import { useHistory } from "react-router-dom"
import InputCommon from "../../common/InputCommon"
import { ADMIN_SUBJECT } from "../../config/path"
import PrivateLayout from "../../layout/PrivateLayout"
import createSubject from "../../hooks/createSubjectQuery"
import useTeacherSelect from "../../hooks/useTeacherSelect"

import './CreateSubject.css'

const CreateSubject = () => {

    const history = useHistory()
    const createSubjectList = createSubject()

    const teacherSelect = useTeacherSelect()

    const onFinish = (value) => {
        createSubjectList.mutate(value, {
            onSuccess :(data, variables, context) => {
                if(data?.data?.code === 226){
                    notification.error({
                        message: data?.data?.message
                    })
                }
                if(data?.data?.code === 200){
                    notification.success({
                        message: data?.data?.message
                    })
                    history.push(ADMIN_SUBJECT)
                }
            }
        })
    }
    
    return (
        <PrivateLayout>
            <Layout className="layout-create-subject">
                <Form
                    layout="vertical"
                    className="layout-create-subject-form"
                    onFinish={onFinish}
                >
                    <Typography className="layout-create-subject-form-content">Create subject form</Typography>
                    <Row justify="space-between">
                        <Col md={11}>
                            <Form.Item
                                name={"id_subject"}
                                label="ID Subject"
                                rules={[
                                    {
                                        required: true,
                                        message: "Please fill your input ID Subject"                            
                                    }
                                ]}
                            >
                                <InputCommon 
                                    size="large"
                                    placeholder={"Subject ID"}
                                />
                            </Form.Item>
                        </Col>
                        <Col md={11}>
                            <Form.Item
                                name={"name"}
                                label="Name of Subject"
                                rules={[{
                                    required: true,
                                    message: "Please fill your input Name of Subject"                            
                                }]}
                            >
                                <InputCommon 
                                    size="large"
                                    placeholder={"Name of Subject"}
                                />
                            </Form.Item>
                        </Col>
                        <Col md={11}>
                            <Form.Item
                                name={"number_lesson"}
                                label="Number of lesson"
                                rules={[
                                    {
                                        required: true,
                                        message: "Please fill your input Number of lesson"                            
                                    }
                                ]}
                            >
                                <InputNumber 
                                    size="large"
                                    placeholder={"0"}
                                />
                            </Form.Item>
                        </Col>
                        <Col md={11}>
                            <Form.Item
                                name={"id_teacher"}
                                label="Teacher"
                                rules={[
                                    {
                                        required: true,
                                        message: "Please choice your teacher"                            
                                    }
                                ]}
                            >
                                <Select 
                                    size="large"
                                    placeholder={"Teacher"}
                                    options={teacherSelect}
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    <div className="layout-create-subject-form-button">
                        <Button 
                            htmlType="submit"
                            className="btn btn-common"
                            size="large"
                            loading={createSubjectList.isLoading}
                        >
                            Create Subject
                        </Button>

                        <Button
                            htmlType="button"
                            className="layout-create-subject-form-button-back"
                            size="large"
                            onClick={() => {history.goBack()}}
                        >
                            Back
                        </Button>
                    </div>
                </Form>
            </Layout>
        </PrivateLayout>
    )
}

export default CreateSubject
