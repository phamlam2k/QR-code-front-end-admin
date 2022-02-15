import { Button, Form, Layout, notification, Popover, Space, Table, Typography } from "antd"
import { DeleteOutlined, SearchOutlined, SettingOutlined } from '@ant-design/icons'
import InputCommon from "../../common/InputCommon"
import PrivateLayout from "../../layout/PrivateLayout"
import { Link } from "react-router-dom"
import queryString from "query-string";
import { ADMIN_SUBJECT, ADMIN_SUBJECT_CREATE, ADMIN_SUBJECT_EDIT } from "../../config/path"
import { useHistory } from "react-router-dom"
import useSubjectListQuery from "../../hooks/useSubjectListQuery"
import { useState } from "react"
import { useLocation } from "react-router-dom"
import axios from "axios"
import { bindParams } from "../../config/function"
import { API_SUBJECT_DETAIL } from "../../config/endpointApi"
import { useQueryClient } from "react-query"
import QRCode from "react-qr-code"
import ErrorPage from "../page/404"

import './Subject.css'

const Subject = () => {
    const location = useLocation()
    const history = useHistory()
    const queryClient = useQueryClient()
    const admin = JSON.parse(localStorage.getItem('user')).admin
    const defaultPage = Number.parseInt(queryString.parse(location.search).page)
    const keywordDefault = queryString.parse(location.search).keyword
    const [page, setPage] = useState(defaultPage ? defaultPage : 1)
    const [pageSize, setPageSize] = useState(queryString.parse(location.search).limit || 10)
    const [keyword, setKeyword] = useState(keywordDefault ? keywordDefault : "")

    const {
        isFetching, 
        isLoading, 
        isError, 
        data: subjectList,
    } = useSubjectListQuery([page, pageSize, keyword])

    const data = subjectList?.data

    const pushHistory = (params) => {
        history.push({
            pathname : ADMIN_SUBJECT,
            search : queryString.stringify({page, limit: pageSize, ...params})
        })
    }

    const onSearch = (values) => {
        if(values.keyword !== keyword){
            setKeyword(values.keyword || '')
            setPage(1)
            pushHistory({ keyword: values.keyword || '', limit: pageSize})
        }
    }

    const onCell = (record) => {
        return {
            onClick: (event) => {
                history.push(`${ADMIN_SUBJECT}/${record.id}`)
            },
        }
    }

    const onUpdate = (id) => {
        history.push(bindParams(ADMIN_SUBJECT_EDIT, {id}))
    }

    const onDelete = (subject) => {
        if(window.confirm(`Do you want to delete ${subject.name} - ${subject.id_subject} ?`)){
            return axios.delete(bindParams(API_SUBJECT_DETAIL, {id: subject.id}))
                .then((res) => {
                    queryClient.invalidateQueries(['subject'])
                    notification.success({
                        message: res?.data?.message
                    })
                })
        }
    }

    const columns = [
        {
            title: '#',
            dataIndex: 'key',
            key: 'key',
            onCell,
            render: (value, data, index) => {
                return 1 * 15 + index - 14
            }
        },
        {
            title: "ID Subject",
            dataIndex: "id_subject",
            key: "id_subject",
            onCell
        },
        {
            title: "Name",
            dataIndex: "name",
            key: "name",
            onCell
        },
        {
            title: "Number lesson",
            dataIndex: "number_lesson",
            key: "number_lesson",
            onCell
        },
        {
            title: "Qr code",
            dataIndex: "qrcode",
            key: "qrcode",
            render: (value) => {
                return <QRCode 
                    size={38}
                    value={value}
                />
            },
            onCell
        },
        {
            title: "Teacher",
            dataIndex: ["teacher", "name"],
            key: ["teacher", "id"],
            onCell
        },
        {
            title: "",
            dataIndex: "action",
            render: (value, record) => {
                const popContent = (
                    <div className="layout-student-pop-over">
                        <div className="layout-student-pop-over-item" onClick={() => onUpdate(record.id)}>
                            <SettingOutlined />
                            Change
                        </div>
                        <div className="layout-student-pop-over-item" onClick={() => onDelete(record)}>
                            <DeleteOutlined />
                            Delete
                        </div>
                    </div>
                )
                return <Popover content={popContent} trigger={"click"} placement="bottom">
                    <Space className="icon_more_info">
                        <div style={{width : "10px", height : "10px", backgroundColor: "black", borderRadius: "1rem"}}></div>
                    </Space>
                </Popover>
            }
        }
    ]

    const onChangePage = (page, limit) => {
        setPage(page)
        setPageSize(limit)
        pushHistory({ page: page, limit: limit, keyword: keywordDefault })
    }

    if(isError) return <ErrorPage />
    
    return (
        <PrivateLayout>
            <Layout className="layout-student-padd">
                {admin === 0 ? (
                    <div className="layout-student-padd-button">
                        <Link to={ADMIN_SUBJECT_CREATE}>
                            <Button className="btn btn-common" size="large">
                                {"Create Subject"}
                            </Button>
                        </Link>
                    </div>
                ) : null}

                <Layout className="layout-student">
                    <Form className="layout-student-form"  onFinish={onSearch}  initialValues={{keyword : keyword}}>
                        <Typography className="layout-student-form-content">Student list</Typography>
                        <div className="layout-student-search">
                            <Form.Item name={"keyword"} className={"layout-student-search-input"}>
                                <InputCommon placeholder="Search"/>
                            </Form.Item>
                            <Button 
                                size="large"
                                loading={isFetching}
                                icon={<SearchOutlined />}
                                className="btn btn-common layout-student-form-button"
                                htmlType="submit"
                            />

                        </div>
                    </Form>

                    <Table 
                        rowKey={"id_subject"}
                        className="layout-student-table"
                        loading={isLoading}
                        columns={columns}
                        dataSource={data?.data}
                        pagination={{
                            total: data?.total,
                            current: page,
                            pageSize: pageSize,
                            showSizeChanger: true,
                            pageSizeOptions: [5, 10, 20, 30],
                            onChange: onChangePage
                        }}
                    />

                </Layout>
            </Layout>
        </PrivateLayout>
    )
}

export default Subject
