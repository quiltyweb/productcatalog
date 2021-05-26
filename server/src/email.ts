import Mailgun from "mailgun-js";

type SendOptions = {
  to: string;
  from: string;
  subject: string;
  text: string;
  html?: string;
};

export type SendEmailResponse = {
  status: string;
  message: string;
};

export type SendEmail = (
  sendOptions: SendOptions
) => Promise<SendEmailResponse>;

declare interface Email {
  send: (sendOptions: SendOptions) => Promise<SendEmailResponse>;
}

const Email: Email = {
  send: async (sendOptions: SendOptions): Promise<SendEmailResponse> => {
    const mailgun = new Mailgun({
      apiKey: process.env.MAILGUN_API_KEY,
      domain: process.env.MAILGUN_DOMAIN,
    });

    try {
      await mailgun.messages().send({
        ...sendOptions,
      });
    } catch (error) {
      console.error(JSON.stringify(error));

      const responseBody = error.response.body || { errors: ["Unknown error"] };
      const errorMessages = JSON.stringify(responseBody.errors);

      return { status: "failure", message: errorMessages };
    }
    return { status: "success", message: "Email was sent" };
  },
};

export default Email;
