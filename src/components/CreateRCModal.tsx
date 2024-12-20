// CreateRCModal.js
import close from "../assets/close.png";

const CreateRCModal = ({ closeCreateModal }: any) => {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white gap-4 rounded-lg shadow-lg p-6 pt-0 lg:w-[40%] w-[90%] ">
                <div className="w-full flex justify-end">
                    <img
                        src={close}
                        alt="close"
                        className="w-5 h-5 my-4 cursor-pointer"
                        onClick={closeCreateModal}
                    />
                </div>


                <div className="grid grid-cols-2 gap-4">
                    <input
                        type="text"
                        placeholder="Enter Registration Number"
                        className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                    <input
                        type="text"
                        placeholder="Enter Owner Name"
                        className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                    <input
                        type="text"
                        placeholder="Enter Father Name"
                        className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                    <input
                        type="text"
                        placeholder="Enter Ownership Type"
                        className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                    <input
                        type="password"
                        placeholder="Enter Chasis Number"
                        className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                    <input
                        type="number"
                        placeholder="Enter Engine Number"
                        className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                    <input
                        type="text"
                        placeholder="Enter Maker Name"
                        className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                    <input
                        type="text"
                        placeholder="Enter Model Name"
                        className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                    <input
                        type="text"
                        placeholder="Enter Registration Date"
                        className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                    <input
                        type="text"
                        placeholder="Enter Tax Valid Untill"
                        className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    /><input
                        type="text"
                        placeholder="Enter Vehicle Class"
                        className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    /><input
                        type="text"
                        placeholder="Enter Fuel Type"
                        className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                    <input
                        type="text"
                        placeholder="Enter emmission norms"
                        className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                    <input
                        type="text"
                        placeholder="Enter Color"
                        className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                    <input
                        type="text"
                        placeholder="Enter Seat Capacity"
                        className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                    <input
                        type="text"
                        placeholder="Enter Financer"
                        className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                    <input
                        type="text"
                        placeholder="Enter Insurance Company"
                        className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                    <input
                        type="text"
                        placeholder="Enter Insurance Policy Number"
                        className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                    <input
                        type="text"
                        placeholder="Enter Insurance Valid Upto"
                        className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                    <input
                        type="text"
                        placeholder="Enter Fitness Valid Until"
                        className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                    <input
                        type="text"
                        placeholder="Enter Pucc Valid Upto"
                        className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                    <input
                        type="text"
                        placeholder="Enter Registring Authority"
                        className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                </div>

                <div className="flex gap-4 mt-6">
                    <button
                        onClick={closeCreateModal}
                        className="flex-1 py-2 bg-gray-500 font-semibold text-lg text-white rounded hover:bg-gray-600"
                    >
                        Close
                    </button>
                    <button className="flex-1 py-2 bg-blue-500 font-semibold text-lg text-white rounded hover:bg-blue-600">
                        Create
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CreateRCModal;