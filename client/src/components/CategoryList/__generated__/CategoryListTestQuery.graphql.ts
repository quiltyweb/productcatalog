/* tslint:disable */
/* eslint-disable */

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
    "type": "Query"
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
    "id": null,
    "metadata": {
      "relayTestingSelectionTypeInfo": {
        "categories": {
          "type": "CategoryConnection",
          "enumValues": null,
          "plural": false,
          "nullable": false
        },
        "categories.edges": {
          "type": "CategoryEdge",
          "enumValues": null,
          "plural": true,
          "nullable": true
        },
        "categories.edges.node": {
          "type": "Category",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "categories.edges.node.id": {
          "type": "ID",
          "enumValues": null,
          "plural": false,
          "nullable": false
        },
        "categories.edges.node.name": {
          "type": "String",
          "enumValues": null,
          "plural": false,
          "nullable": false
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
