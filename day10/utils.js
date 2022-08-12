const matchingPairs = new Map();
matchingPairs.set("[", "]");
matchingPairs.set("{", "}");
matchingPairs.set("<", ">");
matchingPairs.set("(", ")");

export default class BracketStack {
  constructor() {
    this.top = -1;
    this.st = [];
  }

  reset() {
    this.top = -1;
    this.st = [];
  }
  pushOpening(bracketChar) {
    this.top += 1;
    this.st[this.top] = bracketChar;
  }

  pushClosingAndPop(bracketChar) {
    // if current top before pushing == bracketChar, pop the top, no need to insert
    if (bracketChar === matchingPairs.get(this.st[this.top])) {
      this.pop();
      return "";
    }
    // if it doesnt match, thats where it goes wrong, return the incoming bracket char as the illegal character
    return bracketChar;
  }

  pushClosingAndPopDontReturn(bracketChar) {
    // if current top before pushing == bracketChar, pop the top, no need to insert
    if (bracketChar === matchingPairs.get(this.st[this.top])) {
      this.pop();
    }
  }

  pop() {
    this.st.pop();
    this.top -= this.top > -1 ? 1 : 0; // decrement top by 1 if not empty
  }
}
