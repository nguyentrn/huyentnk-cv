import { WordRotate } from "@/components/magicui/word-rotate";

export function WordRotateDemo() {
  return (
    <WordRotate
      className="text-4xl font-bold text-black dark:text-white"
      words={["Word", "Rotate"]}
    />
  );
}

function App() {
  return (
    <div className={"relative flex min-h-screen bg-blue-50"}>
      <div className={"sticky w-1/4 bg-red-500"}>Menu</div>
      <div className={"w-3/4"}>
        <div
          id={"home"}
          className={
            "flex min-h-screen items-center bg-purple-50 text-7xl tracking-wider"
          }
        >
          Hello!
          <br /> I am Khánh Huyền <WordRotateDemo />
        </div>
        <div id={"resume"}>
          <h2>Experience</h2>
          <h2>Education</h2>
          <h2>Skills</h2>
          <h2>Education</h2>
        </div>
        <div id={"services"}></div>
        <div id={"portfolio"}></div>
        <div id={"contact"}></div>
      </div>
    </div>
  );
}

export default App;
