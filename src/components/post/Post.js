import { Button, Form, Image, Layout, notification, Popover, Space, Table, Typography } from "antd"
import { DeleteOutlined, SearchOutlined } from '@ant-design/icons'
import InputCommon from "../../common/InputCommon"
import PrivateLayout from "../../layout/PrivateLayout"
import { Link } from "react-router-dom"
import queryString from "query-string";
import { ADMIN_POST, ADMIN_POST_CREATE } from "../../config/path"
import { useHistory } from "react-router-dom"
import { useState } from "react"
import { useLocation } from "react-router-dom"
import axios from "axios"
import { bindParams } from "../../config/function"
import { API_POST_DETAIL } from "../../config/endpointApi"
import { useQueryClient } from "react-query"
import ErrorPage from "../page/404"
import usePostListQuery from "../../hooks/usePostListQuery"

import './Post.css'

const Post = () => {
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
    } = usePostListQuery([page, pageSize, keyword])

    const data = studentList?.data

    const pushHistory = (params) => {
        history.push({
            pathname : ADMIN_POST,
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
                history.push(`${ADMIN_POST}/${record.id}`)
            },
        }
    }

    const onDelete = (student) => {
        if(window.confirm(`Do you want to delete ${student.name} - ${student.id_student} ?`)){
            return axios.delete(bindParams(API_POST_DETAIL, {id: student.id}))
                .then((res) => {
                    queryClient.invalidateQueries(['post'])
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
            width: '5%',
            onCell,
            render: (value, data, index) => {
                return 1 * 15 + index - 14
            }
        },
        {
            title: "Photo",
            dataIndex: "photo",
            key: "photo",
            width: '10%',
            render: (value, data, index) => {
                return <Image src={value} className="layout-student-image"/>
            },
            onCell
        },
        {
            title: "Title",
            width: '10%',
            dataIndex: "title",
            key: "title",
            onCell
        },
        {
            title: "Teacher",
            width: '10%',
            dataIndex: ["teacher", 'name'],
            key: ["teacher", 'name'],
            onCell
        },
        {
            title: "Date Post",
            dataIndex: "date",
            width: '10%',
            key: "date",
            onCell
        },
        {
            title: "Permission",
            dataIndex: "permisson",
            width: '10%',
            key: "permisson",
            render: (value, data, index) => {
                if(value === 1){
                    return (
                        <div className="post-status">
                            <div className="post-status-accept"></div>
                            <div>Accepted</div>
                        </div>
                    )
                }else{
                    return (
                        <div className="post-status">
                            <div className="post-status-wait"></div>
                            <div>Wait to accept</div>
                        </div>
                    )
                }
                
            },
            onCell
        },
        {
            title: "",
            dataIndex: "action",
            width: '3%',
            render: (value, record) => {
                const popContent = (
                    <div className="layout-student-pop-over">
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
                {admin === 1 ? (
                <div className="layout-student-padd-button">
                    <Link to={ADMIN_POST_CREATE}>
                        <Button className="btn btn-common" size="large">
                            {"Create Post"}
                        </Button>
                    </Link>
                </div>
                    
                ) : null}

                <Layout className="layout-student">
                    <Form className="layout-student-form"  onFinish={onSearch}  initialValues={{keyword : keyword}}>
                        <Typography className="layout-student-form-content">Post list</Typography>
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

export default Post
