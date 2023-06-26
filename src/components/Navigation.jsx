import { Link } from "react-router-dom";

const Navigation = () => {
  return (
    <div className="flex justify-between py-3">
      <Link to="/tasks">
        <h1 className="font-bold text-3xl mb-4 rounded-lg py-2">Task App</h1>
      </Link>
      <div className="flex items-center bg-indigo-500 px-3 py-2 rounded-lg">
        <Link to="/tasks-create">Create task</Link>
      </div>
    </div>
  );
};

export default Navigation;
