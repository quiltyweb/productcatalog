/* tslint:disable */
/* eslint-disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ProductList_products = {
    readonly edges: ReadonlyArray<{
        readonly node: {
            readonly id: string;
            readonly name: string;
            readonly imagePath: string;
        } | null;
    } | null> | null;
    readonly " $refType": "ProductList_products";
};
export type ProductList_products$data = ProductList_products;
export type ProductList_products$key = {
    readonly " $data"?: ProductList_products$data;
    readonly " $fragmentRefs": FragmentRefs<"ProductList_products">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ProductList_products",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "ProductEdge",
      "kind": "LinkedField",
      "name": "edges",
      "plural": true,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "Product",
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
            },
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "imagePath",
              "storageKey": null
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "ProductConnection"
};
(node as any).hash = '3090c27713353e019a3805352313e94f';
export default node;
