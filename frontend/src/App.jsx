import React from "react";

function App() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center p-6 bg-white rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-blue-500">
          Hello, Tailwind CSS!
        </h1>
        <p className="mt-4 text-lg text-gray-700">
          This is a simple test of Tailwind CSS in your React app.
        </p>
        <button className="mt-6 px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-700 transition duration-300">
          Click Me
        </button>
      </div>
    </div>
  );
}

export default App;
