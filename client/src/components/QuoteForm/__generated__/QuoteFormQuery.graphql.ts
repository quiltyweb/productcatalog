/* tslint:disable */
/* eslint-disable */

import { ConcreteRequest } from "relay-runtime";
export type MessageStatus = "FAILURE" | "SUCCESS" | "%future added value";
export type QuoteRequestInput = {
    personalDetails: PersonalDetailsForQuoteInput;
    productsToQuote: Array<ProductsToQuoteInput>;
};
export type PersonalDetailsForQuoteInput = {
    personalIdNumber: string;
    emailAddress: string;
    message?: string | null;
    name: string;
    companyName?: string | null;
    phoneNumber?: string | null;
    city?: string | null;
};
export type ProductsToQuoteInput = {
    productId?: string | null;
    quantity?: number | null;
};
export type QuoteFormQueryVariables = {
    input: QuoteRequestInput;
};
export type QuoteFormQueryResponse = {
    readonly sendQuoteRequest: {
        readonly status: MessageStatus | null;
        readonly message: string;
    };
};
export type QuoteFormQuery = {
    readonly response: QuoteFormQueryResponse;
    readonly variables: QuoteFormQueryVariables;
};



/*
query QuoteFormQuery(
  $input: QuoteRequestInput!
) {
  sendQuoteRequest(input: $input) {
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
    "name": "input",
    "type": "QuoteRequestInput!"
  }
],
v1 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "input",
        "variableName": "input"
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
    "name": "QuoteFormQuery",
    "selections": (v1/*: any*/),
    "type": "Query"
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "QuoteFormQuery",
    "selections": (v1/*: any*/)
  },
  "params": {
    "id": null,
    "metadata": {},
    "name": "QuoteFormQuery",
    "operationKind": "query",
    "text": "query QuoteFormQuery(\n  $input: QuoteRequestInput!\n) {\n  sendQuoteRequest(input: $input) {\n    status\n    message\n  }\n}\n"
  }
};
})();
(node as any).hash = '04df1f45e9aa1587c1f5d53ed76cca6d';
export default node;
