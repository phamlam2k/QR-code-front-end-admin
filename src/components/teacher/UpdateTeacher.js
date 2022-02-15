import { Button, Col, Form, Layout, notification, Row, Typography } from "antd"
import axios from "axios"
import { useEffect, useState } from "react"
import { useHistory } from "react-router-dom"
import InputCommon from "../../common/InputCommon"
import PrivateLayout from "../../layout/PrivateLayout"
import { useParams } from "react-router-dom/cjs/react-router-dom.min"
import useTeacherDetailQuery from "../../hooks/useTeacherDetailQuery"
import UploadCommon from "../../common/UploadCommon"
import { bindParams } from "../../config/function"
import { API_TEACHER_EDIT } from "../../config/endpointApi"
import { useQueryClient } from "react-query"
import { API_IMAGE } from "../../config/const"
import {  ADMIN_TEACHER } from "../../config/path"
import ErrorPage from "../page/404"

const updateDefault = {
    previewVisible: false,
    previewImage: '',
    previewTitle: '',
    isFileValidFormat: true,
    fileList: [],
}

const UpdateTeacher = () => {
    const history = useHistory()
    const [uploadState, setUploadState] = useState(updateDefault)
    const queryClient = useQueryClient()
    const {id} = useParams()
    const [form] = Form.useForm()

    const {
        data : teacherQuery,
        isError,
        isFetching
    } = useTeacherDetailQuery(id)

    const data = teacherQuery?.data

    useEffect(() => {
        const {id_teacher, name, email, phonenumber,photo, id} = {...data}

        if (photo) {
            setUploadState((prevState) => ({
                ...prevState,
                fileList: [
                    {
                        uid: id,
                        url: photo,
                    },
                ],
            }))
        }
        if(id_teacher !== undefined){
            form.setFieldsValue(
            {
                id_teacher : id_teacher,
                name: name, 
                email: email,
                phonenumber: phonenumber, 
            })
        }
    }, [data, form])

    const onFinish = (value) => {
        const formData = new FormData()

        formData.append("file", uploadState.fileList[0].originFileObj)
        formData.append("upload_preset", "l5vkzfsf")

        axios.post(API_IMAGE, formData)
            .then((res) => {
                axios.delete(data?.photo)
                 .then(() => {
                    value.photo = res?.data?.secure_url

                 })
            })
            .then(() => {
                axios.put(bindParams(API_TEACHER_EDIT, {id}), value)
                            .then((res) => {
                                    if(res?.data?.code === 226){
                                        notification.error({
                                            message: res?.data?.message
                                        })
                                    }
                                    if(res?.data?.code === 200){
                                        notification.success({
                                            message: "Create student success"
                                        })
                                        queryClient.invalidateQueries(['student'])
                                        history.push(ADMIN_TEACHER)
                                    }
                                })

            })


    }

    if(isError) return <ErrorPage />

    return (
        <PrivateLayout>
            <Layout className="layout-create-teacher">
                <Form
                    layout="vertical"
                    className="layout-create-teacher-form"
                    form={form}
                    onFinish={onFinish}
                >
                    <Typography className="layout-create-teacher-form-content">Update teacher form</Typography>
                    
                    <UploadCommon
                        uploadState={uploadState}
                        setUploadState={setUploadState}
                        className="layout-create-upload"
                        limit={1}
                    />
                    
                    <Row justify="space-between">
                        <Col md={11}>
                            <Form.Item
                                name={"id_teacher"}
                                label="ID Teacher"
                                rules={[
                                    {
                                        required: true,
                                        message: "Please fill your input ID Student"                            
                                    },
                                    {
                                        pattern: /^T[a-zA-Z]-\d{3}/,
                                        message: "Please fill your right input"
                                    }
                                ]}
                                initialValue={data?.id_teacher}
                            >
                                <InputCommon 
                                    size="large"
                                    placeholder={"Teacher ID"}
                                />
                            </Form.Item>
                        </Col>
                        <Col md={11}>
                            <Form.Item
                                name={"name"}
                                label="Full Name"
                                rules={[{
                                    required: true,
                                    message: "Please fill your input Full Name"                            
                                }]}
                            >
                                <InputCommon 
                                    size="large"
                                    placeholder={"Full name"}
                                />
                            </Form.Item>
                        </Col>
                        <Col md={11}>
                            <Form.Item
                                name={"email"}
                                label="Email"
                                rules={[
                                    {
                                        required: true,
                                        message: "Please fill your input Email"                            
                                    },
                                    {
                                        pattern: /^[a-zA-Z]+@gmail\.com/,
                                        message: "Please fill your right input email" 
                                    }
                                
                                ]}
                            >
                                <InputCommon 
                                    size="large"
                                    placeholder={"Email"}
                                />
                            </Form.Item>
                        </Col>
                        <Col md={11}>
                            <Form.Item
                                name={"phonenumber"}
                                label="Phone number"
                                rules={[
                                    {
                                        required: true,
                                        message: "Please fill your input Phone number"                            
                                    },
                                    {
                                        pattern: /^(09||03||08)\d{10}/,
                                        message: "Please fill your right input of phone number"
                                    }
                                ]}
                            >
                                <InputCommon
                                    size="large"
                                />
                            </Form.Item>
                        
                        </Col>
                    </Row>
                    <div className="layout-create-teacher-form-button">
                        <Button 
                            htmlType="submit"
                            className="btn btn-common"
                            size="large"
                            loading={isFetching}
                        >
                            Update Teacher
                        </Button>

                        <Button
                            htmlType="button"
                            className="layout-create-teacher-form-button-back"
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

export default UpdateTeacher
