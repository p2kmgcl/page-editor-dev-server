# Page Editor Development Server

## Portal config

```
# Avoid checking CSRF
auth.token.check.enabled=false
```

## Install

```
git clone https://github.com/p2kmgcl/page-editor-dev-server
cd page-editor-dev-server
npm link
```

## Run

```
cd ~/my/local/page-editor/project
page-editor-dev-server
```

### CLI Options

- `--no-hot`: Disables hot reloading
- `--rtl`: Enables RTL language
- `--master-page=<name>`: Uses given master page (defaults to `Blank`)

## Extra tools

- `window.compareObjects`: diffs to objects on the browser console.
