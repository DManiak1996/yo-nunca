# Nextjs - Getting Started

**Pages:** 46

---

## CSS

**URL:** https://nextjs.org/docs/15/app/getting-started/css

**Contents:**
- CSS
- Tailwind CSS
- CSS Modules
- Global CSS
- External stylesheets
- Ordering and Merging
  - Recommendations
- Development vs Production
- Next Steps
  - Tailwind CSS v3

Next.js provides several ways to style your application using CSS, including:

Tailwind CSS is a utility-first CSS framework that provides low-level utility classes to build custom designs.

Install Tailwind CSS:

Add the PostCSS plugin to your postcss.config.mjs file:

Import Tailwind in your global CSS file:

Import the CSS file in your root layout:

Now you can start using Tailwind's utility classes in your application:

Good to know: If you need broader browser support for very old browsers, see the Tailwind CSS v3 setup instructions.

CSS Modules locally scope CSS by generating unique class names. This allows you to use the same class in different files without worrying about naming collisions.

To start using CSS Modules, create a new file with the extension .module.css and import it into any component inside the app directory:

You can use global CSS to apply styles across your application.

Create a app/global.css file and import it in the root layout to apply the styles to every route in your application:

Good to know: Global styles can be imported into any layout, page, or component inside the app directory. However, since Next.js uses React's built-in support for stylesheets to integrate with Suspense, this currently does not remove stylesheets as you navigate between routes which can lead to conflicts. We recommend using global styles for truly global CSS (like Tailwind's base styles), Tailwind CSS for component styling, and CSS Modules for custom scoped CSS when needed.

Stylesheets published by external packages can be imported anywhere in the app directory, including colocated components:

Good to know: In React 19, <link rel="stylesheet" href="..." /> can also be used. See the React link documentation for more information.

Next.js optimizes CSS during production builds by automatically chunking (merging) stylesheets. The order of your CSS depends on the order you import styles in your code.

For example, base-button.module.css will be ordered before page.module.css since <BaseButton> is imported before page.module.css:

To keep CSS ordering predictable:

**Examples:**

Example 1 (unknown):
```unknown
pnpm add -D tailwindcss @tailwindcss/postcss
```

Example 2 (unknown):
```unknown
export default {
  plugins: {
    '@tailwindcss/postcss': {},
  },
}
```

Example 3 (unknown):
```unknown
@import 'tailwindcss';
```

Example 4 (unknown):
```unknown
import './globals.css'
 
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
```

---

## Caching and Revalidating

**URL:** https://nextjs.org/docs/15/app/getting-started/caching-and-revalidating

**Contents:**
- Caching and Revalidating
- fetch
- unstable_cache
- revalidateTag
- revalidatePath
- API Reference
  - fetch
  - unstable_cache
  - revalidatePath
  - revalidateTag

Caching is a technique for storing the result of data fetching and other computations so that future requests for the same data can be served faster, without doing the work again. While revalidation allows you to update cache entries without having to rebuild your entire application.

Next.js provides a few APIs to handle caching and revalidation. This guide will walk you through when and how to use them.

By default, fetch requests are not cached. You can cache individual requests by setting the cache option to 'force-cache'.

Good to know: Although fetch requests are not cached by default, Next.js will prerender routes that have fetch requests and cache the HTML. If you want to guarantee a route is dynamic, use the connection API.

To revalidate the data returned by a fetch request, you can use the next.revalidate option.

This will revalidate the data after a specified amount of seconds.

See the fetch API reference to learn more.

unstable_cache allows you to cache the result of database queries and other async functions. To use it, wrap unstable_cache around the function. For example:

The function accepts a third optional object to define how the cache should be revalidated. It accepts:

See the unstable_cache API reference to learn more.

revalidateTag is used to revalidate cache entries based on a tag and following an event. To use it with fetch, start by tagging the function with the next.tags option:

Alternatively, you can mark an unstable_cache function with the tags option:

Then, call revalidateTag in a Route Handler or Server Action:

You can reuse the same tag in multiple functions to revalidate them all at once.

See the revalidateTag API reference to learn more.

revalidatePath is used to revalidate a route and following an event. To use it, call it in a Route Handler or Server Action:

See the revalidatePath API reference to learn more.

**Examples:**

Example 1 (javascript):
```javascript
export default async function Page() {
  const data = await fetch('https://...', { cache: 'force-cache' })
}
```

Example 2 (javascript):
```javascript
export default async function Page() {
  const data = await fetch('https://...', { next: { revalidate: 3600 } })
}
```

Example 3 (python):
```python
import { db } from '@/lib/db'
export async function getUserById(id: string) {
  return db
    .select()
    .from(users)
    .where(eq(users.id, id))
    .then((res) => res[0])
}
```

Example 4 (python):
```python
import { unstable_cache } from 'next/cache'
import { getUserById } from '@/app/lib/data'
 
export default async function Page({
  params,
}: {
  params: Promise<{ userId: string }>
}) {
  const { userId } = await params
 
  const getCachedUser = unstable_cache(
    async () => {
      return getUserById(userId)
    },
    [userId] // add the user ID to the cache key
  )
}
```

---

## Font Optimization

**URL:** https://nextjs.org/docs/app/getting-started/fonts

**Contents:**
- Font Optimization
- Google fonts
- Local fonts
- API Reference
  - Font

The next/font module automatically optimizes your fonts and removes external network requests for improved privacy and performance.

It includes built-in self-hosting for any font file. This means you can optimally load web fonts with no layout shift.

To start using next/font, import it from next/font/local or next/font/google, call it as a function with the appropriate options, and set the className of the element you want to apply the font to. For example:

Fonts are scoped to the component they're used in. To apply a font to your entire application, add it to the Root Layout.

You can automatically self-host any Google Font. Fonts are included stored as static assets and served from the same domain as your deployment, meaning no requests are sent to Google by the browser when the user visits your site.

To start using a Google Font, import your chosen font from next/font/google:

We recommend using variable fonts for the best performance and flexibility. But if you can't use a variable font, you will need to specify a weight:

To use a local font, import your font from next/font/local and specify the src of your local font file. Fonts can be stored in the public folder or co-located inside the app folder. For example:

If you want to use multiple files for a single font family, src can be an array:

**Examples:**

Example 1 (python):
```python
import { Geist } from 'next/font/google'
 
const geist = Geist({
  subsets: ['latin'],
})
 
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={geist.className}>
      <body>{children}</body>
    </html>
  )
}
```

Example 2 (python):
```python
import { Geist } from 'next/font/google'
 
const geist = Geist({
  subsets: ['latin'],
})
 
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={geist.className}>
      <body>{children}</body>
    </html>
  )
}
```

Example 3 (python):
```python
import { Roboto } from 'next/font/google'
 
const roboto = Roboto({
  weight: '400',
  subsets: ['latin'],
})
 
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={roboto.className}>
      <body>{children}</body>
    </html>
  )
}
```

Example 4 (python):
```python
import localFont from 'next/font/local'
 
const myFont = localFont({
  src: './my-font.woff2',
})
 
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={myFont.className}>
      <body>{children}</body>
    </html>
  )
}
```

---

## Fetching Data

**URL:** https://nextjs.org/docs/15/app/getting-started/fetching-data

**Contents:**
- Fetching Data
- Fetching data
  - Server Components
    - With the fetch API
    - With an ORM or database
  - Client Components
    - Streaming data with the use hook
    - Community libraries
- Deduplicate requests and cache data
- Streaming

This page will walk you through how you can fetch data in Server and Client Components, and how to stream components that depend on data.

You can fetch data in Server Components using:

To fetch data with the fetch API, turn your component into an asynchronous function, and await the fetch call. For example:

Since Server Components are rendered on the server, you can safely make database queries using an ORM or database client. Turn your component into an asynchronous function, and await the call:

There are two ways to fetch data in Client Components, using:

You can use React's use hook to stream data from the server to client. Start by fetching data in your Server component, and pass the promise to your Client Component as prop:

Then, in your Client Component, use the use hook to read the promise:

In the example above, the <Posts> component is wrapped in a <Suspense> boundary. This means the fallback will be shown while the promise is being resolved. Learn more about streaming.

You can use a community library like SWR or React Query to fetch data in Client Components. These libraries have their own semantics for caching, streaming, and other features. For example, with SWR:

One way to deduplicate fetch requests is with request memoization. With this mechanism, fetch calls using GET or HEAD with the same URL and options in a single render pass are combined into one request. This happens automatically, and you can opt out by passing an Abort signal to fetch.

Request memoization is scoped to the lifetime of a request.

You can also deduplicate fetch requests by using Next.js’ Data Cache, for example by setting cache: 'force-cache' in your fetch options.

Data Cache allows sharing data across the current render pass and incoming requests.

If you are not using fetch, and instead using an ORM or database directly, you can wrap your data access with the React cache function.

Warning: The content below assumes the cacheComponents config option is enabled in your application. The flag was introduced in Next.js 15 canary.

When using async/await in Server Components, Next.js will opt into dynamic rendering. This means the data will be fetched and rendered on the server for every user request. If there are any slow data requests, the whole route will be blocked from rendering.

To improve the initial load time and user experience, you can use streaming to break up the page's HTML into smaller chunks and progressively send those chunks from the server to the client.

There are two ways you can implement streaming in your application:

You can create a loading.js file in the same folder as your page to stream the entire page while the data is being fetched. For example, to stream app/blog/page.js, add the file inside the app/blog folder.

On navigation, the user will immediately see the layout and a loading state while the page is being rendered. The new content will then be automatically swapped in once rendering is complete.

Behind-the-scenes, loading.js will be nested inside layout.js, and will automatically wrap the page.js file and any children below in a <Suspense> boundary.

This approach works well for route segments (layouts and pages), but for more granular streaming, you can use <Suspense>.

<Suspense> allows you to be more granular about what parts of the page to stream. For example, you can immediately show any page content that falls outside of the <Suspense> boundary, and stream in the list of blog posts inside the boundary.

An instant loading state is fallback UI that is shown immediately to the user after navigation. For the best user experience, we recommend designing loading states that are meaningful and help users understand the app is responding. For example, you can use skeletons and spinners, or a small but meaningful part of future screens such as a cover photo, title, etc.

In development, you can preview and inspect the loading state of your components using the React Devtools.

Sequential data fetching happens when nested components in a tree each fetch their own data and the requests are not deduplicated, leading to longer response times.

There may be cases where you want this pattern because one fetch depends on the result of the other.

For example, the <Playlists> component will only start fetching data once the <Artist> component has finished fetching data because <Playlists> depends on the artistID prop:

To improve the user experience, you should use React <Suspense> to show a fallback while data is being fetch. This will enable streaming and prevent the whole route from being blocked by the sequential data requests.

Parallel data fetching happens when data requests in a route are eagerly initiated and start at the same time.

By default, layouts and pages are rendered in parallel. So each segment starts fetching data as soon as possible.

However, within any component, multiple async/await requests can still be sequential if placed after the other. For example, getAlbums will be blocked until getArtist is resolved:

You can initiate requests in parallel by defining them outside the components that use the data, and resolving them together, for example, with Promise.all:

Good to know: If one request fails when using Promise.all, the entire operation will fail. To handle this, you can use the Promise.allSettled method instead.

You can preload data by creating an utility function that you eagerly call above blocking requests. <Item> conditionally renders based on the checkIsAvailable() function.

You can call preload() before checkIsAvailable() to eagerly initiate <Item/> data dependencies. By the time <Item/> is rendered, its data has already been fetched.

Additionally, you can use React's cache function and the server-only package to create a reusable utility function. This approach allows you to cache the data fetching function and ensure that it's only executed on the server.

**Examples:**

Example 1 (javascript):
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

Example 2 (python):
```python
import { db, posts } from '@/lib/db'
 
export default async function Page() {
  const allPosts = await db.select().from(posts)
  return (
    <ul>
      {allPosts.map((post) => (
        <li key={post.id}>{post.title}</li>
      ))}
    </ul>
  )
}
```

Example 3 (python):
```python
import Posts from '@/app/ui/posts'
import { Suspense } from 'react'
 
export default function Page() {
  // Don't await the data fetching function
  const posts = getPosts()
 
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Posts posts={posts} />
    </Suspense>
  )
}
```

Example 4 (python):
```python
'use client'
import { use } from 'react'
 
export default function Posts({
  posts,
}: {
  posts: Promise<{ id: string; title: string }[]>
}) {
  const allPosts = use(posts)
 
  return (
    <ul>
      {allPosts.map((post) => (
        <li key={post.id}>{post.title}</li>
      ))}
    </ul>
  )
}
```

---

## Server and Client Components

**URL:** https://nextjs.org/docs/app/getting-started/server-and-client-components

**Contents:**
- Server and Client Components
- When to use Server and Client Components?
- How do Server and Client Components work in Next.js?
  - On the server
  - On the client (first load)
  - Subsequent Navigations
- Examples
  - Using Client Components
  - Reducing JS bundle size
  - Passing data from Server to Client Components

By default, layouts and pages are Server Components, which lets you fetch data and render parts of your UI on the server, optionally cache the result, and stream it to the client. When you need interactivity or browser APIs, you can use Client Components to layer in functionality.

This page explains how Server and Client Components work in Next.js and when to use them, with examples of how to compose them together in your application.

The client and server environments have different capabilities. Server and Client components allow you to run logic in each environment depending on your use case.

Use Client Components when you need:

Use Server Components when you need:

For example, the <Page> component is a Server Component that fetches data about a post, and passes it as props to the <LikeButton> which handles client-side interactivity.

On the server, Next.js uses React's APIs to orchestrate rendering. The rendering work is split into chunks, by individual route segments (layouts and pages):

What is the React Server Component Payload (RSC)?

The RSC Payload is a compact binary representation of the rendered React Server Components tree. It's used by React on the client to update the browser's DOM. The RSC Payload contains:

Hydration is React's process for attaching event handlers to the DOM, to make the static HTML interactive.

On subsequent navigations:

You can create a Client Component by adding the "use client" directive at the top of the file, above your imports.

"use client" is used to declare a boundary between the Server and Client module graphs (trees).

Once a file is marked with "use client", all its imports and child components are considered part of the client bundle. This means you don't need to add the directive to every component that is intended for the client.

To reduce the size of your client JavaScript bundles, add 'use client' to specific interactive components instead of marking large parts of your UI as Client Components.

For example, the <Layout> component contains mostly static elements like a logo and navigation links, but includes an interactive search bar. <Search /> is interactive and needs to be a Client Component, however, the rest of the layout can remain a Server Component.

You can pass data from Server Components to Client Components using props.

Alternatively, you can stream data from a Server Component to a Client Component with the use Hook. See an example.

Good to know: Props passed to Client Components need to be serializable by React.

You can pass Server Components as a prop to a Client Component. This allows you to visually nest server-rendered UI within Client components.

A common pattern is to use children to create a slot in a <ClientComponent>. For example, a <Cart> component that fetches data on the server, inside a <Modal> component that uses client state to toggle visibility.

Then, in a parent Server Component (e.g.<Page>), you can pass a <Cart> as the child of the <Modal>:

In this pattern, all Server Components will be rendered on the server ahead of time, including those as props. The resulting RSC payload will contain references of where Client Components should be rendered within the component tree.

React context is commonly used to share global state like the current theme. However, React context is not supported in Server Components.

To use context, create a Client Component that accepts children:

Then, import it into a Server Component (e.g. layout):

Your Server Component will now be able to directly render your provider, and all other Client Components throughout your app will be able to consume this context.

Good to know: You should render providers as deep as possible in the tree – notice how ThemeProvider only wraps {children} instead of the entire <html> document. This makes it easier for Next.js to optimize the static parts of your Server Components.

When using a third-party component that relies on client-only features, you can wrap it in a Client Component to ensure it works as expected.

For example, the <Carousel /> can be imported from the acme-carousel package. This component uses useState, but it doesn't yet have the "use client" directive.

If you use <Carousel /> within a Client Component, it will work as expected:

However, if you try to use it directly within a Server Component, you'll see an error. This is because Next.js doesn't know <Carousel /> is using client-only features.

To fix this, you can wrap third-party components that rely on client-only features in your own Client Components:

Now, you can use <Carousel /> directly within a Server Component:

Advice for Library Authors

If you’re building a component library, add the "use client" directive to entry points that rely on client-only features. This lets your users import components into Server Components without needing to create wrappers.

It's worth noting some bundlers might strip out "use client" directives. You can find an example of how to configure esbuild to include the "use client" directive in the React Wrap Balancer and Vercel Analytics repositories.

JavaScript modules can be shared between both Server and Client Components modules. This means it's possible to accidentally import server-only code into the client. For example, consider the following function:

This function contains an API_KEY that should never be exposed to the client.

In Next.js, only environment variables prefixed with NEXT_PUBLIC_ are included in the client bundle. If variables are not prefixed, Next.js replaces them with an empty string.

As a result, even though getData() can be imported and executed on the client, it won't work as expected.

To prevent accidental usage in Client Components, you can use the server-only package.

Then, import the package into a file that contains server-only code:

Now, if you try to import the module into a Client Component, there will be a build-time error.

The corresponding client-only package can be used to mark modules that contain client-only logic like code that accesses the window object.

In Next.js, installing server-only or client-only is optional. However, if your linting rules flag extraneous dependencies, you may install them to avoid issues.

Next.js handles server-only and client-only imports internally to provide clearer error messages when a module is used in the wrong environment. The contents of these packages from NPM are not used by Next.js.

Next.js also provides its own type declarations for server-only and client-only, for TypeScript configurations where noUncheckedSideEffectImports is active.

**Examples:**

Example 1 (python):
```python
import LikeButton from '@/app/ui/like-button'
import { getPost } from '@/lib/data'
 
export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const post = await getPost(id)
 
  return (
    <div>
      <main>
        <h1>{post.title}</h1>
        {/* ... */}
        <LikeButton likes={post.likes} />
      </main>
    </div>
  )
}
```

Example 2 (python):
```python
'use client'
 
import { useState } from 'react'
 
export default function LikeButton({ likes }: { likes: number }) {
  // ...
}
```

Example 3 (python):
```python
'use client'
 
import { useState } from 'react'
 
export default function Counter() {
  const [count, setCount] = useState(0)
 
  return (
    <div>
      <p>{count} likes</p>
      <button onClick={() => setCount(count + 1)}>Click me</button>
    </div>
  )
}
```

