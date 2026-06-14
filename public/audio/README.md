# Engine sound clips

Drop start-up + rev recordings here (MP3 or MP4 audio both work). The site
looks for these exact filenames (seeded in `lib/seed-data.ts`, or set
`engine_sound_url` per vehicle in Supabase):

- `1958-mercedes-benz-190sl-engine.mp4` ✓ (added)
- `1963-porsche-356-cabriolet-engine.mp3`
- `1988-porsche-911-turbo-coupe-930-engine.mp3`
- `2023-porsche-718-cayman-gt4-rs-engine.mp3`
- `2024-porsche-911-turbo-s-engine.mp3`
- `2015-ferrari-458-spider-engine.mp3`

Until a file exists, the player on that vehicle's page shows
"Recording coming soon".
