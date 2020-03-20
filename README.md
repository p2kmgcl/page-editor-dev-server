# Page Editor Dev Server

## Portal config

```
# Avoid checking CSRF
auth.token.check.enabled=false
```

## Steps

- `npm install`
- `npm link`
- Go to page editor directory
- `page-editor-dev-server`

## ToDo

- [x] Mock Liferay.Util.selectEntity
- [ ] Mock Liferay.Util.sub
- [ ] Mock AlloyEditor
- [ ] Fix toolbar padding (works fine in portal)
- [ ] Hot Reloading
