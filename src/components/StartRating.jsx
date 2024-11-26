const StarRating = ({ rating }) => {
  const MAX_STARS = 5;

  const stars = Array.from({ length: MAX_STARS }, (_, index) => {
    const starValue = index + 1;

    if (rating >= starValue) {
      return "text-yellow-400";
    } else {
      return "text-gray-300";
    }
  });

  return (
    <div className="flex space-x-1">
      {stars.map((color, index) => (
        <svg
          key={index}
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          className={`h-5 w-5 ${color}`}
          viewBox="0 0 24 24"
        >
          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
        </svg>
      ))}
    </div>
  );
};

export default StarRating;
