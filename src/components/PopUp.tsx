import React from 'react'

interface PopUpProps {
    children: React.ReactNode;
    visible: boolean;
    onClose: () => void;
    title?: string;
}

const PopUp: React.FC<PopUpProps> = ({ children, visible, onClose, title }) => {
    if (!visible) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-stone-900/90 z-50 backdrop-blur-xs">
            <div className="bg-stone-400 border border-dashed rounded-xl p-6 max-w-lg w-full shadow-lg relative">
                {title && <h2 className="text-xl font-bold mb-4 text-black">{title}</h2>}
                <button
                    className="absolute top-0 right-0 text-gray-500 hover:text-red-500"
                    onClick={onClose}
                >
                    ✖
                </button>
                {children}
            </div>
        </div>
    );
}

export default PopUp