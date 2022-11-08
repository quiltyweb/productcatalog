import mailgunJS from "mailgun-js";
import faker from "faker";
import Email from "../../src/email";

jest.mock("mailgun-js", () => {
  const mMailgun = {
    messages: jest.fn().mockReturnThis(),
    send: jest.fn(),
  };
  return jest.fn(() => mMailgun);
});

describe("Email", () => {
  describe("send", () => {
    const sendOptions = {
      to: faker.internet.email(),
      from: faker.internet.email(),
      subject: faker.company.bs(),
      text: faker.lorem.paragraph(),
    };

    const mailgun = mailgunJS({ apiKey: "apikey", domain: "domain" });
    const messages = mailgun.messages();
    const mockSend = jest
      .spyOn(messages, "send")
      .mockImplementation(() =>
        Promise.resolve({ message: "hello world", id: "1234abcd" })
      );

    it("calls Mailgun's send function", async () => {
      await Email.send(sendOptions);

      expect(mockSend).toHaveBeenCalledTimes(1);
      expect(mockSend).toHaveBeenCalledWith(sendOptions);
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
