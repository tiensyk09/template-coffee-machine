import { query } from './db';
import { hashPassword } from './auth';

export async function initDatabase() {
  // Signups table
  await query(`
    CREATE TABLE IF NOT EXISTS signups (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email VARCHAR(255) NOT NULL UNIQUE,
      created_at VARCHAR(100) NOT NULL DEFAULT (datetime('now'))
    )
  `);

  // Contact messages table (tin nhắn từ trang Liên hệ)
  await query(`
    CREATE TABLE IF NOT EXISTS contact_messages (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name VARCHAR(255) NOT NULL,
      phone VARCHAR(100),
      email VARCHAR(255),
      subject VARCHAR(255),
      message TEXT NOT NULL,
      status VARCHAR(50) NOT NULL DEFAULT 'new',
      created_at VARCHAR(100) NOT NULL DEFAULT (datetime('now'))
    )
  `);

  // Settings table
  await query(`
    CREATE TABLE IF NOT EXISTS settings (
      \`key\` VARCHAR(255) NOT NULL PRIMARY KEY,
      \`value\` TEXT
    )
  `);

  // Users table
  await query(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username VARCHAR(255) NOT NULL UNIQUE,
      password TEXT NOT NULL,
      display_name TEXT,
      email TEXT,
      phone VARCHAR(100),
      address TEXT,
      role VARCHAR(50) NOT NULL DEFAULT 'member',
      tier VARCHAR(50) NOT NULL DEFAULT 'Free',
      active INTEGER NOT NULL DEFAULT 1,
      created_at VARCHAR(100) NOT NULL DEFAULT (datetime('now'))
    )
  `);

  try {
    await query('ALTER TABLE users ADD COLUMN phone VARCHAR(100)');
  } catch (err) {}

  try {
    await query('ALTER TABLE users ADD COLUMN address TEXT');
  } catch (err) {}

  try {
    await query("ALTER TABLE users ADD COLUMN tier VARCHAR(50) NOT NULL DEFAULT 'Free'");
  } catch (err) {}

  // Alter products table columns if missing
  const productsColumns = [
    { name: 'original_price', type: 'REAL' },
    { name: 'images', type: 'TEXT' },
    { name: 'brand', type: 'VARCHAR(255)' },
    { name: 'origin', type: 'VARCHAR(255)' },
    { name: 'unit', type: "VARCHAR(100) DEFAULT 'Hộp'" },
    { name: 'sold_count', type: 'INTEGER DEFAULT 0' },
    { name: 'view_count', type: 'INTEGER DEFAULT 0' },
    { name: 'rating', type: 'REAL DEFAULT 0' },
    { name: 'is_featured', type: 'INTEGER DEFAULT 0' },
    { name: 'is_flash_sale', type: 'INTEGER DEFAULT 0' },
    { name: 'flash_sale_price', type: 'REAL' },
    { name: 'flash_sale_end', type: 'VARCHAR(100)' },
    { name: 'tags', type: 'TEXT' },
    { name: 'meta_title', type: 'TEXT' },
    { name: 'meta_description', type: 'TEXT' }
  ];

  for (const col of productsColumns) {
    try {
      await query(`ALTER TABLE products ADD COLUMN ${col.name} ${col.type}`);
    } catch (err) {
      // Column might already exist
    }
  }

  // Posts/Changelog table
  await query(`
    CREATE TABLE IF NOT EXISTS posts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      slug VARCHAR(255) NOT NULL UNIQUE,
      title TEXT NOT NULL,
      summary TEXT,
      content TEXT,
      image TEXT,
      author_id INTEGER,
      author_name TEXT,
      status VARCHAR(50) NOT NULL DEFAULT 'draft',
      views INTEGER DEFAULT 0,
      created_at VARCHAR(100) NOT NULL DEFAULT (datetime('now')),
      updated_at VARCHAR(100) NOT NULL DEFAULT (datetime('now'))
    )
  `);

  // Pages table
  await query(`
    CREATE TABLE IF NOT EXISTS pages (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      slug VARCHAR(255) NOT NULL UNIQUE,
      title TEXT NOT NULL,
      description TEXT,
      layout TEXT,
      status VARCHAR(50) NOT NULL DEFAULT 'published',
      created_at VARCHAR(100) NOT NULL DEFAULT (datetime('now')),
      updated_at VARCHAR(100) NOT NULL DEFAULT (datetime('now'))
    )
  `);

  // API Keys table
  await query(`
    CREATE TABLE IF NOT EXISTS api_keys (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      api_key VARCHAR(255) NOT NULL UNIQUE,
      user_id INTEGER NOT NULL,
      created_at VARCHAR(100) NOT NULL DEFAULT (datetime('now'))
    )
  `);

  // File Categories table
  await query(`
    CREATE TABLE IF NOT EXISTS file_categories (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      slug VARCHAR(255) NOT NULL UNIQUE,
      created_at VARCHAR(100) NOT NULL DEFAULT (datetime('now'))
    )
  `);

  // Files table
  await query(`
    CREATE TABLE IF NOT EXISTS files (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name VARCHAR(500) NOT NULL,
      file_type VARCHAR(50),
      url LONGTEXT NOT NULL,
      file_size VARCHAR(50),
      folder VARCHAR(200) DEFAULT 'general',
      uploaded_at VARCHAR(100) NOT NULL DEFAULT (datetime('now')),
      uploaded_by INT,
      description TEXT,
      is_public INT DEFAULT 1,
      downloads INT DEFAULT 0,
      FOREIGN KEY (uploaded_by) REFERENCES users(id) ON DELETE SET NULL
    )
  `);

  // Post Attachments table
  await query(`
    CREATE TABLE IF NOT EXISTS post_attachments (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      post_id INT,
      name VARCHAR(500) NOT NULL,
      original_name VARCHAR(500),
      file_type VARCHAR(100),
      file_size BIGINT DEFAULT 0,
      file_size_label VARCHAR(50),
      url LONGTEXT NOT NULL,
      uploaded_at VARCHAR(100) NOT NULL DEFAULT (datetime('now')),
      uploaded_by INT,
      downloads INT DEFAULT 0,
      FOREIGN KEY (uploaded_by) REFERENCES users(id) ON DELETE SET NULL
    )
  `);

  // Download tokens tracking table
  await query(`
    CREATE TABLE IF NOT EXISTS download_tokens (
      token VARCHAR(200) PRIMARY KEY,
      use_count INT DEFAULT 0,
      expires_at BIGINT NOT NULL
    )
  `);

  // Installed Plugins table — lưu plugin đã cài và config trong DB của website
  await query(`
    CREATE TABLE IF NOT EXISTS installed_plugins (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      version TEXT DEFAULT '1.0.0',
      config TEXT DEFAULT '{}',
      active INTEGER NOT NULL DEFAULT 1,
      installed_at DATETIME DEFAULT (datetime('now'))
    )
  `);


  // ─── E-COMMERCE TABLES ───────────────────────────────────────

  // Shop Categories (danh mục sản phẩm)
  await query(`
    CREATE TABLE IF NOT EXISTS shop_categories (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name VARCHAR(255) NOT NULL,
      slug VARCHAR(255) NOT NULL UNIQUE,
      parent_id INTEGER,
      icon VARCHAR(100),
      image TEXT,
      description TEXT,
      is_active INTEGER DEFAULT 1,
      sort_order INTEGER DEFAULT 0,
      created_at VARCHAR(100) DEFAULT (datetime('now'))
    )
  `);

  // Products (sản phẩm)
  await query(`
    CREATE TABLE IF NOT EXISTS products (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      category_id INTEGER,
      name VARCHAR(255) NOT NULL,
      slug VARCHAR(255) NOT NULL UNIQUE,
      short_description TEXT,
      description TEXT,
      price REAL NOT NULL DEFAULT 0,
      original_price REAL,
      thumbnail TEXT,
      images TEXT,
      brand VARCHAR(255),
      origin VARCHAR(255),
      unit VARCHAR(100) DEFAULT 'Hộp',
      stock INTEGER DEFAULT 0,
      sold_count INTEGER DEFAULT 0,
      view_count INTEGER DEFAULT 0,
      rating REAL DEFAULT 0,
      status VARCHAR(50) DEFAULT 'active',
      is_featured INTEGER DEFAULT 0,
      is_flash_sale INTEGER DEFAULT 0,
      flash_sale_price REAL,
      flash_sale_end VARCHAR(100),
      tags TEXT,
      meta_title TEXT,
      meta_description TEXT,
      created_at VARCHAR(100) DEFAULT (datetime('now')),
      updated_at VARCHAR(100) DEFAULT (datetime('now')),
      FOREIGN KEY (category_id) REFERENCES shop_categories(id) ON DELETE SET NULL
    )
  `);

  // Product Variants (biến thể sản phẩm: Hộp, Vỉ, Chai...)
  await query(`
    CREATE TABLE IF NOT EXISTS product_variants (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      product_id INTEGER NOT NULL,
      name VARCHAR(255) NOT NULL,
      price REAL NOT NULL,
      stock INTEGER DEFAULT 0,
      sort_order INTEGER DEFAULT 0,
      created_at VARCHAR(100) DEFAULT (datetime('now')),
      FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
    )
  `);

  // Product Reviews (đánh giá)
  await query(`
    CREATE TABLE IF NOT EXISTS product_reviews (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      product_id INTEGER NOT NULL,
      order_id INTEGER,
      reviewer_name VARCHAR(255) NOT NULL,
      reviewer_id INTEGER,
      rating INTEGER NOT NULL DEFAULT 5,
      comment TEXT,
      is_verified INTEGER DEFAULT 0,
      created_at VARCHAR(100) DEFAULT (datetime('now')),
      FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
    )
  `);

  // Orders (đơn hàng)
  await query(`
    CREATE TABLE IF NOT EXISTS orders (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      order_code VARCHAR(100) NOT NULL UNIQUE,
      user_id INTEGER,
      customer_name VARCHAR(255) NOT NULL,
      customer_phone VARCHAR(100) NOT NULL,
      customer_email VARCHAR(255),
      shipping_address TEXT NOT NULL,
      shipping_province VARCHAR(255),
      shipping_note TEXT,
      items TEXT NOT NULL,
      subtotal REAL NOT NULL DEFAULT 0,
      discount_amount REAL DEFAULT 0,
      shipping_fee REAL DEFAULT 0,
      total REAL NOT NULL DEFAULT 0,
      coupon_code VARCHAR(100),
      payment_method VARCHAR(50) DEFAULT 'cod',
      payment_status VARCHAR(50) DEFAULT 'pending',
      status VARCHAR(50) DEFAULT 'pending',
      admin_note TEXT,
      created_at VARCHAR(100) DEFAULT (datetime('now')),
      updated_at VARCHAR(100) DEFAULT (datetime('now')),
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
    )
  `);

  // Coupons (mã giảm giá)
  await query(`
    CREATE TABLE IF NOT EXISTS coupons (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      code VARCHAR(100) NOT NULL UNIQUE,
      discount_type VARCHAR(50) NOT NULL DEFAULT 'percent',
      discount_value REAL NOT NULL,
      min_order REAL DEFAULT 0,
      max_discount REAL,
      usage_limit INTEGER,
      usage_count INTEGER DEFAULT 0,
      expires_at VARCHAR(100),
      is_active INTEGER DEFAULT 1,
      created_at VARCHAR(100) DEFAULT (datetime('now'))
    )
  `);

  // Alter tables to add SEO columns dynamically if they do not exist
  const addColumns = [
    { table: 'pages', column: 'meta_title', type: 'TEXT' },
    { table: 'pages', column: 'meta_description', type: 'TEXT' },
    { table: 'pages', column: 'meta_keywords', type: 'TEXT' },
    { table: 'posts', column: 'meta_title', type: 'TEXT' },
    { table: 'posts', column: 'meta_description', type: 'TEXT' },
    { table: 'posts', column: 'meta_keywords', type: 'TEXT' }
  ];

  for (const item of addColumns) {
    try {
      await query(`ALTER TABLE ${item.table} ADD COLUMN ${item.column} ${item.type}`);
      console.log(`Added column ${item.column} to table ${item.table}`);
    } catch (err) {
      // Column already exists or error
    }
  }

  console.log('✅ Database tables created and migrated');
}


export async function seedData(adminPassword, force = false) {
  const passwordToSeed = adminPassword || 'admin123';
  
  // Check if we should force override because the database was previously seeded with Command Code data or Long Chau
  let isCommandCode = false;
  try {
    const existingLogo = await query('SELECT `value` FROM settings WHERE `key` = ?', ['header_logo_text']);
    if (existingLogo.length > 0 && (existingLogo[0].value === 'Command Code' || existingLogo[0].value === 'FPT Long Châu')) {
      isCommandCode = true;
    }
  } catch (e) {
    // Table or settings might not exist yet
  }

  const shouldForce = force || isCommandCode;
  
  // Seed Settings
  const defaultSettings = [
    ['site_title', 'Coffee Machine - Máy pha cà phê chính hãng'],
    ['site_description', 'Coffee Machine chuyên cung cấp máy pha cà phê Espresso, máy xay, máy pha chuyên nghiệp và phụ kiện pha chế chính hãng. Bảo hành 12-24 tháng, hỗ trợ kỹ thuật 24/7.'],
    ['site_keywords', 'máy pha cà phê, máy pha espresso, máy xay cà phê, máy pha tự động, phụ kiện pha chế, coffee machine'],
    ['header_logo_text', 'Coffee Machine'],
    ['header_logo_icon', '☕'],
    ['header_links', JSON.stringify([
      { label: 'Trang chủ', href: '/' },
      { label: 'Giới thiệu', href: '/about' },
      { label: 'Sản phẩm', href: '/products' },
      { label: 'Tin tức', href: '/blog' }
    ])],
    ['footer_copyright', '© 2026 Coffee Machine. All rights reserved. Powered by AutoWeb CMS.'],
    // Liên hệ mạng xã hội (để trống = ẩn icon tương ứng)
    ['social_facebook', ''],
    ['social_zalo', ''],
    ['social_youtube', ''],
    ['social_tiktok', ''],
    ['social_instagram', ''],
    ['social_x', ''],
    ['social_telegram', ''],
    ['social_discord', ''],
    ['social_linkedin', ''],
    ['footer_columns', JSON.stringify([
      {
        title: 'Về chúng tôi',
        links: [
          { label: 'Giới thiệu về chúng tôi', href: '/about' },
          { label: 'Chính sách bảo mật', href: '#' },
          { label: 'Điều khoản sử dụng', href: '#' }
        ]
      },
      {
        title: 'Hỗ trợ khách hàng',
        links: [
          { label: 'Hướng dẫn mua hàng', href: '#' },
          { label: 'Chính sách đổi trả', href: '#' },
          { label: 'Chính sách vận chuyển', href: '#' }
        ]
      }
    ])]
  ];

  for (const [key, val] of defaultSettings) {
    try {
      if (shouldForce) {
        await query('INSERT OR REPLACE INTO settings (`key`, `value`) VALUES (?, ?)', [key, val]);
      } else {
        await query('INSERT OR IGNORE INTO settings (`key`, `value`) VALUES (?, ?)', [key, val]);
      }
    } catch (err) {
      console.error(`Failed to seed setting key ${key}:`, err);
    }
  }

  // Seed default admin and moderator users
  try {
    const adminExists = await query('SELECT id FROM users WHERE username = ?', ['admin']);
    const hashedAdminPw = await hashPassword(passwordToSeed);
    if (adminExists.length === 0) {
      await query(
        'INSERT INTO users (username, password, display_name, email, role, tier, active) VALUES (?, ?, ?, ?, ?, ?, 1)',
        ['admin', hashedAdminPw, 'Administrator', 'admin@coffeemachine.vn', 'admin', 'Enterprise']
      );
      console.log('👑 Default admin user seeded');
    } else if (adminPassword) {
      await query('UPDATE users SET password = ? WHERE username = ?', [hashedAdminPw, 'admin']);
      console.log('👑 Admin user password updated to custom password');
    }

    const modExists = await query('SELECT id FROM users WHERE username = ?', ['moderator']);
    if (modExists.length === 0) {
      const hashedModPw = await hashPassword('mod123');
      await query(
        'INSERT INTO users (username, password, display_name, email, role, tier, active) VALUES (?, ?, ?, ?, ?, ?, 1)',
        ['moderator', hashedModPw, 'Staff Moderator', 'mod@coffeemachine.vn', 'mod', 'Pro']
      );
      console.log('🛡️ Default moderator user seeded');
    }
  } catch (err) {
    console.error('Failed to seed default users:', err);
  }

  // Seed default dynamic pages
  try {
    const pageExists = await query('SELECT id FROM pages WHERE slug = ?', ['about']);
    if (pageExists.length === 0 || shouldForce) {
      const defaultLayout = [
        {
          id: 'b_about_hero',
          type: 'hero',
          visible: true,
          configs: {
            title: 'Đam mê cà phê đích thực',
            description: 'Coffee Machine mang đến máy pha cà phê Espresso, máy xay và phụ kiện pha chế chính hãng cho quán cà phê, văn phòng và người yêu cà phê trên khắp Việt Nam.',
            buttonText: 'Xem sản phẩm',
            buttonLink: '/products'
          }
        },
        {
          id: 'b_about_feat',
          type: 'features',
          visible: true,
          configs: {
            tag: 'GIÁ TRỊ CỐT LÕI',
            title: 'Cam kết máy pha cà phê chính hãng 100%',
            description: 'Thiết bị nhập khẩu chính hãng, bảo hành dài hạn và hỗ trợ kỹ thuật tận tâm.',
            items: [
              { title: 'Chính Hãng 100%', desc: 'Nhập khẩu trực tiếp, đầy đủ hoá đơn và tem bảo hành chính hãng.' },
              { title: 'Bảo Hành Dài Hạn', desc: 'Bảo hành 12-24 tháng, đổi mới trong 7 ngày nếu có lỗi nhà sản xuất.' },
              { title: 'Hỗ Trợ Kỹ Thuật 24/7', desc: 'Đội ngũ kỹ thuật viên tư vấn lắp đặt, vệ sinh và bảo dưỡng máy tận nơi.' }
            ]
          }
        }
      ];
      if (pageExists.length > 0) {
        await query('DELETE FROM pages WHERE slug = ?', ['about']);
      }
      await query(
        'INSERT INTO pages (slug, title, description, layout, status) VALUES (?, ?, ?, ?, ?)',
        ['about', 'Giới thiệu về chúng tôi', 'Coffee Machine với sứ mệnh mang máy pha cà phê và phụ kiện pha chế chính hãng đến với mọi khách hàng.', JSON.stringify(defaultLayout), 'published']
      );
      console.log('📄 Default about page seeded');
    }
  } catch (err) {
    console.error('Failed to seed default pages:', err);
  }

  // Seed default file categories
  try {
    const existingFileCats = await query('SELECT COUNT(*) as cnt FROM file_categories');
    if (existingFileCats[0].cnt === 0) {
      const defaultFileCats = [
        { name: 'Chưa phân loại', slug: 'general' },
        { name: 'Ảnh minh họa', slug: 'images' },
        { name: 'Tài liệu hướng dẫn', slug: 'documents' },
        { name: 'Mã nguồn / Code', slug: 'code' },
        { name: 'Khác', slug: 'other' }
      ];
      for (const c of defaultFileCats) {
        await query('INSERT OR IGNORE INTO file_categories (name, slug) VALUES (?, ?)', [c.name, c.slug]);
      }
      console.log('📁 Default file categories seeded');
    }
  } catch (err) {
    console.error('Failed to seed default file categories:', err);
  }

  // Seed E-Commerce data (shop categories + sample products + coupon)
  try {
    const catCount = await query('SELECT COUNT(*) as cnt FROM shop_categories');
    if (catCount[0].cnt === 0 || shouldForce) {
      if (shouldForce) {
        await query('DELETE FROM shop_categories');
      }
      const defaultCats = [
        { name: 'Máy pha cà phê Espresso', slug: 'may-pha-espresso', icon: '☕', image: 'https://images.unsplash.com/photo-1610889556528-9a770e32642f?auto=format&fit=crop&w=400&q=80', sort_order: 1 },
        { name: 'Máy xay cà phê', slug: 'may-xay-ca-phe', icon: '⚙️', image: 'https://images.unsplash.com/photo-1587734195503-904fca47e0e9?auto=format&fit=crop&w=400&q=80', sort_order: 2 },
        { name: 'Máy pha cà phê chuyên nghiệp', slug: 'may-pha-chuyen-nghiep', icon: '🏆', image: 'https://images.unsplash.com/photo-1516315720917-231ef9acce48?auto=format&fit=crop&w=400&q=80', sort_order: 3 },
        { name: 'Máy pha cà phê nhỏ giọt', slug: 'may-pha-nho-giot', icon: '💧', image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=400&q=80', sort_order: 4 },
        { name: 'Phụ kiện pha chế', slug: 'phu-kien-pha-che', icon: '🥄', image: 'https://images.unsplash.com/photo-1442512595331-e89e73853f31?auto=format&fit=crop&w=400&q=80', sort_order: 5 },
        { name: 'Vệ sinh & bảo dưỡng', slug: 've-sinh-bao-duong', icon: '🧴', image: 'https://images.unsplash.com/photo-1585232351009-aa87416fca90?auto=format&fit=crop&w=400&q=80', sort_order: 6 },
        { name: 'Cốc & dụng cụ pha chế', slug: 'coc-dung-cu', icon: '🍵', image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=400&q=80', sort_order: 7 },
      ];
      for (const c of defaultCats) {
        await query(
          'INSERT OR IGNORE INTO shop_categories (name, slug, icon, image, sort_order) VALUES (?, ?, ?, ?, ?)',
          [c.name, c.slug, c.icon, c.image, c.sort_order]
        );
      }
      console.log('🛍️ Default shop categories seeded');
    }

    const prodCount = await query('SELECT COUNT(*) as cnt FROM products');
    if (prodCount[0].cnt === 0 || shouldForce) {
      if (shouldForce) {
        await query('DELETE FROM products');
        await query('DELETE FROM product_variants');
      }
      const catEspresso = await query("SELECT id FROM shop_categories WHERE slug = 'may-pha-espresso'");
      const catXay = await query("SELECT id FROM shop_categories WHERE slug = 'may-xay-ca-phe'");
      const catChuyenNghiep = await query("SELECT id FROM shop_categories WHERE slug = 'may-pha-chuyen-nghiep'");
      const catNhoGiot = await query("SELECT id FROM shop_categories WHERE slug = 'may-pha-nho-giot'");
      const catPhuKien = await query("SELECT id FROM shop_categories WHERE slug = 'phu-kien-pha-che'");
      const catVeSinh = await query("SELECT id FROM shop_categories WHERE slug = 've-sinh-bao-duong'");

      const catIdEspresso = catEspresso[0]?.id || null;
      const catIdXay = catXay[0]?.id || null;
      const catIdChuyenNghiep = catChuyenNghiep[0]?.id || null;
      const catIdNhoGiot = catNhoGiot[0]?.id || null;
      const catIdPhuKien = catPhuKien[0]?.id || null;
      const catIdVeSinh = catVeSinh[0]?.id || null;

      const sampleProducts = [
        { category_id: catIdEspresso, name: 'Máy pha cà phê Espresso Breville Barista Express', slug: 'breville-barista-express', short_description: 'Máy pha Espresso tích hợp cối xay, áp suất 15 bar, phù hợp gia đình và văn phòng.', price: 17990000, original_price: 19990000, thumbnail: 'https://images.unsplash.com/photo-1596952954288-16862d37405b?auto=format&fit=crop&w=600&q=80', brand: 'Breville', origin: 'Úc', unit: 'Máy', stock: 40, is_featured: 1, is_flash_sale: 1, flash_sale_price: 17990000 },
        { category_id: catIdXay, name: 'Máy xay cà phê Eureka Mignon Specialita', slug: 'eureka-mignon-specialita', short_description: 'Máy xay cà phê chỉnh cữ vô cấp, lưỡi dao 55mm, xay mịn cho Espresso chuẩn barista.', price: 12900000, original_price: null, thumbnail: 'https://images.unsplash.com/photo-1587734195503-904fca47e0e9?auto=format&fit=crop&w=600&q=80', brand: 'Eureka', origin: 'Ý', unit: 'Máy', stock: 55, is_featured: 1 },
        { category_id: catIdChuyenNghiep, name: 'Máy pha cà phê Rancilio Silvia V6', slug: 'rancilio-silvia-v6', short_description: 'Máy pha Espresso bán tự động, boiler đồng, độ bền cao cho quán nhỏ và người sành cà phê.', price: 15900000, original_price: 17200000, thumbnail: 'https://images.unsplash.com/photo-1512568400610-62da28bc8a13?auto=format&fit=crop&w=600&q=80', brand: 'Rancilio', origin: 'Ý', unit: 'Máy', stock: 30, is_featured: 1, is_flash_sale: 1, flash_sale_price: 15900000 },
        { category_id: catIdChuyenNghiep, name: 'Máy pha cà phê Lelit Elizabeth PL92T', slug: 'lelit-elizabeth-pl92t', short_description: 'Máy pha Espresso dual boiler PID, kiểm soát nhiệt chính xác, đẳng cấp chuyên nghiệp.', price: 36900000, original_price: null, thumbnail: 'https://images.unsplash.com/photo-1610889556528-9a770e32642f?auto=format&fit=crop&w=600&q=80', brand: 'Lelit', origin: 'Ý', unit: 'Máy', stock: 20, is_featured: 1 },
        { category_id: catIdNhoGiot, name: 'Máy pha cà phê nhỏ giọt Hario V60 Drip', slug: 'hario-v60-drip', short_description: 'Bộ pha cà phê nhỏ giọt thủ công Hario V60, chiết xuất hương vị tinh tế, thanh sạch.', price: 890000, original_price: 1100000, thumbnail: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=600&q=80', brand: 'Hario', origin: 'Nhật Bản', unit: 'Bộ', stock: 120, is_featured: 1 },
        { category_id: catIdVeSinh, name: 'Combo vệ sinh & bảo dưỡng máy pha cà phê', slug: 'combo-ve-sinh-may-pha', short_description: 'Bột vệ sinh nhóm pha, viên tẩy cặn và dụng cụ vệ sinh chuyên dụng, bảo vệ máy bền lâu.', price: 450000, original_price: 590000, thumbnail: 'https://images.unsplash.com/photo-1585232351009-aa87416fca90?auto=format&fit=crop&w=600&q=80', brand: 'Coffee Machine', origin: 'Việt Nam', unit: 'Bộ', stock: 200, is_featured: 1 }
      ];

      for (const p of sampleProducts) {
        try {
          await query(
            `INSERT OR IGNORE INTO products (category_id, name, slug, short_description, price, original_price, thumbnail, brand, origin, unit, stock, is_featured, is_flash_sale, flash_sale_price, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'active')`,
            [p.category_id, p.name, p.slug, p.short_description, p.price, p.original_price || null, p.thumbnail || null, p.brand || null, p.origin || null, p.unit || 'Kg', p.stock || 0, p.is_featured || 0, p.is_flash_sale || 0, p.flash_sale_price || null]
          );
          // Add variants for each product
          const prod = await query('SELECT id FROM products WHERE slug = ?', [p.slug]);
          if (prod.length > 0) {
            const pid = prod[0].id;
            await query('INSERT INTO product_variants (product_id, name, price, stock) VALUES (?, ?, ?, ?)', [pid, p.unit || 'Kg', p.price, p.stock]);
          }
        } catch (e) { /* ignore duplicate */ }
      }
      console.log('🛒 Sample products seeded');
    }

    // Seed default blog posts
    const postCount = await query('SELECT COUNT(*) as cnt FROM posts');
    if (postCount[0].cnt === 0 || shouldForce) {
      if (shouldForce) {
        await query('DELETE FROM posts');
      }
      
      const defaultPosts = [
        {
          title: '7 yếu tố ảnh hưởng đến chất lượng cà phê Espresso',
          slug: '7-yeu-to-anh-huong-chat-luong-espresso',
          summary: 'Một ly Espresso hoàn hảo phụ thuộc vào nhiều yếu tố. Cùng tìm hiểu 7 yếu tố cốt lõi quyết định hương vị tách cà phê của bạn.',
          content: 'Chất lượng Espresso được quyết định bởi: 1) Độ tươi của hạt cà phê (nên dùng trong 2-4 tuần sau khi rang); 2) Độ mịn khi xay phù hợp với máy; 3) Định lượng bột (thường 18-20g cho một shot đôi); 4) Lực nén (tamping) đều tay khoảng 15-20kg; 5) Nhiệt độ nước ổn định 90-96°C; 6) Áp suất chiết xuất chuẩn 9 bar; 7) Thời gian chiết xuất 25-30 giây. Kiểm soát tốt 7 yếu tố này sẽ cho bạn ly Espresso cân bằng, sánh mịn với lớp crema đẹp mắt.',
          image: 'https://images.unsplash.com/photo-1510707577719-ae7c14805e3a?auto=format&fit=crop&w=800&q=80',
          author_name: 'Barista Coffee Machine'
        },
        {
          title: 'Hướng dẫn vệ sinh máy pha cà phê đúng cách tại nhà',
          slug: 'huong-dan-ve-sinh-may-pha-ca-phe',
          summary: 'Vệ sinh máy pha cà phê định kỳ giúp giữ hương vị thơm ngon và kéo dài tuổi thọ thiết bị. Cùng xem quy trình vệ sinh chuẩn tại nhà.',
          content: 'Vệ sinh máy pha cà phê nên thực hiện theo lịch: Hằng ngày – xả nhóm pha, lau tay pha và vòi đánh sữa sau mỗi lần dùng. Hằng tuần – ngâm tay pha, lưới lọc và vòi steam bằng bột vệ sinh chuyên dụng (backflush). Hằng tháng – tẩy cặn canxi (descaling) cho boiler bằng viên/dung dịch tẩy cặn. Luôn dùng nước lọc để hạn chế đóng cặn. Việc vệ sinh đúng cách giúp cà phê không bị ám mùi dầu cũ và bảo vệ các bộ phận bên trong máy.',
          image: 'https://images.unsplash.com/photo-1521302080334-4bebac2763a6?auto=format&fit=crop&w=800&q=80',
          author_name: 'Barista Coffee Machine'
        },
        {
          title: 'Các kiểu latte art cơ bản cho người mới bắt đầu',
          slug: 'cac-kieu-latte-art-co-ban',
          summary: 'Latte art không chỉ đẹp mắt mà còn thể hiện kỹ thuật đánh sữa chuẩn. Cùng làm quen với những hình latte art cơ bản nhất.',
          content: 'Để tạo latte art, bạn cần đánh sữa đạt độ mịn (microfoam) như sơn bóng, nhiệt độ 60-65°C. Ba hình cơ bản cho người mới: 1) Trái tim – rót sữa vào giữa rồi kéo một đường dứt khoát qua tim; 2) Bông hồng (rosetta) – lắc nhẹ tay để tạo các lớp sóng rồi kéo thẳng; 3) Bông tulip – rót từng ngụm chồng lớp. Bí quyết là giữ ca sữa gần mặt cà phê khi tạo hình và rót đều tay. Luyện tập thường xuyên với sữa tươi nguyên kem sẽ giúp bạn nhanh thành thạo.',
          image: 'https://images.unsplash.com/photo-1541167760496-1628856ab772?auto=format&fit=crop&w=800&q=80',
          author_name: 'Barista Coffee Machine'
        }
      ];

      for (const p of defaultPosts) {
        await query(
          `INSERT INTO posts (slug, title, summary, content, image, author_name, status) VALUES (?, ?, ?, ?, ?, ?, 'published')`,
          [p.slug, p.title, p.summary, p.content, p.image, p.author_name]
        );
      }
      console.log('📝 Sample posts seeded');
    }

    // Seed a sample coupon
    const couponExists = await query("SELECT id FROM coupons WHERE code = 'COFFEE10'");
    if (couponExists.length === 0) {
      await query(
        "INSERT INTO coupons (code, discount_type, discount_value, min_order, max_discount, usage_limit, is_active) VALUES (?, ?, ?, ?, ?, ?, 1)",
        ['COFFEE10', 'percent', 10, 2000000, 2000000, 100]
      );
      console.log('🎟️ Sample coupon COFFEE10 seeded');
    }

  } catch (err) {
    console.error('Failed to seed E-Commerce data:', err);
  }

  console.log('✅ Seed data complete');
}
