# Known Issues

## ⚠️ **Payload CMS Admin Panel - BROKEN**

**Status**: ❌ **NON-FUNCTIONAL**
**Severity**: **CRITICAL - BLOCKS CONTENT MANAGEMENT**
**Source**: Payload CMS 3.60.0 internal bug (not our code)

### The Truth
**The admin panel is BROKEN and cannot be used.**

Despite returning HTTP 200, the admin UI has a JavaScript error that breaks functionality.

### Error Details
```
TypeError: Cannot destructure property 'config' of 'ue(...)' as it is undefined.
Location: node_modules/@payloadcms/.../CodeEditor.tsx:87:32
Frequency: Every admin page load
```

### What Actually Works
- ✅ Admin pages return HTTP 200
- ✅ Database connection successful
- ✅ Schema pulled from database
- ✅ Routes exist (/admin, /admin/login, /admin/create-first-user)

### What's Broken (The Reality)
- ❌ **JavaScript error breaks the UI**
- ❌ **Cannot create users** (UI broken)
- ❌ **Cannot manage content** (UI broken)
- ❌ **CodeEditor component fails** (Payload's code)
- ❌ **Admin panel unusable** despite loading

### Root Cause
**Payload CMS 3.60.0 has a bug** in their CodeEditor React component. The component tries to access `config` from a React context that returns `undefined`.

**This is NOT our configuration** - it's in Payload's bundled code:
- File: `node_modules/@payloadcms/.../CodeEditor.tsx`
- Line 87: `rest.onChange?.(value, ev)`
- Issue: `ue()` hook returns `undefined` instead of config object

### Impact
🚨 **CRITICAL**: Cannot use CMS for content management
- No user creation possible
- No content editing possible
- No media uploads possible
- Admin panel exists but is broken

### Solutions
**Option 1: Wait for Payload Fix**
- Monitor: https://github.com/payloadcms/payload/issues
- Wait for version 3.60.1+ or 3.61.0

**Option 2: Downgrade Payload** (Risky)
- Try Payload 3.5x versions
- May have breaking changes
- Would need testing

**Option 3: Use Alternative** (Recommended for now)
- Consider Sanity, Strapi, or Contentful temporarily
- Or manage content via direct database access
- Or wait for Payload fix

### Current Recommendation
**DO NOT deploy for clients yet** - admin panel is broken.
- Public website works perfectly ✅
- But cannot manage content ❌
- Wait for Payload CMS bug fix before production use

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
