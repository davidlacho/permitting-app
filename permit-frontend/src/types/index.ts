export interface PermitOptions {
  question?: string;
  answers?: { [key: string]: PermitOptions | PermitResult };
}

export interface PermitResult {
  result: string;
}

export interface Submission {
  type: string;
  workDetails: string[];
}

export interface SubmissionResponse {
  _id: string;
  type: string;
  workDetails: string[];
  permitRequirement: string;
  createdAt: string;
}

export interface NewSubmissionResponse {
  message: string;
  submission: SubmissionResponse;
}

export function isPermitOptions(
  node: PermitOptions | PermitResult
): node is PermitOptions {
  return (node as PermitOptions).answers !== undefined;
}

export function isPermitResult(
  node: PermitOptions | PermitResult
): node is PermitResult {
  return (node as PermitResult).result !== undefined;
}
