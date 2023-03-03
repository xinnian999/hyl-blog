import { request } from "@/utils";

export const addCommentApi = (data) => {
  return request.post("/comment/add", data);
};
