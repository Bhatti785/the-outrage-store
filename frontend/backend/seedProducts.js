const connectDB = require('./config/database');
const Product = require('./models/Product');

// Load environment variables
require('dotenv').config();

const sampleProducts = [
  // MEN Products
  {
    name: "Premium Cotton Casual Shirt",
    description: "High-quality export leftover cotton shirt. Perfect for casual wear with a comfortable fit and breathable fabric.",
    price: 2499,
    salePrice: 1899,
    category: "men",
    stock: 25,
    images: ["https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800"],
    sizes: ["S", "M", "L", "XL"],
    colors: ["White", "Blue", "Black"],
    isNew: true,
    isSale: true
  },
  {
    name: "Classic Denim Jeans",
    description: "Premium denim jeans with perfect fit. Export quality fabric that lasts long and looks great.",
    price: 3499,
    salePrice: null,
    category: "men",
    stock: 30,
    images: ["https://images.unsplash.com/photo-1542272454315-4c01d7abdf4a?w=800"],
    sizes: ["30", "32", "34", "36"],
    colors: ["Dark Blue", "Light Blue", "Black"],
    isNew: true,
    isSale: false
  },
  {
    name: "Formal Blazer",
    description: "Elegant formal blazer for office and special occasions. Premium stitching and fabric quality.",
    price: 5999,
    salePrice: 4499,
    category: "men",
    stock: 15,
    images: ["https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800"],
    sizes: ["M", "L", "XL", "XXL"],
    colors: ["Navy", "Charcoal", "Black"],
    isNew: false,
    isSale: true
  },
  {
    name: "Polo T-Shirt Pack",
    description: "Pack of 3 premium polo t-shirts. Soft cotton fabric with comfortable fit for everyday wear.",
    price: 2999,
    salePrice: null,
    category: "men",
    stock: 40,
    images: ["https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?w=800"],
    sizes: ["S", "M", "L", "XL"],
    colors: ["Multi-Pack"],
    isNew: true,
    isSale: false
  },

  // WOMEN Products
  {
    name: "Elegant Floral Dress",
    description: "Beautiful floral print dress perfect for summer occasions. Light, airy, and comfortable fabric.",
    price: 3999,
    salePrice: 2999,
    category: "women",
    stock: 20,
    images: ["https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=800"],
    sizes: ["XS", "S", "M", "L"],
    colors: ["Pink Floral", "Blue Floral"],
    isNew: true,
    isSale: true
  },
  {
    name: "Designer Kurti",
    description: "Traditional Pakistani style kurti with modern embroidery. Perfect for casual and semi-formal wear.",
    price: 2499,
    salePrice: null,
    category: "women",
    stock: 35,
    images: ["https://images.unsplash.com/photo-1610030469628-3dc4a91a205e?w=800"],
    sizes: ["S", "M", "L", "XL"],
    colors: ["Red", "Green", "Maroon"],
    isNew: true,
    isSale: false
  },
  {
    name: "High-Waist Skinny Jeans",
    description: "Trendy high-waist skinny jeans that flatters your figure. Premium stretch denim for comfort.",
    price: 2799,
    salePrice: 2199,
    category: "women",
    stock: 28,
    images: ["https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=800"],
    sizes: ["26", "28", "30", "32"],
    colors: ["Black", "Blue", "Grey"],
    isNew: false,
    isSale: true
  },
  {
    name: "Silk Scarf Collection",
    description: "Luxurious silk scarves with elegant prints. Perfect accessory to elevate any outfit.",
    price: 1299,
    salePrice: null,
    category: "women",
    stock: 50,
    images: ["https://images.unsplash.com/photo-1584030373081-f37b7bb4fa33?w=800"],
    sizes: ["One Size"],
    colors: ["Multi-Color", "Red", "Blue"],
    isNew: true,
    isSale: false
  },
  {
    name: "Chiffon Evening Gown",
    description: "Elegant chiffon evening gown with delicate beadwork. Perfect for weddings, formal dinners, and special occasions. Flowing silhouette with comfortable fit.",
    price: 8999,
    salePrice: 7499,
    category: "women",
    stock: 12,
    images: ["https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=800"],
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Midnight Blue", "Burgundy", "Emerald Green", "Champagne"],
    isNew: true,
    isSale: true
  },
  {
    name: "Embroidered Lawn Suit",
    description: "Premium Pakistani lawn suit with intricate hand embroidery. Three-piece set includes shirt, dupatta, and trousers. Breathable fabric perfect for summer.",
    price: 4599,
    salePrice: null,
    category: "women",
    stock: 25,
    images: ["https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=800"],
    sizes: ["S", "M", "L", "XL"],
    colors: ["Mint Green", "Peach", "Sky Blue", "Lavender"],
    isNew: true,
    isSale: false
  },
  {
    name: "Cashmere Wool Sweater",
    description: "Luxurious cashmere blend sweater for winter. Ultra-soft, warm, and lightweight. Classic fit that pairs well with jeans or skirts.",
    price: 3299,
    salePrice: 2799,
    category: "women",
    stock: 18,
    images: ["https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=800"],
    sizes: ["S", "M", "L", "XL"],
    colors: ["Cream", "Dusty Pink", "Grey", "Camel"],
    isNew: false,
    isSale: true
  },
  {
    name: "Pleated Midi Skirt",
    description: "Stylish pleated midi skirt with metallic finish. Elastic waistband for comfortable fit. Perfect for office wear or casual outings.",
    price: 2199,
    salePrice: null,
    category: "women",
    stock: 32,
    images: ["https://images.unsplash.com/photo-1583496661160-fb5886a0aa31?w=800"],
    sizes: ["XS", "S", "M", "L"],
    colors: ["Rose Gold", "Silver", "Black", "Navy"],
    isNew: true,
    isSale: false
  },
  {
    name: "Velvet Bridal Lehenga",
    description: "Stunning velvet bridal lehenga with heavy embroidery and stonework. Complete set includes lehenga, choli, and dupatta. Perfect for weddings and receptions.",
    price: 24999,
    salePrice: 19999,
    category: "women",
    stock: 8,
    images: ["https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=800"],
    sizes: ["S", "M", "L"],
    colors: ["Royal Red", "Deep Maroon", "Navy Blue"],
    isNew: true,
    isSale: true
  },
  {
    name: "Linen Summer Tunic",
    description: "Breathable linen tunic with side slits and pockets. Perfect for hot summer days. Casual yet elegant design suitable for everyday wear.",
    price: 1899,
    salePrice: null,
    category: "women",
    stock: 40,
    images: ["https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=800"],
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["White", "Beige", "Olive Green", "Terracotta"],
    isNew: true,
    isSale: false
  },
  {
    name: "Pearl Embellished Clutch",
    description: "Elegant evening clutch with pearl embellishments and gold-tone hardware. Detachable chain strap included. Perfect accessory for formal events.",
    price: 2499,
    salePrice: 1999,
    category: "women",
    stock: 22,
    images: ["https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=800"],
    sizes: ["One Size"],
    colors: ["Ivory", "Black", "Rose Gold"],
    isNew: false,
    isSale: true
  },

  // KIDS Products
  {
    name: "Kids Cartoon T-Shirt",
    description: "Fun cartoon print t-shirts for kids. Soft cotton that's gentle on children's skin.",
    price: 899,
    salePrice: 699,
    category: "kids",
    stock: 45,
    images: ["https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=800"],
    sizes: ["2-3Y", "4-5Y", "6-7Y", "8-9Y"],
    colors: ["Red", "Blue", "Yellow", "Green"],
    isNew: true,
    isSale: true
  },
  {
    name: "School Uniform Set",
    description: "Complete school uniform set including shirt, pants/skirt. Durable fabric for daily wear.",
    price: 1999,
    salePrice: null,
    category: "kids",
    stock: 60,
    images: ["https://images.unsplash.com/photo-1548778873-a1d09f30a5fd?w=800"],
    sizes: ["4-5Y", "6-7Y", "8-9Y", "10-12Y"],
    colors: ["Navy/White", "Grey/White"],
    isNew: true,
    isSale: false
  },
  {
    name: "Winter Jacket for Kids",
    description: "Warm and cozy winter jacket. Water-resistant outer layer with soft inner lining.",
    price: 2499,
    salePrice: 1899,
    category: "kids",
    stock: 22,
    images: ["https://images.unsplash.com/photo-1548778873-a1d09f30a5fd?w=800"],
    sizes: ["4-5Y", "6-7Y", "8-9Y", "10-12Y"],
    colors: ["Red", "Blue", "Black"],
    isNew: false,
    isSale: true
  },
  {
    name: "Kids Ethnic Wear",
    description: "Traditional ethnic wear for special occasions. Comfortable fit with beautiful embroidery.",
    price: 1799,
    salePrice: null,
    category: "kids",
    stock: 30,
    images: ["https://images.unsplash.com/photo-1584949091598-c31daaaa4aa9?w=800"],
    sizes: ["4-5Y", "6-7Y", "8-9Y", "10-12Y"],
    colors: ["Green", "Maroon", "Gold"],
    isNew: true,
    isSale: false
  }
];

const seedProducts = async () => {
  try {
    await connectDB();
    
    // Clear existing products
    await Product.deleteMany({});
    console.log('✅ Cleared existing products');
    
    // Insert sample products
    const products = await Product.insertMany(sampleProducts);
    console.log(`✅ Added ${products.length} products successfully!`);
    
    // Summary by category
    const menCount = await Product.countDocuments({ category: 'men' });
    const womenCount = await Product.countDocuments({ category: 'women' });
    const kidsCount = await Product.countDocuments({ category: 'kids' });
    
    console.log('\n📊 Product Summary:');
    console.log(`   Men: ${menCount} products`);
    console.log(`   Women: ${womenCount} products`);
    console.log(`   Kids: ${kidsCount} products`);
    console.log(`\n   Total Stock: ${products.reduce((sum, p) => sum + p.stock, 0)} items`);
    
    console.log('\n👉 Visit: http://localhost:3000/products');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding products:', error.message);
    process.exit(1);
  }
};

seedProducts();