Example 4 (python):
```python
// Client Component
import Search from './search'
// Server Component
import Logo from './logo'
 
// Layout is a Server Component by default
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <nav>
        <Logo />
        <Search />
      </nav>
      <main>{children}</main>
    </>
  )
}
```

---

## How to use fonts

**URL:** https://nextjs.org/docs/pages/getting-started/fonts

**Contents:**
- How to use fonts
- Google fonts
- Local fonts
- API Reference
  - Font

The next/font module automatically optimizes your fonts and removes external network requests for improved privacy and performance.

It includes built-in self-hosting for any font file. This means you can optimally load web fonts with no layout shift.

To start using next/font, import it from next/font/local or next/font/google, call it as a function with the appropriate options, and set the className of the element you want to apply the font to. For example:

Fonts are scoped to the component they're used in. To apply a font to your entire application, add it to the Root Layout.

You can automatically self-host any Google Font. Fonts are included stored as static assets and served from the same domain as your deployment, meaning no requests are sent to Google by the browser when the user visits your site.

To start using a Google Font, import your chosen font from next/font/google:

We recommend using variable fonts for the best performance and flexibility. But if you can't use a variable font, you will need to specify a weight:

To use a local font, import your font from next/font/local and specify the src of your local font file. Fonts can be stored in the public folder or co-located inside the app folder. For example:

If you want to use multiple files for a single font family, src can be an array:

**Examples:**

Example 1 (python):
```python
import { Geist } from 'next/font/google'
 
const geist = Geist({
  subsets: ['latin'],
})
 
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={geist.className}>
      <body>{children}</body>
    </html>
  )
}
```

Example 2 (python):
```python
import { Geist } from 'next/font/google'
 
const geist = Geist({
  subsets: ['latin'],
})
 
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={geist.className}>
      <body>{children}</body>
    </html>
  )
}
```

Example 3 (python):
```python
import { Roboto } from 'next/font/google'
 
const roboto = Roboto({
  weight: '400',
  subsets: ['latin'],
})
 
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={roboto.className}>
      <body>{children}</body>
    </html>
  )
}
```

Example 4 (python):
```python
import localFont from 'next/font/local'
 
const myFont = localFont({
  src: './my-font.woff2',
})
 
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={myFont.className}>
      <body>{children}</body>
    </html>
  )
}
```

---

## Route Handlers

**URL:** https://nextjs.org/docs/app/getting-started/route-handlers

**Contents:**
- Route Handlers
- Route Handlers
  - Convention
  - Supported HTTP Methods
  - Extended NextRequest and NextResponse APIs
  - Caching
    - With Cache Components
  - Special Route Handlers
  - Route Resolution
  - Route Context Helper

Route Handlers allow you to create custom request handlers for a given route using the Web Request and Response APIs.

Good to know: Route Handlers are only available inside the app directory. They are the equivalent of API Routes inside the pages directory meaning you do not need to use API Routes and Route Handlers together.

Route Handlers are defined in a route.js|ts file inside the app directory:

Route Handlers can be nested anywhere inside the app directory, similar to page.js and layout.js. But there cannot be a route.js file at the same route segment level as page.js.

The following HTTP methods are supported: GET, POST, PUT, PATCH, DELETE, HEAD, and OPTIONS. If an unsupported method is called, Next.js will return a 405 Method Not Allowed response.

In addition to supporting the native Request and Response APIs, Next.js extends them with NextRequest and NextResponse to provide convenient helpers for advanced use cases.

Route Handlers are not cached by default. You can, however, opt into caching for GET methods. Other supported HTTP methods are not cached. To cache a GET method, use a route config option such as export const dynamic = 'force-static' in your Route Handler file.

Good to know: Other supported HTTP methods are not cached, even if they are placed alongside a GET method that is cached, in the same file.

When using Cache Components, you can use the use cache directive to cache data fetching within your Route Handlers. Route Handlers are dynamic by default, but can be pre-rendered at build time if they don't use runtime or dynamic data.

See the Cache Components documentation for more details on caching strategies and revalidation.

Special Route Handlers like sitemap.ts, opengraph-image.tsx, and icon.tsx, and other metadata files remain static by default unless they use Dynamic APIs or dynamic config options.

You can consider a route the lowest level routing primitive.

Each route.js or page.js file takes over all HTTP verbs for that route.

Read more about how Route Handlers complement your frontend application, or explore the Route Handlers API Reference.

In TypeScript, you can type the context parameter for Route Handlers with the globally available RouteContext helper:

**Examples:**

Example 1 (unknown):
```unknown
export async function GET(request: Request) {}
```

Example 2 (javascript):
```javascript
export const dynamic = 'force-static'
 
export async function GET() {
  const res = await fetch('https://data.mongodb-api.com/...', {
    headers: {
      'Content-Type': 'application/json',
      'API-Key': process.env.DATA_API_KEY,
    },
  })
  const data = await res.json()
 
  return Response.json({ data })
}
```

Example 3 (python):
```python
import { cacheTag } from 'next/cache'
 
async function getPosts() {
  'use cache'
  cacheTag('posts')
 
  const posts = await fetchPosts()
  return posts
}
 
export async function GET() {
  const posts = await getPosts()
  return Response.json(posts)
}
```

Example 4 (unknown):
```unknown
export default function Page() {
  return <h1>Hello, Next.js!</h1>
}
 
// Conflict
// `app/route.ts`
export async function POST(request: Request) {}
```

---

## Installation

**URL:** https://nextjs.org/docs/15/app/getting-started/installation

**Contents:**
- Installation
- Quick start
- System requirements
- Create with the CLI
- Manual installation
  - Create the app directory
  - Create the public folder (optional)
- Run the development server
- Set up TypeScript
  - IDE Plugin

Create a new Next.js app and run it locally.

Before you begin, make sure your system meets the following requirements:

The quickest way to create a new Next.js app is using create-next-app, which sets up everything automatically for you. To create a project, run:

On installation, you'll see the following prompts:

After the prompts, create-next-app will create a folder with your project name and install the required dependencies.

To manually create a new Next.js app, install the required packages:

Good to know: The App Router uses React canary releases built-in, which include all the stable React 19 changes, as well as newer features being validated in frameworks. The Pages Router uses the React version you install in package.json.

Then, add the following scripts to your package.json file:

These scripts refer to the different stages of developing an application:

Turbopack is stable for dev. For production builds, Turbopack is in beta. To try it, run next build --turbopack. See the Turbopack docs for status and caveats.

Next.js uses file-system routing, which means the routes in your application are determined by how you structure your files.

Create an app folder. Then, inside app, create a layout.tsx file. This file is the root layout. It's required and must contain the <html> and <body> tags.

Create a home page app/page.tsx with some initial content:

Both layout.tsx and page.tsx will be rendered when the user visits the root of your application (/).

Create a public folder at the root of your project to store static assets such as images, fonts, etc. Files inside public can then be referenced by your code starting from the base URL (/).

You can then reference these assets using the root path (/). For example, public/profile.png can be referenced as /profile.png:

Minimum TypeScript version: v4.5.2

Next.js comes with built-in TypeScript support. To add TypeScript to your project, rename a file to .ts / .tsx and run next dev. Next.js will automatically install the necessary dependencies and add a tsconfig.json file with the recommended config options.

Next.js includes a custom TypeScript plugin and type checker, which VSCode and other code editors can use for advanced type-checking and auto-completion.

You can enable the plugin in VS Code by:

See the TypeScript reference page for more information.

Next.js comes with built-in ESLint. It automatically installs the necessary packages and configures the proper settings when you create a new project with create-next-app.

To manually add ESLint to an existing project, add next lint as a script to package.json:

Then, run npm run lint and you will be guided through the installation and configuration process.

You'll see a prompt like this:

? How would you like to configure ESLint?

❯ Strict (recommended) Base Cancel

If Strict or Base are selected, Next.js will automatically install eslint and eslint-config-next as dependencies in your application and create a configuration file in the root of your project.

The ESLint config generated by next lint uses the older .eslintrc.json format. ESLint supports both the legacy .eslintrc.json and the newer eslint.config.mjs format.

You can manually replace .eslintrc.json with an eslint.config.mjs file using the setup recommended in our ESLint API reference, and installing the @eslint/eslintrc package. This more closely matches the ESLint setup used by create-next-app.

You can now run next lint every time you want to run ESLint to catch errors. Once ESLint has been set up, it will also automatically run during every build (next build). Errors will fail the build, while warnings will not.

See the ESLint Plugin page for more information.

Next.js has in-built support for the "paths" and "baseUrl" options of tsconfig.json and jsconfig.json files.

These options allow you to alias project directories to absolute paths, making it easier and cleaner to import modules. For example:

To configure absolute imports, add the baseUrl configuration option to your tsconfig.json or jsconfig.json file. For example:

In addition to configuring the baseUrl path, you can use the "paths" option to "alias" module paths.

For example, the following configuration maps @/components/* to components/*:

Each of the "paths" are relative to the baseUrl location.

**Examples:**

Example 1 (unknown):
```unknown
pnpm create next-app@latest my-app --yes
cd my-app
pnpm dev
```

Example 2 (unknown):
```unknown
npx create-next-app@latest
```

Example 3 (unknown):
```unknown
What is your project named? my-app
Would you like to use TypeScript? No / Yes
Would you like to use ESLint? No / Yes
Would you like to use Tailwind CSS? No / Yes
Would you like your code inside a `src/` directory? No / Yes
Would you like to use App Router? (recommended) No / Yes
Would you like to use Turbopack? (recommended) No / Yes
Would you like to customize the import alias (`@/*` by default)? No / Yes
What import alias would you like configured? @/*
```

Example 4 (unknown):
```unknown
pnpm i next@latest react@latest react-dom@latest
```

---

## Linking and Navigating

**URL:** https://nextjs.org/docs/15/app/getting-started/linking-and-navigating

**Contents:**
- Linking and Navigating
- How navigation works
  - Server Rendering
  - Prefetching
  - Streaming
  - Client-side transitions
- What can make transitions slow?
  - Dynamic routes without loading.tsx
  - Dynamic segments without generateStaticParams
  - Slow networks

In Next.js, routes are rendered on the server by default. This often means the client has to wait for a server response before a new route can be shown. Next.js comes with built-in prefetching, streaming, and client-side transitions ensuring navigation stays fast and responsive.

This guide explains how navigation works in Next.js and how you can optimize it for dynamic routes and slow networks.

To understand how navigation works in Next.js, it helps to be familiar with the following concepts:

In Next.js, Layouts and Pages are React Server Components by default. On initial and subsequent navigations, the Server Component Payload is generated on the server before being sent to the client.

There are two types of server rendering, based on when it happens:

The trade-off of server rendering is that the client must wait for the server to respond before the new route can be shown. Next.js addresses this delay by prefetching routes the user is likely to visit and performing client-side transitions.

Good to know: HTML is also generated for the initial visit.

Prefetching is the process of loading a route in the background before the user navigates to it. This makes navigation between routes in your application feel instant, because by the time a user clicks on a link, the data to render the next route is already available client side.

Next.js automatically prefetches routes linked with the <Link> component when they enter the user's viewport.

How much of the route is prefetched depends on whether it's static or dynamic:

By skipping or partially prefetching dynamic routes, Next.js avoids unnecessary work on the server for routes the users may never visit. However, waiting for a server response before navigation can give the users the impression that the app is not responding.

To improve the navigation experience to dynamic routes, you can use streaming.

Streaming allows the server to send parts of a dynamic route to the client as soon as they're ready, rather than waiting for the entire route to be rendered. This means users see something sooner, even if parts of the page are still loading.

For dynamic routes, it means they can be partially prefetched. That is, shared layouts and loading skeletons can be requested ahead of time.

To use streaming, create a loading.tsx in your route folder:

Behind the scenes, Next.js will automatically wrap the page.tsx contents in a <Suspense> boundary. The prefetched fallback UI will be shown while the route is loading, and swapped for the actual content once ready.

Good to know: You can also use <Suspense> to create loading UI for nested components.

Benefits of loading.tsx:

To further improve the navigation experience, Next.js performs a client-side transition with the <Link> component.

Traditionally, navigation to a server-rendered page triggers a full page load. This clears state, resets scroll position, and blocks interactivity.

Next.js avoids this with client-side transitions using the <Link> component. Instead of reloading the page, it updates the content dynamically by:

Client-side transitions are what makes a server-rendered apps feel like client-rendered apps. And when paired with prefetching and streaming, it enables fast transitions, even for dynamic routes.

These Next.js optimizations make navigation fast and responsive. However, under certain conditions, transitions can still feel slow. Here are some common causes and how to improve the user experience:

When navigating to a dynamic route, the client must wait for the server response before showing the result. This can give the users the impression that the app is not responding.

We recommend adding loading.tsx to dynamic routes to enable partial prefetching, trigger immediate navigation, and display a loading UI while the route renders.

Good to know: In development mode, you can use the Next.js Devtools to identify if the route is static or dynamic. See devIndicators for more information.

If a dynamic segment could be prerendered but isn't because it's missing generateStaticParams, the route will fallback to dynamic rendering at request time.

Ensure the route is statically generated at build time by adding generateStaticParams:

On slow or unstable networks, prefetching may not finish before the user clicks a link. This can affect both static and dynamic routes. In these cases, the loading.js fallback may not appear immediately because it hasn't been prefetched yet.

To improve perceived performance, you can use the useLinkStatus hook to show inline visual feedback to the user (like spinners or text glimmers on the link) while a transition is in progress.

You can "debounce" the loading indicator by adding an initial animation delay (e.g. 100ms) and starting the animation as invisible (e.g. opacity: 0). This means the loading indicator will only be shown if the navigation takes longer than the specified delay.

Good to know: You can use other visual feedback patterns like a progress bar. View an example here.

You can opt out of prefetching by setting the prefetch prop to false on the <Link> component. This is useful to avoid unnecessary usage of resources when rendering large lists of links (e.g. an infinite scroll table).

However, disabling prefetching comes with trade-offs:

To reduce resource usage without fully disabling prefetch, you can prefetch only on hover. This limits prefetching to routes the user is more likely to visit, rather than all links in the viewport.

<Link> is a Client Component and must be hydrated before it can prefetch routes. On the initial visit, large JavaScript bundles can delay hydration, preventing prefetching from starting right away.

React mitigates this with Selective Hydration and you can further improve this by:

Next.js allows you to use the native window.history.pushState and window.history.replaceState methods to update the browser's history stack without reloading the page.

pushState and replaceState calls integrate into the Next.js Router, allowing you to sync with usePathname and useSearchParams.

Use it to add a new entry to the browser's history stack. The user can navigate back to the previous state. For example, to sort a list of products:

Use it to replace the current entry on the browser's history stack. The user is not able to navigate back to the previous state. For example, to switch the application's locale:

**Examples:**

Example 1 (python):
```python
import Link from 'next/link'
 
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <body>
        <nav>
          {/* Prefetched when the link is hovered or enters the viewport */}
          <Link href="/blog">Blog</Link>
          {/* No prefetching */}
          <a href="/contact">Contact</a>
        </nav>
        {children}
      </body>
    </html>
  )
}
```

Example 2 (unknown):
```unknown
export default function Loading() {
  // Add fallback UI that will be shown while the route is loading.
  return <LoadingSkeleton />
}
```

Example 3 (unknown):
```unknown
export default function Loading() {
  return <LoadingSkeleton />
}
```

Example 4 (javascript):
```javascript
export async function generateStaticParams() {
  const posts = await fetch('https://.../posts').then((res) => res.json())
 
  return posts.map((post) => ({
    slug: post.slug,
  }))
}
 
