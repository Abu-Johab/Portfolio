# Certificate Images Folder

Place all your certificate images (.png, .jpg, .webp, etc.) inside this directory:
`project/public/certificates/`

### Example:
If you save an image named `unssc.png` here:
`project/public/certificates/unssc.png`

You can link it directly in `src/data/portfolio.ts` like this:
```typescript
{
  name: 'Effective Data Sharing for Sustainable Development',
  issuer: 'UNSSC & UNEP',
  year: 'Sep 2026',
  image: '/certificates/unssc.png', // Path starts with /certificates/
  ...
}
```
