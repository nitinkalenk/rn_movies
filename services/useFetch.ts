import { useEffect, useState } from "react";

export default function useFetch<T>(fetchFunction : () => Promise<T>, autoFetch=true) {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        if(autoFetch) {
            fetchData();
        }
    }, []);

    const fetchData = async () => {
        try {
            setLoading(true);
            const data = await fetchFunction();
            setData(data);
        } catch (error) {
            setError(error instanceof Error ? error : new Error('Error Occurred ' + error));
        } finally {
            setLoading(false);
        }
    }

    const reset = () => {
        setLoading(false);
        setData(null);
        setError(null);
    }

    return { loading, data, error, reset, refetch : fetchData };

}