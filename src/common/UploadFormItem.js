import React from 'react'
import { Upload, Modal, notification, Form } from 'antd'
import { PlusOutlined } from '@ant-design/icons'

const UploadFormItem = (props) => {
    const {
        uploadTitle,
        className,
        onRemove,
        uploadState,
        setUploadState,
        limit,
        accept,
        formItemProps
    } = props

    const getBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader()
            reader.readAsDataURL(file)
            reader.onload = () => {
                resolve(reader.result)
            }
            reader.onerror = (error) => reject(error)
        })
    }

    const handleCancel = () => {
        setUploadState({ ...uploadState, previewVisible: false })
    }

    const handlePreview = async (file) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj)
        }

        setUploadState({
            ...uploadState,
            previewImage: file.url || file.preview,
            previewVisible: true,
            previewTitle:
                file.name || file.url.substring(file.url.lastIndexOf('/') + 1),
        })
    }

    const dummyRequest = ({ onSuccess }) => {
        onSuccess('ok')
    }

    const openNotification = (message, type = 'info') => {
        notification[type]({
            message: message,
            duration: 2,
        })
    }

    const beforeUpload = (file) => {
        const isJpgOrPng =
            file.type === 'image/jpeg' ||
            file.type === 'image/png' ||
            file.type === 'image/jpg'
        if (!isJpgOrPng) {
            openNotification(
                `${file.name} không phải định dạng jpeg, jpg hoặc png!`,
                'error'
            )
        }
        const isLt2M = file.size / 1024 / 1024 < 2
        if (!isLt2M) {
            openNotification(
                'Vui lòng tải ảnh có dung lượng nhỏ hơn 2MB!',
                'error'
            )
        }

        return isJpgOrPng && isLt2M ? true : Upload.LIST_IGNORE
    }

    const uploadButton = (
        <div className="uploader">
            <div className="justify-content-center text-center">
                <div className="font-2xl">
                    <PlusOutlined />
                </div>
                <div className="upload-title mt-3">
                    {' '}
                    {uploadTitle || 'Add Picture'}
                </div>
            </div>
        </div>
    )

    return (
        <>
            <Form.Item {...formItemProps}>
                <Upload
                    name="files"
                    multiple
                    className={className}
                    customRequest={dummyRequest}
                    action=""
                    listType="picture-card"
                    accept={accept}
                    fileList={uploadState.fileList}
                    onPreview={handlePreview}
                    onChange={(fileList) => {
                        if (fileList.fileList.length > limit) {
                            return
                        }
						if (fileList.fileList[0] && fileList.fileList[0].originFileObj) {
                            fileList.fileList[0] = {
                                ...fileList.fileList[0],
                                thumbUrl: URL.createObjectURL(fileList.file.originFileObj),
                            }
                        }

                        setUploadState({
                            ...uploadState,
                            fileList: fileList.fileList,
                        })
                    }}
                    onRemove={onRemove}
                    beforeUpload={beforeUpload}
                >
                    {uploadState.fileList.length >= limit ? null : uploadButton}
                </Upload>
            </Form.Item>
            <Modal
                visible={uploadState.previewVisible}
                title={uploadState.previewTitle}
                footer={null}
                onCancel={handleCancel}
            >
                <img
                    alt="example"
                    style={{ width: '100%' }}
                    src={uploadState.previewImage}
                />
            </Modal>
        </>
    )
}
UploadFormItem.defaultProps = {
    className: "upload-main-image"
}

export default UploadFormItem
