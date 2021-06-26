export const getApiCall = async (urlString) => {
    const data = await fetch(urlString, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
    });
    return await data.json();
};