import { useState } from "react";

function LeaveRequest() {
  const [formData, setFormData] = useState({
    leaveType: "",
    startDate: "",
    endDate: "",
    reason: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(formData);

    // Later API call here
  };

  return (
    <div className="page">
      <h2>Leave Request</h2>

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Leave Type</label>
          <select
            className="form-control"
            name="leaveType"
            value={formData.leaveType}
            onChange={handleChange}
          >
            <option value="">Select Leave</option>
            <option value="Sick">Sick Leave</option>
            <option value="Casual">Casual Leave</option>
            <option value="Vacation">Vacation Leave</option>
          </select>
        </div>

        <div className="mb-3">
          <label>Start Date</label>
          <input
            type="date"
            className="form-control"
            name="startDate"
            value={formData.startDate}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label>End Date</label>
          <input
            type="date"
            className="form-control"
            name="endDate"
            value={formData.endDate}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label>Reason</label>
          <textarea
            className="form-control"
            name="reason"
            value={formData.reason}
            onChange={handleChange}
          />
        </div>

        <button className="submit-btn">
          Submit Request
        </button>
      </form>
    </div>
  );
}

export default LeaveRequest;