export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  // ...
}
```

---

## Project structure and organization

**URL:** https://nextjs.org/docs/app/getting-started/project-structure

**Contents:**
- Project structure and organization
- Folder and file conventions
  - Top-level folders
  - Top-level files
  - Routing Files
  - Nested routes
  - Dynamic routes
  - Route groups and private folders
  - Parallel and Intercepted Routes
  - Metadata file conventions

This page provides an overview of all the folder and file conventions in Next.js, and recommendations for organizing your project.

Top-level folders are used to organize your application's code and static assets.

Top-level files are used to configure your application, manage dependencies, run proxy, integrate monitoring tools, and define environment variables.

Add page to expose a route, layout for shared UI such as header, nav, or footer, loading for skeletons, error for error boundaries, and route for APIs.

Folders define URL segments. Nesting folders nests segments. Layouts at any level wrap their child segments. A route becomes public when a page or route file exists.

Parameterize segments with square brackets. Use [segment] for a single param, [...segment] for catch‑all, and [[...segment]] for optional catch‑all. Access values via the params prop.

Organize code without changing URLs with route groups (group), and colocate non-routable files with private folders _folder.

These features fit specific UI patterns, such as slot-based layouts or modal routing.

Use @slot for named slots rendered by a parent layout. Use intercept patterns to render another route inside the current layout without changing the URL, for example, to show a details view as a modal over a list.

Next.js is unopinionated about how you organize and colocate your project files. But it does provide several features to help you organize your project.

The components defined in special files are rendered in a specific hierarchy:

The components are rendered recursively in nested routes, meaning the components of a route segment will be nested inside the components of its parent segment.

In the app directory, nested folders define route structure. Each folder represents a route segment that is mapped to a corresponding segment in a URL path.

However, even though route structure is defined through folders, a route is not publicly accessible until a page.js or route.js file is added to a route segment.

And, even when a route is made publicly accessible, only the content returned by page.js or route.js is sent to the client.

This means that project files can be safely colocated inside route segments in the app directory without accidentally being routable.

Good to know: While you can colocate your project files in app you don't have to. If you prefer, you can keep them outside the app directory.

Private folders can be created by prefixing a folder with an underscore: _folderName

This indicates the folder is a private implementation detail and should not be considered by the routing system, thereby opting the folder and all its subfolders out of routing.

Since files in the app directory can be safely colocated by default, private folders are not required for colocation. However, they can be useful for:

Route groups can be created by wrapping a folder in parenthesis: (folderName)

This indicates the folder is for organizational purposes and should not be included in the route's URL path.

Route groups are useful for:

Next.js supports storing application code (including app) inside an optional src folder. This separates application code from project configuration files which mostly live in the root of a project.

The following section lists a very high-level overview of common strategies. The simplest takeaway is to choose a strategy that works for you and your team and be consistent across the project.

Good to know: In our examples below, we're using components and lib folders as generalized placeholders, their naming has no special framework significance and your projects might use other folders like ui, utils, hooks, styles, etc.

This strategy stores all application code in shared folders in the root of your project and keeps the app directory purely for routing purposes.

This strategy stores all application code in shared folders in the root of the app directory.

This strategy stores globally shared application code in the root app directory and splits more specific application code into the route segments that use them.

To organize routes without affecting the URL, create a group to keep related routes together. The folders in parenthesis will be omitted from the URL (e.g. (marketing) or (shop)).

Even though routes inside (marketing) and (shop) share the same URL hierarchy, you can create a different layout for each group by adding a layout.js file inside their folders.

To opt specific routes into a layout, create a new route group (e.g. (shop)) and move the routes that share the same layout into the group (e.g. account and cart). The routes outside of the group will not share the layout (e.g. checkout).

To apply a loading skeleton via a loading.js file to a specific route, create a new route group (e.g., /(overview)) and then move your loading.tsx inside that route group.

Now, the loading.tsx file will only apply to your dashboard → overview page instead of all your dashboard pages without affecting the URL path structure.

To create multiple root layouts, remove the top-level layout.js file, and add a layout.js file inside each route group. This is useful for partitioning an application into sections that have a completely different UI or experience. The <html> and <body> tags need to be added to each root layout.

In the example above, both (marketing) and (shop) have their own root layout.

---

## Fetching Data

**URL:** https://nextjs.org/docs/app/getting-started/fetching-data

**Contents:**
- Fetching Data
- Fetching data
  - Server Components
    - With the fetch API
    - With an ORM or database
  - Client Components
    - Streaming data with the use hook
    - Community libraries
- Deduplicate requests and cache data
- Streaming

This page will walk you through how you can fetch data in Server and Client Components, and how to stream components that depend on data.

You can fetch data in Server Components using any asynchronous I/O, such as:

To fetch data with the fetch API, turn your component into an asynchronous function, and await the fetch call. For example:

Since Server Components are rendered on the server, you can safely make database queries using an ORM or database client. Turn your component into an asynchronous function, and await the call:

There are two ways to fetch data in Client Components, using:

You can use React's use hook to stream data from the server to client. Start by fetching data in your Server component, and pass the promise to your Client Component as prop:

Then, in your Client Component, use the use hook to read the promise:

In the example above, the <Posts> component is wrapped in a <Suspense> boundary. This means the fallback will be shown while the promise is being resolved. Learn more about streaming.

You can use a community library like SWR or React Query to fetch data in Client Components. These libraries have their own semantics for caching, streaming, and other features. For example, with SWR:

One way to deduplicate fetch requests is with request memoization. With this mechanism, fetch calls using GET or HEAD with the same URL and options in a single render pass are combined into one request. This happens automatically, and you can opt out by passing an Abort signal to fetch.

Request memoization is scoped to the lifetime of a request.

You can also deduplicate fetch requests by using Next.js’ Data Cache, for example by setting cache: 'force-cache' in your fetch options.

Data Cache allows sharing data across the current render pass and incoming requests.

If you are not using fetch, and instead using an ORM or database directly, you can wrap your data access with the React cache function.

Warning: The content below assumes the cacheComponents config option is enabled in your application. The flag was introduced in Next.js 15 canary.

When you fetch data in Server Components, the data is fetched and rendered on the server for each request. If you have any slow data requests, the whole route will be blocked from rendering until all the data is fetched.

To improve the initial load time and user experience, you can use streaming to break up the page's HTML into smaller chunks and progressively send those chunks from the server to the client.

There are two ways you can leverage streaming in your application:

You can create a loading.js file in the same folder as your page to stream the entire page while the data is being fetched. For example, to stream app/blog/page.js, add the file inside the app/blog folder.

On navigation, the user will immediately see the layout and a loading state while the page is being rendered. The new content will then be automatically swapped in once rendering is complete.

Behind-the-scenes, loading.js will be nested inside layout.js, and will automatically wrap the page.js file and any children below in a <Suspense> boundary.

This approach works well for route segments (layouts and pages), but for more granular streaming, you can use <Suspense>.

<Suspense> allows you to be more granular about what parts of the page to stream. For example, you can immediately show any page content that falls outside of the <Suspense> boundary, and stream in the list of blog posts inside the boundary.

An instant loading state is fallback UI that is shown immediately to the user after navigation. For the best user experience, we recommend designing loading states that are meaningful and help users understand the app is responding. For example, you can use skeletons and spinners, or a small but meaningful part of future screens such as a cover photo, title, etc.

In development, you can preview and inspect the loading state of your components using the React Devtools.

Sequential data fetching happens when one request depends on data from another.

For example, <Playlists> can only fetch data after <Artist> completes because it needs the artistID:

In this example, <Suspense> allows the playlists to stream in after the artist data loads. However, the page still waits for the artist data before displaying anything. To prevent this, you can wrap the entire page component in a <Suspense> boundary (for example, using a loading.js file) to show a loading state immediately.

Ensure your data source can resolve the first request quickly, as it blocks everything else. If you can't optimize the request further, consider caching the result if the data changes infrequently.

Parallel data fetching happens when data requests in a route are eagerly initiated and start at the same time.

By default, layouts and pages are rendered in parallel. So each segment starts fetching data as soon as possible.

However, within any component, multiple async/await requests can still be sequential if placed after the other. For example, getAlbums will be blocked until getArtist is resolved:

Start multiple requests by calling fetch, then await them with Promise.all. Requests begin as soon as fetch is called.

Good to know: If one request fails when using Promise.all, the entire operation will fail. To handle this, you can use the Promise.allSettled method instead.

You can preload data by creating an utility function that you eagerly call above blocking requests. <Item> conditionally renders based on the checkIsAvailable() function.

You can call preload() before checkIsAvailable() to eagerly initiate <Item/> data dependencies. By the time <Item/> is rendered, its data has already been fetched.

Additionally, you can use React's cache function and the server-only package to create a reusable utility function. This approach allows you to cache the data fetching function and ensure that it's only executed on the server.

**Examples:**

Example 1 (javascript):
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

Example 2 (python):
```python
import { db, posts } from '@/lib/db'
 
export default async function Page() {
  const allPosts = await db.select().from(posts)
  return (
    <ul>
      {allPosts.map((post) => (
        <li key={post.id}>{post.title}</li>
      ))}
    </ul>
  )
}
```

Example 3 (python):
```python
import Posts from '@/app/ui/posts'
import { Suspense } from 'react'
 
export default function Page() {
  // Don't await the data fetching function
  const posts = getPosts()
 
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Posts posts={posts} />
    </Suspense>
  )
}
```

Example 4 (python):
```python
'use client'
import { use } from 'react'
 
export default function Posts({
  posts,
}: {
  posts: Promise<{ id: string; title: string }[]>
}) {
  const allPosts = use(posts)
 
  return (
    <ul>
      {allPosts.map((post) => (
        <li key={post.id}>{post.title}</li>
      ))}
    </ul>
  )
}
```

---

## Deploying

**URL:** https://nextjs.org/docs/15/app/getting-started/deploying

**Contents:**
- Deploying
- Node.js server
  - Templates
- Docker
  - Templates
- Static export
  - Templates
- Adapters

Next.js can be deployed as a Node.js server, Docker container, static export, or adapted to run on different platforms.

Next.js can be deployed to any provider that supports Node.js. Ensure your package.json has the "build" and "start" scripts:

Then, run npm run build to build your application and npm run start to start the Node.js server. This server supports all Next.js features. If needed, you can also eject to a custom server.

Node.js deployments support all Next.js features. Learn how to configure them for your infrastructure.

Next.js can be deployed to any provider that supports Docker containers. This includes container orchestrators like Kubernetes or a cloud provider that runs Docker.

Docker deployments support all Next.js features. Learn how to configure them for your infrastructure.

Note for development: While Docker is excellent for production deployments, consider using local development (npm run dev) instead of Docker during development on Mac and Windows for better performance. Learn more about optimizing local development.

Next.js enables starting as a static site or Single-Page Application (SPA), then later optionally upgrading to use features that require a server.

Since Next.js supports static exports, it can be deployed and hosted on any web server that can serve HTML/CSS/JS static assets. This includes tools like AWS S3, Nginx, or Apache.

Running as a static export does not support Next.js features that require a server. Learn more.

Next.js can be adapted to run on different platforms to support their infrastructure capabilities.

Refer to each provider's documentation for information on supported Next.js features:

Note: We are working on a Deployment Adapters API for all platforms to adopt. After completion, we will add documentation on how to write your own adapters.

**Examples:**

Example 1 (unknown):
```unknown
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start"
  }
}
```

---

## Create a new Next.js application

**URL:** https://nextjs.org/docs/pages/getting-started/installation

**Contents:**
- Create a new Next.js application
- System requirements
- Supported browsers
- Create with the CLI
- Manual installation
  - Create the pages directory
  - Create the public folder (optional)
- Run the development server
- Set up TypeScript
- Set up linting

Before you begin, make sure your development environment meets the following requirements:

Next.js supports modern browsers with zero configuration.

Learn more about browser support, including how to configure polyfills and target specific browsers.

The quickest way to create a new Next.js app is using create-next-app, which sets up everything automatically for you. To create a project, run:

On installation, you'll see the following prompts:

If you choose to customize settings, you'll see the following prompts:

After the prompts, create-next-app will create a folder with your project name and install the required dependencies.

To manually create a new Next.js app, install the required packages:

Good to know: The App Router uses React canary releases built-in, which include all the stable React 19 changes, as well as newer features being validated in frameworks. The Pages Router uses the React version you install in package.json.

Then, add the following scripts to your package.json file:

These scripts refer to the different stages of developing an application:

Turbopack is now the default bundler. To use Webpack run next dev --webpack or next build --webpack. See the Turbopack docs for configuration details.

Next.js uses file-system routing, which means the routes in your application are determined by how you structure your files.

Create a pages directory at the root of your project. Then, add an index.tsx file inside your pages folder. This will be your home page (/):

Next, add an _app.tsx file inside pages/ to define the global layout. Learn more about the custom App file.

Finally, add a _document.tsx file inside pages/ to control the initial response from the server. Learn more about the custom Document file.

Create a public folder at the root of your project to store static assets such as images, fonts, etc. Files inside public can then be referenced by your code starting from the base URL (/).

You can then reference these assets using the root path (/). For example, public/profile.png can be referenced as /profile.png:

Minimum TypeScript version: v5.1.0

Next.js comes with built-in TypeScript support. To add TypeScript to your project, rename a file to .ts / .tsx and run next dev. Next.js will automatically install the necessary dependencies and add a tsconfig.json file with the recommended config options.

See the TypeScript reference page for more information.

Next.js supports linting with either ESLint or Biome. Choose a linter and run it directly via package.json scripts.

If your project previously used next lint, migrate your scripts to the ESLint CLI with the codemod:

If you use ESLint, create an explicit config (recommended eslint.config.mjs). ESLint supports both the legacy .eslintrc.* and the newer eslint.config.mjs formats. See the ESLint API reference for a recommended setup.

Good to know: Starting with Next.js 16, next build no longer runs the linter automatically. Instead, you can run your linter through NPM scripts.

See the ESLint Plugin page for more information.

Next.js has in-built support for the "paths" and "baseUrl" options of tsconfig.json and jsconfig.json files.

These options allow you to alias project directories to absolute paths, making it easier and cleaner to import modules. For example:

To configure absolute imports, add the baseUrl configuration option to your tsconfig.json or jsconfig.json file. For example:

In addition to configuring the baseUrl path, you can use the "paths" option to "alias" module paths.

For example, the following configuration maps @/components/* to components/*:

Each of the "paths" are relative to the baseUrl location.

**Examples:**

Example 1 (unknown):
```unknown
npx create-next-app@latest
```

Example 2 (unknown):
```unknown
What is your project named? my-app
Would you like to use the recommended Next.js defaults?
    Yes, use recommended defaults - TypeScript, ESLint, Tailwind CSS, App Router, Turbopack
    No, reuse previous settings
    No, customize settings - Choose your own preferences
