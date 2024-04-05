import express from 'express';
import submissionModel from '../models/submissions';
import { PermitTreeService } from '../services/permitService';
import { PermitTree } from '../utils/PermitTree';
// import { AutoPermitTree } from '../utils/AutoPermitTree';

interface SubmitRequestBody {
  type: string;
  workDetails: string[];
}

const router = express.Router();
const permitService = new PermitTreeService(PermitTree.getInstance());

// To demonstrate composition, we can use the AutoPermitTree class instead,
// which is a Tree that implements the IPermitTree interface.
// PermitTreeService can work with any class that implements IPermitTree.

// const permitService = new PermitTreeService(AutoPermitTree.getInstance());

router.post('/submit', (req, res) => {
  const { type, workDetails }: SubmitRequestBody = req.body;

  permitService.determinePermitRequirement(
    type,
    workDetails,
    (error, result) => {
      if (error) {
        return res.status(400).send({
          error: 'Error determining permit requirement',
          details: error.message,
        });
      }

      if (!result) {
        return res.status(404).send({
          error: 'Permit requirement not found',
        });
      }

      const newSubmission = {
        type,
        workDetails,
        permitRequirement: result,
      };

      submissionModel.addSubmission(newSubmission, (err, document) => {
        if (err) {
          return res.status(400).send({
            error: 'Error saving submission to the database',
            details: err,
          });
        }

        res.status(201).send({
          message: 'Submission added successfully',
          submission: document,
        });
      });
    }
  );
});

router.get('/submissions', (_req, res) => {
  submissionModel.getAllSubmissions((err, documents) => {
    if (err) {
      res.status(400).send({
        error: 'Error fetching submissions from the database',
        details: err,
      });
    } else {
      res.status(200).send(documents);
    }
  });
});

router.get('/submissions/:id', (req, res) => {
  const { id } = req.params;

  submissionModel.getSubmissionById(id, (err, document) => {
    if (err) {
      res.status(400).send({
        error: 'Error fetching submission from the database',
        details: err,
      });
    } else if (!document) {
      res.status(404).send({ message: 'Submission not found' });
    } else {
      res.status(200).send(document);
    }
  });
});

router.get('/permit-options', (_req, res) => {
  try {
    const treeStructure = permitService.tree;
    res.status(200).send(treeStructure);
  } catch (error) {
    res.status(500).send({
      error: 'Failed to fetch permit options',
      details: error instanceof Error ? error.message : 'Unknown error',
    });
  }
});

export default router;
