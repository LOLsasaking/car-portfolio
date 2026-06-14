/** Maps camelCase vehicle form fields to snake_case DB columns. */
export function vehicleToRow(input: Record<string, unknown>) {
  const map: Record<string, string> = {
    slug: "slug",
    brand: "brand",
    year: "year",
    make: "make",
    model: "model",
    chassisCode: "chassis_code",
    vin: "vin",
    color: "color",
    interiorColor: "interior_color",
    mileage: "mileage",
    currentOwner: "current_owner",
    purchaseDate: "purchase_date",
    purchasePrice: "purchase_price",
    estimatedValue: "estimated_value",
    numOwners: "num_owners",
    titleStatus: "title_status",
    carfaxStatus: "carfax_status",
    location: "location",
    story: "story",
    rotatingVideoUrl: "rotating_video_url",
    heroImageUrl: "hero_image_url",
    featured: "featured",
    featuredOrder: "featured_order",
    engine: "engine",
    transmission: "transmission",
    horsepower: "horsepower",
    torque: "torque",
    drivetrain: "drivetrain",
    topSpeed: "top_speed",
    zeroToSixty: "zero_to_sixty",
    fuelType: "fuel_type",
    bodyStyle: "body_style",
    productionNumbers: "production_numbers",
    marketValue: "market_value",
  };

  const row: Record<string, unknown> = {};
  for (const [camel, snake] of Object.entries(map)) {
    if (camel in input) {
      const v = input[camel];
      row[snake] = v === "" ? null : v;
    }
  }
  return row;
}
