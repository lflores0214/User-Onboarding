import React, { useState, useEffect } from "react";
import axios from "axios";
import { withFormik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import styled from "styled-components";

const FormName = styled(Form)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const FormDiv = styled.div`
  width: 30%;
  margin-left: 35%;
  border: 1px solid black;
  height: 40vh;
`;
const StyledButton = styled.button`
  width: 20%;
  background-color: skyblue;
  border-radius: 5px;
`;

const Label = styled.label`
  margin: 2% 0 2% 0;
`;

const Onboarding = ({ values, status, errors, touched }) => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    status && setUsers(users => [...users, status]);
  }, [status]);

  return (
    <div>
      <FormDiv>
        <FormName>
          <Label>
            Name:
            <Field type="text" name="name" placeholder="Name" />
            {touched.name && errors.name && (
                <p className="errors>">{errors.name}</p>
            )}
          </Label>
          <Label>
            Email:
            <Field type="text" name="email" placeholder="Email" />
            {touched.email && errors.email && (
                <p className="errors>">{errors.email}</p>
            )}
          </Label>
          <Label>
            Password:
            <Field type="password" name="password" placeholder="Password" />
            {touched.password && errors.password && (
                <p className="errors>">{errors.password}</p>
            )}
          </Label>
          <Label>
            Check the box if you agree to our terms of service:
            <br />
            <Field type="checkbox" name="tos" checked={values.tos} />
          </Label>
          <StyledButton type="submit">Submit!</StyledButton>
        </FormName>
      </FormDiv>
      <div>
          {users.map(user => (
            <ul>
              <li>Name:{user.name}</li>
              <li>Email:{user.email}</li>
            </ul>
          ))}
        </div>
    </div>
  );
};

const FormikOnboarding = withFormik({
  mapPropsToValues({ name, email, password, tos }) {
    return {
      name: name || "",
      email: email || "",
      password: password || "",
      tos: tos || false
    };
  },
  validationSchema: Yup.object().shape({
    name: Yup.string().required("Please enter your name"),
    email: Yup.string().required("Please enter your email"),
    password: Yup.string().required("A password is required"),
    tos: Yup.boolean().required(true)
  }),
  handleSubmit(values, { setStatus }) {
    axios
      .post(`https://reqres.in/api/users`, values)
      .then(response => {
        setStatus(response.data);
      })
      .catch(error => {
        console.log("ERROR", error);
      });
  }
})(Onboarding);
export default FormikOnboarding;
