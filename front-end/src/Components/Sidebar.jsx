/* eslint-disable react/prop-types */
import { NavLink, Link } from "react-router-dom";
import { RiHomeFill } from "react-icons/ri";
import { IoIosArrowForward } from "react-icons/io";
import logo from "../assets/logowhite.png";
import { categories } from "../Utility/Data";
// import { categories } from "../utils/data";

const isNotActiveStyle =
  "flex items-center px-5 gap-3 text-white hover:text-gray-400 transition-all duration-200 ease-in-out capitalize";
const isActiveStyle =
  "flex items-center text-red px-5 gap-3 font-extrabold border-r-2 border-white  transition-all duration-200 ease-in-out capitalize";

const Sidebar = ({ closeToggle, user }) => {
  const handleCloseSidebar = () => {
    if (closeToggle) closeToggle(false);
  };

  // const categories = [
  //   { name: "Animals" },
  //   { name: "Wallpapers" },
  //   { name: "Photography" },
  //   { name: "Coding" },
  //   { name: "Animals" },
  //   { name: "Animals" },
  // ];

  return (
    <div className="flex flex-col justify-between h-full overflow-y-scroll  hide-scrollbar">
      <div className="flex flex-col">
        <Link
          to="/"
          className="flex px-5 gap-2 my-6 pt-1 w-11/12 items-center"
          onClick={handleCloseSidebar}
        >
          <img src={logo} alt="logo" className="w-4/5" />
        </Link>
        <div className="flex flex-col gap-5">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? isActiveStyle : isNotActiveStyle
            }
            onClick={handleCloseSidebar}
          >
            <RiHomeFill />
            Home
          </NavLink>
          <h3 className="mt-2 px-5 text-white 2xl:text-xl">
            Discover cateogries
          </h3>
          {categories.slice(0, categories.length - 1).map((category) => (
            <NavLink
              to={`/category/${category.name}`}
              className={({ isActive }) =>
                isActive ? isActiveStyle : isNotActiveStyle
              }
              // onClick={handleCloseSidebar}
              key={category.name}
            >
              <img
                src={category.image}
                className="w-8 h-8 rounded-full shadow-sm"
              />
              {category.name}
            </NavLink>
          ))}
        </div>
      </div>
      {user && (
        <Link
          to={`user-profile/${user._id}`}
          className="flex my-5 mb-3 gap-2 p-2 items-center bg-gray-950 rounded-lg shadow-lg mx-3"
          onClick={handleCloseSidebar}
        >
          <img
            src={user.image}
            className="w-10 h-10 rounded-full"
            alt="user-profile"
          />
          <p>{user.userName}</p>
          <IoIosArrowForward />
        </Link>
      )}
    </div>
  );
};

export default Sidebar;
