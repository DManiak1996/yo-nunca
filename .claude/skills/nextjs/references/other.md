# Nextjs - Other

**Pages:** 30

---

## Using Google Analytics with Next.js (through `next/script`)

**URL:** https://nextjs.org/docs/messages/next-script-for-ga

**Contents:**
- Using Google Analytics with Next.js (through `next/script`)
- Why This Error Occurred
- Possible Ways to Fix It
  - Use @next/third-parties to add Google Analytics
- Useful Links

Prefer next/script component when using the inline script for Google Analytics.

An inline script was used for Google Analytics which might impact your webpage's performance. Instead, we recommend using next/script through the @next/third-parties library.

@next/third-parties is a library that provides a collection of components and utilities that improve the performance and developer experience of loading popular third-party libraries in your Next.js application. It is available with Next.js 14 (install next@latest).

The GoogleAnalytics component can be used to include Google Analytics 4 to your page via the Google tag (gtag.js). By default, it fetches the original scripts after hydration occurs on the page.

Recommendation: If Google Tag Manager is already included in your application, you can configure Google Analytics directly using it, rather than including Google Analytics as a separate component. Refer to the documentation to learn more about the differences between Tag Manager and gtag.js.

To load Google Analytics for all routes, include the component directly in your root layout and pass in your measurement ID:

To load Google Analytics for a single route, include the component in your page file:

**Examples:**

Example 1 (python):
```python
import { GoogleAnalytics } from '@next/third-parties/google'
 
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
      <GoogleAnalytics gaId="G-XYZ" />
    </html>
  )
}
```

Example 2 (python):
```python
import { GoogleAnalytics } from '@next/third-parties/google'
 
export default function Page() {
  return <GoogleAnalytics gaId="G-XYZ" />
}
```

---

## No Cache Detected

**URL:** https://nextjs.org/docs/messages/no-cache

**Contents:**
- No Cache Detected
- Why This Error Occurred
- Possible Ways to Fix It

A Next.js build was triggered in a continuous integration environment, but no cache was detected.

This results in slower builds and can hurt Next.js' filesystem cache of client-side bundles across builds.

Note: If this is a new project, or being built for the first time in your CI, you can ignore this error. However, you'll want to make sure it doesn't continue to happen and fix it if it does!

Follow the instructions in CI Build Caching to ensure your Next.js cache is persisted between builds.

---

## Architecture

**URL:** https://nextjs.org/docs/architecture

**Contents:**
- Architecture
  - Accessibility
  - Fast Refresh
  - Next.js Compiler
  - Supported Browsers

Learn about the Next.js architecture and how it works under the hood.

---

## Docs Contribution Guide

**URL:** https://nextjs.org/docs/15/community/contribution-guide

**Contents:**
- Docs Contribution Guide
- Why Contribute?
- How to Contribute
  - GitHub Workflow
  - Writing MDX
  - VSCode
    - Previewing Changes Locally
    - Extensions
  - Review Process
- File Structure

Welcome to the Next.js Docs Contribution Guide! We're excited to have you here.

This page provides instructions on how to edit the Next.js documentation. Our goal is to ensure that everyone in the community feels empowered to contribute and improve our docs.

Open-source work is never done, and neither is documentation. Contributing to docs is a good way for beginners to get involved in open-source and for experienced developers to clarify more complex topics while sharing their knowledge with the community.

By contributing to the Next.js docs, you're helping us build a more robust learning resource for all developers. Whether you've found a typo, a confusing section, or you've realized that a particular topic is missing, your contributions are welcomed and appreciated.

The docs content can be found on the Next.js repo. To contribute, you can edit the files directly on GitHub or clone the repo and edit the files locally.

If you're new to GitHub, we recommend reading the GitHub Open Source Guide to learn how to fork a repository, create a branch, and submit a pull request.

Good to know: The underlying docs code lives in a private codebase that is synced to the Next.js public repo. This means that you can't preview the docs locally. However, you'll see your changes on nextjs.org after merging a pull request.

The docs are written in MDX, a markdown format that supports JSX syntax. This allows us to embed React components in the docs. See the GitHub Markdown Guide for a quick overview of markdown syntax.

VSCode has a built-in markdown previewer that you can use to see your edits locally. To enable the previewer for MDX files, you'll need to add a configuration option to your user settings.

Open the command palette (⌘ + ⇧ + P on Mac or Ctrl + Shift + P on Windows) and search from Preferences: Open User Settings (JSON).

Then, add the following line to your settings.json file:

Next, open the command palette again, and search for Markdown: Preview File or Markdown: Open Preview to the Side. This will open a preview window where you can see your formatted changes.

We also recommend the following extensions for VSCode users:

Once you've submitted your contribution, the Next.js or Developer Experience teams will review your changes, provide feedback, and merge the pull request when it's ready.

Please let us know if you have any questions or need further assistance in your PR's comments. Thank you for contributing to the Next.js docs and being a part of our community!

Tip: Run pnpm prettier-fix to run Prettier before submitting your PR.

The docs use file-system routing. Each folder and files inside /docs represent a route segment. These segments are used to generate the URL paths, navigation, and breadcrumbs.

The file structure reflects the navigation that you see on the site, and by default, navigation items are sorted alphabetically. However, we can change the order of the items by prepending a two-digit number (00-) to the folder or file name.

For example, in the functions API Reference, the pages are sorted alphabetically because it makes it easier for developers to find a specific function:

But, in the routing section, the files are prefixed with a two-digit number, sorted in the order developers should learn these concepts:

To quickly find a page, you can use ⌘ + P (Mac) or Ctrl + P (Windows) to open the search bar on VSCode. Then, type the slug of the page you're looking for. E.g. defining-routes

Why not use a manifest?

We considered using a manifest file (another popular way to generate the docs navigation), but we found that a manifest would quickly get out of sync with the files. File-system routing forces us to think about the structure of the docs and feels more native to Next.js.

Each page has a metadata block at the top of the file separated by three dashes.

The following fields are required:

It's good practice to limit the page title to 2-3 words (e.g. Optimizing Images) and the description to 1-2 sentences (e.g. Learn how to optimize images in Next.js).

The following fields are optional:

Since most of the features in the App Router and Pages Router are completely different, their docs for each are kept in separate sections (02-app and 03-pages). However, there are a few features that are shared between them.

To avoid content duplication and risk the content becoming out of sync, we use the source field to pull content from one page into another. For example, the <Link> component behaves mostly the same in App and Pages. Instead of duplicating the content, we can pull the content from app/.../link.mdx into pages/.../link.mdx:

We can therefore edit the content in one place and have it reflected in both sections.

In shared pages, sometimes there might be content that is App Router or Pages Router specific. For example, the <Link> component has a shallow prop that is only available in Pages but not in App.

To make sure the content only shows in the correct router, we can wrap content blocks in an <AppOnly> or <PagesOnly> components:

You'll likely use these components for examples and code blocks.

Code blocks should contain a minimum working example that can be copied and pasted. This means that the code should be able to run without any additional configuration.

For example, if you're showing how to use the <Link> component, you should include the import statement and the <Link> component itself.

Always run examples locally before committing them. This will ensure that the code is up-to-date and working.

Code blocks should have a header that includes the language and the filename. Add a filename prop to render a special Terminal icon that helps orientate users where to input the command. For example:

