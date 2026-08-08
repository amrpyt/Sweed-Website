export type NeedsAnswers = {
  challenge: "direction" | "brand" | "marketing" | "media" | "advertising" | "digital";
  stage: "idea" | "growth" | "redirect";
  timing: "now" | "month" | "later";
};

export type OfferRecommendation = {
  serviceId: "consulting" | "branding" | "digital-marketing" | "media" | "advertising" | "software-development";
  packageId: "direction" | "path" | "partnership";
  serviceLabel: string;
  packageLabel: string;
  note: string;
};

const serviceMap: Record<NeedsAnswers["challenge"], Pick<OfferRecommendation, "serviceId" | "serviceLabel">> = {
  direction: { serviceId: "consulting", serviceLabel: "الاستشارات والتطوير" },
  brand: { serviceId: "branding", serviceLabel: "البراند والهوية" },
  marketing: { serviceId: "digital-marketing", serviceLabel: "التسويق والحملات" },
  media: { serviceId: "media", serviceLabel: "المحتوى المرئي" },
  advertising: { serviceId: "advertising", serviceLabel: "الدعاية والإعلان" },
  digital: { serviceId: "software-development", serviceLabel: "المواقع والحلول الرقمية" },
};

const packageMap: Record<NeedsAnswers["stage"], Pick<OfferRecommendation, "packageId" | "packageLabel">> = {
  idea: { packageId: "path", packageLabel: "بناء المسار" },
  growth: { packageId: "partnership", packageLabel: "شراكة الوصول" },
  redirect: { packageId: "direction", packageLabel: "تحديد الاتجاه" },
};

const timingNote: Record<NeedsAnswers["timing"], string> = {
  now: "لو البداية قريبة، جلسة التشخيص تساعد تثبت النطاق قبل التنفيذ.",
  month: "عندك وقت مناسب للمقارنة وتثبيت النطاق قبل البدء.",
  later: "خد وقتك في المقارنة، وارجع للتشخيص لما تكون جاهز تثبت الاختيار.",
};

export function getOfferRecommendation(answers: NeedsAnswers): OfferRecommendation {
  const service = serviceMap[answers.challenge];
  const pack = packageMap[answers.stage];

  return {
    ...service,
    ...pack,
    note: `ده ترشيح مبدئي مبني على إجاباتك، مش تشخيص نهائي. ${timingNote[answers.timing]}`,
  };
}
