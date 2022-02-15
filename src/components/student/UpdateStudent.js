import { Button, Col, DatePicker, Form, Layout, notification, Row, Select, Typography } from "antd"
import axios from "axios"
import { useEffect, useState } from "react"
import { useHistory } from "react-router-dom"
import InputCommon from "../../common/InputCommon"
import moment from "moment"
import PrivateLayout from "../../layout/PrivateLayout"
import { useParams } from "react-router-dom/cjs/react-router-dom.min"
import useStudentDetailQuery from "../../hooks/useStudentDetailQuery"
import UploadCommon from "../../common/UploadCommon"
import { bindParams } from "../../config/function"
import { API_STUDENT_EDIT } from "../../config/endpointApi"
import { ADMIN_STUDENT } from "../../config/path"
import { useQueryClient } from "react-query"
import { API_IMAGE } from "../../config/const"
import ErrorPage from "../page/404"

const updateDefault = {
    previewVisible: false,
    previewImage: '',
    previewTitle: '',
    isFileValidFormat: true,
    fileList: [],
}

const UpdateStudent = () => {
    const history = useHistory()
    const [uploadState, setUploadState] = useState(updateDefault)
    const queryClient = useQueryClient()
    const {id} = useParams()
    const [form] = Form.useForm()

    const {
        data : studentUpdate,
        isError,
        isFetching
    } = useStudentDetailQuery(id)

    const data = studentUpdate?.data

    useEffect(() => {
        const {id_student, name, email, birth, phonenumber, major, photo, id} = {...data}

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
        if(id_student !== undefined){
            form.setFieldsValue(
            {
                id_student : id_student,
                name: name, 
                email: email,
                birth: moment(birth),
                phonenumber: phonenumber, 
                major: major
            })

        }
    }, [data, form])

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

    const onFinish = (value) => {
        const { birth } = value
        const formData = new FormData()

        formData.append("file", uploadState.fileList[0].originFileObj)
        
        formData.append("upload_preset", "l5vkzfsf")

        if(value.birth){
            value.birth = birth?.format("YYYY-MM-DD")
        }

        axios.post(API_IMAGE, formData)
            .then((res) => {
                value.photo = res?.data?.secure_url
            })
            .then(() => {
                axios.put(bindParams(API_STUDENT_EDIT, {id}), value)
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
                            history.push(ADMIN_STUDENT)
                        }
                    })
            })
    }

    if(isError) return <ErrorPage />

    return (
        <PrivateLayout>
            <Layout className="layout-create-student">
                <Form
                    layout="vertical"
                    className="layout-create-student-form"
                    form={form}
                    onFinish={onFinish}
                >
                    <Typography className="layout-create-student-form-content">Update student form</Typography>
                    
                    <UploadCommon
                        uploadState={uploadState}
                        setUploadState={setUploadState}
                        className="layout-create-upload"
                        limit={1}
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
                                initialValue={data?.id_student}
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
                            loading={isFetching}
                        >
                            Update Student
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

export default UpdateStudent
