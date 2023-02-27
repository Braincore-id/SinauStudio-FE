import React from "react";

const CreateMeet = () => {
  return (
    <>
      <div className="card w-[500px] h-[600px] bg-base-100 shadow-xl my-3">
        <div className="flex card-body items-center py-28">
          <div className=" mb-8">
            <h1 className=" text-2xl">Sinau Meeting</h1>
          </div>
          <div className="form-control w-full max-w-xs">
            <form>
              <input
                type="text"
                placeholder="Masukkan Nama Sesuai Absen"
                className="input input-bordered w-full max-w-xs"
              />
              <input
                type="text"
                placeholder="Masukkan NPM"
                className="input input-bordered w-full max-w-xs my-5"
              />
              <input
                type="text"
                placeholder="Masukkan Kode Meet"
                className="input input-bordered w-full max-w-xs"
              />
              <button
               className="btn btn-primary mt-12 w-full">
                Submit
               </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateMeet;
