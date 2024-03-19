# [cutups.io/](https://cutups.io/)

[cutups.io/](https://cutups.io/) is a text editor web app can be used to create cut ups or new text documents. You can edit the document and save it to the cloud or download it as a .rtf document.

## What are cut ups?

The cut up technique is a chance-based literary technique in which a text is cut up and rearranged to create a new text. The concept can be traced to at least the Dadaists of the 1920s, but was popularized in the late 1950s and early 1960s by writer William S. Burroughs, and has since been used in a wide variety of contexts [source](https://en.wikipedia.org/wiki/Cut-up_technique). The texts used to make the cut on this site break each text down to separate lines of around 85 glyphs, then folds the two sources together like shuffling a deck of cards.

## Frontend frameworks

The app is built using [React](https://react.dev/) with [Vite](https://vitejs.dev/) as a build tool.

The WYSIWYG text editor is built using the [Quill](https://quilljs.com/) rich text editor, specifically [react-quill](https://www.npmjs.com/package/react-quill)

## Structure

**`src/pages`**: Holds specific views (About, etc.) and view-specific components.

**`src/components`**: Holds components shared across views.

**`src/state`**: Holds global state files related to `recoil` state (`atoms` and `selector` definitions).

**`src/utils`**: Holds defines utilities used across multiple components or pages. It also is where all the API calls from the FE are defined.

**`src/styles`**: Defines all universal styles, `CSS` resets, and style variables.

**`src/main.jsx`**: The main entry point into the app, holds the `<BrowserRouter />`.

## Global state management

I'm using [`recoil`](https://recoiljs.org/) as it's comparatively succinct and simple react global state management solution. The global state holds the user info, the sources' info (used to create a new doc), and some values to prevent prop drilling. If a prop needs to be passed down through 3 or more components, use the global store.

## Static assets

**`/public/images`**: images
**`/public/fonts`**: fonts

To reference them in a component or `.scss` file, `Vite` assumes all relative URLs from the `/public` directory as a base:

`<img src="/images/my-img.png">`

```css
.elem {
  background-image: url(/images/my-img.png);
}
```

## Hosting and backend

The app was using google's [Firebase](https://firebase.google.com/) platform:

Users are managed by [Firebase Authentication](https://firebase.google.com/docs/auth).

The API is built with [Firebase Cloud Functions](https://firebase.google.com/docs/functions).

Hosting is via [Firebase Hosting](https://firebase.google.com/docs/hosting)

The database built via [Firebase's Firestore](https://firebase.google.com/docs/firestore) `NoSQL` cloud database.

## Users

Signing up is meant to be as frictionless as possible. Google authentication keeps the user logged in until they log out. User info is stored in the global store. The user ID is required for all API calls apart from getting sources to make a new doc.

## API

The API is built with [Firebase Cloud Functions](https://firebase.google.com/docs/functions). All the endpoints live in the `/functions` directory. Think of everything in the `/functions` directory as wholly separate from the rest of the project. It has its own `package.json` file, don't attempt to import any code into it from the rest of the project.

All calls pertaining to `CRUD` functionality must include a user ID.

To make a new endpoint, add a function to `/functions/index.js` and export the function name.

In `firebase.json` update the `rewrites` value with your new endpoint:

```json
{
  "hosting": {
    "rewrites": [
      {
        "source": "/api/my-new-endpoint",
        "function": "myNewEndpoint" // the new function name
      },
      {
        "source": "/api/get-documents",
        "function": "getDocuments"
      }
    ]
  }
}
```

Then to publish the new endpoint, run the following:

```
$ firebase deploy --only functions:myNewEndpoint
```

## Schemas

### Published sources titles

```json
{
  "key": "String",
  "order": "Integer",
  "textRef": "Reference",
  "title": "String"
}
```

### Published sources

```json
{
  "content": "String"
}
```

### User document

```json
{
  "content": "String",
  "dateCreated": "Timestamp",
  "dateUpdated": "Timestamp",
  "title": "String",
  "userId": "String"
}
```

## Local development

`$ npm run dev`: runs the app in development mode, view it at [http://localhost:5173/](http://localhost:5173/). Hot reloading is enabled.

`$ npm run build`: builds the app for production in the `/dist` directory. View it by running `$ npm run preview`.

`$ npm run preview`: runs the built production app from the `/dist` directory. View it at [http://localhost:4173/](http://localhost:4173/).

## Publishing

Build the app to the `/dist` directory:
```$ npm run build```

Ensure the `firebase.json` is pointing to the `/dist` directory:
```json
{
  "hosting": {
    "public": "dist"
  }
}
```

Using the [`firebase` CLI](https://firebaseopensource.com/projects/firebase/firebase-tools/) run:
```$ firebase deploy --only hosting```

This will push the site to production.

## Secrets 

Secrets are placed in a `.env` file and have keys prefixed with `VITE_`, as recommended by the [docs](https://vitejs.dev/guide/env-and-mode).