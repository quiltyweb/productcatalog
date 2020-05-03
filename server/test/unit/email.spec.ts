import sgMail from "@sendgrid/mail";
import Response from "@sendgrid/helpers/classes/response";
import faker from "faker";

import Email from "../../src/email";

jest.mock("@sendgrid/mail");
const mockedSgMail = sgMail as jest.Mocked<typeof sgMail>;

describe("Email", () => {
  describe("send", () => {
    const sendOptions = {
      to: faker.internet.email(),
      from: faker.internet.email(),
      subject: faker.company.bs(),
      text: faker.lorem.paragraph(),
    };

    mockedSgMail.send.mockReturnValue(
      Promise.resolve([new Response(200, {}), {}])
    );

    it("calls sendgrid's send function", async () => {
      await Email.send(sendOptions);

      expect(mockedSgMail.send.mock.calls.length).toEqual(1);
    });

    it("returns a result object", async () => {
      const response = await Email.send(sendOptions);
      expect(response).toEqual({
        status: "success",
        message: "Email was sent",
      });
    });

    // TODO: Test handling of an error response from SendGrid when we have
    // the time/patience to figure out how to properly mock it.
  });
});
