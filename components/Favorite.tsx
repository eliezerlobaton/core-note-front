import { FavoriteProps } from "@/utils/types";
import { FaStar, FaRegStar } from "react-icons/fa";

export default function Favorite({ isFavorite, onToggle }: FavoriteProps) {
  return (
    <button onClick={onToggle}>
      {isFavorite ? (
        <FaStar className="text-yellow-500" />
      ) : (
        <FaRegStar className="text-gray-500" />
      )}
    </button>
  );
}
