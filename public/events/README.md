# Event & Activity Photos Folder

Place all your workshop, volunteering, seminar, and event photos (.jpg, .png, .webp) in this directory:
`project/public/events/`

### Example filenames:
- `workshop_host.png`
- `iccit_volunteer.png`
- `badhan_event.png`

### Linking in `src/data/portfolio.ts`:
```typescript
{
  title: 'Technical Workshop Hosting',
  role: 'Workshop Host',
  organization: 'Department of CSE, PUST',
  period: '2025',
  image: '/events/workshop_host.png', // Path starts with /events/
  description: '...'
}
```
