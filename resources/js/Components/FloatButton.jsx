import React from 'react';

const FloatButton = ({ onClick, icone }) => {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-4 right-4 bg-[#06B6D4] text-white rounded-full p-3 shadow-lg hover:bg-[#EC4899] transition duration-200"
    >
    {icone}
    </button>
  );
};
export default FloatButton;