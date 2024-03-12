import { useState } from "react";
import TextTimeout from "../TextTimeout";

export default function TimeoutText({ text }) {
  const [t, setT] = useState(text);
  return <TextTimeout text={t} setText={setT} />;
}
