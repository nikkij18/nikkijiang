import PageReveal from "@/components/PageReveal";
import BackToMap from "@/components/BackToMap";

const serif = { fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'SF Pro Text', sans-serif" };
const dmSans = { fontFamily: "var(--font-dm-sans), sans-serif" };

type Role = { role: string; period: string; bullets: string[]; description?: string };
type Experience = { org: string; type: string; roles: Role[] };

const EXPERIENCES: Experience[] = [
  {
    org: "Healthy Amplified – Mila Health",
    type: "Internship",
    roles: [
      {
        role: "Product Analyst Intern",
        period: "July 2025 — December 2025",
        bullets: [
          "Drove product requirements for an AI clinical assistant platform by segmenting patient and provider features and streamlining demo scheduling workflows. Supported the launch of the CANTAB digital cognitive evaluation product, including user workflows and client success tracking. Generated 100+ leads in federally qualified health centers, advancing digital health tool integration in safety-net healthcare systems.",
        ],
      },
    ],
  },
  {
    org: "Product Space @ Georgetown",
    type: "Student Organization",
    roles: [
      {
        role: "Director of Operations & Finance",
        period: "May 2026 — Present",
        bullets: [
          "Migrated the entire club onto a Jira workflow, redefined existing positions, and created two new board roles to better reflect the team's growth. Manage all finances, client interactions, contracts, and funding. Streamlined team operations over the summer and sourced promotional materials and merch. A highly collaborative role sitting at the intersection of strategy, people, and execution.",
        ],
      },
      {
        role: "Director of Personnel",
        period: "Fall 2025 — May 2026",
        bullets: [
          "Led recruiting efforts and redesigned the fellowship and mentorship process to increase engagement. Organized all social events including the end-of-semester retreat, building a closer club community and growing Product Space's presence on campus.",
        ],
      },
      {
        role: "Senior Product Analyst",
        period: "Spring 2025",
        bullets: [],
      },
      {
        role: "Product Analyst",
        period: "Fall 2025",
        bullets: [],
      },
    ],
  },
  {
    org: "Garde-Robe",
    type: "Contract",
    roles: [
      {
        role: "Contracted Product Manager",
        period: "Fall 2025",
        bullets: [
          "Redesigned user referral system and themed wishlists features for a Gen Z focused fashion app.",
          "Collaborated with engineering team to implement new features on the native platform"
        ],
      },
    ],
  },
  {
    org: "Graduate Management Admissions Council (GMAC)",
    type: "Contract",
    roles: [
      {
        role: "Contracted Product Manager",
        period: "Spring 2025",
        bullets: [
          "MBA program match platform redesign and developed GTM strategy and for a new career advisory product, through synthesizing user research, conducting competitor analysis, and evaulating market trends for 90k+ GMAT test takers and prospective MBA applicants",
        ],
      },
    ],
  },
];

export default function ExperiencePage() {
  return (
    <>
    <PageReveal>
    <main
      className="min-h-screen flex flex-col pt-28 pb-16"
      style={{ paddingLeft: "clamp(2rem, 6vw, 5rem)", paddingRight: "clamp(2rem, 6vw, 5rem)" }}
    >
      <p className="text-xs uppercase tracking-[0.2em] text-neutral-400 mb-6" style={serif}>
        02 — Experience
      </p>

      <h1
        className="font-bold leading-[0.88] uppercase text-neutral-900 mb-10"
        style={{ ...serif, fontSize: "clamp(3.5rem, 8vw, 8rem)" }}
      >
        Experience
      </h1>

      <hr style={{ borderTopWidth: 1, borderColor: "#ddd", marginBottom: "3rem" }} />

      <div className="flex flex-col divide-y divide-neutral-100 max-w-2xl">
        {EXPERIENCES.map((exp) => (
          <div key={exp.org} className="flex flex-col gap-4 py-8">

            {/* Org header */}
            <div className="flex items-baseline justify-between gap-4 flex-wrap">
              <span
                className="font-semibold text-neutral-900"
                style={{ ...serif, fontSize: "clamp(1.1rem, 2vw, 1.4rem)" }}
              >
                {exp.org}
              </span>
              <span
                className="text-xs uppercase tracking-[0.15em] text-pink-400 border border-pink-200 px-2 py-0.5 flex-shrink-0"
                style={serif}
              >
                {exp.type}
              </span>
            </div>

            {/* Roles */}
            <div className="flex flex-col gap-0 pl-4 border-l border-neutral-100">
              {exp.roles.map((r, i) => (
                <div key={r.role} className="relative flex flex-col gap-1 pb-5 last:pb-0">
                  {/* Timeline dot */}
                  <span className="absolute -left-[1.15rem] top-[0.35rem] w-2 h-2 rounded-full border-2 border-pink-300 bg-white" />

                  <div className="flex items-baseline justify-between gap-4 flex-wrap">
                    <span
                      className="font-medium text-neutral-800 leading-snug"
                      style={{ ...dmSans, fontSize: "clamp(0.9rem, 1.3vw, 1.05rem)" }}
                    >
                      {r.role}
                    </span>
                    <span className="text-xs text-neutral-400 uppercase tracking-wider flex-shrink-0" style={serif}>
                      {r.period}
                    </span>
                  </div>

                  {r.bullets.length > 0 && (
                    <p
                      className="text-neutral-500 leading-relaxed mt-1"
                      style={{ ...dmSans, fontSize: "clamp(0.875rem, 1.2vw, 1rem)" }}
                    >
                      {r.bullets.join(" ")}
                    </p>
                  )}
                </div>
              ))}
            </div>

          </div>
        ))}
      </div>
    </main>
    </PageReveal>
    <BackToMap />
    </>
  );
}
