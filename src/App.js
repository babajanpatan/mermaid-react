import React, { useEffect, useState } from "react";
import "./styles.css";
import mermaid, { mermaidAPI } from "mermaid";

mermaid.initialize({
  theme: "base",
  themeVariables: {
    primaryColor: "#fff",
    mainBkg: "#eee",
    primaryBorderColor: "#aaa",
    fontFamily: "monospace"
  },
  sequence: {
    actorFontFamily: "monospace",
    messageFontFamily: "monospace",
    messageFontWeight: "100",
    messageFontSize: "12px",
    boxMargin: 10,
    actorMargin: 8,
    height: 40,
    mirrorActors: false
  }
});

const stateDiagram1 = `
graph TB
  Enemy -- creates --> Bullet
  Bullet -- hits --> Player
  Player -- updates --> HealthBar
  Bullet -- notifies --> Enemy
  Bullet -- hits --> Player
`;

const stateDiagram2 = `
graph LR
  InputManager -- jump pressed --> EventManager
  EventManager -- landed on ground --> PlayerSoundEffects
  EventManager -- player hit by bullet --> PlayerSoundEffects
  Player -- landed on ground --> EventManager
  Player -- player hp updated --> EventManager
  EventManager -- player hit by bullet --> Player
  EventManager -- jump pressed --> Player
  EventManager -- bullet fired --> BulletManager
  BulletManager -- creates --> Bullet
  Bullet -- player hit by bullet --> EventManager
  Enemy -- bullet fired --> EventManager
  EventManager -- player hit by bullet --> Enemy
  HealthBar -- health bar updated --> EventManager
  EventManager -- player hp updated --> HealthBar
`;

const stateDiagram3 = `
sequenceDiagram
  participant EventManager

  InputManager->>EventManager: jump pressed
  EventManager->>Player: jump pressed
  Player->>EventManager: jumped
  Player->>EventManager: landed on ground
  EventManager->>PlayerSoundEffects: landed on ground
`;

const useDiagram = (name, text) => {
  const [render, setRender] = useState("");
  useEffect(() => {
    setRender(mermaidAPI.render(name, text));
  }, [setRender, name, text]);

  return render;
};

export default function App() {
  const [updatedDiagram1, setUpdatedDiagram1] = useState(stateDiagram1);
  const [updatedDiagram2, setUpdatedDiagram2] = useState(stateDiagram2);
  const [updatedDiagram3, setUpdatedDiagram3] = useState(stateDiagram3);
  const [updatedDiagram11, setUpdatedDiagram11] = useState(stateDiagram1);
  const [updatedDiagram22, setUpdatedDiagram22] = useState(stateDiagram2);
  const [updatedDiagram33, setUpdatedDiagram33] = useState(stateDiagram3);

  const handleDiagramUpdate = (name) => {
    switch (name) {
      case "a":
        setUpdatedDiagram1(updatedDiagram11);
        break;
      case "b":
        setUpdatedDiagram2(updatedDiagram22);
        break;
      case "c":
        setUpdatedDiagram3(updatedDiagram33);
        break;
      default:
        break;
    }
  };

  return (
    <div className="App">
      <textarea
        type="text"
        value={updatedDiagram11}
        onChange={(e) => setUpdatedDiagram11(e.target.value)}
      />
      <button onClick={() => handleDiagramUpdate("a")}>Update A</button>

      <textarea
        type="text"
        value={updatedDiagram22}
        onChange={(e) => setUpdatedDiagram22(e.target.value)}
      />
      <button onClick={() => handleDiagramUpdate("b")}>Update B</button>

      <textarea
        type="text"
        value={updatedDiagram33}
        onChange={(e) => setUpdatedDiagram33(e.target.value)}
      />
      <button onClick={() => handleDiagramUpdate("c")}>Update C</button>

      <Diagram name="a" definition={updatedDiagram1} />
      <Diagram name="b" definition={updatedDiagram2} />
      <Diagram name="c" definition={updatedDiagram3} />
    </div>
  );
}

const Diagram = ({ name, definition }) => {
  const diagram = useDiagram(name, definition);

  return (
    <div className="mermaid" dangerouslySetInnerHTML={{ __html: diagram }} />
  );
};
