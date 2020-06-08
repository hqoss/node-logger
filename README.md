# 🖊 Logger

A light-weight, performant, and consistent approach to logging.

## Table of contents

-   [Why use `logger`](#why-use-logger)

-   [Install](#install)

-   [Usage](#usage)

-   [Performance](#performance)

-   [Core design principles](#core-design-principles)

-   [Node version support](#node-version-support)

    -   [Why ES2018?](#why-es2018)

-   [Testing](#testing)

-   [TODO](#todo)

## Why use `logger`

... as opposed to other loggers?

`logger` builds on `pino` to enable composable and re-usable logger implementations.

-   Enforces a consistent approach to logging.
-   Greatly reduces common boilerplate such as
    -   logging metadata,
    -   enforcing a consistent log format,
    -   useful defaults, and more.
-   It is written in TypeScript.

## Install

```bash
npm install @hqoss/logger
# Additionally, for TypeScript users
npm install @types/pino --save-dev
```

**⚠️ NOTE:** The TypeScript compiler is configured to target `ES2018` and the library uses `commonjs` for module resolution (for now). Read more about [Node version support](#node-version-support).

## Usage

```typescript
import { PinoLogger } from "@hqoss/logger";

export default (correlationId: string) => new Logger({
  correlationId,
  base: { service: `${name}@${version}` },
});
```

## Performance

TODO

## Core design principles

-   **Code quality**; The modules contained within this package may be used in mission-critical software, so it's important that the code is performant, secure, and battle-tested.

-   **Developer experience**; Developers must be able to use this package with no significant barriers to entry. It has to be easy-to-find, well-documented, and pleasant to use.

-   **Modularity & Configurability**; It's important that our colleagues can compose, and easily change the ways in which they use this package.

## Node version support

The TypeScript compiler is configured to target ES2018. In practice, this means projects consuming this package should run on Node 12 or higher, unless additional compilation/transpilation steps are in place to ensure compatibility with the target runtime.

Please see <https://node.green/#ES2018> for reference.

### Why ES2018?

Firstly, according to the official [Node release schedule](https://github.com/nodejs/Release), Node 12.x entered LTS on 2019-10-21 and is scheduled to enter Maintenance on 2020-10-20. With the End-of-Life scheduled for April 2022, we are confident that most users will be running 12.x or higher.

Secondly, the [7.3 release of V8](https://v8.dev/blog/v8-release-73) (ships with Node 12.x or higher) includes "zero-cost async stack traces".

From the release notes:

> We are turning on the --async-stack-traces flag by default. Zero-cost async stack traces make it easier to diagnose problems in production with heavily asynchronous code, as the error.stack property that is usually sent to log files/services now provides more insight into what caused the problem.

## Testing

[Ava](https://github.com/avajs/ava) and [Jest](https://jestjs.io/) were considered. Jest was chosen as it is easy to configure and includes most advanced features out of the box.

Prefer using [Nock](https://github.com/nock/nock) over mocking.

## TODO

A quick and dirty tech debt tracker before we move to Issues.

-   [ ] Write contributing guide
-   [ ] Complete testing section, add best practices
-   [ ] Describe scripts and usage, add best practices
-   [ ] Add typespec and generate docs
-   [ ] Describe security best practices, e.g. `npm doctor`, `npm audit`, `npm outdated`, `ignore-scripts` in `.npmrc`, etc.
-   [ ] Add "Why should I use this" section
-   [ ] Library architectural design (+ diagram?)
