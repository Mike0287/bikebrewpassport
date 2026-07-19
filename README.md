# Bike + Brew Passport Companion

An interactive map for finding and tracking Bike + Brew Passport venues.

## Run on your computer

```powershell
npm run dev
```

Open the `Local` address printed in the terminal.

## Test on your phone

1. Connect the phone and computer to the same Wi-Fi network.
2. Run `npm run dev` in this project folder.
3. Open the `Network` address printed in the terminal on your phone. It will look similar to `http://192.168.1.25:5173`.
4. If Windows asks whether to allow access through the firewall, allow it for private networks.

This is intended for layout and map testing. Phone browsers normally require HTTPS before they allow live GPS location, so the "Find nearest café" feature will be enabled when the app is published as a secure website/PWA.

## Build a production version

```powershell
npm run build
```

This produces a deployable website in `dist/`.
