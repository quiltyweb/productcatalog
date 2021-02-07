/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type MessageStatus = "FAILURE" | "SUCCESS" | "%future added value";
export type ContactFormQueryVariables = {
    personalIdNumber: string;
    emailAddress: string;
    message: string;
    name?: string | null;
    phoneNumber?: string | null;
};
export type ContactFormQueryResponse = {
    readonly sendContactMessage: {
        readonly status: MessageStatus | null;
        readonly message: string;
    };
};
export type ContactFormQuery = {
    readonly response: ContactFormQueryResponse;
    readonly variables: ContactFormQueryVariables;
};



/*
query ContactFormQuery(
  $personalIdNumber: String!
  $emailAddress: String!
  $message: String!
  $name: String
  $phoneNumber: String
) {
  sendContactMessage(personalIdNumber: $personalIdNumber, emailAddress: $emailAddress, message: $message, name: $name, phoneNumber: $phoneNumber) {
    status
    message
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "emailAddress"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "message"
},
v2 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "name"
},
v3 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "personalIdNumber"
},
v4 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "phoneNumber"
},
v5 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "emailAddress",
        "variableName": "emailAddress"
      },
      {
        "kind": "Variable",
        "name": "message",
        "variableName": "message"
      },
      {
        "kind": "Variable",
        "name": "name",
        "variableName": "name"
      },
      {
        "kind": "Variable",
        "name": "personalIdNumber",
        "variableName": "personalIdNumber"
      },
      {
        "kind": "Variable",
        "name": "phoneNumber",
        "variableName": "phoneNumber"
      }
    ],
    "concreteType": "SendMessageResponse",
    "kind": "LinkedField",
    "name": "sendContactMessage",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "status",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "message",
        "storageKey": null
      }
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/),
      (v2/*: any*/),
      (v3/*: any*/),
      (v4/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "ContactFormQuery",
    "selections": (v5/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [
      (v3/*: any*/),
      (v0/*: any*/),
      (v1/*: any*/),
      (v2/*: any*/),
      (v4/*: any*/)
    ],
    "kind": "Operation",
    "name": "ContactFormQuery",
    "selections": (v5/*: any*/)
  },
  "params": {
    "cacheID": "c49e91fb37870e5fc8ddf3057a075dc1",
    "id": null,
    "metadata": {},
    "name": "ContactFormQuery",
    "operationKind": "query",
    "text": "query ContactFormQuery(\n  $personalIdNumber: String!\n  $emailAddress: String!\n  $message: String!\n  $name: String\n  $phoneNumber: String\n) {\n  sendContactMessage(personalIdNumber: $personalIdNumber, emailAddress: $emailAddress, message: $message, name: $name, phoneNumber: $phoneNumber) {\n    status\n    message\n  }\n}\n"
  }
};
})();
(node as any).hash = 'faa6a5194fd5752bd47363077fd626ca';
export default node;
