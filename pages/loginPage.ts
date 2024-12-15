import { expect, Locator, Page } from "@playwright/test";

export class LoginPage {
  // Attributes

  // Create Account
  createAccountButton: Locator;
  firstNameField: Locator;
  lastNameField: Locator;
  emailField: Locator;
  passwordField: Locator;
  confirmPasswordField: Locator;
  createAccountSubmitButton: Locator;
  myAccountHeading: Locator;
  mainContent: Locator;

  // Sign In
  signInButton: Locator;
  signInEmailField: Locator;
  signInPasswordField: Locator;
  signInSubmitButton: Locator;
  bannerWelcomeMessage: Locator;
  bannerChangeButton: Locator;
  myAccountLink: Locator;

  // Constructor
  constructor(page: Page) {
    // Create Account locators
    this.createAccountButton = page.getByRole("link", {
      name: "Create an Account",
    });
    this.firstNameField = page.getByLabel("First Name");
    this.lastNameField = page.getByLabel("Last Name");
    this.emailField = page.getByLabel("Email", { exact: true });
    this.passwordField = page.getByRole("textbox", {
      name: "Password*",
      exact: true,
    });
    this.confirmPasswordField = page.getByLabel("Confirm Password");
    this.createAccountSubmitButton = page.getByRole("button", {
      name: "Create an Account",
    });
    this.myAccountHeading = page
      .getByRole("heading", { name: "My Account" })
      .locator("span");
    this.mainContent = page.locator("#maincontent");

    // Sign In locators
    this.signInButton = page.getByRole("link", { name: "Sign In" });
    this.signInEmailField = page.getByLabel("Email", { exact: true });
    this.signInPasswordField = page.getByLabel("Password");
    this.signInSubmitButton = page.getByRole("button", { name: "Sign In" });
    this.bannerWelcomeMessage = page.getByRole("banner").getByText("Welcome,");
    this.bannerChangeButton = page
      .getByRole("banner")
      .locator("button")
      .filter({ hasText: "Change" });
    this.myAccountLink = page.getByRole("link", { name: "My Account" });
  }

  // Methods

  async createAccount(
    firstName: string,
    lastName: string,
    email: string,
    password: string
  ) {
    await this.createAccountButton.click();
    await this.firstNameField.fill(firstName);
    await this.lastNameField.fill(lastName);
    await this.emailField.fill(email);
    await this.passwordField.fill(password);
    await this.confirmPasswordField.fill(password);
    await this.createAccountSubmitButton.click();
  }

  async verifyAccountCreation(
    firstName: string,
    lastName: string,
    email: string
  ) {
    await expect(this.myAccountHeading).toBeVisible();
    await expect(this.mainContent).toMatchAriaSnapshot(`
      - strong: Contact Information
      - paragraph: ${firstName} ${lastName} ${email}
      - link "Edit"
      - link "Change Password"
      `);
  }

  async signIn(email: string, password: string) {
    await this.signInButton.click();
    await this.signInEmailField.fill(email);
    await this.signInPasswordField.fill(password);
    await this.signInSubmitButton.click();
  }

  async verifySignIn(firstName: string, lastName: string, email: string) {
    await expect(this.bannerWelcomeMessage).toHaveText(
      `Welcome, ${firstName} ${lastName}!`
    );
    await this.bannerChangeButton.click();
    await this.myAccountLink.click();
    await expect(this.mainContent).toMatchAriaSnapshot(`
      - strong: Contact Information
      - paragraph: ${firstName} ${lastName} ${email}
      - link "Edit"
      - link "Change Password"
      `);
  }
}
