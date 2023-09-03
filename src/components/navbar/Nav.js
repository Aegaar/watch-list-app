import React, { useState } from "react";
import {Link} from 'react-router-dom'

const Nav = () => {
  let Links = [
    { name: "Watch list movies", link: "/watch-list-movies" },
    { name: "Watched movies", link: "/watched-movies" },
  ];
  let [open, setOpen] = useState(false);

  const toggleMenu = () => {
    setOpen(!open);
  };

  return (
    <div className=" shadow-md w-full fixed top-0 left-0">
      <div className="md:flex items-center justify-between bg-white py-4 md:px-10 px-7 h-20">
        <Link to="/watch-list-movies">
        <div className=" font-bold text-2xl cursor-pointer flex items-center font-[Poppins] text-gray-800">
          <span className="text-3xl text-indigo-600 mr-1 pt-2 mr-3">
            <ion-icon name="videocam-outline"></ion-icon>
          </span>
          WatchGuard
        </div>
        </Link>

        <div
          onClick={toggleMenu}
          className="text-3xl absolute right-8 top-6 cursor-pointer md:hidden"
        >
          <ion-icon name={open ? "close" : "menu"}></ion-icon>
        </div>

        <ul
          className={`md:flex md:items-center md:pb-0 pb-12 absolute md:static bg-white md:z-auto z-[-1] left-0 w-full md:w-auto md:pl-0 pl-9 transition-all duration-500 ease-in ${
            open ? "top-20" : "top-[-490px]"
          }`}
        >
          {Links.map((link) => (
            <li key={link.name} className="md:ml-8 text-xl md:my-0 my-7">
             <Link to={link.link} className="text-gray-800 hover:text-gray-400 duration-500">
                {link.name}
              </Link>
            </li>
          ))}
          <Link to="/add-movies">
          <button
            className="bg-indigo-600 text-white font-[Poppins] py-2 px-6 rounded md:ml-8 hover:bg-indigo-400 
    duration-500"
          >
            Add movies
          </button>
          </Link>
        </ul>
      </div>
    </div>
  );
};

export {Nav};
