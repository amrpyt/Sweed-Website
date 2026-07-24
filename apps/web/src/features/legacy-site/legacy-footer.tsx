import Link from "next/link";
import { homepageContent } from "@/content/homepage";
import { footerQuickLinks } from "./legacy-header.config";

export function LegacyFooter() {
  const contact = homepageContent.contact;

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: legacyFooterCss }} />
      <footer className="footer sweed-common-footer">
        <div className="footer-content">
          <div className="footer-section footer-brand">
            <h3>SWEED</h3>
            <p>{homepageContent.footer.description}</p>
            <div className="footer-social">
              <a href={contact.whatsappHref} target="_blank" rel="noreferrer" aria-label="تواصل مع SWEED عبر واتساب">
                <i className="fab fa-whatsapp" aria-hidden="true" />
              </a>
            </div>
          </div>

          <div className="footer-section">
            <h3>روابط سريعة</h3>
            <ul>
              {footerQuickLinks.map((item) => (
                <li key={item.href}>
                  <Link href={item.href}>{item.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-section">
            <h3>خدماتنا</h3>
            <ul>
              <li><Link href="/services#consulting">الاستشارات</Link></li>
              <li><Link href="/services#branding">الهوية البصرية</Link></li>
              <li><Link href="/services#digital-marketing">التسويق الرقمي</Link></li>
              <li><Link href="/services#development">البرمجة والتطوير</Link></li>
              <li><Link href="/services#advertising">الدعاية والإعلان</Link></li>
              <li><Link href="/services#media">إنتاج الميديا</Link></li>
            </ul>
          </div>

          <div className="footer-section">
            <h3>تواصل معانا</h3>
            <p><i className="fas fa-phone" aria-hidden="true" /> <a href={`tel:${contact.phone.replace(/\s/g, "")}`} dir="ltr">{contact.phone}</a></p>
            <p><i className="fas fa-envelope" aria-hidden="true" /> <a href={`mailto:${contact.email}`}>{contact.email}</a></p>
            <p><i className="fas fa-map-marker-alt" aria-hidden="true" /> {contact.location}</p>
          </div>

          <div className="footer-section">
            <h3>قانوني</h3>
            <ul>
              <li><Link href="/privacy">سياسة الخصوصية</Link></li>
              <li><Link href="/terms">شروط الاستخدام</Link></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>{homepageContent.footer.rights}</p>
        </div>
      </footer>
    </>
  );
}

const legacyFooterCss = `
  .sweed-common-footer {
    background: var(--primary-purple, #261b3e) !important;
    color: var(--white, #ffffff) !important;
    padding: 4.5rem 0 1.5rem !important;
    margin: 0 !important;
  }

  .sweed-common-footer .footer-content {
    max-width: 1400px !important;
    margin: 0 auto !important;
    padding: 0 2rem !important;
    display: grid !important;
    grid-template-columns: minmax(240px, 1.45fr) repeat(4, minmax(140px, 1fr)) !important;
    gap: 2.25rem !important;
  }

  .sweed-common-footer .footer-section h3 {
    color: var(--white, #ffffff) !important;
    font-size: 1.15rem !important;
    margin: 0 0 1rem !important;
    font-weight: 800 !important;
  }

  .sweed-common-footer .footer-section p,
  .sweed-common-footer .footer-section li,
  .sweed-common-footer .footer-section a {
    color: rgba(255, 255, 255, 0.82) !important;
    line-height: 1.8 !important;
    text-decoration: none !important;
  }

  .sweed-common-footer .footer-brand p {
    max-width: 38ch !important;
  }

  .sweed-common-footer .footer-section ul {
    list-style: none !important;
    padding: 0 !important;
    margin: 0 !important;
    display: grid !important;
    gap: 0.45rem !important;
  }

  .sweed-common-footer .footer-section a:hover,
  .sweed-common-footer .footer-section a:focus-visible {
    color: #ffffff !important;
    text-decoration: underline !important;
    text-underline-offset: 0.25rem !important;
  }

  .sweed-common-footer .footer-section a:focus-visible {
    outline: 2px solid rgba(237, 32, 98, 0.7) !important;
    outline-offset: 3px !important;
  }

  .sweed-common-footer .footer-social {
    display: flex !important;
    gap: 0.65rem !important;
    margin-top: 1.2rem !important;
  }

  .sweed-common-footer .footer-social a {
    width: 42px !important;
    height: 42px !important;
    display: inline-flex !important;
    align-items: center !important;
    justify-content: center !important;
    border-radius: 50% !important;
    background: #ed2062 !important;
    color: var(--white, #ffffff) !important;
  }

  .sweed-common-footer .footer-bottom {
    max-width: 1400px !important;
    margin: 2.5rem auto 0 !important;
    padding: 1.2rem 2rem 0 !important;
    border-top: 1px solid rgba(255, 255, 255, 0.14) !important;
    text-align: center !important;
  }

  .sweed-common-footer .footer-bottom p {
    color: rgba(255, 255, 255, 0.72) !important;
  }

  @media (max-width: 1100px) {
    .sweed-common-footer .footer-content {
      grid-template-columns: repeat(3, minmax(0, 1fr)) !important;
    }

    .sweed-common-footer .footer-brand {
      grid-column: 1 / -1 !important;
    }
  }

  @media (max-width: 720px) {
    .sweed-common-footer .footer-content {
      grid-template-columns: 1fr !important;
      gap: 1.8rem !important;
      padding: 0 1.25rem !important;
    }

    .sweed-common-footer .footer-brand {
      grid-column: auto !important;
    }
  }
`;
