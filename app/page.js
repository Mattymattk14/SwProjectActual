"use cleint";

import JaaraInfo from "./JaaraInfo";
import GetMonsterInfo from "/GetMonstInfo";

export default function Home() {
  return (
    <>
      <h1>Summoners War Monster Info</h1>
      {/* <JaaraInfo /> */}
      <GetMonsterInfo />
    </>
  );
}
