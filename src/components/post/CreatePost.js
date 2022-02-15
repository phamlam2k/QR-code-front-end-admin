import { Button, Col, Form, Layout, notification, Row } from "antd"
import { useRef, useState } from "react"
import InputCommon from "../../common/InputCommon"
import UploadFormItem from "../../common/UploadFormItem"
import ReactQuill from 'react-quill';
import PrivateLayout from "../../layout/PrivateLayout"
import { API_IMAGE, QUILL_CONFIG } from "../../config/const";
import moment from 'moment'
import { useHistory } from "react-router-dom";
import createPostList from "../../hooks/createPostQuery";
import { ADMIN_POST } from "../../config/path";
import axios from "axios";

import 'react-quill/dist/quill.snow.css';
import './CreatePost.css'

const updateDefault = {
    previewVisible: false,
    previewImage: '',
    previewTitle: '',
    isFileValidFormat: true,
    fileList: [],
}

const CreatePost = () => {
    const [form] = Form.useForm()
    const [uploadState, setUploadState] = useState(updateDefault)
    const name = JSON.parse(localStorage.getItem('user')).name
    const quill = useRef()
    const history = useHistory()
    const createPost = createPostList()

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

        value.date = moment().format('YYYY-MM-DD HH:mm:ss')
        value.permisson = 0
        value.name = name
        
        axios.post(API_IMAGE, formData)
            .then((res) => {
                value.photo = res?.data?.secure_url
            })
            .then(() => {
                createPost.mutate(value, {
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
                            history.push(ADMIN_POST)
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
                                name="title"
                                label="Title"
                                rules={[{
                                    required: true,
                                    message: "Please input your title"
                                }]}
                            >
                                <InputCommon />
                            </Form.Item>
                        </Col>
                        <Col md={24}>
                            <Form.Item
                                name="description"
                                label="Description"
                                languages={'en'}
                                language={'en'}
                                rules={[
                                    {
                                        required: true,
                                        validator: (_, value) => {
                                            let strippedString = value?.replace(/<\/p>/gi, '\n')
                                            strippedString = strippedString?.replace(/(<([^>]+)>)/gi, '')
                                            if (!strippedString?.trim()) {
                                                return Promise.reject(new Error('Please input the description'))
                                            }

                                            if (strippedString?.length > 3000) {
                                                return Promise.reject(
                                                    new Error('Content cannot be more than 3000 characters')
                                                )
                                            }

                                            return Promise.resolve()
                                        },
                                    },
                                ]}
                                initialValue={''}
                            >
                                <ReactQuill
                                    ref={quill}
                                    value={''}
                                    placeholder="What is your description"
                                    maxLength={3000}
                                    className="news-content-editor"
                                    showCount
                                    modules={QUILL_CONFIG.modules}
                                    formats={QUILL_CONFIG.formats}
                                    onChange={(_html, _a, _b, e) => {
                                        if (e.getText().trim().length === 0) {
                                            form.setFieldsValue({
                                                description : null,
                                            })
                                        }
                                    }}
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    <div className="layout-create-student-form-button">
                        <Button 
                            htmlType="submit"
                            className="btn btn-common"
                            size="large"
                        >
                            Create Post
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

export default CreatePost
