import React, { useEffect, useState } from 'react';
import usePermitApi from './hooks/usePermitApi';
import { isPermitOptions, isPermitResult, NewSubmissionResponse} from './types'; 
import styles from './App.module.css';

const App: React.FC = () => {
  const { permitOptions, submitPermitDecision, fetchPermitOptions, submissions, fetchSubmissions } = usePermitApi();
  const [currentNode, setCurrentNode] = React.useState(permitOptions);
  const [workDetails, setWorkDetails] = useState<string[]>([]);

  useEffect(() => {
    fetchPermitOptions();
    fetchSubmissions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  useEffect(() => {
    setCurrentNode(permitOptions);
  }, [permitOptions]);


  const handleOptionSelect = (option: string) => {
    if (currentNode && isPermitOptions(currentNode)) {
      const nextNode = currentNode.answers![option];
      const updatedWorkDetails = [...workDetails, option];
      if (nextNode && isPermitResult(nextNode)) {
        // Proceed with the submission using the updated work details
        submitPermitDecision({ type: updatedWorkDetails[0], workDetails: updatedWorkDetails.slice(1) })
          .then((response: NewSubmissionResponse) => {
            alert("Your Permit Requirement: " + response.submission.permitRequirement);
            setCurrentNode(permitOptions);
            setWorkDetails([]);
            fetchSubmissions();
          })
          .catch((error: any) => {
            alert('Failed to submit: ' + error.message);
          });
      } else if (nextNode && isPermitOptions(nextNode)) {
        // Continue navigating the tree with the updated node and work details
        setCurrentNode(nextNode);
        setWorkDetails(updatedWorkDetails);
      } else {
        console.error('Unexpected state: nextNode is null or undefined');
      }
    }
  };
  
  if (!currentNode) {
    return <div>Loading...</div>;
  }
  
  return (
<>
  <main className={styles.main}>
    <section className={styles.questionSection}>
      <h2>{currentNode.question}</h2>
      <div className={styles.options}>
        {Object.keys(currentNode.answers!).map((option) => (
          <button 
            className={styles.optionButton} 
            key={option} 
            onClick={() => handleOptionSelect(option)}
            aria-label={`Choose ${option}`}
          >
            {option}
          </button>
        ))}
      </div>
    </section>
    <section className={styles.submissionsSection}>
      <h2>Latest Submissions</h2>
      <ul>
        {submissions.map((submission) => (
          <li key={submission._id} className={styles.submissionItem}>
            <article>
              <h3>Type: {submission.type}</h3>
              <h4>Permit Requirement: {submission.permitRequirement || 'N/A'}</h4>
              <p>Work Details: {submission.workDetails.join(', ')}</p>
              <time dateTime={submission.createdAt}>
                Submitted on: {new Date(submission.createdAt).toLocaleDateString()} at {new Date(submission.createdAt).toLocaleTimeString()}
              </time>
            </article>
          </li>
        ))}
      </ul>
    </section>
  </main>
</>

  );
};

export default App;
