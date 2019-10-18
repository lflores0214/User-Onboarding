import React, { useState, useEffect } from "react";
import axios from "axios";
import { withFormik, Field, Form } from "formik";
import * as Yup from "yup";
import styled from "styled-components";

const FormName = styled(Form)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color:powderblue ;
  border: 1px solid black;
  width:40%;
  margin:2% 0 2% 0;
`;
const StyledField= styled(Field)`
    :focus{
        background-color: yellow;
        
    }
`;
const FormDiv = styled.div`
  width: 90%;
  margin: 0 auto;
  border-bottom: 1px solid Gainsboro;
  height: auto;
  display: flex;
  justify-content:center;
  
`;
const StyledButton = styled.button`
  width: 20%;
  background-color: skyblue;
  border-radius: 5px;
  margin-bottom: 2%;
`;

const Label = styled.label`
  margin: 2% 0 2% 0;
`;
const UserDiv = styled.div`
  display: flex;
  justify-content: space-around;
  width: 80%;
  margin-left: 10%;
  flex-wrap: wrap;
  padding:2%;
  
`;

const UserCard = styled.div`
    display:flex;
    flex-direction: column;
    align-items:center
    width: 20%
    border: 1px solid skyblue;
    margin: 2% 0 2% 0;
    background-color: skyblue;  
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
          <p>Enter your user information below</p>
          <Label>
            Name:
            <StyledField type="text" name="name" placeholder="Name" />
            {touched.name && errors.name && (
              <p className="errors>">{errors.name}</p>
            )}
          </Label>
          <Label>
            Email:
            <StyledField type="text" name="email" placeholder="Email" />
            {touched.email && errors.email && (
              <p className="errors>">{errors.email}</p>
            )}
          </Label>
          <Label>
            Password:
            <StyledField type="password" name="password" placeholder="Password" />
            {touched.password && errors.password && (
              <p className="errors>">{errors.password}</p>
            )}
          </Label>
          <Label>
            Role:
            <StyledField component="select" name="role">
              <option>Choose your role</option>
              <option value="Full-Stack">Full-Stack</option>
              <option value="Front-End">Front-End</option>
              <option value="Back-End">Back-End</option>
            </StyledField>
            {touched.role && errors.role && (
                <p className="errors">{errors.role}</p>
            )}
          </Label>
          <Label>
            Check the box if you agree to our terms of service:
            <br />
            <StyledField type="checkbox" name="tos" checked={values.tos} />
            {touched.tos && errors.tos && (
              <p className="errors>">{errors.tos}</p>
            )}
          </Label>
          <StyledButton type="submit">Submit!</StyledButton>
        </FormName>
      </FormDiv>
      <UserDiv>
        {users.map(user => (
          <UserCard>
            <p>Name:{user.name}</p>
            <p>Email:{user.email}</p>
            <p>Role:{user.role}</p>
          </UserCard>
        ))}
      </UserDiv>
    </div>
  );
};

const FormikOnboarding = withFormik({
  mapPropsToValues({ name, email, password, role, tos }) {
    return {
      name: name || "",
      email: email || "",
      password: password || "",
      role: role || "",
      tos: tos || false
    };
  },
  validationSchema: Yup.object().shape({
    name: Yup.string().required("Please enter your name"),
    email: Yup.string().required("Please enter your email"),
    password: Yup.string()
      .min(6, "password must be longer than 6 characters")
      .required("A password is required"),
      role: Yup.string().notOneOf(["Choose your role"]).required("You must choose a role"),
    tos: Yup.bool()
      .test(
        "tos",
        "You must agree to our terms of service to continue",
        value => value === true
      )
      .required("You must agree to our terms of service to continue")
  }),
  handleSubmit(values, { setStatus, resetForm }) {
      resetForm()
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
