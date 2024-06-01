"use client";

import LoadGame from "./loadGame";

const AdminPage = () => {
  return (
    <div className="max-w-5xl w-full mx-auto py-5 px-4">
      <h1 className="text-2xl font-bold mb-4">Admin</h1>
      <LoadGame />
    </div>
  );
};

export default AdminPage;
