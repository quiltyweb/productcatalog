/* tslint:disable */
/* eslint-disable */

import { ConcreteRequest } from "relay-runtime";
export type MessageStatus = "FAILURE" | "SUCCESS" | "%future added value";
export type QuoteFormSendQuoteRequestQueryVariables = {
    personalIdNumber: string;
    emailAddress: string;
    message?: string | null;
    name: string;
    companyName?: string | null;
    phoneNumber?: string | null;
    city?: string | null;
};
export type QuoteFormSendQuoteRequestQueryResponse = {
    readonly sendQuoteRequest: {
        readonly status: MessageStatus | null;
        readonly message: string;
    };
};
export type QuoteFormSendQuoteRequestQuery = {
    readonly response: QuoteFormSendQuoteRequestQueryResponse;
    readonly variables: QuoteFormSendQuoteRequestQueryVariables;
};



/*
query QuoteFormSendQuoteRequestQuery(
  $personalIdNumber: String!
  $emailAddress: String!
  $message: String
  $name: String!
  $companyName: String
  $phoneNumber: String
  $city: String
) {
  sendQuoteRequest(personalIdNumber: $personalIdNumber, emailAddress: $emailAddress, message: $message, name: $name, companyName: $companyName, phoneNumber: $phoneNumber, city: $city) {
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
    "type": "String"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "name",
    "type": "String!"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "companyName",
    "type": "String"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "phoneNumber",
    "type": "String"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "city",
    "type": "String"
  }
],
v1 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "city",
        "variableName": "city"
      },
      {
        "kind": "Variable",
        "name": "companyName",
        "variableName": "companyName"
      },
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
    "name": "sendQuoteRequest",
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
    "name": "QuoteFormSendQuoteRequestQuery",
    "selections": (v1/*: any*/),
    "type": "Query"
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "QuoteFormSendQuoteRequestQuery",
    "selections": (v1/*: any*/)
  },
  "params": {
    "id": null,
    "metadata": {},
    "name": "QuoteFormSendQuoteRequestQuery",
    "operationKind": "query",
    "text": "query QuoteFormSendQuoteRequestQuery(\n  $personalIdNumber: String!\n  $emailAddress: String!\n  $message: String\n  $name: String!\n  $companyName: String\n  $phoneNumber: String\n  $city: String\n) {\n  sendQuoteRequest(personalIdNumber: $personalIdNumber, emailAddress: $emailAddress, message: $message, name: $name, companyName: $companyName, phoneNumber: $phoneNumber, city: $city) {\n    status\n    message\n  }\n}\n"
  }
};
})();
(node as any).hash = '48fb5d48eab15cc3c9a030411f711a7f';
export default node;
