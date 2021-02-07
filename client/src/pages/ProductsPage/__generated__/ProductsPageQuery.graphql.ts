/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ProductsPageQueryVariables = {
    categoryId: string;
};
export type ProductsPageQueryResponse = {
    readonly fetchCategory: {
        readonly id: string;
        readonly name: string;
        readonly products: {
            readonly " $fragmentRefs": FragmentRefs<"ProductList_products">;
        };
    };
};
export type ProductsPageQuery = {
    readonly response: ProductsPageQueryResponse;
    readonly variables: ProductsPageQueryVariables;
};



/*
query ProductsPageQuery(
  $categoryId: ID!
) {
  fetchCategory(categoryId: $categoryId) {
    id
    name
    products {
      ...ProductList_products
    }
  }
}

fragment ProductList_products on ProductConnection {
  edges {
    node {
      id
      name
      imagePath
      attachmentPath
    }
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "categoryId"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "categoryId",
    "variableName": "categoryId"
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "ProductsPageQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Category",
        "kind": "LinkedField",
        "name": "fetchCategory",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          (v3/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "ProductConnection",
            "kind": "LinkedField",
            "name": "products",
            "plural": false,
            "selections": [
              {
                "args": null,
                "kind": "FragmentSpread",
                "name": "ProductList_products"
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "ProductsPageQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Category",
        "kind": "LinkedField",
        "name": "fetchCategory",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          (v3/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "ProductConnection",
            "kind": "LinkedField",
            "name": "products",
            "plural": false,
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
                      (v2/*: any*/),
                      (v3/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "imagePath",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "attachmentPath",
                        "storageKey": null
                      }
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "8de511e251cfa95b1f565ace97e0aac6",
    "id": null,
    "metadata": {},
    "name": "ProductsPageQuery",
    "operationKind": "query",
    "text": "query ProductsPageQuery(\n  $categoryId: ID!\n) {\n  fetchCategory(categoryId: $categoryId) {\n    id\n    name\n    products {\n      ...ProductList_products\n    }\n  }\n}\n\nfragment ProductList_products on ProductConnection {\n  edges {\n    node {\n      id\n      name\n      imagePath\n      attachmentPath\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = '74a0f2c10ddbc304c94618f001cd40c7';
export default node;
