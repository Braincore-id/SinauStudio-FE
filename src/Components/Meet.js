import React from "react";
import Navbar from "./Navbar";
import { BiCaretLeft } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

const Meet = () => {

  const navigate = useNavigate()

  return (
    <>
      <div className=" bg-cyan-800">
        <Navbar />
        <div className=" flex justify-end pt-4">
          <div className="dropdown dropdown-left">
            <label tabIndex={0} className="btn m-1">
              <h1 className="">MATKUL</h1>
            </label>
            <ul
              tabIndex={0}
              className="dropdown-content menu p-2 shadow bg-base-100 rounded-box max-w-screen-2xl"
            >
              <li className=" items-center">
                <a>MATEMATIKA</a>
              </li>
              <li className=" items-center">
                <a>FISIKA</a>
              </li>
              <li className=" items-center">
                <a>KIMIA</a>
              </li>
              <li className=" items-center">
                <a>ALGORITMA PEMROGRAMAN</a>
              </li>
              <li className=" items-center">
                <a>PENGETAHUAN KOMPUTER</a>
              </li>
              <li className=" items-center">
                <a>MANAJEMEN KOMPUTER</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="divider divider-horizontal"></div>
        <div className=" justify-center min-h-screen pt-3 flex min-w-full">
          <div className=" flex flex-col min-h-screen min-w-full gap-5">
            <div className=" pt-5 pb-5">
              <h1 className=" text-center ">VIDEO MEET</h1>
            </div>
            <div className="divider py-10 px-10">On Going</div>
            <div className="flex flex-col items-center gap-5">
              <button
                className="btn btn-secondary w-full max-w-xs"
                onClick={() => navigate('/SinauMeet')}
              >
                Matematika Wajib
              </button>
            </div>
            <div className="divider py-10 px-10">Coming Soon</div>
            <div className="flex flex-col items-center gap-5 pb-10">
              <button
                placeholder="Mekanisme Python"
                className="btn btn-secondary w-full max-w-xs"
              >
                Matematika
              </button>
              <button
                placeholder="Gerak Lurus Beraturan"
                className="btn btn-secondary w-full max-w-xs"
              >
                Algoritma Pemrograman
              </button>
              <button
                placeholder="Fungsi Chipset Komputer"
                className="btn btn-secondary w-full max-w-xs"
              >
                Perakitan Komputer
              </button>
            </div>
          </div>
          {/* <div className=" flex flex-col min-h-screen">
            <div className=" pt-5">
              <h1 className=" text-center"> MATKUL</h1>
            </div>
            <div className="divider px-10 py-5"></div>
            <div className="flex flex-col items-center gap-5">
            <input type="text" placeholder="Type here" className="input input-bordered input-primary w-full max-w-xs" />
            <input type="text" placeholder="Type here" className="input input-bordered input-primary w-full max-w-xs" />
            <input type="text" placeholder="Type here" className="input input-bordered input-primary w-full max-w-xs" />
            <input type="text" placeholder="Type here" className="input input-bordered input-primary w-full max-w-xs" />
            <input type="text" placeholder="Type here" className="input input-bordered input-primary w-full max-w-xs" />
            </div>
          </div> */}
        </div>
      </div>
    </>
  );
};

export default Meet;
