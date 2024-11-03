# Date Range Picker Configuration

The Date Range Picker component accepts the following configuration options:

## Configuration Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `pastDateAllowed` | boolean | `false` | Controls whether dates before the current date can be selected |
| `startEndSameAllowed` | boolean | `false` | Determines if start and end date can be the same day |
| `maxRange` | number | undefined | Maximum number of days that can be selected between start and end date |
| `maxDateInFuture` | Date | undefined | Latest possible date that can be selected |

restriction -
  cant have start date after end date



## Steps to Run the Project

To run this project, follow these steps:


1. **Install dependencies:**
   Make sure you have Node.js installed. Then, run:
   yarn install

2. **Run the development server:**
   Start the Vite development server to serve the project locally:
   yarn run dev

4. **Build the project for production:**
   To create a production build, run:
   yarn run build-prod

4. **Preview the production build:**
   To preview the production build locally, run:
   yarn run preview

5. **Lint the project:**
   To lint the project and check for any TypeScript errors, run:
   yarn run lint

These steps utilize the configuration defined in `vite.config.ts` and the scripts specified in `package.json`.
