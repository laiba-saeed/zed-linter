module.exports = {
  name: "linter",
  version: "0.0.1",
  description: "A simple linter integration plugin for ZED",
  author: "Laiba Saeed",

  activate: function () {
    var Zed = require("zed");

    // linting action
    Zed.actions.define("runLinter", function () {
      // linter logic (replace with real linter integration)
      var editorContent = Zed.getEditorContent();
      var lintErrors = runSampleLinter(editorContent);
      Zed.showLintErrors(lintErrors);
    });

    Zed.commands.add("Run Linter", "runLinter", {
      description: "Runs a linter on the current file",
    });
  },

  deactivate: function () {
    var Zed = require("zed");

    Zed.actions.remove("runLinter");
    Zed.commands.remove("Run Linter");
  },
};

// linter logic
function runSampleLinter(content) {
  let errors = [];

  // Check for lines exceeding 80 characters
  let lines = content.split("\n");
  lines.forEach((line, index) => {
    if (line.length > 80) {
      errors.push({
        line: index + 1,
        message: "Line exceeds 80 characters",
      });
    }
  });

  // Check indentation (assuming 2 spaces indentation)
  lines.forEach((line, index) => {
    if (/^\s+/.test(line) && !/^(\s{2})+/.test(line)) {
      errors.push({
        line: index + 1,
        message: "Incorrect indentation (expected 2 spaces)",
      });
    }
  });

  // Check variable naming conventions (assuming camelCase)
  lines.forEach((line, index) => {
    if (/\bvar [a-z]+_[a-z]+/.test(line)) {
      errors.push({
        line: index + 1,
        message: "Variable should use camelCase naming convention",
      });
    }
  });

  return errors;
}
