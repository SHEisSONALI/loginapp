import { useEffect, useState } from "react";
import axios from "axios";

function LeaveApproval() {

  const [requests, setRequests] = useState([]);

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {

      const token =
        localStorage.getItem("token");

      const res = await axios.get(
        "http://localhost:5000/api/leave/all",
        {
          headers: {
            Authorization: token
          }
        }
      );

      setRequests(res.data);

    } catch (error) {
      console.log(error);
    }
  };

  const updateStatus = async (
    leaveId,
    status
  ) => {

    try {

      const token =
        localStorage.getItem("token");

      await axios.put(
        `http://localhost:5000/api/leave/${leaveId}`,
        { status },
        {
          headers: {
            Authorization: token
          }
        }
      );

      fetchRequests();

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="page">

      <h2>
        Leave Approvals
      </h2>

      <table
        className="table"
        style={{ width: "100%" }}
      >

        <thead>
          <tr>
            <th>Employee</th>
            <th>Type</th>
            <th>From</th>
            <th>To</th>
            <th>Status</th>

            {[
              "admin",
              "hr",
              "manager"
            ].includes(user?.role) && (
              <th>Action</th>
            )}

          </tr>
        </thead>

        <tbody>

          {requests.map((leave) => (

            <tr key={leave.leave_id}>

              <td>
                {leave.employee_name}
              </td>

              <td>
                {leave.leave_type}
              </td>

              <td>
                {leave.start_date}
              </td>

              <td>
                {leave.end_date}
              </td>

              <td>
                {leave.status}
              </td>

              {[
                "admin",
                "hr",
                "manager"
              ].includes(user?.role) && (

                <td>

                  {leave.status ===
                    "Pending" && (
                    <>
                      <button
                        onClick={() =>
                          updateStatus(
                            leave.leave_id,
                            "Approved"
                          )
                        }
                      >
                        Approve
                      </button>

                      <button
                        style={{
                          marginLeft:
                            "10px"
                        }}
                        onClick={() =>
                          updateStatus(
                            leave.leave_id,
                            "Rejected"
                          )
                        }
                      >
                        Reject
                      </button>
                    </>
                  )}

                </td>

              )}

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
}

export default LeaveApproval;