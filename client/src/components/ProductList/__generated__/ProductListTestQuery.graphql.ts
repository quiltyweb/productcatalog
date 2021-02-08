/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ProductListTestQueryVariables = {
    categoryId: string;
};
export type ProductListTestQueryResponse = {
    readonly fetchCategory: {
        readonly id: string;
        readonly name: string;
        readonly products: {
            readonly " $fragmentRefs": FragmentRefs<"ProductList_products">;
        };
    };
};
export type ProductListTestQuery = {
    readonly response: ProductListTestQueryResponse;
    readonly variables: ProductListTestQueryVariables;
};



/*
query ProductListTestQuery(
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
},
v4 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "ID"
},
v5 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "String"
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "ProductListTestQuery",
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
    "name": "ProductListTestQuery",
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
    "cacheID": "5c34dafaf8d0d6235662ac6b66568bf6",
    "id": null,
    "metadata": {
      "relayTestingSelectionTypeInfo": {
        "fetchCategory": {
          "enumValues": null,
          "nullable": false,
          "plural": false,
          "type": "Category"
        },
        "fetchCategory.id": (v4/*: any*/),
        "fetchCategory.name": (v5/*: any*/),
        "fetchCategory.products": {
          "enumValues": null,
          "nullable": false,
          "plural": false,
          "type": "ProductConnection"
        },
        "fetchCategory.products.edges": {
          "enumValues": null,
          "nullable": true,
          "plural": true,
          "type": "ProductEdge"
        },
        "fetchCategory.products.edges.node": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Product"
        },
        "fetchCategory.products.edges.node.attachmentPath": (v5/*: any*/),
        "fetchCategory.products.edges.node.id": (v4/*: any*/),
        "fetchCategory.products.edges.node.imagePath": (v5/*: any*/),
        "fetchCategory.products.edges.node.name": (v5/*: any*/)
      }
    },
    "name": "ProductListTestQuery",
    "operationKind": "query",
    "text": "query ProductListTestQuery(\n  $categoryId: ID!\n) {\n  fetchCategory(categoryId: $categoryId) {\n    id\n    name\n    products {\n      ...ProductList_products\n    }\n  }\n}\n\nfragment ProductList_products on ProductConnection {\n  edges {\n    node {\n      id\n      name\n      imagePath\n      attachmentPath\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = '5dc9f4176ff215a5e114619b0232a365';
export default node;
