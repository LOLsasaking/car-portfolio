import type { VehiclePart } from "./types";

/**
 * Encyclopedia layer: model heritage and the hardware each car carries.
 * Keyed by vehicle slug; merged onto vehicles by the data layer.
 * Part photos live in /public/images/parts (Wikimedia Commons, CC-licensed —
 * see credits.json there).
 */

export const HERITAGE: Record<string, string[]> = {
  "1958-mercedes-benz-190sl": [
    "The 190SL was Mercedes-Benz's answer to a question posed by New York importer Max Hoffman: build something with the glamour of the 300SL Gullwing, but at a price a successful doctor — not only a movie star — could afford. Introduced beside the Gullwing at the 1954 New York Auto Show, it borrowed the big car's looks and translated them onto the shortened floorpan of the W121 sedan.",
    "Where the 300SL was a racing machine domesticated, the 190SL was a boulevard tourer perfected. Its 1.9-litre four was the first production Mercedes engine with an overhead camshaft, and the fully independent suspension — double wishbones up front, swing axle behind — gave it manners far ahead of its British rivals.",
    "25,881 were built between 1955 and 1963, many crossing the Atlantic. For decades it lived in the Gullwing's shadow; today collectors prize it as the purest expression of 1950s Stuttgart elegance, and concours-grade cars have multiplied in value several times over since the 2000s.",
  ],
  "1965-mercedes-benz-230sl": [
    "The W113 'Pagoda' replaced both the 190SL and the legendary 300SL in 1963 — an almost impossible brief that designer Paul Bracq and engineer Béla Barényi answered with one of the most distinctive silhouettes ever drawn: the concave hardtop that gave the car its nickname.",
    "Under Barényi's direction the Pagoda became the world's first sports car designed around a rigid passenger cell with crumple zones front and rear — safety engineering a decade before regulators asked for it. The 2.3-litre M127 six breathed through Bosch mechanical fuel injection derived from the 300SL's system.",
    "Rudolf Uhlenhaut's team proved the chassis by winning the gruelling 1963 Spa–Sofia–Liège rally outright with a near-standard 230SL — six thousand kilometres of punishment that silenced anyone who called it a boulevard car.",
  ],
  "1966-mercedes-benz-230sl": [
    "By 1966 the 230SL had matured into the definitive open Mercedes of its era: standard equipment grew, the options list lengthened, and the factory's build quality reached a level rivals could not approach at any price.",
    "The 230SL accounts for the largest share of Pagoda production — 19,831 cars of the 48,912 W113s built — yet survivors in original colours with matching numbers grow scarcer every year. The shade on this car, over a black leather interior, is among the most sought-after pairings.",
    "Every Pagoda carried the same engineering DNA: OHC straight-six, Bosch injection, four-wheel independent suspension, and the safety cell that made it the first 'modern' sports car. The 230 is the lightest and most delicate-steering of the three displacements.",
  ],
  "1967-mercedes-benz-250sl": [
    "The 250SL is the rarest Pagoda — a single model year, 1966 to early 1968, with just 5,196 built before the 280 replaced it. It paired the 230's lighter body with a new 2.5-litre seven-main-bearing six that brought torque up by ten percent and added disc brakes to the rear axle.",
    "Mercedes offered it in three body configurations: soft-top roadster, removable-hardtop coupé, and the rare 'California' coupé with a fold-away rear bench in place of the soft-top well.",
    "Collectors regard the 250 as the connoisseur's Pagoda: the sweetest engine of the line in the earliest, purest body, produced in numbers small enough that finding one in good order is an event.",
  ],
  "1969-mercedes-benz-280sl": [
    "The 280SL closed out the Pagoda line from 1967 to 1971 and became its best seller — 23,885 built — thanks largely to American demand. The 2.8-litre M130 six made 170 horsepower and finally gave the elegant body the effortless mid-range it had always implied.",
    "Most 280SLs left the factory with the four-speed automatic, making it the grand tourer of the family; European-spec manual cars carry a premium today. Power steering and air conditioning pushed it further toward luxury without diluting the chassis.",
    "When the W113 retired in 1971, Mercedes never again built a two-seater this delicate. The R107 that followed was bigger and heavier — which is why the Pagoda, and the 280SL in particular, remains the icon of the open Mercedes.",
  ],
  "1970-mercedes-benz-280slc": [
    "Mercedes built no SLC on the W113 platform — the 'C' designation belongs to the following R107 era — so a 1970 car wearing this badge is a transitional rarity, one of the final Pagoda-generation chassis prepared as the company tooled up for the seventies.",
    "The 2.8-litre M130 six is the same unit that powered the last 280SLs: overhead cam, Bosch injection, seven main bearings — an engine known to exceed 300,000 kilometres between rebuilds when maintained.",
    "Cars from this handover period carry details from both eras and are studied closely by marque historians; documentation, as much as condition, defines their value.",
  ],
  "1978-mercedes-benz-450sl": [
    "The R107 SL ran for eighteen years — the longest production life of any Mercedes passenger car save the G-Wagen — and the 450SL was its flagship through the seventies. Built like a bank vault and styled with transatlantic swagger, it became the default car of Hollywood driveways.",
    "Its 4.5-litre M117 V8 used Bosch K-Jetronic injection and a three-speed automatic, delivering its performance as one long unbroken wave. Safety engineering carried over from Barényi's work: deformation zones, a fuel tank above the rear axle, and an interior stripped of hard edges.",
    "American buyers took over two-thirds of R107 production. Long dismissed as a cruiser, the 450SL has aged into a blue-chip classic — honest cars with history files now trade far above what cynics predicted a decade ago.",
  ],
  "1987-mercedes-benz-560sl": [
    "The 560SL was the R107's farewell — sold only in the US, Australia and Japan for the final years of the run, 1986 to 1989. Mercedes gave the old chassis its largest engine ever, the 5.5-litre M117, plus every refinement learned over the platform's long life.",
    "With 227 American horsepower, a limited-slip differential and recalibrated suspension, it was the fastest and best-sorted R107 by a distance. Anti-lock brakes and a driver's airbag — exotic equipment for the era — were standard.",
    "Because it was the last and best of the line, the 560SL is the R107 the market wants: low-mile examples in period colours are the ones setting records at auction.",
  ],
  "2011-mercedes-benz-glk350": [
    "The GLK was Mercedes' first compact SUV, and its designers leaned deliberately into the G-Class's upright, riveted-and-bolted look rather than the soft curves of its rivals — a shrunken Geländewagen for the city.",
    "The 3.5-litre M272 V6 with variable valve timing sends 268 horsepower through the 7G-Tronic automatic and 4MATIC permanent all-wheel drive — a drivetrain shared with the C-Class of the same era and known for long, uneventful service.",
    "In the collection it serves as the support car — the one that tows, hauls parts and does winter duty so the others never have to.",
  ],
  "1963-porsche-356-cabriolet": [
    "The 356 was Porsche's first production car, and every 911 since carries its genes: rear-mounted air-cooled engine, lightweight unitary body, and the conviction that agility beats brute force. By 1963 the model had reached its final and most refined form, the 356C.",
    "Ferry Porsche's original 1948 roadster used Volkswagen components reworked toward sport; fifteen years of continuous development replaced nearly all of it. The 1963 car carried Porsche's own engine, four-wheel disc brakes — new that year — and a body built by Reutter, whose seat-making division survives today as Recaro.",
    "Open 356s were always the minority of production, and they anchored Porsche's reputation in America, where Max Hoffman sold them to drivers who raced on Sunday and commuted on Monday. A matching-numbers cabriolet is now among the most coveted post-war European classics.",
  ],
  "1988-porsche-911-turbo-coupe-930": [
    "The 930 is the original 'widowmaker' — the car that introduced turbocharging to the road-going 911 in 1975 and demanded respect for the next fifteen years. Its 3.3-litre flat-six delivered its power in one famous rush as the big KKK turbocharger spooled.",
    "Porsche built the Turbo as a homologation base for racing, then discovered the road car had become a phenomenon: the flared arches, whale-tail spoiler and four-speed gearbox defined the performance-car poster of the 1980s.",
    "1988 was among the last years of the classic 930 — 1989 alone got the five-speed G50 gearbox before the 964 Turbo replaced it. Clean, unmodified late cars are the ones collectors fight over.",
  ],
  "1997-porsche-911-turbo-coupe": [
    "The 993 Turbo was twice a landmark: the first all-wheel-drive 911 Turbo, and the last with an air-cooled engine. When production ended in 1998, an unbroken thirty-four-year line of air-cooled 911s ended with it.",
    "Its 3.6-litre flat-six used two small turbochargers instead of one large unit, killing the old car's lag and delivering 408 horsepower with a civility no previous Turbo possessed. The all-wheel-drive system came from the 959 programme.",
    "The 993 generation is widely held to be the most beautiful of all 911s, and the Turbo its ultimate expression. Values reflect that verdict: the air-cooled finale has become one of the most collected Porsches of any era.",
  ],
  "2016-porsche-macan-turbo": [
    "The Macan proved a Porsche SUV could be the driver's choice of its class. Built on a comprehensively re-engineered platform with a Porsche-specific body, steering and suspension, the Macan Turbo was the segment's benchmark from the day it appeared.",
    "Its 3.6-litre twin-turbo V6 — a Porsche design — sends 400 horsepower through the seven-speed PDK double-clutch gearbox, the same transmission philosophy as the 911's, to all four wheels.",
    "Within the collection it is the daily face of the Porsche crest: the school-run, airport-run, any-weather car that still laps a circuit without embarrassment.",
  ],
  "2022-porsche-911-targa-4-gts": [
    "The Targa name dates to 1965, when Porsche feared American regulators would outlaw convertibles and engineered a roll-hooped 'safety cabriolet' instead, naming it for the Targa Florio road race. The modern 992 Targa turns that pragmatism into theatre: the roof performs a nineteen-second mechanical ballet.",
    "The GTS specification is the enthusiast's sweet spot — the 3.0-litre twin-turbo flat-six lifted to 473 horsepower, lowered PASM sport suspension, and the Sport Chrono package as standard, with all-wheel drive securing it year-round.",
    "GTS models have historically been the smart buy of every 911 range: nearly Turbo pace, full GT-car character, and equipment that costs far more assembled from the options list.",
  ],
  "2023-porsche-718-cayman-gt4-rs": [
    "The GT4 RS is the car Porsche's GT division was never supposed to build: the full 911 GT3 engine — the 4.0-litre, 9,000-rpm naturally aspirated flat-six — dropped amidships into the smaller, lighter Cayman. The result out-pointed the 911 GT3 around the Nürburgring's Nordschleife.",
    "Air intakes where the rear side windows used to be feed the engine its breath at ear level, making it among the loudest, most visceral road cars ever sold. The PDK gearbox, swan-neck rear wing and ball-jointed suspension come straight from Porsche's customer racing programme.",
    "Built in limited numbers and adored by the press, the GT4 RS was an instant collectible: the purest distillation of the mid-engined Porsche idea, and very likely the high-water mark of the naturally aspirated Cayman.",
  ],
  "2024-porsche-911-turbo-s": [
    "Fifty years after the first 930, the 992 Turbo S is what the badge always promised taken to its logical end: 640 horsepower, all-wheel drive, and acceleration that embarrasses hypercars of a decade ago — wrapped in a body usable every day of the year.",
    "Its 3.7-litre flat-six uses two variable-geometry turbochargers — technology Porsche pioneered for gasoline engines on the 997 Turbo — and the eight-speed PDK shifts faster than any human. Rear-axle steering, active anti-roll bars and carbon-ceramic brakes are all standard.",
    "Every generation of Turbo S has become the reference point its successor is judged against. As the last purely combustion Turbo S before electrification arrives, the 992 holds a particular place in the line's history.",
  ],
  "2015-ferrari-458-spider": [
    "The 458 Spider is the last open Ferrari powered by a naturally aspirated V8 — the 4.5-litre F136 that revs to 9,000 rpm and won International Engine of the Year four times. Its successor, the 488, turned to turbocharging; the 458's banshee top end died with it.",
    "The Spider introduced the world's first retractable hardtop on a mid-engined car, an aluminium roof that stows in fourteen seconds while weighing less than the equivalent soft-top system. Pininfarina shaped the body — among the last Ferraris the house styled before the relationship ended.",
    "Race versions of the 458 won their class at Le Mans, Daytona and Sebring. As the final analogue-feeling mid-engined Ferrari — no turbos, no hybrid assistance — the 458 Spider has moved from depreciating supercar to appreciating modern classic.",
  ],
};