```

Example 3 (unknown):
```unknown
Would you like to use TypeScript? No / Yes
Which linter would you like to use? ESLint / Biome / None
Would you like to use React Compiler? No / Yes
Would you like to use Tailwind CSS? No / Yes
Would you like your code inside a `src/` directory? No / Yes
Would you like to use App Router? (recommended) No / Yes
Would you like to customize the import alias (`@/*` by default)? No / Yes
What import alias would you like configured? @/*
```

Example 4 (unknown):
```unknown
pnpm i next@latest react@latest react-dom@latest
```

---

## Getting Started

**URL:** https://nextjs.org/docs/15/app/getting-started

**Contents:**
- Getting Started
- Pre-requisite knowledge
- Next Steps
  - Installation
  - Project Structure
  - Layouts and Pages
  - Linking and Navigating
  - Server and Client Components
  - Partial Prerendering
  - Fetching Data

Welcome to the Next.js documentation!

This Getting Started section will help you create your first Next.js app and learn the core features you'll use in every project.

Our documentation assumes some familiarity with web development. Before getting started, it'll help if you're comfortable with:

If you're new to React or need a refresher, we recommend starting with our React Foundations course, and the Next.js Foundations course that has you building an application as you learn.

---

## Installation

**URL:** https://nextjs.org/docs/app/getting-started/installation

**Contents:**
- Installation
- Quick start
- System requirements
- Supported browsers
- Create with the CLI
- Manual installation
  - Create the app directory
  - Create the public folder (optional)
- Run the development server
- Set up TypeScript

Create a new Next.js app and run it locally.

Before you begin, make sure your development environment meets the following requirements:

Next.js supports modern browsers with zero configuration.

Learn more about browser support, including how to configure polyfills and target specific browsers.

The quickest way to create a new Next.js app is using create-next-app, which sets up everything automatically for you. To create a project, run:

On installation, you'll see the following prompts:

If you choose to customize settings, you'll see the following prompts:

After the prompts, create-next-app will create a folder with your project name and install the required dependencies.

To manually create a new Next.js app, install the required packages:

Good to know: The App Router uses React canary releases built-in, which include all the stable React 19 changes, as well as newer features being validated in frameworks. The Pages Router uses the React version you install in package.json.

Then, add the following scripts to your package.json file:

These scripts refer to the different stages of developing an application:

Turbopack is now the default bundler. To use Webpack run next dev --webpack or next build --webpack. See the Turbopack docs for configuration details.

Next.js uses file-system routing, which means the routes in your application are determined by how you structure your files.

Create an app folder. Then, inside app, create a layout.tsx file. This file is the root layout. It's required and must contain the <html> and <body> tags.

Create a home page app/page.tsx with some initial content:

Both layout.tsx and page.tsx will be rendered when the user visits the root of your application (/).

Create a public folder at the root of your project to store static assets such as images, fonts, etc. Files inside public can then be referenced by your code starting from the base URL (/).

You can then reference these assets using the root path (/). For example, public/profile.png can be referenced as /profile.png:

Minimum TypeScript version: v5.1.0

Next.js comes with built-in TypeScript support. To add TypeScript to your project, rename a file to .ts / .tsx and run next dev. Next.js will automatically install the necessary dependencies and add a tsconfig.json file with the recommended config options.

Next.js includes a custom TypeScript plugin and type checker, which VSCode and other code editors can use for advanced type-checking and auto-completion.

You can enable the plugin in VS Code by:

See the TypeScript reference page for more information.

Next.js supports linting with either ESLint or Biome. Choose a linter and run it directly via package.json scripts.

If your project previously used next lint, migrate your scripts to the ESLint CLI with the codemod:

If you use ESLint, create an explicit config (recommended eslint.config.mjs). ESLint supports both the legacy .eslintrc.* and the newer eslint.config.mjs formats. See the ESLint API reference for a recommended setup.

Good to know: Starting with Next.js 16, next build no longer runs the linter automatically. Instead, you can run your linter through NPM scripts.

See the ESLint Plugin page for more information.

Next.js has in-built support for the "paths" and "baseUrl" options of tsconfig.json and jsconfig.json files.

These options allow you to alias project directories to absolute paths, making it easier and cleaner to import modules. For example:

To configure absolute imports, add the baseUrl configuration option to your tsconfig.json or jsconfig.json file. For example:

In addition to configuring the baseUrl path, you can use the "paths" option to "alias" module paths.

For example, the following configuration maps @/components/* to components/*:

Each of the "paths" are relative to the baseUrl location.

**Examples:**

Example 1 (unknown):
```unknown
pnpm create next-app@latest my-app --yes
cd my-app
pnpm dev
```

Example 2 (unknown):
```unknown
npx create-next-app@latest
```

Example 3 (unknown):
```unknown
What is your project named? my-app
Would you like to use the recommended Next.js defaults?
    Yes, use recommended defaults - TypeScript, ESLint, Tailwind CSS, App Router, Turbopack
    No, reuse previous settings
    No, customize settings - Choose your own preferences
```

Example 4 (unknown):
```unknown
Would you like to use TypeScript? No / Yes
Which linter would you like to use? ESLint / Biome / None
Would you like to use React Compiler? No / Yes
Would you like to use Tailwind CSS? No / Yes
Would you like your code inside a `src/` directory? No / Yes
Would you like to use App Router? (recommended) No / Yes
Would you like to customize the import alias (`@/*` by default)? No / Yes
What import alias would you like configured? @/*
```

---

## How to use CSS in your application

**URL:** https://nextjs.org/docs/pages/getting-started/css

**Contents:**
- How to use CSS in your application
- Tailwind CSS
- CSS Modules
- Global CSS
- External stylesheets
  - Import styles from node_modules
- Ordering and Merging
  - Recommendations
- Development vs Production
- Next Steps

Next.js provides several ways to style your application using CSS, including:

Tailwind CSS is a utility-first CSS framework that provides low-level utility classes to build custom designs.

Install Tailwind CSS:

Add the PostCSS plugin to your postcss.config.mjs file:

Import Tailwind in your global CSS file:

Import the CSS file in your pages/_app.js file:

Now you can start using Tailwind's utility classes in your application:

Good to know: If you need broader browser support for very old browsers, see the Tailwind CSS v3 setup instructions.

CSS Modules locally scope CSS by generating unique class names. This allows you to use the same class in different files without worrying about naming collisions.

To start using CSS Modules, create a new file with the extension .module.css and import it into any component inside the pages directory:

You can use global CSS to apply styles across your application.

Import the stylesheet in the pages/_app.js file to apply the styles to every route in your application:

Due to the global nature of stylesheets, and to avoid conflicts, you should import them inside pages/_app.js.

Next.js allows you to import CSS files from a JavaScript file. This is possible because Next.js extends the concept of import beyond JavaScript.

Since Next.js 9.5.4, importing a CSS file from node_modules is permitted anywhere in your application.

For global stylesheets, like bootstrap or nprogress, you should import the file inside pages/_app.js. For example:

To import CSS required by a third-party component, you can do so in your component. For example:

Next.js optimizes CSS during production builds by automatically chunking (merging) stylesheets. The order of your CSS depends on the order you import styles in your code.

For example, base-button.module.css will be ordered before page.module.css since <BaseButton> is imported before page.module.css:

To keep CSS ordering predictable:

**Examples:**

Example 1 (unknown):
```unknown
pnpm add -D tailwindcss @tailwindcss/postcss
```

Example 2 (unknown):
```unknown
export default {
  plugins: {
    '@tailwindcss/postcss': {},
  },
}
```

Example 3 (unknown):
```unknown
@import 'tailwindcss';
```

Example 4 (unknown):
```unknown
import '@/styles/globals.css'
 
export default function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}
```

---

## Route Handlers and Middleware

**URL:** https://nextjs.org/docs/15/app/getting-started/route-handlers-and-middleware

**Contents:**
- Route Handlers and Middleware
- Route Handlers
  - Convention
  - Supported HTTP Methods
  - Extended NextRequest and NextResponse APIs
  - Caching
  - Special Route Handlers
  - Route Resolution
  - Route Context Helper
- Middleware

Route Handlers allow you to create custom request handlers for a given route using the Web Request and Response APIs.

Good to know: Route Handlers are only available inside the app directory. They are the equivalent of API Routes inside the pages directory meaning you do not need to use API Routes and Route Handlers together.

Route Handlers are defined in a route.js|ts file inside the app directory:

Route Handlers can be nested anywhere inside the app directory, similar to page.js and layout.js. But there cannot be a route.js file at the same route segment level as page.js.

The following HTTP methods are supported: GET, POST, PUT, PATCH, DELETE, HEAD, and OPTIONS. If an unsupported method is called, Next.js will return a 405 Method Not Allowed response.

In addition to supporting the native Request and Response APIs, Next.js extends them with NextRequest and NextResponse to provide convenient helpers for advanced use cases.

Route Handlers are not cached by default. You can, however, opt into caching for GET methods. Other supported HTTP methods are not cached. To cache a GET method, use a route config option such as export const dynamic = 'force-static' in your Route Handler file.

Good to know: Other supported HTTP methods are not cached, even if they are placed alongside a GET method that is cached, in the same file.

Special Route Handlers like sitemap.ts, opengraph-image.tsx, and icon.tsx, and other metadata files remain static by default unless they use Dynamic APIs or dynamic config options.

You can consider a route the lowest level routing primitive.

Each route.js or page.js file takes over all HTTP verbs for that route.

Read more about how Route Handlers complement your frontend application, or explore the Route Handlers API Reference.

In TypeScript, you can type the context parameter for Route Handlers with the globally available RouteContext helper:

Middleware allows you to run code before a request is completed. Then, based on the incoming request, you can modify the response by rewriting, redirecting, modifying the request or response headers, or responding directly.

Some common scenarios where Middleware is effective include:

Middleware is not a good fit for:

Using fetch with options.cache, options.next.revalidate, or options.next.tags, has no effect in Middleware.

Create a middleware.ts (or .js) file in the project root, or inside src if applicable, so that it is located at the same level as pages or app.

Note: While only one middleware.ts file is supported per project, you can still organize your middleware logic into modules. Break out middleware functionalities into separate .ts or .js files and import them into your main middleware.ts file. This allows for cleaner management of route-specific middleware, aggregated in the middleware.ts for centralized control. By enforcing a single middleware file, it simplifies configuration, prevents potential conflicts, and optimizes performance by avoiding multiple middleware layers.

Read more about using middleware, or refer to the middleware API reference.

**Examples:**

Example 1 (unknown):
```unknown
export async function GET(request: Request) {}
```

Example 2 (javascript):
```javascript
export const dynamic = 'force-static'
 
export async function GET() {
  const res = await fetch('https://data.mongodb-api.com/...', {
    headers: {
      'Content-Type': 'application/json',
      'API-Key': process.env.DATA_API_KEY,
    },
  })
  const data = await res.json()
 
  return Response.json({ data })
}
```

Example 3 (unknown):
```unknown
export default function Page() {
  return <h1>Hello, Next.js!</h1>
}
 
// Conflict
// `app/route.ts`
export async function POST(request: Request) {}
```

Example 4 (python):
```python
import type { NextRequest } from 'next/server'
 
export async function GET(_req: NextRequest, ctx: RouteContext<'/users/[id]'>) {
  const { id } = await ctx.params
  return Response.json({ id })
}
```

---

## create-next-app

**URL:** https://nextjs.org/docs/app/api-reference/cli/create-next-app

**Contents:**
- create-next-app
- Reference
- Examples
  - With the default template
  - Linter Options
  - With an official Next.js example
  - With any public GitHub example

The create-next-app CLI allow you to create a new Next.js application using the default template or an example from a public GitHub repository. It is the easiest way to get started with Next.js.

The following options are available:

To create a new app using the default template, run the following command in your terminal:

On installation, you'll see the following prompts:

If you choose to customize settings, you'll see the following prompts:

After the prompts, create-next-app will create a folder with your project name and install the required dependencies.

ESLint: The traditional and most popular JavaScript linter. Includes Next.js-specific rules from @next/eslint-plugin-next.

Biome: A fast, modern linter and formatter that combines the functionality of ESLint and Prettier. Includes built-in Next.js and React domain support for optimal performance.

None: Skip linter configuration entirely. You can always add a linter later.

Once you've answered the prompts, a new project will be created with your chosen configuration.

To create a new app using an official Next.js example, use the --example flag. For example:

You can view a list of all available examples along with setup instructions in the Next.js repository.

To create a new app using any public GitHub example, use the --example option with the GitHub repo's URL. For example:

**Examples:**

Example 1 (unknown):
```unknown
npx create-next-app@latest [project-name] [options]
```

Example 2 (unknown):
```unknown
npx create-next-app@latest
```

Example 3 (unknown):
```unknown
What is your project named? my-app
Would you like to use the recommended Next.js defaults?
    Yes, use recommended defaults - TypeScript, ESLint, Tailwind CSS, App Router, Turbopack
    No, reuse previous settings
    No, customize settings - Choose your own preferences
```

Example 4 (unknown):
```unknown
Would you like to use TypeScript? No / Yes
Which linter would you like to use? ESLint / Biome / None
Would you like to use React Compiler? No / Yes
Would you like to use Tailwind CSS? No / Yes
Would you like your code inside a `src/` directory? No / Yes
Would you like to use App Router? (recommended) No / Yes
Would you like to customize the import alias (`@/*` by default)? No / Yes
What import alias would you like configured? @/*
```

---

## Getting Started - Pages Router

**URL:** https://nextjs.org/docs/pages/getting-started

**Contents:**
- Getting Started - Pages Router
  - Installation
  - Project Structure
  - Images
  - Fonts
  - CSS
  - Deploying

---

## Metadata and OG images

**URL:** https://nextjs.org/docs/15/app/getting-started/metadata-and-og-images

**Contents:**
- Metadata and OG images
- Default fields
- Static metadata
- Generated metadata
  - Streaming metadata
  - Memoizing data requests
- File-based metadata
- Favicons
- Static Open Graph images
- Generated Open Graph images

The Metadata APIs can be used to define your application metadata for improved SEO and web shareability and include:

With all the options above, Next.js will automatically generate the relevant <head> tags for your page, which can be inspected in the browser's developer tools.

The metadata object and generateMetadata function exports are only supported in Server Components.

There are two default meta tags that are always added even if a route doesn't define metadata:

The other metadata fields can be defined with the Metadata object (for static metadata) or the generateMetadata function (for generated metadata).

To define static metadata, export a Metadata object from a static layout.js or page.js file. For example, to add a title and description to the blog route:

You can view a full list of available options, in the generateMetadata documentation.

You can use generateMetadata function to fetch metadata that depends on data. For example, to fetch the title and description for a specific blog post:

For dynamically rendered pages, Next.js streams metadata separately, injecting it into the HTML once generateMetadata resolves, without blocking UI rendering.

Streaming metadata improves perceived performance by allowing visual content to stream first.

Streaming metadata is disabled for bots and crawlers that expect metadata to be in the <head> tag (e.g. Twitterbot, Slackbot, Bingbot). These are detected by using the User Agent header from the incoming request.

You can customize or disable streaming metadata completely, with the htmlLimitedBots option in your Next.js config file.

Statically rendered pages don’t use streaming since metadata is resolved at build time.

Learn more about streaming metadata.

There may be cases where you need to fetch the same data for metadata and the page itself. To avoid duplicate requests, you can use React's cache function to memoize the return value and only fetch the data once. For example, to fetch the blog post information for both the metadata and the page:

The following special files are available for metadata:

You can use these for static metadata, or you can programmatically generate these files with code.

Favicons are small icons that represent your site in bookmarks and search results. To add a favicon to your application, create a favicon.ico and add to the root of the app folder.

You can also programmatically generate favicons using code. See the favicon docs for more information.

Open Graph (OG) images are images that represent your site in social media. To add a static OG image to your application, create a opengraph-image.png file in the root of the app folder.

You can also add OG images for specific routes by creating a opengraph-image.png deeper down the folder structure. For example, to create an OG image specific to the /blog route, add a opengraph-image.jpg file inside the blog folder.

The more specific image will take precedence over any OG images above it in the folder structure.

Other image formats such as jpeg, png, and gif are also supported. See the Open Graph Image docs for more information.

The ImageResponse constructor allows you to generate dynamic images using JSX and CSS. This is useful for OG images that depend on data.

For example, to generate a unique OG image for each blog post, add a opengraph-image.ts file inside the blog folder, and import the ImageResponse constructor from next/og:

ImageResponse supports common CSS properties including flexbox and absolute positioning, custom fonts, text wrapping, centering, and nested images. See the full list of supported CSS properties.

**Examples:**

Example 1 (unknown):
```unknown
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
```

Example 2 (python):
```python
import type { Metadata } from 'next'
 
export const metadata: Metadata = {
  title: 'My Blog',
  description: '...',
}
 
export default function Layout() {}
```

Example 3 (python):
```python
import type { Metadata, ResolvingMetadata } from 'next'
 
type Props = {
  params: Promise<{ slug: string }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}
 
export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const slug = (await params).slug
 
  // fetch post information
  const post = await fetch(`https://api.vercel.app/blog/${slug}`).then((res) =>
    res.json()
  )
 
  return {
    title: post.title,
    description: post.description,
  }
}
 
export default function Page({ params, searchParams }: Props) {}
```

Example 4 (python):
```python
import { cache } from 'react'
import { db } from '@/app/lib/db'
 
// getPost will be used twice, but execute only once
export const getPost = cache(async (slug: string) => {
  const res = await db.query.posts.findFirst({ where: eq(posts.slug, slug) })
  return res
})
```

---

## Partial Prerendering

**URL:** https://nextjs.org/docs/15/app/getting-started/partial-prerendering

**Contents:**
- Partial Prerendering
- How does Partial Prerendering work?
  - Static Rendering
  - Dynamic Rendering
  - Suspense
  - Streaming
- Enabling Partial Prerendering
- Examples
  - Dynamic APIs
  - Passing dynamic props

Partial Prerendering (PPR) is a rendering strategy that allows you to combine static and dynamic content in the same route. This improves the initial page performance while still supporting personalized, dynamic data.

When a user visits a route:

🎥 Watch: Why PPR and how it works → YouTube (10 minutes).

To understand Partial Prerendering, it helps to be familiar with the rendering strategies available in Next.js.

With Static Rendering, HTML is generated ahead of time—either at build time or through revalidation. The result is cached and shared across users and requests.

In Partial Prerendering, Next.js prerenders a static shell for a route. This can include the layout and any other components that don't depend on request-time data.

With Dynamic Rendering, HTML is generated at request time. This allows you to serve personalized content based on request-time data.

A component becomes dynamic if it uses the following APIs:

In Partial Prerendering, using these APIs throws a special React error that informs Next.js the component cannot be statically rendered, causing a build error. You can use a Suspense boundary to wrap your component to defer rendering until runtime.

React Suspense is used to defer rendering parts of your application until some condition is met.

In Partial Prerendering, Suspense is used to mark dynamic boundaries in your component tree.

At build time, Next.js prerenders the static content and the fallback UI. The dynamic content is postponed until the user requests the route.

Wrapping a component in Suspense doesn't make the component itself dynamic (your API usage does), but rather Suspense is used as a boundary that encapsulates dynamic content and enable streaming

Streaming splits the route into chunks and progressively streams them to the client as they become ready. This allows the user to see parts of the page immediately, before the entire content has finished rendering.

In Partial Prerendering, dynamic components wrapped in Suspense start streaming from the server in parallel.

To reduce network overhead, the full response—including static HTML and streamed dynamic parts—is sent in a single HTTP request. This avoids extra roundtrips and improves both initial load and overall performance.

You can enable PPR by adding the ppr option to your next.config.ts file:

The 'incremental' value allows you to adopt PPR for specific routes:

Routes that don't have experimental_ppr will default to false and will not be prerendered using PPR. You need to explicitly opt-in to PPR for each route.

When using Dynamic APIs that require looking at the incoming request, Next.js will opt into dynamic rendering for the route. To continue using PPR, wrap the component with Suspense. For example, the <User /> component is dynamic because it uses the cookies API:

The <User /> component will be streamed while any other content inside <Page /> will be prerendered and become part of the static shell.

Components only opt into dynamic rendering when the value is accessed. For example, if you are reading searchParams from a <Page /> component, you can forward this value to another component as a prop:

Inside of the table component, accessing the value from searchParams will make the component dynamic while the rest of the page will be prerendered.

**Examples:**

Example 1 (python):
```python
import { Suspense } from 'react'
import StaticComponent from './StaticComponent'
import DynamicComponent from './DynamicComponent'
import Fallback from './Fallback'
 
export const experimental_ppr = true
 
export default function Page() {
  return (
    <>
      <StaticComponent />
      <Suspense fallback={<Fallback />}>
        <DynamicComponent />
      </Suspense>
    </>
  )
}
```

Example 2 (python):
```python
import type { NextConfig } from 'next'
 
const nextConfig: NextConfig = {
  experimental: {
    ppr: 'incremental',
  },
}
 
export default nextConfig
```

Example 3 (javascript):
```javascript
export const experimental_ppr = true
 
export default function Layout({ children }: { children: React.ReactNode }) {
  // ...
}
```

Example 4 (python):
```python
import { cookies } from 'next/headers'
 
export async function User() {
  const session = (await cookies()).get('session')?.value
  return '...'
}
```

---

## Error Handling

**URL:** https://nextjs.org/docs/app/getting-started/error-handling

**Contents:**
- Error Handling
- Handling expected errors
  - Server Functions
  - Server Components
  - Not found
- Handling uncaught exceptions
  - Nested error boundaries
  - Global errors
- API Reference
  - redirect

Errors can be divided into two categories: expected errors and uncaught exceptions. This page will walk you through how you can handle these errors in your Next.js application.

Expected errors are those that can occur during the normal operation of the application, such as those from server-side form validation or failed requests. These errors should be handled explicitly and returned to the client.

You can use the useActionState hook to handle expected errors in Server Functions.

For these errors, avoid using try/catch blocks and throw errors. Instead, model expected errors as return values.

You can pass your action to the useActionState hook and use the returned state to display an error message.

When fetching data inside of a Server Component, you can use the response to conditionally render an error message or redirect.

You can call the notFound function within a route segment and use the not-found.js file to show a 404 UI.

Uncaught exceptions are unexpected errors that indicate bugs or issues that should not occur during the normal flow of your application. These should be handled by throwing errors, which will then be caught by error boundaries.

Next.js uses error boundaries to handle uncaught exceptions. Error boundaries catch errors in their child components and display a fallback UI instead of the component tree that crashed.

Create an error boundary by adding an error.js file inside a route segment and exporting a React component:

Errors will bubble up to the nearest parent error boundary. This allows for granular error handling by placing error.tsx files at different levels in the route hierarchy.

Error boundaries don’t catch errors inside event handlers. They’re designed to catch errors during rendering to show a fallback UI instead of crashing the whole app.

In general, errors in event handlers or async code aren’t handled by error boundaries because they run after rendering.

To handle these cases, catch the error manually and store it using useState or useReducer, then update the UI to inform the user.

Note that unhandled errors inside startTransition from useTransition, will bubble up to the nearest error boundary.

While less common, you can handle errors in the root layout using the global-error.js file, located in the root app directory, even when leveraging internationalization. Global error UI must define its own <html> and <body> tags, since it is replacing the root layout or template when active.

**Examples:**

Example 1 (javascript):
```javascript
'use server'
 
export async function createPost(prevState: any, formData: FormData) {
  const title = formData.get('title')
  const content = formData.get('content')
 
  const res = await fetch('https://api.vercel.app/posts', {
    method: 'POST',
    body: { title, content },
  })
  const json = await res.json()
 
  if (!res.ok) {
    return { message: 'Failed to create post' }
  }
}
```

Example 2 (python):
```python
'use client'
 
import { useActionState } from 'react'
import { createPost } from '@/app/actions'
 
const initialState = {
  message: '',
}
 
export function Form() {
  const [state, formAction, pending] = useActionState(createPost, initialState)
 
  return (
    <form action={formAction}>
      <label htmlFor="title">Title</label>
      <input type="text" id="title" name="title" required />
      <label htmlFor="content">Content</label>
      <textarea id="content" name="content" required />
      {state?.message && <p aria-live="polite">{state.message}</p>}
      <button disabled={pending}>Create Post</button>
    </form>
  )
}
```

Example 3 (javascript):
```javascript
export default async function Page() {
  const res = await fetch(`https://...`)
  const data = await res.json()
 
  if (!res.ok) {
    return 'There was an error.'
  }
 
  return '...'
}
```

Example 4 (python):
```python
import { getPostBySlug } from '@/lib/posts'
 
export default async function Page({ params }: { params: { slug: string } }) {
  const { slug } = await params
  const post = getPostBySlug(slug)
 
  if (!post) {
    notFound()
  }
 
  return <div>{post.title}</div>
}
```

---

## Project Structure and Organization

**URL:** https://nextjs.org/docs/pages/getting-started/project-structure

**Contents:**
- Project Structure and Organization
- Folder and file conventions
  - Top-level folders
  - Top-level files
  - File conventions
  - Routes
  - Dynamic routes

This page provides an overview of all the folder and file conventions in Next.js, and recommendations for organizing your project.

Top-level folders are used to organize your application's code and static assets.

Top-level files are used to configure your application, manage dependencies, run proxy, integrate monitoring tools, and define environment variables.

---

## Caching and Revalidating

**URL:** https://nextjs.org/docs/app/getting-started/caching-and-revalidating

**Contents:**
- Caching and Revalidating
- fetch
- cacheTag
- revalidateTag
- updateTag
- revalidatePath
- unstable_cache
- API Reference
  - fetch
  - cacheTag

Caching is a technique for storing the result of data fetching and other computations so that future requests for the same data can be served faster, without doing the work again. While revalidation allows you to update cache entries without having to rebuild your entire application.

Next.js provides a few APIs to handle caching and revalidation. This guide will walk you through when and how to use them.

By default, fetch requests are not cached. You can cache individual requests by setting the cache option to 'force-cache'.

Good to know: Although fetch requests are not cached by default, Next.js will pre-render routes that have fetch requests and cache the HTML. If you want to guarantee a route is dynamic, use the connection API.

To revalidate the data returned by a fetch request, you can use the next.revalidate option.

This will revalidate the data after a specified amount of seconds.

You can also tag fetch requests to enable on-demand cache invalidation:

See the fetch API reference to learn more.

cacheTag allows you to tag cached data in Cache Components so it can be revalidated on-demand. Previously, cache tagging was limited to fetch requests, and caching other work required the experimental unstable_cache API.

With Cache Components, you can use the use cache directive to cache any computation, and cacheTag to tag it. This works with database queries, file system operations, and other server-side work.

Once tagged, you can use revalidateTag or updateTag to invalidate the cache entry for products.

Good to know: cacheTag is used with Cache Components and the use cache directive. It expands the caching and revalidation story beyond fetch.

See the cacheTag API reference to learn more.

revalidateTag is used to revalidate cache entries based on a tag and following an event. The function now supports two behaviors:

After tagging your cached data, using fetch with next.tags, or the cacheTag function, you may call revalidateTag in a Route Handler or Server Action:

You can reuse the same tag in multiple functions to revalidate them all at once.

See the revalidateTag API reference to learn more.

updateTag is specifically designed for Server Actions to immediately expire cached data for read-your-own-writes scenarios. Unlike revalidateTag, it can only be used within Server Actions and immediately expires the cache entry.

The key differences between revalidateTag and updateTag:

See the updateTag API reference to learn more.

revalidatePath is used to revalidate a route and following an event. To use it, call it in a Route Handler or Server Action:

See the revalidatePath API reference to learn more.

Good to know: unstable_cache is an experimental API. We recommend opting into Cache Components and replacing unstable_cache with the use cache directive. See the Cache Components documentation for more details.

unstable_cache allows you to cache the result of database queries and other async functions. To use it, wrap unstable_cache around the function. For example:

The function accepts a third optional object to define how the cache should be revalidated. It accepts:

See the unstable_cache API reference to learn more.

**Examples:**

Example 1 (javascript):
```javascript
export default async function Page() {
  const data = await fetch('https://...', { cache: 'force-cache' })
}
```

Example 2 (javascript):
```javascript
export default async function Page() {
  const data = await fetch('https://...', { next: { revalidate: 3600 } })
}
```

Example 3 (javascript):
```javascript
export async function getUserById(id: string) {
  const data = await fetch(`https://...`, {
    next: {
      tags: ['user'],
    },
  })
}
```

Example 4 (python):
```python
import { cacheTag } from 'next/cache'
 
export async function getProducts() {
  'use cache'
  cacheTag('products')
 
  const products = await db.query('SELECT * FROM products')
  return products
}
```

---

## Image Optimization

**URL:** https://nextjs.org/docs/app/getting-started/images

**Contents:**
- Image Optimization
- Local images
- Remote images
- API Reference
  - Image Component

The Next.js <Image> component extends the HTML <img> element to provide:

To start using <Image>, import it from next/image and render it within your component.

The src property can be a local or remote image.

🎥 Watch: Learn more about how to use next/image → YouTube (9 minutes).

You can store static files, like images and fonts, under a folder called public in the root directory. Files inside public can then be referenced by your code starting from the base URL (/).

If the image is statically imported, Next.js will automatically determine the intrinsic width and height. These values are used to determine the image ratio and prevent Cumulative Layout Shift while your image is loading.

To use a remote image, you can provide a URL string for the src property.

Since Next.js does not have access to remote files during the build process, you'll need to provide the width, height and optional blurDataURL props manually. The width and height are used to infer the correct aspect ratio of image and avoid layout shift from the image loading in. Alternatively, you can use the fill property to make the image fill the size of the parent element.

To safely allow images from remote servers, you need to define a list of supported URL patterns in next.config.js. Be as specific as possible to prevent malicious usage. For example, the following configuration will only allow images from a specific AWS S3 bucket:

**Examples:**

Example 1 (python):
```python
import Image from 'next/image'
 
export default function Page() {
  return <Image src="" alt="" />
}
```

Example 2 (python):
```python
import Image from 'next/image'
 
export default function Page() {
  return (
    <Image
      src="/profile.png"
      alt="Picture of the author"
      width={500}
      height={500}
    />
  )
}
```

Example 3 (python):
```python
import Image from 'next/image'
import ProfileImage from './profile.png'
 
export default function Page() {
  return (
    <Image
      src={ProfileImage}
      alt="Picture of the author"
      // width={500} automatically provided
      // height={500} automatically provided
      // blurDataURL="data:..." automatically provided
      // placeholder="blur" // Optional blur-up while loading
    />
  )
}
```

Example 4 (python):
```python
import Image from 'next/image'
 
export default function Page() {
  return (
    <Image
      src="https://s3.amazonaws.com/my-bucket/profile.png"
      alt="Picture of the author"
      width={500}
      height={500}
    />
  )
}
```

---

## Error Handling

**URL:** https://nextjs.org/docs/15/app/getting-started/error-handling

**Contents:**
- Error Handling
- Handling expected errors
  - Server Functions
  - Server Components
  - Not found
- Handling uncaught exceptions
  - Nested error boundaries
  - Global errors
- API Reference
  - redirect

Errors can be divided into two categories: expected errors and uncaught exceptions. This page will walk you through how you can handle these errors in your Next.js application.

Expected errors are those that can occur during the normal operation of the application, such as those from server-side form validation or failed requests. These errors should be handled explicitly and returned to the client.

You can use the useActionState hook to handle expected errors in Server Functions.

For these errors, avoid using try/catch blocks and throw errors. Instead, model expected errors as return values.

You can pass your action to the useActionState hook and use the returned state to display an error message.

When fetching data inside of a Server Component, you can use the response to conditionally render an error message or redirect.

You can call the notFound function within a route segment and use the not-found.js file to show a 404 UI.

Uncaught exceptions are unexpected errors that indicate bugs or issues that should not occur during the normal flow of your application. These should be handled by throwing errors, which will then be caught by error boundaries.

Next.js uses error boundaries to handle uncaught exceptions. Error boundaries catch errors in their child components and display a fallback UI instead of the component tree that crashed.

Create an error boundary by adding an error.js file inside a route segment and exporting a React component:

Errors will bubble up to the nearest parent error boundary. This allows for granular error handling by placing error.tsx files at different levels in the route hierarchy.

Error boundaries don’t catch errors inside event handlers. They’re designed to catch errors during rendering to show a fallback UI instead of crashing the whole app.

In general, errors in event handlers or async code aren’t handled by error boundaries because they run after rendering.

To handle these cases, catch the error manually and store it using useState or useReducer, then update the UI to inform the user.

Note that unhandled errors inside startTransition from useTransition, will bubble up to the nearest error boundary.

While less common, you can handle errors in the root layout using the global-error.js file, located in the root app directory, even when leveraging internationalization. Global error UI must define its own <html> and <body> tags, since it is replacing the root layout or template when active.

**Examples:**

Example 1 (javascript):
```javascript
'use server'
 
export async function createPost(prevState: any, formData: FormData) {
  const title = formData.get('title')
  const content = formData.get('content')
 
  const res = await fetch('https://api.vercel.app/posts', {
    method: 'POST',
    body: { title, content },
  })
  const json = await res.json()
 
  if (!res.ok) {
    return { message: 'Failed to create post' }
  }
}
```

Example 2 (python):
```python
'use client'
 
import { useActionState } from 'react'
import { createPost } from '@/app/actions'
 
const initialState = {
  message: '',
}
 
export function Form() {
  const [state, formAction, pending] = useActionState(createPost, initialState)
 
  return (
    <form action={formAction}>
      <label htmlFor="title">Title</label>
      <input type="text" id="title" name="title" required />
      <label htmlFor="content">Content</label>
      <textarea id="content" name="content" required />
      {state?.message && <p aria-live="polite">{state.message}</p>}
      <button disabled={pending}>Create Post</button>
    </form>
  )
}
```

Example 3 (javascript):
```javascript
export default async function Page() {
  const res = await fetch(`https://...`)
  const data = await res.json()
 
  if (!res.ok) {
    return 'There was an error.'
  }
 
  return '...'
}
```

Example 4 (python):
```python
import { getPostBySlug } from '@/lib/posts'
 
export default async function Page({ params }: { params: { slug: string } }) {
  const { slug } = await params
  const post = getPostBySlug(slug)
 
  if (!post) {
    notFound()
  }
 
  return <div>{post.title}</div>
}
```

---

## Upgrading

**URL:** https://nextjs.org/docs/15/app/getting-started/upgrading

**Contents:**
- Upgrading
- Latest version
- Canary version
  - Features available in canary
- Version guides
  - Version 15
  - Version 14

To update to the latest version of Next.js, you can use the upgrade codemod:

If you prefer to upgrade manually, install the latest Next.js and React versions:

To update to the latest canary, make sure you're on the latest version of Next.js and everything is working as expected. Then, run the following command:

The following features are currently available in canary:

**Examples:**

Example 1 (unknown):
```unknown
npx @next/codemod@latest upgrade latest
```

Example 2 (unknown):
```unknown
pnpm i next@latest react@latest react-dom@latest eslint-config-next@latest
```

Example 3 (unknown):
```unknown
npm i next@canary
```

---

## How to deploy your Next.js application

**URL:** https://nextjs.org/docs/pages/getting-started/deploying

**Contents:**
- How to deploy your Next.js application
- Node.js server
  - Templates
- Docker
  - Templates
- Static export
  - Templates
- Adapters

Next.js can be deployed as a Node.js server, Docker container, static export, or adapted to run on different platforms.

Next.js can be deployed to any provider that supports Node.js. Ensure your package.json has the "build" and "start" scripts:

Then, run npm run build to build your application and npm run start to start the Node.js server. This server supports all Next.js features. If needed, you can also eject to a custom server.

Node.js deployments support all Next.js features. Learn how to configure them for your infrastructure.

Next.js can be deployed to any provider that supports Docker containers. This includes container orchestrators like Kubernetes or a cloud provider that runs Docker.

Docker deployments support all Next.js features. Learn how to configure them for your infrastructure.

Note for development: While Docker is excellent for production deployments, consider using local development (npm run dev) instead of Docker during development on Mac and Windows for better performance. Learn more about optimizing local development.

Next.js enables starting as a static site or Single-Page Application (SPA), then later optionally upgrading to use features that require a server.

Since Next.js supports static exports, it can be deployed and hosted on any web server that can serve HTML/CSS/JS static assets. This includes tools like AWS S3, Nginx, or Apache.

Running as a static export does not support Next.js features that require a server. Learn more.

Next.js can be adapted to run on different platforms to support their infrastructure capabilities.

Refer to each provider's documentation for information on supported Next.js features:

Note: We are working on a Deployment Adapters API for all platforms to adopt. After completion, we will add documentation on how to write your own adapters.

**Examples:**

Example 1 (unknown):
```unknown
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start"
  }
}
```

---

## Image Optimization

**URL:** https://nextjs.org/docs/pages/getting-started/images

**Contents:**
- Image Optimization
- Local images
- Remote images
- API Reference
  - Image

The Next.js <Image> component extends the HTML <img> element to provide:

To start using <Image>, import it from next/image and render it within your component.

The src property can be a local or remote image.

🎥 Watch: Learn more about how to use next/image → YouTube (9 minutes).

You can store static files, like images and fonts, under a folder called public in the root directory. Files inside public can then be referenced by your code starting from the base URL (/).

If the image is statically imported, Next.js will automatically determine the intrinsic width and height. These values are used to determine the image ratio and prevent Cumulative Layout Shift while your image is loading.

To use a remote image, you can provide a URL string for the src property.

Since Next.js does not have access to remote files during the build process, you'll need to provide the width, height and optional blurDataURL props manually. The width and height are used to infer the correct aspect ratio of image and avoid layout shift from the image loading in. Alternatively, you can use the fill property to make the image fill the size of the parent element.

To safely allow images from remote servers, you need to define a list of supported URL patterns in next.config.js. Be as specific as possible to prevent malicious usage. For example, the following configuration will only allow images from a specific AWS S3 bucket:

**Examples:**

Example 1 (python):
```python
import Image from 'next/image'
 
export default function Page() {
  return <Image src="" alt="" />
}
```

Example 2 (python):
```python
import Image from 'next/image'
 
export default function Page() {
  return (
    <Image
      src="/profile.png"
      alt="Picture of the author"
      width={500}
      height={500}
    />
  )
}
```

Example 3 (python):
```python
import Image from 'next/image'
import ProfileImage from './profile.png'
 
export default function Page() {
  return (
    <Image
      src={ProfileImage}
      alt="Picture of the author"
      // width={500} automatically provided
      // height={500} automatically provided
      // blurDataURL="data:..." automatically provided
      // placeholder="blur" // Optional blur-up while loading
    />
  )
}
```

Example 4 (python):
```python
import Image from 'next/image'
 
export default function Page() {
  return (
    <Image
      src="https://s3.amazonaws.com/my-bucket/profile.png"
      alt="Picture of the author"
      width={500}
      height={500}
    />
  )
}
```

---

## Proxy

**URL:** https://nextjs.org/docs/app/getting-started/proxy

**Contents:**
- Proxy
- Proxy
  - Use cases
  - Convention
  - Example
- API Reference
  - proxy.js
  - Backend for Frontend

Good to know: Starting with Next.js 16, Middleware is now called Proxy to better reflect its purpose. The functionality remains the same.

Proxy allows you to run code before a request is completed. Then, based on the incoming request, you can modify the response by rewriting, redirecting, modifying the request or response headers, or responding directly.

Some common scenarios where Proxy is effective include:

For simple redirects, consider using the redirects configuration in next.config.ts first. Proxy should be used when you need access to request data or more complex logic.

Proxy is not intended for slow data fetching. While Proxy can be helpful for optimistic checks such as permission-based redirects, it should not be used as a full session management or authorization solution.

Using fetch with options.cache, options.next.revalidate, or options.next.tags, has no effect in Proxy.

Create a proxy.ts (or .js) file in the project root, or inside src if applicable, so that it is located at the same level as pages or app.

Note: While only one proxy.ts file is supported per project, you can still organize your proxy logic into modules. Break out proxy functionalities into separate .ts or .js files and import them into your main proxy.ts file. This allows for cleaner management of route-specific proxy, aggregated in the proxy.ts for centralized control. By enforcing a single proxy file, it simplifies configuration, prevents potential conflicts, and optimizes performance by avoiding multiple proxy layers.

Read more about using proxy, or refer to the proxy API reference.

**Examples:**

Example 1 (python):
```python
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
// This function can be marked `async` if using `await` inside
export function proxy(request: NextRequest) {
  return NextResponse.redirect(new URL('/home', request.url))
}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: '/about/:path*',
}
```

---

## Getting Started

**URL:** https://nextjs.org/docs/app/getting-started

**Contents:**
- Getting Started
- Pre-requisite knowledge
- Next Steps
  - Installation
  - Project Structure
  - Layouts and Pages
  - Linking and Navigating
  - Server and Client Components
  - Cache Components
  - Fetching Data

Welcome to the Next.js documentation!

This Getting Started section will help you create your first Next.js app and learn the core features you'll use in every project.

Our documentation assumes some familiarity with web development. Before getting started, it'll help if you're comfortable with:

If you're new to React or need a refresher, we recommend starting with our React Foundations course, and the Next.js Foundations course that has you building an application as you learn.

---

## Updating Data

**URL:** https://nextjs.org/docs/15/app/getting-started/updating-data

**Contents:**
- Updating Data
- What are Server Functions?
- Creating Server Functions
  - Server Components
  - Client Components
  - Passing actions as props
- Invoking Server Functions
  - Forms
  - Event Handlers
- Examples

You can update data in Next.js using React's Server Functions. This page will go through how you can create and invoke Server Functions.

A Server Function is an asynchronous function that runs on the server. They can be called from client through a network request, which is why they must be asynchronous.

In an action or mutation context, they are also called Server Actions.

By convention, a Server Action is an async function used with startTransition. This happens automatically when the function is:

In Next.js, Server Actions integrate with the framework's caching architecture. When an action is invoked, Next.js can return both the updated UI and new data in a single server roundtrip.

Behind the scenes, actions use the POST method, and only this HTTP method can invoke them.

A Server Function can be defined by using the use server directive. You can place the directive at the top of an asynchronous function to mark the function as a Server Function, or at the top of a separate file to mark all exports of that file.

Server Functions can be inlined in Server Components by adding the "use server" directive to the top of the function body:

Good to know: Server Components support progressive enhancement by default, meaning forms that call Server Actions will be submitted even if JavaScript hasn't loaded yet or is disabled.

It's not possible to define Server Functions in Client Components. However, you can invoke them in Client Components by importing them from a file that has the "use server" directive at the top of it:

Good to know: In Client Components, forms invoking Server Actions will queue submissions if JavaScript isn't loaded yet, and will be prioritized for hydration. After hydration, the browser does not refresh on form submission.

You can also pass an action to a Client Component as a prop:

There are two main ways you can invoke a Server Function:

Good to know: Server Functions are designed for server-side mutations. The client currently dispatches and awaits them one at a time. This is an implementation detail and may change. If you need parallel data fetching, use data fetching in Server Components, or perform parallel work inside a single Server Function or Route Handler.

React extends the HTML <form> element to allow Server Function to be invoked with the HTML action prop.

When invoked in a form, the function automatically receives the FormData object. You can extract the data using the native FormData methods:

You can invoke a Server Function in a Client Component by using event handlers such as onClick.

While executing a Server Function, you can show a loading indicator with React's useActionState hook. This hook returns a pending boolean:

After performing an update, you can revalidate the Next.js cache and show the updated data by calling revalidatePath or revalidateTag within the Server Function:

You may want to redirect the user to a different page after performing an update. You can do this by calling redirect within the Server Function.

Calling redirect throws a framework handled control-flow exception. Any code after it won't execute. If you need fresh data, call revalidatePath or revalidateTag beforehand.

You can get, set, and delete cookies inside a Server Action using the cookies API.

When you set or delete a cookie in a Server Action, Next.js re-renders the current page and its layouts on the server so the UI reflects the new cookie value.

Good to know: The server update applies to the current React tree, re-rendering, mounting, or unmounting components, as needed. Client state is preserved for re-rendered components, and effects re-run if their dependencies changed.

You can use the React useEffect hook to invoke a Server Action when the component mounts or a dependency changes. This is useful for mutations that depend on global events or need to be triggered automatically. For example, onKeyDown for app shortcuts, an intersection observer hook for infinite scrolling, or when the component mounts to update a view count:

**Examples:**

Example 1 (javascript):
```javascript
export async function createPost(formData: FormData) {
  'use server'
  const title = formData.get('title')
  const content = formData.get('content')
 
  // Update data
  // Revalidate cache
}
 
export async function deletePost(formData: FormData) {
  'use server'
  const id = formData.get('id')
 
  // Update data
  // Revalidate cache
}
```

Example 2 (unknown):
```unknown
export default function Page() {
  // Server Action
  async function createPost(formData: FormData) {
    'use server'
    // ...
  }
 
  return <></>
}
```

Example 3 (unknown):
```unknown
'use server'
 
export async function createPost() {}
```

Example 4 (python):
```python
'use client'
 
import { createPost } from '@/app/actions'
 
export function Button() {
  return <button formAction={createPost}>Create</button>
}
```

---

## Cache Components

**URL:** https://nextjs.org/docs/app/getting-started/cache-components

**Contents:**
- Cache Components
- Cache Components
- How it works
  - 1. Suspense for runtime data
  - 2. Suspense for dynamic data
  - 3. Cached data with use cache
- Using Suspense boundaries
  - Missing Suspense boundaries
  - How streaming works
- Using use cache

Cache Components is a new approach to rendering and caching in Next.js that provides fine-grained control over what gets cached and when, while ensuring a great user experience through Partial Prerendering (PPR).

When developing dynamic applications, you have to balance two primary approaches:

With Cache Components enabled, Next.js treats all routes as dynamic by default. Every request renders with the latest available data. However, most pages are made up of both static and dynamic parts, and not all dynamic data needs to be resolved from source on every request.

Cache Components allows you to mark data, and even parts of your UI as cacheable, which includes them in the pre-render pass alongside static parts of the page.

Before Cache Components, Next.js tried to statically optimize entire pages automatically, which could lead to unexpected behavior when adding dynamic code.

Cache Components implements Partial Prerendering (PPR), and use cache to give you the best of both worlds:

When a user visits a route:

🎥 Watch: Why PPR and how it works → YouTube (10 minutes).

Good to know: Cache Components is an opt-in feature. Enable it by setting the cacheComponents flag to true in your Next config file. See Enabling Cache Components for more details.

Cache Components gives you three key tools to control rendering:

Some data is only available at runtime when an actual user makes a request. APIs like cookies, headers, and searchParams access request-specific information. Wrap components using these APIs in Suspense boundaries so the rest of the page can be pre-rendered as a static shell.

Runtime APIs include:

Dynamic data like fetch calls or database queries (db.query(...)) can change between requests but isn't user-specific. The connection API is meta-dynamic—it represents waiting for a user navigation even though there's no actual data to return. Wrap components that use these in Suspense boundaries to enable streaming.

Dynamic data patterns include:

Add use cache to any Server Component to make it cached and include it in the pre-rendered shell. You cannot use runtime APIs from inside a cached component. You can also mark utility functions as use cache and call them from Server Components.

React Suspense boundaries let you define what fallback UI to use when it wraps dynamic or runtime data.

Content outside the boundary, including the fallback UI, is pre-rendered as a static shell, while content inside the boundary streams in when ready.

Here's how to use Suspense with Cache Components:

At build time, Next.js pre-renders the static content and the fallback UI, while the dynamic content is postponed until a user requests the route.

Good to know: Wrapping a component in Suspense doesn't make it dynamic; your API usage does. Suspense acts as a boundary that encapsulates dynamic content and enables streaming.

Cache Components enforces that dynamic code must be wrapped in a Suspense boundary. If you forget, you'll see the Uncached data was accessed outside of <Suspense> error:

Uncached data was accessed outside of <Suspense>

This delays the entire page from rendering, resulting in a slow user experience. Next.js uses this error to ensure your app loads instantly on every navigation.

To fix this, you can either:

Wrap the component in a <Suspense> boundary. This allows Next.js to stream its contents to the user as soon as it's ready, without blocking the rest of the app.

Move the asynchronous await into a Cache Component("use cache"). This allows Next.js to statically prerender the component as part of the HTML document, so it's instantly visible to the user.

Note that request-specific information, such as params, cookies, and headers, is not available during static prerendering, so it must be wrapped in <Suspense>.

This error helps prevent a situation where, instead of getting a static shell instantly, users would hit a blocking runtime render with nothing to show. To fix it, add a Suspense boundary or use use cache to cache the work instead.

Streaming splits the route into chunks and progressively streams them to the client as they become ready. This allows the user to see parts of the page immediately, before the entire content has finished rendering.

With partial pre-rendering, the initial UI can be sent immediately to the browser while the dynamic parts render. This decreases time to UI and may decrease total request time depending on how much of your UI is pre-rendered.

To reduce network overhead, the full response, including static HTML and streamed dynamic parts, is sent in a single HTTP request. This avoids extra round-trips and improves both initial load and overall performance.

While Suspense boundaries manage dynamic content, the use cache directive is available for caching data or computations that don't change often.

Add use cache to cache a page, component, or async function, and define a lifetime with cacheLife:

When using use cache, keep these constraints in mind:

Like Server Actions, arguments to cached functions must be serializable. This means you can pass primitives, plain objects, and arrays, but not class instances, functions, or other complex types.

You can accept unserializable values as arguments as long as you don't introspect them. However, you can return them. This allows patterns like cached components that accept Server or Client Components as children:

Tag cached data with cacheTag and revalidate it after mutations using updateTag in Server Actions for immediate updates, or revalidateTag delay in updates are acceptable.

Use updateTag when you need to expire and immediately refresh cached data within the same request:

Use revalidateTag when you want to invalidate only properly tagged cached entries with stale-while-revalidate behavior. This is ideal for static content that can tolerate eventual consistency.

For more detailed explanation and usage examples, see the use cache API reference.

You can enable Cache Components (which includes PPR) by adding the cacheComponents option to your Next config file:

When the cacheComponents flag is enabled, Next.js uses React's <Activity> component to preserve component state during client-side navigation.

Rather than unmounting the previous route when you navigate away, Next.js sets the Activity mode to "hidden". This means:

This behavior improves the navigation experience by maintaining UI state (form inputs, or expanded sections) when users navigate back and forth between routes.

Good to know: Next.js uses heuristics to keep a few recently visited routes "hidden", while older routes are removed from the DOM to prevent excessive growth.

When Cache Components is enabled, several route segment config options are no longer needed or supported. Here's what changes and how to migrate:

Not needed. All pages are dynamic by default with Cache Components enabled, so this configuration is unnecessary.

Replace with use cache. You must add use cache to each Layout and Page for the associated route instead.

Note: force-static previously allowed the use of runtime APIs like cookies(), but this is no longer supported. If you add use cache and see an error related to runtime data, you must remove the use of runtime APIs.

Replace with cacheLife. Use the cacheLife function to define cache duration instead of the route segment config.

Not needed. With use cache, all data fetching within a cached scope is automatically cached, making fetchCache unnecessary.

Not supported. Cache Components requires Node.js runtime and will throw errors with Edge Runtime.

Understanding how Cache Components changes your mental model:

When accessing runtime APIs like cookies(), Next.js will only pre-render the fallback UI above this component.

In this example, we have no fallback defined, so Next.js shows an error instructing us to provide one. The <User /> component needs to be wrapped in Suspense because it uses the cookies API:

Now we have a Suspense boundary around our User component we can pre-render the Page with a Skeleton UI and stream in the <User /> UI when a specific user makes a request

Components that access runtime values like cookies or searchParams cannot be prerendered. To prerender more of a page's content, you can pass these props down and access their values lower in the tree. For example, if you are reading searchParams from a <Page /> component, you can forward this value to another component as a prop:

Inside of the table component, accessing the value from searchParams will make the component dynamic while the rest of the page will be pre-rendered.

GET Route Handlers follow the same model as normal UI routes in your application. They are dynamic by default, can be pre-rendered when deterministic, and you can use cache to include more dynamic data in the cached response.

Dynamic example, returns a different number for every request:

A handler that returns only static data will be pre-rendered at build time:

If you had a route that returned fresh dynamic data on every request, say products from a database:

To cache this and avoid hitting the database on every request, extract the dynamic work into a use cache function and set cacheLife('hours') so the database is queried at most once per hour:

No. Cache Components implements PPR as a feature. The old experimental PPR flag has been removed but PPR is here to stay.

PPR provides the static shell and streaming infrastructure; use cache lets you include optimized dynamic output in that shell when beneficial.

What you cache should be a function of what you want your UI loading states to be. If data doesn't depend on runtime data and you're okay with a cached value being served for multiple requests over a period of time, use use cache with cacheLife to describe that behavior.

For content management systems with update mechanisms, consider using tags with longer cache durations and rely on revalidateTag to mark static initial UI as ready for revalidation. This pattern allows you to serve fast, cached responses while still updating content when it actually changes, rather than expiring the cache preemptively.

Use cacheTag to tag your cached data, then trigger updateTag or revalidateTag.

**Examples:**

Example 1 (javascript):
```javascript
export async function getProducts() {
  'use cache'
  const data = await db.query('SELECT * FROM products')
  return data
}
```

Example 2 (python):
```python
import { Suspense } from 'react'
 
export default function Page() {
  return (
    <>
      <h1>This will be pre-rendered</h1>
      <Suspense fallback={<Skeleton />}>
        <DynamicContent />
      </Suspense>
    </>
  )
}
 
async function DynamicContent() {
  const res = await fetch('http://api.cms.com/posts')
  const { posts } = await res.json()
  return <div>{/* ... */}</div>
}
```

Example 3 (python):
```python
import { cacheLife } from 'next/cache'
 
