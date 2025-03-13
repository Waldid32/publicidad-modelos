export default function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center h-full">
      <div className="flex space-x-2">
        <div className="w-3 h-3 bg-primary rounded-full animate-bounce"></div>
        <div className="w-3 h-3 bg-secondary rounded-full animate-bounce delay-100"></div>
        <div className="w-3 h-3 bg-primary rounded-full animate-bounce delay-200"></div>
      </div>
    </div>
  );
}
