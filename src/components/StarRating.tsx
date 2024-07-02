import React, { useContext, useState } from "react";
import { StarRatingDiv } from "./StarRatingStyle";
import { IoStar } from "react-icons/io5";
import { context } from "../hooks/state.context";


interface StarRatingProps {
    rating: number;
    setRating: React.Dispatch<React.SetStateAction<number>>;
}

const StarRating: React.FC<StarRatingProps> = ({
    rating,
    setRating
}) => {
    const { state } = useContext(context)

    const [hover, setHover] = useState<number | null>(state.rating);

    return (
        <StarRatingDiv>
            {[...Array(5)].map((_, i) => {
                const ratingValue = i + 1;
                return (
                    <label key={i}>
                        <input
                            type="radio"
                            name="rating"
                            value={ratingValue}
                            onClick={() => setRating(ratingValue)}
                        />
                        <IoStar
                            size={50}
                            // color="#FFD601"
                            onMouseEnter={() => setHover(ratingValue)}
                            onMouseLeave={() => setHover(null)}
                            className={
                                ratingValue <= (hover || rating || state.rating) ? "activeStar" : "star"
                            }
                        ></IoStar>
                    </label>
                );
            })}
        </StarRatingDiv>
    );
}

export default StarRating;