export default async function Page() {
  'use cache'
  cacheLife('hours')
  // fetch or compute
  return <div>...</div>
}
```

Example 4 (python):
```python
import type { ReactNode } from 'react'
import { setTimeout } from 'node:timers/promises'
 
async function getSiteTitle() {
  // Simulate a slow database or API call
  await setTimeout(1000) // from 'node:timers/promises'
  return 'My Website'
}
 
export async function CachedWrapper({ children }: { children: ReactNode }) {
  'use cache'
  const title = await getSiteTitle()
 
  // Don't introspect children, just pass it through
  return (
    <div className="wrapper">
      <h1>{title}</h1>
      {children}
    </div>
  )
}
```

---

## Server and Client Components

**URL:** https://nextjs.org/docs/15/app/getting-started/server-and-client-components

**Contents:**
- Server and Client Components
- When to use Server and Client Components?
- How do Server and Client Components work in Next.js?
  - On the server
  - On the client (first load)
  - Subsequent Navigations
- Examples
  - Using Client Components
  - Reducing JS bundle size
  - Passing data from Server to Client Components

By default, layouts and pages are Server Components, which lets you fetch data and render parts of your UI on the server, optionally cache the result, and stream it to the client. When you need interactivity or browser APIs, you can use Client Components to layer in functionality.

This page explains how Server and Client Components work in Next.js and when to use them, with examples of how to compose them together in your application.

The client and server environments have different capabilities. Server and Client components allow you to run logic in each environment depending on your use case.

Use Client Components when you need:

Use Server Components when you need:

For example, the <Page> component is a Server Component that fetches data about a post, and passes it as props to the <LikeButton> which handles client-side interactivity.

On the server, Next.js uses React's APIs to orchestrate rendering. The rendering work is split into chunks, by individual route segments (layouts and pages):

What is the React Server Component Payload (RSC)?

The RSC Payload is a compact binary representation of the rendered React Server Components tree. It's used by React on the client to update the browser's DOM. The RSC Payload contains:

Hydration is React's process for attaching event handlers to the DOM, to make the static HTML interactive.

On subsequent navigations:

You can create a Client Component by adding the "use client" directive at the top of the file, above your imports.

"use client" is used to declare a boundary between the Server and Client module graphs (trees).

Once a file is marked with "use client", all its imports and child components are considered part of the client bundle. This means you don't need to add the directive to every component that is intended for the client.

To reduce the size of your client JavaScript bundles, add 'use client' to specific interactive components instead of marking large parts of your UI as Client Components.

For example, the <Layout> component contains mostly static elements like a logo and navigation links, but includes an interactive search bar. <Search /> is interactive and needs to be a Client Component, however, the rest of the layout can remain a Server Component.

You can pass data from Server Components to Client Components using props.

Alternatively, you can stream data from a Server Component to a Client Component with the use Hook. See an example.

Good to know: Props passed to Client Components need to be serializable by React.

You can pass Server Components as a prop to a Client Component. This allows you to visually nest server-rendered UI within Client components.

A common pattern is to use children to create a slot in a <ClientComponent>. For example, a <Cart> component that fetches data on the server, inside a <Modal> component that uses client state to toggle visibility.

Then, in a parent Server Component (e.g.<Page>), you can pass a <Cart> as the child of the <Modal>:

In this pattern, all Server Components will be rendered on the server ahead of time, including those as props. The resulting RSC payload will contain references of where Client Components should be rendered within the component tree.

React context is commonly used to share global state like the current theme. However, React context is not supported in Server Components.

To use context, create a Client Component that accepts children:

Then, import it into a Server Component (e.g. layout):

Your Server Component will now be able to directly render your provider, and all other Client Components throughout your app will be able to consume this context.

Good to know: You should render providers as deep as possible in the tree – notice how ThemeProvider only wraps {children} instead of the entire <html> document. This makes it easier for Next.js to optimize the static parts of your Server Components.

When using a third-party component that relies on client-only features, you can wrap it in a Client Component to ensure it works as expected.

For example, the <Carousel /> can be imported from the acme-carousel package. This component uses useState, but it doesn't yet have the "use client" directive.

If you use <Carousel /> within a Client Component, it will work as expected:

However, if you try to use it directly within a Server Component, you'll see an error. This is because Next.js doesn't know <Carousel /> is using client-only features.

To fix this, you can wrap third-party components that rely on client-only features in your own Client Components:

Now, you can use <Carousel /> directly within a Server Component:

Advice for Library Authors

If you’re building a component library, add the "use client" directive to entry points that rely on client-only features. This lets your users import components into Server Components without needing to create wrappers.

It's worth noting some bundlers might strip out "use client" directives. You can find an example of how to configure esbuild to include the "use client" directive in the React Wrap Balancer and Vercel Analytics repositories.

JavaScript modules can be shared between both Server and Client Components modules. This means it's possible to accidentally import server-only code into the client. For example, consider the following function:

This function contains an API_KEY that should never be exposed to the client.

In Next.js, only environment variables prefixed with NEXT_PUBLIC_ are included in the client bundle. If variables are not prefixed, Next.js replaces them with an empty string.

As a result, even though getData() can be imported and executed on the client, it won't work as expected.

To prevent accidental usage in Client Components, you can use the server-only package.

Then, import the package into a file that contains server-only code:

Now, if you try to import the module into a Client Component, there will be a build-time error.

The corresponding client-only package can be used to mark modules that contain client-only logic like code that accesses the window object.

In Next.js, installing server-only or client-only is optional. However, if your linting rules flag extraneous dependencies, you may install them to avoid issues.

Next.js handles server-only and client-only imports internally to provide clearer error messages when a module is used in the wrong environment. The contents of these packages from NPM are not used by Next.js.

Next.js also provides its own type declarations for server-only and client-only, for TypeScript configurations where noUncheckedSideEffectImports is active.

**Examples:**

Example 1 (python):
```python
import LikeButton from '@/app/ui/like-button'
import { getPost } from '@/lib/data'
 
