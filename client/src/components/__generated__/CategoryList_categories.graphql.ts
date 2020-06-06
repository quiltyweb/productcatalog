/* tslint:disable */
/* eslint-disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type CategoryList_categories = {
    readonly edges: ReadonlyArray<{
        readonly node: {
            readonly id: string;
            readonly name: string;
        } | null;
    } | null> | null;
    readonly " $refType": "CategoryList_categories";
};
export type CategoryList_categories$data = CategoryList_categories;
export type CategoryList_categories$key = {
    readonly " $data"?: CategoryList_categories$data;
    readonly " $fragmentRefs": FragmentRefs<"CategoryList_categories">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "CategoryList_categories",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "CategoryEdge",
      "kind": "LinkedField",
      "name": "edges",
      "plural": true,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "Category",
          "kind": "LinkedField",
          "name": "node",
          "plural": false,
          "selections": [
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "id",
              "storageKey": null
            },
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "name",
              "storageKey": null
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "CategoryConnection"
};
(node as any).hash = '86273270bb1a64c140195aee74d9b5fb';
export default node;