Most examples in the docs are written in tsx and jsx, and a few in bash. However, you can use any supported language, here's the full list.

When writing JavaScript code blocks, we use the following language and extension combinations.

Add a language switcher to toggle between TypeScript and JavaScript. Code blocks should be TypeScript first with a JavaScript version to accommodate users.

Currently, we write TS and JS examples one after the other, and link them with switcher prop:

Good to know: We plan to automatically compile TypeScript snippets to JavaScript in the future. In the meantime, you can use transform.tools.

Code lines can be highlighted. This is useful when you want to draw attention to a specific part of the code. You can highlight lines by passing a number to the highlight prop.

Single Line: highlight={1}

Multiple Lines: highlight={1,3}

Range of Lines: highlight={1-5}

The following icons are available for use in the docs:

We do not use emojis in the docs.

For information that is important but not critical, use notes. Notes are a good way to add information without distracting the user from the main content.

Good to know: This is a single line note.

Related Links guide the user's learning journey by adding links to logical next steps.

Create related links using the related field in the page's metadata.

Diagrams are a great way to explain complex concepts. We use Figma to create diagrams, following Vercel's design guide.

The diagrams currently live in the /public folder in our private Next.js site. If you'd like to update or add a diagram, please open a GitHub issue with your ideas.

These are the React Components available for the docs: <Image /> (next/image), <PagesOnly />, <AppOnly />, <Cross />, and <Check />. We do not allow raw HTML in the docs besides the <details> tag.

If you have ideas for new components, please open a GitHub issue.

This section contains guidelines for writing docs for those who are new to technical writing.

While we don't have a strict template for pages, there are page sections you'll see repeated across the docs:

Feel free to add these sections as needed.

Docs pages are also split into two categories: Conceptual and Reference.

Good to know: Depending on the page you're contributing to, you may need to follow a different voice and style. For example, conceptual pages are more instructional and use the word you to address the user. Reference pages are more technical, they use more imperative words like "create, update, accept" and tend to omit the word you.

Here are some guidelines to maintain a consistent style and voice across the docs:

While these guidelines are not exhaustive, they should help you get started. If you'd like to dive deeper into technical writing, check out the Google Technical Writing Course.

Thank you for contributing to the docs and being part of the Next.js community!

**Examples:**

Example 1 (unknown):
```unknown
{
  "files.associations": {
    "*.mdx": "markdown"
  }
}
```

Example 2 (unknown):
```unknown
04-functions
├── after.mdx
├── cacheLife.mdx
├── cacheTag.mdx
└── ...
```

Example 3 (unknown):
```unknown
01-routing
├── 01-defining-routes.mdx
├── 02-pages.mdx
├── 03-layouts-and-templates.mdx
└── ...
```

Example 4 (unknown):
```unknown
---
title: Page Title
description: Page Description
---
```

---

## Fast Refresh

**URL:** https://nextjs.org/docs/architecture/fast-refresh

**Contents:**
- Fast Refresh
- How It Works
- Error Resilience
  - Syntax Errors
  - Runtime Errors
- Limitations
- Tips
- Fast Refresh and Hooks

Fast refresh is a React feature integrated into Next.js that allows you to live reload the browser page while maintaining temporary client-side state when you save changes to a file. It's enabled by default in all Next.js applications on 9.4 or newer. With Fast Refresh enabled, most edits should be visible within a second.

If you make a syntax error during development, you can fix it and save the file again. The error will disappear automatically, so you won't need to reload the app. You will not lose component state.

If you make a mistake that leads to a runtime error inside your component, you'll be greeted with a contextual overlay. Fixing the error will automatically dismiss the overlay, without reloading the app.

Component state will be retained if the error did not occur during rendering. If the error did occur during rendering, React will remount your application using the updated code.

If you have error boundaries in your app (which is a good idea for graceful failures in production), they will retry rendering on the next edit after a rendering error. This means having an error boundary can prevent you from always getting reset to the root app state. However, keep in mind that error boundaries shouldn't be too granular. They are used by React in production, and should always be designed intentionally.

Fast Refresh tries to preserve local React state in the component you're editing, but only if it's safe to do so. Here's a few reasons why you might see local state being reset on every edit to a file:

As more of your codebase moves to function components and Hooks, you can expect state to be preserved in more cases.

When possible, Fast Refresh attempts to preserve the state of your component between edits. In particular, useState and useRef preserve their previous values as long as you don't change their arguments or the order of the Hook calls.

Hooks with dependencies—such as useEffect, useMemo, and useCallback—will always update during Fast Refresh. Their list of dependencies will be ignored while Fast Refresh is happening.

For example, when you edit useMemo(() => x * 2, [x]) to useMemo(() => x * 10, [x]), it will re-run even though x (the dependency) has not changed. If React didn't do that, your edit wouldn't reflect on the screen!

Sometimes, this can lead to unexpected results. For example, even a useEffect with an empty array of dependencies would still re-run once during Fast Refresh.

However, writing code resilient to occasional re-running of useEffect is a good practice even without Fast Refresh. It will make it easier for you to introduce new dependencies to it later on and it's enforced by React Strict Mode, which we highly recommend enabling.

---

## Inline script id

**URL:** https://nextjs.org/docs/messages/inline-script-id

**Contents:**
- Inline script id
- Why This Error Occurred
- Possible Ways to Fix It
- Useful links

Enforce id attribute on next/script components with inline content.

next/script components with inline content require an id attribute to be defined to track and optimize the script.

Add an id attribute to the next/script component.

**Examples:**

Example 1 (python):
```python
import Script from 'next/script'
 
export default function App({ Component, pageProps }) {
  return (
    <>
      <Script id="my-script">{`console.log('Hello world!');`}</Script>
      <Component {...pageProps} />
    </>
  )
}
```

---

## `url` is deprecated

**URL:** https://nextjs.org/docs/messages/url-deprecated

**Contents:**
- `url` is deprecated
- Why This Error Occurred
- Possible Ways to Fix It

In versions prior to 6.x the url property got magically injected into every Page component (every page inside the pages directory).

The reason this is going away is that we want to make things very predictable and explicit. Having a magical url property coming out of nowhere doesn't aid that goal.

Note: ⚠️ In some cases using React Dev Tools may trigger this warning even if you do not reference url anywhere in your code. Try temporarily disabling the extension and see if the warning persists.

Since Next 5 we provide a way to explicitly inject the Next.js router object into pages and all their descending components. The router property that is injected will hold the same values as url, like pathname, asPath, and query.

Here's an example of using withRouter:

We provide a codemod (a code to code transformation) to automatically change the url property usages to withRouter.

You can find this codemod and instructions on how to run it here: Use withRouter

**Examples:**

Example 1 (python):
```python
import { withRouter } from 'next/router'
 
class Page extends React.Component {
  render() {
    const { router } = this.props
    console.log(router)
    return <div>{router.pathname}</div>
  }
}
 
export default withRouter(Page)
```

---

## Supported Browsers

**URL:** https://nextjs.org/docs/15/architecture/supported-browsers

**Contents:**
- Supported Browsers
- Browserslist
- Polyfills
  - Custom Polyfills
    - In App Router
    - In Pages Router
    - Conditionally loading polyfills
- JavaScript Language Features
  - TypeScript Features
  - Customizing Babel Config (Advanced)

