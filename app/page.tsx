import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { TypographyH2, TypographyP } from "@/components/ui/typography";

export default function Home() {
  return (
    <>
      <TypographyH2>Welcome to the T4SG Fall 2023 Deliverable 🎉</TypographyH2>
      <TypographyP>To get started, check out the deliverable instructions below:</TypographyP>
      <Button className="mt-5">
        <Icons.page className="mr-3 h-5 w-5" />
        {/*Replace with link to deliverable instructions*/}
        <a href="https://socialgood.hcs.harvard.edu/" target="_blank">
          Open Deliverable Instructions
        </a>
      </Button>
      <TypographyP>Good luck! We can&apos;t wait to see what you create :)</TypographyP>
    </>
  );
}
