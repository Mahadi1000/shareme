/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useContext, useEffect, useState } from "react";
import MasonayLayout from "./MasonayLayout";
import { useNavigate, useParams } from "react-router-dom";
import {
  userCreatedPinsQuery,
  userQuery,
  userSavedPinsQuery,
} from "../Utility/Data";
import { client } from "../Client";
import { AiOutlineLogout } from "react-icons/ai";
import { AuthContext } from "../Firebase/AuthProvider";

const UserProfile = ({ user }) => {
  const { LogOut } = useContext(AuthContext);
  const [users, setUser] = useState();
  const [pins, setPins] = useState();
  const [text, setText] = useState("Created");
  const [activeBtn, setActiveBtn] = useState("created");
  const navigate = useNavigate();
  const { userId } = useParams();

  const isNotActiveStyle =
    "flex-row items-center px-5 gap-3 text-white hover:text-gray-400 transition-all duration-200 ease-in-out capitalize";
  const isActiveStyle =
    "flex-row items-center text-red px-5 gap-3 font-extrabold border-r-2 border-white  transition-all duration-200 ease-in-out capitalize";

  useEffect(() => {
    const query = userQuery(userId);
    client.fetch(query).then((data) => {
      setUser(data[0]);
      console.log(data);
    });
  }, [userId]);
  useEffect(() => {
    if (text === "Created") {
      const createdPinsQuery = userCreatedPinsQuery(userId);

      client.fetch(createdPinsQuery).then((data) => {
        setPins(data);
      });
    } else {
      const savedPinsQuery = userSavedPinsQuery(userId);

      client.fetch(savedPinsQuery).then((data) => {
        setPins(data);
      });
    }
  }, [text, userId]);

  const handleSignOut = () => {
    console.log("Logging out...");
    LogOut()
      .then(() => {
        console.log("Logout successful");
      })
      .catch((error) => {
        console.error("Logout error:", error);
      });
    navigate("/login", { replace: true });
  };
  return (
    <div className="relative pb-2 justify-center items-center">
      <div className="flex flex-col pb-5">
        <div className="relative flex flex-col mb-7">
          <div className="flex flex-col justify-center items-center">
            <img
              className=" w-4/5 h-1/2 lg:h-[430px] shadow-lg object-cover"
              src="https://source.unsplash.com/1600x900/?nature,photography,technology"
              alt="user-pic"
            />
            <img
              className="rounded-full w-14 lg:w-28 h-14 lg:h-28 lg:-mt-14 -mt-9 shadow-xl object-cover"
              src={users?.image}
              alt="user-pic"
            />
          </div>
          <h1 className="font-bold text-3xl text-center mt-3">
            {users?.userName}
          </h1>
          <div className="absolute top-0 z-1 right-0 p-2">
            <button
              onClick={handleSignOut}
              type="button"
              className=" bg-white text-black flex items-center justify-center font-bold px-2 py-3 rounded-full cursor-pointer opacity-90 hover:opacity-100  outline-none shadow-md"
            >
              Logout
              <AiOutlineLogout
                color="red "
                className="ml-2 lg:text-2xl text-xl"
                fontSize={21}
              />
            </button>
          </div>
        </div>
        <div className="text-center mb-7">
          <button
            type="button"
            onClick={(e) => {
              setText(e.target.textContent);
              setActiveBtn("created");
            }}
            className={`${
              activeBtn === "created" ? isActiveStyle : isNotActiveStyle
            }`}
          >
            Created
          </button>
          <button
            type="button"
            onClick={(e) => {
              setText(e.target.textContent);
              setActiveBtn("saved");
            }}
            className={`${
              activeBtn === "saved" ? isActiveStyle : isNotActiveStyle
            }`}
          >
            Saved
          </button>
        </div>

        <div className="px-2">
          <MasonayLayout pins={pins} />
        </div>

        {pins?.length === 0 && (
          <div className="flex justify-center font-bold items-center w-full text-1xl mt-2">
            No Pins Found!
          </div>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
