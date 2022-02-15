import { SettingOutlined } from "@ant-design/icons"
import { Layout, Popover, Space, Table, Typography } from "antd"
import QueryString from "query-string"
import { useState } from "react"
import { useLocation } from "react-router-dom"
import { useHistory } from "react-router-dom"
import { bindParams } from "../../config/function"
import { ADMIN_USER, ADMIN_USER_EDIT } from "../../config/path"
import useAccountList from "../../hooks/useAccountUser"
import PrivateLayout from "../../layout/PrivateLayout"
import ErrorPage from "../page/404"
import './User.css'

const User = () => {
    const history = useHistory()
    const location = useLocation()
    const [page, setPage] = useState(QueryString.parse(location.search).page || 1)
    const [pageSize, setPageSize] = useState(QueryString.parse(location.search).limit || 10)

    const {
        isError,
        data: userAcount,
        isLoading
    } = useAccountList([page, pageSize])

    const onCell = (value) => {
        return {
            onClick: (event) => {
                history.push(`${ADMIN_USER}/${value.id}`)
            },
        }
    }

    const pushHistory = (params) => {
        history?.push({
            pathname: ADMIN_USER,
            search: QueryString.stringify({page: page, limit: pageSize, ...params})
        })
    }

    const onUpdate = (record) => {
        history.push(bindParams(ADMIN_USER_EDIT, { id : record?.id }))
    }


    console.log(userAcount)
    
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
            title: 'ID',
            dataIndex: 'id_student',
            onCell,
            key: 'id_student'
        },
        {
            title: 'Name',
            dataIndex: 'name',
            onCell,
            key: 'name'
        },
        {
            title: 'Email',
            dataIndex: 'email',
            onCell,
            key: 'email'
        },
        {
            title: 'Role',
            dataIndex: 'admin',
            onCell,
            key: 'admin',
            render: (value) => {
                if(value === 0){
                    return <div>Admin</div>
                }else if(value === 1){
                    return <div>Teacher</div>
                }else{
                    return <div>Student</div>
                }
            }
        },
        {
            title: "",
            dataIndex: "action",
            render: (value, record) => {
                const popContent = (
                    <div className="layout-teacher-pop-over">
                        <div className="layout-teacher-pop-over-item" onClick={() => onUpdate(record)}>
                            <SettingOutlined />
                            Change
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
        pushHistory({page: page, limit: limit})
    }

    if(isError) return <ErrorPage />

    return (
        <PrivateLayout  className="layout-user">
            <Layout className="layout-user">
                <Typography.Title level={3}>User account list</Typography.Title>
                <Table 
                    rowKey={"id_student"}
                    className="layout-teacher-table"
                    loading={isLoading}
                    columns={columns}
                    dataSource={userAcount?.data?.data}
                    pagination={{
                        total: userAcount?.data?.total,
                        current: page,
                        pageSize: pageSize,
                        showSizeChanger: true,
                        pageSizeOptions: [5, 10, 20, 30],
                        onChange: onChangePage,
                    }}
                />
            </Layout>
        </PrivateLayout>
    )
}

export default User
