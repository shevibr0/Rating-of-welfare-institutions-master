// ... (other imports and code)

interface StarRatingProps {
    averageRating: number;
}

const StarRating: React.FC<StarRatingProps> = ({ averageRating }) => {
    const stars = [];

    for (let i = 1; i <= 5; i++) {
        const starClassName =
            i <= averageRating
                ? 'text-yellow-400'
                : 'text-gray-300';

        stars.push(
            <span key={i} className={`text-2xl ${starClassName}`}>
                ★
            </span>
        );
    }

    return (
        <div className="flex items-center justify-center">
            {stars}
        </div>
    );
};

export default StarRating;
