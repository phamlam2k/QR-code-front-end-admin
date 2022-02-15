import { Button, Form, Select, Typography } from "antd"
import useStudentSeclect from "../../../hooks/useStudentSelect"
import useSubjectSeclect from "../../../hooks/useSubjectSelect"
import './FilterSearch.css';

const FilterSearch = ({ onFinish , form, filter}) => {
    const studentList = useStudentSeclect()
    const subjectList = useSubjectSeclect()

    return (
        <Form onFinish={onFinish} className="form-attendance" form={form}>
            <Typography.Title level={3}>Attendance list</Typography.Title>
            <div className="form-attendance-search">
                <Form.Item
                    name='student_id'
                    className="form-attendance-search__student"
                >
                    <Select 
                        placeholder='Choice student'
                        value={filter?.student_id}
                        allowClear
                        options={studentList}
                        size="large"
                    />
                </Form.Item>
                <Form.Item
                    name='subject_id'
                    className="form-attendance-search__subject"
                >
                    <Select 
                        placeholder='Choice subject'
                        value={filter?.subject_id}
                        options={subjectList}
                        allowClear
                        size="large"
                    />
                </Form.Item>
                <Button 
                    htmlType="submit" 
                    size="large"
                >Search</Button>

            </div>
        </Form>
    )
}

export default FilterSearch
