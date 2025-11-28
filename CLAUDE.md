# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

mybmza (beemerza) is a BMW aftermarket parts e-commerce store for South Africa. Built with Next.js 16, React 19, and Supabase. It features vehicle-specific fitment filtering, allowing customers to find parts that fit their specific BMW model and generation.

## Commands

```bash
npm run dev      # Start development server (localhost:3000)
npm run build    # Production build
npm run lint     # Run ESLint
```

## Architecture

### Data Flow

**Two product systems:**
1. **Curated Products** (`src/data/products.ts`) - Hand-picked store products with detailed fitment data
2. **Supplier Products** (`supplier_products` table) - 1,800+ scraped products from Autostyle and Carbon Sport suppliers, synced via the `inventory-scraper` sibling project

### State Management

Zustand stores with localStorage persistence:
- `useCartStore` - Cart items, persisted as `mybmza-cart`
- `useVehicleStore` - Selected vehicle + garage (saved vehicles), persisted as `mybmza-vehicle`

### BMW Vehicle Hierarchy

```
BMWSeries → BMWGeneration → BMWModel
  └─ 1 Series   └─ F20/F21 (2011-2019)   └─ M135i, M140i
                └─ E87 (2004-2013)        └─ 130i, 135i, 1M
```

Vehicle data in `src/data/bmw-vehicles.ts`. Products declare fitment by referencing series/generation/model IDs.

### Supabase Integration

- **Client**: `src/lib/supabase/client.ts` - Browser client
- **Server**: `src/lib/supabase/server.ts` - SSR client with cookie handling
- **Storage**: `supplier-images` bucket for hosted product images

Key tables:
- `supplier_products` - Scraped supplier inventory with `hosted_images` column
- `supplier_stock_changes` - Stock/price change history
- `supplier_scrape_logs` - Scraper run logs

### Payments

South African payment integrations:
- **PayFast** - `src/lib/payments/payfast.ts`, webhook at `/api/payments/payfast/notify`
- **Yoco** - `src/lib/payments/yoco.ts`, webhook at `/api/payments/yoco/webhook`

### API Routes

Supplier products API:
- `GET /api/supplier-products` - List with filters (`?inStock=true&source=autostyle&model=F30&q=search`)
- `GET /api/supplier-products/[id]` - Single product
- `GET /api/supplier-products/search` - Search by model or query
- `GET /api/supplier-products/stock-changes` - Recent stock/price changes

## Key Types

```typescript
// Vehicle selection for fitment filtering
interface SelectedVehicle {
  seriesId: string;      // "3-series"
  generationId: string;  // "f30-f31-f34"
  modelId: string;       // "320i-f30"
  year: number;          // 2015
}

// Product fitment declaration
interface ProductFitment {
  seriesId: string;
  generationId: string;
  modelIds: string[];    // Empty = all models in generation
  yearStart?: number;
  yearEnd?: number;
}
```

## Related Project

The `inventory-scraper` sibling project (`../inventory-scraper/`) handles:
- Scraping products from autostyle.co.za and carbon-sport.co.za
- Stock monitoring every 30 minutes
- Image upload to Supabase Storage
- Syncing product data to the `supplier_products` table
