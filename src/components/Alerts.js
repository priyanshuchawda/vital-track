import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const Alerts = ({ vitals }) => {
    const [alerts, setAlerts] = useState([]);

    useEffect(() => {
        const newAlerts = [];

        // Check if vitals are defined
        if (vitals) {
            // Check for low oxygen level
            if (vitals.oxygenLevel < 92) {
                newAlerts.push('Warning: Low oxygen level detected!');
                toast.error('Warning: Low oxygen level detected!'); // Show notification
            }

            // Check for abnormal heart rate
            if (vitals.heartRate < 60) {
                newAlerts.push('Warning: Heart rate is too low!');
                toast.error('Warning: Heart rate is too low!'); // Show notification
            } else if (vitals.heartRate > 100) {
                newAlerts.push('Warning: Heart rate is too high!');
                toast.error('Warning: Heart rate is too high!'); // Show notification
            }
        }

        // Update alerts state
        setAlerts(newAlerts);
    }, [vitals]);

    return (
        <div>
            <h2>Alerts</h2>
            {alerts.length > 0 ? (
                <ul>
                    {alerts.map((alert, index) => (
                        <li key={index}>{alert}</li>
                    ))}
                </ul>
            ) : (
                <p>No alerts.</p>
            )}
        </div>
    );
};

export default Alerts;
