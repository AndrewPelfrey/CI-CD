# CI/CD Pipeline with GitHub Actions

This project demonstrates how to set up a CI/CD pipeline for a full-stack application using GitHub Actions. The pipeline automates testing with Cypress and deployment to Render to ensure continuous integration and deployment when working with feature branches, the `develop` branch, and the `main` branch.

## **User Story**

**As a software engineer**, I want a full-stack application that:

- Runs test cases when a Pull Request is made to the `develop` branch.
- Automatically deploys to Render when code is merged from `develop` to `main`.

This ensures that all code integrations are clean, pass the proper requirements, and that the application is constantly updated when major releases are made to the `main` branch.

## **Acceptance Criteria**

- **Feature Branches**: All feature branches should be merged into the `develop` branch first.
- **Pull Request to Develop**: A GitHub Action will be triggered to run Cypress component tests whenever a Pull Request is made to the `develop` branch.
- **Test Results**: The results of the tests should be visible in the GitHub Actions interface.
- **Merge to Main**: Once the tests pass, the code can be safely merged into `main`, triggering another GitHub Action to automatically deploy the application to Render.

## **Overview of CI/CD Process**

### **1. Running Cypress Tests**
- **Trigger**: A Pull Request to the `develop` branch.
- **Action**: The GitHub Action runs Cypress tests to verify that the code passes component tests.
- **Outcome**: If the tests pass, the code can be safely merged into the `develop` branch.

### **2. Automatic Deployment to Render**
- **Trigger**: A push to the `main` branch.
- **Action**: GitHub Action deploys the latest code to Render.
- **Outcome**: The application is deployed with the latest changes, and the deployment is visible in Render.

## **Getting Started**

### **1. Repository Setup**
- Clone the starter code and create a new repository on GitHub.
- Upload the starter files to your GitHub repository.

### **2. Deployment Setup on Render**
- Create a Render account if you don't already have one.
- Deploy the application to Render and turn off Auto-Deploy in the Render settings.
- Copy the **Deploy hook URL** from Render (you'll need this to configure deployment in GitHub Actions).

### **3. Branching Strategy**
- Create a `develop` branch where all feature branches will be merged.
- Only merge the `develop` branch into `main` for production releases.

### **4. Configure GitHub Actions**
Create two YAML files in the `.github/workflows` directory:

#### **File 1: Cypress Tests Workflow (cypress-tests.yml)**

This workflow will run Cypress tests whenever a Pull Request is made to the `develop` branch.

```yaml
name: Cypress Tests

on:
  pull_request:
    branches:
      - develop

jobs:
  cypress:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout Code
        uses: actions/checkout@v2

      - name: Set up Node.js
        uses: actions/setup-node@v2
        with:
          node-version: '16'

      - name: Install Dependencies
        run: |
          npm install
        working-directory: ./client

      - name: Run Cypress Tests
        run: npx cypress run
        working-directory: ./client
        env:
          CYPRESS_RECORD_KEY: ${{ secrets.CYPRESS_RECORD_KEY }} # Optional for Cypress Dashboard
File 2: Render Deployment Workflow (render-deploy.yml)

This workflow will automatically deploy the application to Render when code is merged into the main branch.

name: Deploy to Render

on:
  push:
    branches:
      - main

jobs:
  deploy:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout Code
        uses: actions/checkout@v2

      - name: Trigger Render Deployment
        run: |
          curl -X POST https://render.com/deploy/some-deploy-hook-url
5. GitHub Secrets Setup
Go to your GitHub repository settings.
Under "Secrets and Variables", add the following secrets:
CYPRESS_RECORD_KEY: (Optional) Your Cypress Dashboard record key if you're using the Cypress Dashboard.
RENDER_DEPLOY_HOOK_URL: The deploy hook URL copied from Render.
6. Merge Process
When a feature branch is ready, open a Pull Request (PR) to develop.
The Cypress tests will automatically run in the GitHub Actions pipeline.
If the tests pass, merge the PR to develop.
Once code is ready for production, merge develop into main, which will trigger the Render deployment.
Resources:

Render Deploy Hooks
Render API Key
GitHub Repo Secrets
