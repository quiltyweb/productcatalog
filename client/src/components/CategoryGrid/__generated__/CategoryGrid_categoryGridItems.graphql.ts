/* tslint:disable */
/* eslint-disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type CategoryGrid_categoryGridItems = {
    readonly edges: ReadonlyArray<{
        readonly node: {
            readonly id: string;
            readonly name: string;
        } | null;
    } | null> | null;
    readonly " $refType": "CategoryGrid_categoryGridItems";
};
export type CategoryGrid_categoryGridItems$data = CategoryGrid_categoryGridItems;
export type CategoryGrid_categoryGridItems$key = {
    readonly " $data"?: CategoryGrid_categoryGridItems$data;
    readonly " $fragmentRefs": FragmentRefs<"CategoryGrid_categoryGridItems">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "CategoryGrid_categoryGridItems",
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
(node as any).hash = '5f6c8cf4a8b64181e29b34040a243a22';
export default node;
