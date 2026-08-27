import 'dotenv/config';
import bcrypt from 'bcryptjs';
import { connectDatabase } from './config/db.js';
import User from './models/User.js';
import Store from './models/Store.js';
import Rating from './models/Rating.js';

const password = await bcrypt.hash('DemoPass!1', 10);
await connectDatabase();
await Rating.deleteMany({}); await Store.deleteMany({}); await User.deleteMany({});
const [admin, user, ownerOne, ownerTwo, ownerThree] = await User.create([
  { name: 'Platform Operations Administrator', email: 'admin@roxlier.demo', password, address: '100 Platform Avenue, New York', role: 'ADMIN' },
  { name: 'Community Member Demonstration', email: 'user@roxlier.demo', password, address: '44 Garden Road, Chicago', role: 'NORMAL_USER' },
  { name: 'Harbor Market Store Administrator', email: 'owner@roxlier.demo', password, address: '22 Harbor Street, Boston', role: 'STORE_OWNER' },
  { name: 'Northstar Goods Store Administrator', email: 'owner2@roxlier.demo', password, address: '18 Market Square, Seattle', role: 'STORE_OWNER' },
  { name: 'Cedar House Store Administrator', email: 'owner3@roxlier.demo', password, address: '9 Cedar Lane, Portland', role: 'STORE_OWNER' }
]);
const stores = await Store.create([
  { name: 'Harbor Market & Provisions', email: 'hello@harbormarket.demo', address: '22 Harbor Street, Boston', owner: ownerOne._id },
  { name: 'Northstar Home Goods Collective', email: 'team@northstar.demo', address: '18 Market Square, Seattle', owner: ownerTwo._id },
  { name: 'Cedar House Kitchen Supply', email: 'hello@cedarhouse.demo', address: '9 Cedar Lane, Portland', owner: ownerThree._id }
]);
await Rating.create([{ value: 5, user: user._id, store: stores[0]._id }, { value: 4, user: admin._id, store: stores[1]._id }]);
console.log('Seeded demo accounts and stores. Password for all accounts: DemoPass!1');
process.exit(0);
