import {
  Button,
  Col,
  Form,
  InputNumber,
  Layout,
  notification,
  Row,
  Select,
  Typography,
} from "antd";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import InputCommon from "../../common/InputCommon";
import { ADMIN_SUBJECT } from "../../config/path";
import PrivateLayout from "../../layout/PrivateLayout";
import createSubject from "../../hooks/createSubjectQuery";
import useTeacherSelect from "../../hooks/useTeacherSelect";
import axios from "axios";
import { bindParams } from "../../config/function";
import { API_SUBJECT_EDIT } from "../../config/endpointApi";
import { useParams } from "react-router-dom";
import { useQueryClient } from "react-query";
import useSubjectDetailQuery from "../../hooks/useSubjectDetailQuery";

import "./CreateSubject.css";
import ErrorPage from "../page/404";

const UpdateSubject = () => {
  const history = useHistory();
  const createSubjectList = createSubject();
  const { id } = useParams();
  const queryClient = useQueryClient();
  const [form] = Form.useForm()

  const teacherSelect = useTeacherSelect();

  const {
    data: subjectDetail,
    isError,
  } = useSubjectDetailQuery(id);

  const data = subjectDetail?.data;

  useEffect(() => {
    const {
      id_subject,
      name,
      number_lesson,
      teacher,
      qrcode,
    } = { ...data };
    
    if(id_subject !== undefined){
        form.setFieldsValue(
        {
            id_subject : id_subject,
            name: name, 
            number_lesson: number_lesson,
            id_teacher: teacher?.id, 
            qrcode: qrcode
        })
    }
  });

  const onFinish = (value) => {
    axios.put(bindParams(API_SUBJECT_EDIT, { id }), value).then((res) => {
      if (res?.data?.code === 226) {
        notification.error({
          message: res?.data?.message,
        });
      }
      if (res?.data?.code === 200) {
        notification.success({
          message: "Create student success",
        });
        queryClient.invalidateQueries(["subject"]);
        history.push(ADMIN_SUBJECT);
      }
    });
  };

  if(isError) return <ErrorPage />

  return (
    <PrivateLayout>
      <Layout className="layout-create-subject">
        <Form
          layout="vertical"
          className="layout-create-subject-form"
          onFinish={onFinish}
          form={form}
        >
          <Typography className="layout-create-subject-form-content">
            Update subject form
          </Typography>
          <Row justify="space-between">
            <Col md={11}>
              <Form.Item
                name={"id_subject"}
                label="ID Subject"
                rules={[
                  {
                    required: true,
                    message: "Please fill your input ID Subject",
                  },
                ]}
              >
                <InputCommon size="large" placeholder={"Subject ID"} />
              </Form.Item>
            </Col>
            <Col md={11}>
              <Form.Item
                name={"name"}l
                label="Name of Subject"
                rules={[
                  {
                    required: true,
                    message: "Please fill your input Name of Subject",
                  },
                ]}
              >
                <InputCommon size="large" placeholder={"Name of Subject"} />
              </Form.Item>
            </Col>
            <Col md={11}>
              <Form.Item
                name={"number_lesson"}
                label="Number of lesson"
                rules={[
                  {
                    required: true,
                    message: "Please fill your input Number of lesson",
                  },
                ]}
              >
                <InputNumber size="large" placeholder={"0"} />
              </Form.Item>
            </Col>
            <Col md={11}>
              <Form.Item
                name={"id_teacher"}
                label="Teacher"
                rules={[
                  {
                    required: true,
                    message: "Please choice your teacher",
                  },
                ]}
              >
                <Select
                  size="large"
                  placeholder={"Teacher"}
                  options={teacherSelect}
                />
              </Form.Item>
            </Col>
          </Row>
          <div className="layout-create-subject-form-button">
            <Button
              htmlType="submit"
              className="btn btn-common"
              size="large"
              loading={createSubjectList.isLoading}
            >
              Create Subject
            </Button>

            <Button
              htmlType="button"
              className="layout-create-subject-form-button-back"
              size="large"
              onClick={() => {
                history.goBack();
              }}
            >
              Back
            </Button>
          </div>
        </Form>
      </Layout>
    </PrivateLayout>
  );
};

export default UpdateSubject;
