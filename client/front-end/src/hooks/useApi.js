import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

const useApi = (url, method = 'get', body = null, headers = {}) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchData = useCallback(async (currentBody = body) => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios({
                method,
                url,
                data: currentBody,
                headers,
            });
            setData(response.data);
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    }, [url, method, body, headers]); // Include body and headers in dependency array

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return { data, loading, error, refetch: fetchData };
};

export default useApi;