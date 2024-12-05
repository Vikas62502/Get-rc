import React, { useState } from "react";
import eyeicon from '../assets/eyeIcon.png'
import close from '../assets/close.png'
const AdminDashboard = () => {
    const [selectedUser, setSelectedUser] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const users = [
        {
            id: 1,
            name: "Amit Kumar Karwasara",
            mobile: "8233452412",
            password: "Amit@123",
            wallet: 2000,
        },
        {
            id: 2,
            name: "Amit Kumar Karwasara",
            mobile: "8233452412",
            password: "Amit@123",
            wallet: 2000,
        },
    ];

    const openModal = (user: any) => {
        setSelectedUser(user);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setSelectedUser(null);
        setIsModalOpen(false);
    };

    return (
        <div className="min-h-[90vh] bg-gradient-to-b from-cyan-200 to-white md:p-20 p-5">
            <div className="  my-5 md:my-0 bg-white rounded-lg shadow-lg overflow-hidden">

                {/* Table */}
                <div className="p-4 overflow-x-auto text-center">
                    <table className="w-full  border-collapse border text-center border-gray-300">
                        <thead>
                            <tr className="bg-gray-100 ">
                                <th className="border border-gray-300 px-4 py-2 ">Sr&nbsp;No</th>
                                <th className="border border-gray-300 px-4 py-2 ">Name</th>
                                <th className="border border-gray-300 px-4 py-2 ">Mobile&nbsp;Number</th>
                                <th className="border border-gray-300 px-4 py-2 ">Password</th>
                                <th className="border border-gray-300 px-4 py-2 ">Wallet</th>
                                <th className="border border-gray-300 px-4 py-2 ">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user, index) => (
                                <tr key={user.id} className="hover:bg-gray-50">
                                    <td className="border border-gray-300 px-4 py-2 whitespace-nowrap">{index + 1}</td>
                                    <td className="border border-gray-300 px-4 py-2 whitespace-nowrap">{user.name}</td>
                                    <td className="border border-gray-300 px-4 py-2 whitespace-nowrap">{user.mobile}</td>
                                    <td className="border border-gray-300 px-4 py-2 whitespace-nowrap">{user.password}</td>
                                    <td className="border border-gray-300 px-4 py-2 whitespace-nowrap">{user.wallet}</td>
                                    <td className="border border-gray-300 px-4 py-2 ">
                                        <button
                                            onClick={() => openModal(user)}
                                            className="text-blue-500 hover:text-blue-700"
                                        >
                                            <img src={eyeicon} alt="Car" className="md:w-8 md:h-8 w-6 h-6" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Modal */}
            {isModalOpen && selectedUser && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white gap-4 rounded-lg shadow-lg p-6 pt-0 w-[40%]">
                        <div className="w-full flex justify-end">
                    <img src={close} alt="close" className="w-5 h-5 my-4 cursor-pointer"  onClick={closeModal} />

                        </div>

                        <div className=" flex">
                            {/* <h3 className="text-lg font-bold mb-4">User Details</h3> */}
                            {selectedUser ? (
                                <div className="w-full text-lg flex flex-col gap-2">
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
                            <div className=" w-full">
                                <input
                                    type="number"
                                    placeholder="Enter amount"
                                    className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                />
                                <div className="flex gap-4 mt-4">
                                    <button className="flex-1 py-2 bg-green-500 text-white rounded hover:bg-green-600">
                                        Credit
                                    </button>
                                    <button className="flex-1 py-2 bg-red-500 text-white rounded hover:bg-red-600">
                                        Debit
                                    </button>

                                </div>
                            </div>
                            {/* <button
                            onClick={closeModal}
                            className="mt-4 w-full py-2 bg-gray-300 rounded hover:bg-gray-400"
                        >
                            Close
                        </button> */}
                        </div>
                    </div>
                    </div>
            )}

                </div>
            );
};

            export default AdminDashboard;
