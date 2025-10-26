# 🔧 PWA Testing Guide - Bahia Surfers Radio

## ✅ What Was Implemented

Professional PWA support using `vite-plugin-pwa` with:

- ✅ Auto-generated service worker with Workbox
- ✅ Optimized caching strategies
- ✅ Web App Manifest with proper icons
- ✅ Apple iOS support (meta tags + touch icons)
- ✅ Android Chrome install support
- ✅ Automatic updates
- ✅ Offline fallback (UI only, stream requires network)
- ✅ Custom install prompts (Android + iOS)

---

## 📱 Testing on Different Platforms

### 1️⃣ **PC (Windows/Mac/Linux)**

#### Chrome/Edge (Chromium-based)

1. **Build and preview:**

   ```bash
   npm run build
   npm run preview
   ```

2. **Open:** http://localhost:4173/

3. **Test PWA installation:**
   - Look for install icon in address bar (right side)
   - Or: Menu → Install Bahia Surfers Radio
   - Or: Wait 10 seconds for custom install prompt

4. **Verify in DevTools:**
   - Press F12
   - Go to **Application** tab
   - Check:
     - ✅ **Manifest** section shows proper config
     - ✅ **Service Workers** shows active worker
     - ✅ **Cache Storage** shows cached assets

5. **Test offline:**
   - In DevTools, go to **Network** tab
   - Check "Offline" checkbox
   - Reload page → UI should load (stream won't work)

#### Firefox

- PWA support is limited on desktop Firefox
- Will work as normal web app
- Install prompt won't appear

#### Safari (Mac)

- Limited PWA support on desktop
- Will work as web app
- Can add to Dock manually

---

### 2️⃣ **Android (Chrome/Edge)**

#### Local Testing via Tunnel

Since localhost isn't accessible from phone, use one of these methods:

**Method A: Using Vite with --host flag**

1. Build: `npm run build`
2. Preview with network access:
   ```bash
   npx vite preview --host
   ```
3. Look for "Network:" URL (e.g., `http://192.168.1.100:4173`)
4. Open that URL on your Android phone (same WiFi)

**Method B: Deploy to production**

- Deploy to Vercel/Netlify/Cloudflare Pages
- Access via HTTPS (required for PWA)

#### Testing Steps:

1. **Open in Chrome:**
   - Navigate to your URL
   - Wait 10 seconds → Custom Android install prompt appears
   - Or: Menu (⋮) → "Install app" / "Add to Home screen"

2. **Verify installation:**
   - Check home screen for "Bahia FM" icon
   - Launch app → Opens in standalone mode (no browser UI)
   - Status bar color matches theme (#03258C)

3. **Test features:**
   - ✅ Play/pause radio stream
   - ✅ Volume control
   - ✅ Mini player when scrolling
   - ✅ App continues in background when switching apps
   - ✅ Notification controls (if browser supports)

4. **Test offline:**
   - Enable Airplane mode
   - Open app → UI loads, stream unavailable message

---

### 3️⃣ **iPhone/iPad (Safari)**

#### Local Testing via Tunnel

Same as Android - use network URL or deploy.

#### Testing Steps:

1. **Open in Safari:**
   - Navigate to your URL (must be HTTPS in production)
   - Wait 10 seconds → Custom iOS install prompt appears with instructions

2. **Manual installation:**
   - Tap **Share** button (□↑)
   - Scroll down → "Add to Home Screen"
   - Tap "Add"
   - Icon appears on home screen

3. **Verify installation:**
   - Launch "Bahia FM" from home screen
   - Opens in fullscreen (no Safari UI)
   - Status bar shows theme color

4. **Test features:**
   - ✅ All app features work
   - ✅ Plays audio in background
   - ✅ Control from Control Center
   - ⚠️ iOS has stricter audio policies - may pause on lock screen

5. **iOS-specific notes:**
   - PWA apps can be deleted like native apps
   - Must be HTTPS for full PWA features
   - `localhost` testing limited on iOS

---

## 🧪 Complete Testing Checklist

### Installation

- [ ] Install prompt appears automatically after 10 seconds
- [ ] Install prompt can be dismissed and respects 24hr timeout
- [ ] Manual install works (browser menu)
- [ ] Icon appears on home screen/desktop
- [ ] App launches in standalone mode

### Functionality

- [ ] Radio stream plays correctly
- [ ] Play/pause button works
- [ ] Volume control functional
- [ ] Mini player appears on scroll
- [ ] Social links open correctly
- [ ] Scrolling messages animate properly

### PWA Features

- [ ] Service worker registers successfully
- [ ] Assets are cached (check DevTools)
- [ ] App works offline (UI only)
- [ ] Updates automatically on new deployment
- [ ] Theme color shows in task switcher
- [ ] App icon displays correctly

### Cross-Platform

- [ ] PC: Windows/Mac/Linux browsers
- [ ] Android: Chrome, Edge, Samsung Internet
- [ ] iOS: Safari (iPhone & iPad)

---

## 🔍 DevTools Inspection

### Check Manifest (Chrome DevTools):

1. F12 → Application → Manifest
2. Verify:
   ```
   Name: Bahia Surfers Radio - Radio Musical
   Short name: Bahia FM
   Start URL: /
   Display: standalone
   Theme color: #03258C
   Icons: icon.png (512x512, any + maskable)
   ```

### Check Service Worker:

1. F12 → Application → Service Workers
2. Should show:
   - Status: **activated and running**
   - Source: /sw.js
   - Update on reload: [optional]

### Check Cache:

1. F12 → Application → Cache Storage
2. Should see caches:
   - `workbox-precache-v2-...` (app assets)
   - `google-fonts-cache` (if fonts loaded)

### Network Tab:

1. F12 → Network
2. Reload page
3. Look for **(ServiceWorker)** in Size column
   - Means assets served from cache

---

## 📦 Deployment Notes

### For Production:

1. **Build:** `npm run build`
2. **Deploy** `build/` folder to:
   - Vercel: `vercel deploy`
   - Netlify: Drag & drop `build/` folder
   - Cloudflare Pages: Connect Git repo

### Required:

- ✅ **HTTPS** (mandatory for PWA features)
- ✅ All files in `build/` folder deployed
- ✅ Correct MIME types (handled by most hosts)

### PWA Update Strategy:

- Plugin uses `autoUpdate` mode
- New deployments automatically update on next visit
- No user action needed
- Can implement update toast notification if desired

---

## 🐛 Troubleshooting

### "Add to Home Screen" doesn't appear (Android)

- Ensure site is HTTPS
- Wait 10 seconds for custom prompt
- Check engagement heuristics (visit site multiple times)
- Clear browser cache and retry

### Service Worker not registering

- Check browser console for errors
- Verify HTTPS (required except localhost)
- Hard refresh: Ctrl+Shift+R / Cmd+Shift+R
- Check: DevTools → Application → Service Workers → "Update on reload"

### Icons not showing

- Verify `/icon.png` exists in build output
- Check manifest.webmanifest has correct icon paths
- Clear app data and reinstall
- Icon must be at least 192x192px

### iOS: "Add to Home Screen" missing

- Must use Safari (not Chrome/Firefox on iOS)
- Some iOS versions hide the option - use custom prompt
- Share button → scroll down to find option

### Audio stops on iOS lock screen

- iOS limitation with media playback
- Consider implementing background audio API
- May require MediaSession API implementation

### App not updating

- Check if old service worker is stuck
- DevTools → Application → Service Workers → "Unregister"
- Clear site data and reload
- Check for console errors

---

## 📚 Additional Resources

- **Vite PWA Plugin Docs:** https://vite-pwa-org.netlify.app/
- **Workbox Docs:** https://developer.chrome.com/docs/workbox/
- **Web App Manifest:** https://developer.mozilla.org/en-US/docs/Web/Manifest
- **PWA on iOS:** https://webkit.org/blog/7929/designing-websites-for-iphone-x/

---

## ✨ Next Steps (Optional Enhancements)

1. **Update Notifications:**
   - Add toast when new version available
   - "New update available! Refresh to update"

2. **Background Audio:**
   - Implement MediaSession API
   - Control from lock screen/notification center

3. **Better Icons:**
   - Generate proper icon sizes (192, 256, 384, 512)
   - Create maskable icon with safe zone
   - Use PWA asset generator

4. **Offline Page:**
   - Custom "You're offline" page
   - Cache essential content for offline viewing

5. **Analytics:**
   - Track PWA install rate
   - Monitor service worker errors
   - Measure offline usage

---

**Current Status:** ✅ **PWA Fully Functional**
Ready for testing on PC, Android, and iPhone!
