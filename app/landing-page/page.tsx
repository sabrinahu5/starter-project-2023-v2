// Template for company landing page.

import { Button } from "@/components/ui/button";
import { TypographyH1, TypographyH2, TypographyP } from "@/components/ui/typography";

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100 p-2">
      <header className="mb-8">
        <TypographyH1 className="text-center text-4xl font-bold text-gray-800">Welcome to Our Company</TypographyH1>
      </header>
      <main className="flex flex-col items-center">
        <TypographyH2 className="mb-4 text-center text-2xl font-medium text-gray-700">
          We are committed to delivering the best services
        </TypographyH2>
        <TypographyP className="mb-8 max-w-2xl text-center text-gray-600">
          Our company specializes in providing top-notch solutions to meet your needs. We pride ourselves on our
          dedication to quality and customer satisfaction. Explore our website to learn more about what we offer and how
          we can help you achieve your goals.
        </TypographyP>
        <form action="/">
          <Button variant="default" size="lg" className="px-6 py-3" type="submit">
            Go to Home Page
          </Button>
        </form>
      </main>
    </div>
  );
}
