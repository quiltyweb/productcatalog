import React from "react";
import {
  GoogleReCaptchaProvider,
  useGoogleReCaptcha,
} from "react-google-recaptcha-v3";
import { Button } from "fannypack";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

export interface IGoogleRecaptchaProps {
  onVerifyCaptcha: (token: string) => void | Promise<void>;
}

const CaptchaButton: React.FunctionComponent<IGoogleRecaptchaProps> = ({
  onVerifyCaptcha,
}) => {
  const [token, setToken] = React.useState<string>();
  const { executeRecaptcha } = useGoogleReCaptcha();
  const clickHandler = async () => {
    if (!executeRecaptcha) {
      return;
    }

    const token = await executeRecaptcha("contact");
    setToken(token);
    onVerifyCaptcha(token);
  };

  return (
    <Button
      margin="major-2"
      padding="major-1"
      type="button"
      palette={token ? "success" : "danger"}
      kind="outlined"
      onClick={clickHandler}
    >
      {token && (
        <FontAwesomeIcon
          style={{ marginRight: "0.2rem" }}
          size="lg"
          color="#0fe20f"
          icon={faCheck}
        />
      )}{" "}
      No soy robot!
    </Button>
  );
};

export const ReCaptcha: React.FunctionComponent<IGoogleRecaptchaProps> = ({
  onVerifyCaptcha,
}) => (
  <GoogleReCaptchaProvider reCaptchaKey="6LcBE78ZAAAAADIHm2nfA1P8S0Kr36OJiMhVcRDq">
    <CaptchaButton onVerifyCaptcha={onVerifyCaptcha} />
  </GoogleReCaptchaProvider>
);
