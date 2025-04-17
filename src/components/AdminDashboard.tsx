import { useEffect, useState } from "react";
import UserDetailsModal from "../components/UserDetailModal";
import CreateRCModal from "./CreateRCModal";
import eyeicon from "../assets/eyeIcon.png";
import client from "../utils/axiosClient";

interface User {
  id: number;
  fullname: string;
  mobile: string;
  email?: string;
  password?: string;
  walletBalance: number;
}

const AdminDashboard = () => {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await client.post("/api/admin/get-all-users");
      setUsers(response?.data?.users);
    } catch (err) {
      console.error("Error fetching users:", err);
      setError("Failed to fetch users. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!isModalOpen) {
      fetchUsers();
    }
  }, [isModalOpen]);

  const openModal = (user: User) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedUser(null);
    setIsModalOpen(false);
  };

  // const openCreateModal = () => {
  //   setIsCreateModalOpen(true);
  // };

  const closeCreateModal = () => {
    setIsCreateModalOpen(false);
  };

  return (
    <div className="min-h-[90vh] bg-gradient-to-b from-cyan-200 to-white md:p-20 p-5">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="p-4 overflow-x-auto text-center">
          {/* 🆕 Top Section with Buttons */}
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">User List</h2>
            <div className="flex gap-4">
              <button
                onClick={fetchUsers}
                className="py-2 px-4 bg-green-500 text-white rounded-lg hover:bg-green-600"
              >
                🔄 Refresh
              </button>
              {/*
              <button
                onClick={openCreateModal}
                className="py-2 px-6 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              >
                ➕ Create RC
              </button>
              */}
            </div>
          </div>

          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <div>
              <p className="text-red-500">{error}</p>
              <button
                onClick={fetchUsers}
                className="mt-2 py-2 px-4 bg-red-500 text-white rounded-lg hover:bg-red-600"
              >
                Retry
              </button>
            </div>
          ) : (
            <table className="w-full border-collapse border text-center border-gray-300">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-300 px-4 py-2">Sr&nbsp;No</th>
                  <th className="border border-gray-300 px-4 py-2">Name</th>
                  <th className="border border-gray-300 px-4 py-2">Mobile&nbsp;Number</th>
                  <th className="border border-gray-300 px-4 py-2">Email</th>
                  <th className="border border-gray-300 px-4 py-2">Wallet</th>
                  <th className="border border-gray-300 px-4 py-2">Action</th>
                </tr>
              </thead>
              <tbody>
                {users?.map((user, index) => (
                  <tr key={user.id} className="hover:bg-gray-50">
                    <td className="border border-gray-300 px-4 py-2 whitespace-nowrap">
                      {index + 1}
                    </td>
                    <td className="border border-gray-300 px-4 py-2 whitespace-nowrap">
                      {user?.fullname}
                    </td>
                    <td className="border border-gray-300 px-4 py-2 whitespace-nowrap">
                      {user?.mobile}
                    </td>
                    <td className="border border-gray-300 px-4 py-2 whitespace-nowrap">
                      {user?.email || "N/A"}
                    </td>
                    <td className="border border-gray-300 px-4 py-2 whitespace-nowrap">
                      {user?.walletBalance}
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
          )}
        </div>
      </div>

      {isModalOpen && (
        <UserDetailsModal selectedUser={selectedUser} closeModal={closeModal} />
      )}
      {isCreateModalOpen && <CreateRCModal closeCreateModal={closeCreateModal} />}
    </div>
  );
};

export default AdminDashboard;
