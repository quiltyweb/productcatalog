/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type HomePageQueryVariables = {};
export type HomePageQueryResponse = {
    readonly fetchCategories: {
        readonly " $fragmentRefs": FragmentRefs<"CategoryList_categories" | "CategoryGrid_categoryGridItems">;
    };
};
export type HomePageQuery = {
    readonly response: HomePageQueryResponse;
    readonly variables: HomePageQueryVariables;
};



/*
query HomePageQuery {
  fetchCategories {
    ...CategoryList_categories
    ...CategoryGrid_categoryGridItems
  }
}

fragment CategoryGrid_categoryGridItems on CategoryConnection {
  edges {
    node {
      id
      name
    }
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
    "name": "HomePageQuery",
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
          },
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "CategoryGrid_categoryGridItems"
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
    "name": "HomePageQuery",
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
    "cacheID": "4acfbce5a85656411940ddc5c1e19c1e",
    "id": null,
    "metadata": {},
    "name": "HomePageQuery",
    "operationKind": "query",
    "text": "query HomePageQuery {\n  fetchCategories {\n    ...CategoryList_categories\n    ...CategoryGrid_categoryGridItems\n  }\n}\n\nfragment CategoryGrid_categoryGridItems on CategoryConnection {\n  edges {\n    node {\n      id\n      name\n    }\n  }\n}\n\nfragment CategoryList_categories on CategoryConnection {\n  edges {\n    node {\n      id\n      name\n    }\n  }\n}\n"
  }
};
(node as any).hash = '2f781d8db916d92285c8743fa5003227';
export default node;
