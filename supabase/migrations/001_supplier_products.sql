-- Supplier Products Schema for Inventory Scraper
-- This stores products scraped from Autostyle and Carbon Sport suppliers
-- Separate from main 'products' table which contains curated store products

-- Enable UUID extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create the updated_at trigger function if it doesn't exist
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Supplier products table (scraped inventory)
CREATE TABLE supplier_products (
  id VARCHAR(100) PRIMARY KEY,  -- Format: {source}_{sourceId} e.g., "autostyle_12345"
  source VARCHAR(50) NOT NULL,  -- "autostyle" | "carbon-sport"
  source_id VARCHAR(50) NOT NULL,
  source_url TEXT NOT NULL,

  -- Basic product info
  name VARCHAR(500) NOT NULL,
  slug VARCHAR(500),
  sku VARCHAR(100),
  description TEXT,
  short_description TEXT,

  -- Pricing (in ZAR)
  price DECIMAL(10,2) NOT NULL,
  regular_price DECIMAL(10,2),
  sale_price DECIMAL(10,2),
  on_sale BOOLEAN DEFAULT false,

  -- Stock information
  in_stock BOOLEAN DEFAULT true,
  stock_status VARCHAR(50) DEFAULT 'in_stock',  -- in_stock | out_of_stock | on_backorder
  stock_quantity INTEGER,

  -- Categories
  categories TEXT[] DEFAULT '{}',
  primary_category VARCHAR(255),

  -- Vehicle compatibility (BMW-specific)
  compatibility_makes TEXT[] DEFAULT '{}',
  compatibility_models TEXT[] DEFAULT '{}',  -- E30, F30, G20, etc.
  compatibility_years INTEGER[] DEFAULT '{}',

  -- Images
  images TEXT[] DEFAULT '{}',
  thumbnail TEXT,

  -- Attributes/Specifications
  attributes JSONB DEFAULT '{}',

  -- Metadata
  scraped_at TIMESTAMP WITH TIME ZONE NOT NULL,
  last_stock_check TIMESTAMP WITH TIME ZONE,
  price_history JSONB DEFAULT '[]',

  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Stock changes history
CREATE TABLE supplier_stock_changes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  product_id VARCHAR(100) REFERENCES supplier_products(id) ON DELETE CASCADE,
  change_type VARCHAR(50) NOT NULL,  -- stock_change | price_change

  -- For stock changes
  previous_status VARCHAR(50),
  new_status VARCHAR(50),

  -- For price changes
  previous_price DECIMAL(10,2),
  new_price DECIMAL(10,2),

  changed_at TIMESTAMP WITH TIME ZONE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Scrape run logs
CREATE TABLE supplier_scrape_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  source VARCHAR(50) NOT NULL,
  run_type VARCHAR(50) NOT NULL,  -- full_scrape | stock_check
  started_at TIMESTAMP WITH TIME ZONE NOT NULL,
  completed_at TIMESTAMP WITH TIME ZONE,

  -- Stats
  products_found INTEGER DEFAULT 0,
  products_updated INTEGER DEFAULT 0,
  stock_changes INTEGER DEFAULT 0,
  price_changes INTEGER DEFAULT 0,
  errors INTEGER DEFAULT 0,

  -- Details
  error_details JSONB DEFAULT '[]',

  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX idx_supplier_products_source ON supplier_products(source);
CREATE INDEX idx_supplier_products_in_stock ON supplier_products(in_stock);
CREATE INDEX idx_supplier_products_category ON supplier_products(primary_category);
CREATE INDEX idx_supplier_products_models ON supplier_products USING GIN(compatibility_models);
CREATE INDEX idx_supplier_products_scraped ON supplier_products(scraped_at);
CREATE INDEX idx_supplier_products_last_check ON supplier_products(last_stock_check);

CREATE INDEX idx_stock_changes_product ON supplier_stock_changes(product_id);
CREATE INDEX idx_stock_changes_type ON supplier_stock_changes(change_type);
CREATE INDEX idx_stock_changes_date ON supplier_stock_changes(changed_at);

CREATE INDEX idx_scrape_logs_source ON supplier_scrape_logs(source);
CREATE INDEX idx_scrape_logs_type ON supplier_scrape_logs(run_type);

-- Trigger for updated_at
CREATE TRIGGER update_supplier_products_updated_at
  BEFORE UPDATE ON supplier_products
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- RLS Policies
ALTER TABLE supplier_products ENABLE ROW LEVEL SECURITY;
ALTER TABLE supplier_stock_changes ENABLE ROW LEVEL SECURITY;
ALTER TABLE supplier_scrape_logs ENABLE ROW LEVEL SECURITY;

-- Public read access for supplier products
CREATE POLICY "Supplier products are viewable by everyone" ON supplier_products
  FOR SELECT USING (true);

CREATE POLICY "Stock changes are viewable by everyone" ON supplier_stock_changes
  FOR SELECT USING (true);

CREATE POLICY "Scrape logs are viewable by everyone" ON supplier_scrape_logs
  FOR SELECT USING (true);

-- Service role can do everything (for the stock watcher)
CREATE POLICY "Service role can manage supplier products" ON supplier_products
  FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "Service role can manage stock changes" ON supplier_stock_changes
  FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "Service role can manage scrape logs" ON supplier_scrape_logs
  FOR ALL USING (auth.role() = 'service_role');

-- Helpful views

-- View: In-stock BMW products with model filter
CREATE OR REPLACE VIEW supplier_products_in_stock AS
SELECT * FROM supplier_products
WHERE in_stock = true
ORDER BY scraped_at DESC;

-- View: Recent stock changes (last 7 days)
CREATE OR REPLACE VIEW recent_stock_changes AS
SELECT
  sc.*,
  sp.name as product_name,
  sp.source,
  sp.source_url
FROM supplier_stock_changes sc
JOIN supplier_products sp ON sc.product_id = sp.id
WHERE sc.changed_at > NOW() - INTERVAL '7 days'
ORDER BY sc.changed_at DESC;

-- Function: Search products by BMW model
CREATE OR REPLACE FUNCTION search_supplier_products_by_model(model_code VARCHAR)
RETURNS SETOF supplier_products AS $$
BEGIN
  RETURN QUERY
  SELECT *
  FROM supplier_products
  WHERE
    in_stock = true
    AND (
      model_code = ANY(compatibility_models)
      OR name ILIKE '%' || model_code || '%'
    )
  ORDER BY price ASC;
END;
$$ LANGUAGE plpgsql;

-- Function: Get products needing stock check (not checked in last hour)
CREATE OR REPLACE FUNCTION get_stale_products(hours_threshold INTEGER DEFAULT 1)
RETURNS SETOF supplier_products AS $$
BEGIN
  RETURN QUERY
  SELECT *
  FROM supplier_products
  WHERE last_stock_check < NOW() - (hours_threshold || ' hours')::INTERVAL
     OR last_stock_check IS NULL
  ORDER BY last_stock_check ASC NULLS FIRST;
END;
$$ LANGUAGE plpgsql;
