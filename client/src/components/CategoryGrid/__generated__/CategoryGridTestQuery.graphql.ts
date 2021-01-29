/* tslint:disable */
/* eslint-disable */

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
    "type": "Query"
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
    "id": null,
    "metadata": {
      "relayTestingSelectionTypeInfo": {
        "categoryGridItems": {
          "type": "CategoryConnection",
          "enumValues": null,
          "plural": false,
          "nullable": false
        },
        "categoryGridItems.edges": {
          "type": "CategoryEdge",
          "enumValues": null,
          "plural": true,
          "nullable": true
        },
        "categoryGridItems.edges.node": {
          "type": "Category",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "categoryGridItems.edges.node.id": {
          "type": "ID",
          "enumValues": null,
          "plural": false,
          "nullable": false
        },
        "categoryGridItems.edges.node.name": {
          "type": "String",
          "enumValues": null,
          "plural": false,
          "nullable": false
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
