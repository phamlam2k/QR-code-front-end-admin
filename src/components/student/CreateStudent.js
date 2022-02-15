import { Button, Col, DatePicker, Form, Layout, notification, Row, Select, Typography } from "antd"
import axios from "axios"
import { useState } from "react"
import { useHistory } from "react-router-dom"
import InputCommon from "../../common/InputCommon"
import UploadFormItem from "../../common/UploadFormItem"
import {API_IMAGE} from '../../config/const'
import { ADMIN_STUDENT } from "../../config/path"
import PrivateLayout from "../../layout/PrivateLayout"

import './CreateStudent.css'
import createStudent from "../../hooks/createStudentQuery"

const updateDefault = {
    previewVisible: false,
    previewImage: '',
    previewTitle: '',
    isFileValidFormat: true,
    fileList: [],
}

const CreateStudent = () => {

    const history = useHistory()
    const [uploadState, setUploadState] = useState(updateDefault)
    const createStudentList = createStudent()

    const majorOption = [
        {
            value: "ICT",
            label: "ICT"
        },
        {
            value: "NANO",
            label: "NANO"
        },
        {
            value: "SCT",
            label: "SCT"
        }
    ]

    const normFile = (e) => {
        if (Array.isArray(e)) {
            return e
        }
    
        return e && e.fileList
    }
    
    const onFinish = (value) => {

        const { birth, photo } = value
        const formData = new FormData()

        formData.append("file", photo[0].originFileObj)
        formData.append("upload_preset", "l5vkzfsf")

        if(value.birth){
            value.birth = birth?.format("YYYY-MM-DD")
        }

        axios.post(API_IMAGE, formData)
            .then((res) => {
                value.photo = res?.data?.secure_url
            })
            .then(() => {
                createStudentList.mutate(value, {
                    onSuccess :(data, variables, context) => {
                        console.log(data)
                        if(data?.data?.code === 226){
                            notification.error({
                                message: data?.data?.message
                            })
                        }
                        if(data?.data?.code === 200){
                            notification.success({
                                message: data?.data?.message
                            })
                            history.push(ADMIN_STUDENT)
                        }
                    }

                })
            })
    }
    
    return (
        <PrivateLayout>
            <Layout className="layout-create-student">
                <Form
                    layout="vertical"
                    className="layout-create-student-form"
                    onFinish={onFinish}
                >
                    <Typography className="layout-create-student-form-content">Create student form</Typography>
                    <UploadFormItem 
                        uploadState={uploadState}
                        className="layout-create-upload"
                        setUploadState={setUploadState}
                        uploadTitle={
                            <>
                                <p>{'Thêm ảnh'}</p>
                            </>
                        }
                        limit={1}
                        formItemProps={{
                            label: "Photo",
                            name: 'photo',
                            rules: [
                                {
                                    required: true,
                                    message: 'Vui lòng một chọn ảnh',
                                },
                            ],
                            valuePropName: 'fileList',
                            getValueFromEvent: normFile,
                        }}
                    />
                    <Row justify="space-between">
                        <Col md={11}>
                            <Form.Item
                                name={"id_student"}
                                label="ID Student"
                                rules={[
                                    {
                                        required: true,
                                        message: "Please fill your input ID Student"                            
                                    },
                                    {
                                        pattern: /^B[a-zA-Z]\d+-\d{3}/,
                                        message: "Please fill your right input"
                                    }
                            
                                ]}
                            >
                                <InputCommon 
                                    size="large"
                                    placeholder={"Student ID"}
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
                                        pattern: /[a-z]\.b[a-z]{1}\d{4}@st\.usth\.edu\.vn/,
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
                                name={"birth"}
                                label="Birth"
                                rules={[{
                                    required: true,
                                    message: "Please fill your input Birth"                            
                                }]}
                            >
                                <DatePicker 
                                    size="large"
                                    className="layout-create-student-form-date"
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

                        <Col md={11}>
                            <Form.Item
                                name={"major"}
                                label="Major"
                                rules={[{
                                    required: true,
                                    message: "Please fill your input major"                            
                                }]}
                            >
                                <Select 
                                    size="large"
                                    options={majorOption}
                                />
                            </Form.Item>
                        
                        </Col>
                    </Row>
                    <div className="layout-create-student-form-button">
                        <Button 
                            htmlType="submit"
                            className="btn btn-common"
                            size="large"
                            loading={createStudentList.isLoading}
                        >
                            Create Student
                        </Button>

                        <Button
                            htmlType="button"
                            className="layout-create-student-form-button-back"
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

export default CreateStudent