export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const post = await getPost(id)
 
  return (
    <div>
      <main>
        <h1>{post.title}</h1>
        {/* ... */}
        <LikeButton likes={post.likes} />
      </main>
    </div>
  )
}
```

Example 2 (python):
```python
'use client'
 
import { useState } from 'react'
 
export default function LikeButton({ likes }: { likes: number }) {
  // ...
}
```

Example 3 (python):
```python
'use client'
 
import { useState } from 'react'
 
export default function Counter() {
  const [count, setCount] = useState(0)
 
  return (
    <div>
      <p>{count} likes</p>
      <button onClick={() => setCount(count + 1)}>Click me</button>
    </div>
  )
}
```

Example 4 (python):
```python
// Client Component
import Search from './search'
// Server Component
import Logo from './logo'
 
// Layout is a Server Component by default
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <nav>
        <Logo />
        <Search />
      </nav>
      <main>{children}</main>
    </>
  )
}
```

---

## Metadata and OG images

**URL:** https://nextjs.org/docs/app/getting-started/metadata-and-og-images

**Contents:**
- Metadata and OG images
- Default fields
- Static metadata
- Generated metadata
  - Streaming metadata
  - Memoizing data requests
- File-based metadata
- Favicons
- Static Open Graph images
- Generated Open Graph images

The Metadata APIs can be used to define your application metadata for improved SEO and web shareability and include:

With all the options above, Next.js will automatically generate the relevant <head> tags for your page, which can be inspected in the browser's developer tools.

The metadata object and generateMetadata function exports are only supported in Server Components.

There are two default meta tags that are always added even if a route doesn't define metadata:

The other metadata fields can be defined with the Metadata object (for static metadata) or the generateMetadata function (for generated metadata).

To define static metadata, export a Metadata object from a static layout.js or page.js file. For example, to add a title and description to the blog route:

You can view a full list of available options, in the generateMetadata documentation.

You can use generateMetadata function to fetch metadata that depends on data. For example, to fetch the title and description for a specific blog post:

For dynamically rendered pages, Next.js streams metadata separately, injecting it into the HTML once generateMetadata resolves, without blocking UI rendering.

Streaming metadata improves perceived performance by allowing visual content to stream first.

Streaming metadata is disabled for bots and crawlers that expect metadata to be in the <head> tag (e.g. Twitterbot, Slackbot, Bingbot). These are detected by using the User Agent header from the incoming request.

You can customize or disable streaming metadata completely, with the htmlLimitedBots option in your Next.js config file.

Statically rendered pages don’t use streaming since metadata is resolved at build time.

Learn more about streaming metadata.

There may be cases where you need to fetch the same data for metadata and the page itself. To avoid duplicate requests, you can use React's cache function to memoize the return value and only fetch the data once. For example, to fetch the blog post information for both the metadata and the page:

The following special files are available for metadata:

You can use these for static metadata, or you can programmatically generate these files with code.

Favicons are small icons that represent your site in bookmarks and search results. To add a favicon to your application, create a favicon.ico and add to the root of the app folder.

You can also programmatically generate favicons using code. See the favicon docs for more information.

Open Graph (OG) images are images that represent your site in social media. To add a static OG image to your application, create a opengraph-image.png file in the root of the app folder.

You can also add OG images for specific routes by creating a opengraph-image.png deeper down the folder structure. For example, to create an OG image specific to the /blog route, add a opengraph-image.jpg file inside the blog folder.

The more specific image will take precedence over any OG images above it in the folder structure.

Other image formats such as jpeg, png, and gif are also supported. See the Open Graph Image docs for more information.

The ImageResponse constructor allows you to generate dynamic images using JSX and CSS. This is useful for OG images that depend on data.

For example, to generate a unique OG image for each blog post, add a opengraph-image.tsx file inside the blog folder, and import the ImageResponse constructor from next/og:

ImageResponse supports common CSS properties including flexbox and absolute positioning, custom fonts, text wrapping, centering, and nested images. See the full list of supported CSS properties.

**Examples:**

Example 1 (unknown):
```unknown
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
```

Example 2 (python):
```python
import type { Metadata } from 'next'
 
