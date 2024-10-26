import React from 'react';
import exportToCSV from '../utils/exportData';

const PatientHistory = ({ heartRateData, timeLabels }) => {
    const handleExport = () => {
        const data = heartRateData.map((heartRate, index) => ({
            Time: timeLabels[index],
            'Heart Rate (bpm)': heartRate,
        }));
        exportToCSV(data, 'patient_history.csv');
    };

    return (
        <div className="mt-4">
            <h2>Patient History</h2>
            <button className="btn btn-primary mb-3" onClick={handleExport}>
                Export Data
            </button>
            <table className="table">
                <thead>
                    <tr>
                        <th>Time</th>
                        <th>Heart Rate (bpm)</th>
                    </tr>
                </thead>
                <tbody>
                    {heartRateData.map((heartRate, index) => (
                        <tr key={index}>
                            <td>{timeLabels[index]}</td>
                            <td>{heartRate}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default PatientHistory;