Next.js supports modern browsers with zero configuration.

If you would like to target specific browsers or features, Next.js supports Browserslist configuration in your package.json file. Next.js uses the following Browserslist configuration by default:

We inject widely used polyfills, including:

If any of your dependencies include these polyfills, they’ll be eliminated automatically from the production build to avoid duplication.

In addition, to reduce bundle size, Next.js will only load these polyfills for browsers that require them. The majority of the web traffic globally will not download these polyfills.

If your own code or any external npm dependencies require features not supported by your target browsers (such as IE 11), you need to add polyfills yourself.

To include polyfills, you can import them into the instrumentation-client.js file.

In this case, you should add a top-level import for the specific polyfill you need in your Custom <App> or the individual component.

The best approach is to isolate unsupported features to specific UI sections and conditionally load the polyfill if needed.

Next.js allows you to use the latest JavaScript features out of the box. In addition to ES6 features, Next.js also supports:

Next.js has built-in TypeScript support. Learn more here.

You can customize babel configuration. Learn more here.

**Examples:**

Example 1 (unknown):
```unknown
{
  "browserslist": [
    "chrome 64",
    "edge 79",
    "firefox 67",
    "opera 51",
    "safari 12"
  ]
}
```

Example 2 (unknown):
```unknown
import './polyfills'
```

Example 3 (python):
```python
import './polyfills'
 
import type { AppProps } from 'next/app'
 
export default function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}
```

Example 4 (python):
```python
import { useCallback } from 'react'
 
export const useAnalytics = () => {
  const tracker = useCallback(async (data: unknown) => {
    if (!('structuredClone' in globalThis)) {
      import('polyfills/structured-clone').then((mod) => {
        globalThis.structuredClone = mod.default
      })
    }
 
    /* Do some work that uses structured clone */
  }, [])
 
  return tracker
}
```

---

## Middleware Upgrade Guide

**URL:** https://nextjs.org/docs/messages/middleware-upgrade-guide

**Contents:**
- Middleware Upgrade Guide
- Using Next.js Middleware on Vercel
- Breaking changes
- No Nested Middleware
  - Summary of changes
  - Explanation
  - How to upgrade
- No Response Body
  - Summary of changes
  - Explanation

As we work on improving Middleware for General Availability (GA), we've made some changes to the Middleware APIs (and how you define Middleware in your application) based on your feedback.

This upgrade guide will help you understand the changes, why they were made, and how to migrate your existing Middleware to the new API. The guide is for Next.js developers who:

You can start upgrading your Middleware usage today with the latest release (npm i next@latest).

Note: These changes described in this guide are included in Next.js 12.2. You can keep your current site structure, including nested Middleware, until you move to 12.2 (or a canary build of Next.js).

If you have ESLint configured, you will need to run npm i eslint-config-next@latest --save-dev to upgrade your ESLint configuration to ensure the same version is being used as the Next.js version. You might also need to restart VSCode for the changes to take effect.

If you're using Next.js on Vercel, your existing deploys using Middleware will continue to work, and you can continue to deploy your site using Middleware. When you upgrade your site to the next stable version of Next.js (v12.2), you will need to follow this upgrade guide to update your Middleware.

Previously, you could create a _middleware.ts file under the pages directory at any level. Middleware execution was based on the file path where it was created.

Based on customer feedback, we have replaced this API with a single root Middleware, which provides the following improvements:

You should declare one single Middleware file in your application, which should be located next to the pages directory and named without an _ prefix. Your Middleware file can still have either a .ts or .js extension.

