import { TreeLeaf, TreeNode, TreeNodeJson } from './IPermitTree';

export class PermitTree {
  private static instance: PermitTree;
  private rootNode: TreeNode;

  private constructor() {
    this.rootNode = this.buildTree();
  }

  public static getInstance(): PermitTree {
    if (!PermitTree.instance) {
      PermitTree.instance = new PermitTree();
    }
    return PermitTree.instance;
  }

  private buildTree(): TreeNode {
    return new TreeNode(
      'What residential work are you doing?',
      new Map([
        [
          'Interior work',
          new TreeNode(
            'What interior work are you doing?',
            new Map([
              ['Bathroom remodel', 'Over-the-Counter Submission Process'],
              ['New bathroom', 'In-House Review Process'],
              ['New laundry room', 'In-House Review Process'],
              ['Other', 'In-House Review Process'],
            ])
          ),
        ],
        [
          'Exterior work',
          new TreeNode(
            'What exterior work are you doing?',
            new Map<string, TreeNode | string>([
              [
                'Garage door replacement',
                new TreeNode(
                  'Are you also working on exterior doors?',
                  new Map<string, TreeNode | string>([
                    ['Yes', 'Over-the-Counter Submission Process'],
                    ['No', 'Over-the-Counter Submission Process'],
                  ])
                ),
              ],
              [
                'Exterior doors',
                new TreeNode(
                  'Are you also replacing the garage door?',
                  new Map<string, TreeNode | string>([
                    ['Yes', 'Over-the-Counter Submission Process'],
                    ['No', 'Over-the-Counter Submission Process'],
                  ])
                ),
              ],
              ['Fencing', 'No Permit'],
              ['Other', 'In-House Review Process'],
            ])
          ),
        ],
      ])
    );
  }

  navigateTree(answers: string[]): string {
    return this._navigateTree(this.rootNode, answers.slice());
  }

  private _navigateTree(node: TreeNode, answers: string[]): string {
    if (answers.length === 0 || typeof node === 'string') {
      if (typeof node === 'string') {
        return node;
      } else {
        throw new Error('Path not found in tree');
      }
    }

    const firstAnswer = answers.shift();
    const nextNode = firstAnswer ? node.answers.get(firstAnswer) : undefined;

    if (!nextNode) {
      throw new Error('Answer not found in tree');
    } else if (typeof nextNode === 'string') {
      return nextNode;
    } else {
      return this._navigateTree(nextNode, answers);
    }
  }

  private convertNodeToJson(node: TreeNode | string): TreeNodeJson | TreeLeaf {
    if (typeof node === 'string') {
      // Leaf node
      return { result: node };
    } else {
      // Branch node
      const answers: { [key: string]: TreeNodeJson | TreeLeaf } = {};
      node.answers.forEach((value, key) => {
        answers[key] = this.convertNodeToJson(value);
      });
      return {
        question: node.question,
        answers: answers,
      };
    }
  }

  public exportTree(): TreeNodeJson {
    return this.convertNodeToJson(this.rootNode);
  }
}
