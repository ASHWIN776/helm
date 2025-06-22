## helm

Steer your finances with AI

Built with [Expo](https://expo.dev).

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
    npx expo start
   ```

## Development Builds

- More info [here](https://kadikraman.github.io/intermediate-react-native-v2-course/docs/development-builds/)
- Official Docs [here](https://docs.expo.dev/develop/development-builds/create-a-build/)

### Prebuild

This will create a native app for the specified platform.

```bash
npx expo prebuild --platform ios
npx expo prebuild --platform android
```

### Build your native app

```bash
npx expo run:ios
npx expo run:android
```

## EAS 

### Install eas-cli

```bash
npm install -g eas-cli
eas whoami
```

### Configure EAS

```bash
eas init
eas build:configure
```

### Build

```bash
eas build --profile development --platform ios|android
```




