import axios from "axios";

export const DEFAULT_OPTIONS = {
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
};

export const getMajorsByUniversity = (
  universityId: number,
  majorType: "SOSHUM" | "SAINTEK" = "SOSHUM"
) =>
  axios
    .get<Array<{ id: number; name: string }>>(
      `/api/majors?universityId=${universityId}&majorType=${majorType}`
    )
    .then((res) => res.data);

export const updateProfile = (data: any) =>
  axios
    .put("/api/users/profile", data, DEFAULT_OPTIONS)
    .then((res) => res.data);
