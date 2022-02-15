import { Button, Col, Form,  Layout, notification, Row, Typography } from "antd"
import axios from "axios"
import { useState } from "react"
import { useHistory } from "react-router-dom"
import InputCommon from "../../common/InputCommon"
import UploadFormItem from "../../common/UploadFormItem"
import {API_IMAGE} from '../../config/const'
import { ADMIN_TEACHER } from "../../config/path"
import PrivateLayout from "../../layout/PrivateLayout"

import './CreateTeacher.css'
import createTeacher from "../../hooks/createTeacherQuery"

const updateDefault = {
    previewVisible: false,
    previewImage: '',
    previewTitle: '',
    isFileValidFormat: true,
    fileList: [],
}

const CreateTeacher = () => {

    const history = useHistory()
    const [uploadState, setUploadState] = useState(updateDefault)
    const createTeacherList = createTeacher()

    const normFile = (e) => {
        if (Array.isArray(e)) {
            return e
        }
    
        return e && e.fileList
    }
    
    const onFinish = (value) => {

        const { photo } = value
        const formData = new FormData()

        formData.append("file", photo[0].originFileObj)
        formData.append("upload_preset", "l5vkzfsf")

        axios.post(API_IMAGE, formData)
            .then((res) => {
                value.photo = res?.data?.secure_url
            })
            .then(() => {
                createTeacherList.mutate(value , {
                    onSuccess : (data) => {
                        if(data?.data?.code === 226){
                            notification.error({
                                message: data?.data?.message
                            })
                        }
                        if(data?.data?.code === 200){
                            notification.success({
                                message: data?.data?.message
                            })
                            history.push(ADMIN_TEACHER)
                        }
                    }
                })
            })
    }
    
    return (
        <PrivateLayout>
            <Layout className="layout-create-teacher">
                <Form
                    layout="vertical"
                    className="layout-create-teacher-form"
                    onFinish={onFinish}
                >
                    <Typography className="layout-create-teacher-form-content">Create teacher form</Typography>
                    <UploadFormItem 
                        uploadState={uploadState}
                        className="layout-create-upload"
                        setUploadState={setUploadState}
                        uploadTitle={
                            <>
                                <p>{'Add picture'}</p>
                            </>
                        }
                        limit={1}
                        formItemProps={{
                            label: "Photo",
                            name: 'photo',
                            rules: [
                                {
                                    required: true,
                                    message: 'Please choice your photo',
                                },
                            ],
                            valuePropName: 'fileList',
                            getValueFromEvent: normFile,
                        }}
                    />
                    <Row justify="space-between">
                        <Col md={11}>
                            <Form.Item
                                name={"id_teacher"}
                                label="ID Teacher"
                                rules={[
                                    {
                                        required: true,
                                        message: "Please fill your input ID Teacher"                            
                                    },
                                    {
                                        pattern: /^T[a-zA-Z]-\d{3}/,
                                        message: "Please fill your right input"
                                    }
                            
                                ]}
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
                        >
                            Create Teacher
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

export default CreateTeacher
