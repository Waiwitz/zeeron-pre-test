import { Button, Card, Form, Input, InputNumber, Space, Table } from "antd";
import type { TableProps } from "antd/es/table";
import type { User } from "../interface";
import { useUserData } from "../hooks/useUserData";
import { useCallback, useMemo, useState } from "react";
import FormItem from "antd/es/form/FormItem";

export const DataTable = () => {
  const { editForm, users, handleEditUser, handleDeleteUser } = useUserData();
  const [editingId, setEditingId] = useState<number | null>(null);

  const checkEditingField = useCallback(
    (id: User["id"]) => editingId === id,
    [editingId],
  );

  const columns: TableProps<User>["columns"] = useMemo(
    () => [
      {
        title: "Name",
        dataIndex: "name",
        key: "name",
        width: 150,
        render: (name, record) =>
          checkEditingField(record.id) ? (
            <FormItem
              className="mb-0!"
              name="name"
              rules={[{ required: true, message: "Please fill in a Name" }]}
            >
              <Input placeholder="Name" />
            </FormItem>
          ) : (
            name
          ),
      },
      {
        title: "Age",
        dataIndex: "age",
        key: "age",
        width: 150,
        render: (age, record) =>
          checkEditingField(record.id) ? (
            <FormItem
              className="mb-0!"
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
          ) : (
            age
          ),
      },
      {
        title: "Nickname",
        dataIndex: "nickname",
        key: "nickname",
        width: 150,
        render: (nickname, record) =>
          checkEditingField(record.id) ? (
            <FormItem
              className="mb-0!"
              name="nickname"
              rules={[{ required: true, message: "Please fill in a Nickname" }]}
            >
              <Input placeholder="Nickname" />
            </FormItem>
          ) : (
            nickname
          ),
      },
      {
        title: "Action",
        key: "action",
        width: 200,
        render: (record) => (
          <Space>
            {checkEditingField(record.id) ? (
              <>
                <Button type="primary" onClick={() => editForm.submit()}>
                  Save
                </Button>
                <Button onClick={() => setEditingId(null)}>Cancel</Button>
              </>
            ) : (
              <>
                <Button
                  onClick={() => {
                    setEditingId(record.id);
                    editForm.resetFields();
                    editForm.setFieldsValue(record);
                  }}
                >
                  Edit
                </Button>
                <Button onClick={() => handleDeleteUser(record.id)}>
                  Delete
                </Button>
              </>
            )}
          </Space>
        ),
      },
    ],
    [checkEditingField, editForm, handleDeleteUser],
  );

  const onFinish = (values: User) => {
    if (!editingId) return;
    handleEditUser(values, editingId);
    setEditingId(null);
    editForm.resetFields();
  };

  return (
    <>
      <Card>
        <Form form={editForm} onFinish={onFinish}>
          <Table
            className="[&_.ant-table-body]:h-[60vh]"
            columns={columns}
            dataSource={users}
            scroll={{ x: "fit-content", y: "fit-content" }}
          />
        </Form>
      </Card>
    </>
  );
};
