import axios from "axios";
import React, { useEffect, useState } from "react";

const BarangayMainPage: React.FC = () => {
  const [requests, setRequests] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  function handleAxiosError(error: any): string {
    if (error.response) {
      console.error("Response error:", error.response.data);
      return `Server Error ${error.response.status}: ${
        error.response.data.message || "An error occurred."
      }`;
    } else if (error.request) {
      console.error("Request error:", error.request);
      return "No response received from the server. Please check your network connection.";
    } else {
      console.error("General error:", error.message);
      return `Error: ${error.message}`;
    }
  }

  useEffect(() => {
    async function handleRequests() {
      try {
        const uname = localStorage.getItem("username");

        if (!uname) {
          setError("Username not found. Please log in again.");
          setLoading(false);
          return;
        }

        const response = await axios.get(
          "https://express-production-ac91.up.railway.app/servicerequest/getRequestsBarangay",
          {
            params: { barangay: uname },
          }
        );

        console.log(response.data);
        setRequests(response.data);
      } catch (error) {
        if (axios.isAxiosError(error) && error.response?.status === 404) {
          setError("No service request found.");
        } else {
          setError(handleAxiosError(error));
        }
      } finally {
        setLoading(false);
      }
    }

    handleRequests();
  }, []);

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Barangay Service Requests</h2>

      {/* Loading State */}
      {loading && <p style={styles.loading}>Loading requests...</p>}

      {/* Error Message */}
      {error && <p style={styles.error}>{error}</p>}

      {/* Table */}
      {!loading && !error && (
        <div style={styles.tableContainer}>
          <table style={styles.table}>
            <thead>
              <tr style={styles.headerRow}>
                <th style={styles.th}>User ID</th>
                <th style={styles.th}>Username</th>
                <th style={styles.th}>Request Type</th>
                <th style={styles.th}>Address</th>
              </tr>
            </thead>
            <tbody>
              {requests.length > 0 ? (
                requests.map((values: any, index: number) => (
                  <tr
                    key={index}
                    style={{
                      backgroundColor: index % 2 === 0 ? "#f9f9f9" : "white",
                    }}
                  >
                    <td style={styles.td}>{values.UserID}</td>
                    <td style={styles.td}>{values.Username}</td>
                    <td style={styles.td}>{values.RequestType}</td>
                    
                    <td style={styles.td}>{values.Address}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} style={styles.noData}>
                    No service requests available.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

// Styles Object
const styles = {
  container: {
    width: "100vw", // Full width
    height: "100vh", // Full height
    display: "flex",
    flexDirection: "column" as const,
    alignItems: "center",
    justifyContent: "flex-start",
    padding: "20px",
    fontFamily: "Arial, sans-serif",
    overflow: "hidden", // Prevents any page overflow
  },
  title: {
    textAlign: "center" as const,
    marginBottom: "15px",
    color: "#333",
  },
  loading: {
    textAlign: "center" as const,
    fontSize: "16px",
    fontWeight: "bold",
  },
  error: {
    textAlign: "center" as const,
    fontSize: "16px",
    fontWeight: "bold",
    color: "red",
  },
  tableContainer: {
    width: "100%",
    height: "calc(100vh - 100px)", // Adjust height dynamically
    overflowY: "auto" as const, // Enables vertical scrolling if needed
    overflowX: "auto" as const, // Enables horizontal scrolling if needed
  },
  table: {
    width: "100%",
    borderCollapse: "collapse" as const,
    border: "1px solid #ddd",
  },
  headerRow: {
    backgroundColor: "#4A90E2",
    color: "white",
  },
  th: {
    padding: "12px",
    textAlign: "left" as const,
    borderBottom: "2px solid #ddd",
  },
  td: {
    padding: "12px",
    border: "1px solid #ddd",
  },
  noData: {
    padding: "12px",
    textAlign: "center" as const,
    fontStyle: "italic",
  },
};

export default BarangayMainPage;
