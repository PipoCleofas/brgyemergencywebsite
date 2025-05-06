import  { useState, useEffect } from 'react';
import axios from 'axios';
import { useGetItems } from '../hooks/useGetItems';

const ApprovalRight = () => {
  const { checkAccounts, clients } = useGetItems();
  const [loading, setLoading] = useState(true);
  const [updatingStatus, setUpdatingStatus] = useState<number | null>(null);
  const [sidebarVisible, setSidebarVisible] = useState(true);

  useEffect(() => {
    const fetchClientsAndPhotos = async () => {
      const success = await checkAccounts("clients");
    
      if (success) {
        console.log("Clients fetched successfully:", clients);
    
        // Fetch photos for each client
        for (const client of clients) {
          if (client.UserID) {
            await checkAccounts("photos", undefined, undefined, client.UserID);
          }
        }
      }
    
      setLoading(false);
    };
    
  
    fetchClientsAndPhotos();
  
    const intervalId = setInterval(fetchClientsAndPhotos, 3000);
    return () => clearInterval(intervalId);
  }, [checkAccounts, clients]);

  const updateUserStatus = async (status: string, userId: number) => {
    try {
      setUpdatingStatus(userId);
      const response = await axios.put(
        `https://express-production-ac91.up.railway.app/user/updateStatusUser/${status}`,
        { UserID: userId },
        { headers: { "Content-Type": "application/json" } }
      );
      console.log("User status updated:", response.data);
      await checkAccounts("clients");
    } catch (error) {
      console.error("Error updating user status:", error);
    } finally {
      setUpdatingStatus(null);
    }
  };

  const filteredClients = clients.filter((user) => user.Status === "pending");

  if (loading) {
    return <div>Loading...</div>;
  }

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
            {filteredClients.map((user) => (
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
