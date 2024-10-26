import React, { useState } from 'react';
import PatientVitals from './PatientVitals';
import Alerts from './Alerts';
import PatientHistory from './PatientHistory';

const Dashboard = ({ userRole }) => {
    const [vitals, setVitals] = useState({ heartRate: 0, oxygenLevel: 0 });
    const [heartRateData, setHeartRateData] = useState([]);
    const [oxygenLevelData, setOxygenLevelData] = useState([]);
    const [timeLabels, setTimeLabels] = useState([]);
    
    // State to manage visibility of vitals
    const [showHeartRate, setShowHeartRate] = useState(true);
    const [showOxygenLevel, setShowOxygenLevel] = useState(true);

    return (
        <div className="container">
            <h1 className="mt-4">Patient Monitoring Dashboard</h1>
            <div className="mb-3">
                <h5>Customize Dashboard</h5>
                <div>
                    <label>
                        <input
                            type="checkbox"
                            checked={showHeartRate}
                            onChange={() => setShowHeartRate(!showHeartRate)}
                        />
                        Show Heart Rate
                    </label>
                    <label className="ml-3">
                        <input
                            type="checkbox"
                            checked={showOxygenLevel}
                            onChange={() => setShowOxygenLevel(!showOxygenLevel)}
                        />
                        Show Oxygen Level
                    </label>
                </div>
            </div>
            <div className="row">
                <div className="col-md-6">
                    {showHeartRate && (
                        <PatientVitals 
                            setVitals={setVitals} 
                            setHeartRateData={setHeartRateData} 
                            setOxygenLevelData={setOxygenLevelData} 
                            setTimeLabels={setTimeLabels} 
                            vitals={vitals} 
                            timeLabels={timeLabels} 
                        />
                    )}
                    {showOxygenLevel && (
                        <div>
                            <h2>Oxygen Level</h2>
                            <p>Current Oxygen Level: {vitals.oxygenLevel || 0} %</p>
                        </div>
                    )}
                </div>
                <div className="col-md-6">
                    <Alerts vitals={vitals} />
                </div>
            </div>
            {userRole === 'admin' && (
                <PatientHistory heartRateData={heartRateData} timeLabels={timeLabels} />
            )}
        </div>
    );
};

export default Dashboard;
