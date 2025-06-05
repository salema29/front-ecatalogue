export function getCurrentLocation() {
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                resolve({ lat: latitude, long: longitude });
            },
            (err) => reject(err)
        );
    });
}

export async function getPlaceLocation(placeName) {
    const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(placeName)}&format=json&addressdetails=1&limit=1`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Error fetching location data: ${response.statusText}`);
        }

        const data = await response.json();
        if (data.length === 0) {
            throw new Error('No results found for the specified place.');
        }

        const location = data[0];
        return { lat: parseFloat(location.lat), long: parseFloat(location.lon) };
    } catch (error) {
        console.error(error);
        throw error;
    }
}
