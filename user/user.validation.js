import yup from "yup";

export const userValidationSchema = yup.object({
  email: yup.string().trim().required().email().lowercase(),
  password: yup.string().trim().required(),
  firstName: yup.string().max(30).required().trim(),
  lastName: yup.string().max(30).required().trim(),

  gender: yup.string().required().trim().oneOf(["male", "female", "other"]),
  role: yup.string().required().trim().oneOf(["buyer", "seller"]),
});

export const loginUserValidationSchema = yup.object({
  email: yup.string().trim().required().email().lowercase(),
  password: yup.string().trim().required(),
});
