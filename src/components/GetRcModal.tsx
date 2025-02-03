import React, { useState } from 'react';
import { toast } from 'sonner';
import client from '../utils/axiosClient';

interface propInterface {
    setIsModalOpen: any;
    vehicleNumber: string;
    setSuccess: any;
}

const GetRcModal: React.FC<propInterface> = ({ setIsModalOpen, vehicleNumber, setSuccess }) => {
    const [loading, setLoading] = useState(false);

    const handleDownloadRc = async (rcType: string) => {
        setSuccess(false);
        setLoading(true);
        const toastLoading = toast.loading('Downloading RC...');
        try {
            const res = await client.post(
                rcType === 'digital' ? '/api/dashboard/get-digital-rc' : '/api/dashboard/get-single-rc',
                { rcId: vehicleNumber },
                { responseType: 'blob' }
            );

            const url = window.URL.createObjectURL(new Blob([res.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `${vehicleNumber}${'_RC.png'}`);
            document.body.appendChild(link);
            link.click();
            link.remove();
            window.URL.revokeObjectURL(url);

            setSuccess(true);
            setIsModalOpen(false);
            toast.success('RC Downloaded Successfully!');
        } catch (error: any) {
            try {
                if (error.response?.data instanceof Blob) {
                    const blob = error.response.data;
                    const text = await blob.text();
                    const errorData = JSON.parse(text);
                    toast.error(`Failed to download RC: ${errorData.message}`);
                } else {
                    const errorMessage = error.response?.data?.message || 'An unexpected error occurred.';
                    toast.error(`Failed to download RC: ${errorMessage}`);
                }
            } catch (parsingError: any) {
                toast.error('Failed to download RC. Please try again.');
            }
        } finally {
            toast.dismiss(toastLoading);
            setLoading(false);
            setSuccess(false);
        }
    };

    const handleCloseModal = (e: React.MouseEvent) => {
        // Close modal if clicking on the overlay
        if (e.target === e.currentTarget) {
            setIsModalOpen(false);
        }
    };

    return (
        <div className="relative">
            {/* Red Background */}
            <div className="absolute inset-0 bg-red-500 z-0" />

            {/* Dark Overlay */}
            <div
                className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-20"
                onClick={handleCloseModal}
            >
                {/* Modal Content */}
                <div
                    className="bg-white p-6 rounded-lg shadow-lg w-1/3 z-30"
                    onClick={(e) => e.stopPropagation()} // Prevent closing the modal when clicking inside it
                >
                    <h2 className="text-lg font-bold mb-4">Download RC of : {vehicleNumber}</h2>
                    <div className="flex gap-4">
                        <button
                            onClick={() => handleDownloadRc('basic')}
                            className="bg-green-500 text-white py-2 md:px-10 px-3 font-semibold rounded hover:bg-green-600 cursor-pointer"
                        >
                            {loading ? 'Please Wait ...' : 'Download Basic RC Rs + 10'}
                        </button>
                        <button
                            onClick={() => handleDownloadRc('digital')}
                            className="bg-purple-500 text-white py-2 md:px-10 px-3 rounded font-semibold hover:bg-purple-600"
                        >
                            {loading ? 'Please Wait ...' : 'Download Digital RC Rs + 25'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GetRcModal;
