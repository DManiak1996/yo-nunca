# Nextjs - Data Fetching

**Pages:** 1

---

## Dynamic APIs are Asynchronous

**URL:** https://nextjs.org/docs/messages/sync-dynamic-apis

**Contents:**
- Dynamic APIs are Asynchronous
- Why This Warning Occurred
- Possible Ways to Fix It
  - Unmigratable Cases
  - Enforced Migration with Linter

Learn more about why accessing certain APIs synchronously now warns.

Somewhere in your code you used an API that opts into dynamic rendering.

In Next 15, these APIs have been made asynchronous. You can read more about this in the Next.js 15 Upgrade Guide.

For example, the following code will issue a warning:

This also includes enumerating (e.g. {...params}, or Object.keys(params)) or iterating over the return value of these APIs (e.g. [...headers()] or for (const cookie of cookies()), or explicitly with cookies()[Symbol.iterator]()).

The next-async-request-api codemod can fix many of these cases automatically:

The codemod cannot cover all cases, so you may need to manually adjust some code.

If the warning occurred on the Server (e.g. a route handler, or a Server Component), you must await the dynamic API to access its properties:

If the warning occurred in a synchronous component (e.g. a Client component), you must use React.use() to unwrap the Promise first:

If Next.js codemod found anything that is not able to be migrated by the codemod, it will leave a comment with @next-codemod-error prefix and the suggested action, for example: In this case, you need to manually await the call to cookies(), and change the function to async. Then refactor the usages of the function to be properly awaited:

If you didn't address the comments that starting with @next-codemod-error left by the codemod, Next.js will error in both dev and build to enforce you to address the issues. You can review the changes and follow the suggestion in the comments. You can either make the necessary changes and remove the comment, or replace the comment prefix @next-codemod-error with @next-codemod-ignore If there's no action to be taken, the comment prefix @next-codemod-ignore will bypass the build error.

You can delay unwrapping the Promise (either with await or React.use) until you actually need to consume the value. This will allow Next.js to statically render more of your page.

**Examples:**

Example 1 (unknown):
```unknown
function Page({ params }) {
  // direct access of `params.id`.
  return <p>ID: {params.id}</p>
}
```

Example 2 (unknown):
```unknown
npx @next/codemod@canary next-async-request-api .
```

Example 3 (javascript):
```javascript
async function Page({ params }) {
  // asynchronous access of `params.id`.
  const { id } = await params
  return <p>ID: {id}</p>
}
```

Example 4 (python):
```python
'use client'
import * as React from 'react'
 
function Page({ params }) {
  // asynchronous access of `params.id`.
  const { id } = React.use(params)
  return <p>ID: {id}</p>
}
```

---
