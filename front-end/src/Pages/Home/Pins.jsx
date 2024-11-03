/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import Navbar from "../../Components/Navbar";
import PinDetails from "../../Components/PinDetails";
import Feed from "../../Components/Feed";
import { useState } from "react";
import CreatePin from "../../Components/CreatePin";
import Search from "../../Components/Search";
import { useNavigate, useParams } from "react-router-dom";
import UserProfile from "../../Components/UserProfile";

const Pins = ({ user }) => {
  const navigate = useNavigate();
  // console.log(user)
  const [searchTerm, setSearchTerm] = useState("");
  const handleRouteChange = (route) => {
    navigate(route);
  };
  const params = useParams();
  return (
    <div>
      <div className="">
        <Navbar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          user={user && user}
        />
      </div>
      {/* main div */}
      <div className="h-full">
        {/* Use conditional rendering based on the route */}
        {window.location.pathname === "/create-pin" && (
          <CreatePin user={user && user} />
        )}
        {window.location.pathname === `/pin-details/${params.pinId}` && (
          <PinDetails user={user && user} />
        )}
        {window.location.pathname === `/user-profile/${params.userId}` && (
          <UserProfile user={user && user} />
        )}
        {window.location.pathname === "/search" && (
          <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        )}
        {/* Default to Feed if no route matches */}
        {!window.location.pathname.startsWith("/create-pin") &&
          !window.location.pathname.startsWith("/pin-details") &&
          !window.location.pathname.startsWith("/search") &&
          !window.location.pathname.startsWith("/user-profile") && <Feed />}
      </div>
    </div>
  );
};

export default Pins;
