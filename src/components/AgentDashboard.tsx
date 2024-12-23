
import { useEffect, useState } from 'react';
import caricon from '../assets/car.png'
import client from '../utils/axiosClient';
import { toast } from 'sonner';

const AgentDashboard = () => {
    const [loading, setLoading] = useState(false);
    const [vehicleNumber, setVehicleNumber] = useState("");
    const [userData, setUserData] = useState<any>();
    console.log(userData, "<-- userdata");

    useEffect(() => {
        const userData = localStorage.getItem("userData");
        console.log(userData, "<-- userdata called");
        if (userData) {
            setUserData(JSON.parse(userData));
        }
    }, []);
    const transactions = [
        { vehicle: "RJ15CA1915", date: "04/12/2024", time: "02:35 PM", amount: "-10:00 Rs" },
        { vehicle: "RJ15CA1916", date: "04/12/2024", time: "02:35 PM", amount: "-10:00 Rs" },
        { vehicle: "Bulk RC", date: "04/12/2024", time: "02:35 PM", amount: "-450:00 Rs" },
        { vehicle: "RJ15CA1918", date: "04/12/2024", time: "02:35 PM", amount: "-00:00 Rs" },
        { vehicle: "RJ15CA1916", date: "04/12/2024", time: "02:35 PM", amount: "-10:00 Rs" },
        { vehicle: "Bulk RC", date: "04/12/2024", time: "02:35 PM", amount: "-460:00 Rs" },
        { vehicle: "RJ15CA1918", date: "04/12/2024", time: "02:35 PM", amount: "-00:00 Rs" },
    ];

    const handleDownloadRc = async () => {
        setLoading(true);
        const toastLoading = toast.loading("Downloading RC...");
        try {
            const res = await client.post("/api/dashboard/get-single-rc", {
                rcId: vehicleNumber
            })
            toast.success("RC Downloaded Successfully!");
        } catch (error) {
            console.log(error);
            toast.error("Failed to download RC. Please try again.");
        } finally {
            toast.dismiss(toastLoading);
            setLoading(false);
        }
    }


    return (

        <div className="  bg-gradient-to-b  min-h-[90vh] from-cyan-200 to-white ">

            {/* User Info and Input Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:px-20 px-5 md:py-10 py-5">
                {/* User Info */}
                <div className="p-5 md:text-xl  md:gap-4 gap-2 flex flex-col border border-gray-500 bg-white rounded-lg shadow">
                    <p><strong >Name</strong>: {userData?.fullname || "NA"}</p>
                    <p><strong>Mob No.</strong>: +91-{userData?.mobile}</p>
                    <p><strong>Wallet Balance</strong>: {userData?.walletBalance} Rs</p>
                </div>

                {/* Get RC Section */}

                <div className="md:p-6 p-2 bg-white border border-gray-500 rounded-lg shadow flex flex-col gap-2 items-center">
                    <div className="flex w-full gap-3">
                        <img src={caricon} alt="Car" className="w-10 h-10 " />
                        <div className=" flex flex-col w-full justify-end gap-5">
                            <input
                                type="text"
                                placeholder="Enter Vehicle Number"
                                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:outline-none uppercase"
                                style={{ textTransform: "uppercase" }} // Inline style for fallback
                                onChange={(e) =>
                                    setVehicleNumber(e.target.value.toUpperCase())}
                            />
                            <button className="md:px-20 md:hidden  px-2 py-2 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600" >
                                Get&nbsp;RC
                            </button>
                        </div>
                        <button className="md:px-20 px-2 hidden md:flex py-2 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600">
                            Get&nbsp;RC
                        </button>
                    </div>


                    <div className="flex md:gap-4 gap-2 mt-3 items-center text-sm justify-end w-full">
                        <h3 className="mg:text-xl text-sm font-bold ">For&nbsp;Bulk&nbsp;RC</h3>

                        <button className="bg-purple-500 text-white py-2 md:px-10 px-3 rounded hover:bg-purple-600">
                            Sample&nbsp;CSV
                        </button>
                        <button className="bg-green-500 text-white py-2 md:px-10 px-3 rounded hover:bg-green-600">
                            Upload&nbsp;CSV
                        </button>

                    </div>
                </div>
            </div>

            {/* Recent Transactions */}
            <div className="md:px-20 px-2 md:pb-10 pb-5">
                <h3 className="text-lg font-bold mb-4">Recent Transactions</h3>
                <div className="border-t border-black">
                    {transactions.map((transaction, index) => (
                        <div key={index} className={`flex md:p-4 p-2 md:gap-5 gap-2 items-center md:text-lg text-sm my-4 border-2 rounded-xl  ${index % 2 === 0 ? "bg-gray-100" : "bg-white"} ${transaction.amount === "-00:00 Rs" ? " border-red-500" : " border-gray-500"}`}>
                            <img src={caricon} alt="Car" className="md:w-8 md:h-8 w-4 h-4" />

                            <div className="flex justify-between  items-center w-full ">
                                <div className="md:w-28  ">{transaction.vehicle}</div>
                                <div className="md:w-24  ">{transaction.date}</div>
                                <div className="md:w-24 ">{transaction.time}</div>
                                <div className="md:w-24 ">{transaction.amount}</div>
                            </div>

                        </div>
                    ))}
                </div>
            </div>
        </div>

    );
};

export default AgentDashboard;
