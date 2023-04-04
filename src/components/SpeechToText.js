import React, { useState } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { Form, FormGroup, Label, Input } from "reactstrap";
import spacy from "spacy";
import fetch from "node-fetch";

const SpeechToText = () => {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");

  const { transcript, resetTranscript } = useSpeechRecognition();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const nlp = await spacy.load("en_core_web_sm", {
      fetch: fetch,
    });

    const doc = await nlp(transcript);

    doc.ents.forEach((ent) => {
      if (ent.label_ === "PERSON") {
        setName(ent.text);
      } else if (ent.label_ === "AGE") {
        setAge(ent.text);
      } else if (ent.label_ === "GENDER") {
        setGender(ent.text);
      } else if (ent.label_ === "EMAIL") {
        setEmail(ent.text);
      } else if (ent.label_ === "ADDRESS") {
        setAddress(ent.text);
      }
    });

    resetTranscript();
  };

  if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
    return null;
  }

  return (
    <div>
      <button onClick={SpeechRecognition.startListening}>Start</button>
      <button onClick={SpeechRecognition.stopListening}>Stop</button>
      <button onClick={resetTranscript}>Reset</button>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label for="name">Name</Label>
          <Input
            type="text"
            name="name"
            id="name"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Label for="age">Age</Label>
          <Input
            type="text"
            name="age"
            id="age"
            placeholder="Enter your age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Label for="gender">Gender</Label>
          <Input
            type="text"
            name="gender"
            id="gender"
            placeholder="Enter your gender"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Label for="email">Email</Label>
          <Input
            type="email"
            name="email"
            id="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Label for="address">Address</Label>
          <Input
            type="text"
            name="address"
            id="address"
            placeholder="Enter your address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </FormGroup>
        <button type="submit">Submit</button>
      </Form>
    </div>
  );
};

export default SpeechToText;
