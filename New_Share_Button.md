The navigation bar share button in the MiguelDiLalla/BAHIA_fm repository is a dropdown menu that allows users to share the Bahia FM website through six different platforms. The share button is visually represented as a button with a share icon and, when clicked, reveals the dropdown with multiple sharing options. Here’s a breakdown of its technical content and the actual links it uses:

### HTML Structure

The share button and its dropdown are defined in `index.html`:

- The share button itself:

  ```html
  <div class="share-container">
    <button id="share-btn" class="social-link share-btn" aria-label="Share">
      <!-- share icon SVG -->
    </button>
    <div id="share-dropdown" class="share-dropdown">
      <!-- Share options here -->
    </div>
  </div>
  ```

- The dropdown contains the following share options (each as an anchor element with `data-share` attributes):
  ```html
  <a href="#" class="share-option" data-share="whatsapp"
    >...<span>WhatsApp</span></a
  >
  <a href="#" class="share-option" data-share="twitter"
    >...<span>Twitter</span></a
  >
  <a href="#" class="share-option" data-share="telegram"
    >...<span>Telegram</span></a
  >
  <a href="#" class="share-option" data-share="email">...<span>Email</span></a>
  <a href="#" class="share-option" data-share="copy"
    >...<span>Copy Link</span></a
  >
  <a href="#" class="share-option" data-share="instagram"
    >...<span>Instagram</span></a
  >
  ```

### Actual Share Links and Behavior

The JavaScript in `app.js` handles the click events for each share option, dynamically building the actual share URLs using the current page URL, a title, and a description. Here are the links for each platform:

1. **WhatsApp**:
   Opens WhatsApp with a pre-filled text and URL:

   ```
   https://wa.me/?text={description} {url}
   ```

2. **Twitter**:
   Opens Twitter’s tweet composer with text and URL:

   ```
   https://twitter.com/intent/tweet?text={description}&url={url}
   ```

3. **Telegram**:
   Opens Telegram’s share page with text and URL:

   ```
   https://t.me/share/url?url={url}&text={description}
   ```

4. **Email**:
   Opens default email client with a pre-filled subject and body:

   ```
   mailto:?subject={title}&body={description}\n\n{url}
   ```

5. **Copy Link**:
   Copies the current page URL to the clipboard and gives user feedback.

6. **Instagram**:
   Since Instagram doesn’t support direct URL sharing, it just copies the link to the clipboard and prompts the user to paste it manually in Instagram.

### Additional Features

- The dropdown is mobile-responsive, styled for touch, and supports accessibility (keyboard navigation, Escape key, and click-outside-to-close).
- Each share action triggers analytics events for tracking.
- The share button and dropdown are styled for visibility and theme compatibility.

### References

- [index.html - Share button UI](https://github.com/MiguelDiLalla/BAHIA_fm/blob/f537566b0935f3e4e004cb923f4882d7eaca39ba/index.html#L79-L121)
- [app.js - Share logic](https://github.com/MiguelDiLalla/BAHIA_fm/blob/f537566b0935f3e4e004cb923f4882d7eaca39ba/app.js#L970-L1043)
- [README.md - Share Functionality documentation](https://github.com/MiguelDiLalla/BAHIA_fm/blob/f537566b0935f3e4e004cb923f4882d7eaca39ba/README.md#L449-L497)

In summary, the nav bar share button provides a modern, multi-platform sharing interface, with all share links dynamically generated based on the current page and station branding.
