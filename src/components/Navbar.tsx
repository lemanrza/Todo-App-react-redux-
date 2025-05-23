import { NavLink } from "react-router-dom";
import { TodoStatus } from "../types/todo.types";

interface NavbarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  statusFilter: TodoStatus;
  setStatusFilter: (status: TodoStatus) => void;
}

const Navbar = ({ searchQuery, setSearchQuery, statusFilter, setStatusFilter }: NavbarProps) => {
  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-900">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <NavLink to={"/"} className="flex items-center">
          <img
            src="https://static-00.iconduck.com/assets.00/todo-icon-2048x2048-pij2pwiy.png"
            className="h-8 mr-3"
            alt="ToDo Logo"
          />
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            ToDo App
          </span>
        </NavLink>

        <div className="flex items-center gap-2 md:order-2">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as TodoStatus)}
            className="block p-2 text-sm border border-gray-300 rounded-lg bg-gray-50 text-gray-900 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          >
            <option value={TodoStatus.ALL}>All</option>
            <option value={TodoStatus.COMPLETED}>Completed</option>
            <option value={TodoStatus.PENDING}>Pending</option>
          </select>

          <div className="relative hidden md:block">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <input
              type="text"
              id="search-navbar-desktop"
              className="block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Menu Links */}
        <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-search">
          <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900">
            <li>
              <NavLink to="/" className={({ isActive }) => navLinkClass(isActive)}>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/pending" className={({ isActive }) => navLinkClass(isActive)}>
                Pending
              </NavLink>
            </li>
            <li>
              <NavLink to="/completed" className={({ isActive }) => navLinkClass(isActive)}>
                Completed
              </NavLink>
            </li>
            <li>
              <NavLink to="/addtodo" className={({ isActive }) => navLinkClass(isActive)}>
                Add To-Do
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

const navLinkClass = (isActive: boolean) =>
  `block py-2 pl-3 pr-4 rounded md:bg-transparent md:p-0 ${
    isActive
      ? "text-white bg-blue-700 md:text-blue-700 md:dark:text-blue-500"
      : "text-gray-900 hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
  }`;

export default Navbar;
