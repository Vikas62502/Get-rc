// UserDetailsModal.js
import close from "../assets/close.png";

const UserDetailsModal = ({ selectedUser, closeModal }:any) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white gap-4 rounded-lg shadow-lg p-6 pt-0 lg:w-[40%] w-[90%]">
        <div className="w-full flex justify-end">
          <img
            src={close}
            alt="close"
            className="w-5 h-5 my-4 cursor-pointer"
            onClick={closeModal}
          />
        </div>

        <div className="lg:flex">
          {selectedUser ? (
            <div className="w-full mb-6 lg:mb-0 text-lg flex flex-col gap-2">
              <p>
                <strong>Name</strong>: {selectedUser.name}
              </p>
              <p>
                <strong>Mob No.</strong>: +91-{selectedUser.mobile}
              </p>
              <p>
                <strong>Wallet Balance</strong>: {selectedUser.wallet} Rs
              </p>
            </div>
          ) : (
            <p>Loading user details...</p>
          )}
          <div className="w-full">
            <input
              type="number"
              placeholder="Enter amount"
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            <div className="flex gap-4 mt-4">
              <button className="flex-1 py-2 font-semibold text-lg bg-green-500 text-white rounded hover:bg-green-600">
                Credit
              </button>
              <button className="flex-1 py-2 font-semibold text-lg bg-red-500 text-white rounded hover:bg-red-600">
                Debit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetailsModal;