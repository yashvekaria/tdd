import React from "react";
import { render } from "@testing-library/react";
import App from "./App";

describe("<App> container tests", () => {
  beforeEach(() => {
    const invertName = (App.prototype.invertName = jest.fn());
  });

  test("renders learn react link", () => {
    const { getByText } = render(<App />);
    const linkElement = getByText(/learn react/i);
    expect(linkElement).toBeInTheDocument();
  });

  test("given null returns empty string", () => {
    assertInverted(null, "");
  });

  test("given empty string returns empty string", () => {
    assertInverted("", "");
  });

  test("given simple name returns simple name", () => {
    assertInverted("Name", "Name");
  });

  test("given simple name returns simple name", () => {
    assertInverted("Name", "Name");
  });

  test("given simple name with spaces returns simple name without spaces", () => {
    assertInverted(" Name ", "Name");
  });

  test("given first last returns last first", () => {
    assertInverted("First Last", "Last, First");
  });

  test("given first last with extra spaces returns last first", () => {
    assertInverted("  First  Last  ", "Last, First");
  });

  test("ignore Honorific", () => {
    assertInverted("Mr. First Last", "Last, First");
    assertInverted("Mrs. First Last", "Last, First");
  });

  test("post nominals stays at end", () => {
    assertInverted("First Last Sr.", "Last, First Sr.");
    assertInverted("First Last BS. Phd.", "Last, First BS. Phd.");
  });

  test("integration", () => {
    assertInverted("Mr.  Yash   Vekaria  III  Jr.", "Vekaria, Yash III Jr.");
  });

  const assertInverted = (originalName: string, invertedName: string) => {
    expect(invertedName).toBe(invertName(originalName));
  };

  const invertName = (name: string): string => {
    if (name == null || name.length <= 0) return "";
    else return formatName(removeHonorifics(splitNames(name)));
  };

  const splitNames = (name: string): string[] => {
    return name.trim().split(/\s+/);
  };

  const isHonorific = (word: string) => {
    return word.match(/^(Mr|Mrs)\./);
  };

  const removeHonorifics = (names: string[]) => {
    if (names.length > 1 && isHonorific(names[0])) names.splice(0, 1);
    return names;
  };

  const formatMultiElementName = (names: string[]) => {
    let postNominal = getPostNominals(names);
    const firstName = names[0];
    const lastName = names[1];
    return `${lastName}, ${firstName} ${postNominal}`.trim();
  };

  const formatName = (names: string[]) => {
    if (names.length === 1) {
      return names[0];
    } else {
      return formatMultiElementName(names);
    }
  };

  const getPostNominals = (names: string[]) => {
    let postNominalString = "";
    if (names.length > 2) {
      let postNominals = names.slice(2, names.length);
      postNominals.forEach((pn: string) => {
        postNominalString += pn + " ";
      });
    }
    return postNominalString;
  };
});
