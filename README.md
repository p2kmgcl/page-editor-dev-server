# Page Editor Development Server

> Unofficial, dangerous, grumpy, horrendous, boring, cruel, dishonest, impulsive, rude, selfish, untrustworthy Page Editor development server 🦄

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

- `--rtl`: Enables RTL language
- `--master-page=<name>`: Uses given master page (defaults to `Blank`)
