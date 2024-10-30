import React from 'react'

const Rightbar = () => {
  const users = [
    { username: 'Test1'},
    { username: 'Test2'},
    { username: 'Test3'},
    { username: 'Test4'},
    { username: 'Test5'},
  ];

  return (
    <div className="max-w-md mx-auto p-4">
      <h2 className="text-lg font-bold mb-4">Followers</h2>
      {users.map((user, index) => (
        <div key={index} className="flex items-center justify-between py-2 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-gray-300"></div>
            <div>
              <p className="font-bold text-sm">{user.username} </p>
            </div>
          </div>
          <button className="text-blue-500 text-sm font-semibold pl-4"> Message</button>
        </div>
      ))}
    </div>
  );
}

export default Rightbar