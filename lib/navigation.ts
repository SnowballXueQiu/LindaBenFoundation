export const navItems = [
  { label: "Home", href: "/" },
  {
    label: "Our Programs",
    href: "/programs",
    children: [
      { label: "Food as Medicine", href: "/food-as-medicine" },
      { label: "Community Pantry", href: "/community-pantry" },
      { label: "New Community Resource Support Center", href: "/new-community-resource-support-center" },
      { label: "Youth Volunteerism", href: "/youth-volunteerism" },
      { label: "Community Outreach", href: "/community-outreach" },
      { label: "Partnerships", href: "/partnerships-programs" },
    ],
  },
  {
    label: "About Us",
    href: "/about-us",
    children: [{ label: "Our History", href: "/our-history" }],
  },
  {
    label: "Join the Cause",
    href: "/volunteer",
    children: [
      { label: "Volunteer Opportunities", href: "https://signup.com/group/923356834027" },
      { label: "Volunteer Resources", href: "/volunteer" },
      { label: "Community Pantry Intake", href: "/community-pantry-intake" },
      { label: "Join Us", href: "/join-us" },
      { label: "Volunteer Hours & Impact Log", href: "/volunteer-hours-impact-log" },
    ],
  },
  {
    label: "Resources",
    href: "/resources",
    children: [
      { label: "Donations", href: "/donations" },
      { label: "Blog", href: "#blog" },
      { label: "Newsletter", href: "#" },
      { label: "Upcoming Events", href: "#" },
      { label: "Testimonials", href: "#testimonials" },
      { label: "Our Partners", href: "/our-partners" },
      { label: "Financials", href: "/financials" },
      { label: "Surveys", href: "/resources" },
    ],
  },
  { label: "Contact", href: "/contact" },
];

// Extract quick links from navItems for Footer
export const getQuickLinks = () => [
  { label: "Our Programs", href: navItems.find(item => item.label === "Our Programs")?.href || "/programs" },
  { label: "About Us", href: navItems.find(item => item.label === "About Us")?.href || "/about-us" },
  { label: "Volunteer", href: "#volunteer" },
  { label: "Donate", href: "#donate" },
  { label: "Blog", href: "#blog" },
  { label: "Contact", href: navItems.find(item => item.label === "Contact")?.href || "/contact" },
];

// Extract program links from navItems for Footer
export const getProgramLinks = () => {
  const ourProgramsItem = navItems.find(item => item.label === "Our Programs");
  return ourProgramsItem?.children?.map(child => ({
    label: child.label === "New Community Resource Support Center" ? "Resource Support Center" : child.label,
    href: child.href
  })) || [];
};