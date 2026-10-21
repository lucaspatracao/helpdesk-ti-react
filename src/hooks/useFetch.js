import { useState, useEffect } from 'react';

export function useFetch(url) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const abortController = new AbortController();

        const fetchData = async () => {
            try {
                const response = await fetch(url, { signal: abortController.signal });
                if (!response.ok) throw new Error('Erro na requisição');
                const json = await response.json();
                setData(json);
            } catch (err) {
                if (err.name !== 'AbortError') {
                    setError(err.message);
                }
            } finally {
                setLoading(false);
            }
        };

        fetchData();

        return () => abortController.abort();
    }, [url]);

    return { data, loading, error };
}