const p = (
  id: string,
  area: string,
  name: string,
  detail: string,
  imageKey: string | null = null,
): VehiclePart => ({ id, area, name, detail, imageKey });

export const PARTS: Record<string, VehiclePart[]> = {
  "1958-mercedes-benz-190sl": [
    p("190sl-1", "Powertrain", "M121 BII 1.9L OHC inline-four", "The first overhead-camshaft engine Mercedes put into series production. 105 hp at 5,700 rpm, all-alloy head, and a willingness to rev its sedan-derived block never hinted at.", "m121-engine"),
    p("190sl-2", "Fuel System", "Twin Solex 44 PHH carburettors", "Two dual-throat side-draft Solex carburettors — notoriously demanding to synchronise, gloriously crisp when set up by someone who knows them.", "solex-carburetor"),
    p("190sl-3", "Transmission", "Four-speed manual, column-to-floor shift", "Fully synchronised four-speed driving the rear wheels; the dogleg-free pattern made it one of the friendliest gearboxes of the fifties.", "zf-gearbox"),
    p("190sl-4", "Chassis", "Swing-axle rear suspension", "Single-pivot swing axle with coil springs — Barényi-era engineering that rewards smooth inputs and defined the handling character of every fifties Mercedes.", null),
    p("190sl-5", "Brakes", "Alfin drum brakes, servo-assisted", "Finned aluminium-bonded drums at all four corners with vacuum assist — top-tier stopping hardware before discs arrived.", null),
  ],
  "1965-mercedes-benz-230sl": [
    p("230sl65-1", "Powertrain", "M127.II 2.3L OHC straight-six", "150 hp from 2,306 cc with an aggressive cam and 9.3:1 compression — the sedan engine transformed for sports-car duty.", "pagoda-engine"),
    p("230sl65-2", "Fuel System", "Bosch six-plunger mechanical injection", "Direct descendant of the 300SL Gullwing's system: a six-plunger pump meters fuel to each intake port, giving instant throttle response decades before electronics.", "bosch-injection-pump"),
    p("230sl65-3", "Body", "Pagoda removable hardtop", "The concave aluminium-skinned hardtop that named the car — taller door openings, better visibility, and stiffness engineered by Béla Barényi's safety team.", null),
    p("230sl65-4", "Chassis", "First sports-car safety cell", "Rigid passenger compartment with calculated crumple zones front and rear — the W113 was the first sports car in the world designed this way.", null),
    p("230sl65-5", "Brakes", "Girling front discs, ATE rear drums", "Disc/drum combination with vacuum servo; the rally win at Spa–Sofia–Liège proved it over 5,500 km of broken roads.", null),
  ],
  "1966-mercedes-benz-230sl": [
    p("230sl66-1", "Powertrain", "M127.II 2.3L OHC straight-six", "The lightest-revving engine of the Pagoda family — 150 hp, redline character closer to a sports car than any Mercedes six before it.", "pagoda-engine"),
    p("230sl66-2", "Fuel System", "Bosch mechanical port injection", "Six individual plungers driven off the engine — no carburettor icing, no float bowls, full power at any altitude.", "bosch-injection-pump"),
    p("230sl66-3", "Transmission", "Four-speed manual", "The driver's choice in a Pagoda; most cars left with the automatic, making manual 230s the rarer find today.", "zf-gearbox"),
    p("230sl66-4", "Steering", "Recirculating-ball with damper", "Period-correct Mercedes steering: light at parking speeds, dead-stable at autobahn pace.", null),
    p("230sl66-5", "Wheels", "14-inch steel wheels, hubcaps with painted centres", "Body-coloured wheel centres under chrome hubcaps — a factory detail that separates original cars from restorations done on a budget.", null),
  ],
  "1967-mercedes-benz-250sl": [
    p("250sl-1", "Powertrain", "M129 2.5L seven-main-bearing six", "One model year only: the 2.5-litre with seven main bearings instead of four — smoother, torquier, and the most robust bottom end of the line.", "pagoda-engine"),
    p("250sl-2", "Fuel System", "Bosch mechanical injection", "Same six-plunger architecture as the 230, recalibrated for the longer-stroke engine's torque curve.", "bosch-injection-pump"),
    p("250sl-3", "Brakes", "Four-wheel disc brakes", "The 250SL brought discs to the rear axle — the first all-disc Pagoda, with a larger booster to match.", null),
    p("250sl-4", "Fuel", "82-litre long-range tank", "Bigger tank than the 230 — the 250 was conceived as the continent-crossing Pagoda.", null),
    p("250sl-5", "Body", "California coupé configuration", "Optional folding rear bench in place of the soft-top well — the rarest factory body configuration of the W113.", null),
  ],
  "1969-mercedes-benz-280sl": [
    p("280sl-1", "Powertrain", "M130 2.8L OHC straight-six", "170 hp and the broadest torque band of the Pagoda engines; known to outlast the bodies it was bolted into.", "pagoda-engine"),
    p("280sl-2", "Fuel System", "Bosch six-plunger injection pump", "The final, most refined calibration of the mechanical system — cold starts handled by an automatic enrichment unit.", "bosch-injection-pump"),
    p("280sl-3", "Transmission", "Four-speed fluid-coupling automatic", "Mercedes' own automatic, fitted to most 280SLs — the configuration that defined the car's grand-touring character.", null),
    p("280sl-4", "Suspension", "Low-pivot swing axle, compensating spring", "The refined single-pivot rear axle with a transverse compensating spring — the fix that tamed the classic swing-axle behaviour.", null),
    p("280sl-5", "Comfort", "Behr air conditioning, Becker Europa radio", "Period US-market luxury: under-dash Behr air and the Becker radio every collector wants present and working.", null),
  ],
  "1970-mercedes-benz-280slc": [
    p("280slc-1", "Powertrain", "M130 2.8L OHC straight-six", "The last evolution of the Pagoda-era six — seven main bearings, Bosch injection, 300,000-km service life.", "pagoda-engine"),
    p("280slc-2", "Fuel System", "Bosch mechanical injection", "Six-plunger pump with altitude and temperature compensation — peak pre-electronic fuel delivery.", "bosch-injection-pump"),
    p("280slc-3", "Transmission", "Four-speed automatic", "Fluid-coupling Daimler-Benz unit, rebuilt to factory spec during restoration.", null),
    p("280slc-4", "Brakes", "ATE four-wheel discs", "Carried over from the 250/280 programme with the larger servo.", null),
    p("280slc-5", "Electrics", "Bosch 12V dynamo-to-alternator conversion era", "Transitional electrics of the late Pagoda years — this car retains its correct Bosch hardware.", null),
  ],
  "1978-mercedes-benz-450sl": [
    p("450sl-1", "Powertrain", "M117 4.5L SOHC V8", "All-iron block, alloy heads, 225 SAE hp — the unburstable V8 that powered every big Mercedes of the seventies.", "m117-v8"),
    p("450sl-2", "Fuel System", "Bosch K-Jetronic CIS injection", "Continuous mechanical injection — air-flow metered, no electronics in the fuel path — famous for starting on the first turn for decades.", "k-jetronic"),
    p("450sl-3", "Transmission", "Three-speed automatic", "Daimler-Benz W3A040: torque-converter automatic built for V8 torque, nearly maintenance-free.", null),
    p("450sl-4", "Safety", "Barényi crash architecture", "Deformation zones, fuel tank relocated above the axle, padded interior — the R107 was the safest open car of its decade.", null),
    p("450sl-5", "Wheels", "14-inch 'Bundt' alloys", "The Fuchs-forged 'Bundt cake' alloy — a Mercedes signature for twenty years and correct for this car.", "fuchs-wheel"),
  ],
  "1987-mercedes-benz-560sl": [
    p("560sl-1", "Powertrain", "M117 5.5L SOHC V8", "The largest engine ever fitted to the R107: 227 hp US-spec, torque everywhere, and the same legendary durability as the smaller M117s.", "m117-v8"),
    p("560sl-2", "Fuel System", "Bosch KE-Jetronic injection", "K-Jetronic with electronic trim — the final, most precise evolution of the continuous-injection system.", "k-jetronic"),
    p("560sl-3", "Driveline", "Limited-slip differential", "Standard on the 560SL — the only R107 so equipped from the factory.", null),
    p("560sl-4", "Brakes", "ABS, ventilated front discs", "Anti-lock brakes standard — exotic hardware in 1987, expected today.", "brembo-caliper"),
    p("560sl-5", "Safety", "Driver's airbag (SRS)", "Among the first open cars in America with a standard airbag.", null),
  ],
  "2011-mercedes-benz-glk350": [
    p("glk-1", "Powertrain", "M272 3.5L DOHC V6", "268 hp, variable valve timing on all four cams, balance-shaft smoothness — the workhorse Mercedes V6 of its decade.", "m272-v6"),
    p("glk-2", "Transmission", "7G-Tronic seven-speed automatic", "Mercedes' in-house seven-speed — early adoption of ratios rivals took years to match.", null),
    p("glk-3", "Driveline", "4MATIC permanent all-wheel drive", "45/55 torque split through an open centre differential with electronic traction management.", null),
    p("glk-4", "Chassis", "Agility Control suspension", "Amplitude-dependent damping — firm when pressed, supple around town, no electronics required.", null),
    p("glk-5", "Brakes", "Adaptive brake with hold function", "C-Class-derived braking hardware with hill-start and pre-charging logic.", "brembo-caliper"),
  ],
  "1963-porsche-356-cabriolet": [
    p("356-1", "Powertrain", "Type 616/15 1.6L air-cooled flat-four", "Pushrod boxer in its final 'C' specification: 75 hp, twin Zenith carburettors, and the mechanical music every 911 inherited.", "flat-four-356"),
    p("356-2", "Brakes", "ATE four-wheel disc brakes", "New for 1963 — the 356C was the first production Porsche with discs at every corner, licensed from Dunlop and built by ATE.", null),
    p("356-3", "Transmission", "Type 741 four-speed, Porsche synchromesh", "Porsche's own baulk-ring synchromesh — technology the company licensed to half the industry, including Ferrari.", "zf-gearbox"),
    p("356-4", "Body", "Reutter cabriolet coachwork", "Bodied by Reutter of Stuttgart, whose seating division became Recaro; panel fit that shamed cars at three times the price.", null),
    p("356-5", "Suspension", "Trailing-arm front, swing-axle rear, torsion bars", "VW-derived architecture refined past recognition — torsion-bar springing at all four corners kept the lines low.", null),
  ],
  "1988-porsche-911-turbo-coupe-930": [
    p("930-1", "Powertrain", "3.3L turbocharged flat-six (930/66)", "282 hp delivered with the most famous power delivery in motoring: nothing, nothing, everything. Air-cooled, single-plug, built to handle far more boost than stock.", "turbo-930-engine"),
    p("930-2", "Forced Induction", "KKK K27 turbocharger with intercooler", "The single large KKK unit and engine-deck intercooler that defined the whale-tail's purpose — boost arrives near 3,500 rpm like a switch.", "turbocharger"),
    p("930-3", "Transmission", "Four-speed 930/34 gearbox", "The famously long-ratio four-speed — strengthened to survive the torque, geared so second runs past 160 km/h.", "zf-gearbox"),
    p("930-4", "Wheels", "16-inch Fuchs forged alloys", "Deep-dish forged Fuchs, 7-inch front and 9-inch rear — the wheel that defines the widebody Turbo stance.", "fuchs-wheel"),
    p("930-5", "Brakes", "917-derived cross-drilled discs", "Four-piston calipers and cross-drilled rotors developed from the 917 race programme — the best brakes on any road car of its day.", "brembo-caliper"),
  ],
  "1997-porsche-911-turbo-coupe": [
    p("993t-1", "Powertrain", "M64/60 3.6L twin-turbo air-cooled flat-six", "408 hp from the final air-cooled Turbo engine — twin turbos, twin intercoolers, and on-board diagnostics married to old-world cooling fins.", "turbo-930-engine"),
    p("993t-2", "Forced Induction", "Twin KKK K16 turbochargers", "Two small turbos instead of one big one — lag virtually eliminated, boost arriving from 2,500 rpm.", "turbocharger"),
    p("993t-3", "Driveline", "959-derived all-wheel drive", "Viscous-coupling AWD sending up to 40% forward — the first all-wheel-drive 911 Turbo.", null),
    p("993t-4", "Transmission", "G64/51 six-speed manual", "Every 993 Turbo was a manual — the last Turbo generation never offered otherwise.", "zf-gearbox"),
    p("993t-5", "Wheels", "18-inch hollow-spoke Technologie alloys", "Pressure-cast hollow spokes saved unsprung weight — a production first.", "bbs-wheel"),
  ],
  "2016-porsche-macan-turbo": [
    p("macan-1", "Powertrain", "3.6L twin-turbo V6", "400 hp from Porsche's own twin-turbo V6, mounted low to keep the centre of gravity honest.", "turbocharger"),
    p("macan-2", "Transmission", "Seven-speed PDK", "The 911's double-clutch philosophy in SUV form — full-torque shifts in milliseconds.", "pdk-gearbox"),
    p("macan-3", "Driveline", "Porsche Traction Management AWD", "Electronically controlled multi-plate clutch, rear-biased until physics demands otherwise.", null),
    p("macan-4", "Chassis", "Air suspension with PASM", "Optional air springs with adaptive damping — track-firm to comfort-soft across one rotary switch.", null),
    p("macan-5", "Brakes", "Six-piston front calipers, 360 mm discs", "Hardware shared in concept with the sports cars; the Turbo badge had to be earned downhill too.", "brembo-caliper"),
  ],
  "2022-porsche-911-targa-4-gts": [
    p("targa-1", "Powertrain", "3.0L twin-turbo flat-six (GTS tune)", "473 hp via larger turbochargers and remapped boost — the engine the rest of the 992 range is measured against.", "turbocharger"),
    p("targa-2", "Roof", "Automated Targa roll-hoop mechanism", "Nineteen seconds of choreography: rear glass lifts away, the fabric panel folds beneath it, the brushed hoop stays — engineering as theatre.", null),
    p("targa-3", "Transmission", "Eight-speed PDK", "Twin wet clutches, shift times no human matches, with manual mode that actually holds gears.", "pdk-gearbox"),
    p("targa-4", "Chassis", "PASM sport suspension, -10 mm", "GTS-specific drop and recalibrated adaptive dampers; Sport Chrono with its drive-mode dial standard.", null),
    p("targa-5", "Wheels", "Centre-lock 20/21-inch RS Spyder alloys", "Race-style single centre nut — Turbo S hardware fitted standard to the GTS.", "fuchs-wheel"),
  ],
  "2023-porsche-718-cayman-gt4-rs": [
    p("gt4rs-1", "Powertrain", "4.0L naturally aspirated flat-six (911 GT3)", "The full 9,000-rpm GT3 engine — 493 hp, individual throttle bodies, dry sump — mid-mounted in the lighter Cayman shell.", "mezger-flat-six"),
    p("gt4rs-2", "Induction", "Side-window ram-air intakes", "Where rear quarter glass should be, the GT4 RS breathes — intake honk delivered directly to the driver's ear.", "gt4rs-engine"),
    p("gt4rs-3", "Transmission", "Seven-speed PDK, shortened ratios", "PDK only — the racing gearbox calibration with shift lights and a proper mechanical limited-slip.", "pdk-gearbox"),
    p("gt4rs-4", "Aero", "Swan-neck rear wing, front diffusers", "Downforce hardware from the customer-racing GT4 — 25% more press than a standard GT4 at speed.", null),
    p("gt4rs-5", "Suspension", "Ball-jointed RS suspension", "Rubber bushings replaced with spherical bearings throughout — motorsport precision tolerated on the road.", null),
  ],
  "2024-porsche-911-turbo-s": [
    p("992ts-1", "Powertrain", "3.7L twin-VTG-turbo flat-six", "640 hp through two variable-geometry turbochargers — technology Porsche made work for petrol engines and has never surrendered.", "turbocharger"),
    p("992ts-2", "Transmission", "Eight-speed PDK", "Launch control hooks all four wheels to 100 km/h in 2.7 seconds, repeatably, all day.", "pdk-gearbox"),
    p("992ts-3", "Brakes", "PCCB carbon-ceramic discs, 420 mm", "Ten-piston front calipers on carbon-ceramic rotors — fade simply does not occur on the road.", "carbon-ceramic-brake"),
    p("992ts-4", "Chassis", "Rear-axle steering + PDCC active anti-roll", "The rear wheels steer, the anti-roll bars are hydraulic — a two-tonne-feel car shrunk around the driver.", null),
    p("992ts-5", "Aero", "Active front and rear aero", "Extending front lip and three-position rear wing — including an airbrake function under maximum braking.", null),
  ],
  "2015-ferrari-458-spider": [
    p("458-1", "Powertrain", "F136 FB 4.5L flat-plane V8", "562 hp at 9,000 rpm, naturally aspirated, four-time International Engine of the Year — the last of Ferrari's free-breathing V8s.", "f136-engine"),
    p("458-2", "Transmission", "Getrag seven-speed dual-clutch", "The gearbox that retired Ferrari's automated single-clutch F1 system — instant shifts with none of the old brutality.", "pdk-gearbox"),
    p("458-3", "Roof", "Retractable aluminium hardtop", "World first on a mid-engined car: two-piece aluminium roof stowing over the engine in fourteen seconds, 25 kg lighter than the old soft-top.", null),
    p("458-4", "Brakes", "Brembo carbon-ceramic discs", "398 mm front rotors with Extreme Design calipers — race-derived and standard fit.", "carbon-ceramic-brake"),
    p("458-5", "Electronics", "E-Diff3 + F1-Trac integration", "Electronic differential and traction control computed as one system — the software that made 562 hp exploitable.", null),
  ],
};
