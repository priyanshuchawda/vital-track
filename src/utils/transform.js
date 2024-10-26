export default function transform(data) {
    const vitals = JSON.parse(data.value);
    // Perform transformations, e.g., filtering out invalid data
    if (vitals.heartRate < 0 || vitals.oxygenLevel < 0) {
        return null; // Discard invalid data
    }
    return vitals; // Return valid data
}