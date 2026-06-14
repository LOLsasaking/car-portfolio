-- The Lara Collection — seed data
-- Mirrors lib/seed-data.ts. Adjust video/image URLs after uploading media
-- to Cloudinary (the /videos/... paths below are served from /public).

insert into public.brands (slug, name, full_name, logo_url, tagline, description) values
  ('mercedes', 'Mercedes-Benz', 'Mercedes-Benz', '/images/brands/mercedes.png', 'Das Beste oder nichts',
   'From the hand-built elegance of the 190SL to the Pagoda era and the long reign of the R107.'),
  ('porsche', 'Porsche', 'Dr. Ing. h.c. F. Porsche AG', '/images/brands/porsche.png', 'There is no substitute',
   'Sixty years of Porsche engineering — from the air-cooled 356 to the GT4 RS and Turbo S.'),
  ('ferrari', 'Ferrari', 'Ferrari S.p.A.', '/images/brands/ferrari.png', 'We are the competition',
   'Maranello''s final naturally-aspirated V8 spider.')
on conflict (slug) do nothing;

insert into public.vehicles
  (id, slug, brand, year, make, model, chassis_code, vin, color, interior_color, mileage,
   current_owner, purchase_date, purchase_price, estimated_value, num_owners, title_status,
   carfax_status, location, story, rotating_video_url, hero_image_url, featured, featured_order,
   engine, transmission, horsepower, torque, drivetrain, top_speed, zero_to_sixty, fuel_type,
   body_style, production_numbers, market_value)
