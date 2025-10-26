# 🚀 Testing PWA in Production Mode

## ⚠️ Important: Why Dev Mode Doesn't Work

The PWA install prompt (`beforeinstallprompt` event) **ONLY fires in production** when:

- ✅ Served over HTTPS (or localhost)
- ✅ Has valid service worker
- ✅ Has valid manifest
- ✅ User has engaged with the site

**Dev mode limitations:**

- ❌ `beforeinstallprompt` event doesn't fire
- ❌ Button shows fallback instructions that don't work
- ❌ Can't test actual installation

---

## 📦 Proper Testing Steps

### Step 1: Build Production Version

Stop your dev server (Ctrl+C) and run:

```bash
npm run build
```

This creates an optimized production build in the `build/` folder with:

- Minified code
- Service worker properly registered
- PWA manifest included
- All assets cached

---

### Step 2: Serve Production Build Locally

```bash
npm run preview
```

This starts a production server at `http://localhost:4173`

**Test on PC:**

- Open `http://localhost:4173` in Chrome/Edge
- Console should show the install button logs
- Click button → **Native install dialog should appear!**

---

### Step 3: Tunnel for Mobile Testing

**Terminal 1:** Keep preview running

```bash
npm run preview
```

**Terminal 2:** Start Cloudflare tunnel

```bash
cloudflared tunnel --url http://localhost:4173
```

You'll get an HTTPS URL like: `https://xxx.trycloudflare.com`

---

### Step 4: Test on Android/iPhone

**Android Chrome:**

1. Open the tunnel URL: `https://xxx.trycloudflare.com`
2. Console logs should show:
   ```
   🔍 PWA Install: Starting detection...
   📱 Display mode: browser
   🏠 Is installed: false
   ✨ Showing install button
   🤖 Android install prompt event received  ← THIS IS KEY!
   ```
3. Click cyan button → **Native Android install prompt appears**
4. Accept → App installs to home screen
5. Launch from home → Opens in standalone mode (no browser chrome)

**iPhone Safari:**

1. Open tunnel URL
2. Console shows iOS detected
3. Click button → Shows iOS-specific instructions
4. Follow: Share → Add to Home Screen

---

## 🔍 Expected Console Output (Production)

### Desktop Chrome (Working):

```
🔍 PWA Install: Starting detection...
📱 Display mode: browser
🏠 Is installed: false
✨ Showing install button
🤖 Android install prompt event received    ← Important!
🍎 Is iOS: false
🌐 User Agent: Mozilla/5.0 (Windows...) Chrome/141...

[User clicks button]
🖱️ Install button clicked
🍎 Is iOS on click: false
📦 Has deferred prompt: true              ← Has prompt!
🚀 Triggering native install prompt       ← Direct install!
✅ User choice: accepted
🎉 PWA installed successfully
```

### Android (Working):

```
🔍 PWA Install: Starting detection...
✨ Showing install button
🤖 Android install prompt event received
[User clicks button]
🚀 Triggering native install prompt
[Native dialog appears]
```

### Current Dev Mode (Not Working):

```
📦 Has deferred prompt: false             ← No prompt!
📋 No native prompt, showing fallback     ← Fallback used
```

---

## 🎯 Quick Test Commands

```bash
# Full test workflow
npm run build && npm run preview

# In another terminal
cloudflared tunnel --url http://localhost:4173
```

Then test the HTTPS URL on your devices!

---

## ✅ Success Checklist

**Desktop:**

- [ ] Build completes without errors
- [ ] Preview server starts on port 4173
- [ ] Install button appears (cyan, black text)
- [ ] Console shows "Android install prompt event received"
- [ ] Click button → Native install dialog appears
- [ ] Can install as desktop app
- [ ] Launches in standalone mode
- [ ] Audio streams work

**Android:**

- [ ] Tunnel URL accessible
- [ ] Install button appears
- [ ] Native prompt triggers on button click
- [ ] Can install to home screen
- [ ] App icon shows correctly
- [ ] Launches standalone (no browser UI)
- [ ] Theme color applies (#03258C)
- [ ] Audio works

**iOS:**

- [ ] Install button appears
- [ ] Shows iOS instructions on click
- [ ] Can add via Share → Add to Home Screen
- [ ] Launches fullscreen
- [ ] Audio works

---

## 🐛 Troubleshooting

### "No deferred prompt" in production

- Clear browser cache: Ctrl+Shift+Del
- Close and reopen browser
- Make sure it's HTTPS (tunnel) not HTTP
- Try in Incognito mode

### Button still doesn't trigger install

- Check console for "Android install prompt event received"
- If missing, browser doesn't support or already installed
- Try different browser (Chrome, Edge, Samsung Internet)
- Make sure not in Incognito (some browsers block PWA in incognito)

### Service worker not registering

- Check DevTools → Application → Service Workers
- Look for errors in Console
- Try unregistering old workers: `Application → Service Workers → Unregister`

---

## 📝 Notes

- Cloudflare tunnel URL changes each restart
- Keep both terminals open while testing
- Production mode is required for `beforeinstallprompt`
- Dev mode useful for UI testing only
- Always test final build before deployment

---

## 🎉 Next: Deploy to Production

Once tested locally, deploy the `build/` folder to:

- **Vercel**: Auto PWA support
- **Netlify**: Drag & drop build folder
- **Cloudflare Pages**: Connect Git repo

All provide automatic HTTPS and PWA support!
