import "dotenv/config";
import { prisma } from "lib/dbInstance";

async function main() {
  console.log("🌱 Starting database seed...");

  // Clear existing data
  console.log("🗑️  Clearing existing data...");
  await prisma.pantryItem.deleteMany();
  await prisma.pantrySelf.deleteMany();

  // Create pantry shelves
  console.log("📦 Creating pantry shelves...");
  const fridge = await prisma.pantrySelf.create({
    data: {
      name: "Fridge",
      type: "fridge",
      order: 1,
    },
  });

  const freezer = await prisma.pantrySelf.create({
    data: {
      name: "Freezer",
      type: "freezer",
      order: 2,
    },
  });

  const spicesCabinet = await prisma.pantrySelf.create({
    data: {
      name: "Spices & Seasonings",
      type: "cabinet",
      order: 3,
    },
  });

  const pantryShelf = await prisma.pantrySelf.create({
    data: {
      name: "Pantry Shelf",
      type: "cabinet",
      order: 4,
    },
  });

  const counterTop = await prisma.pantrySelf.create({
    data: {
      name: "Counter Top",
      type: "counter",
      order: 5,
    },
  });

  // Create pantry items for Fridge
  console.log("🥛 Adding fridge items...");
  await prisma.pantryItem.createMany({
    data: [
      {
        name: "2% Milk",
        category: "Dairy",
        quantity: 2,
        unit: "liters",
        expiryDate: new Date("2025-11-10"),
        notes: "Organic",
        pantrySelfId: fridge.id,
      },
      {
        name: "Cheddar Cheese",
        category: "Dairy",
        quantity: 200,
        unit: "g",
        expiryDate: new Date("2025-12-01"),
        notes: "Sliced",
        pantrySelfId: fridge.id,
      },
      {
        name: "Greek Yogurt",
        category: "Dairy",
        quantity: 500,
        unit: "g",
        expiryDate: new Date("2025-11-05"),
        pantrySelfId: fridge.id,
      },
      {
        name: "Eggs",
        category: "Dairy",
        quantity: 12,
        unit: "count",
        expiryDate: new Date("2025-11-20"),
        pantrySelfId: fridge.id,
      },
      {
        name: "Tomatoes",
        category: "Vegetables",
        quantity: 4,
        unit: "count",
        expiryDate: new Date("2025-11-02"),
        notes: "Fresh from farmers market",
        pantrySelfId: fridge.id,
      },
      {
        name: "Bell Peppers",
        category: "Vegetables",
        quantity: 3,
        unit: "count",
        expiryDate: new Date("2025-11-08"),
        notes: "Red, yellow, and orange",
        pantrySelfId: fridge.id,
      },
      {
        name: "Lettuce",
        category: "Vegetables",
        quantity: 1,
        unit: "count",
        expiryDate: new Date("2025-10-30"),
        pantrySelfId: fridge.id,
      },
      {
        name: "Chicken Breast",
        category: "Protein",
        quantity: 1,
        unit: "kg",
        expiryDate: new Date("2025-11-01"),
        notes: "Boneless, skinless",
        pantrySelfId: fridge.id,
      },
    ],
  });

  // Create pantry items for Freezer
  console.log("❄️  Adding freezer items...");
  await prisma.pantryItem.createMany({
    data: [
      {
        name: "Ground Beef",
        category: "Protein",
        quantity: 2,
        unit: "kg",
        expiryDate: new Date("2025-12-26"),
        pantrySelfId: freezer.id,
      },
      {
        name: "Salmon Fillets",
        category: "Protein",
        quantity: 4,
        unit: "count",
        expiryDate: new Date("2025-11-26"),
        pantrySelfId: freezer.id,
      },
      {
        name: "Frozen Peas",
        category: "Vegetables",
        quantity: 1,
        unit: "kg",
        expiryDate: new Date("2025-12-01"),
        pantrySelfId: freezer.id,
      },
      {
        name: "Ice Cream",
        category: "Desserts",
        quantity: 1,
        unit: "liters",
        expiryDate: new Date("2026-01-15"),
        notes: "Vanilla flavor",
        pantrySelfId: freezer.id,
      },
    ],
  });

  // Create pantry items for Spices Cabinet
  console.log("🌶️  Adding spices and seasonings...");
  await prisma.pantryItem.createMany({
    data: [
      {
        name: "Black Pepper",
        category: "Spices",
        quantity: 50,
        unit: "g",
        notes: "Ground pepper",
        pantrySelfId: spicesCabinet.id,
      },
      {
        name: "Sea Salt",
        category: "Spices",
        quantity: 100,
        unit: "g",
        pantrySelfId: spicesCabinet.id,
      },
      {
        name: "Garlic Powder",
        category: "Spices",
        quantity: 75,
        unit: "g",
        pantrySelfId: spicesCabinet.id,
      },
      {
        name: "Paprika",
        category: "Spices",
        quantity: 60,
        unit: "g",
        pantrySelfId: spicesCabinet.id,
      },
      {
        name: "Cinnamon",
        category: "Spices",
        quantity: 40,
        unit: "g",
        pantrySelfId: spicesCabinet.id,
      },
      {
        name: "Cumin",
        category: "Spices",
        quantity: 55,
        unit: "g",
        pantrySelfId: spicesCabinet.id,
      },
      {
        name: "Vanilla Extract",
        category: "Flavorings",
        quantity: 500,
        unit: "ml",
        pantrySelfId: spicesCabinet.id,
      },
    ],
  });

  // Create pantry items for Pantry Shelf
  console.log("🥫 Adding pantry shelf items...");
  await prisma.pantryItem.createMany({
    data: [
      {
        name: "All-Purpose Flour",
        category: "Baking",
        quantity: 2,
        unit: "kg",
        expiryDate: new Date("2025-12-15"),
        pantrySelfId: pantryShelf.id,
      },
      {
        name: "Olive Oil",
        category: "Oils",
        quantity: 1,
        unit: "liters",
        notes: "Extra virgin",
        pantrySelfId: pantryShelf.id,
      },
      {
        name: "Canned Tomatoes",
        category: "Canned",
        quantity: 6,
        unit: "count",
        expiryDate: new Date("2025-12-30"),
        notes: "Diced, no salt added",
        pantrySelfId: pantryShelf.id,
      },
      {
        name: "Pasta",
        category: "Grains",
        quantity: 500,
        unit: "g",
        expiryDate: new Date("2026-01-01"),
        notes: "Spaghetti",
        pantrySelfId: pantryShelf.id,
      },
      {
        name: "Rice",
        category: "Grains",
        quantity: 1,
        unit: "kg",
        notes: "Long-grain white rice",
        pantrySelfId: pantryShelf.id,
      },
      {
        name: "Honey",
        category: "Condiments",
        quantity: 500,
        unit: "g",
        pantrySelfId: pantryShelf.id,
      },
      {
        name: "Peanut Butter",
        category: "Condiments",
        quantity: 500,
        unit: "g",
        expiryDate: new Date("2026-03-01"),
        pantrySelfId: pantryShelf.id,
      },
      {
        name: "Baking Powder",
        category: "Baking",
        quantity: 200,
        unit: "g",
        expiryDate: new Date("2025-11-15"),
        pantrySelfId: pantryShelf.id,
      },
    ],
  });

  // Create pantry items for Counter Top
  console.log("🍎 Adding counter top items...");
  await prisma.pantryItem.createMany({
    data: [
      {
        name: "Bananas",
        category: "Fruits",
        quantity: 5,
        unit: "count",
        expiryDate: new Date("2025-10-31"),
        pantrySelfId: counterTop.id,
      },
      {
        name: "Apples",
        category: "Fruits",
        quantity: 6,
        unit: "count",
        expiryDate: new Date("2025-11-05"),
        notes: "Granny Smith",
        pantrySelfId: counterTop.id,
      },
      {
        name: "Oranges",
        category: "Fruits",
        quantity: 4,
        unit: "count",
        expiryDate: new Date("2025-11-10"),
        pantrySelfId: counterTop.id,
      },
      {
        name: "Onions",
        category: "Vegetables",
        quantity: 3,
        unit: "count",
        notes: "Yellow onions",
        pantrySelfId: counterTop.id,
      },
      {
        name: "Garlic",
        category: "Vegetables",
        quantity: 1,
        unit: "bulb",
        pantrySelfId: counterTop.id,
      },
      {
        name: "Bread",
        category: "Bakery",
        quantity: 1,
        unit: "count",
        expiryDate: new Date("2025-10-31"),
        notes: "Whole wheat",
        pantrySelfId: counterTop.id,
      },
    ],
  });

  console.log("✅ Seed completed successfully!");
  console.log(`
📊 Summary:
  - Pantry Shelves: 5
  - Pantry Items: ${5 + 4 + 7 + 8 + 6} items total
  `);
}

main()
  .catch((e) => {
    console.error("❌ Error during seeding:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
