import { Button } from "@/components/ui/button";
import { TypographyH1, TypographyH2, TypographyP, TypographyQuote } from "@/components/ui/typography";

export default function AboutUsPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-white p-4">
      <header className="mb-8">
        <TypographyH1 className="text-center text-4xl font-bold text-gray-800">About Us</TypographyH1>
      </header>
      <main className="flex flex-col items-center">
        <section className="mb-8 max-w-3xl text-center">
          <TypographyH2 className="mb-4 text-2xl font-medium text-gray-700">Our Mission</TypographyH2>
          <TypographyP className="text-gray-600">
            Our mission is to deliver exceptional services and solutions that exceed our clients&apos; expectations. We
            are dedicated to innovation, quality, and customer satisfaction.
          </TypographyP>
        </section>
        <section className="mb-8 max-w-3xl text-center">
          <TypographyH2 className="mb-4 text-2xl font-medium text-gray-700">Our Vision</TypographyH2>
          <TypographyP className="text-gray-600">
            We envision a world where our solutions empower businesses to achieve their full potential. We strive to be
            a leader in our industry, setting standards for excellence and integrity.
          </TypographyP>
        </section>
        <section className="mb-8 max-w-3xl text-center">
          <TypographyH2 className="mb-4 text-2xl font-medium text-gray-700">Our Values</TypographyH2>
          <TypographyP className="text-gray-600">
            We believe in:
            <ul className="list-inside list-disc">
              <li>Integrity and honesty in all our dealings</li>
              <li>Commitment to quality and excellence</li>
              <li>Innovation and continuous improvement</li>
              <li>Customer-centric approach</li>
              <li>Collaboration and teamwork</li>
            </ul>
          </TypographyP>
        </section>
        <section className="mb-8 max-w-3xl text-center">
          <TypographyH2 className="mb-4 text-2xl font-medium text-gray-700">Our Team</TypographyH2>
          <TypographyP className="text-gray-600">
            Our team is composed of talented and dedicated professionals who are passionate about what they do. We work
            together to deliver the best results for our clients.
          </TypographyP>
        </section>
        <section className="mb-8 max-w-3xl text-center">
          <TypographyQuote className="text-gray-600">
            &quot;Coming together is a beginning; keeping together is progress; working together is success.&quot; -
            Henry Ford
          </TypographyQuote>
        </section>
        <form action="/">
          <Button variant="default" size="lg" className="px-6 py-3" type="submit">
            Go to Home Page
          </Button>
        </form>
      </main>
    </div>
  );
}
