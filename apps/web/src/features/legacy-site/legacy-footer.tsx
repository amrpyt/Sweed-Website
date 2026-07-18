import Link from "next/link";
import { homepageContent } from "@/content/homepage";

export function LegacyFooter() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: legacyFooterCss }} />
      <footer className="footer sweed-common-footer">
        <div className="footer-content">
          <div className="footer-section">
            <h3>SWEED</h3>
            <p>نصنع حضورك. نطلق مستقبل عملك عبر التسويق والإعلان والتجارب الرقمية.</p>
            <div className="footer-social">
              <a href={homepageContent.contact.whatsappHref} target="_blank" rel="noreferrer" aria-label="تواصل مع SWEED عبر واتساب">
                <i className="fab fa-whatsapp" />
              </a>
            </div>
          </div>

          <div className="footer-section">
            <h3>روابط سريعة</h3>
            <ul>
              <li><Link href="/#home">الرئيسية</Link></li>
              <li><Link href="/#about">من نحن</Link></li>
              <li><Link href="/#services">خدماتنا</Link></li>
              <li><Link href="/#portfolio">أعمالنا</Link></li>
              <li><Link href="/#offers">العروض</Link></li>
              <li><Link href="/#blog">المقالات</Link></li>
              <li><Link href="/#contact">اتصل بنا</Link></li>
            </ul>
          </div>

          <div className="footer-section">
            <h3>خدماتنا</h3>
            <ul>
              <li><Link href="/services#consulting">الاستشارات</Link></li>
              <li><Link href="/services#branding">البراند والهوية</Link></li>
              <li><Link href="/services#digital-marketing">التسويق الرقمي</Link></li>
              <li><Link href="/services#development">البرمجة والمواقع</Link></li>
            </ul>
          </div>

          <div className="footer-section">
            <h3>تواصل معنا</h3>
            <p><i className="fas fa-phone" /> <a href="tel:+201068274662" dir="ltr">+20 106 827 4662</a></p>
            <p><i className="fas fa-envelope" /> <a href="mailto:info@sweed.com">info@sweed.com</a></p>
            <p><i className="fas fa-map-marker-alt" /> القاهرة، مصر</p>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© 2026 SWEED Marketing & Advertising. جميع الحقوق محفوظة.</p>
        </div>
      </footer>
    </>
  );
}

const legacyFooterCss = `
  .sweed-common-footer {
    background: var(--primary-purple, #261b3e) !important;
    color: var(--white, #ffffff) !important;
    padding: 4rem 0 1.5rem !important;
    margin: 0 !important;
  }

  .sweed-common-footer .footer-content {
    max-width: 1400px !important;
    margin: 0 auto !important;
    padding: 0 2rem !important;
    display: grid !important;
    grid-template-columns: 1.4fr 1fr 1fr 1.15fr !important;
    gap: 2.5rem !important;
  }

  .sweed-common-footer .footer-section h3 {
    color: var(--white, #ffffff) !important;
    font-size: 1.3rem !important;
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

  .sweed-common-footer .footer-section ul {
    list-style: none !important;
    padding: 0 !important;
    margin: 0 !important;
    display: grid !important;
    gap: 0.55rem !important;
  }

  .sweed-common-footer .footer-social {
    display: flex !important;
    gap: 0.65rem !important;
    margin-top: 1.2rem !important;
  }

  .sweed-common-footer .footer-social a {
    width: 38px !important;
    height: 38px !important;
    display: inline-flex !important;
    align-items: center !important;
    justify-content: center !important;
    border-radius: 50% !important;
    background: rgba(255, 255, 255, 0.1) !important;
    color: var(--white, #ffffff) !important;
  }

  .sweed-common-footer .footer-bottom {
    max-width: 1400px !important;
    margin: 2.5rem auto 0 !important;
    padding: 1.2rem 2rem 0 !important;
    border-top: 1px solid rgba(255, 255, 255, 0.14) !important;
    text-align: center !important;
    color: rgba(255, 255, 255, 0.72) !important;
  }

  @media (max-width: 900px) {
    .sweed-common-footer .footer-content {
      grid-template-columns: 1fr !important;
      gap: 1.8rem !important;
      padding: 0 1.25rem !important;
    }
  }
`;
