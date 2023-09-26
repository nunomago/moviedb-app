export default function Spinner() {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex flex-auto justify-center items-center">
      <svg
        className="animate-spin h-24 w-24 text-light-secondary dark:text-slate-50"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        />
        <path
          className="opacity-75"
          fill="currentColor"
          d={`M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042
            1.135 5.824 3 7.938l3-2.647z`}
        />
      </svg>
    </div>
  );
}