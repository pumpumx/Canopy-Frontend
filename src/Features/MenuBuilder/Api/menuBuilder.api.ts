import axios from "axios";
import { apiVersion, mainApi } from "../../../config/apiConfig";
import z from "zod";
import type { Category } from "../Types/menuBuilder.type";

const menuBuilderClient = axios.create({
  baseURL: `${mainApi}${apiVersion}`,
  timeout: 5000,
  withCredentials: true,
})


const menuBuilderRoutes = {
  addCategory: '/addCategory',
  editCategory: '/editCategory',
  deleteCategory: '/deleteCategory',

  addItem: '/addItem',
  editItem: '/editItem',
  deleteItem: '/deleteItem',

}

//---------------------------------------------MENU BUILDER API--------------------------------------------------

export const addCategorySchema = z.object({
  categoryName: z.string().min(1).max(30).toLowerCase().trim(),
  description: z.string().trim(),
  menuId: z.string().min(1).max(30).trim()
})
export const addCategory = async (data: Omit<Category, 'id' | 'isActive' | 'createdAt' | 'updatedAt'>) => {
  const addCategoryDTO = addCategorySchema.parse(data)
  const addCategoryResponse = await menuBuilderClient.post(`${menuBuilderRoutes.addCategory}`, addCategoryDTO);
  return addCategoryResponse;

}