Middleware will be invoked for every route in the app, and a custom matcher can be used to define matching filters. The following is an example for a Middleware that triggers for /about/* and /dashboard/:path*, the custom matcher is defined in an exported config object:

The matcher config also allows full regex so matching like negative lookaheads or character matching is supported. An example of a negative lookahead to match all except specific paths can be seen here:

While the config option is preferred since it doesn't get invoked on every request, you can also use conditional statements to only run the Middleware when it matches specific paths. One advantage of using conditionals is defining explicit ordering for when Middleware executes. The following example shows how you can merge two previously nested Middleware:

To respect the differences in client-side and server-side navigation, and to help ensure that developers do not build insecure Middleware, we are removing the ability to send response bodies in Middleware. This ensures that Middleware is only used to rewrite, redirect, or modify the incoming request (e.g. setting cookies).

The following patterns will no longer work:

For cases where Middleware is used to respond (such as authorization), you should migrate to use rewrite/redirect to pages that show an authorization error, login forms, or to an API Route.

If you were previously using Middleware to forward headers to an external API, you can now use Edge API Routes:

Based on beta feedback, we are changing the Cookies API in NextRequest and NextResponse to align more to a get/set model. The Cookies API extends Map, including methods like entries and values.

NextResponse now has a cookies instance with:

As well as other extended methods from Map.

To help reduce the size of your Middleware, we have extracted the user agent from the request object and created a new helper userAgent.

The helper is imported from next/server and allows you to opt in to using the user agent. The helper gives you access to the same properties that were available from the request object.

Currently, Middleware estimates whether you are serving an asset of a Page based on the Next.js routes manifest (internal configuration). This value is surfaced through request.page.

To make page and asset matching more accurate, we are now using the web standard URLPattern API.

Use URLPattern to check if a Middleware is being invoked for a certain page match.

Prior to Next.js v12.2, Middleware was not executed for _next requests.

For cases where Middleware is used for authorization, you should migrate to use rewrite/redirect to Pages that show an authorization error, login forms, or to an API Route.

See No Response Body for an example of how to migrate to use rewrite/redirect.

**Examples:**

Example 1 (python):
```python
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
export function middleware(request: NextRequest) {
  return NextResponse.rewrite(new URL('/about-2', request.url))
}
 
// Supports both a single string value or an array of matchers
export const config = {
  matcher: ['/about/:path*', '/dashboard/:path*'],
}
```

Example 2 (javascript):
```javascript
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|favicon.ico).*)',
  ],
}
```

Example 3 (python):
```python
import type { NextRequest } from 'next/server'
 
export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith('/about')) {
    // This logic is only applied to /about
  }
 
  if (request.nextUrl.pathname.startsWith('/dashboard')) {
    // This logic is only applied to /dashboard
  }
}
```

Example 4 (unknown):
```unknown
new Response('a text value')
new Response(streamOrBuffer)
new Response(JSON.stringify(obj), { headers: 'application/json' })
NextResponse.json()
```

---

## No Unwanted Polyfill.io

**URL:** https://nextjs.org/docs/messages/no-unwanted-polyfillio

**Contents:**
- No Unwanted Polyfill.io
- Why This Error Occurred
- Possible Ways to Fix It
- Useful Links

Prevent duplicate polyfills from Polyfill.io.

You are using polyfills from Polyfill.io and including polyfills already shipped with Next.js. This unnecessarily increases page weight which can affect loading performance.

Remove all duplicate polyfills. If you need to add polyfills but are not sure if Next.js already includes it, take a look at the list of supported browsers and features.

---

## Next.js Docs

**URL:** https://nextjs.org/docs

**Contents:**
- Next.js Docs
- What is Next.js?
- How to use the docs
- App Router and Pages Router
  - React version handling
- Pre-requisite knowledge
- Accessibility
- Join our Community
- Next Steps
  - Getting Started

Welcome to the Next.js documentation!

Next.js is a React framework for building full-stack web applications. You use React Components to build user interfaces, and Next.js for additional features and optimizations.

It also automatically configures lower-level tools like bundlers and compilers. You can instead focus on building your product and shipping quickly.

Whether you're an individual developer or part of a larger team, Next.js can help you build interactive, dynamic, and fast React applications.

The docs are organized into 3 sections:

Use the sidebar to navigate through the sections, or search (Ctrl+K or Cmd+K) to quickly find a page.

Next.js has two different routers:

At the top of the sidebar, you'll notice a dropdown menu that allows you to switch between the App Router and the Pages Router docs.

The App Router and Pages Router handle React versions differently:

App Router: Uses React canary releases built-in, which include all the stable React 19 changes, as well as newer features being validated in frameworks, prior to a new React release.

Pages Router: Uses the React version installed in your project's package.json.

This approach ensures new React features work reliably in the App Router while maintaining backwards compatibility for existing Pages Router applications.

Our documentation assumes some familiarity with web development. Before getting started, it'll help if you're comfortable with:

If you're new to React or need a refresher, we recommend starting with our React Foundations course, and the Next.js Foundations course that has you building an application as you learn.

For the best experience when using a screen reader, we recommend using Firefox and NVDA, or Safari and VoiceOver.

If you have questions about anything related to Next.js, you're always welcome to ask our community on GitHub Discussions, Discord, X (Twitter), and Reddit.

---

## Next.js Compiler

**URL:** https://nextjs.org/docs/architecture/nextjs-compiler

**Contents:**
- Next.js Compiler
- Why SWC?
- Supported Features
  - Styled Components
  - Jest
  - Relay
  - Remove React Properties
  - Remove Console
  - Legacy Decorators
  - importSource

The Next.js Compiler, written in Rust using SWC, allows Next.js to transform and minify your JavaScript code for production. This replaces Babel for individual files and Terser for minifying output bundles.

Compilation using the Next.js Compiler is 17x faster than Babel and enabled by default since Next.js version 12. If you have an existing Babel configuration or are using unsupported features, your application will opt-out of the Next.js Compiler and continue using Babel.

SWC is an extensible Rust-based platform for the next generation of fast developer tools.

SWC can be used for compilation, minification, bundling, and more – and is designed to be extended. It's something you can call to perform code transformations (either built-in or custom). Running those transformations happens through higher-level tools like Next.js.

We chose to build on SWC for a few reasons:

We're working to port babel-plugin-styled-components to the Next.js Compiler.

First, update to the latest version of Next.js: npm install next@latest. Then, update your next.config.js file:

For advanced use cases, you can configure individual properties for styled-components compilation.

Note: ssr and displayName transforms are the main requirement for using styled-components in Next.js.

The Next.js Compiler transpiles your tests and simplifies configuring Jest together with Next.js including:

First, update to the latest version of Next.js: npm install next@latest. Then, update your jest.config.js file:

To enable Relay support:

Good to know: In Next.js, all JavaScript files in pages directory are considered routes. So, for relay-compiler you'll need to specify artifactDirectory configuration settings outside of the pages, otherwise relay-compiler will generate files next to the source file in the __generated__ directory, and this file will be considered a route, which will break production builds.

Allows to remove JSX properties. This is often used for testing. Similar to babel-plugin-react-remove-properties.

To remove properties matching the default regex ^data-test:

To remove custom properties:

This transform allows for removing all console.* calls in application code (not node_modules). Similar to babel-plugin-transform-remove-console.

Remove all console.* calls:

Remove console.* output except console.error:

Next.js will automatically detect experimentalDecorators in jsconfig.json or tsconfig.json. Legacy decorators are commonly used with older versions of libraries like mobx.

This flag is only supported for compatibility with existing applications. We do not recommend using legacy decorators in new applications.

First, update to the latest version of Next.js: npm install next@latest. Then, update your jsconfig.json or tsconfig.json file:

Next.js will automatically detect jsxImportSource in jsconfig.json or tsconfig.json and apply that. This is commonly used with libraries like Theme UI.

First, update to the latest version of Next.js: npm install next@latest. Then, update your jsconfig.json or tsconfig.json file:

We're working to port @emotion/babel-plugin to the Next.js Compiler.

First, update to the latest version of Next.js: npm install next@latest. Then, update your next.config.js file:

Next.js' swc compiler is used for minification by default since v13. This is 7x faster than Terser.

Good to know: Starting with v15, minification cannot be customized using next.config.js. Support for the swcMinify flag has been removed.

Next.js can automatically transpile and bundle dependencies from local packages (like monorepos) or from external dependencies (node_modules). This replaces the next-transpile-modules package.

This option has been superseded by optimizePackageImports in Next.js 13.5. We recommend upgrading to use the new option that does not require manual configuration of import paths.

The define option allows you to statically replace variables in your code at build-time. The option takes an object as key-value pairs, where the keys are the variables that should be replaced with the corresponding values.

Use the compiler.define field in next.config.js to define variables for all environments (server, edge, and client). Or, use compiler.defineServer to define variables only for server-side (server and edge) code:

The Next.js Compiler supports lifecycle hooks that allow you to run custom code at specific points during the build process. Currently, the following hook is supported:

A hook function that executes after production build compilation finishes, but before running post-compilation tasks such as type checking and static page generation. This hook provides access to project metadata including the project directory and build output directory, making it useful for third-party tools to collect build outputs like sourcemaps.

The hook receives an object with the following properties:

You can generate SWC's internal transform traces as chromium's trace event format.

Once enabled, swc will generate trace named as swc-trace-profile-${timestamp}.json under .next/. Chromium's trace viewer (chrome://tracing/, https://ui.perfetto.dev/), or compatible flamegraph viewer (https://www.speedscope.app/) can load & visualize generated traces.

You can configure swc's transform to use SWC's experimental plugin support written in wasm to customize transformation behavior.

swcPlugins accepts an array of tuples for configuring plugins. A tuple for the plugin contains the path to the plugin and an object for plugin configuration. The path to the plugin can be an npm module package name or an absolute path to the .wasm binary itself.

When your application has a .babelrc file, Next.js will automatically fall back to using Babel for transforming individual files. This ensures backwards compatibility with existing applications that leverage custom Babel plugins.

If you're using a custom Babel setup, please share your configuration. We're working to port as many commonly used Babel transformations as possible, as well as supporting plugins in the future.

**Examples:**

Example 1 (unknown):
```unknown
module.exports = {
  compiler: {
    styledComponents: true,
  },
}
```

Example 2 (unknown):
```unknown
module.exports = {
  compiler: {
    // see https://styled-components.com/docs/tooling#babel-plugin for more info on the options.
    styledComponents: {
      // Enabled by default in development, disabled in production to reduce file size,
      // setting this will override the default for all environments.
      displayName?: boolean,
      // Enabled by default.
      ssr?: boolean,
      // Enabled by default.
      fileName?: boolean,
      // Empty by default.
      topLevelImportPaths?: string[],
      // Defaults to ["index"].
      meaninglessFileNames?: string[],
      // Enabled by default.
      minify?: boolean,
      // Enabled by default.
      transpileTemplateLiterals?: boolean,
      // Empty by default.
      namespace?: string,
      // Disabled by default.
      pure?: boolean,
      // Enabled by default.
      cssProp?: boolean,
    },
  },
}
```

Example 3 (javascript):
```javascript
const nextJest = require('next/jest')
 
// Providing the path to your Next.js app which will enable loading next.config.js and .env files
const createJestConfig = nextJest({ dir: './' })
 
// Any custom config you want to pass to Jest
const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
}
 
// createJestConfig is exported in this way to ensure that next/jest can load the Next.js configuration, which is async
module.exports = createJestConfig(customJestConfig)
```

Example 4 (unknown):
```unknown
module.exports = {
  compiler: {
    relay: {
      // This should match relay.config.js
      src: './',
      artifactDirectory: './__generated__',
      language: 'typescript',
      eagerEsModules: false,
    },
  },
}
```

---

## No Head Element

**URL:** https://nextjs.org/docs/messages/no-head-element

**Contents:**
- No Head Element
- Why This Error Occurred
- Possible Ways to Fix It
- Useful Links

Prevent usage of <head> element.

A <head> element was used to include page-level metadata, but this can cause unexpected behavior in a Next.js application. Use Next.js' built-in next/head component instead.

Import and use the <Head /> component:

**Examples:**

Example 1 (python):
```python
import Head from 'next/head'
 
function Index() {
  return (
    <>
      <Head>
        <title>My page title</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
    </>
  )
}
 
export default Index
```

---

## Google Font Display

**URL:** https://nextjs.org/docs/messages/google-font-display

**Contents:**
- Google Font Display
- Why This Error Occurred
- Possible Ways to Fix It
  - When Not To Use It
- Useful Links

Enforce font-display behavior with Google Fonts.

For a Google Font, the font-display descriptor was either missing or set to auto, block, or fallback, which are not recommended.

For most cases, the best font display strategy for custom fonts is optional.

Specifying display=optional minimizes the risk of invisible text or layout shift. If swapping to the custom font after it has loaded is important to you, then use display=swap instead.

If you want to specifically display a font using an auto, block, or fallback strategy, then you can disable this rule.

**Examples:**

Example 1 (python):
```python
import Head from 'next/head'
 
export default function IndexPage() {
  return (
    <div>
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Krona+One&display=optional"
          rel="stylesheet"
        />
      </Head>
    </div>
  )
}
```

---

## Rspack Integration

**URL:** https://nextjs.org/docs/15/community/rspack

**Contents:**
- Rspack Integration

The Rspack team has created a community plugin for Next.js, which is part of a partnering effort with the Rspack team.

This plugin is currently experimental. Please use this discussion thread to give feedback on any issues you encounter.

Learn more on the Rspack docs and try out this example.

---

## No Title in Document Head

**URL:** https://nextjs.org/docs/messages/no-title-in-document-head

**Contents:**
- No Title in Document Head
- Why This Error Occurred
- Possible Ways to Fix It
- Useful Links

Prevent usage of <title> with Head component from next/document.

A <title> element was defined within the Head component imported from next/document, which should only be used for any <head> code that is common for all pages. Title tags should be defined at the page-level using next/head instead.

Within a page or component, import and use next/head to define a page title:

**Examples:**

Example 1 (python):
```python
import Head from 'next/head'
 
export function Home() {
  return (
    <div>
      <Head>
        <title>My page title</title>
      </Head>
    </div>
  )
}
```

---

## No assign module variable

**URL:** https://nextjs.org/docs/messages/no-assign-module-variable

**Contents:**
- No assign module variable
- Why This Error Occurred
- Possible Ways to Fix It

Prevent assignment to the module variable.

A value is being assigned to the module variable. The module variable is already used and it is highly likely that assigning to this variable will cause errors.

Use a different variable name:

**Examples:**

Example 1 (javascript):
```javascript
let myModule = {...}
```

---

## Next.js Docs

**URL:** https://nextjs.org/docs/15

**Contents:**
- Next.js Docs
- What is Next.js?
- How to use the docs
- App Router and Pages Router
  - React version handling
- Pre-requisite knowledge
- Accessibility
- Join our Community
- Next Steps
  - Getting Started

Welcome to the Next.js documentation!

Next.js is a React framework for building full-stack web applications. You use React Components to build user interfaces, and Next.js for additional features and optimizations.

It also automatically configures lower-level tools like bundlers and compilers. You can instead focus on building your product and shipping quickly.

Whether you're an individual developer or part of a larger team, Next.js can help you build interactive, dynamic, and fast React applications.

The docs are organized into 3 sections:

Use the sidebar to navigate through the sections, or search (Ctrl+K or Cmd+K) to quickly find a page.

Next.js has two different routers:

At the top of the sidebar, you'll notice a dropdown menu that allows you to switch between the App Router and the Pages Router docs.

The App Router and Pages Router handle React versions differently:

App Router: Uses React canary releases built-in, which include all the stable React 19 changes, as well as newer features being validated in frameworks, prior to a new React release.

Pages Router: Uses the React version installed in your project's package.json.

This approach ensures new React features work reliably in the App Router while maintaining backwards compatibility for existing Pages Router applications.

Our documentation assumes some familiarity with web development. Before getting started, it'll help if you're comfortable with:

If you're new to React or need a refresher, we recommend starting with our React Foundations course, and the Next.js Foundations course that has you building an application as you learn.

For the best experience when using a screen reader, we recommend using Firefox and NVDA, or Safari and VoiceOver.

If you have questions about anything related to Next.js, you're always welcome to ask our community on GitHub Discussions, Discord, X (Twitter), and Reddit.

---

## Docs Contribution Guide

**URL:** https://nextjs.org/docs/14/community/contribution-guide

**Contents:**
- Docs Contribution Guide
- Why Contribute?
- How to Contribute
  - GitHub Workflow
  - Writing MDX
  - VSCode
    - Previewing Changes Locally
    - Extensions
  - Review Process
- File Structure

Welcome to the Next.js Docs Contribution Guide! We're excited to have you here.

This page provides instructions on how to edit the Next.js documentation. Our goal is to ensure that everyone in the community feels empowered to contribute and improve our docs.

Open-source work is never done, and neither is documentation. Contributing to docs is a good way for beginners to get involved in open-source and for experienced developers to clarify more complex topics while sharing their knowledge with the community.

By contributing to the Next.js docs, you're helping us build a more robust learning resource for all developers. Whether you've found a typo, a confusing section, or you've realized that a particular topic is missing, your contributions are welcomed and appreciated.

The docs content can be found on the Next.js repo. To contribute, you can edit the files directly on GitHub or clone the repo and edit the files locally.

If you're new to GitHub, we recommend reading the GitHub Open Source Guide to learn how to fork a repository, create a branch, and submit a pull request.

Good to know: The underlying docs code lives in a private codebase that is synced to the Next.js public repo. This means that you can't preview the docs locally. However, you'll see your changes on nextjs.org after merging a pull request.

The docs are written in MDX, a markdown format that supports JSX syntax. This allows us to embed React components in the docs. See the GitHub Markdown Guide for a quick overview of markdown syntax.

VSCode has a built-in markdown previewer that you can use to see your edits locally. To enable the previewer for MDX files, you'll need to add a configuration option to your user settings.

Open the command palette (⌘ + ⇧ + P on Mac or Ctrl + Shift + P on Windows) and search from Preferences: Open User Settings (JSON).

Then, add the following line to your settings.json file:

Next, open the command palette again, and search for Markdown: Preview File or Markdown: Open Preview to the Side. This will open a preview window where you can see your formatted changes.

We also recommend the following extensions for VSCode users:

Once you've submitted your contribution, the Next.js or Developer Experience teams will review your changes, provide feedback, and merge the pull request when it's ready.

Please let us know if you have any questions or need further assistance in your PR's comments. Thank you for contributing to the Next.js docs and being a part of our community!

Tip: Run pnpm prettier-fix to run Prettier before submitting your PR.

The docs use file-system routing. Each folder and files inside /docs represent a route segment. These segments are used to generate the URL paths, navigation, and breadcrumbs.

The file structure reflects the navigation that you see on the site, and by default, navigation items are sorted alphabetically. However, we can change the order of the items by prepending a two-digit number (00-) to the folder or file name.

For example, in the functions API Reference, the pages are sorted alphabetically because it makes it easier for developers to find a specific function:

But, in the routing section, the files are prefixed with a two-digit number, sorted in the order developers should learn these concepts:

To quickly find a page, you can use ⌘ + P (Mac) or Ctrl + P (Windows) to open the search bar on VSCode. Then, type the slug of the page you're looking for. E.g. defining-routes

Why not use a manifest?

We considered using a manifest file (another popular way to generate the docs navigation), but we found that a manifest would quickly get out of sync with the files. File-system routing forces us to think about the structure of the docs and feels more native to Next.js.

Each page has a metadata block at the top of the file separated by three dashes.

The following fields are required:

It's good practice to limit the page title to 2-3 words (e.g. Optimizing Images) and the description to 1-2 sentences (e.g. Learn how to optimize images in Next.js).

The following fields are optional:

Since most of the features in the App Router and Pages Router are completely different, their docs for each are kept in separate sections (02-app and 03-pages). However, there are a few features that are shared between them.

To avoid content duplication and risk the content becoming out of sync, we use the source field to pull content from one page into another. For example, the <Link> component behaves mostly the same in App and Pages. Instead of duplicating the content, we can pull the content from app/.../link.mdx into pages/.../link.mdx:

We can therefore edit the content in one place and have it reflected in both sections.

In shared pages, sometimes there might be content that is App Router or Pages Router specific. For example, the <Link> component has a shallow prop that is only available in Pages but not in App.

To make sure the content only shows in the correct router, we can wrap content blocks in an <AppOnly> or <PagesOnly> components:

You'll likely use these components for examples and code blocks.

Code blocks should contain a minimum working example that can be copied and pasted. This means that the code should be able to run without any additional configuration.

For example, if you're showing how to use the <Link> component, you should include the import statement and the <Link> component itself.

Always run examples locally before committing them. This will ensure that the code is up-to-date and working.

Code blocks should have a header that includes the language and the filename. Add a filename prop to render a special Terminal icon that helps orientate users where to input the command. For example:

Most examples in the docs are written in tsx and jsx, and a few in bash. However, you can use any supported language, here's the full list.

When writing JavaScript code blocks, we use the following language and extension combinations.

Add a language switcher to toggle between TypeScript and JavaScript. Code blocks should be TypeScript first with a JavaScript version to accommodate users.

Currently, we write TS and JS examples one after the other, and link them with switcher prop:

Good to know: We plan to automatically compile TypeScript snippets to JavaScript in the future. In the meantime, you can use transform.tools.

Code lines can be highlighted. This is useful when you want to draw attention to a specific part of the code. You can highlight lines by passing a number to the highlight prop.

Single Line: highlight={1}

Multiple Lines: highlight={1,3}

Range of Lines: highlight={1-5}

The following icons are available for use in the docs:

We do not use emojis in the docs.

For information that is important but not critical, use notes. Notes are a good way to add information without distracting the user from the main content.

Good to know: This is a single line note.

Related Links guide the user's learning journey by adding links to logical next steps.

Create related links using the related field in the page's metadata.

Diagrams are a great way to explain complex concepts. We use Figma to create diagrams, following Vercel's design guide.

The diagrams currently live in the /public folder in our private Next.js site. If you'd like to update or add a diagram, please open a GitHub issue with your ideas.

These are the React Components available for the docs: <Image /> (next/image), <PagesOnly />, <AppOnly />, <Cross />, and <Check />. We do not allow raw HTML in the docs besides the <details> tag.

If you have ideas for new components, please open a GitHub issue.

This section contains guidelines for writing docs for those who are new to technical writing.

While we don't have a strict template for pages, there are page sections you'll see repeated across the docs:

Feel free to add these sections as needed.

Docs pages are also split into two categories: Conceptual and Reference.

Good to know: Depending on the page you're contributing to, you may need to follow a different voice and style. For example, conceptual pages are more instructional and use the word you to address the user. Reference pages are more technical, they use more imperative words like "create, update, accept" and tend to omit the word you.

Here are some guidelines to maintain a consistent style and voice across the docs:

While these guidelines are not exhaustive, they should help you get started. If you'd like to dive deeper into technical writing, check out the Google Technical Writing Course.

Thank you for contributing to the docs and being part of the Next.js community!

**Examples:**

Example 1 (unknown):
```unknown
{
  "files.associations": {
    "*.mdx": "markdown"
  }
}
```

Example 2 (unknown):
```unknown
03-functions
├── cookies.mdx
├── draft-mode.mdx
├── fetch.mdx
└── ...
```

Example 3 (unknown):
```unknown
02-routing
├── 01-defining-routes.mdx
├── 02-pages-and-layouts.mdx
├── 03-linking-and-navigating.mdx
└── ...
```

Example 4 (unknown):
```unknown
---
title: Page Title
description: Page Description
---
```

---

## No Page Custom Font

**URL:** https://nextjs.org/docs/messages/no-page-custom-font

**Contents:**
- No Page Custom Font
- Why This Error Occurred
- Possible Ways to Fix It
  - When Not To Use It
- Useful Links

Prevent page-only custom fonts.

Create the file ./pages/_document.js and add the font to a custom Document:

Or as a function component:

If you have a reason to only load a font for a particular page or don't care about font optimization, then you can disable this rule.

**Examples:**

Example 1 (python):
```python
import Document, { Html, Head, Main, NextScript } from 'next/document'
 
class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <link
            href="https://fonts.googleapis.com/css2?family=Inter&display=optional"
            rel="stylesheet"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
 
export default MyDocument
```

Example 2 (python):
```python
import { Html, Head, Main, NextScript } from 'next/document'
 
export default function Document() {
  return (
    <Html>
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter&display=optional"
          rel="stylesheet"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
```

---

## Uncached data was accessed outside of `<Suspense>`

**URL:** https://nextjs.org/docs/messages/blocking-route

**Contents:**
- Uncached data was accessed outside of `<Suspense>`
- Why This Error Occurred
- Possible Ways to Fix It
  - Accessing Data
  - Headers
  - Params and SearchParams
  - Short-lived Caches
- Useful Links

When the cacheComponents feature is enabled, Next.js expects a parent Suspense boundary around any component that awaits data that should be accessed on every user request. The purpose of this requirement is so that Next.js can provide a useful fallback while this data is accessed and rendered.

While some data is inherently only available when a user request is being handled, such as request headers, Next.js assumes that by default any asynchronous data is expected to be accessed each time a user request is being handled unless you specifically cache it using "use cache".

The proper fix for this specific error depends on what data you are accessing and how you want your Next.js app to behave.

When you access data using fetch, a database client, or any other module which does asynchronous IO, Next.js interprets your intent as expecting the data to load on every user request.

If you are expecting this data to be used while fully or partially prerendering a page you must cache is using "use cache".

If this data should be accessed on every user request you must provide a fallback UI using Suspense from React. Where you put this Suspense boundary in your application should be informed by the kind of fallback UI you want to render. It can be immediately above the component accessing this data or even in your Root Layout.

If you are accessing request headers using headers(), cookies(), or draftMode(). Consider whether you can move the use of these APIs deeper into your existing component tree.

Alternatively you can add a Suspense boundary above the component that is accessing Request headers.

Layout params, and Page params and searchParams props are promises. If you await them in the Layout or Page component you might be accessing these props higher than is actually required. Try passing these props to deeper components as a promise and awaiting them closer to where the actual param or searchParam is required

Alternatively you can add a Suspense boundary above the component that is accessing params or searchParams so Next.js understands what UI should be used when while waiting for this request data to be accessed.

"use cache" allows you to describe a cacheLife() that might be too short to be practical to prerender. The utility of doing this is that it can still describe a non-zero caching time for the client router cache to reuse the cache entry in the browser and it can also be useful for protecting upstream APIs while experiencing high request traffic.

If you expected the "use cache" entry to be prerenderable try describing a slightly longer cacheLife().

Alternatively you can add a Suspense boundary above the component that is accessing this short-lived cached data so Next.js understands what UI should be used while accessing this data on a user request.

**Examples:**

Example 1 (javascript):
```javascript
async function getRecentArticles() {
  return db.query(...)
}
 
export default async function Page() {
  const articles = await getRecentArticles(token);
  return <ArticleList articles={articles}>
}
```

Example 2 (python):
```python
import { cacheTag, cacheLife } from 'next/cache'
 
async function getRecentArticles() {
  "use cache"
  // This cache can be revalidated by webhook or server action
  // when you call revalidateTag("articles")
  cacheTag("articles")
  // This cache will revalidate after an hour even if no explicit
  // revalidate instruction was received
  cacheLife('hours')
  return db.query(...)
}
 
export default async function Page() {
  const articles = await getRecentArticles(token);
  return <ArticleList articles={articles}>
}
```

Example 3 (javascript):
```javascript
async function getLatestTransactions() {
  return db.query(...)
}
 
export default async function Page() {
  const transactions = await getLatestTransactions(token);
  return <TransactionList transactions={transactions}>
}
```

Example 4 (python):
```python
import { Suspense } from 'react'
 
async function TransactionList() {
  const transactions = await db.query(...)
  return ...
}
 
function TransactionSkeleton() {
  return <ul>...</ul>
}
 
export default async function Page() {
  return (
    <Suspense fallback={<TransactionSkeleton />}>
      <TransactionList/>
    </Suspense>
  )
}
```

---

## No async Client Component

**URL:** https://nextjs.org/docs/messages/no-async-client-component

**Contents:**
- No async Client Component
- Why This Error Occurred
- Possible Ways to Fix It
  - Recommended: Server-side data fetching
  - Using use with Context Provider
  - Client-side data fetching

Client components cannot be async functions.

The error occurs when you try to define a Client Component as an async function. React Client Components do not support async functions. For example:

We recommend fetching data on the server. For example:

Another pattern to explore is using the React use hook with a Context Provider. This allows you to pass Promises to child components and resolve them using the use hook . Here's an example:

First, let's create a separate file for the context provider:

Now, let's create the Promise in a Server Component and stream it to the client:

Here is the blog posts component:

This pattern allows you to start data fetching early and pass the Promise down to child components, which can then use the use hook to access the data when it's ready.

In scenarios where client fetching is needed, you can call fetch in useEffect (not recommended), or lean on popular React libraries in the community (such as SWR or React Query) for client fetching.

**Examples:**

Example 1 (unknown):
```unknown
'use client'
 
// This will cause an error
async function ClientComponent() {
  // ...
}
```

Example 2 (javascript):
```javascript
export default async function Page() {
  const data = await fetch('https://api.vercel.app/blog')
  const posts = await data.json()
  return (
    <ul>
      {posts.map((post) => (
        <li key={post.id}>{post.title}</li>
      ))}
    </ul>
  )
}
```

Example 3 (python):
```python
'use client'
 
import { createContext, useContext } from 'react'
 
export const BlogContext = createContext<Promise<any> | null>(null)
 
export function BlogProvider({
  children,
  blogPromise,
}: {
  children: React.ReactNode
  blogPromise: Promise<any>
}) {
  return (
    <BlogContext.Provider value={blogPromise}>{children}</BlogContext.Provider>
  )
}
 
export function useBlogContext() {
  const context = useContext(BlogContext)
  if (!context) {
    throw new Error('useBlogContext must be used within a BlogProvider')
  }
  return context
}
```

Example 4 (python):
```python
import { BlogProvider } from './context'
 
export default function Page() {
  const blogPromise = fetch('https://api.vercel.app/blog').then((res) =>
    res.json()
  )
 
  return (
    <BlogProvider blogPromise={blogPromise}>
      <BlogPosts />
    </BlogProvider>
  )
}
```

---

## Google Font Preconnect

**URL:** https://nextjs.org/docs/messages/google-font-preconnect

**Contents:**
- Google Font Preconnect
- Why This Error Occurred
- Possible Ways to Fix It
- Useful Links

Note: Next.js automatically adds <link rel="preconnect" /> after version 12.0.1.

Ensure preconnect is used with Google Fonts.

A preconnect resource hint was not used with a request to the Google Fonts domain. Adding preconnect is recommended to initiate an early connection to the origin.

Add rel="preconnect" to the Google Font domain <link> tag:

Note: a separate link with dns-prefetch can be used as a fallback for browsers that don't support preconnect although this is not required.

**Examples:**

Example 1 (unknown):
```unknown
<link rel="preconnect" href="https://fonts.gstatic.com" />
```

---

## Next.js Community

**URL:** https://nextjs.org/docs/15/community

**Contents:**
- Next.js Community
- Contributing
- Discussions
- Social Media
- Code of Conduct
  - Contribution Guide
  - Rspack

With over 5 million weekly downloads, Next.js has a large and active community of developers across the world. Here's how you can get involved in our community:

There are a couple of ways you can contribute to the development of Next.js:

If you have a question about Next.js, or want to help others, you're always welcome to join the conversation:

Follow Next.js on Twitter for the latest updates, and subscribe to the Vercel YouTube channel for Next.js videos.

We believe in creating an inclusive, welcoming community. As such, we ask all members to adhere to our Code of Conduct. This document outlines our expectations for participant behavior. We invite you to read it and help us maintain a safe and respectful environment.

---

## Next.js Community

**URL:** https://nextjs.org/docs/community

**Contents:**
- Next.js Community
- Contributing
- Discussions
- Social Media
- Code of Conduct
  - Contribution Guide
  - Rspack

With over 5 million weekly downloads, Next.js has a large and active community of developers across the world. Here's how you can get involved in our community:

There are a couple of ways you can contribute to the development of Next.js:

If you have a question about Next.js, or want to help others, you're always welcome to join the conversation:

Follow Next.js on Twitter for the latest updates, and subscribe to the Vercel YouTube channel for Next.js videos.

We believe in creating an inclusive, welcoming community. As such, we ask all members to adhere to our Code of Conduct. This document outlines our expectations for participant behavior. We invite you to read it and help us maintain a safe and respectful environment.

---

## No Sync Scripts

**URL:** https://nextjs.org/docs/messages/no-sync-scripts

**Contents:**
- No Sync Scripts
- Why This Error Occurred
- Possible Ways to Fix It
  - Script component (recommended)
  - Use async or defer
- Useful Links

Prevent synchronous scripts.

A synchronous script was used which can impact your webpage performance.

**Examples:**

Example 1 (python):
```python
import Script from 'next/script'
 
function Home() {
  return (
    <div class="container">
      <Script src="https://third-party-script.js"></Script>
      <div>Home Page</div>
    </div>
  )
}
 
export default Home
```

Example 2 (unknown):
```unknown
<script src="https://third-party-script.js" async />
<script src="https://third-party-script.js" defer />
```

---

## Missing Suspense boundary with useSearchParams

**URL:** https://nextjs.org/docs/messages/missing-suspense-with-csr-bailout

**Contents:**
- Missing Suspense boundary with useSearchParams
- Why This Error Occurred
- Possible Ways to Fix It
- Disabling
- Useful Links

Reading search parameters through useSearchParams() without a Suspense boundary will opt the entire page into client-side rendering. This could cause your page to be blank until the client-side JavaScript has loaded.

You have a few options depending on your intent:

Note: This is only available with Next.js version 14.x. If you're in versions above 14 please fix it with the approach above.

We don't recommend disabling this rule. However, if you need to, you can disable it by setting the missingSuspenseWithCSRBailout option to false in your next.config.js:

This configuration option will be removed in a future major version.

**Examples:**

Example 1 (python):
```python
import { connection } from 'next/server'
 
export default async function Page() {
  await connection()
  return <div>...</div>
}
```

Example 2 (javascript):
```javascript
export const dynamic = 'force-dynamic'
 
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
```

Example 3 (python):
```python
import { Suspense } from 'react'
import ClientSearch from './client-search'
 
export default function Page({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>
}) {
  return (
    <Suspense fallback={<>...</>}>
      <ClientSearch searchParams={searchParams} />
    </Suspense>
  )
}
```

Example 4 (python):
```python
'use client'
 
import { use } from 'react'
 
export default function ClientSearch({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>
}) {
  const params = use(searchParams)
  return <div>Query: {params.q}</div>
}
```

---

## Supported Browsers

**URL:** https://nextjs.org/docs/architecture/supported-browsers

**Contents:**
- Supported Browsers
- Browserslist
- Polyfills
  - Custom Polyfills
    - In App Router
    - In Pages Router
    - Conditionally loading polyfills
- JavaScript Language Features
  - TypeScript Features
  - Customizing Babel Config (Advanced)

Next.js supports modern browsers with zero configuration.

If you would like to target specific browsers or features, Next.js supports Browserslist configuration in your package.json file. Next.js uses the following Browserslist configuration by default:

We inject widely used polyfills, including:

If any of your dependencies include these polyfills, they’ll be eliminated automatically from the production build to avoid duplication.

In addition, to reduce bundle size, Next.js will only load these polyfills for browsers that require them. The majority of the web traffic globally will not download these polyfills.

If your own code or any external npm dependencies require features not supported by your target browsers (such as IE 11), you need to add polyfills yourself.

To include polyfills, you can import them into the instrumentation-client.js file.

In this case, you should add a top-level import for the specific polyfill you need in your Custom <App> or the individual component.

The best approach is to isolate unsupported features to specific UI sections and conditionally load the polyfill if needed.

Next.js allows you to use the latest JavaScript features out of the box. In addition to ES6 features, Next.js also supports:

Next.js has built-in TypeScript support. Learn more here.

You can customize babel configuration. Learn more here.

**Examples:**

Example 1 (unknown):
```unknown
{
  "browserslist": ["chrome 111", "edge 111", "firefox 111", "safari 16.4"]
}
```

Example 2 (unknown):
```unknown
import './polyfills'
```

Example 3 (python):
```python
import './polyfills'
 
import type { AppProps } from 'next/app'
 
export default function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}
```

Example 4 (python):
```python
import { useCallback } from 'react'
 
export const useAnalytics = () => {
  const tracker = useCallback(async (data: unknown) => {
    if (!('structuredClone' in globalThis)) {
      import('polyfills/structured-clone').then((mod) => {
        globalThis.structuredClone = mod.default
      })
    }
 
    /* Do some work that uses structured clone */
  }, [])
 
  return tracker
}
```

---

## No img element

**URL:** https://nextjs.org/docs/messages/no-img-element

**Contents:**
- No img element
- Why This Error Occurred
- Possible Ways to Fix It
- Useful Links

Prevent usage of <img> element due to slower LCP and higher bandwidth.

An <img> element was used to display an image instead of <Image /> from next/image.

Note: If deploying to a managed hosting provider, remember to check provider pricing since optimized images might be charged differently than the original images.

Common image optimization platform pricing:

Note: If self-hosting, remember to install sharp and check if your server has enough storage to cache the optimized images.

**Examples:**

Example 1 (python):
```python
import Image from 'next/image'
 
