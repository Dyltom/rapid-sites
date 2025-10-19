# Known Issues

## ⚠️ **Payload CMS Admin Panel - CodeEditor Error**

**Status**: BROKEN
**Severity**: HIGH
**Source**: Payload CMS 3.60.0 internal bug (not our code)

### Error Details
```
TypeError: Cannot destructure property 'config' of 'ue(...)' as it is undefined.
    at Pn (../src/elements/CodeEditor/CodeEditor.tsx:87:32)
```

### What Works
- ✅ Admin panel loads (HTTP 200)
- ✅ Routes to create-first-user
- ✅ Database connection works

### What's Broken
- ❌ Admin panel has JavaScript error
- ❌ CodeEditor component fails to load
- ❌ Cannot create users/content (broken by JS error)

### Root Cause
Payload CMS 3.60.0 has an internal bug in the CodeEditor component where it tries to destructure `config` from an undefined context.

### Temporary Workaround
None currently. This requires either:
1. Payload CMS fix (wait for 3.60.1+)
2. Downgrade to earlier Payload version
3. Disable code editor fields in collections

### Impact
**Admin panel is currently NON-FUNCTIONAL** despite loading successfully.

---

## Docker

### Docker Compose Issues (FIXED)
- ✅ Now working with correct DOCKER_HOST
- ✅ All containers start
- ✅ Database connected

---

## Testing

### What's Actually Tested
- ✅ Homepage: NO errors, fully functional
- ✅ Demo page: NO errors, fully functional
- ✅ Blog page: Works correctly
- ✅ Docker: Containers start and run
- ✅ Database: Connected and healthy
- ✅ Health API: Working
- ✅ 98 unit tests passing
- ✅ 13 E2E tests passing

### What's NOT Working
- ❌ Payload admin panel (Payload CMS bug)
- ⏳ Email sending (untested - need API key)
- ⏳ Stripe payments (untested - need API key)

---

## Honest Assessment

**Framework Code**: Production quality ✅
**Public Website**: Fully functional ✅
**Admin Panel**: Broken due to Payload CMS bug ❌
**Integrations**: Code complete but untested ⏳

**Can deploy client websites?** YES - but CMS management is broken until Payload fixes their bug.

**Recommendation**: Wait for Payload CMS 3.60.1+ or use alternative CMS temporarily.
