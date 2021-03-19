/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type CategorySideBarQueryVariables = {};
export type CategorySideBarQueryResponse = {
    readonly fetchCategories: {
        readonly " $fragmentRefs": FragmentRefs<"CategoryList_categories">;
    };
};
export type CategorySideBarQuery = {
    readonly response: CategorySideBarQueryResponse;
    readonly variables: CategorySideBarQueryVariables;
};



/*
query CategorySideBarQuery {
  fetchCategories {
    ...CategoryList_categories
  }
}

fragment CategoryList_categories on CategoryConnection {
  edges {
    node {
      id
      name
    }
  }
}
*/

const node: ConcreteRequest = {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "CategorySideBarQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "CategoryConnection",
        "kind": "LinkedField",
        "name": "fetchCategories",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "CategoryList_categories"
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
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "CategorySideBarQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "CategoryConnection",
        "kind": "LinkedField",
        "name": "fetchCategories",
        "plural": false,
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
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "54e71d6624fb71a96251d3695eb021cb",
    "id": null,
    "metadata": {},
    "name": "CategorySideBarQuery",
    "operationKind": "query",
    "text": "query CategorySideBarQuery {\n  fetchCategories {\n    ...CategoryList_categories\n  }\n}\n\nfragment CategoryList_categories on CategoryConnection {\n  edges {\n    node {\n      id\n      name\n    }\n  }\n}\n"
  }
};
(node as any).hash = 'c086aea8be81ef6d2214273bdfb0105c';
export default node;
