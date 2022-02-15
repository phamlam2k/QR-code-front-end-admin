import { Button, Form, Image, Layout, notification, Popover, Space, Table, Typography } from "antd"
import { DeleteOutlined, SearchOutlined, SettingOutlined } from '@ant-design/icons'
import InputCommon from "../../common/InputCommon"
import PrivateLayout from "../../layout/PrivateLayout"
import { Link } from "react-router-dom"
import queryString from "query-string";
import { ADMIN_STUDENT, ADMIN_STUDENT_CREATE, ADMIN_STUDENT_EDIT } from "../../config/path"
import { useHistory } from "react-router-dom"
import useStudentListQuery from "../../hooks/useStudentListQuery"
import { useState } from "react"
import { useLocation } from "react-router-dom"
import axios from "axios"
import { bindParams } from "../../config/function"
import { API_STUDENT_DETAIL } from "../../config/endpointApi"
import { useQueryClient } from "react-query"
import ErrorPage from "../page/404"

import './Student.css'

const Student = () => {
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
        data: studentList,
    } = useStudentListQuery([page, pageSize, keyword])

    const data = studentList?.data

    const pushHistory = (params) => {
        history.push({
            pathname : ADMIN_STUDENT,
            search : queryString.stringify({page, limit: pageSize, ...params})
        })
    }

    const onSearch = (values) => {
        if(values.keyword !== keyword){
            setKeyword(values.keyword || '')
            pushHistory({ keyword: values.keyword || ''})
        }
    }

    const onCell = (record) => {
        return {
            onClick: (event) => {
                history.push(`${ADMIN_STUDENT}/${record.id}`)
            },
        }
    }

    const onUpdate = (id) => {
        history.push(bindParams(ADMIN_STUDENT_EDIT, {id}))
    }

    const onDelete = (student) => {
        if(window.confirm(`Do you want to delete ${student.name} - ${student.id_student} ?`)){
            return axios.delete(bindParams(API_STUDENT_DETAIL, {id: student.id}))
                .then((res) => {
                    queryClient.invalidateQueries(['student'])
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
            title: "ID Student",
            dataIndex: "id_student",
            key: "id_student",
            onCell
        },
        {
            title: 'Photo',
            dataIndex: 'photo',
            key: 'photo',
            render: (value, data, index) => {
                return <Image src={value} className="layout-student-image"/>
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
            title: "Major",
            dataIndex: "major",
            key: "major",
            onCell
        },
        {
            title: "Phone number",
            dataIndex: "phonenumber",
            key: "phonenumber",
            onCell
        },
        {
            title: "Birth",
            dataIndex: "birth",
            key: "birth",
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

    const onChangePage = ( page, limit) => {
        setPage(page)
        setPageSize(limit)
        pushHistory({page: page, limit: limit, keyword: keywordDefault})
        
    }

    if(isError) return <ErrorPage />

    return (
        <PrivateLayout>
            <Layout className="layout-student-padd">
                {admin === 0 ? (
                <div className="layout-student-padd-button">
                    <Link to={ADMIN_STUDENT_CREATE}>
                        <Button className="btn btn-common" size="large">
                            {"Create Student"}
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
                        rowKey={"id_student"}
                        className="layout-student-table"
                        loading={isLoading}
                        columns={columns}
                        dataSource={data?.data}
                        pagination={{
                            total: data?.total,
                            current: page,
                            pageSize: pageSize,
                            onChange: onChangePage,
                            showSizeChanger: true,
                            pageSizeOptions: [5, 10, 20, 30]
                        }}
                    />

                </Layout>
            </Layout>
        </PrivateLayout>
    )
}

export default Student
