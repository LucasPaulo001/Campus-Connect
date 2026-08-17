import axiosInstance from "./axios/axiosInstance";

export const ResponseQuiz = async (
  challengeId: string | undefined,
  questionIndex: number,
  responseIndex: number
) => {
  const res = await axiosInstance.post(
    `/api/challenge/${challengeId}/response`,
    {
        questionIndex,
        responseIndex
    },
  );

  return res.data;
};
