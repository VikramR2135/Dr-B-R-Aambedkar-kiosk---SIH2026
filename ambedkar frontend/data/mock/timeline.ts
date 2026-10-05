import { TimelineEvent } from "@/types";

// Milestones below reflect widely documented, well-known biographical facts.
// Descriptions are intentionally brief summaries for prototype display, not
// exhaustive or sourced historical text. Expand via a verified backend later.

export const mockTimeline: TimelineEvent[] = [
  {
    id: "tl-1891",
    year: 1891,
    yearLabel: "1891",
    title: "Birth in Mhow",
    category: "Early Life",
    description:
      "Bhimrao Ramji Ambedkar was born on 14 April 1891 in Mhow, in the Central Provinces of British India.",
    relatedDocuments: [],
    relatedPeople: [],
    relatedPlaces: ["Mhow"],
  },
  {
    id: "tl-columbia",
    year: 1913,
    yearLabel: "1913–1916",
    title: "Studies at Columbia University",
    category: "Education",
    description:
      "Ambedkar pursued graduate studies in economics and political science at Columbia University, New York.",
    relatedDocuments: [],
    relatedPeople: [],
    relatedPlaces: ["New York, USA"],
  },
  {
    id: "tl-lse",
    year: 1916,
    yearLabel: "1916–1923",
    title: "London School of Economics",
    category: "Education",
    description:
      "He continued his studies in London, later completing further research in economics and law.",
    relatedDocuments: [],
    relatedPeople: [],
    relatedPlaces: ["London, UK"],
  },
  {
    id: "tl-mahad",
    year: 1927,
    yearLabel: "1927",
    title: "Mahad Satyagraha",
    category: "Social Reform",
    description:
      "Ambedkar led the Mahad Satyagraha, asserting the right of the depressed classes to draw water from the public Chavadar Tank.",
    relatedDocuments: ["doc-mahad-satyagraha-address"],
    relatedPeople: [],
    relatedPlaces: ["Mahad, Maharashtra"],
  },
  {
    id: "tl-rtc",
    year: 1930,
    yearLabel: "1930–1932",
    title: "Round Table Conferences",
    category: "Politics",
    description:
      "He represented the depressed classes at the Round Table Conferences in London, arguing for separate political safeguards.",
    relatedDocuments: [],
    relatedPeople: [],
    relatedPlaces: ["London, UK"],
  },
  {
    id: "tl-poona-pact",
    year: 1932,
    yearLabel: "1932",
    title: "Poona Pact",
    category: "Politics",
    description:
      "The Poona Pact was signed between Ambedkar and Gandhi, establishing reserved seats for depressed classes within joint electorates.",
    relatedDocuments: ["doc-letter-to-gandhi"],
    relatedPeople: ["Mahatma Gandhi"],
    relatedPlaces: ["Pune"],
  },
  {
    id: "tl-annihilation",
    year: 1936,
    yearLabel: "1936",
    title: "Annihilation of Caste published",
    category: "Social Reform",
    description:
      "Ambedkar published Annihilation of Caste, originally prepared as an undelivered address on the abolition of caste.",
    relatedDocuments: ["doc-annihilation-of-caste"],
    relatedPeople: [],
    relatedPlaces: [],
  },
  {
    id: "tl-constituent-assembly",
    year: 1947,
    yearLabel: "1947",
    title: "Chairman, Drafting Committee",
    category: "Constitution",
    description:
      "Ambedkar was appointed Chairman of the Constitution Drafting Committee of the Constituent Assembly of India.",
    relatedDocuments: [],
    relatedPeople: [],
    relatedPlaces: ["New Delhi"],
  },
  {
    id: "tl-constitution-adopted",
    year: 1949,
    yearLabel: "26 Nov 1949",
    title: "Constitution of India adopted",
    category: "Constitution",
    description:
      "The Constituent Assembly adopted the Constitution of India, which came into effect on 26 January 1950.",
    relatedDocuments: ["doc-constituent-assembly-speech", "doc-photo-constituent-assembly"],
    relatedPeople: [],
    relatedPlaces: ["New Delhi"],
  },
  {
    id: "tl-conversion",
    year: 1956,
    yearLabel: "Oct 1956",
    title: "Conversion to Buddhism",
    category: "Religion",
    description:
      "Ambedkar converted to Buddhism in a ceremony in Nagpur, along with hundreds of thousands of followers.",
    relatedDocuments: ["doc-buddha-and-his-dhamma"],
    relatedPeople: [],
    relatedPlaces: ["Nagpur"],
  },
  {
    id: "tl-passing",
    year: 1956,
    yearLabel: "6 Dec 1956",
    title: "Passing",
    category: "Legacy",
    description: "Dr. B. R. Ambedkar passed away in Delhi on 6 December 1956.",
    relatedDocuments: [],
    relatedPeople: [],
    relatedPlaces: ["New Delhi"],
  },
];