function Home() {
  return (
    <Image
      src="https://example.com/hero.jpg"
      alt="Landscape picture"
      width={800}
      height={500}
    />
  )
}
 
export default Home
```

Example 2 (python):
```python
import Image from 'next/image'
 
const UnoptimizedImage = (props) => {
  return <Image {...props} unoptimized />
}
```

Example 3 (unknown):
```unknown
function Home() {
  return (
    <picture>
      <source srcSet="https://example.com/hero.avif" type="image/avif" />
      <source srcSet="https://example.com/hero.webp" type="image/webp" />
      <img
        src="https://example.com/hero.jpg"
        alt="Landscape picture"
        width={800}
        height={500}
      />
    </picture>
  )
}
```

Example 4 (unknown):
```unknown
module.exports = {
  images: {
    loader: 'custom',
    loaderFile: './my/image/loader.js',
  },
}
```

---

## No Script Component in Head

**URL:** https://nextjs.org/docs/messages/no-script-component-in-head

**Contents:**
- No Script Component in Head
- Why This Error Occurred
- Possible Ways to Fix It
- Useful Links

Prevent usage of next/script in next/head component.

The next/script component should not be used in a next/head component.

Move the <Script /> component outside of <Head> instead.

**Examples:**

Example 1 (python):
```python
import Script from 'next/script'
import Head from 'next/head'
 
export default function Index() {
  return (
    <Head>
      <title>Next.js</title>
      <Script src="/my-script.js" />
    </Head>
  )
}
```

Example 2 (python):
```python
import Script from 'next/script'
import Head from 'next/head'
 
export default function Index() {
  return (
    <>
      <Head>
        <title>Next.js</title>
      </Head>
      <Script src="/my-script.js" />
    </>
  )
}
```

---
