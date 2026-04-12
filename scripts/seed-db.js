// Run with: node scripts/seed-db.js
require("dotenv").config({ path: ".env.local" });
const { Pool } = require("pg");
const bcrypt = require("bcryptjs");

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

async function seed() {
  const client = await pool.connect();
  
  try {
    console.log("🔧 Seeding database...\n");
    
    // Create users table
    await client.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log("✅ Users table created");

    // Create listings table
    await client.query(`
      CREATE TABLE IF NOT EXISTS listings (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        slug VARCHAR(255) UNIQUE NOT NULL,
        description TEXT,
        price VARCHAR(50),
        price_type VARCHAR(20) DEFAULT 'sale',
        property_type VARCHAR(50) DEFAULT 'apartment',
        location VARCHAR(255),
        area VARCHAR(50),
        bedrooms INTEGER,
        bathrooms INTEGER,
        status VARCHAR(20) DEFAULT 'active',
        featured BOOLEAN DEFAULT false,
        image_url VARCHAR(500),
        meta_title VARCHAR(255),
        meta_description TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log("✅ Listings table created");

    // Create blogs table
    await client.query(`
      CREATE TABLE IF NOT EXISTS blogs (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        slug VARCHAR(255) UNIQUE NOT NULL,
        excerpt TEXT,
        content TEXT,
        category VARCHAR(100) DEFAULT 'General',
        featured_image VARCHAR(500),
        status VARCHAR(20) DEFAULT 'draft',
        author VARCHAR(100) DEFAULT 'Prolific Properties',
        read_time VARCHAR(20) DEFAULT '5 min read',
        meta_title VARCHAR(255),
        meta_description TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log("✅ Blogs table created");

    // Check if user exists
    const existingUser = await client.query(
      "SELECT id FROM users WHERE email = $1",
      ["abhilash.panda8383@gmail.com"]
    );

    if (existingUser.rows.length === 0) {
      const hashedPassword = await bcrypt.hash("abhilash8383", 10);
      await client.query(
        "INSERT INTO users (email, password) VALUES ($1, $2)",
        ["abhilash.panda8383@gmail.com", hashedPassword]
      );
      console.log("✅ User created: abhilash.panda8383@gmail.com");
    } else {
      console.log("⚠️ User already exists");
    }

    // Seed listings
    const existingListings = await client.query("SELECT COUNT(*) FROM listings");
    if (parseInt(existingListings.rows[0].count) === 0) {
      const listings = [
        {
          title: "Skyline Villa",
          slug: "skyline-villa-patia-bhubaneswar",
          description: "Sunlit bedrooms, premium finishes, and a spacious family layout ready for quick walkthroughs. This stunning villa features modern architecture with ample natural light, a private garden, and premium fixtures throughout.",
          price: "₹1.25 Cr",
          price_type: "sale",
          property_type: "villa",
          location: "Patia, Bhubaneswar",
          area: "2,800 sqft",
          bedrooms: 4,
          bathrooms: 3,
          featured: true,
          image_url: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80",
          meta_title: "Skyline Villa in Patia, Bhubaneswar | 4 BHK | ₹1.25 Cr",
          meta_description: "Premium 4 BHK villa in Patia, Bhubaneswar. 2,800 sqft with modern finishes. Book your site visit today."
        },
        {
          title: "Park View Residency",
          slug: "park-view-residency-kharavela-nagar",
          description: "Modern 3BHK apartment with park view, modular kitchen, and premium amenities. Located in the heart of Kharavela Nagar with easy access to markets and schools.",
          price: "₹85 L",
          price_type: "sale",
          property_type: "apartment",
          location: "Kharavela Nagar, Bhubaneswar",
          area: "1,800 sqft",
          bedrooms: 3,
          bathrooms: 2,
          featured: true,
          image_url: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80",
          meta_title: "Park View Residency | 3 BHK Apartment in Kharavela Nagar | ₹85 L",
          meta_description: "Modern 3BHK apartment with park view in Kharavela Nagar, Bhubaneswar. Premium amenities and excellent connectivity."
        },
        {
          title: "Golden Heights",
          slug: "golden-heights-nayapalli-bhubaneswar",
          description: "A polished rental option with balanced room sizes, reliable maintenance support, and central access. Perfect for families looking for a comfortable stay.",
          price: "₹35,000/mo",
          price_type: "rent",
          property_type: "apartment",
          location: "Nayapalli, Bhubaneswar",
          area: "1,600 sqft",
          bedrooms: 3,
          bathrooms: 2,
          featured: false,
          image_url: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80",
          meta_title: "Golden Heights | 3 BHK Apartment for Rent in Nayapalli | ₹35K/month",
          meta_description: "Spacious 3BHK apartment for rent in Nayapalli, Bhubaneswar. ₹35,000/month with modern amenities."
        },
        {
          title: "Green Valley Plots",
          slug: "green-valley-plots-jharpada",
          description: "RCC road facing plots in a developed locality with clear legal documentation. Ideal for building your dream home with immediate possession available.",
          price: "₹45 L",
          price_type: "sale",
          property_type: "plot",
          location: "Jharpada, Bhubaneswar",
          area: "1,200 sqft",
          bedrooms: null,
          bathrooms: null,
          featured: false,
          image_url: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&q=80",
          meta_title: "Green Valley Plots | 1200 sqft Plot in Jharpada | ₹45 L",
          meta_description: "RCC road facing plots in Jharpada, Bhubaneswar. 1,200 sqft with clear legal documentation. ₹45 Lakhs."
        },
        {
          title: "Emerald Heights Business",
          slug: "emerald-heights-business-cspur",
          description: "Premium office inventory with wider frontage, modern utility planning, and launch-stage commercial pricing support. Perfect for growing businesses.",
          price: "₹2.10 Cr",
          price_type: "sale",
          property_type: "commercial",
          location: "CSPUR, Bhubaneswar",
          area: "3,200 sqft",
          bedrooms: null,
          bathrooms: 2,
          featured: true,
          image_url: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80",
          meta_title: "Emerald Heights Business | Commercial Space in CSPUR | ₹2.10 Cr",
          meta_description: "Premium 3,200 sqft commercial space in CSPUR, Bhubaneswar. Perfect for office or retail. ₹2.10 Crores."
        },
        {
          title: "Tech Hub Office Space",
          slug: "tech-hub-office-space-infopark",
          description: "Fully furnished office space in IT hub with 24/7 power backup and security. Move-in ready with workstations, meeting rooms, and pantry.",
          price: "₹1.5 L/mo",
          price_type: "rent",
          property_type: "commercial",
          location: "Infopark, Bhubaneswar",
          area: "2,000 sqft",
          bedrooms: null,
          bathrooms: 2,
          featured: false,
          image_url: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800&q=80",
          meta_title: "Tech Hub Office Space | Furnished Office for Rent in Infopark | ₹1.5L/mo",
          meta_description: "Fully furnished 2,000 sqft office space for rent in Infopark, Bhubaneswar. 24/7 security and power backup."
        },
      ];

      for (const listing of listings) {
        await client.query(
          `INSERT INTO listings (title, slug, description, price, price_type, property_type, location, area, bedrooms, bathrooms, featured, image_url, meta_title, meta_description)
           VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)`,
          [listing.title, listing.slug, listing.description, listing.price, listing.price_type, listing.property_type, listing.location, listing.area, listing.bedrooms, listing.bathrooms, listing.featured, listing.image_url, listing.meta_title, listing.meta_description]
        );
      }
      console.log("✅ 6 listings seeded");
    } else {
      console.log("⚠️ Listings already exist");
    }

    // Seed blogs
    const existingBlogs = await client.query("SELECT COUNT(*) FROM blogs");
    if (parseInt(existingBlogs.rows[0].count) === 0) {
      const blogs = [
        {
          title: "A Complete Guide to Buying Your First Home in Bhubaneswar",
          slug: "first-home-guide-bhubaneswar-2026",
          excerpt: "From budget planning to site visits - everything first-time buyers need to know about purchasing property in Bhubaneswar.",
          content: `<h2>Why Buy in Bhubaneswar?</h2>
<p>Bhubaneswar, the capital of Odisha, has emerged as one of the fastest-growing real estate markets in Eastern India. With excellent infrastructure, IT hubs, and educational institutions, it's an ideal place to call home.</p>

<h2>Step 1: Set Your Budget</h2>
<p>Before starting your property search, determine your budget. Include:</p>
<ul>
<li>Down payment amount</li>
<li>Home loan eligibility</li>
<li>Additional costs (registration, stamp duty)</li>
</ul>

<h2>Step 2: Choose the Right Location</h2>
<p>Popular areas in Bhubaneswar include:</p>
<ul>
<li><strong>Patia</strong> - Premium villas and apartments</li>
<li><strong>Nayapalli</strong> - Central location with good connectivity</li>
<li><strong>Infopark Area</strong> - IT professionals prefer this area</li>
<li><strong>CSPUR</strong> - Commercial hub with excellent returns</li>
</ul>

<h2>Step 3: Property Verification</h2>
<p>Ensure all documents are verified:</p>
<ul>
<li>Title deed</li>
<li>Encumbrance certificate</li>
<li>Approval plans</li>
<li>Property tax receipts</li>
</ul>

<h2>Step 4: Site Visit Checklist</h2>
<p>During site visits, check:</p>
<ul>
<li>Construction quality</li>
<li>Natural light and ventilation</li>
<li>Neighborhood amenities</li>
<li>Water and electricity supply</li>
</ul>

<h2>Conclusion</h2>
<p>Buying your first home is a significant milestone. Take your time, do thorough research, and don't hesitate to seek professional guidance.</p>`,
          category: "Buying Guide",
          featured_image: "/images/blog-1.jpg",
          status: "published",
          read_time: "8 min read",
          meta_title: "Complete Guide to Buying Your First Home in Bhubaneswar 2026",
          meta_description: "Everything first-time home buyers need to know about purchasing property in Bhubaneswar. Budget planning, location selection, and document verification."
        },
        {
          title: "Top 5 Neighborhoods in Bhubaneswar for Home Buyers",
          slug: "top-neighborhoods-bhubaneswar-2026",
          excerpt: "Exploring the best localities - from Patia to Chandrasekharpur - and what makes each area unique for different buyer needs.",
          content: `<h2>1. Patia - The Premium Choice</h2>
<p>Patia has emerged as one of the most sought-after locations in Bhubaneswar. Known for its:</p>
<ul>
<li>Premium villa projects</li>
<li>Excellent road connectivity</li>
<li>Proximity to Infopark</li>
<li>Modern infrastructure</li>
</ul>

<h2>2. Nayapalli - Central Convenience</h2>
<p>For those who value central location:</p>
<ul>
<li>Close to market areas</li>
<li>Good public transport</li>
<li>Established social infrastructure</li>
<li>Varied property options</li>
</ul>

<h2>3. Kharavela Nagar - Family-Friendly</h2>
<p>Popular among families:</p>
<ul>
<li>Good schools nearby</li>
<li>Parks and recreational areas</li>
<li>Quiet neighborhoods</li>
<li>Affordable options</li>
</ul>

<h2>4. Chandrasekharpur - IT Hub Connectivity</h2>
<p>Perfect for IT professionals:</p>
<ul>
<li>Near major tech parks</li>
<li>Good rental demand</li>
<li>Modern apartments</li>
<li>Excellent returns</li>
</ul>

<h2>5. Infopark Area - Future Growth</h2>
<p>The emerging hotspot:</p>
<ul>
<li>Near IT hub</li>
<li>Appreciating values</li>
<li>Modern developments</li>
<li>Excellent rental yields</li>
</ul>`,
          category: "Market Insights",
          featured_image: "/images/blog-2.jpg",
          status: "published",
          read_time: "6 min read",
          meta_title: "Top 5 Neighborhoods in Bhubaneswar for Home Buyers 2026",
          meta_description: "Discover the best localities in Bhubaneswar for home buyers. From Patia to Infopark, find the perfect neighborhood for your needs."
        },
        {
          title: "Villa or Apartment: Which is Right for You?",
          slug: "villa-vs-apartment-bhubaneswar",
          excerpt: "A detailed comparison of villas and apartments in Bhubaneswar covering lifestyle, investment potential, and maintenance aspects.",
          content: `<h2>Making the Right Choice</h2>
<p>One of the biggest decisions for home buyers is choosing between a villa and an apartment. Let's break down the key factors.</p>

<h2>Villas: Pros</h2>
<ul>
<li>More privacy and space</li>
<li>Garden/yard access</li>
<li>Customization options</li>
<li>No shared walls</li>
</ul>

<h2>Villas: Cons</h2>
<ul>
<li>Higher initial cost</li>
<li>More maintenance responsibility</li>
<li>Security on you</li>
</ul>

<h2>Apartments: Pros</h2>
<ul>
<li>Lower price point</li>
<li>Shared maintenance</li>
<li>Security provided</li>
<li>Amenities access</li>
</ul>

<h2>Apartments: Cons</h2>
<ul>
<li>Less privacy</li>
<li>Shared walls</li>
<li>HOA fees</li>
<li>Space limitations</li>
</ul>`,
          category: "Buying Guide",
          featured_image: "/images/blog-3.jpg",
          status: "published",
          read_time: "5 min read",
          meta_title: "Villa vs Apartment in Bhubaneswar: Which is Right for You?",
          meta_description: "Compare villas and apartments in Bhubaneswar. Pros, cons, lifestyle factors, and investment potential to make the right choice."
        },
        {
          title: "Commercial Real Estate Trends in Bhubaneswar 2026",
          slug: "commercial-real-estate-trends-bhubaneswar-2026",
          excerpt: "Analyzing the growth of commercial spaces, office demand, and retail opportunities in the Odisha capital.",
          content: `<h2>Market Overview</h2>
<p>Bhubaneswar's commercial real estate sector has seen remarkable growth, driven by IT expansion and government initiatives.</p>

<h2>Key Trends</h2>
<h3>1. IT Park Expansion</h3>
<p>With Infopark Phase 2 and 3 in progress, demand for office spaces continues to surge.</p>

<h3>2. Co-working Spaces</h3>
<p>Flexible workspace options are gaining popularity among startups and SMEs.</p>

<h3>3. Retail Revolution</h3>
<p>Mall developments and high street retail are transforming the commercial landscape.</p>

<h2>Investment Outlook</h2>
<p>Commercial properties in Bhubaneswar offer:</p>
<ul>
<li>Higher rental yields (8-12%)</li>
<li>Capital appreciation</li>
<li>Stable tenant base</li>
</ul>`,
          category: "Market Insights",
          featured_image: "/images/blog-4.jpg",
          status: "published",
          read_time: "7 min read",
          meta_title: "Commercial Real Estate Trends in Bhubaneswar 2026",
          meta_description: "Analysis of commercial real estate trends in Bhubaneswar. IT expansion, co-working spaces, retail opportunities, and investment outlook."
        },
        {
          title: "Essential Documents Checklist for Property Purchase",
          slug: "property-documents-checklist-bhubaneswar",
          excerpt: "Don't get caught without these documents. A comprehensive checklist for hassle-free property transactions in Odisha.",
          content: `<h2>Must-Have Documents</h2>
<p>Before finalizing any property purchase, ensure you have all these documents:</p>

<h2>1. Title Documents</h2>
<ul>
<li>Original Title Deed</li>
<li>Chain of Title (previous 30 years)</li>
<li>Sale Agreement</li>
</ul>

<h2>2. Encumbrance Certificate</h2>
<p>Confirms the property is free from any legal dues for the past 13-30 years.</p>

<h2>3. Land Records</h2>
<ul>
<li>Record of Rights (ROR)</li>
<li>Land Schedule</li>
<li>Map Extract</li>
</ul>

<h2>4. Approvals</h2>
<ul>
<li>Building Plan Approval</li>
<li>Occupancy Certificate</li>
<li>NA (Non-Agricultural) Certificate</li>
</ul>

<h2>5. Tax Documents</h2>
<ul>
<li>Property Tax Receipts</li>
<li>Electricity Bill</li>
<li>Water Bill</li>
</ul>`,
          category: "Legal Guide",
          featured_image: "/images/blog-5.jpg",
          status: "draft",
          read_time: "4 min read",
          meta_title: "Essential Documents Checklist for Property Purchase in Bhubaneswar",
          meta_description: "Complete checklist of documents required for property purchase in Bhubaneswar, Odisha. Title deed, encumbrance certificate, approvals, and more."
        },
        {
          title: "The Complete Renter's Guide to Bhubaneswar",
          slug: "renters-guide-bhubaneswar",
          excerpt: "From rental agreements to deposits - everything tenants need to know about renting in Bhubaneswar.",
          content: `<h2>Renting in Bhubaneswar</h2>
<p>Bhubaneswar offers excellent rental options for professionals, families, and students. Here's what you need to know.</p>

<h2>Finding the Right Property</h2>
<ul>
<li>Location based on workplace/school</li>
<li>Budget (typically 15-25% of income)</li>
<li>Amenities required</li>
<li>Transport connectivity</li>
</ul>

<h2>Rental Agreement</h2>
<p>Key points to include:</p>
<ul>
<li>Monthly rent amount</li>
<li>Security deposit</li>
<li>Maintenance charges</li>
<li>Notice period</li>
<li>Terms for renewal</li>
</ul>

<h2>Typical Costs</h2>
<ul>
<li>Security deposit: 2-3 months rent</li>
<li>Advance rent: 1 month</li>
<li>Registration: 1% of annual rent</li>
</ul>`,
          category: "Renting Guide",
          featured_image: "/images/blog-6.jpg",
          status: "published",
          read_time: "6 min read",
          meta_title: "Complete Renter's Guide to Bhubaneswar 2026",
          meta_description: "Everything tenants need to know about renting in Bhubaneswar. Rental agreements, deposits, typical costs, and tips for finding the perfect rental."
        },
      ];

      for (const blog of blogs) {
        await client.query(
          `INSERT INTO blogs (title, slug, excerpt, content, category, featured_image, status, read_time, meta_title, meta_description)
           VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)`,
          [blog.title, blog.slug, blog.excerpt, blog.content, blog.category, blog.featured_image, blog.status, blog.read_time, blog.meta_title, blog.meta_description]
        );
      }
      console.log("✅ 6 blog posts seeded");
    } else {
      console.log("⚠️ Blogs already exist");
    }

    console.log("\n🎉 Database seeding complete!");
    console.log("\n📋 Summary:");
    console.log("  - Users table ready");
    console.log("  - Listings table ready (6 demo listings)");
    console.log("  - Blogs table ready (6 demo posts)");
    console.log("\n🔐 Login: abhilash.panda8383@gmail.com / abhilash8383");

  } catch (error) {
    console.error("❌ Error seeding database:", error);
    throw error;
  } finally {
    client.release();
    await pool.end();
  }
}

seed();
