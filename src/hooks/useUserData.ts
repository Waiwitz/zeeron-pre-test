import { useForm } from "antd/es/form/Form";
import { useUsersStore } from "../stores/userStore";
import type { User } from "../interface";
import { useEffect } from "react";
import { Modal } from "antd";

export const useUserData = () => {
  const [editForm] = useForm();
  const { users, setUsers } = useUsersStore((state) => state);

  useEffect(() => {
    const userList = localStorage.getItem("users");
    if (userList) {
      setUsers(JSON.parse(userList) as User[]);
    }
  }, [setUsers]);

  const handleSaveUser = (values: User) => {
    const newList = [...users, { ...values, id: users.length + 1 }];
    setUsers(newList);
    localStorage.setItem("users", JSON.stringify(newList));
  };

  const handleEditUser = (values: User, id: number) => {
    if (!id) return;
    const editedUsers: User[] = users.map((row) => {
      if (row.id !== id) return row;
      return { ...values, id };
    });

    setUsers(editedUsers);
    localStorage.setItem("users", JSON.stringify(editedUsers));
  };

  const handleDeleteUser = (id: number | null) => {
    if (!id) return;

    Modal.confirm({
      title: "Delete User",
      content: "Are you sure you want to delete this user?",
      onCancel: () => {},
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk: () => {
        const deletedUsers = users.filter((row) => row.id !== id);
        setUsers(deletedUsers);
        localStorage.setItem("users", JSON.stringify(deletedUsers));
      },
    });
  };

  return {
    editForm,
    users,
    handleSaveUser,
    handleEditUser,
    handleDeleteUser,
  };
};
