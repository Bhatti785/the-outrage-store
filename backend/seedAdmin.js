require('dotenv').config();
const bcrypt = require('bcryptjs');
const User = require('./models/User');
const connectDB = require('./config/database');

const seedAdmin = async () => {
  try {
    await connectDB();
    
    const adminEmail = 'admin@theoutrage.com';
    const adminPassword = 'Outrage2025!';
    
    // Check if admin exists
    const existingAdmin = await User.findOne({ email: adminEmail });
    
    if (existingAdmin) {
      console.log('\n✅ Admin already exists');
      console.log('Email:', adminEmail);
      console.log('Password:', adminPassword);
      console.log('\nYou can log in at: https://the-outrage-store-wx4o-outrage1.vercel.app/login');
      process.exit(0);
    }
    
    // Create admin with proper password hashing
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(adminPassword, salt);
    
    const admin = new User({
      name: 'Admin',
      email: adminEmail,
      password: hashedPassword,
      role: 'admin'
    });
    
    await admin.save();
    
    console.log('\n✅ Admin created successfully!');
    console.log('Email:', adminEmail);
    console.log('Password:', adminPassword);
    console.log('\n👉 Login at: https://the-outrage-store-wx4o-outrage1.vercel.app/login');
    console.log('👉 Admin panel: https://the-outrage-store-wx4o-outrage1.vercel.app/admin');
    
    process.exit(0);
  } catch (error) {
    console.error('\n❌ Error creating admin:', error.message);
    console.log('\nMake sure:');
    console.log('1. MongoDB is running (mongod)');
    console.log('2. Your .env file has correct MONGODB_URI');
    process.exit(1);
  }
};

seedAdmin();
