import request from 'supertest';
import express, { Express } from 'express';
import bodyParser from 'body-parser';
import questionnaireRoutes from '../../src/routes/questionnaire';
import submissionModel from '../../src/models/submissions';

jest.mock('../../src/models/submissions', () => ({
  addSubmission: jest.fn(),
  getAllSubmissions: jest.fn(),
  getSubmissionById: jest.fn(),
}));

describe('Questionnaire Routes', () => {
  let app: Express;

  beforeAll(() => {
    app = express();
    app.use(bodyParser.json());
    app.use(questionnaireRoutes);
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('POST /submit', () => {
    it('should successfully add a submission and return 201', async () => {
      (submissionModel.addSubmission as jest.Mock).mockImplementation(
        (submission, callback) => callback(null, submission)
      );

      const response = await request(app)
        .post('/submit')
        .send({ type: 'Interior work', workDetails: ['Bathroom remodel'] });

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty(
        'message',
        'Submission added successfully'
      );
      expect(response.body).toHaveProperty('submission', {
        type: 'Interior work',
        workDetails: ['Bathroom remodel'],
        permitRequirement: 'Over-the-Counter Submission Process',
      });
      expect(submissionModel.addSubmission).toHaveBeenCalledTimes(1);
    });

    it('should successfully add a submission for Interior work - New bathroom', async () => {
      (submissionModel.addSubmission as jest.Mock).mockImplementation(
        (submission, callback) => callback(null, submission)
      );

      const response = await request(app)
        .post('/submit')
        .send({ type: 'Interior work', workDetails: ['New bathroom'] });

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty(
        'message',
        'Submission added successfully'
      );
      expect(response.body).toHaveProperty('submission', {
        type: 'Interior work',
        workDetails: ['New bathroom'],
        permitRequirement: 'In-House Review Process',
      });
      expect(submissionModel.addSubmission).toHaveBeenCalledTimes(1);
    });

    it('should successfully add a submission for Interior work - New bathroom', async () => {
      (submissionModel.addSubmission as jest.Mock).mockImplementation(
        (submission, callback) => callback(null, submission)
      );

      const response = await request(app)
        .post('/submit')
        .send({ type: 'Interior work', workDetails: ['New bathroom'] });

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty(
        'message',
        'Submission added successfully'
      );
      expect(response.body).toHaveProperty('submission', {
        type: 'Interior work',
        workDetails: ['New bathroom'],
        permitRequirement: 'In-House Review Process',
      });
      expect(submissionModel.addSubmission).toHaveBeenCalledTimes(1);
    });

    it('should successfully add a submission for Interior work - New laundry room', async () => {
      (submissionModel.addSubmission as jest.Mock).mockImplementation(
        (submission, callback) => callback(null, submission)
      );

      const response = await request(app)
        .post('/submit')
        .send({ type: 'Interior work', workDetails: ['New laundry room'] });

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty(
        'message',
        'Submission added successfully'
      );
      expect(response.body).toHaveProperty('submission', {
        type: 'Interior work',
        workDetails: ['New laundry room'],
        permitRequirement: 'In-House Review Process',
      });
      expect(submissionModel.addSubmission).toHaveBeenCalledTimes(1);
    });

    it('should successfully add a submission for Interior work - Other', async () => {
      (submissionModel.addSubmission as jest.Mock).mockImplementation(
        (submission, callback) => callback(null, submission)
      );

      const response = await request(app)
        .post('/submit')
        .send({ type: 'Interior work', workDetails: ['Other'] });

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty(
        'message',
        'Submission added successfully'
      );
      expect(response.body).toHaveProperty('submission', {
        type: 'Interior work',
        workDetails: ['Other'],
        permitRequirement: 'In-House Review Process',
      });
      expect(submissionModel.addSubmission).toHaveBeenCalledTimes(1);
    });

    it('should successfully add a submission for Exterior work - Garage door replacement', async () => {
      (submissionModel.addSubmission as jest.Mock).mockImplementation(
        (submission, callback) => callback(null, submission)
      );

      const response = await request(app)
        .post('/submit')
        .send({
          type: 'Exterior work',
          workDetails: ['Garage door replacement', 'No'],
        });

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty(
        'message',
        'Submission added successfully'
      );
      expect(response.body).toHaveProperty('submission', {
        type: 'Exterior work',
        workDetails: ['Garage door replacement', 'No'],
        permitRequirement: 'Over-the-Counter Submission Process',
      });
      expect(submissionModel.addSubmission).toHaveBeenCalledTimes(1);
    });

    it('should successfully add a submission for Exterior work - Exterior doors', async () => {
      (submissionModel.addSubmission as jest.Mock).mockImplementation(
        (submission, callback) => callback(null, submission)
      );

      const response = await request(app)
        .post('/submit')
        .send({
          type: 'Exterior work',
          workDetails: ['Exterior doors', 'Yes'],
        });

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty(
        'message',
        'Submission added successfully'
      );
      expect(response.body).toHaveProperty('submission', {
        type: 'Exterior work',
        workDetails: ['Exterior doors', 'Yes'],
        permitRequirement: 'Over-the-Counter Submission Process',
      });
      expect(submissionModel.addSubmission).toHaveBeenCalledTimes(1);
    });

    it('should successfully add a submission for Exterior work - Fencing', async () => {
      (submissionModel.addSubmission as jest.Mock).mockImplementation(
        (submission, callback) => callback(null, submission)
      );

      const response = await request(app)
        .post('/submit')
        .send({ type: 'Exterior work', workDetails: ['Fencing'] });

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty(
        'message',
        'Submission added successfully'
      );
      expect(response.body).toHaveProperty('submission', {
        type: 'Exterior work',
        workDetails: ['Fencing'],
        permitRequirement: 'No Permit',
      });
      expect(submissionModel.addSubmission).toHaveBeenCalledTimes(1);
    });

    it('should return 400 if an error occurs during submission', async () => {
      (submissionModel.addSubmission as jest.Mock).mockImplementation(
        (_, callback) => callback(new Error('Error saving submission'))
      );

      const response = await request(app)
        .post('/submit')
        .send({ type: 'Exterior work', workDetails: ['Fencing'] });

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty(
        'error',
        'Error saving submission to the database'
      );
    });
  });

  describe('GET /submissions', () => {
    it('should return all submissions', async () => {
      const mockSubmissions = [
        {
          id: '123',
          type: 'Interior work',
          workDetails: ['Bathroom remodel'],
          permitRequirement: 'OTC Submission Process',
        },
      ];
      (submissionModel.getAllSubmissions as jest.Mock).mockImplementation(
        (callback) => callback(null, mockSubmissions)
      );

      const response = await request(app).get('/submissions');

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockSubmissions);
      expect(submissionModel.getAllSubmissions).toHaveBeenCalledTimes(1);
    });
  });

  describe('GET /submissions/:id', () => {
    it('should return a specific submission by id', async () => {
      const mockSubmission = {
        id: '123',
        type: 'Exterior work',
        workDetails: ['Fencing'],
        permitRequirement: 'No Permit',
      };
      (submissionModel.getSubmissionById as jest.Mock).mockImplementation(
        (_id, callback) => callback(null, mockSubmission)
      );

      const response = await request(app).get('/submissions/123');

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockSubmission);
      expect(submissionModel.getSubmissionById).toHaveBeenCalledTimes(1);
    });

    it('should return 404 if the submission is not found', async () => {
      (submissionModel.getSubmissionById as jest.Mock).mockImplementation(
        (_id, callback) => callback(null, null)
      );

      const response = await request(app).get('/submissions/nonexistent-id');

      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty('message', 'Submission not found');
    });
  });

  describe('GET /permit-options', () => {
    it('should return the entire tree structure of permit options', async () => {
      const expectedTreeStructure = {
        question: 'What residential work are you doing?',
        answers: {
          'Interior work': {
            question: 'What interior work are you doing?',
            answers: {
              'Bathroom remodel': {
                result: 'Over-the-Counter Submission Process',
              },
              'New bathroom': { result: 'In-House Review Process' },
              'New laundry room': { result: 'In-House Review Process' },
              Other: { result: 'In-House Review Process' },
            },
          },
          'Exterior work': {
            question: 'What exterior work are you doing?',
            answers: {
              'Garage door replacement': {
                question: 'Are you also working on exterior doors?',
                answers: {
                  Yes: { result: 'Over-the-Counter Submission Process' },
                  No: { result: 'Over-the-Counter Submission Process' },
                },
              },
              'Exterior doors': {
                question: 'Are you also replacing the garage door?',
                answers: {
                  Yes: { result: 'Over-the-Counter Submission Process' },
                  No: { result: 'Over-the-Counter Submission Process' },
                },
              },
              Fencing: { result: 'No Permit' },
              Other: { result: 'In-House Review Process' },
            },
          },
        },
      };

      const response = await request(app).get('/permit-options');

      expect(response.status).toBe(200);
      expect(response.body).toEqual(expectedTreeStructure);
    });
  });
});
