import { apiSlice } from "../api/apiSlice";

export const courseApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createCourse: builder.mutation({
      query: (data) => ({
        url: "create-course",
        method: "POST",
        body: data ,
        credentials: "include" as const,
      }),
    }),
    getAllCourses: builder.query({
      query: (data) => ({
        url: "courses-for-admin",
        method: "GET",
        credentials: "include" as const,
      }),
    }),
    deleteCourse: builder.mutation({
      query: (id) => ({
        url: `delete-course/${id}`,
        method: "Delete",
        credentials: "include" as const,
      }),
    }),
    editCourse: builder.mutation({
      query: ({id, data}) => ({
        url: `edit-course/${id}`,
        method: "PUT",
        body: data,
        credentials: "include" as const,
      }),
    }),
  }),
});


export const {useCreateCourseMutation, useGetAllCoursesQuery, useDeleteCourseMutation, useEditCourseMutation} = courseApi;