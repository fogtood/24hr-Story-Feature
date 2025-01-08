const Story = ({
  imgURL,
  onClick,
}: {
  imgURL: string;
  onClick: () => void;
}) => {
  return (
    <div className="inline-block">
      <button
        className="h-16 w-16 cursor-pointer overflow-hidden rounded-full border-2 border-gray-400 transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
        onClick={onClick}
      >
        <div className="h-full w-full p-0.5">
          <img
            src={imgURL}
            className="h-full w-full rounded-full object-cover"
          />
        </div>
      </button>
      <p className="truncate text-center text-xs">1 hour ago</p>
    </div>
  );
};

export default Story;
