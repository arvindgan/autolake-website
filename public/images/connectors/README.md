# Connector Icons

This directory contains PNG images for data connector icons.

## Usage

To use a PNG icon instead of an emoji for a connector:

1. Place your PNG file in this directory (`public/images/connectors/`)
2. Update the connector object in `components/data-connectors.tsx` to include the `imageUrl` field:

```typescript
{
  name: "GraphQL",
  logo: "🔗", // fallback emoji
  category: "API",
  imageUrl: "/images/connectors/graphql-logo.png" // path to your PNG
}
```

## Icon Guidelines

- **Format**: PNG with transparent background preferred
- **Size**: 32x32px to 64x64px optimal (will be displayed at 32x32px)
- **Style**: Monochrome or with brand colors
- **File naming**: Use lowercase with hyphens (e.g., `graph-ql-logo.png`)

The system will automatically use the PNG image if `imageUrl` is provided, otherwise it falls back to the emoji in the `logo` field.
