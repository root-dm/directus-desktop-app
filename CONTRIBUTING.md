# Contributing to Directus Desktop App

First off, thank you for considering contributing to this project! 🎉

We welcome contributions of all kinds, whether it's reporting bugs, improving documentation, submitting feature requests, or writing code. Below is a guide to help you get started with contributing to the **Directus Desktop App** project.

## Table of Contents

1. [How to Report a Bug](#how-to-report-a-bug)
2. [How to Suggest a Feature](#how-to-suggest-a-feature)
3. [Submitting Pull Requests](#submitting-pull-requests)
4. [Coding Guidelines](#coding-guidelines)
5. [Development Setup](#development-setup)
6. [License](#license)

---

## How to Report a Bug

If you encounter any bugs while using the app, please create an issue in the [GitHub Issues](https://github.com/root-dm/directus-desktop-app/issues) page. Please include:

- A clear and concise description of the bug.
- Steps to reproduce the issue.
- Screenshots or error logs (if applicable).
- Your operating system and app version.

## How to Suggest a Feature

Have an idea for a new feature? We’d love to hear about it! To propose a new feature:

1. Create a new issue in the [GitHub Issues](https://github.com/root-dm/directus-desktop-app/issues) page and select the "Feature Request" template.
2. Provide a detailed explanation of the feature and its benefits.

We may discuss your idea with you before deciding whether it fits within the project’s scope.

## Submitting Pull Requests

### Steps

1. Fork the repository and clone it to your local machine.
2. Create a new branch for your feature or fix:
```bash git checkout -b your-feature-branch```
3. Make your changes, ensuring your code follows the [Coding Guidelines](#coding-guidelines).
4. Commit your changes with a clear and descriptive commit message:
```bash git commit -m "feat: file uploader"```
5. Push to your fork:
```bash git push origin your-feature-branch```
6. Open a pull request on the original repository. Include a detailed description of your changes.

### Guidelines for Pull Requests

- Ensure your code is properly formatted.
- Write tests for any new features or functionality.
- Link the related issue in your pull request description (if applicable).

## Coding Guidelines

- **Code Style**: Please follow the existing code style used in the project.
- **Comments**: Use comments to explain the *why* behind complex logic.
- **Tests**: Make sure any new code has accompanying unit tests.

## Development Setup

To set up the project locally:

1. Clone the repo:
```bash git clone https://github.com/root-dm/directus-desktop-app.git```
2. Install dependencies:
```bash yarn install```
3. Start the app:
```bash yarn start```
4. To run the app in production mode:
```bash yarn build```

License
By contributing, you agree that your contributions will be licensed under the MIT License.

This `CONTRIBUTING.md` gives clear guidelines on how people can contribute, report bugs, and submit features. It also outlines how to submit pull requests, coding standards, and sets up development, making it easier for new contributors to get started.
