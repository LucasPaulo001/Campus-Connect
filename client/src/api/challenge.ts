import axiosInstace from "./axiosInstance";

export const ResponseQuiz = async (
  token: string,
  challengeId: string | undefined,
  questionIndex: number,
  responseIndex: number
) => {
  const res = await axiosInstace.post(
    `/api/challenge/${challengeId}/response`,
    {
        questionIndex,
        responseIndex
    },
    {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
  );

  return res.data;
};
