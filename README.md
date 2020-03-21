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
- [x] Mock Liferay.Util.sub
- [x] Mock AlloyEditor
- [ ] Reload browser when session ends
- [ ] Use all portal styles (currently it's just Atlas)
- [ ] Fix toolbar padding (works fine in portal)
- [x] Hot Reloading
- [x] Show progress on build
- [ ] Add DLL building
