import { FormEvent, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { useSearchParams } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";

const reasons = [
  {
    title: "Legally screened listings",
    copy: "Every shortlist starts with cleaner paperwork checks and more trustworthy guidance.",
  },
  {
    title: "Dedicated relationship support",
    copy: "From first call to final visit, buyers get one clearer point of contact.",
  },
  {
    title: "Transparent pricing conversations",
    copy: "The experience stays readable and honest, without hidden charges buried in the process.",
  },
  {
    title: "Modern site visit planning",
    copy: "Faster scheduling, stronger shortlists, and a smoother search flow from day one.",
  },
];

const tabs = [
  { label: "Buy", value: "buy" },
  { label: "Rent", value: "rent" },
  { label: "Commercial", value: "commercial" },
];

const propertyTypes = [
  { label: "Apartment", value: "apartment" },
  { label: "Villa", value: "villa" },
  { label: "Plot", value: "plot" },
  { label: "Commercial", value: "commercial" },
];

const budgetConfig = {
  buy: { min: 10, max: 500, defaultMin: 40, defaultMax: 150, step: 5 },
  rent: { min: 5, max: 200, defaultMin: 20, defaultMax: 60, step: 5 },
  commercial: { min: 20, max: 700, defaultMin: 60, defaultMax: 300, step: 10 },
};

const formatSaleBudget = (valueInLakhs: number) => {
  if (valueInLakhs >= 100) {
    const valueInCrores = valueInLakhs / 100;
    const formatted = Number.isInteger(valueInCrores)
      ? valueInCrores.toFixed(0)
      : valueInCrores.toFixed(2).replace(/\.00$/, "");

    return `₹${formatted}Cr`;
  }

  return `₹${valueInLakhs}L`;
};

const formatRentBudget = (valueInThousands: number) => `₹${valueInThousands}K`;

const FeaturesSection = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const initialIntent = tabs.find((tab) => tab.value === searchParams.get("intent"))?.value ?? "buy";
  const initialTabIndex = tabs.findIndex((tab) => tab.value === initialIntent);
  const initialType = propertyTypes.find((type) => type.value === searchParams.get("type"))?.value ?? "apartment";
  const initialTypeIndex = propertyTypes.findIndex((type) => type.value === initialType);

  const [activeTab, setActiveTab] = useState(initialTabIndex >= 0 ? initialTabIndex : 0);
  const [activeType, setActiveType] = useState(initialTypeIndex >= 0 ? initialTypeIndex : 0);
  const [locationQuery, setLocationQuery] = useState(searchParams.get("q") ?? "");

  const [minBudget, setMinBudget] = useState(() => {
    const defaultValue = budgetConfig[initialIntent].defaultMin;
    const parsedValue = Number(searchParams.get("min"));
    return Number.isFinite(parsedValue) ? parsedValue : defaultValue;
  });

  const [maxBudget, setMaxBudget] = useState(() => {
    const defaultValue = budgetConfig[initialIntent].defaultMax;
    const parsedValue = Number(searchParams.get("max"));
    return Number.isFinite(parsedValue) ? parsedValue : defaultValue;
  });

  const intent = tabs[activeTab]?.value ?? "buy";
  const budgetMeta = budgetConfig[intent];
  const budgetLabel = useMemo(() => {
    if (intent === "rent") {
      return `${formatRentBudget(minBudget)} — ${formatRentBudget(maxBudget)}`;
    }

    return `${formatSaleBudget(minBudget)} — ${formatSaleBudget(maxBudget)}`;
  }, [intent, maxBudget, minBudget]);

  const handleTabChange = (nextTabIndex: number) => {
    const nextIntent = tabs[nextTabIndex].value;
    const nextBudget = budgetConfig[nextIntent];

    setActiveTab(nextTabIndex);
    setMinBudget(nextBudget.defaultMin);
    setMaxBudget(nextBudget.defaultMax);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setSearchParams({
      intent,
      q: locationQuery.trim(),
      min: String(minBudget),
      max: String(maxBudget),
      type: propertyTypes[activeType].value,
    });

    document.getElementById("listings")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section id="about" className="scroll-mt-24 py-20">
      <div className="container grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="section-label">Why Prolific</span>
          <h2 className="mt-4 text-[clamp(2.6rem,5vw,4.6rem)] leading-[0.95] text-foreground">
            Readable, reliable, and built around your next move.
          </h2>
          <p className="mt-5 max-w-xl text-base leading-7 text-muted-foreground">
            We rebuilt the experience around stronger readability, better contrast, and a more modern blue-led premium feel—without losing the trust a real-estate brand needs.
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {reasons.map((reason, index) => (
              <div key={reason.title} className="rounded-[24px] border border-border bg-surface p-5 shadow-panel">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-soft text-sm font-bold text-primary">
                  0{index + 1}
                </div>
                <h3 className="mt-4 text-2xl leading-tight text-foreground">{reason.title}</h3>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">{reason.copy}</p>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.08 }}
          className="rounded-[32px] bg-gradient-brand p-[1px] shadow-soft"
        >
          <div id="search" className="rounded-[31px] bg-background p-6 md:p-8">
            <div className="flex flex-col gap-2">
              <span className="section-label">Search Properties</span>
              <h3 className="text-[clamp(1.9rem,4.5vw,2.8rem)] leading-tight text-foreground">Set your preferences and let the shortlisting start.</h3>
              <p className="text-sm leading-6 text-muted-foreground">
                Simple filters, stronger contrast, and a cleaner flow for buyers, renters, and commercial clients.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="mt-8 space-y-5">
              <div className="grid gap-2 rounded-[22px] bg-surface-strong p-1 sm:grid-cols-3">
                {tabs.map((tab, index) => (
                  <button
                    key={tab.value}
                    type="button"
                    onClick={() => handleTabChange(index)}
                    className={`rounded-[18px] px-4 py-3 text-xs font-bold uppercase tracking-[0.18em] transition-colors ${
                      activeTab === index ? "bg-primary text-primary-foreground shadow-panel" : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              <Input
                placeholder="Location, project, or locality"
                value={locationQuery}
                onChange={(event) => setLocationQuery(event.target.value)}
              />

              <div>
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <span>Budget range</span>
                  <span className="font-semibold text-primary">{budgetLabel}</span>
                </div>
                <Slider
                  className="mt-4"
                  min={budgetMeta.min}
                  max={budgetMeta.max}
                  step={budgetMeta.step}
                  minStepsBetweenThumbs={1}
                  value={[minBudget, maxBudget]}
                  onValueChange={(nextRange) => {
                    const [nextMin, nextMax] = nextRange;
                    setMinBudget(nextMin);
                    setMaxBudget(nextMax);
                  }}
                  aria-label={["Minimum budget", "Maximum budget"]}
                />
              </div>

              <div>
                <div className="mb-3 text-sm font-medium text-ink-soft">Property type</div>
                <div className="grid gap-3 sm:grid-cols-2">
                  {propertyTypes.map((type, index) => (
                    <button
                      key={type.value}
                      type="button"
                      onClick={() => setActiveType(index)}
                      className={`rounded-2xl border px-4 py-3 text-sm font-semibold transition-colors ${
                        activeType === index
                          ? "border-primary/20 bg-primary-soft text-primary"
                          : "border-border bg-surface text-muted-foreground hover:border-primary/20 hover:text-foreground"
                      }`}
                    >
                      {type.label}
                    </button>
                  ))}
                </div>
              </div>

              <Button type="submit" size="xl" className="w-full">
                Find properties
              </Button>
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturesSection;
