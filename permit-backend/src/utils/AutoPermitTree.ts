import { IPermitTree, TreeNodeJson, TreeLeaf, TreeNode } from './IPermitTree';

export class AutoPermitTree implements IPermitTree {
  private static instance: AutoPermitTree;
  private rootNode: TreeNode;

  private constructor() {
    this.rootNode = this.buildTree();
  }

  public static getInstance(): AutoPermitTree {
    if (!AutoPermitTree.instance) {
      AutoPermitTree.instance = new AutoPermitTree();
    }
    return AutoPermitTree.instance;
  }

  private buildTree(): TreeNode {
    // Example tree for vehicle maintenance services
    return new TreeNode(
      'What type of vehicle service are you looking for?',
      new Map([
        [
          'Internal Service',
          new TreeNode(
            'What internal service do you need?',
            new Map([
              ['Engine diagnostics', 'No Appointment Necessary'],
              ['Upholstery work', 'Appointment Required'],
              ['Electrical system repair', 'Appointment Required'],
              ['Other', 'Consultation Required'],
            ])
          ),
        ],
        [
          'External Service',
          new TreeNode(
            'What external service do you need?',
            new Map<string, TreeNode | string>([
              ['Painting', 'Appointment Required'],
              ['Dent repair', 'Appointment Required'],
              [
                'Windshield replacement',
                new TreeNode(
                  'Is this for a front or rear windshield?',
                  new Map<string, TreeNode | string>([
                    ['Front', 'Insurance Claim Assistance Available'],
                    ['Rear', 'Appointment Required'],
                  ])
                ),
              ],
              ['Other', 'Consultation Required'],
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
      return { result: node };
    } else {
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
