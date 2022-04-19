import React, { useEffect, useState } from "react";
import { Container, Button, DivGroup, Label, Input } from "./styled/StyledForm";

interface Urls {
  baseUrl: string;
  shortUrl: string;
  validTime: number;
  generated: boolean;
}

function App() {
  const [url, setUrl] = useState<string>("");
  const [validTime, setValidTime] = useState<number>(100);
  const [shortUrl, setShortUrl] = useState<Urls>({
    baseUrl: "",
    shortUrl: "",
    validTime: Date.now(),
    generated: false,
  });

  useEffect(() => {
    void 0;
  }, [validTime, shortUrl.generated]);

  const showValidTime = (validTime: number) => {
    console.log(Date.now());
    setInterval(() => {
      if (Date.now() + validTime > Date.now()) {
        setValidTime((validTime -= 1));
      }
    }, 1000);
  };

  const isValidURL = (url: string) => {
    const res = url.match(
      /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/
    );
    return url.length < 1000 && res !== null;
  };

  const generateMessage = () => {
    return !isValidURL(url) && url.length > 0
      ? "The url entered is not valid."
      : "";
  };
  const changeUrlHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const enteredValue = event.target.value;
    setUrl(enteredValue);
  };
  const changeValidTimeHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const enteredValue = event.target.value;
    setValidTime(parseInt(enteredValue));
  };

  const generateUrl = async (baseUrl: string, validTime: number) => {
    await fetch("http://localhost:8000/api/urls", {
      method: "POST",
      body: JSON.stringify({ baseUrl: baseUrl, validTime: validTime }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    }).then(async (response) => {
      const shortenedUrl = await response.json();
      setShortUrl({
        baseUrl: shortenedUrl.baseUrl,
        shortUrl: shortenedUrl.shortUrl,
        validTime: shortenedUrl.validTime,
        generated: true,
      });
      showValidTime(shortenedUrl.validTime);
    });
  };

  return (
    <>
      <Container>
        <h2>Shorten your URL here.</h2>
        <DivGroup>
          {validTime > 0 ? (
            <a href={shortUrl.baseUrl}>{shortUrl.shortUrl}</a>
          ) : (
            <span>Enter new url to shorten.</span>
          )}
        </DivGroup>
        <DivGroup>
          <Label>Url to shorten</Label>
          <Input
            value={url}
            type="text"
            name="baseUrl"
            onChange={changeUrlHandler}
          />
        </DivGroup>
        <DivGroup>
          <Label>Valid for (in seconds)</Label>
          <Input
            value={validTime}
            type="number"
            name="validtime"
            onChange={changeValidTimeHandler}
          />
        </DivGroup>
        <Button
          disabled={!isValidURL(url) || url.length > 1000}
          onClick={() => generateUrl(url, validTime)}
        >
          Generate URL
        </Button>
        {generateMessage()}
      </Container>
    </>
  );
}

export default App;
