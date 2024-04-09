"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const questionnaire_1 = __importDefault(require("../../src/routes/questionnaire"));
const submissions_1 = __importDefault(require("../../src/models/submissions"));
jest.mock('../../src/models/submissions', () => ({
    addSubmission: jest.fn(),
    getAllSubmissions: jest.fn(),
    getSubmissionById: jest.fn(),
}));
describe('Questionnaire Routes', () => {
    let app;
    beforeAll(() => {
        app = (0, express_1.default)();
        app.use(body_parser_1.default.json());
        app.use(questionnaire_1.default);
    });
    beforeEach(() => {
        jest.clearAllMocks();
    });
    describe('POST /submit', () => {
        it('should successfully add a submission and return 201', () => __awaiter(void 0, void 0, void 0, function* () {
            submissions_1.default.addSubmission.mockImplementation((submission, callback) => callback(null, submission));
            const response = yield (0, supertest_1.default)(app)
                .post('/submit')
                .send({ type: 'Interior work', workDetails: ['Bathroom remodel'] });
            expect(response.status).toBe(201);
            expect(response.body).toHaveProperty('message', 'Submission added successfully');
            expect(response.body).toHaveProperty('submission', {
                type: 'Interior work',
                workDetails: ['Bathroom remodel'],
                permitRequirement: 'Over-the-Counter Submission Process',
            });
            expect(submissions_1.default.addSubmission).toHaveBeenCalledTimes(1);
        }));
        it('should successfully add a submission for Interior work - New bathroom', () => __awaiter(void 0, void 0, void 0, function* () {
            submissions_1.default.addSubmission.mockImplementation((submission, callback) => callback(null, submission));
            const response = yield (0, supertest_1.default)(app)
                .post('/submit')
                .send({ type: 'Interior work', workDetails: ['New bathroom'] });
            expect(response.status).toBe(201);
            expect(response.body).toHaveProperty('message', 'Submission added successfully');
            expect(response.body).toHaveProperty('submission', {
                type: 'Interior work',
                workDetails: ['New bathroom'],
                permitRequirement: 'In-House Review Process',
            });
            expect(submissions_1.default.addSubmission).toHaveBeenCalledTimes(1);
        }));
        it('should successfully add a submission for Interior work - New bathroom', () => __awaiter(void 0, void 0, void 0, function* () {
            submissions_1.default.addSubmission.mockImplementation((submission, callback) => callback(null, submission));
            const response = yield (0, supertest_1.default)(app)
                .post('/submit')
                .send({ type: 'Interior work', workDetails: ['New bathroom'] });
            expect(response.status).toBe(201);
            expect(response.body).toHaveProperty('message', 'Submission added successfully');
            expect(response.body).toHaveProperty('submission', {
                type: 'Interior work',
                workDetails: ['New bathroom'],
                permitRequirement: 'In-House Review Process',
            });
            expect(submissions_1.default.addSubmission).toHaveBeenCalledTimes(1);
        }));
        it('should successfully add a submission for Interior work - New laundry room', () => __awaiter(void 0, void 0, void 0, function* () {
            submissions_1.default.addSubmission.mockImplementation((submission, callback) => callback(null, submission));
            const response = yield (0, supertest_1.default)(app)
                .post('/submit')
                .send({ type: 'Interior work', workDetails: ['New laundry room'] });
            expect(response.status).toBe(201);
            expect(response.body).toHaveProperty('message', 'Submission added successfully');
            expect(response.body).toHaveProperty('submission', {
                type: 'Interior work',
                workDetails: ['New laundry room'],
                permitRequirement: 'In-House Review Process',
            });
            expect(submissions_1.default.addSubmission).toHaveBeenCalledTimes(1);
        }));
        it('should successfully add a submission for Interior work - Other', () => __awaiter(void 0, void 0, void 0, function* () {
            submissions_1.default.addSubmission.mockImplementation((submission, callback) => callback(null, submission));
            const response = yield (0, supertest_1.default)(app)
                .post('/submit')
                .send({ type: 'Interior work', workDetails: ['Other'] });
            expect(response.status).toBe(201);
            expect(response.body).toHaveProperty('message', 'Submission added successfully');
            expect(response.body).toHaveProperty('submission', {
                type: 'Interior work',
                workDetails: ['Other'],
                permitRequirement: 'In-House Review Process',
            });
            expect(submissions_1.default.addSubmission).toHaveBeenCalledTimes(1);
        }));
        it('should successfully add a submission for Exterior work - Garage door replacement', () => __awaiter(void 0, void 0, void 0, function* () {
            submissions_1.default.addSubmission.mockImplementation((submission, callback) => callback(null, submission));
            const response = yield (0, supertest_1.default)(app)
                .post('/submit')
                .send({
                type: 'Exterior work',
                workDetails: ['Garage door replacement', 'No'],
            });
            expect(response.status).toBe(201);
            expect(response.body).toHaveProperty('message', 'Submission added successfully');
            expect(response.body).toHaveProperty('submission', {
                type: 'Exterior work',
                workDetails: ['Garage door replacement', 'No'],
                permitRequirement: 'Over-the-Counter Submission Process',
            });
            expect(submissions_1.default.addSubmission).toHaveBeenCalledTimes(1);
        }));
        it('should successfully add a submission for Exterior work - Exterior doors', () => __awaiter(void 0, void 0, void 0, function* () {
            submissions_1.default.addSubmission.mockImplementation((submission, callback) => callback(null, submission));
            const response = yield (0, supertest_1.default)(app)
                .post('/submit')
                .send({
                type: 'Exterior work',
                workDetails: ['Exterior doors', 'Yes'],
            });
            expect(response.status).toBe(201);
            expect(response.body).toHaveProperty('message', 'Submission added successfully');
            expect(response.body).toHaveProperty('submission', {
                type: 'Exterior work',
                workDetails: ['Exterior doors', 'Yes'],
                permitRequirement: 'Over-the-Counter Submission Process',
            });
            expect(submissions_1.default.addSubmission).toHaveBeenCalledTimes(1);
        }));
        it('should successfully add a submission for Exterior work - Fencing', () => __awaiter(void 0, void 0, void 0, function* () {
            submissions_1.default.addSubmission.mockImplementation((submission, callback) => callback(null, submission));
            const response = yield (0, supertest_1.default)(app)
                .post('/submit')
                .send({ type: 'Exterior work', workDetails: ['Fencing'] });
            expect(response.status).toBe(201);
            expect(response.body).toHaveProperty('message', 'Submission added successfully');
            expect(response.body).toHaveProperty('submission', {
                type: 'Exterior work',
                workDetails: ['Fencing'],
                permitRequirement: 'No Permit',
            });
            expect(submissions_1.default.addSubmission).toHaveBeenCalledTimes(1);
        }));
        it('should return 400 if an error occurs during submission', () => __awaiter(void 0, void 0, void 0, function* () {
            submissions_1.default.addSubmission.mockImplementation((_, callback) => callback(new Error('Error saving submission')));
            const response = yield (0, supertest_1.default)(app)
                .post('/submit')
                .send({ type: 'Exterior work', workDetails: ['Fencing'] });
            expect(response.status).toBe(400);
            expect(response.body).toHaveProperty('error', 'Error saving submission to the database');
        }));
    });
    describe('GET /submissions', () => {
        it('should return all submissions', () => __awaiter(void 0, void 0, void 0, function* () {
            const mockSubmissions = [
                {
                    id: '123',
                    type: 'Interior work',
                    workDetails: ['Bathroom remodel'],
                    permitRequirement: 'OTC Submission Process',
                },
            ];
            submissions_1.default.getAllSubmissions.mockImplementation((callback) => callback(null, mockSubmissions));
            const response = yield (0, supertest_1.default)(app).get('/submissions');
            expect(response.status).toBe(200);
            expect(response.body).toEqual(mockSubmissions);
            expect(submissions_1.default.getAllSubmissions).toHaveBeenCalledTimes(1);
        }));
    });
    describe('GET /permit-options', () => {
        it('should return the entire tree structure of permit options', () => __awaiter(void 0, void 0, void 0, function* () {
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
            const response = yield (0, supertest_1.default)(app).get('/permit-options');
            expect(response.status).toBe(200);
            expect(response.body).toEqual(expectedTreeStructure);
        }));
    });
});
