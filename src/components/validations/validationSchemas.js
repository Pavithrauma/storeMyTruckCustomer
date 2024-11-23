import * as yup from "yup";

export const RegisterSchema = yup.object().shape({
    fullName: yup
      .string()
      .required("Name cannot be empty")
      .min(3, "Minimum 3 characters requires")
      .matches(/^[A-Za-z]+( [A-Za-z]+)*$/, "Please Enter a Valid Name")
      .max(30, "Name cannot exceed 30 characters"),
      phone: yup.object().shape({
        number: yup.string()
        .matches(/^[0-9]+$/, "Must be only digits")
        .required("Number cannot be empty")
        .min(10, "Minimum 10 Number requires")
        .max(10, "Maximum 10 Number requires"),
        code: yup.string()
        .matches(/^[1-9]\d?$/, "Must be only digits")
          .required("Please Enter Country Code")
          .min(1, "Minimum 1 characters requires")
          .max(2, "Maximum 2 characters requires"),
      }),
    email: yup
      .string()
      .email("Invalid email address")
      .required("Email is required"),
    acccountOwnerName: yup
      .string()
      .min(3, "Minimum 3 characters requires")
      .matches(/^[A-Za-z]+( [A-Za-z]+)*$/, "Please Enter a Valid Account Owner Name")
      .max(30, "Name cannot exceed 30 characters")
      .required("Account Owner Name is required!"),
    companyName: yup
      .string()
      .min(3, "Minimum 3 characters requires")
      .matches(/^[A-Za-z]+( [A-Za-z]+)*$/, "Please Enter a Valid Company Name")
      .max(30, "Name cannot exceed 30 characters")
      .required("Company Name is required!"),
    companyPhonenUmber: yup
      .string()
      .matches(/^[0-9]+$/, "Must be only digits")
      .required("Phone number cannot be empty")
      .min(10, "Minimum 10 Number requires")
      .max(10, "Maximum 10 Number requires"),
    licenseNumber: yup
      .string()
      .matches(/^[0-9]+$/, "Must be only digits")
      .required("License Number is required!")
      .min(9, "Minimum 9 Number requires")
      .max(9, "Maximum 9 Number requires"),
  
  });