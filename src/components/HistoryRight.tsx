import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useGetItems } from '../hooks/useGetItems';

const ApprovalRight = () => {
  const { checkAccounts, clients } = useGetItems();
  const [sidebarVisible, setSidebarVisible] = useState(true);

  useEffect(() => {
    checkAccounts('clients');
  }, [checkAccounts]);

  const updateUserStatus = async (status: string, userId: number) => {
    await axios.put(
      `https://your-api-url.com/user/updateStatusUser/${status}`,
      { UserID: userId }
    );
    checkAccounts('clients');
  };

  return (
    <div className="main-content">
      <button
        className="toggle-sidebar"
        onClick={() => setSidebarVisible(!sidebarVisible)}
      >
        ☰
      </button>
      <div className="dashboard-header">
        <h1>Approval</h1>
      </div>
      <div className="table-container">
        <table className="approval-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {clients.map((user) => (
              <tr key={user.UserID}>
                <td>{user.FirstName} {user.LastName}</td>
                <td>{user.Status}</td>
                <td>
                  <button
                    className="approve-btn"
                    onClick={() => updateUserStatus('approved', user.UserID)}
                  >
                    ✅ Approve
                  </button>
                  <button
                    className="reject-btn"
                    onClick={() => updateUserStatus('rejected', user.UserID)}
                  >
                    ❌ Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ApprovalRight;