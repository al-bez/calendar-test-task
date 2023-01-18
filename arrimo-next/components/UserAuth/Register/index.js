import React, { useEffect } from "react";
import { Button, Form, Input } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { registration } from "../../../thunks/userThunk";
import { useRouter } from "next/dist/client/router";

const Register = () => {
  const [registrationForm] = Form.useForm();
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    registrationForm.resetFields();
  }, []);

  const onFinish = (values) => {
    console.log("Success:", values);
    dispatch(registration(values)).then((res) => {
      console.log("dispatch login res :>>", res);
      if (res?.payload?.user?.confirmed) {
        localStorage.setItem('ACCESS_TOKEN', res?.payload?.jwt);
        router.push('/users')
      }
      registrationForm.resetFields();
    });
  };

  return (
    <div>
      <h2 className="text-center">Register your account</h2>
      <Form
        form={registrationForm}
        name="registration"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item
          label="Username"
          name="username"
          rules={[
            {
              required: true,
              message: "Please input your username!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="email"
          label="E-mail"
          rules={[
            {
              type: "email",
              message: "The input is not valid E-mail!",
            },
            {
              required: true,
              message: "This field",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="password"
          label="password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
          hasFeedback
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name="confirm"
          label="confirm Password"
          dependencies={["password"]}
          hasFeedback
          rules={[
            {
              required: true,
              message: "Please confirm your password!",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error("Passwords do not match!")
                );
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 10,
          }}
        >
          <Button type="default" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Register;