values
  ('10000000-0000-4000-a000-000000000001', '1958-mercedes-benz-190sl', 'mercedes', 1958,
   'Mercedes-Benz', '190SL', 'W121', '121040-10-85XXXXX', 'Silver Grey Metallic', 'Red Leather', 68420,
   'The Lara Collection', '2012-06-14', 92000, 165000, 4, 'Clean',
   'Pre-Carfax Era — Documented History', 'Private Climate-Controlled Facility',
   E'The 190SL is where this collection begins — chronologically and spiritually. Unveiled at the 1954 New York Auto Show beside its racing sibling, the 300SL, the 190SL offered the same long-hood elegance with a temperament built for the boulevard rather than the Mille Miglia.\n\nThis 1958 example left the Sindelfingen works in Silver Grey over red leather, a combination that has never been changed. A four-year, photo-documented restoration was completed before it joined the collection in 2012.',
   '/videos/1958-mercedes-benz-190sl-rotating.mp4', null, true, 1,
   '1.9L M121 Inline-4', '4-Speed Manual', 104, '105 lb-ft', 'RWD', '106 mph', '13.5 s',
   'Gasoline', 'Roadster', '25,881 (1955–1963)', '$140,000 – $190,000'),

  ('10000000-0000-4000-a000-000000000002', '1965-mercedes-benz-230sl', 'mercedes', 1965,
   'Mercedes-Benz', '230SL', 'W113', '113042-10-01XXXXX', 'White (DB 050)', 'Cognac MB-Tex', 81250,
   'The Lara Collection', '2015-03-20', 58000, 95000, 5, 'Clean',
   'Pre-Carfax Era — Documented History', 'Private Climate-Controlled Facility',
   E'Paul Bracq''s "Pagoda" roof made the W113 an instant icon. The 230SL was the first of the line, and many collectors still consider it the purest.\n\nThis 1965 car is a matching-numbers example in white over cognac, fitted with both its soft top and the original pagoda hardtop.',
   null, null, false, null,
   '2.3L M127 Inline-6', '4-Speed Manual', 148, '145 lb-ft', 'RWD', '124 mph', '9.7 s',
   'Gasoline', 'Roadster', '19,831 (1963–1967)', '$80,000 – $110,000'),

  ('10000000-0000-4000-a000-000000000003', '1966-mercedes-benz-230sl', 'mercedes', 1966,
   'Mercedes-Benz', '230SL', 'W113', '113042-10-02XXXXX', 'Anthracite Grey', 'Black Leather', 73900,
   'The Lara Collection', '2017-09-08', 64000, 98000, 3, 'Clean',
   'Pre-Carfax Era — Documented History', 'Private Climate-Controlled Facility',
   E'A second Pagoda — because one was never going to be enough. This 1966 230SL in Anthracite over black is an unrestored, three-owner car wearing much of its original paint.\n\nThe car retains its original data card, books, and tool roll. It is preserved rather than restored.',
   null, null, false, null,
   '2.3L M127 Inline-6', '4-Speed Automatic', 148, '145 lb-ft', 'RWD', '121 mph', '10.2 s',
   'Gasoline', 'Roadster', '19,831 (1963–1967)', '$85,000 – $115,000'),

  ('10000000-0000-4000-a000-000000000004', '1967-mercedes-benz-250sl', 'mercedes', 1967,
   'Mercedes-Benz', '250SL', 'W113', '113043-10-00XXXXX', 'Tobacco Brown', 'Parchment Leather', 88700,
   'The Lara Collection', '2018-11-02', 71000, 105000, 4, 'Clean',
   'Pre-Carfax Era — Documented History', 'Private Climate-Controlled Facility',
   E'The 250SL is the rarest of the Pagodas — a single-year model built only for 1967. It paired the 230SL''s revvy character with a larger 2.5-litre six and four-wheel disc brakes.\n\nOnly 5,196 were built. This one is a European-delivery car in unusual Tobacco Brown over parchment.',
   null, null, false, null,
   '2.5L M129 Inline-6', '4-Speed Manual', 150, '159 lb-ft', 'RWD', '121 mph', '9.5 s',
   'Gasoline', 'Roadster', '5,196 (1966–1968)', '$90,000 – $125,000'),

  ('10000000-0000-4000-a000-000000000005', '1969-mercedes-benz-280sl', 'mercedes', 1969,
   'Mercedes-Benz', '280SL', 'W113', '113044-10-01XXXXX', 'Midnight Blue', 'Grey Leather', 64300,
   'The Lara Collection', '2014-05-17', 86000, 135000, 4, 'Clean',
   'Pre-Carfax Era — Documented History', 'Private Climate-Controlled Facility',
   E'The 280SL is the Pagoda fully realized — the 2.8-litre M130 six gave the W113 the torque its elegance always promised.\n\nThis Midnight Blue example completes the collection''s Pagoda set: every engine displacement of the W113 line under one roof.',
   null, null, false, null,
   '2.8L M130 Inline-6', '4-Speed Automatic', 168, '177 lb-ft', 'RWD', '124 mph', '9.3 s',
   'Gasoline', 'Roadster', '23,885 (1967–1971)', '$110,000 – $160,000'),

  ('10000000-0000-4000-a000-000000000006', '1970-mercedes-benz-280slc', 'mercedes', 1970,
   'Mercedes-Benz', '280SLC', 'W113', '113044-12-00XXXXX', 'Dark Olive', 'Cognac Leather', 91100,
   'The Lara Collection', '2019-07-25', 67000, 96000, 5, 'Clean',
   'Pre-Carfax Era — Documented History', 'Private Climate-Controlled Facility',
   E'An unusual car with an unusual designation — this 1970 280SLC is a late-production W113 delivered in the rare "California Coupe" configuration: hardtop fitted, soft top deleted, and a fold-down rear bench in its place.\n\nDark Olive over cognac is a combination rarely seen on the Pagoda.',
   null, null, false, null,
   '2.8L M130 Inline-6', '4-Speed Automatic', 168, '177 lb-ft', 'RWD', '124 mph', '9.6 s',
   'Gasoline', 'Coupe', 'Limited California Coupe production', '$85,000 – $115,000'),

  ('10000000-0000-4000-a000-000000000007', '1978-mercedes-benz-450sl', 'mercedes', 1978,
   'Mercedes-Benz', '450SL', 'R107', '10704412XXXXXX', 'Icon Gold', 'Bamboo MB-Tex', 102400,
   'The Lara Collection', '2016-02-11', 18500, 38000, 3, 'Clean',
   'Clean — No Accidents Reported', 'Private Climate-Controlled Facility',
   E'The R107 ran for eighteen years — the longest-serving SL of all — and the 450SL was its 1970s heart.\n\nThis Icon Gold car is a two-family example from Arizona with original paint on most panels.',
   null, null, false, null,
   '4.5L M117 V8', '3-Speed Automatic', 180, '220 lb-ft', 'RWD', '124 mph', '10.5 s',
   'Gasoline', 'Roadster', '66,298 (1971–1980)', '$30,000 – $48,000'),

  ('10000000-0000-4000-a000-000000000008', '1987-mercedes-benz-560sl', 'mercedes', 1987,
   'Mercedes-Benz', '560SL', 'R107', 'WDBBA48D8HAXXXXXX', 'Signal Red', 'Palomino Leather', 58900,
   'The Lara Collection', '2013-10-30', 27000, 62000, 2, 'Clean',
   'Clean — No Accidents Reported', 'Private Climate-Controlled Facility',
   E'The 560SL was the R107''s send-off — the most powerful, most refined version of a car that had been on sale for fifteen years.\n\nThis Signal Red over Palomino example is a two-owner car with books, both tops, and a complete service file from new.',
   null, null, false, null,
   '5.5L M117 V8', '4-Speed Automatic', 227, '279 lb-ft', 'RWD', '137 mph', '7.5 s',
   'Gasoline', 'Roadster', '49,347 (1986–1989)', '$45,000 – $75,000'),

  ('10000000-0000-4000-a000-000000000009', '2011-mercedes-benz-glk350', 'mercedes', 2011,
   'Mercedes-Benz', 'GLK350', 'X204', 'WDCGG8HB7AFXXXXXX', 'Steel Grey Metallic', 'Black MB-Tex', 87600,
   'The Lara Collection', '2011-04-09', 41000, 14000, 1, 'Clean',
   'Clean — One Owner', 'Private Climate-Controlled Facility',
   E'Every collection needs a workhorse. The GLK350 was bought new in 2011 and has served as the collection''s support vehicle ever since.\n\nOne owner from new, every service on schedule.',
   null, null, false, null,
   '3.5L M272 V6', '7-Speed Automatic', 268, '258 lb-ft', '4MATIC AWD', '130 mph (limited)', '6.5 s',
   'Gasoline', 'SUV', 'Series production', '$10,000 – $16,000'),

  ('10000000-0000-4000-a000-000000000010', '1963-porsche-356-cabriolet', 'porsche', 1963,
   'Porsche', '356 Cabriolet', '356B T6', '15XXXX', 'Slate Grey', 'Red Leather', 74200,
   'The Lara Collection', '2010-08-21', 105000, 185000, 5, 'Clean',
   'Pre-Carfax Era — Kardex Documented', 'Private Climate-Controlled Facility',
   E'Before the 911, there was this — the car that made Porsche, Porsche.\n\nThis 1963 356B is a Super 90 Cabriolet in Slate Grey over red, with its Kardex confirming matching numbers. It was the first Porsche acquired by the collection.',
   null, null, true, 2,
   '1.6L Air-Cooled Flat-4 (Super 90)', '4-Speed Manual', 90, '89 lb-ft', 'RWD', '110 mph', '12.7 s',
   'Gasoline', 'Cabriolet', 'Approx. 76,300 (all 356, 1948–1965)', '$160,000 – $220,000'),

  ('10000000-0000-4000-a000-000000000011', '1988-porsche-911-turbo-coupe-930', 'porsche', 1988,
   'Porsche', '911 Turbo Coupe (930)', '930', 'WP0JB0939JS05XXXX', 'Grand Prix White', 'Black Leather', 41700,
   'The Lara Collection', '2014-09-12', 98000, 175000, 3, 'Clean',
   'Clean — No Accidents Reported', 'Private Climate-Controlled Facility',
   E'The Widowmaker. The 930 earned its reputation honestly — 282 turbocharged horsepower, a four-speed gearbox, and all of the engine hung behind the rear axle.\n\nThis 1988 coupe in Grand Prix White is a three-owner, accident-free car with the factory limited-slip differential.',
   null, null, true, 3,
   '3.3L Turbocharged Flat-6', '4-Speed Manual', 282, '278 lb-ft', 'RWD', '161 mph', '5.0 s',
   'Gasoline', 'Coupe', 'Approx. 21,589 (930, 1975–1989)', '$150,000 – $200,000'),

  ('10000000-0000-4000-a000-000000000012', '1997-porsche-911-turbo-coupe', 'porsche', 1997,
   'Porsche', '911 Turbo Coupe', '993', 'WP0AC2999VS37XXXX', 'Arena Red Metallic', 'Black Leather', 36800,
   'The Lara Collection', '2016-11-19', 145000, 265000, 4, 'Clean',
   'Clean — No Accidents Reported', 'Private Climate-Controlled Facility',
   E'The last air-cooled Turbo — and for many, the greatest 911 of them all. The 993 Turbo introduced twin turbochargers and all-wheel drive.\n\nThis Arena Red 1997 coupe is a low-mileage example with full service history.',
   null, null, false, null,
   '3.6L Twin-Turbo Flat-6', '6-Speed Manual', 402, '398 lb-ft', 'AWD', '180 mph', '3.7 s',
   'Gasoline', 'Coupe', 'Approx. 5,978 (993 Turbo)', '$230,000 – $300,000'),

  ('10000000-0000-4000-a000-000000000013', '2016-porsche-macan-turbo', 'porsche', 2016,
   'Porsche', 'Macan Turbo', '95B', 'WP1AF2A5XGLB9XXXX', 'Jet Black Metallic', 'Black/Garnet Red Leather', 52300,
   'The Lara Collection', '2016-01-15', 84000, 42000, 1, 'Clean',
   'Clean — One Owner', 'Private Climate-Controlled Facility',
   E'The daily. Bought new in 2016, the Macan Turbo proved that Porsche could build a family car that still felt like a Porsche.\n\nOne owner, full Porsche dealer history. Mile for mile, perhaps the collection''s most loved car.',
   null, null, false, null,
   '3.6L Twin-Turbo V6', '7-Speed PDK', 400, '406 lb-ft', 'AWD', '165 mph', '4.4 s',
   'Gasoline', 'SUV', 'Series production', '$35,000 – $48,000'),

  ('10000000-0000-4000-a000-000000000014', '2022-porsche-911-targa-4-gts', 'porsche', 2022,
   'Porsche', '911 Targa 4 GTS', '992', 'WP0BB2A93NS23XXXX', 'GT Silver Metallic', 'Black/Mojave Beige', 8900,
   'The Lara Collection', '2022-03-04', 162000, 178000, 1, 'Clean',
   'Clean — One Owner', 'Private Climate-Controlled Facility',
   E'The Targa is the 911 at its most romantic — the signature hoop a direct line back to 1965.\n\nOrdered new in GT Silver, this car bridges the collection''s classic and modern eras.',
   null, null, false, null,
   '3.0L Twin-Turbo Flat-6', '8-Speed PDK', 473, '420 lb-ft', 'AWD', '190 mph', '3.4 s',
   'Gasoline', 'Targa', 'Series production', '$165,000 – $195,000'),

  ('10000000-0000-4000-a000-000000000015', '2023-porsche-718-cayman-gt4-rs', 'porsche', 2023,
   'Porsche', '718 Cayman GT4 RS', '982', 'WP0AE2A85PK27XXXX', 'Arctic Grey', 'Black/Race-Tex', 3400,
   'The Lara Collection', '2023-05-26', 198000, 215000, 1, 'Clean',
   'Clean — One Owner', 'Private Climate-Controlled Facility',
   E'The GT4 RS is the car Porsche''s GT division was never supposed to build — the 911 GT3''s 9,000 rpm flat-six dropped into the mid-engined Cayman.\n\nThis Arctic Grey example wears the Weissach Package and magnesium wheels. Nothing else anywhere sounds like it.',
   null, null, false, null,
   '4.0L Naturally-Aspirated Flat-6', '7-Speed PDK', 493, '331 lb-ft', 'RWD', '196 mph', '3.2 s',
   'Gasoline', 'Coupe', 'Limited production', '$195,000 – $235,000'),

  ('10000000-0000-4000-a000-000000000016', '2024-porsche-911-turbo-s', 'porsche', 2024,
   'Porsche', '911 Turbo S', '992', 'WP0AD2A91RS25XXXX', 'Jet Black Metallic', 'Black/Bordeaux Red', 1850,
   'The Lara Collection', '2024-02-16', 246000, 252000, 1, 'Clean',
   'Clean — One Owner', 'Private Climate-Controlled Facility',
   E'Thirty-six years separate this car from the collection''s 930 — and the lineage is unbroken.\n\n640 horsepower, 2.6 seconds to sixty. It is the newest car in the collection and its chronological bookend — the "new" in a story that runs from 1958 to 2024.',
   '/videos/2024-porsche-911-turbo-s-rotating.mp4', null, true, 4,
   '3.7L Twin-Turbo Flat-6', '8-Speed PDK', 640, '590 lb-ft', 'AWD', '205 mph', '2.6 s',
   'Gasoline', 'Coupe', 'Series production', '$235,000 – $265,000'),

  ('10000000-0000-4000-a000-000000000017', '2015-ferrari-458-spider', 'ferrari', 2015,
   'Ferrari', '458 Spider', 'F142', 'ZFF68NHA3F020XXXX', 'Rosso Corsa', 'Crema Leather', 11200,
   'The Lara Collection', '2018-04-13', 235000, 310000, 2, 'Clean',
   'Clean — No Accidents Reported', 'Private Climate-Controlled Facility',
   E'The 458 Spider is the end of an era — the last mid-engined Ferrari V8 to breathe without turbochargers. Its 4.5-litre engine spins to 9,000 rpm with a sound no successor has matched.\n\nThis Rosso Corsa over Crema example is a two-owner car with full Ferrari Classiche eligibility. The only Ferrari in the collection — and the collection believes the right Ferrari needs no company.',
   null, null, true, 5,
   '4.5L Naturally-Aspirated V8', '7-Speed Dual-Clutch', 562, '398 lb-ft', 'RWD', '199 mph', '3.4 s',
   'Gasoline', 'Spider', 'Approx. 5,800 (458 Spider)', '$280,000 – $340,000')
