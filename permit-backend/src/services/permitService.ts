import { IPermitTree, TreeNodeJson } from '../utils/IPermitTree';

export class PermitTreeService {
  constructor(public permitTree: IPermitTree) {}

  get tree(): TreeNodeJson {
    return this.permitTree.exportTree();
  }

  determinePermitRequirement(
    type: string,
    workDetails: string[],
    callback: (error: Error | null, result?: string) => void
  ): void {
    try {
      // The first argument (type) is the type of work (Interior or Exterior),
      // and the second argument (workDetails) is an array of strings that
      // describe the work being done.
      // i.e['Exterior doors', 'Yes']
      const result = this.permitTree.navigateTree([type, ...workDetails]);
      callback(null, result);
    } catch (error) {
      callback(
        error instanceof Error
          ? error
          : new Error('An unexpected error occurred')
      );
    }
  }
}
