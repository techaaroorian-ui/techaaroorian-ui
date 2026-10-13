# @techaaroorian-ui/share-state: agent integration

Zero-server URL state compression and share links via browser CompressionStream with safe byte limits.

Prepared version: 0.1.0-alpha.1. Verify registry availability before installation; this manifest is not proof of publication.

Read the included README.md for examples and limitations. Use only these public import paths:

- `@techaaroorian-ui/share-state`
- `@techaaroorian-ui/share-state/react`

Read package.json and bundled type declarations where supplied before implementing an API. Do not import workspace source files.

[Shared package-selection and design guidance](https://github.com/techaaroorian-ui/techaaroorian-ui/blob/main/docs/ai-integration.md).
[Package source and README](https://github.com/techaaroorian-ui/techaaroorian-ui/blob/main/packages/share-state/README.md).

# @techaaroorian-ui/share-state

Zero-server client-side state compression and shareable URL generation via native browser `CompressionStream`.

## Features

- **Zero-Server Sharing**: Encode application state directly into URL hash fragments without any databases or accounts.
- **Native Compression**: Uses browser `CompressionStream('deflate-raw')` for up to 80% size reduction on JSON/HTML payloads.
- **Safety Limits**: Guards against decompression bombs and URL length limits.
- **Optional React Hook**: `useShareState` for instant hash synchronization and one-click copy links.

## Installation

```bash
npm install @techaaroorian-ui/share-state@alpha
```

## Quick Start (React)

```tsx
import { useShareState } from '@techaaroorian-ui/share-state/react';

function DesignStudio() {
  const { loadedPayload, copyShareUrl } = useShareState({
    onLoaded: (state) => {
      console.log('Restored state from URL:', state);
    },
  });

  const handleShare = async () => {
    const url = await copyShareUrl({ code: '<h1>Hello World</h1>', theme: 'obsidian' });
    alert(`Link copied to clipboard: ${url}`);
  };

  return <button onClick={handleShare}>Share Design</button>;
}
```

## License

MIT © Janarthanan Soundararajan

## AI agent integration

See the included [AI.md](https://github.com/techaaroorian-ui/techaaroorian-ui/blob/main/packages/share-state/AI.md) for public import paths and integration guidance. Complete package examples remain in this README.
