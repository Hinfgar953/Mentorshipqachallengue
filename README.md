
## Pages used for the challenge 

| UI | [QA Practice](https://www.qapractice.com): login, e-commerce, and flight booking |
| API | [Fake Store API](https://fakestoreapi.com): products and authentication |

## Test coverage

### UI

Functional tests live in `tests/functional/`:

- **Login**: created the following scenarios; successful login, masked password, and navigation to registration
- **E-commerce**: created the following test scenarios: add and remove products to the cart, filter by category, complete end-to-end checkout flow for buy products, payment with empty data, and cart isolation between two browser contexts.

- **Flights**: created the following test scenarios: book a one way flight and confirm, sort flights by price, filter flights, filter by airline and search for non existing flights 

Reusable data is stored on "tests/test-data" 

### API

API testing on tests/api with these scenarios:
- Connect and get token with correct credentials
- Retrieving products 
- Query parameters and product search 
- Creating products with POST
- Negative responses, including invalid credentials and unknown products/categories.

### BDD testing

Gherkin feature files are stored in `tests/bdd/features/`, steps definitions in `tests/bdd/steps/`.

- `login.feature` — login scenarios, implemented in `login.steps.ts`.
- `flight-booking.feature` — flight booking scenarios, implemented in `flight-booking.steps.ts`.

The BDD configuration in `playwright.config.ts` connects these folders and uses the custom fixture at `tests/fixtures/test.ts`. Run the BDD tests with:
npm run test:bdd

## Configuration

`TEST_ENV` selects the `.env.<name>` file. If it is not set, `.env.myenvironment` is used. This file supplies the environment URLs and timeout. These files are loaded relative to the project, regardless of the directory from which Playwright is started. Unit tests do not require environment variables; UI and API projects validate their required settings when they run.

Credentials are read from `.env.local`, which is excluded by `.gitignore`. The selected environment file is loaded first; `.env.local` can provide credentials without overriding its URLs or timeout.
## Setup


Environment URLs and `UI_TIMEOUT` are configured in `.env.<name>`.
Select an environment with `TEST_ENV`; the default is `myenvironment`.

```powershell
$env:TEST_ENV="myenvironment2"; npm test
```

## Test commands

```powershell
npm test                    # Chromium UI, API, and unit tests
npm run test:ui             # Chromium UI tests
npm run test:api            # API tests
npm run test:unit           # Unit tests
npm run test:bdd            # Generate and run BDD tests
npm run test:all-browsers   # UI tests in Chromium, Firefox, and WebKit
npm run typecheck           # TypeScript checks
```

Run individual UI suites in headed mode with `npm run login`, `npm run ecommerce`, or `npm run flight-booking`.

## Test layout

- `tests/functional/`: UI scenarios
- `tests/api/`: API scenarios
- `tests/unit/`: domain unit tests
- `tests/bdd/features/` and `tests/bdd/steps/`: Gherkin scenarios and steps
- `tests/test-data/`: reusable test data
- `page-objects/`: page objects and UI elements
- `domain/`: cart domain model
