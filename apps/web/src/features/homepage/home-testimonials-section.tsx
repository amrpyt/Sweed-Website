import { aboutPageContent } from "@/content/about-page";
import styles from "./home-testimonials-section.module.css";

export function HomeTestimonialsSection() {
  const testimonials = aboutPageContent.testimonials.items;

  return (
    <section className={styles.section} aria-labelledby="home-testimonials-title">
      <div className={styles.heading}>
        <span>آراء العملاء</span>
        <h2 id="home-testimonials-title">كلام من الناس اللي اشتغلنا معاهم</h2>
        <p>تجارب حقيقية في شريط خفيف؛ مرّر عليه أو قف بالماوس لقراءة كل رأي براحتك.</p>
      </div>

      <div className={styles.marquee} aria-label="آراء العملاء">
        <div className={styles.track}>
          {[0, 1].map((copy) => (
            <div className={styles.group} aria-hidden={copy === 1} key={copy}>
              {testimonials.map((testimonial, index) => (
                <article className={styles.card} key={`${copy}-${testimonial.quote}`}>
                  <span className={styles.quoteMark} aria-hidden="true">“</span>
                  <p>{testimonial.quote}</p>
                  <footer>
                    <span className={styles.avatar} aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
                    <span>
                      <strong>{testimonial.person}</strong>
                      <small>{testimonial.role}</small>
                    </span>
                  </footer>
                </article>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
