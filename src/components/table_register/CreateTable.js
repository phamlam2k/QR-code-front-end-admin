import { Button, Col, DatePicker, Form, Layout, notification, Row, Select, Typography } from "antd"
import { useState } from "react"
import { useHistory } from "react-router-dom"
import { ADMIN_TABLE_REGISTER } from "../../config/path"
import PrivateLayout from "../../layout/PrivateLayout"
import createTableRegister from "../../hooks/createTableRegisterQuery"
import moment from 'moment'
import useStudentSelect from "../../hooks/useStudentSelect"

import './CreateTable.css'
import useSubjectSeclect from "../../hooks/useSubjectSelect"
import { useQueryClient } from "react-query"

const CreateTable = () => {
    const history = useHistory()
    const createTableRegisterList = createTableRegister()
    const [startDate,setStartDate] = useState()
    const queryClient = useQueryClient()

    const studentSeclect = useStudentSelect()
    const subjectSelect = useSubjectSeclect()

    const onFinish = (value) => {
        const { start_date, end_date } = value

        if(start_date) {
            value.start_date = start_date.format("YYYY-MM-DD")
        }

        if(end_date){
            value.end_date = end_date.format("YYYY-MM-DD")
        }

        createTableRegisterList.mutate(value, {
            onSuccess :(data, variables, context) => {
                if(data?.data?.code === 226){
                    notification.error({
                        message: data?.data?.message
                    })
                    
                }
                if(data?.data?.code === 200){
                    notification.success({
                        message: data?.data?.message
                    })
                    queryClient.invalidateQueries(['table_register'])
                    history.push(ADMIN_TABLE_REGISTER)
                }
            }
        })
    }

    const onChangeDate = (date) => {
        setStartDate(date)
    }
    
    return (
        <PrivateLayout>
            <Layout className="layout-create-subject">
                <Form
                    layout="vertical"
                    className="layout-create-subject-form"
                    onFinish={onFinish}
                >
                    <Typography className="layout-create-subject-form-content">Create table register form</Typography>
                    <Row justify="space-between">
                        <Col md={11}>
                            <Form.Item
                                name={"id_subject"}
                                label="Name of Subject"
                                rules={[{
                                    required: true,
                                    message: "Please choice your subject"                            
                                }]}
                            >
                                <Select 
                                    size="large"
                                    maxTagCount={4}
                                    placeholder={"Subject"}
                                    options={subjectSelect}
                                />
                            </Form.Item>
                        </Col>
                        <Col md={11}>
                            <Form.Item
                                name={"student"}
                                label="Students"
                                rules={[
                                    {
                                        required: true,
                                        message: "Please choice your student"                            
                                    }
                                ]}
                            >
                                <Select 
                                    size="large"
                                    mode="tags"
                                    maxTagCount={4}
                                    placeholder={"Students"}
                                    options={studentSeclect}
                                />
                            </Form.Item>
                        </Col>
                        <Col md={11}>
                            <Form.Item
                                name={"start_date"}
                                label="Start Date"
                                rules={[{
                                    required: true,
                                    message: "Please fill your input start date"                            
                                }]}
                            >
                                <DatePicker 
                                    size="large"
                                    disabledDate={(date) => {
                                        return date && date.startOf() < moment().startOf("day")
                                    }}
                                    onChange={onChangeDate}
                                    className="layout-create-subject-form-date"
                                />
                            </Form.Item>
                        </Col>
                        <Col md={11}>
                            <Form.Item
                                name={"end_date"}
                                label="End Date"
                                rules={[{
                                    required: true,
                                    message: "Please fill your input end date"                            
                                }]}
                                >
                                <DatePicker 
                                    size="large"
                                    disabledDate={(date) => {
                                        return  date < startDate
                                    }}
                                    className="layout-create-subject-form-date"
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    <div className="layout-create-subject-form-button">
                        <Button 
                            htmlType="submit"
                            className="btn btn-common"
                            size="large"
                            loading={createTableRegisterList.isLoading}
                        >
                            Create Subject
                        </Button>

                        <Button
                            htmlType="button"
                            className="layout-create-subject-form-button-back"
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

export default CreateTable
