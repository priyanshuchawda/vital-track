const generateRandomVitals = () => {
    return {
        heartRate: Math.floor(Math.random() * (100 - 60 + 1)) + 60, // Random heart rate between 60 and 100
        oxygenLevel: Math.floor(Math.random() * (100 - 90 + 1)) + 90, // Random oxygen level between 90 and 100
    };
};

const mockDataStream = (callback) => {
    const intervalId = setInterval(() => {
        const vitals = generateRandomVitals();
        callback(vitals);
    }, 5000); // Update every 5 seconds

    // Return an unsubscribe function
    return () => clearInterval(intervalId);
};

export default mockDataStream;
