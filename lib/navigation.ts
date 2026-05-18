import type { Dictionary } from "@/lib/i18n/dictionaries";

export function getNavItems(dictionary: Dictionary) {
  const nav = dictionary.nav;
  return [
  { label: nav.home, href: "/" },
  {
    label: nav.ourPrograms,
    href: "/programs",
    children: [
      { label: nav.foodAsMedicine, href: "/food-as-medicine" },
      { label: nav.communityPantry, href: "/community-pantry" },
      { label: nav.resourceSupportCenter, href: "/new-community-resource-support-center" },
      { label: nav.youthVolunteerism, href: "/youth-volunteerism" },
      { label: nav.communityOutreach, href: "/community-outreach" },
      { label: nav.partnerships, href: "/partnerships-programs" },
    ],
  },
  {
    label: nav.aboutUs,
    href: "/about-us",
    children: [{ label: nav.ourHistory, href: "/our-history" }],
  },
  {
    label: nav.joinTheCause,
    href: "/volunteer",
    children: [
      { label: nav.volunteerOpportunities, href: "https://signup.com/group/923356834027" },
      { label: nav.volunteerResources, href: "/volunteer" },
      { label: nav.communityPantryIntake, href: "/community-pantry-intake" },
      { label: nav.joinUs, href: "/join-us" },
      { label: nav.volunteerHours, href: "/volunteer-hours-impact-log" },
    ],
  },
  {
    label: nav.resources,
    href: "/resources",
    children: [
      { label: nav.donations, href: "/donations" },
      { label: nav.blog, href: "/blogs" },
      { label: nav.newsletter, href: "/newsletter" },
      { label: nav.events, href: "/events" },
      { label: nav.testimonials, href: "#testimonials" },
      { label: nav.ourPartners, href: "/our-partners" },
      { label: nav.financials, href: "/financials" },
      { label: nav.surveys, href: "/resources" },
    ],
  },
  { label: dictionary.common.contact, href: "/contact" },
]};

// Extract quick links from navItems for Footer
export const getQuickLinks = (dictionary: Dictionary) => [
  { label: dictionary.nav.ourPrograms, href: "/programs" },
  { label: dictionary.nav.aboutUs, href: "/about-us" },
  { label: dictionary.nav.volunteerResources, href: "/volunteer" },
  { label: dictionary.nav.donations, href: "/donations" },
  { label: dictionary.nav.blog, href: "/blogs" },
  { label: dictionary.common.contact, href: "/contact" },
];

// Extract program links from navItems for Footer
export const getProgramLinks = (dictionary: Dictionary) => {
  const ourProgramsItem = getNavItems(dictionary).find(item => item.href === "/programs");
  return ourProgramsItem?.children?.map(child => ({
    label: child.label,
    href: child.href
  })) || [];
};
