import { useState } from "react";
import close from "../assets/close.png";
import client from "../utils/axiosClient";
import { toast } from "sonner";

const CreateRCModal = ({ closeCreateModal }: any) => {
    const [loading, setLoading] = useState(false);

    // State to store all the input field values
    const [formData, setFormData] = useState<any>({
        registrationNumber: "UP0982312",
        ownerName: "Vineet ",
        fatherName: "Sabhjaeet Yadav",
        ownershipType: "INDIVIDUAL",
        chasisNumber: "12313212313",
        engineNumber: "Engine number",
        makerName: "Hynudia",
        modelName: "Creta",
        registrationDate: "10-Oct-2022",
        taxValidUntil: "10-Oct-2032",
        vehicleClass: "MOTOR CAR(LMV)",
        fuelType: "ELECTRIC",
        emissionNorms: "ZERO-EMISSION",
        color: "MIDNIGHT SILVER",
        seatCapacity: "5",
        financer: "Tesla Financial Services",
        insuranceCompany: "ALLIANZ INSURANCE",
        insurancePolicyNumber: "123456789012345",
        insuranceValidUpto: "10-Oct-2025",
        fitnessValidUntil: "10-Oct-2030",
        puccValidUpto: "Not Applicable",
        registeringAuthority: "LOS ANGELES DMV",
    });


    // Handle form field changes
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevData: any) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleDownloadRc = async () => {
        const toastLoading = toast.loading("Downloading RC...");
        setLoading(true);

        try {
            // Send the request with form data
            const res = await client.post("/api/dashboard/get-rc-by-data", formData, {
                responseType: 'blob'  // Important: make sure we are expecting a Blob (file)
            });

            // Create a link to download the file
            const url = window.URL.createObjectURL(new Blob([res.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `${formData.registrationNumber}_RC.png`); // Name of the file
            document.body.appendChild(link);
            link.click();  // Simulate a click to start the download
            link.remove(); // Clean up the link element
            closeCreateModal(); // Close the modal

            // Handle success
            toast.success("Downloaded RC successfully!");
        } catch (error: any) {
            // Handle error
            toast.error(error?.response?.data?.message || "Failed to download RC. Please try again.");
            console.log(error);
        } finally {
            setLoading(false);
            toast.dismiss(toastLoading);
        }
    };


    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white gap-4 rounded-lg shadow-lg p-6 pt-0 lg:w-[60%] w-[90%] ">
                <div className="w-full flex justify-end">
                    <img
                        src={close}
                        alt="close"
                        className="w-5 h-5 my-4 cursor-pointer"
                        onClick={closeCreateModal}
                    />
                </div>

                <div className="grid grid-cols-3 gap-4">
                    {Object.keys(formData).map((key) => (
                        <input
                            key={key}
                            type="text"
                            name={key}
                            value={formData[key as keyof typeof formData]}
                            onChange={handleChange}
                            placeholder={`Enter ${key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}`}
                            className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        />
                    ))}
                </div>

                <div className="flex gap-4 mt-6">
                    <button
                        onClick={closeCreateModal}
                        className="flex-1 py-2 bg-gray-500 font-semibold text-lg text-white rounded hover:bg-gray-600"
                    >
                        Close
                    </button>
                    <button className="flex-1 py-2 bg-blue-500 font-semibold text-lg text-white rounded hover:bg-blue-600" onClick={handleDownloadRc}>
                        {loading ? "Downloading..." : "Download RC"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CreateRCModal;
