# 🧪 Professional PWA Testing Setup

## Problem: Button Not Showing?

If the install button disappeared, check these:

1. **Clear localStorage** (button dismissal is cached for 24h):
   - Open DevTools (F12) → Console
   - Run: `localStorage.removeItem('pwa_dismiss_until')`
   - Refresh page

2. **Hard refresh**: `Ctrl + Shift + R` (or `Cmd + Shift + R` on Mac)

---

## 📱 Professional Android Testing from Dev Environment

### Method 1: Network Access (Recommended for Quick Testing)

**Step 1: Expose Vite to Network**

```bash
npm run dev -- --host
```

**Step 2: Find Your IP Address**

```bash
# Windows (PowerShell)
ipconfig | findstr IPv4

# Output example: IPv4 Address. . . . . . . . . . . : 192.168.1.100
```

**Step 3: Access from Android**

- Connect phone to **same WiFi** as PC
- Open Chrome on Android
- Navigate to: `http://192.168.1.100:3001`
- ⚠️ **PWA features limited on HTTP** (no install prompt in production behavior)

---

### Method 2: Tunnel Services (HTTPS for Full PWA Testing)

#### Option A: Using Cloudflare Tunnel (Free, Recommended)

**Install Cloudflare Tunnel:**

```bash
npm install -g cloudflared
```

**Start Tunnel:**

```bash
# Terminal 1: Start dev server
npm run dev

# Terminal 2: Create tunnel
cloudflared tunnel --url http://localhost:3001
```

**Result:** You get a public HTTPS URL like `https://xxx.trycloudflare.com`

- ✅ Full HTTPS (required for PWA)
- ✅ Works on any device
- ✅ No configuration needed
- ⏱️ Temporary URL (changes each time)

#### Option B: Using Ngrok (Free Tier)

**Install:**

```bash
npm install -g ngrok
```

**Start:**

```bash
# Terminal 1: Dev server
npm run dev

# Terminal 2: Tunnel
ngrok http 3001
```

**Result:** `https://xxxx.ngrok-free.app`

- ✅ HTTPS enabled
- ✅ Persistent URLs (with account)
- ⚠️ Free tier has limits

#### Option C: Using Localtunnel (Simple, Free)

**Install:**

```bash
npm install -g localtunnel
```

**Start:**

```bash
# Terminal 1: Dev server
npm run dev

# Terminal 2: Tunnel
lt --port 3001
```

**Result:** `https://xxxx.loca.lt`

- ✅ Simple setup
- ✅ Free
- ⚠️ May require password on first visit

---

### Method 3: Chrome DevTools Device Emulation (Desktop Testing)

**Step 1: Open DevTools**

- Press `F12` or `Ctrl + Shift + I`

**Step 2: Enable Device Mode**

- Click device toggle icon (or press `Ctrl + Shift + M`)
- Select device: **Pixel 5**, **Galaxy S20**, etc.

**Step 3: Simulate PWA Install**

- DevTools → Application tab
- Click "Manifest" → Check manifest loads
- Click "Service Workers" → Verify registration

**Step 4: Test Install Prompt**

- In Console, run:

```javascript
// Manually trigger the install button to appear
localStorage.removeItem('pwa_dismiss_until');
location.reload();
```

**Limitations:**

- ❌ `beforeinstallprompt` doesn't fire in dev (requires HTTPS + proper PWA)
- ✅ Can test UI/UX
- ✅ Can test service worker
- ✅ Can test offline functionality

---

## 🚀 Recommended Workflow

### For Quick UI Testing:

1. Use **Chrome DevTools Device Emulation**
2. Clear localStorage to reset button state
3. Test button appearance and styling

### For Actual PWA Install Testing:

1. Build production version: `npm run build`
2. Use **Cloudflare Tunnel** to serve build folder:

```bash
# Serve the build folder
npx serve build -p 4173

# In another terminal
cloudflared tunnel --url http://localhost:4173
```

3. Access HTTPS URL on Android
4. Test actual PWA installation

### For Android-specific Features:

1. Use **Chrome Remote Debugging**:
   - Android: Enable USB Debugging in Developer Options
   - Connect phone via USB
   - Desktop Chrome: `chrome://inspect`
   - Click "Inspect" on your device
   - Full DevTools access to mobile browser!

---

## 🔧 Quick Test Script

Add this to your `package.json`:

```json
{
  "scripts": {
    "dev": "vite",
    "dev:host": "vite --host",
    "preview": "vite preview",
    "preview:host": "vite preview --host",
    "build": "tsc && vite build",
    "test:pwa": "npm run build && npx serve build -p 4173"
  }
}
```

**Usage:**

```bash
# Develop with network access
npm run dev:host

# Test PWA build locally
npm run test:pwa

# Then tunnel it
cloudflared tunnel --url http://localhost:4173
```

---

## 📊 Testing Checklist

### Desktop (localhost:3001)

- [ ] Install button appears (after clearing localStorage)
- [ ] Button has cyan color with black text
- [ ] Button click shows appropriate dialog
- [ ] Button disappears if dismissed
- [ ] Service worker registers (check DevTools → Application)

### Android Chrome (via Tunnel)

- [ ] Page loads over HTTPS
- [ ] Install button appears
- [ ] Native install prompt works (if `beforeinstallprompt` fires)
- [ ] Can add to home screen
- [ ] App launches in standalone mode
- [ ] Service worker active
- [ ] Offline functionality works

### iOS Safari (via Tunnel)

- [ ] Page loads over HTTPS
- [ ] Install button appears
- [ ] Shows iOS-specific instructions
- [ ] Can add to home screen via Share button
- [ ] App launches fullscreen
- [ ] Theme color applied

---

## 🐛 Troubleshooting

### Button Not Showing

```javascript
// Run in Console:
console.log(
  'Standalone?',
  window.matchMedia('(display-mode: standalone)').matches
);
console.log('Dismissed?', localStorage.getItem('pwa_dismiss_until'));
console.log('Time now:', Date.now());

// Force button to show:
localStorage.removeItem('pwa_dismiss_until');
location.reload();
```

### PWA Not Installing on Android

- ✅ Must be HTTPS (except localhost)
- ✅ Must have valid manifest
- ✅ Must have service worker
- ✅ User must engage with site (some browsers require multiple visits)

### Service Worker Not Registering

```javascript
// Check in Console:
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.getRegistrations().then((regs) => {
    console.log('Registered SWs:', regs.length);
  });
}
```

---

## 💡 Pro Tips

1. **Use HTTPS for real testing** - Many PWA features only work over HTTPS
2. **Chrome Remote Debugging** - Best way to debug actual mobile devices
3. **Clear cache often** - Service workers cache aggressively
4. **Test on real devices** - Emulators don't catch all issues
5. **Check PWA requirements**: https://web.dev/install-criteria/

---

## 🎯 Immediate Fix for Your Issue

Run this in your browser console:

```javascript
localStorage.clear();
location.reload();
```

This will reset the dismiss state and the button should reappear!
