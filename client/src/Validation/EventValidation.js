import * as yup from "yup";

export const eventRegisterSchema = yup.object().shape({
  name: yup
    .string()
    .required("Name is required")
    .min(5, "Name must be at least 5 characters"),

  phone: yup
    .string()
    .required("Phone number is required")
    .matches(/^\d+$/, "Phone number must contain only numbers")
    .min(8, "Phone number must be at least 8 digits")
    .max(15, "Phone number can't exceed 15 digits"),

  eventId: yup.string().required("Please select an event"),
});
