import axiosInstace from "./axios/axiosInstance";

export const ResponseQuiz = async (
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
  );

  return res.data;
};
