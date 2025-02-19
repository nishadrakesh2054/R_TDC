import Course from "../models/TdcCourse/course.Model.js";

export const CourseResource = {
  resource: Course,
  options: {
    navigation: { name: "Course", icon: "book" },

    actions: {
      list: {
        isAccessible: ({ currentAdmin }) =>
          currentAdmin && currentAdmin.role === "Admin",
      },
      edit: {
        isAccessible: ({ currentAdmin }) =>
          currentAdmin && currentAdmin.role === "Admin",
      },
      new: {
        isAccessible: ({ currentAdmin }) =>
          currentAdmin && currentAdmin.role === "Admin",
      },
      show: {
        isAccessible: ({ currentAdmin }) =>
          currentAdmin && currentAdmin.role === "Admin",
      },
      delete: {
        isAccessible: ({ currentAdmin }) =>
          currentAdmin && currentAdmin.role === "Admin",
      },
    },
    properties: {
      id: {
        isVisible: { list: false, edit: false, filter: false, show: false },
      },
      createdAt: {
        isVisible: { list: false, edit: false, filter: false, show: false },
      },
      updatedAt: {
        isVisible: { list: false, edit: false, filter: false, show: false },
      },
      reasonForJoining: {
        isVisible: { list: false, edit: false, filter: false, show: false },
      },
    },
  },
};
