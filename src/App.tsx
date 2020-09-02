import React from "react";
import logo from "./logo.svg";
import "./App.css";

interface IProps {}

class App extends React.Component<IProps, {}> {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.tsx</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
  }

  invertName = (name: string): string => {
    if (name == null || name.length <= 0) return "";
    else return this.formatName(this.removeHonorifics(this.splitNames(name)));
  };

  splitNames = (name: string): string[] => {
    return name.trim().split(/\s+/);
  };

  isHonorific = (word: string) => {
    return word.match(/^(Mr|Mrs)\./);
  };

  removeHonorifics = (names: string[]) => {
    if (names.length > 1 && this.isHonorific(names[0])) names.splice(0, 1);
    return names;
  };

  formatMultiElementName = (names: string[]) => {
    let postNominal = this.getPostNominals(names);
    const firstName = names[0];
    const lastName = names[1];
    return `${lastName}, ${firstName} ${postNominal}`.trim();
  };

  formatName = (names: string[]) => {
    if (names.length === 1) {
      return names[0];
    } else {
      return this.formatMultiElementName(names);
    }
  };

  getPostNominals = (names: string[]) => {
    let postNominalString = "";
    if (names.length > 2) {
      let postNominals = names.slice(2, names.length);
      postNominals.forEach((pn: string) => {
        postNominalString += pn + " ";
      });
    }
    return postNominalString;
  };
}

export default App;
