const ProgressBar = ({
  isActive,
  duration,
  isCompleted,
}: {
  isActive: boolean;
  duration: number;
  isCompleted: boolean;
}) => {
  return (
    <div className="h-0.5 w-full overflow-hidden rounded bg-[#374151]">
      <div
        className={`h-full ${
          isCompleted ? "bg-white" : "bg-gradient-to-r from-white to-white"
        }`}
        style={{
          width: isCompleted ? "100%" : isActive ? "100%" : "0%",
          transition:
            isCompleted || !isActive ? "none" : `width ${duration}ms linear`,
        }}
      />
    </div>
  );
};

export default ProgressBar;
