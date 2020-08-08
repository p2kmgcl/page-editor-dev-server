# Page Editor Development Server

> Unofficial, dangerous, grumpy, horrendous, boring, cruel, dishonest, impulsive, rude, selfish, untrustworthy Page Editor development server 🦄

## Portal config

```
# Avoid checking CSRF
auth.token.check.enabled=false
```

## Install

__Requires NodeJS 10+__

```
git clone https://github.com/p2kmgcl/page-editor-dev-server
cd page-editor-dev-server
npm install
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
- `--liferay-host=<host>`: Uses given Liferay host (defaults to `localhost:8080`)

[shame]: https://github.com/p2kmgcl/page-editor-dev-server/pull/10#issuecomment-638770818
