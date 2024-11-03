import { useEffect, useRef, useState } from "react";
import Sidebar from "../../Components/Sidebar";
import Pins from "./Pins";
import { client } from "../../Client";
import logo from "../../assets/logowhite.png";
import { HiMenu } from "react-icons/hi";
import { userQuery } from "../../Utility/Data";
import { AiFillCloseCircle } from "react-icons/ai";
import { Link } from "react-router-dom";

const Home = () => {
  const [toggleSidebar, setToggleSidebar] = useState(false);
  const [user, setUser] = useState(null);
  const scrollRef = useRef(null);

  const userInfo =
    localStorage.getItem("user") !== "undefined"
      ? JSON.parse(localStorage.getItem("user"))
      : localStorage.clear();

  useEffect(() => {
    const query = userQuery(userInfo?._id);
    client.fetch(query).then((data) => {
      setUser(data[0]);
    });
  }, [userInfo?._id]);

  useEffect(() => {
    scrollRef.current.scrollTo(0, 0);
  }, []);

  return (
    <div className="flex md:flex-row flex-col h-screen">
      <div className="hidden bg-black  opacity-80 md:flex h-screen flex-initial">
        <Sidebar user={user && user} />
      </div>
      <div className="flex md:hidden flex-row bg-black opacity-90">
        <div className="p-2 w-full flex flex-row justify-between items-center shadow-md">
          <HiMenu
            fontSize={40}
            className="cursor-pointer"
            onClick={() => setToggleSidebar(!toggleSidebar)}
          />
          <Link to="/">
            <img src={logo} alt="logo" className="w-28" />
          </Link>
          <Link to={`user-profile/${user?._id}`}>
            <img
              src={user?.image}
              alt="user-pic"
              className="w-9 h-9 rounded-full"
            />
          </Link>
        </div>
        <div
          className={`fixed top-0 right-0 w-4/5 bottom-0 left-0 bg-gray-800 opacity-80 z-10  transform ${
            toggleSidebar ? "translate-x-0" : "-translate-x-full"
          } transition-transform ease-in-out duration-300`}
        >
          <div className="flex justify-end items-center p-2">
            <AiFillCloseCircle
              fontSize={30}
              className="cursor-pointer text-white"
              onClick={() => setToggleSidebar(false)}
            />
          </div>
          <div className="w-full h-screen overflow-y-auto shadow-md z-20">
            <Sidebar
              closeToggle={() => setToggleSidebar(false)}
              user={user && user}
            />
          </div>
        </div>
      </div>
      <div className="pb-2 flex-1 h-screen overflow-y-auto " ref={scrollRef}>
        <Pins user={user && user}></Pins>
        {/* <UserProfile></UserProfile> */}
      </div>
    </div>
  );
};

export default Home;
