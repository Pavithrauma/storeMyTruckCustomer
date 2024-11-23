import * as Yup from "yup";
const validationSchema = Yup.object().shape({
  firstName: Yup.string().required("First Namevcfffff is required"),
  lastName: Yup.string().required("Last Name is required"),
  companyName: Yup.string().required("Company name is required"),
  cellPhoneNumber: Yup.string().required("Cell Phone Number is required"),
  companyPhoneNumber: Yup.string().required("Company Phone Number is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  confirmEmail: Yup.string()
    .oneOf([Yup.ref("email"), null], "Emails must match")
    .required("Confirm Email is required"),
    vehicles: Yup.array().of(
      Yup.object().shape({
        year: Yup.string().required("Year  is required"),
        make: Yup.string().required("Make  is required"),
        model: Yup.string().required("Model is required"),
        color: Yup.string().required("Color is required"),
        usdot: Yup.string().required("USDOT# is required"),
        // /companyNameOnTractor: Yup.string().required("Company Name On Tractor is required"),
      })
    ),
  photoOfVehicle: Yup.mixed().required("Photo of Vehicle(s) Upload is required"),
  insuranceCard: Yup.mixed().required("Insurance Card Upload is required"),
  driversLicense: Yup.mixed().required("Driver's License Upload is required"),
  acknowledge: Yup.boolean().oneOf([true], "Must acknowledge terms and conditions"),
  message: Yup.string(),
  personalvehical:Yup.string().required("Personal Vehicle is required"),
});
export default validationSchema;
