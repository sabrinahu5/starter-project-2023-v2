import {
  TypographyBlockquote,
  TypographyButton,
  TypographyCaption,
  TypographyCodeBlock,
  TypographyH1,
  TypographyH2,
  TypographyH3,
  TypographyH4,
  TypographyHighlight,
  TypographyKeyboard,
  TypographyList,
  TypographyOverline,
  TypographyP,
  TypographyQuote,
  TypographySubscript,
  TypographySubtitle1,
  TypographySubtitle2,
  TypographySuperscript,
} from "@/components/ui/typography";

export default function Home() {
  return (
    <>
      <TypographyH1>Welcome to the T4SG starter project!</TypographyH1>
      <TypographyH2>Introduction</TypographyH2>
      <TypographyH3>About the Project</TypographyH3>
      <TypographyH4>Features</TypographyH4>
      <TypographyP>
        This starter project is styled with Tailwind CSS and uses shadcn/ui as a component library. Feel free to add
        your own components!
      </TypographyP>
      <TypographyP>
        This page is an unprotected route accessible to anyone who visits the website. Log in to view authenticated
        routes!
      </TypographyP>
      <TypographyBlockquote>
        &quot;This is a blockquote example using the TypographyBlockquote component.&quot;
      </TypographyBlockquote>
      <TypographyList items={["Item 1", "Item 2", "Item 3"]} />
      <TypographyCaption>This is a caption text.</TypographyCaption>
      <TypographyOverline>Overline Text</TypographyOverline>
      <TypographySubtitle1>Subtitle 1</TypographySubtitle1>
      <TypographySubtitle2>Subtitle 2</TypographySubtitle2>
      <TypographyButton>Button Text</TypographyButton>
      <TypographyCodeBlock>{`const example = "This is a code block";`}</TypographyCodeBlock>
      <TypographyHighlight>Highlighted Text</TypographyHighlight>
      <TypographyQuote>&quot;This is a quote using the TypographyQuote component.&quot;</TypographyQuote>
      <TypographyKeyboard>Ctrl + C</TypographyKeyboard>
      <TypographySuperscript>Superscript Text</TypographySuperscript>
      <TypographySubscript>Subscript Text</TypographySubscript>
    </>
  );
}