export const metadata: Metadata = {
  title: 'My Blog',
  description: '...',
}
 
export default function Layout() {}
```

Example 3 (python):
```python
import type { Metadata, ResolvingMetadata } from 'next'
 
type Props = {
  params: Promise<{ slug: string }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}
 
export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const slug = (await params).slug
 
  // fetch post information
  const post = await fetch(`https://api.vercel.app/blog/${slug}`).then((res) =>
    res.json()
  )
 
  return {
    title: post.title,
    description: post.description,
  }
}
 
export default function Page({ params, searchParams }: Props) {}
```

Example 4 (python):
```python
import { cache } from 'react'
import { db } from '@/app/lib/db'
 
// getPost will be used twice, but execute only once
export const getPost = cache(async (slug: string) => {
  const res = await db.query.posts.findFirst({ where: eq(posts.slug, slug) })
  return res
})
```

---

## Linking and Navigating

**URL:** https://nextjs.org/docs/app/getting-started/linking-and-navigating

**Contents:**
- Linking and Navigating
- How navigation works
  - Server Rendering
  - Prefetching
  - Streaming
  - Client-side transitions
- What can make transitions slow?
  - Dynamic routes without loading.tsx
  - Dynamic segments without generateStaticParams
  - Slow networks

In Next.js, routes are rendered on the server by default. This often means the client has to wait for a server response before a new route can be shown. Next.js comes with built-in prefetching, streaming, and client-side transitions ensuring navigation stays fast and responsive.

This guide explains how navigation works in Next.js and how you can optimize it for dynamic routes and slow networks.

To understand how navigation works in Next.js, it helps to be familiar with the following concepts:

In Next.js, Layouts and Pages are React Server Components by default. On initial and subsequent navigations, the Server Component Payload is generated on the server before being sent to the client.

There are two types of server rendering, based on when it happens:

The trade-off of server rendering is that the client must wait for the server to respond before the new route can be shown. Next.js addresses this delay by prefetching routes the user is likely to visit and performing client-side transitions.

Good to know: HTML is also generated for the initial visit.

Prefetching is the process of loading a route in the background before the user navigates to it. This makes navigation between routes in your application feel instant, because by the time a user clicks on a link, the data to render the next route is already available client side.

Next.js automatically prefetches routes linked with the <Link> component when they enter the user's viewport.

How much of the route is prefetched depends on whether it's static or dynamic:

By skipping or partially prefetching dynamic routes, Next.js avoids unnecessary work on the server for routes the users may never visit. However, waiting for a server response before navigation can give the users the impression that the app is not responding.

To improve the navigation experience to dynamic routes, you can use streaming.

Streaming allows the server to send parts of a dynamic route to the client as soon as they're ready, rather than waiting for the entire route to be rendered. This means users see something sooner, even if parts of the page are still loading.

For dynamic routes, it means they can be partially prefetched. That is, shared layouts and loading skeletons can be requested ahead of time.

To use streaming, create a loading.tsx in your route folder:

Behind the scenes, Next.js will automatically wrap the page.tsx contents in a <Suspense> boundary. The prefetched fallback UI will be shown while the route is loading, and swapped for the actual content once ready.

Good to know: You can also use <Suspense> to create loading UI for nested components.

Benefits of loading.tsx:

To further improve the navigation experience, Next.js performs a client-side transition with the <Link> component.

Traditionally, navigation to a server-rendered page triggers a full page load. This clears state, resets scroll position, and blocks interactivity.

Next.js avoids this with client-side transitions using the <Link> component. Instead of reloading the page, it updates the content dynamically by:

Client-side transitions are what makes a server-rendered apps feel like client-rendered apps. And when paired with prefetching and streaming, it enables fast transitions, even for dynamic routes.

These Next.js optimizations make navigation fast and responsive. However, under certain conditions, transitions can still feel slow. Here are some common causes and how to improve the user experience:

When navigating to a dynamic route, the client must wait for the server response before showing the result. This can give the users the impression that the app is not responding.

We recommend adding loading.tsx to dynamic routes to enable partial prefetching, trigger immediate navigation, and display a loading UI while the route renders.

Good to know: In development mode, you can use the Next.js Devtools to identify if the route is static or dynamic. See devIndicators for more information.

If a dynamic segment could be prerendered but isn't because it's missing generateStaticParams, the route will fallback to dynamic rendering at request time.

Ensure the route is statically generated at build time by adding generateStaticParams:

On slow or unstable networks, prefetching may not finish before the user clicks a link. This can affect both static and dynamic routes. In these cases, the loading.js fallback may not appear immediately because it hasn't been prefetched yet.

To improve perceived performance, you can use the useLinkStatus hook to show immediate feedback while the transition is in progress.

You can "debounce" the hint by adding an initial animation delay (e.g. 100ms) and starting as invisible (e.g. opacity: 0). This means the loading indicator will only be shown if the navigation takes longer than the specified delay. See the useLinkStatus reference for a CSS example.

Good to know: You can use other visual feedback patterns like a progress bar. View an example here.

You can opt out of prefetching by setting the prefetch prop to false on the <Link> component. This is useful to avoid unnecessary usage of resources when rendering large lists of links (e.g. an infinite scroll table).

However, disabling prefetching comes with trade-offs:

To reduce resource usage without fully disabling prefetch, you can prefetch only on hover. This limits prefetching to routes the user is more likely to visit, rather than all links in the viewport.

<Link> is a Client Component and must be hydrated before it can prefetch routes. On the initial visit, large JavaScript bundles can delay hydration, preventing prefetching from starting right away.

React mitigates this with Selective Hydration and you can further improve this by:

Next.js allows you to use the native window.history.pushState and window.history.replaceState methods to update the browser's history stack without reloading the page.

pushState and replaceState calls integrate into the Next.js Router, allowing you to sync with usePathname and useSearchParams.

Use it to add a new entry to the browser's history stack. The user can navigate back to the previous state. For example, to sort a list of products:

Use it to replace the current entry on the browser's history stack. The user is not able to navigate back to the previous state. For example, to switch the application's locale:

**Examples:**

Example 1 (python):
```python
import Link from 'next/link'
 
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <body>
        <nav>
          {/* Prefetched when the link is hovered or enters the viewport */}
          <Link href="/blog">Blog</Link>
          {/* No prefetching */}
          <a href="/contact">Contact</a>
        </nav>
        {children}
      </body>
    </html>
  )
}
```

Example 2 (unknown):
```unknown
export default function Loading() {
  // Add fallback UI that will be shown while the route is loading.
  return <LoadingSkeleton />
}
```

Example 3 (unknown):
```unknown
export default function Loading() {
  return <LoadingSkeleton />
}
```

Example 4 (javascript):
```javascript
export async function generateStaticParams() {
  const posts = await fetch('https://.../posts').then((res) => res.json())
 
  return posts.map((post) => ({
    slug: post.slug,
  }))
}
 
export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  // ...
}
```

---

## Upgrading

**URL:** https://nextjs.org/docs/app/getting-started/upgrading

**Contents:**
- Upgrading
- Latest version
- Canary version
  - Features available in canary
- Version guides
  - Version 16
  - Version 15
  - Version 14

To update to the latest version of Next.js, you can use the upgrade codemod:

If you prefer to upgrade manually, install the latest Next.js and React versions:

To update to the latest canary, make sure you're on the latest version of Next.js and everything is working as expected. Then, run the following command:

The following features are currently available in canary:

**Examples:**

Example 1 (unknown):
```unknown
npx @next/codemod@latest upgrade latest
```

Example 2 (unknown):
```unknown
pnpm i next@latest react@latest react-dom@latest eslint-config-next@latest
```

Example 3 (unknown):
```unknown
npm i next@canary
```

---

## Updating Data

**URL:** https://nextjs.org/docs/app/getting-started/updating-data

**Contents:**
- Updating Data
- What are Server Functions?
- Creating Server Functions
  - Server Components
  - Client Components
  - Passing actions as props
- Invoking Server Functions
  - Forms
  - Event Handlers
- Examples

You can update data in Next.js using React's Server Functions. This page will go through how you can create and invoke Server Functions.

A Server Function is an asynchronous function that runs on the server. They can be called from the client through a network request, which is why they must be asynchronous.

In an action or mutation context, they are also called Server Actions.

By convention, a Server Action is an async function used with startTransition. This happens automatically when the function is:

In Next.js, Server Actions integrate with the framework's caching architecture. When an action is invoked, Next.js can return both the updated UI and new data in a single server roundtrip.

Behind the scenes, actions use the POST method, and only this HTTP method can invoke them.

A Server Function can be defined by using the use server directive. You can place the directive at the top of an asynchronous function to mark the function as a Server Function, or at the top of a separate file to mark all exports of that file.

Server Functions can be inlined in Server Components by adding the "use server" directive to the top of the function body:

Good to know: Server Components support progressive enhancement by default, meaning forms that call Server Actions will be submitted even if JavaScript hasn't loaded yet or is disabled.

It's not possible to define Server Functions in Client Components. However, you can invoke them in Client Components by importing them from a file that has the "use server" directive at the top of it:

Good to know: In Client Components, forms invoking Server Actions will queue submissions if JavaScript isn't loaded yet, and will be prioritized for hydration. After hydration, the browser does not refresh on form submission.

You can also pass an action to a Client Component as a prop:

There are two main ways you can invoke a Server Function:

Good to know: Server Functions are designed for server-side mutations. The client currently dispatches and awaits them one at a time. This is an implementation detail and may change. If you need parallel data fetching, use data fetching in Server Components, or perform parallel work inside a single Server Function or Route Handler.

React extends the HTML <form> element to allow a Server Function to be invoked with the HTML action prop.

When invoked in a form, the function automatically receives the FormData object. You can extract the data using the native FormData methods:

You can invoke a Server Function in a Client Component by using event handlers such as onClick.

While executing a Server Function, you can show a loading indicator with React's useActionState hook. This hook returns a pending boolean:

After a mutation, you may want to refresh the current page to show the latest data. You can do this by calling refresh from next/cache in a Server Action:

This refreshes the client router, ensuring the UI reflects the latest state. The refresh() function does not revalidate tagged data. To revalidate tagged data, use updateTag or revalidateTag instead.

After performing an update, you can revalidate the Next.js cache and show the updated data by calling revalidatePath or revalidateTag within the Server Function:

You may want to redirect the user to a different page after performing an update. You can do this by calling redirect within the Server Function.

Calling redirect throws a framework handled control-flow exception. Any code after it won't execute. If you need fresh data, call revalidatePath or revalidateTag beforehand.

You can get, set, and delete cookies inside a Server Action using the cookies API.

When you set or delete a cookie in a Server Action, Next.js re-renders the current page and its layouts on the server so the UI reflects the new cookie value.

Good to know: The server update applies to the current React tree, re-rendering, mounting, or unmounting components, as needed. Client state is preserved for re-rendered components, and effects re-run if their dependencies changed.

You can use the React useEffect hook to invoke a Server Action when the component mounts or a dependency changes. This is useful for mutations that depend on global events or need to be triggered automatically. For example, onKeyDown for app shortcuts, an intersection observer hook for infinite scrolling, or when the component mounts to update a view count:

**Examples:**

Example 1 (javascript):
```javascript
export async function createPost(formData: FormData) {
  'use server'
  const title = formData.get('title')
  const content = formData.get('content')
 
  // Update data
  // Revalidate cache
}
 
export async function deletePost(formData: FormData) {
  'use server'
  const id = formData.get('id')
 
  // Update data
  // Revalidate cache
}
```

Example 2 (unknown):
```unknown
export default function Page() {
  // Server Action
  async function createPost(formData: FormData) {
    'use server'
    // ...
  }
 
  return <></>
}
```

Example 3 (unknown):
```unknown
'use server'
 
export async function createPost() {}
```

Example 4 (python):
```python
'use client'
 
import { createPost } from '@/app/actions'
 
export function Button() {
  return <button formAction={createPost}>Create</button>
}
```

---

## Deploying

**URL:** https://nextjs.org/docs/app/getting-started/deploying

**Contents:**
- Deploying
- Node.js server
  - Templates
- Docker
  - Templates
- Static export
  - Templates
- Adapters

Next.js can be deployed as a Node.js server, Docker container, static export, or adapted to run on different platforms.

Next.js can be deployed to any provider that supports Node.js. Ensure your package.json has the "build" and "start" scripts:

Then, run npm run build to build your application and npm run start to start the Node.js server. This server supports all Next.js features. If needed, you can also eject to a custom server.

Node.js deployments support all Next.js features. Learn how to configure them for your infrastructure.

Next.js can be deployed to any provider that supports Docker containers. This includes container orchestrators like Kubernetes or a cloud provider that runs Docker.

Docker deployments support all Next.js features. Learn how to configure them for your infrastructure.

Note for development: While Docker is excellent for production deployments, consider using local development (npm run dev) instead of Docker during development on Mac and Windows for better performance. Learn more about optimizing local development.

Next.js enables starting as a static site or Single-Page Application (SPA), then later optionally upgrading to use features that require a server.

Since Next.js supports static exports, it can be deployed and hosted on any web server that can serve HTML/CSS/JS static assets. This includes tools like AWS S3, Nginx, or Apache.

Running as a static export does not support Next.js features that require a server. Learn more.

Next.js can be adapted to run on different platforms to support their infrastructure capabilities.

Refer to each provider's documentation for information on supported Next.js features:

Note: We are working on a Deployment Adapters API for all platforms to adopt. After completion, we will add documentation on how to write your own adapters.

**Examples:**

Example 1 (unknown):
```unknown
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start"
  }
}
```

---

## Image Optimization

**URL:** https://nextjs.org/docs/15/app/getting-started/images

**Contents:**
- Image Optimization
- Local images
- Remote images
- API Reference
  - Image Component

The Next.js <Image> component extends the HTML <img> element to provide:

To start using <Image>, import it from next/image and render it within your component.

The src property can be a local or remote image.

🎥 Watch: Learn more about how to use next/image → YouTube (9 minutes).

You can store static files, like images and fonts, under a folder called public in the root directory. Files inside public can then be referenced by your code starting from the base URL (/).

If the image is statically imported, Next.js will automatically determine the intrinsic width and height. These values are used to determine the image ratio and prevent Cumulative Layout Shift while your image is loading.

To use a remote image, you can provide a URL string for the src property.

Since Next.js does not have access to remote files during the build process, you'll need to provide the width, height and optional blurDataURL props manually. The width and height are used to infer the correct aspect ratio of image and avoid layout shift from the image loading in. Alternatively, you can use the fill property to make the image fill the size of the parent element.

To safely allow images from remote servers, you need to define a list of supported URL patterns in next.config.js. Be as specific as possible to prevent malicious usage. For example, the following configuration will only allow images from a specific AWS S3 bucket:

**Examples:**

Example 1 (python):
```python
import Image from 'next/image'
 
export default function Page() {
  return <Image src="" alt="" />
}
```

Example 2 (python):
```python
import Image from 'next/image'
 
export default function Page() {
  return (
    <Image
      src="/profile.png"
      alt="Picture of the author"
      width={500}
      height={500}
    />
  )
}
```

Example 3 (python):
```python
import Image from 'next/image'
import ProfileImage from './profile.png'
 
export default function Page() {
  return (
    <Image
      src={ProfileImage}
      alt="Picture of the author"
      // width={500} automatically provided
      // height={500} automatically provided
      // blurDataURL="data:..." automatically provided
      // placeholder="blur" // Optional blur-up while loading
    />
  )
}
```

Example 4 (python):
```python
import Image from 'next/image'
 
