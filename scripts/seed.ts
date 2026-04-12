import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  // Create admin user
  const hashedPassword = await bcrypt.hash('abhilash8383', 10);
  await prisma.user.upsert({
    where: { email: 'abhilash.panda8383@gmail.com' },
    update: {},
    create: {
      email: 'abhilash.panda8383@gmail.com',
      password: hashedPassword,
      name: 'Admin'
    }
  });
  console.log('Admin user created!');

  // Create sample listings
  const listings = [
    {
      title: 'Modern Downtown Apartment',
      slug: 'modern-downtown-apartment',
      description: 'Beautiful modern apartment in the heart of downtown. Features floor-to-ceiling windows, hardwood floors, and state-of-the-art kitchen.',
      price: 450000,
      priceType: 'sale',
      propertyType: 'apartment',
      location: 'Downtown Metro City',
      area: 1200,
      bedrooms: 2,
      bathrooms: 2,
      featured: true,
      status: 'active',
      imageUrl: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800'
    },
    {
      title: 'Cozy Suburban Family Home',
      slug: 'cozy-suburban-family-home',
      description: 'Spacious family home with large backyard, perfect for kids and pets. Recently renovated kitchen and bathrooms.',
      price: 3500,
      priceType: 'rent',
      propertyType: 'house',
      location: 'Peaceful Meadows',
      area: 2000,
      bedrooms: 4,
      bathrooms: 3,
      featured: true,
      status: 'active',
      imageUrl: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800'
    },
    {
      title: 'Luxury Penthouse Suite',
      slug: 'luxury-penthouse-suite',
      description: 'Stunning penthouse with panoramic city views. Private elevator, wine cellar, and smart home technology throughout.',
      price: 1200000,
      priceType: 'sale',
      propertyType: 'penthouse',
      location: 'Waterfront District',
      area: 3500,
      bedrooms: 4,
      bathrooms: 4,
      featured: true,
      status: 'active',
      imageUrl: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800'
    },
    {
      title: 'Beachfront Villa',
      slug: 'beachfront-villa',
      description: 'Exclusive beachfront property with private beach access. Infinity pool, outdoor kitchen, and direct ocean views.',
      price: 2500000,
      priceType: 'sale',
      propertyType: 'villa',
      location: 'Coastal Paradise',
      area: 5000,
      bedrooms: 5,
      bathrooms: 5,
      featured: true,
      status: 'active',
      imageUrl: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800'
    },
    {
      title: 'Urban Studio Loft',
      slug: 'urban-studio-loft',
      description: 'Charming loft apartment with exposed brick walls and industrial design. Perfect for young professionals.',
      price: 1800,
      priceType: 'rent',
      propertyType: 'apartment',
      location: 'Arts District',
      area: 600,
      bedrooms: 1,
      bathrooms: 1,
      featured: false,
      status: 'active',
      imageUrl: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800'
    },
    {
      title: 'Mountain Retreat Cabin',
      slug: 'mountain-retreat-cabin',
      description: 'Cozy cabin in the mountains with stunning views. Wood-burning fireplace and wraparound deck.',
      price: 450000,
      priceType: 'sale',
      propertyType: 'house',
      location: 'Highland Hills',
      area: 1800,
      bedrooms: 3,
      bathrooms: 2,
      featured: false,
      status: 'active',
      imageUrl: 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=800'
    }
  ];

  for (const listing of listings) {
    await prisma.listing.upsert({
      where: { slug: listing.slug },
      update: listing,
      create: listing
    });
  }
  console.log('Listings created!');

  // Create sample blogs
  const blogs = [
    {
      title: 'Top 10 Real Estate Trends in 2026',
      slug: 'top-10-real-estate-trends-2026',
      excerpt: 'Discover the latest trends shaping the real estate market this year.',
      content: 'The real estate market in 2026 is evolving rapidly...',
      category: 'Market Trends',
      status: 'published',
      author: 'Prolific Properties',
      readTime: '8 min read',
      featuredImage: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800'
    },
    {
      title: 'How to Stage Your Home for a Quick Sale',
      slug: 'stage-home-quick-sale',
      excerpt: 'Expert tips on preparing your property to attract buyers.',
      content: 'Staging your home properly can make all the difference...',
      category: 'Selling Tips',
      status: 'published',
      author: 'Prolific Properties',
      readTime: '6 min read',
      featuredImage: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800'
    },
    {
      title: "First-Time Home Buyer's Guide",
      slug: 'first-time-buyer-guide',
      excerpt: 'Everything you need to know before buying your first home.',
      content: 'Buying your first home is an exciting milestone...',
      category: 'Buying Guide',
      status: 'published',
      author: 'Prolific Properties',
      readTime: '10 min read',
      featuredImage: 'https://images.unsplash.com/photo-1560520653-9e0e4c89eb11?w=800'
    },
    {
      title: 'Investing in Rental Properties',
      slug: 'investing-rental-properties',
      excerpt: 'Learn how to build wealth through rental property investments.',
      content: 'Rental properties can be an excellent investment strategy...',
      category: 'Investment',
      status: 'published',
      author: 'Prolific Properties',
      readTime: '12 min read',
      featuredImage: 'https://images.unsplash.com/photo-1560520031-3a4dc4e9de0c?w=800'
    },
    {
      title: 'Commercial vs Residential Real Estate',
      slug: 'commercial-vs-residential',
      excerpt: 'Comparing investment opportunities in different property types.',
      content: 'When it comes to real estate investing, both commercial and residential...',
      category: 'Investment',
      status: 'published',
      author: 'Prolific Properties',
      readTime: '7 min read',
      featuredImage: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800'
    },
    {
      title: 'Home Renovation Tips That Add Value',
      slug: 'home-renovation-tips',
      excerpt: 'Smart renovations to increase your property value.',
      content: 'Strategic home renovations can significantly boost...',
      category: 'Selling Tips',
      status: 'published',
      author: 'Prolific Properties',
      readTime: '5 min read',
      featuredImage: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800'
    }
  ];

  for (const blog of blogs) {
    await prisma.blog.upsert({
      where: { slug: blog.slug },
      update: blog,
      create: blog
    });
  }
  console.log('Blogs created!');

  console.log('\n✅ Database seeded successfully!');
  console.log('\nAdmin login:');
  console.log('Email: abhilash.panda8383@gmail.com');
  console.log('Password: abhilash8383');
}

main()
  .catch(e => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
