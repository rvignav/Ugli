import React from "react";
import Hero from "../components/Home/Hero";
import AboutBrief from "../components/Home/AboutBrief";
import CallToAction from "../components/Home/CallToAction";

export default function Home() {
  return (
    <div className="home page">
      <Hero />
      <div className="py-5">
        <div className="pt-3">
          <AboutBrief />
        </div>
        <div className="pb-3">
          <CallToAction />
        </div>
      </div>
    </div>
  );
}
