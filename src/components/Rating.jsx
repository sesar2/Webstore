import { BsStar, BsStarHalf, BsStarFill } from "react-icons/bs";
const STAR_COUNT = 5;

const Rating = ({ value }) => {
  const stars = Array(STAR_COUNT)
    .fill(<BsStar />)
    .fill(<BsStarFill />, 0, Math.floor(value));
  if (value % 1 != 0)
    // if value is a decimal, add a half star
    stars[Math.floor(value)] = <BsStarHalf />;

  return <div className="rating">{stars}</div>;
};


export default Rating