import * as relayRuntime from "relay-runtime";

export const setQueryResponse = (
  type: "resolve" | "reject",
  payload: unknown
): void => {
  const returnValue: Promise<any> =
    type === "resolve" ? Promise.resolve(payload) : Promise.reject(payload);

  (relayRuntime.fetchQuery as jest.Mock).mockReturnValue(returnValue);
};
