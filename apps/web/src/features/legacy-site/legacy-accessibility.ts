import type { LegacyPageKey } from "./legacy-routes";

export function normalizeLegacyAccessibility(html: string, page: LegacyPageKey) {
  let output = html;

  if (page === "articles") {
    output = output
      .replace(
        '<input type="text" class="search-input" placeholder="ابحث عن مقال...">',
        '<label class="sweed-visually-hidden" for="article-search">ابحث في المدونة</label><input id="article-search" name="articleSearch" type="search" class="search-input" placeholder="ابحث عن مقال..." autocomplete="off">',
      )
      .replace(
        '<button class="search-btn">',
        '<button class="search-btn" type="button" aria-label="تنفيذ البحث في المقالات">',
      )
      .replace(
        '<input type="email" class="newsletter-input" placeholder="أدخل بريدك الإلكتروني">',
        '<label class="sweed-visually-hidden" for="newsletter-email">البريد الإلكتروني للنشرة</label><input id="newsletter-email" name="newsletterEmail" type="email" class="newsletter-input" placeholder="أدخل بريدك الإلكتروني" autocomplete="email">',
      )
      .replace('<button class="newsletter-btn">', '<button class="newsletter-btn" type="button">')
      .replace(
        '<button class="page-arrow"><i class="fas fa-chevron-right"></i></button>',
        '<button class="page-arrow" type="button" aria-label="صفحة المقالات السابقة"><i class="fas fa-chevron-right" aria-hidden="true"></i></button>',
      )
      .replace(
        '<button class="page-arrow"><i class="fas fa-chevron-left"></i></button>',
        '<button class="page-arrow" type="button" aria-label="صفحة المقالات التالية"><i class="fas fa-chevron-left" aria-hidden="true"></i></button>',
      );
  }

  if (page === "offers") {
    output = output
      .replace(
        '<button class="slider-nav prev" onclick="moveSlider(-1)"><i class="fas fa-chevron-right"></i></button>',
        '<button class="slider-nav prev" type="button" aria-label="العرض السابق" onclick="moveSlider(-1)"><i class="fas fa-chevron-right" aria-hidden="true"></i></button>',
      )
      .replace(
        '<button class="slider-nav next" onclick="moveSlider(1)"><i class="fas fa-chevron-left"></i></button>',
        '<button class="slider-nav next" type="button" aria-label="العرض التالي" onclick="moveSlider(1)"><i class="fas fa-chevron-left" aria-hidden="true"></i></button>',
      );
  }

  if (page === "products") {
    output = output
      .replace(
        '<label>نوع المنتج</label>\n                <select>',
        '<label for="product-type-filter">نوع المنتج</label>\n                <select id="product-type-filter" name="productType">',
      )
      .replace(
        '<label>نطاق السعر</label>\n                <select>',
        '<label for="product-price-filter">نطاق السعر</label>\n                <select id="product-price-filter" name="priceRange">',
      )
      .replace(
        '<label>وقت التسليم</label>\n                <select>',
        '<label for="product-delivery-filter">وقت التسليم</label>\n                <select id="product-delivery-filter" name="deliveryTime">',
      )
      .replace(
        '<label>اختر مجال عملك</label>\n                <select id="industry-select"',
        '<label for="industry-select">اختر مجال عملك</label>\n                <select id="industry-select" name="industry"',
      );
  }

  if (page === "portfolio") {
    output = output.replace(
      '<div class="portfolio-grid">',
      '<h2 class="sweed-visually-hidden">مشروعات مختارة</h2>\n            <div class="portfolio-grid">',
    );
  }

  if (/<main\b/i.test(output) && !/<main\b[^>]*\bid=["']main-content["']/i.test(output)) {
    output = output.replace(/<main\b([^>]*)>/i, '<main id="main-content" tabindex="-1"$1>');
  }

  return output;
}
