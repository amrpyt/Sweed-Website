import Link from "next/link";
import { legacyBreadcrumbs, type LegacyPageKey } from "./legacy-routes";

export function LegacyBreadcrumb({ page }: { page: LegacyPageKey }) {
  const items = legacyBreadcrumbs[page];

  if (!items?.length) {
    return null;
  }

  return (
    <nav className="breadcrumb sweed-legacy-breadcrumb" aria-label="مسار الصفحة">
      <style dangerouslySetInnerHTML={{ __html: legacyBreadcrumbCss }} />
      <div className="breadcrumb-content">
        <Link href="/">الرئيسية</Link>
        {items.map((item) => (
          <span key={`${item.href ?? "current"}-${item.label}`}>
            <i className="fas fa-chevron-left" aria-hidden="true" />
            {item.href ? <Link href={item.href}>{item.label}</Link> : <span>{item.label}</span>}
          </span>
        ))}
      </div>
    </nav>
  );
}

const legacyBreadcrumbCss = `
  .sweed-legacy-breadcrumb {
    width: 100% !important;
    background: #ffffff !important;
    border-top: 1px solid rgba(38, 27, 62, 0.06) !important;
    border-bottom: 1px solid rgba(38, 27, 62, 0.08) !important;
    box-shadow: 0 8px 22px rgba(38, 27, 62, 0.04) !important;
    position: relative !important;
    z-index: 1 !important;
  }

  .sweed-legacy-breadcrumb .breadcrumb-content {
    max-width: 1400px !important;
    width: min(100%, 1400px) !important;
    margin: 0 auto !important;
    padding: 1rem 2rem !important;
    display: flex !important;
    align-items: center !important;
    justify-content: flex-start !important;
    gap: 0.55rem !important;
    color: rgba(38, 27, 62, 0.72) !important;
    font-size: 0.95rem !important;
    font-weight: 700 !important;
    line-height: 1.4 !important;
    overflow: hidden !important;
    white-space: nowrap !important;
  }

  .sweed-legacy-breadcrumb a {
    display: inline-flex !important;
    min-width: 44px !important;
    min-height: 44px !important;
    align-items: center !important;
    color: var(--primary-purple, #261b3e) !important;
    text-decoration: none !important;
  }

  .sweed-legacy-breadcrumb span {
    display: inline-flex !important;
    align-items: center !important;
    gap: 0.55rem !important;
    min-width: 0 !important;
  }

  .sweed-legacy-breadcrumb i,
  .sweed-legacy-breadcrumb span > span {
    color: var(--primary-pink, #ed2062) !important;
  }

  @media (max-width: 768px) {
    .sweed-legacy-breadcrumb .breadcrumb-content {
      padding: 0.75rem 1rem !important;
      font-size: var(--type-small-size, 0.875rem) !important;
    }
  }
`;

