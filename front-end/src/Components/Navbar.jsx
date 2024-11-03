/* eslint-disable react/prop-types */
import { IoMdAdd, IoMdSearch } from "react-icons/io";
import { NavLink, useNavigate } from "react-router-dom";

const Navbar = ({ searchTerm, setSearchTerm, user }) => {
  const navigate = useNavigate();

  if (user) {
    return (
      <nav>
        <div className="flex gap-2 md:gap-5 w-full mt-5 pb-7 pl-2 ">
          <div className="flex justify-start items-center w-full px-2 rounded-md bg-gray-300 text-black border-none outline-none focus-within:shadow-sm">
            <IoMdSearch fontSize={21} className="ml-1" />
            <input
              type="text"
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search"
              value={searchTerm}
              onFocus={() => navigate("/search")}
              className="p-2 w-full bg-gray-300  outline-none"
            />
          </div>
          <div className="flex gap-3 ">
            <NavLink
              to={`user-profile/${user?._id}`}
              className="hidden md:block"
            >
              <img
                src={user.image}
                alt="user-pic"
                className="w-14 h-12 rounded-2xl "
              />
            </NavLink>
            <NavLink
              to="/create-pin"
              className="bg-black text-white rounded-lg w-12 h-12 md:w-14 md:h-12 flex justify-center items-center"
            >
              <IoMdAdd />
            </NavLink>
          </div>
        </div>
      </nav>
    );
  }

  return null;
};

export default Navbar;
