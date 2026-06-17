import { Button, Col, Form, Input, InputNumber, Row } from "antd";
import { useForm } from "antd/es/form/Form";
import FormItem from "antd/es/form/FormItem";
import { useState } from "react";
import { useUserData } from "../hooks/useUserData";
import type { User } from "../interface";

export const AddDataField = () => {
  const [createform] = useForm();
  const [isAdding, setIsAdding] = useState(false);
  const { handleSaveUser } = useUserData();

  const onFinish = (values: User) => {
    handleSaveUser(values);
    setIsAdding(false);
    createform.resetFields();
  };

  return (
    <div className="mt-4">
      {isAdding && (
        <Form form={createform} layout="vertical" onFinish={onFinish}>
          <Row gutter={10}>
            <Col sm={7} lg={6}>
              <FormItem
                name="name"
                rules={[{ required: true, message: "Please fill in a Name" }]}
              >
                <Input placeholder="Name" />
              </FormItem>
            </Col>
            <Col sm={4} lg={3}>
              <FormItem
                name="age"
                rules={[{ required: true, message: "Please fill in a Age" }]}
              >
                <InputNumber
                  className="w-full!"
                  placeholder="Age"
                  min={0}
                  max={150}
                />
              </FormItem>
            </Col>
            <Col sm={7} lg={6}>
              <FormItem
                name="nickname"
                rules={[
                  { required: true, message: "Please fill in a Nickname" },
                ]}
              >
                <Input placeholder="Nickname" />
              </FormItem>
            </Col>
            <Col sm={6}>
              <div className="flex gap-2">
                <Button type="primary" htmlType="submit">
                  Save
                </Button>
                <Button onClick={() => setIsAdding(false)}>Cancel</Button>
              </div>
            </Col>
          </Row>
        </Form>
      )}
      <Button size="large" onClick={() => setIsAdding(true)} className="mt-2">
        Add
      </Button>
    </div>
  );
};
