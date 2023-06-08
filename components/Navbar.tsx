import Image from "next/image";
import { BiSearch, BiDownArrow } from "react-icons/bi";
import { TfiWorld } from "react-icons/tfi";
import { BsFullscreen, BsEnvelope } from "react-icons/bs";
import { IoMdNotificationsOutline } from "react-icons/io";
import { IoSettingsOutline } from "react-icons/io5";
import Link from "next/link";
const Navbar = () => {
  return (
    <>
      <div className="border-b-[1px] black bg-white flex justify-between w-full">
        <div className="w-1/5 border-r-[1px] black justify-center flex items-center">
          <Image src="/Images/logo.png" alt="Logo" width={200} height={200} />
        </div>
        <div className="w-2/5 flex items-center">
          <div
            className="mx-4 h-8 w-2/5 rounded-full flex items-center"
            style={{ backgroundColor: "#F6F6F7" }}
          >
            <BiSearch className="h-6 w-6 ml-2 text-gray-500" />
            <input
              className="w-full h-full bg-transparent outline-none pl-2 pr-8 "
              type="text"
              placeholder="Search"
            />
          </div>
        </div>
        <div className="w-2/5 flex justify-between">
          <div className="w-2/3 flex items-center justify-center space-x-4">
            <div className="relative">
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: "#F6F6F7" }}
              >
                <TfiWorld
                  name="icon1"
                  className="h-4 w-4 text-gray-500 hover:font-bold hover:text-blue-500"
                />
              </div>
            </div>

            <div className="relative">
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: "#F6F6F7" }}
              >
                <BsFullscreen
                  name="icon1"
                  className="h-4 w-4 text-gray-500 hover:font-bold hover:text-blue-500"
                />
              </div>
            </div>

            <div className="relative">
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: "#F6F6F7" }}
              >
                <BsEnvelope
                  name="icon1"
                  className="h-4 w-4 text-gray-500 hover:font-bold hover:text-blue-500"
                />
                <span
                  className="absolute top-0 right-0 bg-blue-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-sm"
                  style={{ transform: "translate(25%, -25%)" }}
                >
                  3
                </span>
              </div>
            </div>

            <div className="relative">
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: "#F6F6F7" }}
              >
                <IoMdNotificationsOutline
                  name="icon1"
                  className="h-4 w-4 text-gray-500 hover:font-bold hover:text-blue-500"
                />
                <span
                  className="absolute top-0 right-0 bg-blue-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-sm"
                  style={{ transform: "translate(25%, -25%)" }}
                >
                  3
                </span>
              </div>
            </div>

            <div className="relative">
              <Link href="/dashboard">
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: "#F6F6F7" }}
                >
                  <IoSettingsOutline
                    name="icon1"
                    className="h-4 w-4 text-gray-500 hover:font-bold hover:text-blue-500"
                  />
                </div>
              </Link>
            </div>
          </div>
          <div className="w-2/3 flex items-center justify-center">
            <Image
              src="/Images/profile.png"
              alt="Profil"
              className=" w-12 h-12"
              width={4}
              height={4}
            />
            <div className="m-2">
              <div className="flex items-center">
                <h2 className="text-sm font-bold mr-1">Nom du profil</h2>
                <span className="px-1">
                  <BiDownArrow className="h-4 w-4" />
                </span>
              </div>

              <p>Super admin</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
