export class TreeNode {
  question: string;
  answers: Map<string, TreeNode | string>;

  constructor(question: string, answers: Map<string, TreeNode | string>) {
    this.question = question;
    this.answers = answers;
  }
}

export interface TreeNodeJson {
  question?: string;
  answers?: { [key: string]: TreeNodeJson | TreeLeaf };
  result?: string;
}

export interface TreeLeaf {
  result: string;
}

export interface IPermitTree {
  navigateTree(answers: string[]): string;
  exportTree(): TreeNodeJson;
}
