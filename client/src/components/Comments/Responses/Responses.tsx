"use client";

interface IResponsesProp {
  comment_id: number;
  openResps: number | null;
}

export const Responses = ({ comment_id, openResps }: IResponsesProp) => {
  return (
    openResps === comment_id && (
        <div className="h-50">
            {comment_id}
        </div>
    )
  )
};
