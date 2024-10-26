import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import redpandaStream from '../services/redpandaService'; // Import Redpanda service
import axios from 'axios'; // Import Axios

// Register all necessary components
Chart.register(...registerables);

const PatientVitals = ({ setVitals, vitals, setHeartRateData, setOxygenLevelData, setTimeLabels, timeLabels }) => {
    const [heartRateData, setLocalHeartRateData] = useState([]);
    const [oxygenLevelData, setLocalOxygenLevelData] = useState([]);

    useEffect(() => {
        const unsubscribe = redpandaStream((newVitals) => {
            // Update vitals in the parent component
            setVitals((prevVitals) => ({
                ...prevVitals,
                ...newVitals,
            }));

            // Send vitals to Redpanda
            sendVitalsToRedpanda(newVitals);

            // Update heart rate data
            setLocalHeartRateData((prevData) => {
                const updatedData = [...prevData, newVitals.heartRate];
                setHeartRateData(updatedData); // Update heart rate data in the parent component
                return updatedData;
            });

            // Update oxygen level data
            setLocalOxygenLevelData((prevData) => {
                const updatedData = [...prevData, newVitals.oxygenLevel];
                setOxygenLevelData(updatedData); // Update oxygen level data in the parent component
                return updatedData;
            });

            // Update time labels
            setTimeLabels((prevLabels) => [...prevLabels, new Date().toLocaleTimeString()]);
        });

        return () => {
            unsubscribe();
        };
    }, [setVitals, setHeartRateData, setOxygenLevelData, setTimeLabels]);

    const sendVitalsToRedpanda = async (vitals) => {
        try {
            await axios.post('http://localhost:8082/topics/patient-vitals', {
                key: null,
                value: JSON.stringify(vitals),
            });
        } catch (error) {
            console.error('Error sending data to Redpanda:', error);
        }
    };

    const data = {
        labels: timeLabels,
        datasets: [
            {
                label: 'Heart Rate (bpm)',
                data: heartRateData,
                borderColor: 'rgba(75,192,192,1)',
                fill: false,
            },
            {
                label: 'Oxygen Level (%)',
                data: oxygenLevelData,
                borderColor: 'rgba(255,99,132,1)',
                fill: false,
            },
        ],
    };

    return (
        <div>
            <h2>Patient Vitals</h2>
            <p>Current Heart Rate: {heartRateData[heartRateData.length - 1] || 0} bpm</p>
            <p>Current Oxygen Level: {vitals.oxygenLevel || 0} %</p>
            <Line data={data} />
        </div>
    );
};

export default PatientVitals;
