/* tslint:disable */
/* eslint-disable */

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ProductsPageQueryVariables = {
    categoryName: string;
};
export type ProductsPageQueryResponse = {
    readonly searchProducts: {
        readonly " $fragmentRefs": FragmentRefs<"ProductList_products">;
    };
};
export type ProductsPageQuery = {
    readonly response: ProductsPageQueryResponse;
    readonly variables: ProductsPageQueryVariables;
};



/*
query ProductsPageQuery(
  $categoryName: String!
) {
  searchProducts(searchTerm: $categoryName) {
    ...ProductList_products
  }
}

fragment ProductList_products on ProductConnection {
  edges {
    node {
      id
      name
      description
      imagePath
    }
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "categoryName",
    "type": "String!"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "searchTerm",
    "variableName": "categoryName"
  }
];
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
        "concreteType": "ProductConnection",
        "kind": "LinkedField",
        "name": "searchProducts",
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
    "type": "Query"
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
        "concreteType": "ProductConnection",
        "kind": "LinkedField",
        "name": "searchProducts",
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
                    "name": "description",
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
        "storageKey": null
      }
    ]
  },
  "params": {
    "id": null,
    "metadata": {},
    "name": "ProductsPageQuery",
    "operationKind": "query",
    "text": "query ProductsPageQuery(\n  $categoryName: String!\n) {\n  searchProducts(searchTerm: $categoryName) {\n    ...ProductList_products\n  }\n}\n\nfragment ProductList_products on ProductConnection {\n  edges {\n    node {\n      id\n      name\n      description\n      imagePath\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = '55ada481cd5dfe0f024ce55742befb63';
export default node;
