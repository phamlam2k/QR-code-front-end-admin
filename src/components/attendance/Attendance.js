import { Form, Table } from "antd"
import Layout from "antd/lib/layout/layout"
import QueryString from "qs"
import { useHistory } from "react-router-dom"
import { ADMIN_ATTENDANCE } from "../../config/path"
import useAttendanceQuery from "../../hooks/useAttendanceQuery"
import PrivateLayout from "../../layout/PrivateLayout"
import FilterSearch from "./items/FilterSearch"
import ErrorPage from "../page/404"
import queryString from "query-string";
import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"

import './Attendance.css'

const Attendance = () => {
    const history = useHistory()
    const [form] = Form.useForm()
    const location = useLocation()
    const [page, setPage] = useState(queryString.parse(location.search).page || 1)
    const [pageSize, setPageSize] = useState(queryString.parse(location.search).limit || 10)

    const {
        isLoading,
        isError,
        data: attendance,
        filter,
        setFilters
    } = useAttendanceQuery()

    useEffect(() => {
        if(location.search){
            if(filter?.student_id !== ''){
                form.setFieldsValue({'student_id' : parseInt(filter?.student_id)})
            }
            if(filter?.subject_id !== ''){
                form.setFieldsValue({'subject_id' : parseInt(filter?.subject_id)})
            }
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filter, location])

    const data = attendance?.data

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
            title: 'ID',
            dataIndex: 'id',
            key: 'id'
        },
        {
            title: 'Subject',
            dataIndex: ['subject', 'name'],
            key: ['subject', 'name']
        },
        {
            title: 'Student',
            dataIndex: ['student', 'name'],
            key: ['student', 'name']
        },
        {
            title: 'Time',
            dataIndex: 'time',
            key: 'time'
        },
        {
            title: 'Date',
            dataIndex: 'date',
            key: 'date'
        }
    ]

    const pushHistory = (params) => {
        history.push({
            pathname: ADMIN_ATTENDANCE,
            search: QueryString.stringify(params)
        })
    }

    const onFinish = (value) => {
        const filters = setFilters({ student_id: value.student_id || '', subject_id: value.subject_id || '', limit: pageSize })
        pushHistory(filters)
    }

    const onChangePage = (page, limit) => {
        setPage(page)
        setPageSize(limit)
        pushHistory({ student_id: filter.student_id || '', subject_id: filter.subject_id || '', page: page, limit: limit })
    }

    if(isError) return <ErrorPage />

    return (
        <PrivateLayout>
            <Layout className="layout-attendance">
                <FilterSearch 
                    filter={filter}
                    onFinish={onFinish} 
                    form={form} />
                <Table 
                    rowKey={"id"}
                    className="layout-teacher-table"
                    loading={isLoading}
                    columns={columns}
                    dataSource={data?.data}
                    pagination={{
                        total: data?.total,
                        current: page,
                        pageSize: pageSize,
                        showSizeChanger: true,
                        showQuickJumper: true,
                        pageSizeOptions: [5, 10, 20, 30],
                        onChange: onChangePage
                    }}
                />
            </Layout>
        </PrivateLayout>
    )
}

export default Attendance
