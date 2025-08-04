## Project Overview

This project is a Next.js-based web application that demonstrates how we can handle headless based cms platforms. This particular example is based on backend provided by the DynamicWeb 10 website but it can be applied to any other tool with minimal changes (more details below).
The goal is to have a working example application containing functionalities commonly found in ecommerce solutions, like:

- Authentication flow
- Profile pages
- Ability to browse products
- Ability to search for products
- See product details page
- Add products to cart
- Checkout
- Create order

Optionally, we can add examples on how to handle CMS blocks and create mechanism to handle them in Next.js

## Tech Stack

### Core Framework

- **Next.js** - React based framework with App Router
- **React**
- **TypeScript 5** - Type safety, better developer experience, better output from AI tools

### UI & Styling

- **Tailwind CSS 4** - Utility-first CSS framework
- **Radix UI** - Headless UI components for accessibility
- **Lucide React** - Icon library
- **Motion** - Animation library
- **next-themes** - Theme switching (dark/light mode)

### Forms & Validation

- **React Hook Form** - Performant forms with easy validation
- **Zod 4.0.5** - TypeScript-first schema validation
- **@hookform/resolvers** - React Hook Form + Zod integration

### Development Tools

- **Storybook** - Component development and documentation
- **Vitest** - Unit testing framework
- **ESLint** - Code linting
- **Prettier** - Code formatting

### HTTP & Services

- **Axios** - HTTP client for API calls
- **Custom Service Layer** - Organized API service architecture

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│
├── components/            # Reusable React components
│   ├── blocks/           # Page-level component blocks
│   │
│   ├── form-elements/   # Form-related components
│   │   ├── fields/      # Input field components
│   │   └── form.tsx     # Base form wrapper
│   │
│   ├── layout/          # Layout components
│   │   ├── _components/ # Navigation, logo, theme toggle
│   │   ├── footer.tsx   # Footer component
│   │   └── header.tsx   # Header component
│   │
│   ├── motion-primitives/ # Animation components
│   └── ui/              # Base UI components (Design System)
│
├── services/            # API services and business logic
│   ├── api.types.ts    # Shared API type definitions
│   ├── http-client.tsx # HTTP client configuration
│
├── config/             # Configuration files
│   └── env.ts         # Environment variables handling
│
└── lib/               # Utility functions
    └── utils.ts       # Helper functions and utilities
```

## Getting Started

### Prerequisites

- Node.js (Latest LTS version recommended)
- npm or yarn package manager

### Installation

Create .env.local file base on the .env.example and provide proper values. For now it's just the api url and typically this can be set to `http://localhost:4000` if you're using mockoon server.

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Start Storybook
npm run storybook
```

### Available Scripts

```bash
npm run dev          # Start development server with Turbopack
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run storybook    # Start Storybook development server
npm run build-storybook # Build Storybook for production
npm run test:unit    # Run unit tests
npm run test:storybook # Run Storybook tests
```

### Recommended VS Code extensions

ESLint
Prettier
Tailwind CSS Intellisense
TypeScript Import Sorter
Vitest

## Development scenarios

### Develop base UI component

Those are the ones placed in the `src\components\ui` folder. The most basic building blocks for UI. They should never consist any logic specific to any particular app. You can use ShadCN components here. For example, if a pagination component is needed, you can either install it from ShadCN with `npx shadcn@latest add pagination` command or create such component from scratch. Whatever is easier. Remember that all the ShadCN components are treated as local code after they are installed so feel free to update them, change their appearance or do whatever is needed. Those are just startin points. This is not a predefined library. You can and you should make changes to it.
The easiesst way to work with those is using Storybook. Running app is not needed at this stage.

### Develop more complex parts of page

Those components will be located in the `src\cimponents\blocks` folder. Consider them more like a feature blocks. Things that actually contain some logic, persist state, talk to api and so on. Those can be anything, for example - a hero section of the page, a login form, some faq section on page and so on. Just look at examples that are already provided.

### Develop forms

Forms are a special case of a UI block as they need to provide quite complex and very specific logic. To keep all the common logic of trakcing input errors, clearing values, blokcing UI, showing progress and so on, all the form components are encapsulated into their own components in the `src\component\form-elements` folder.
Building those form input should be considered a "build and forget" type of task. So once they're ready, we should just use them across app. Currently those base elements support regular text and password inputs only.

### Develop api integration

This the client-server communication is handled in the `src\services` folder. Here we have all the type definitions and all the logic responsible for frontent-backend communication.
Important note: Need some brainstorming about mocking of backend apis. Currently the "mockoon" app is used for that (import file in root of repo) so keep in mind that a mockoon server needs to be up and running for mocked responses to work.
Testing: this app layer should be covered by tests for different types of responses we can get from CMS. Especially for different http error codes or other edge cases. See example test files in the `navaigation` or `user` folders.

## Forms deep dive

Our login form can be a good reference to core concepts behind building forms.
Let's analyse the structure top to bottom, starting at the `login-block.tsx`.
This is the general UI block representing logical part of UI that shows the form with all it's surroundings. In this case those inclide some additional image, card type look or a link to policy agreement (might be irrelevant, this is just an example of UI).
Inside that block we have the actual `<LoginForm />` component, placed in the `form` folder.
Two important parts aredefined here

1. The .types.ts file ocntains a schema definition for the form
2. The .tsx file contain the actual form with it's logic.
   This .tsx file is a meat and potatoes of our form. Here we glue up the schema with the UI, define initial values if there are any and handle form submission.
   Note that individual form fields should work "automagically" and track error states on their own. The same applies to the submit button. IT should handle it's own state automatically.
   The only thing that is done manually now is how the errors are shown (not input validation errors but errors after form is submitted). Those can comein different formats from api and we might want to show them differently depending on the form so this part is not automated.

## Configuration deep dive

All config entries are store in the .env.local file.
Also we have `app\congig\env.ts` file that serves as a wrapper for the config entries. It is validated at app startup and provides type safety way to read config entries.

## Project Arhictecture roadmap

✅ Project structure defined

✅ Tailwind CSS configured

✅ ShadCN examples provided

✅ Example blocks provided

✅ Storybook configured

✅ Vites configured and sample unit tests provided

✅ Mockoon file provided

✅ Type safe configuration created

✅ Sample service layer provided

✅ Prettier rules defined

✅ Forms handling base controls created

✅ Sample form created

At this moment the last tool left to configure and provide examples is some frontend side state management tool I'd recomment Zustand as it's easy to setup and use.

## Business cases roadmap

Login flow - user should be able to log in and app should download his most relevant information when he logs in and store that locally for further use. That will inclide probably some basic profile data or cms navigation for available for authenitcated users only.

Product Quick Search - todo

Product Browser - todo

Product Details Page - todo

Cart - todo

Checkout - todo

Profile Pages - todo

Order Placement - todo
