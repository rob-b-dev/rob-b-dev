import React, { useState } from "react";

function BookSessions() {
    const [expandedRows, setExpandedRows] = useState({});

    const data = [
        { id: 1, name: "Product A", details: "This is the detail for Product A." },
        { id: 2, name: "Product B", details: "This is the detail for Product B." },
        { id: 3, name: "Product C", details: "This is the detail for Product C." }
    ];

    const toggleRow = (id) => {
        setExpandedRows((prev) => ({
            ...prev,
            [id]: !prev[id] // Toggle the expansion state
        }));
    };

    return (
        <table border="1" style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {data.map((row) => (
                    <React.Fragment key={row.id}>
                        {/* Main Row */}
                        <tr>
                            <td>{row.name}</td>
                            <td>
                                <button onClick={() => toggleRow(row.id)}>
                                    {expandedRows[row.id] ? "Collapse" : "Expand"}
                                </button>
                            </td>
                        </tr>

                        {/* Expanded Details Row (only shown if expanded) */}
                        {expandedRows[row.id] && (
                            <tr>
                                <td colSpan="2" style={{ backgroundColor: "#f9f9f9", padding: "10px" }}>
                                    {row.details}
                                </td>
                            </tr>
                        )}
                    </React.Fragment>
                ))}
            </tbody>
        </table>
    );
}

export default BookSessions;
