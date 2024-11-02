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