import { useAuth } from "../../hooks/useAuth";

export default function PageHeader({ title }) {
  const { user } = useAuth();

  return (
    <div className="mb-6">
      <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">{title}</h1>
      <p className="mt-1 text-sm text-gray-500">
        Department:{" "}
        <span className="font-semibold text-campus-primary">
          {user?.departmentShort || "CSE"}
        </span>
        <span className="mx-3">Semester:</span>
        <span className="font-semibold text-campus-primary">
          {user?.semester || "6"}
        </span>
      </p>
    </div>
  );
}
