// AdminDashboard.js
import { useEffect, useState } from "react";
import UserDetailsModal from "../components/UserDetailModal";
import CreateRCModal from "../components/CreatercModal";
import eyeicon from "../assets/eyeIcon.png";

interface User {
  id: number;
  name: string;
  mobile: string;
  password: string;
  wallet: number;
}

const AdminDashboard = () => {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [userData, setUserData] = useState();
  console.log(userData, "<-- userdata");

  useEffect(() => {
    const userData = localStorage.getItem("userData");
    console.log(userData, "<-- userdata called");
    if (userData) {
      setUserData(JSON.parse(userData));
    }
  }, []);

  const users: User[] = [
    {
      id: 1,
      name: "Amit Kumar Karwasara",
      mobile: "8233452412",
      password: "Amit@123",
      wallet: 2000,
    },
    {
      id: 2,
      name: "Rahul Verma",
      mobile: "9233452413",
      password: "Rahul@123",
      wallet: 3000,
    },
  ];

  const openModal = (user: User) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedUser(null);
    setIsModalOpen(false);
  };

  const openCreateModal = () => {
    setIsCreateModalOpen(true);
  };

  const closeCreateModal = () => {
    setIsCreateModalOpen(false);
  };

  return (
    <div className="min-h-[90vh] bg-gradient-to-b from-cyan-200 to-white md:p-20 p-5">


      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Table */}
        <div className="p-4 overflow-x-auto text-center">
          <table className="w-full border-collapse border text-center border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 px-4 py-2">Sr&nbsp;No</th>
                <th className="border border-gray-300 px-4 py-2">Name</th>
                <th className="border border-gray-300 px-4 py-2">
                  Mobile&nbsp;Number
                </th>
                <th className="border border-gray-300 px-4 py-2">Password</th>
                <th className="border border-gray-300 px-4 py-2">Wallet</th>
                <th className="border border-gray-300 px-4 py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="border border-gray-300 px-4 py-2 whitespace-nowrap">
                    {index + 1}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 whitespace-nowrap">
                    {user.name}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 whitespace-nowrap">
                    {user.mobile}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 whitespace-nowrap">
                    {user.password}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 whitespace-nowrap">
                    {user.wallet}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    <button
                      onClick={() => openModal(user)}
                      className="text-blue-500 hover:text-blue-700"
                    >
                      <img
                        src={eyeicon}
                        alt="View"
                        className="md:w-8 md:h-8 w-6 h-6"
                      />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="flex justify-end mt-4">
        <button
          onClick={openCreateModal}
          className="py-2 px-6 bg-blue-500 text-lg font-bold text-white rounded-lg hover:bg-blue-600"
        >
          Create RC
        </button>
      </div>
      {isModalOpen && (
        <UserDetailsModal
          selectedUser={selectedUser}
          closeModal={closeModal}
        />
      )}

      {isCreateModalOpen && <CreateRCModal closeCreateModal={closeCreateModal} />}
    </div>
  );
};

export default AdminDashboard;
