/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type CategoryListTestQueryVariables = {};
export type CategoryListTestQueryResponse = {
    readonly categories: {
        readonly " $fragmentRefs": FragmentRefs<"CategoryList_categories">;
    };
};
export type CategoryListTestQuery = {
    readonly response: CategoryListTestQueryResponse;
    readonly variables: CategoryListTestQueryVariables;
};



/*
query CategoryListTestQuery {
  categories: fetchCategories {
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
    "name": "CategoryListTestQuery",
    "selections": [
      {
        "alias": "categories",
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
    "name": "CategoryListTestQuery",
    "selections": [
      {
        "alias": "categories",
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
    "cacheID": "2b233db0f0e874099997ad239a891e79",
    "id": null,
    "metadata": {
      "relayTestingSelectionTypeInfo": {
        "categories": {
          "enumValues": null,
          "nullable": false,
          "plural": false,
          "type": "CategoryConnection"
        },
        "categories.edges": {
          "enumValues": null,
          "nullable": true,
          "plural": true,
          "type": "CategoryEdge"
        },
        "categories.edges.node": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Category"
        },
        "categories.edges.node.id": {
          "enumValues": null,
          "nullable": false,
          "plural": false,
          "type": "ID"
        },
        "categories.edges.node.name": {
          "enumValues": null,
          "nullable": false,
          "plural": false,
          "type": "String"
        }
      }
    },
    "name": "CategoryListTestQuery",
    "operationKind": "query",
    "text": "query CategoryListTestQuery {\n  categories: fetchCategories {\n    ...CategoryList_categories\n  }\n}\n\nfragment CategoryList_categories on CategoryConnection {\n  edges {\n    node {\n      id\n      name\n    }\n  }\n}\n"
  }
};
(node as any).hash = '1b13adf4b998770435a58aee3abb3260';
export default node;
