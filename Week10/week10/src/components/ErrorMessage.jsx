export default function ErrorMessage({ message }) {
  return (
    <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700">
      Error: {message}
    </div>
  );
}