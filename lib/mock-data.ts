// Static placeholder data for the wireframe pass. Replace with real Prisma
// queries once this layout is approved and backend wiring begins.

export type MockJobType = "full-time" | "part-time" | "contract";

export interface MockJob {
  id: string;
  title: string;
  companyName: string;
  location: string;
  jobType: MockJobType;
  salary: string;
  description: string;
  requiredSkills: string[];
  qualifications: string[];
  experienceRequired: string;
  applicationDeadline: string;
  postedAt: string;
}

export const JOB_TYPE_LABEL: Record<MockJobType, string> = {
  "full-time": "Full-Time",
  "part-time": "Part-Time",
  contract: "Contract",
};

export const MOCK_JOBS: MockJob[] = [
  {
    id: "job-1",
    title: "Senior Process Engineer",
    companyName: "Gulf Energy Systems",
    location: "Abu Dhabi, UAE",
    jobType: "full-time",
    salary: "AED 18,000 - 24,000 / month",
    description:
      "Lead process design and optimization activities for upstream production facilities, working closely with cross-functional engineering teams to deliver safe and efficient plant operations.",
    requiredSkills: ["Process Simulation", "HYSYS", "P&ID Review", "HSE Compliance"],
    qualifications: ["Bachelor's in Chemical Engineering", "PMP a plus"],
    experienceRequired: "8+ years in oil & gas process engineering",
    applicationDeadline: "2026-09-30",
    postedAt: "2026-08-10",
  },
  {
    id: "job-2",
    title: "HSE Officer",
    companyName: "Emirates Petrochem Services",
    location: "Ruwais, UAE",
    jobType: "full-time",
    salary: "AED 9,000 - 12,000 / month",
    description:
      "Monitor site health, safety, and environmental compliance across refinery operations, conduct audits, and deliver toolbox talks to field crews.",
    requiredSkills: ["NEBOSH", "Incident Investigation", "Risk Assessment"],
    qualifications: ["NEBOSH IGC certified", "Diploma in Safety Engineering"],
    experienceRequired: "4+ years in HSE roles within industrial sites",
    applicationDeadline: "2026-09-15",
    postedAt: "2026-08-05",
  },
  {
    id: "job-3",
    title: "Procurement Coordinator",
    companyName: "MAP Petro Emirates Client - Confidential",
    location: "Dubai, UAE",
    jobType: "contract",
    salary: "AED 7,000 - 9,000 / month",
    description:
      "Support the procurement team with vendor coordination, purchase order tracking, and contract documentation for a 12-month project assignment.",
    requiredSkills: ["SAP MM", "Vendor Management", "MS Excel"],
    qualifications: ["Bachelor's degree in Supply Chain or Business"],
    experienceRequired: "3+ years in procurement or supply chain",
    applicationDeadline: "2026-09-05",
    postedAt: "2026-08-12",
  },
  {
    id: "job-4",
    title: "Instrumentation Technician",
    companyName: "Al Bahr Industrial Contracting",
    location: "Sharjah, UAE",
    jobType: "full-time",
    salary: "AED 6,500 - 8,500 / month",
    description:
      "Calibrate, install, and maintain instrumentation and control systems across plant sites, responding to breakdowns and scheduled maintenance work orders.",
    requiredSkills: ["PLC Basics", "Calibration", "DCS Familiarity"],
    qualifications: ["Diploma in Instrumentation or Electronics"],
    experienceRequired: "5+ years hands-on plant experience",
    applicationDeadline: "2026-09-20",
    postedAt: "2026-08-01",
  },
  {
    id: "job-5",
    title: "HR Business Partner",
    companyName: "Falcon Marine Logistics",
    location: "Dubai, UAE",
    jobType: "full-time",
    salary: "AED 14,000 - 17,000 / month",
    description:
      "Partner with department heads to support workforce planning, employee relations, and performance management for a growing logistics operation.",
    requiredSkills: ["Employee Relations", "UAE Labour Law", "Workday"],
    qualifications: ["Bachelor's in HR or Business Administration"],
    experienceRequired: "6+ years in HR business partnering",
    applicationDeadline: "2026-09-25",
    postedAt: "2026-08-08",
  },
  {
    id: "job-6",
    title: "Site Accountant",
    companyName: "Desert Rose Construction",
    location: "Ras Al Khaimah, UAE",
    jobType: "part-time",
    salary: "AED 5,000 - 6,000 / month",
    description:
      "Maintain site-level financial records, process supplier invoices, and reconcile petty cash for an active construction project.",
    requiredSkills: ["Bookkeeping", "Tally / QuickBooks", "Reconciliation"],
    qualifications: ["Bachelor's in Accounting or Finance"],
    experienceRequired: "2+ years in a site or project accounting role",
    applicationDeadline: "2026-09-10",
    postedAt: "2026-08-14",
  },
];

export interface MockAnnouncement {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  type: "job-update" | "event" | "notice";
  publishedAt: string;
}

export const ANNOUNCEMENT_TYPE_LABEL: Record<MockAnnouncement["type"], string> = {
  "job-update": "Job Update",
  event: "Event",
  notice: "Notice",
};

export const MOCK_ANNOUNCEMENTS: MockAnnouncement[] = [
  {
    id: "ann-1",
    title: "New batch of engineering roles now open across Abu Dhabi",
    excerpt:
      "We've partnered with three new energy sector clients to fill process, HSE, and maintenance roles this quarter.",
    content:
      "We've partnered with three new energy sector clients to fill process, HSE, and maintenance roles this quarter. Interested candidates are encouraged to update their profiles and apply directly through the jobs board.",
    type: "job-update",
    publishedAt: "2026-08-12",
  },
  {
    id: "ann-2",
    title: "Walk-in interview day — Dubai office, 28 August",
    excerpt:
      "Join us for an on-site walk-in interview session for logistics and site support roles. Bring an updated CV and ID.",
    content:
      "Join us for an on-site walk-in interview session for logistics and site support roles at our Dubai office on 28 August, 10am - 3pm. Bring an updated CV and a valid Emirates ID or passport.",
    type: "event",
    publishedAt: "2026-08-09",
  },
  {
    id: "ann-3",
    title: "Office hours update for the upcoming public holiday",
    excerpt:
      "Our offices will have adjusted working hours next week. Applications and support requests submitted online will still be processed.",
    content:
      "Our offices will have adjusted working hours next week due to the upcoming public holiday. Applications and support requests submitted online will still be processed, with responses resuming on the next business day.",
    type: "notice",
    publishedAt: "2026-08-03",
  },
];