on conflict (slug) do nothing;

-- Rotating studio videos
insert into public.vehicle_videos (vehicle_id, url, kind, title) values
  ('10000000-0000-4000-a000-000000000001', '/videos/1958-mercedes-benz-190sl-rotating.mp4', 'rotating',
   '1958 Mercedes-Benz 190SL — Studio Rotation'),
  ('10000000-0000-4000-a000-000000000016', '/videos/2024-porsche-911-turbo-s-rotating.mp4', 'rotating',
   '2024 Porsche 911 Turbo S — Studio Rotation');

-- Generic ownership chain for every vehicle
insert into public.vehicle_ownership_history (vehicle_id, label, detail, date, sort_order)
select id, 'Manufactured', null, year::text, 0 from public.vehicles
union all
select id, 'First Owner', 'Original delivery', year::text, 1 from public.vehicles
union all
select id, 'Acquired by The Lara Collection', 'Current ownership',
       coalesce(purchase_date::text, '—'), 2
from public.vehicles;

-- Richer chain for the 190SL
delete from public.vehicle_ownership_history
  where vehicle_id = '10000000-0000-4000-a000-000000000001';
insert into public.vehicle_ownership_history (vehicle_id, label, detail, date, sort_order) values
  ('10000000-0000-4000-a000-000000000001', 'Manufactured', 'Sindelfingen, West Germany', '1958', 0),
  ('10000000-0000-4000-a000-000000000001', 'First Owner', 'Delivered new, Los Angeles, CA', '1958', 1),
  ('10000000-0000-4000-a000-000000000001', 'Second Owner', 'Pasadena, CA', '1971', 2),
  ('10000000-0000-4000-a000-000000000001', 'Restoration Completed', 'Body-off, photo-documented', '2009', 3),
  ('10000000-0000-4000-a000-000000000001', 'Acquired by The Lara Collection', null, '2012-06-14', 4);
