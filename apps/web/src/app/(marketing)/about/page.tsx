import { LegacyPage } from "@/features/legacy-site/legacy-page";

export const metadata = {
  title: "من نحن | سويد SWEED — بوصلة مشروعك",
};

export default function AboutPage() {
  return <LegacyPage page="about" presentation="reference" showAdvisor={false} />;
}
