import { Button, Form, Layout, notification, Popover, Space, Table, Typography } from "antd"
import InputCommon from "../../common/InputCommon"
import PrivateLayout from "../../layout/PrivateLayout"
import { Link } from "react-router-dom"
import queryString from "query-string";
import {  ADMIN_TABLE_REGISTER, ADMIN_TABLE_REGISTER_CREATE } from "../../config/path"
import { useHistory } from "react-router-dom"
import { useState } from "react"
import { useLocation } from "react-router-dom"
import axios from "axios"
import { bindParams } from "../../config/function"
import { API_TABLE_REGISTER_DETAIL } from "../../config/endpointApi"
import { useQueryClient } from "react-query"
import { DeleteOutlined, SearchOutlined } from '@ant-design/icons'
import useTableRegisterListQuery from "../../hooks/useTableRegisterListQuery";

import './Table.css'
import ErrorPage from "../page/404";

const TableRegister = () => {
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
        data: tableList,
    } = useTableRegisterListQuery([page, pageSize, keyword ])

    const data = tableList?.data?.data
    const total = tableList?.data?.total

    const pushHistory = (params) => {
        history.push({
            pathname : ADMIN_TABLE_REGISTER,
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

    const onDelete = (table) => {
        if(window.confirm(`Do you want to delete ${table?.student?.name} - ${table?.subject?.name} ?`)){
            return axios.delete(bindParams(API_TABLE_REGISTER_DETAIL, {id: table?.id}))
                .then((res) => {
                    queryClient.invalidateQueries(['table_register'])
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
            render: (value, data, index) => {
                return 1 * 15 + index - 14
            }
        },
        {
            title: "ID Table",
            dataIndex: "id",
            key: "id"
        },
        {
            title: 'Student',
            dataIndex: ['student', 'name'],
            key: ['student', 'name']
        },
        {
            title: "Subject",
            dataIndex: ["subject", "name"],
            key: "name"
        },
        {
            title: "Start date",
            dataIndex: "start_date",
            key: "start_date"
        },
        {
            title: "End date",
            dataIndex: "end_date",
            key: "end_date"
        },
        {
            title: "",
            dataIndex: "action",
            render: (value, record) => {
                const popContent = (
                    <div className="layout-teacher-pop-over">
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
        pushHistory({ page: page, limit: limit, keyword: keywordDefault })
    }

    if(isError) return <ErrorPage />

    return (
        <PrivateLayout>
            <Layout className="layout-teacher-padd">
                <div className="layout-teacher-padd-button">
                    <Link to={ADMIN_TABLE_REGISTER_CREATE}>
                        <Button className="btn btn-common" size="large">
                            {"Create Table Register"}
                        </Button>
                    </Link>
                </div>

                <Layout className="layout-teacher">
                    <Form className="layout-teacher-form" onFinish={onSearch} initialValues={{keyword : keyword}}>
                        <Typography className="layout-teacher-form-content">Table Register list</Typography>
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
                        rowKey={"id"}
                        className="layout-teacher-table"
                        loading={isLoading}
                        columns={columns}
                        dataSource={data}
                        pagination={{
                            total: total,
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

export default TableRegister
