import { Button, Form, Image, Layout, notification, Popover, Space, Table, Typography } from "antd"
import { DeleteOutlined, SearchOutlined, SettingOutlined } from '@ant-design/icons'
import InputCommon from "../../common/InputCommon"
import PrivateLayout from "../../layout/PrivateLayout"
import { Link } from "react-router-dom"
import queryString from "query-string";
import {  ADMIN_TEACHER, ADMIN_TEACHER_CREATE, ADMIN_TEACHER_EDIT } from "../../config/path"
import { useHistory } from "react-router-dom"
import { useState } from "react"
import { useLocation } from "react-router-dom"
import axios from "axios"
import { bindParams } from "../../config/function"
import { useQueryClient } from "react-query"

import './Teacher.css'
import useTeacherListQuery from "../../hooks/useTeacherListQuery"
import { API_TEACHER_DETAIL } from "../../config/endpointApi"
import ErrorPage from "../page/404"

const Teacher = () => {
    const location = useLocation()
    const history = useHistory()
    const queryClient = useQueryClient()
    const defaultPage = Number.parseInt(queryString.parse(location.search).page)
    const keywordDefault = queryString.parse(location.search).keyword
    const [page, setPage] = useState(defaultPage ? defaultPage : 1)
    const [pageSize, setPageSize] = useState(queryString.parse(location.search).limit || 10)
    const [keyword, setKeyword] = useState(keywordDefault ? keywordDefault : "")

    const {
        isFetching, 
        isLoading, 
        isError, 
        data: teacherList,
    } = useTeacherListQuery([page, pageSize, keyword])

    const data = teacherList?.data

    const pushHistory = (params) => {
        history.push({
            pathname : ADMIN_TEACHER,
            search : queryString.stringify({page, limit: pageSize, ...params})
        })
    }

    const onSearch = (values) => {
        if(values.keyword !== keyword){
            setKeyword(values.keyword || '')
            setPage(1)
            pushHistory({ keyword: values.keyword || ''})
        }
    }

    const onCell = (record) => {
        return {
            onClick: (event) => {
                history.push(`${ADMIN_TEACHER}/${record.id}`)
            },
        }
    }

    const onUpdate = (id) => {
        history.push(bindParams(ADMIN_TEACHER_EDIT, {id}))
    }

    const onDelete = (teacher) => {
        if(window.confirm(`Do you want to delete ${teacher.name} - ${teacher.id_teacher} ?`)){
            return axios.delete(bindParams(API_TEACHER_DETAIL, {id: teacher.id}))
                .then((res) => {
                    queryClient.invalidateQueries(['teachers'])
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
            title: "ID Teacher",
            dataIndex: "id_teacher",
            key: "id_teacher",
            onCell
        },
        {
            title: 'Photo',
            dataIndex: 'photo',
            key: 'photo',
            render: (value, data, index) => {
                return <Image src={value} className="layout-teacher-image" alt={""}/>
            }
        },
        {
            title: "Name",
            dataIndex: "name",
            key: "name",
            onCell
        },
        {
            title: "Email",
            dataIndex: "email",
            key: "email",
            onCell
        },
        {
            title: "Phone number",
            dataIndex: "phonenumber",
            key: "phonenumber",
            onCell
        },
        {
            title: "",
            dataIndex: "action",
            render: (value, record) => {
                const popContent = (
                    <div className="layout-teacher-pop-over">
                        <div className="layout-teacher-pop-over-item" onClick={() => onUpdate(record.id)}>
                            <SettingOutlined />
                            Change
                        </div>
                        <div className="layout-teacher-pop-over-item" onClick={() => onDelete(record)}>
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
        pushHistory({ page: page, limit : limit, keyword: keywordDefault })
    }

    if(isError) return <ErrorPage />

    return (
        <PrivateLayout>
            <Layout className="layout-teacher-padd">
                <div className="layout-teacher-padd-button">
                    <Link to={ADMIN_TEACHER_CREATE}>
                        <Button className="btn btn-common" size="large">
                            {"Create Teacher"}
                        </Button>
                    </Link>
                </div>

                <Layout className="layout-teacher">
                    <Form className="layout-teacher-form" onFinish={onSearch} initialValues={{keyword : keyword}}>
                        <Typography className="layout-teacher-form-content">Teacher list</Typography>
                        <div className="layout-teacher-search">
                            <Form.Item name={"keyword"} className={"layout-teacher-search-input"}>
                                <InputCommon placeholder="Search"/>
                            </Form.Item>
                            <Button 
                                size="large"
                                loading={isFetching}
                                icon={<SearchOutlined />}
                                className="btn btn-common layout-teacher-form-button"
                                htmlType="submit"
                            />
                        </div>
                    </Form>

                    <Table 
                        rowKey={"id_teacher"}
                        className="layout-teacher-table"
                        loading={isLoading}
                        columns={columns}
                        dataSource={data?.data}
                        pagination={{
                            total: data?.total,
                            current: page,
                            pageSize,
                            pageSizeOptions: [5, 10, 20, 30],
                            showSizeChanger: true,
                            onChange: onChangePage
                        }}
                    />
                </Layout>
            </Layout>
        </PrivateLayout>
    )
}

export default Teacher
