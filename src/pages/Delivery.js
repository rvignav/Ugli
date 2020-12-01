import React from "react";
import Hero from "../components/Home/Hero";
import { FForm, Frame } from 'react-fullscreen-form';


export default function Delivery() {
  return (
    <div className="delivery page">
      <FForm title="" style={{top: 100}}>
    <Frame title="What's your name?">
      <input type="string" required />
    </Frame>
    <Frame title="What's your email address?">
      <input type="email" placeholder="mtkadayifci@gmail.com" required />
    </Frame>
    <Frame title="What's your phone number?">
      <input type="phone" required />
    </Frame>
    <Frame title="How old are you?">
      <input type="number" required />
    </Frame>
  </FForm>
  </div>
  );
}
