import { useParams } from "react-router-dom";

export const PageInside = () => {
  const { page } = useParams<{ page: string }>();

  return <div>{page}</div>;
};