export default function Page() {
  return (
    <Image
      src="https://s3.amazonaws.com/my-bucket/profile.png"
      alt="Picture of the author"
      width={500}
      height={500}
    />
  )
}
```

---

## Font Optimization

**URL:** https://nextjs.org/docs/15/app/getting-started/fonts

**Contents:**
- Font Optimization
- Google fonts
- Local fonts
- API Reference
  - Font

The next/font module automatically optimizes your fonts and removes external network requests for improved privacy and performance.

It includes built-in self-hosting for any font file. This means you can optimally load web fonts with no layout shift.

To start using next/font, import it from next/font/local or next/font/google, call it as a function with the appropriate options, and set the className of the element you want to apply the font to. For example:

Fonts are scoped to the component they're used in. To apply a font to your entire application, add it to the Root Layout.

You can automatically self-host any Google Font. Fonts are included stored as static assets and served from the same domain as your deployment, meaning no requests are sent to Google by the browser when the user visits your site.

To start using a Google Font, import your chosen font from next/font/google:

We recommend using variable fonts for the best performance and flexibility. But if you can't use a variable font, you will need to specify a weight:

To use a local font, import your font from next/font/local and specify the src of your local font file. Fonts can be stored in the public folder or co-located inside the app folder. For example:

If you want to use multiple files for a single font family, src can be an array:

**Examples:**

Example 1 (python):
```python
import { Geist } from 'next/font/google'
 
const geist = Geist({
  subsets: ['latin'],
})
 
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={geist.className}>
      <body>{children}</body>
    </html>
  )
}
```

Example 2 (python):
```python
import { Geist } from 'next/font/google'
 
const geist = Geist({
  subsets: ['latin'],
})
 
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={geist.className}>
      <body>{children}</body>
    </html>
  )
}
```

Example 3 (python):
```python
import { Roboto } from 'next/font/google'
 
const roboto = Roboto({
  weight: '400',
  subsets: ['latin'],
})
 
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={roboto.className}>
      <body>{children}</body>
    </html>
  )
}
```

Example 4 (python):
```python
import localFont from 'next/font/local'
 
const myFont = localFont({
  src: './my-font.woff2',
})
 
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={myFont.className}>
      <body>{children}</body>
    </html>
  )
}
```

---

## Layouts and Pages

**URL:** https://nextjs.org/docs/app/getting-started/layouts-and-pages

**Contents:**
- Layouts and Pages
- Creating a page
- Creating a layout
- Creating a nested route
- Nesting layouts
- Creating a dynamic segment
- Rendering with search params
  - What to use and when
- Linking between pages
- Route Props Helpers

Next.js uses file-system based routing, meaning you can use folders and files to define routes. This page will guide you through how to create layouts and pages, and link between them.

A page is UI that is rendered on a specific route. To create a page, add a page file inside the app directory and default export a React component. For example, to create an index page (/):

A layout is UI that is shared between multiple pages. On navigation, layouts preserve state, remain interactive, and do not rerender.

You can define a layout by default exporting a React component from a layout file. The component should accept a children prop which can be a page or another layout.

For example, to create a layout that accepts your index page as child, add a layout file inside the app directory:

The layout above is called a root layout because it's defined at the root of the app directory. The root layout is required and must contain html and body tags.

A nested route is a route composed of multiple URL segments. For example, the /blog/[slug] route is composed of three segments:

To create nested routes, you can nest folders inside each other. For example, to add a route for /blog, create a folder called blog in the app directory. Then, to make /blog publicly accessible, add a page.tsx file:

You can continue nesting folders to create nested routes. For example, to create a route for a specific blog post, create a new [slug] folder inside blog and add a page file:

Wrapping a folder name in square brackets (e.g. [slug]) creates a dynamic route segment which is used to generate multiple pages from data. e.g. blog posts, product pages, etc.

By default, layouts in the folder hierarchy are also nested, which means they wrap child layouts via their children prop. You can nest layouts by adding layout inside specific route segments (folders).

For example, to create a layout for the /blog route, add a new layout file inside the blog folder.

If you were to combine the two layouts above, the root layout (app/layout.js) would wrap the blog layout (app/blog/layout.js), which would wrap the blog (app/blog/page.js) and blog post page (app/blog/[slug]/page.js).

Dynamic segments allow you to create routes that are generated from data. For example, instead of manually creating a route for each individual blog post, you can create a dynamic segment to generate the routes based on blog post data.

To create a dynamic segment, wrap the segment (folder) name in square brackets: [segmentName]. For example, in the app/blog/[slug]/page.tsx route, the [slug] is the dynamic segment.

Learn more about Dynamic Segments and the params props.

Nested layouts within Dynamic Segments, can also access the params props.

In a Server Component page, you can access search parameters using the searchParams prop:

Using searchParams opts your page into dynamic rendering because it requires a incoming request to read the search parameters from.

Client Components can read search params using the useSearchParams hook.

Learn more about useSearchParams in statically rendered and dynamically rendered routes.

You can use the <Link> component to navigate between routes. <Link> is a built-in Next.js component that extends the HTML <a> tag to provide prefetching and client-side navigation.

For example, to generate a list of blog posts, import <Link> from next/link and pass a href prop to the component:

Good to know: <Link> is the primary way to navigate between routes in Next.js. You can also use the useRouter hook for more advanced navigation.

Next.js exposes utility types that infer params and named slots from your route structure:

These are globally available helpers, generated when running either next dev, next build or next typegen.

**Examples:**

Example 1 (unknown):
```unknown
export default function Page() {
  return <h1>Hello Next.js!</h1>
}
```

Example 2 (unknown):
```unknown
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        {/* Layout UI */}
        {/* Place children where you want to render a page or nested layout */}
        <main>{children}</main>
      </body>
    </html>
  )
}
```

Example 3 (python):
```python
// Dummy imports
import { getPosts } from '@/lib/posts'
import { Post } from '@/ui/post'
 
export default async function Page() {
  const posts = await getPosts()
 
  return (
    <ul>
      {posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </ul>
  )
}
```

Example 4 (unknown):
```unknown
function generateStaticParams() {}
 
export default function Page() {
  return <h1>Hello, Blog Post Page!</h1>
}
```

---

## CSS

**URL:** https://nextjs.org/docs/app/getting-started/css

**Contents:**
- CSS
- Tailwind CSS
- CSS Modules
- Global CSS
- External stylesheets
- Ordering and Merging
  - Recommendations
- Development vs Production
- Next Steps
  - Tailwind CSS v3

Next.js provides several ways to style your application using CSS, including:

Tailwind CSS is a utility-first CSS framework that provides low-level utility classes to build custom designs.

Install Tailwind CSS:

Add the PostCSS plugin to your postcss.config.mjs file:

Import Tailwind in your global CSS file:

Import the CSS file in your root layout:

Now you can start using Tailwind's utility classes in your application:

Good to know: If you need broader browser support for very old browsers, see the Tailwind CSS v3 setup instructions.

CSS Modules locally scope CSS by generating unique class names. This allows you to use the same class in different files without worrying about naming collisions.

To start using CSS Modules, create a new file with the extension .module.css and import it into any component inside the app directory:

You can use global CSS to apply styles across your application.

Create a app/global.css file and import it in the root layout to apply the styles to every route in your application:

Good to know: Global styles can be imported into any layout, page, or component inside the app directory. However, since Next.js uses React's built-in support for stylesheets to integrate with Suspense, this currently does not remove stylesheets as you navigate between routes which can lead to conflicts. We recommend using global styles for truly global CSS (like Tailwind's base styles), Tailwind CSS for component styling, and CSS Modules for custom scoped CSS when needed.

Stylesheets published by external packages can be imported anywhere in the app directory, including colocated components:

Good to know: In React 19, <link rel="stylesheet" href="..." /> can also be used. See the React link documentation for more information.

Next.js optimizes CSS during production builds by automatically chunking (merging) stylesheets. The order of your CSS depends on the order you import styles in your code.

For example, base-button.module.css will be ordered before page.module.css since <BaseButton> is imported before page.module.css:

To keep CSS ordering predictable:

**Examples:**

Example 1 (unknown):
```unknown
pnpm add -D tailwindcss @tailwindcss/postcss
```

Example 2 (unknown):
```unknown
export default {
  plugins: {
    '@tailwindcss/postcss': {},
  },
}
```

Example 3 (unknown):
```unknown
@import 'tailwindcss';
```

Example 4 (unknown):
```unknown
import './globals.css'
 
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
```

---

## Layouts and Pages

**URL:** https://nextjs.org/docs/15/app/getting-started/layouts-and-pages

**Contents:**
- Layouts and Pages
- Creating a page
- Creating a layout
- Creating a nested route
- Nesting layouts
- Creating a dynamic segment
- Rendering with search params
  - What to use and when
- Linking between pages
- Route Props Helpers

Next.js uses file-system based routing, meaning you can use folders and files to define routes. This page will guide you through how to create layouts and pages, and link between them.

A page is UI that is rendered on a specific route. To create a page, add a page file inside the app directory and default export a React component. For example, to create an index page (/):

A layout is UI that is shared between multiple pages. On navigation, layouts preserve state, remain interactive, and do not rerender.

You can define a layout by default exporting a React component from a layout file. The component should accept a children prop which can be a page or another layout.

For example, to create a layout that accepts your index page as child, add a layout file inside the app directory:

The layout above is called a root layout because it's defined at the root of the app directory. The root layout is required and must contain html and body tags.

A nested route is a route composed of multiple URL segments. For example, the /blog/[slug] route is composed of three segments:

To create nested routes, you can nest folders inside each other. For example, to add a route for /blog, create a folder called blog in the app directory. Then, to make /blog publicly accessible, add a page.tsx file:

You can continue nesting folders to create nested routes. For example, to create a route for a specific blog post, create a new [slug] folder inside blog and add a page file:

Wrapping a folder name in square brackets (e.g. [slug]) creates a dynamic route segment which is used to generate multiple pages from data. e.g. blog posts, product pages, etc.

By default, layouts in the folder hierarchy are also nested, which means they wrap child layouts via their children prop. You can nest layouts by adding layout inside specific route segments (folders).

For example, to create a layout for the /blog route, add a new layout file inside the blog folder.

If you were to combine the two layouts above, the root layout (app/layout.js) would wrap the blog layout (app/blog/layout.js), which would wrap the blog (app/blog/page.js) and blog post page (app/blog/[slug]/page.js).

Dynamic segments allow you to create routes that are generated from data. For example, instead of manually creating a route for each individual blog post, you can create a dynamic segment to generate the routes based on blog post data.

To create a dynamic segment, wrap the segment (folder) name in square brackets: [segmentName]. For example, in the app/blog/[slug]/page.tsx route, the [slug] is the dynamic segment.

Learn more about Dynamic Segments and the params props.

Nested layouts within Dynamic Segments, can also access the params props.

In a Server Component page, you can access search parameters using the searchParams prop:

Using searchParams opts your page into dynamic rendering because it requires a incoming request to read the search parameters from.

Client Components can read search params using the useSearchParams hook.

Learn more about useSearchParams in statically rendered and dynamically rendered routes.

You can use the <Link> component to navigate between routes. <Link> is a built-in Next.js component that extends the HTML <a> tag to provide prefetching and client-side navigation.

For example, to generate a list of blog posts, import <Link> from next/link and pass a href prop to the component:

Good to know: <Link> is the primary way to navigate between routes in Next.js. You can also use the useRouter hook for more advanced navigation.

Next.js exposes utility types that infer params and named slots from your route structure:

These are globally available helpers, generated when running either next dev, next build or next typegen.

**Examples:**

Example 1 (unknown):
```unknown
export default function Page() {
  return <h1>Hello Next.js!</h1>
}
```

Example 2 (unknown):
```unknown
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        {/* Layout UI */}
        {/* Place children where you want to render a page or nested layout */}
        <main>{children}</main>
      </body>
    </html>
  )
}
```

Example 3 (python):
```python
// Dummy imports
import { getPosts } from '@/lib/posts'
import { Post } from '@/ui/post'
 
export default async function Page() {
  const posts = await getPosts()
 
  return (
    <ul>
      {posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </ul>
  )
}
```

Example 4 (unknown):
```unknown
function generateStaticParams() {}
 
export default function Page() {
  return <h1>Hello, Blog Post Page!</h1>
}
```

---

## Project structure and organization

**URL:** https://nextjs.org/docs/15/app/getting-started/project-structure

**Contents:**
- Project structure and organization
- Folder and file conventions
  - Top-level folders
  - Top-level files
  - Routing Files
  - Nested routes
  - Dynamic routes
  - Route Groups and private folders
  - Parallel and Intercepted Routes
  - Metadata file conventions

This page provides an overview of all the folder and file conventions in Next.js, and recommendations for organizing your project.

Top-level folders are used to organize your application's code and static assets.

Top-level files are used to configure your application, manage dependencies, run middleware, integrate monitoring tools, and define environment variables.

Add page to expose a route, layout for shared UI such as header, nav, or footer, loading for skeletons, error for error boundaries and route for APIs.

Folders define URL segments. Nesting folders nests segments. Layouts at any level wrap their child segments. A route becomes public when a page or route file exists.

Parameterize segments with square brackets. Use [segment] for a single param, [...segment] for catch‑all, and [[...segment]] for optional catch‑all. Access values via the params prop.

Organize code without changing URLs with route groups (group), and colocate non-routable files with private folders _folder.

These features fit specific UI patterns, such as slot-based layouts or modal routing.

Use @slot for named slots rendered by a parent layout. Use intercept patterns to render another route inside the current layout without changing the URL, for example, to show a details view as a modal over a list.

Next.js is unopinionated about how you organize and colocate your project files. But it does provide several features to help you organize your project.

The components defined in special files are rendered in a specific hierarchy:

The components are rendered recursively in nested routes, meaning the components of a route segment will be nested inside the components of its parent segment.

In the app directory, nested folders define route structure. Each folder represents a route segment that is mapped to a corresponding segment in a URL path.

However, even though route structure is defined through folders, a route is not publicly accessible until a page.js or route.js file is added to a route segment.

And, even when a route is made publicly accessible, only the content returned by page.js or route.js is sent to the client.

This means that project files can be safely colocated inside route segments in the app directory without accidentally being routable.

Good to know: While you can colocate your project files in app you don't have to. If you prefer, you can keep them outside the app directory.

Private folders can be created by prefixing a folder with an underscore: _folderName

This indicates the folder is a private implementation detail and should not be considered by the routing system, thereby opting the folder and all its subfolders out of routing.

Since files in the app directory can be safely colocated by default, private folders are not required for colocation. However, they can be useful for:

Route groups can be created by wrapping a folder in parenthesis: (folderName)

This indicates the folder is for organizational purposes and should not be included in the route's URL path.

Route groups are useful for:

Next.js supports storing application code (including app) inside an optional src folder. This separates application code from project configuration files which mostly live in the root of a project.

The following section lists a very high-level overview of common strategies. The simplest takeaway is to choose a strategy that works for you and your team and be consistent across the project.

Good to know: In our examples below, we're using components and lib folders as generalized placeholders, their naming has no special framework significance and your projects might use other folders like ui, utils, hooks, styles, etc.

This strategy stores all application code in shared folders in the root of your project and keeps the app directory purely for routing purposes.

This strategy stores all application code in shared folders in the root of the app directory.

This strategy stores globally shared application code in the root app directory and splits more specific application code into the route segments that use them.

To organize routes without affecting the URL, create a group to keep related routes together. The folders in parenthesis will be omitted from the URL (e.g. (marketing) or (shop)).

Even though routes inside (marketing) and (shop) share the same URL hierarchy, you can create a different layout for each group by adding a layout.js file inside their folders.

To opt specific routes into a layout, create a new route group (e.g. (shop)) and move the routes that share the same layout into the group (e.g. account and cart). The routes outside of the group will not share the layout (e.g. checkout).

To apply a loading skeleton via a loading.js file to a specific route, create a new route group (e.g., /(overview)) and then move your loading.tsx inside that route group.

Now, the loading.tsx file will only apply to your dashboard → overview page instead of all your dashboard pages without affecting the URL path structure.

To create multiple root layouts, remove the top-level layout.js file, and add a layout.js file inside each route group. This is useful for partitioning an application into sections that have a completely different UI or experience. The <html> and <body> tags need to be added to each root layout.

In the example above, both (marketing) and (shop) have their own root layout.

---

## create-next-app CLI

**URL:** https://nextjs.org/docs/pages/api-reference/cli/create-next-app

**Contents:**
- create-next-app CLI
- Reference
- Examples
  - With the default template
  - Linter Options
  - With an official Next.js example
  - With any public GitHub example

The create-next-app CLI allow you to create a new Next.js application using the default template or an example from a public GitHub repository. It is the easiest way to get started with Next.js.

The following options are available:

To create a new app using the default template, run the following command in your terminal:

On installation, you'll see the following prompts:

If you choose to customize settings, you'll see the following prompts:

After the prompts, create-next-app will create a folder with your project name and install the required dependencies.

ESLint: The traditional and most popular JavaScript linter. Includes Next.js-specific rules from @next/eslint-plugin-next.

Biome: A fast, modern linter and formatter that combines the functionality of ESLint and Prettier. Includes built-in Next.js and React domain support for optimal performance.

None: Skip linter configuration entirely. You can always add a linter later.

Once you've answered the prompts, a new project will be created with your chosen configuration.

To create a new app using an official Next.js example, use the --example flag. For example:

You can view a list of all available examples along with setup instructions in the Next.js repository.

To create a new app using any public GitHub example, use the --example option with the GitHub repo's URL. For example:

**Examples:**

Example 1 (unknown):
```unknown
npx create-next-app@latest [project-name] [options]
```

Example 2 (unknown):
```unknown
npx create-next-app@latest
```

Example 3 (unknown):
```unknown
What is your project named? my-app
Would you like to use the recommended Next.js defaults?
    Yes, use recommended defaults - TypeScript, ESLint, Tailwind CSS, App Router, Turbopack
    No, reuse previous settings
    No, customize settings - Choose your own preferences
```

Example 4 (unknown):
```unknown
Would you like to use TypeScript? No / Yes
Which linter would you like to use? ESLint / Biome / None
Would you like to use React Compiler? No / Yes
Would you like to use Tailwind CSS? No / Yes
Would you like your code inside a `src/` directory? No / Yes
Would you like to use App Router? (recommended) No / Yes
Would you like to customize the import alias (`@/*` by default)? No / Yes
What import alias would you like configured? @/*
```

---
