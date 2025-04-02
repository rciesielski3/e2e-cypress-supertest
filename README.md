# Cypress E2E Test Suite

This project contains a comprehensive end-to-end (E2E) test suite for [AutomationExercise.com](https://automationexercise.com), built with Cypress and organized by feature.

---

## 📁 Folder Structure

```
cypress/
├── e2e/
│   ├── auth/
│   │   ├── login.cy.js
│   │   └── signup.cy.js
│   ├── cart/
│   │   └── interaction.cy.js
│   ├── forms/
│   │   └── submission.cy.js
│   ├── homepage/
│   │   └── homepage.cy.js
│   ├── products/
│   │   ├── listing-and-search.cy.js
│   │   ├── scanning-and-filtering.cy.js
│   │   └── search-and-modal.js
├── fixtures/
│   ├── users.json
│   └── example.json
├── support/
│   ├── commands.js
│   └── e2e.js
```

---

## ✅ Test Coverage Overview

### auth/

- Login page with invalid credentials
- User registration with randomized email

### cart/

- Adding product to cart and verifying in cart view

### forms/

- Submitting contact form with validation and file upload

### homepage/

- Logo and navigation bar visibility
- Category section visibility

### products/

- Listing of all products
- Search functionality
- Looping and filtering by product name
- Add to cart from search

---

## 💡 Best Practices Followed

- Tests follow **Arrange → Act → Assert** pattern
- Organized by **feature folders**
- Reusable logic in `commands.js`
- Test data stored in `fixtures/users.json`
- Uploads use `example.json`

---

## 🧪 Running Tests

### Open Cypress GUI:

```bash
npx cypress open
```

### Run All Tests Headlessly:

```bash
npx cypress run
```

### Run Specific Test:

```bash
npx cypress run --spec "cypress/e2e/auth/login.cy.js"
```

---

## 🧩 Required Plugins

To support file uploads:

```bash
npm install --save-dev cypress-file-upload
```

Import it in `cypress/support/e2e.js`:

```js
import "cypress-file-upload";
```

---

## 📄 License

Free to use for learning and automation practice.

---

## 👤 Author

Rafał Ciesielski
