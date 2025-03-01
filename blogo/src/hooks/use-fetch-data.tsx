import { AnyNsRecord } from 'dns';
import { useEffect, useState } from 'react';

interface Props {
  apiCall: (payload: AnyNsRecord) => Promise<any>;
  dependencies?: any[];
  payload?: any;
}

const useFetchData = (props: Props) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(null);

  const { apiCall, dependencies = [], payload } = props;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const result = await apiCall(payload);
        setData(result);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, dependencies);

  return { data, loading, error } as any;
};

export default useFetchData;
