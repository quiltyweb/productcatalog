/* tslint:disable */
/* eslint-disable */

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
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "personalIdNumber",
    "type": "String!"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "emailAddress",
    "type": "String!"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "message",
    "type": "String!"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "name",
    "type": "String"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "phoneNumber",
    "type": "String"
  }
],
v1 = [
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
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "ContactFormQuery",
    "selections": (v1/*: any*/),
    "type": "Query"
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "ContactFormQuery",
    "selections": (v1/*: any*/)
  },
  "params": {
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
