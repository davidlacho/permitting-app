import { useState, useCallback } from 'react';
import axios from 'axios';
import {
  NewSubmissionResponse,
  PermitOptions,
  Submission,
  SubmissionResponse,
} from '../types';

const usePermitApi = () => {
  const [permitOptions, setPermitOptions] = useState<PermitOptions | null>(
    null
  );
  const [submissions, setSubmissions] = useState<SubmissionResponse[]>([]);

  const fetchPermitOptions = useCallback(async () => {
    try {
      const response = await axios.get<PermitOptions>(
        '/api/questionnaire/permit-options'
      );
      setPermitOptions(response.data);
    } catch (error) {
      console.error('Failed to fetch permit options', error);
    }
  }, []);

  const submitPermitDecision = useCallback(async (data: Submission) => {
    try {
      const response = await axios.post<NewSubmissionResponse>(
        '/api/questionnaire/submit',
        data
      );
      return response.data;
    } catch (error) {
      console.error('Failed to submit permit decision', error);
      throw error;
    }
  }, []);

  const fetchSubmissions = useCallback(async () => {
    try {
      const response = await axios.get<SubmissionResponse[]>(
        '/api/questionnaire/submissions'
      );
      const sortedSubmissions = response.data.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
      setSubmissions(sortedSubmissions);
    } catch (error) {
      console.error('Failed to fetch submissions', error);
      throw error;
    }
  }, []);

  return {
    permitOptions,
    fetchPermitOptions,
    submitPermitDecision,
    submissions,
    fetchSubmissions,
    setSubmissions,
  };
};

export default usePermitApi;
