-- Create inventory categories table
CREATE TABLE IF NOT EXISTS inventory_categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create inventory items table
CREATE TABLE IF NOT EXISTS inventory_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  category_id UUID REFERENCES inventory_categories(id) ON DELETE SET NULL,
  name TEXT NOT NULL,
  description TEXT,
  quantity INTEGER NOT NULL DEFAULT 0,
  min_quantity INTEGER NOT NULL DEFAULT 10,
  unit TEXT NOT NULL DEFAULT 'units',
  status TEXT NOT NULL DEFAULT 'in_stock' CHECK (status IN ('in_stock', 'low_stock', 'out_of_stock')),
  last_restocked TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create inventory transactions table
CREATE TABLE IF NOT EXISTS inventory_transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  item_id UUID REFERENCES inventory_items(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  transaction_type TEXT NOT NULL CHECK (transaction_type IN ('restock', 'use', 'adjustment')),
  quantity_change INTEGER NOT NULL,
  quantity_after INTEGER NOT NULL,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert default categories
INSERT INTO inventory_categories (name, description) VALUES
  ('Food & Beverages', 'Food items, drinks, and snacks'),
  ('Merchandise', 'Souvenirs, toys, and park merchandise'),
  ('Operations', 'Cleaning supplies and operational items'),
  ('Safety Equipment', 'First aid and safety supplies')
ON CONFLICT DO NOTHING;

-- Insert sample inventory items
INSERT INTO inventory_items (category_id, name, description, quantity, min_quantity, unit) 
SELECT 
  c.id,
  items.name,
  items.description,
  items.quantity,
  items.min_quantity,
  items.unit
FROM inventory_categories c
CROSS JOIN LATERAL (
  VALUES
    ('Bottled Water', '500ml bottled water', 150, 50, 'bottles'),
    ('Ice Cream Cups', 'Vanilla ice cream cups', 80, 30, 'cups'),
    ('Cotton Candy', 'Pink and blue cotton candy', 45, 20, 'bags'),
    ('Hot Dogs', 'Hot dogs for concessions', 100, 40, 'pieces')
) AS items(name, description, quantity, min_quantity, unit)
WHERE c.name = 'Food & Beverages'
UNION ALL
SELECT 
  c.id,
  items.name,
  items.description,
  items.quantity,
  items.min_quantity,
  items.unit
FROM inventory_categories c
CROSS JOIN LATERAL (
  VALUES
    ('T-Shirts (S)', 'Sunshine Park branded t-shirts small', 60, 20, 'pieces'),
    ('T-Shirts (M)', 'Sunshine Park branded t-shirts medium', 80, 25, 'pieces'),
    ('Plush Toys', 'Mascot plush toys', 40, 15, 'pieces'),
    ('Key Chains', 'Park logo keychains', 120, 40, 'pieces')
) AS items(name, description, quantity, min_quantity, unit)
WHERE c.name = 'Merchandise'
UNION ALL
SELECT 
  c.id,
  items.name,
  items.description,
  items.quantity,
  items.min_quantity,
  items.unit
FROM inventory_categories c
CROSS JOIN LATERAL (
  VALUES
    ('Cleaning Spray', 'Multi-purpose cleaning spray', 25, 10, 'bottles'),
    ('Trash Bags', 'Large trash bags', 200, 50, 'bags'),
    ('Paper Towels', 'Paper towel rolls', 80, 30, 'rolls'),
    ('Disinfectant', 'Surface disinfectant', 30, 15, 'bottles')
) AS items(name, description, quantity, min_quantity, unit)
WHERE c.name = 'Operations'
UNION ALL
SELECT 
  c.id,
  items.name,
  items.description,
  items.quantity,
  items.min_quantity,
  items.unit
FROM inventory_categories c
CROSS JOIN LATERAL (
  VALUES
    ('First Aid Kits', 'Complete first aid kits', 10, 5, 'kits'),
    ('Band-Aids', 'Assorted adhesive bandages', 500, 100, 'pieces'),
    ('Sunscreen', 'SPF 50 sunscreen bottles', 40, 20, 'bottles'),
    ('Ice Packs', 'Instant cold packs', 50, 20, 'packs')
) AS items(name, description, quantity, min_quantity, unit)
WHERE c.name = 'Safety Equipment'
ON CONFLICT DO NOTHING;

-- Update inventory status based on quantity
UPDATE inventory_items 
SET status = CASE
  WHEN quantity = 0 THEN 'out_of_stock'
  WHEN quantity <= min_quantity THEN 'low_stock'
  ELSE 'in_stock'
END;

-- Enable Row Level Security
ALTER TABLE inventory_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE inventory_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE inventory_transactions ENABLE ROW LEVEL SECURITY;

-- Create policies for authenticated users (staff)
CREATE POLICY "Authenticated users can view categories"
  ON inventory_categories FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can view items"
  ON inventory_items FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can update items"
  ON inventory_items FOR UPDATE
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert items"
  ON inventory_items FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can view transactions"
  ON inventory_transactions FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert transactions"
  ON inventory_transactions FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Create function to update inventory status automatically
CREATE OR REPLACE FUNCTION update_inventory_status()
RETURNS TRIGGER AS $$
BEGIN
  NEW.status := CASE
    WHEN NEW.quantity = 0 THEN 'out_of_stock'
    WHEN NEW.quantity <= NEW.min_quantity THEN 'low_stock'
    ELSE 'in_stock'
  END;
  NEW.updated_at := NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to auto-update status
CREATE TRIGGER trigger_update_inventory_status
  BEFORE UPDATE OF quantity ON inventory_items
  FOR EACH ROW
  EXECUTE FUNCTION update_inventory_status();
