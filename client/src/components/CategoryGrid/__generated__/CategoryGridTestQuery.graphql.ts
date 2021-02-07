/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type CategoryGridTestQueryVariables = {};
export type CategoryGridTestQueryResponse = {
    readonly categoryGridItems: {
        readonly " $fragmentRefs": FragmentRefs<"CategoryGrid_categoryGridItems">;
    };
};
export type CategoryGridTestQuery = {
    readonly response: CategoryGridTestQueryResponse;
    readonly variables: CategoryGridTestQueryVariables;
};



/*
query CategoryGridTestQuery {
  categoryGridItems: fetchCategories {
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
*/

const node: ConcreteRequest = {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "CategoryGridTestQuery",
    "selections": [
      {
        "alias": "categoryGridItems",
        "args": null,
        "concreteType": "CategoryConnection",
        "kind": "LinkedField",
        "name": "fetchCategories",
        "plural": false,
        "selections": [
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
    "name": "CategoryGridTestQuery",
    "selections": [
      {
        "alias": "categoryGridItems",
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
    "cacheID": "5f84079cc9e51d660bbdd44c34c07d48",
    "id": null,
    "metadata": {
      "relayTestingSelectionTypeInfo": {
        "categoryGridItems": {
          "enumValues": null,
          "nullable": false,
          "plural": false,
          "type": "CategoryConnection"
        },
        "categoryGridItems.edges": {
          "enumValues": null,
          "nullable": true,
          "plural": true,
          "type": "CategoryEdge"
        },
        "categoryGridItems.edges.node": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Category"
        },
        "categoryGridItems.edges.node.id": {
          "enumValues": null,
          "nullable": false,
          "plural": false,
          "type": "ID"
        },
        "categoryGridItems.edges.node.name": {
          "enumValues": null,
          "nullable": false,
          "plural": false,
          "type": "String"
        }
      }
    },
    "name": "CategoryGridTestQuery",
    "operationKind": "query",
    "text": "query CategoryGridTestQuery {\n  categoryGridItems: fetchCategories {\n    ...CategoryGrid_categoryGridItems\n  }\n}\n\nfragment CategoryGrid_categoryGridItems on CategoryConnection {\n  edges {\n    node {\n      id\n      name\n    }\n  }\n}\n"
  }
};
(node as any).hash = '4e538774318e1a6c4f06089778d71f4c';
export default node;
