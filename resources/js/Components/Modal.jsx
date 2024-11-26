import { X } from "@phosphor-icons/react";

export default function Modal({ isOpen, onClose, children }) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50" >
            <div className="bg-white p-6 rounded-lg w-96 shadow-lg min-h-fit max-h-[90vh] overflow-auto" >
                <div className="relative">
                    <X size={32} className="absolute top-[-32px] right-[-20px] cursor-pointer" onClick={onClose} />
                    <div className="mt-4">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
}