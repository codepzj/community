import { ElMessage } from "element-plus";

export const showMessage = (message, type = "success") => {
  ElMessage({
    showClose: true,
    message,
    type,
    grouping: true,
    center: true,
    duration: 1500,
  });
};
