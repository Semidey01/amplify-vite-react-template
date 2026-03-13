/**
 * GitHub Classroom Autograding Tests
 *
 * These tests verify that students have completed the frontend updates
 * from the Amplify quickstart tutorial:
 * https://docs.amplify.aws/react/start/quickstart/#make-frontend-updates
 *
 * Step 5: Add delete functionality to App.tsx
 * Step 6: Add login/authentication UI to main.tsx and App.tsx
 */

import { readFileSync } from "fs";
import { resolve } from "path";
import { describe, it, expect } from "vitest";

const srcDir = resolve(__dirname, "..");
const appSource = readFileSync(resolve(srcDir, "App.tsx"), "utf-8");
const mainSource = readFileSync(resolve(srcDir, "main.tsx"), "utf-8");

// ---------------------------------------------------------------------------
// Step 5 – Delete Todo Functionality (App.tsx)
// ---------------------------------------------------------------------------
describe("Step 5: Delete todo functionality", () => {
  it("should define a deleteTodo function in App.tsx", () => {
    // The tutorial adds: function deleteTodo(id: string) { ... }
    expect(appSource).toMatch(/function\s+deleteTodo\s*\(/);
  });

  it("should call client.models.Todo.delete inside deleteTodo", () => {
    // The tutorial calls: client.models.Todo.delete({ id })
    expect(appSource).toMatch(/client\.models\.Todo\.delete/);
  });

  it("should attach an onClick handler to list items that calls deleteTodo", () => {
    // The tutorial adds onClick={() => deleteTodo(todo.id)} to <li>
    expect(appSource).toMatch(/onClick\s*=\s*\{.*deleteTodo/);
  });
});

// ---------------------------------------------------------------------------
// Step 6 – Login / Authentication UI
// ---------------------------------------------------------------------------
describe("Step 6a: Authenticator wrapper in main.tsx", () => {
  it("should import Authenticator from @aws-amplify/ui-react", () => {
    expect(mainSource).toMatch(
      /import\s+\{[^}]*Authenticator[^}]*\}\s+from\s+['"]@aws-amplify\/ui-react['"]/
    );
  });

  it("should import @aws-amplify/ui-react styles", () => {
    expect(mainSource).toMatch(
      /import\s+['"]@aws-amplify\/ui-react\/styles\.css['"]/
    );
  });

  it("should wrap the App component with <Authenticator>", () => {
    // Expect <Authenticator> to appear before <App and </Authenticator> after
    expect(mainSource).toMatch(/<Authenticator[\s>]/);
    expect(mainSource).toMatch(/<\/Authenticator>/);
  });
});

describe("Step 6b: Sign-out button in App.tsx", () => {
  it("should import useAuthenticator from @aws-amplify/ui-react", () => {
    expect(appSource).toMatch(
      /import\s+\{[^}]*useAuthenticator[^}]*\}\s+from\s+['"]@aws-amplify\/ui-react['"]/
    );
  });

  it("should destructure signOut from useAuthenticator", () => {
    // e.g. const { signOut } = useAuthenticator();
    expect(appSource).toMatch(/useAuthenticator\s*\(/);
    expect(appSource).toMatch(/signOut/);
  });

  it("should render a sign-out button", () => {
    // Expect a button with onClick={signOut} or similar
    expect(appSource).toMatch(/<button\s[^>]*onClick\s*=\s*\{signOut\}/);
  });
});
