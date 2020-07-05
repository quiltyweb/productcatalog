/* tslint:disable */
/* eslint-disable */

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type SearchResultsPageQueryVariables = {
    searchTerm: string;
};
export type SearchResultsPageQueryResponse = {
    readonly searchProducts: {
        readonly " $fragmentRefs": FragmentRefs<"ProductList_products">;
    };
};
export type SearchResultsPageQuery = {
    readonly response: SearchResultsPageQueryResponse;
    readonly variables: SearchResultsPageQueryVariables;
};



/*
query SearchResultsPageQuery(
  $searchTerm: String!
) {
  searchProducts(searchTerm: $searchTerm) {
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
    "name": "searchTerm",
    "type": "String!"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "searchTerm",
    "variableName": "searchTerm"
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "SearchResultsPageQuery",
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
    "name": "SearchResultsPageQuery",
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
    "name": "SearchResultsPageQuery",
    "operationKind": "query",
    "text": "query SearchResultsPageQuery(\n  $searchTerm: String!\n) {\n  searchProducts(searchTerm: $searchTerm) {\n    ...ProductList_products\n  }\n}\n\nfragment ProductList_products on ProductConnection {\n  edges {\n    node {\n      id\n      name\n      description\n      imagePath\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = '16585a3f76e75b6273eaa7baca144788';
export default node;
