import type { Metadata } from 'next';
import { Section, SectionEyebrow } from '@/components/ui/Section';
import { Accordion, type AccordionItem } from '@/components/ui/Accordion';
import { CTA } from '@/components/sections/CTA';
import { FAQSchema } from '@/components/seo/Schema';

export const metadata: Metadata = {
  title: 'FAQ',
  description:
    'Answers on shipping, shelf life, corporate orders, ingredients, allergens, and how Silk is different.',
};

const shipping: AccordionItem[] = [
  { q: 'Where does Silk ship?', a: 'We currently ship same-week across the Bay Area via climate-controlled courier. National cold-chain shipping launches in Q3.' },
  { q: 'How fast can I get a Silk box?', a: 'Bay Area orders placed by 2pm Pacific are eligible for next-day delivery, subject to availability. Bulk corporate orders ship within seven days of approval.' },
  { q: 'How is Silk packaged for transit?', a: 'Every box ships in a magnetic-close keepsake outer, with a custom thermoform tray and phase-change cold pack engineered for 36-hour transit.' },
];

const shelf: AccordionItem[] = [
  { q: 'What is the shelf life?', a: 'Silk maintains peak texture and flavor for 21 days unopened. Refrigeration extends to 30 days. Once opened, we recommend three days.' },
  { q: 'Should it be refrigerated?', a: 'Not required. Silk is shelf-stable at room temperature. Refrigerate only if you want to extend beyond three weeks.' },
  { q: 'Can it be frozen?', a: 'Yes — up to 90 days frozen. Thaw at room temperature for 30 minutes before serving.' },
];

const corporate: AccordionItem[] = [
  { q: 'What is the minimum corporate order?', a: '25 boxes for standard programs. 100 boxes if you want custom-branded packaging.' },
  { q: 'Do you support custom branding?', a: 'Yes. Co-branded sleeves, debossed lids, foil-stamped cards. We deliver a design proof within 48 hours of intake.' },
  { q: 'Are you procurement-ready?', a: 'Yes. NET-30 invoicing, W-9, COI, and vendor onboarding packets are available on request.' },
  { q: 'Can you ship to multiple recipients?', a: 'Yes. Upload a CSV with addresses and dedications. We route, confirm, and report on delivery.' },
];

const ingredients: AccordionItem[] = [
  { q: 'What are the ingredients?', a: 'Phyllo dough (wheat flour, water, oil, salt), cultured European butter, California Kerman pistachios, Sonoma raw honey, cane sugar, lemon, and seasonal aromatics depending on flavor.' },
  { q: 'Where are the pistachios from?', a: 'Single-origin Madera County, California — a fourth-generation family grower. Single varietal: Kerman.' },
  { q: 'Is anything imported?', a: 'Cultured butter from Europe. Spices (saffron, cardamom) from origin growers. Everything else is California-sourced.' },
];

const allergens: AccordionItem[] = [
  { q: 'What are the allergens?', a: 'Silk contains wheat, tree nuts (pistachio, walnut in select flavors), and dairy. Produced in a facility that handles tree nuts.' },
  { q: 'Is it kosher / halal?', a: 'Halal-friendly recipes available on corporate orders. Kosher certification is on our 2026 roadmap.' },
  { q: 'Vegan or gluten-free?', a: 'Not at launch. Both are on our R&D roadmap; talk to us if you need them for a corporate program.' },
];

export default function FAQPage() {
  const groups = [
    { id: 'shipping', title: 'Shipping & delivery', items: shipping },
    { id: 'shelf-life', title: 'Shelf life & storage', items: shelf },
    { id: 'corporate', title: 'Corporate orders', items: corporate },
    { id: 'ingredients', title: 'Ingredients', items: ingredients },
    { id: 'allergens', title: 'Allergens & dietary', items: allergens },
  ];
  const all = groups.flatMap((g) => g.items);

  return (
    <>
      <FAQSchema items={all.map((i) => ({ q: i.q, a: String(i.a) }))} />

      <Section className="pt-20 sm:pt-24 lg:pt-28">
        <div className="mx-auto max-w-[1200px] px-5 sm:px-6 lg:px-8">
          <SectionEyebrow>FAQ</SectionEyebrow>
          <h1 className="mt-5 max-w-3xl font-display text-display-xl balance">
            Everything you'd want to ask before sending.
          </h1>
        </div>
      </Section>

      <Section className="border-t border-line">
        <div className="mx-auto grid max-w-[1200px] gap-14 px-5 sm:px-6 lg:grid-cols-12 lg:px-8">
          <aside className="lg:col-span-3 lg:sticky lg:top-28 lg:self-start">
            <nav aria-label="FAQ sections">
              <ul className="space-y-2 text-sm">
                {groups.map((g) => (
                  <li key={g.id}>
                    <a
                      href={`#${g.id}`}
                      className="text-ink-muted transition-colors hover:text-ink"
                    >
                      {g.title}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </aside>

          <div className="space-y-20 lg:col-span-9">
            {groups.map((g) => (
              <div key={g.id} id={g.id}>
                <h2 className="font-display text-display-md text-ink balance">{g.title}</h2>
                <div className="mt-6">
                  <Accordion items={g.items} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      <CTA
        eyebrow="Still curious?"
        title="Talk to a real human."
        body="Our team responds within one business day. Faster if you say it's urgent."
        primary={{ label: 'Contact us', href: '/contact' }}
        secondary={{ label: 'See process', href: '/process' }}
      />
    </>
  );
}
