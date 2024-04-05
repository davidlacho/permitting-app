import database from '../database/db';

interface Submission {
  _id?: string;
  type: string; // Type of work (Interior or Exterior)
  workDetails: string[]; // Details about the work being done
  permitRequirement: string; // The determined permit requirement based on the questionnaire
  createdAt?: Date; // Timestamp of when the submission was created
}

const addSubmission = (
  newSubmission: Submission,
  callback: (err: Error | null, document: Submission) => void
) => {
  newSubmission.createdAt = new Date();
  database.insert(newSubmission, callback);
};

const getAllSubmissions = (
  callback: (err: Error | null, documents: Submission[]) => void
) => {
  database.find({}, callback);
};

const getSubmissionById = (
  _id: string,
  callback: (err: Error | null, document: Submission) => void
) => {
  database.findOne({ _id }, callback);
};

export default {
  addSubmission,
  getAllSubmissions,
  getSubmissionById,
};
