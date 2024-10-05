import yup from "yup";
import { productCategories } from "../constant/general.constant.js";

export const addProductValidationSchema = yup.object({
  name: yup
    .string()
    .trim()
    .required("Name is required field. Please enter a name")
    .max(55),
  brand: yup.string().required().trim().max(55),
  price: yup.number().required().min(0),
  quantity: yup.number().required().min(1),
  category: yup.string().trim().required().oneOf(productCategories),
  freeShipping: yup.boolean().default(false),
  description: yup.string().required().trim().min(10).max(1000),
});

export const paginationValidationSchema = yup.object({
  page: yup.number().min(1).integer().default(DEFAULT_PAGE),
  limit: yup.number().min(1).integer().default(DEFAULT_LIMIT),
});
