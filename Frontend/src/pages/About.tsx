import { useState, useEffect, useRef } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────
interface GitHubUser {
  login: string;
  name: string;
  avatar_url: string;
  bio: string;
  location: string;
  public_repos: number;
  followers: number;
  following: number;
  html_url: string;
  blog: string;
  company: string;
  created_at: string;
}

interface GitHubRepo {
  id: number;
  name: string;
  description: string;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  language: string;
  topics: string[];
  updated_at: string;
}

// ─── Constants ────────────────────────────────────────────────────────────────
const TECH_STACK = [
  { name: "MongoDB", icon: "🍃", color: "from-green-500/20 to-green-600/10 border-green-500/30 text-green-400" },
  { name: "Express.js", icon: "⚡", color: "from-yellow-500/20 to-yellow-600/10 border-yellow-500/30 text-yellow-400" },
  { name: "React", icon: "⚛️", color: "from-cyan-500/20 to-cyan-600/10 border-cyan-500/30 text-cyan-400" },
  { name: "Node.js", icon: "🟢", color: "from-lime-500/20 to-lime-600/10 border-lime-500/30 text-lime-400" },
  { name: "TypeScript", icon: "🔷", color: "from-blue-500/20 to-blue-600/10 border-blue-500/30 text-blue-400" },
  { name: "Tailwind CSS", icon: "🎨", color: "from-teal-500/20 to-teal-600/10 border-teal-500/30 text-teal-400" },
  { name: "Redux", icon: "🔄", color: "from-purple-500/20 to-purple-600/10 border-purple-500/30 text-purple-400" },
  { name: "REST APIs", icon: "🔗", color: "from-orange-500/20 to-orange-600/10 border-orange-500/30 text-orange-400" },
  { name: "JWT Auth", icon: "🔐", color: "from-red-500/20 to-red-600/10 border-red-500/30 text-red-400" },
  { name: "Git", icon: "🐙", color: "from-slate-500/20 to-slate-600/10 border-slate-500/30 text-slate-300" },
];

const LANG_COLORS: Record<string, string> = {
  JavaScript: "bg-yellow-400",
  TypeScript: "bg-blue-400",
  CSS: "bg-purple-400",
  HTML: "bg-orange-400",
  Python: "bg-green-400",
  Java: "bg-red-400",
  default: "bg-slate-400",
};

const E_COMMERCE_PROJECT = {
  name: "E-Commerce Platform",
  description:
    "A full-stack MERN e-commerce application with complete shopping experience — product listings, cart management, secure checkout, order tracking, and an admin dashboard for inventory & order management.",
  tags: ["MongoDB", "Express", "React", "Node.js", "JWT", "Redux", "Stripe"],
  highlights: [
    "User authentication & authorization with JWT",
    "Product search, filter & pagination",
    "Cart & wishlist with persistent state via Redux",
    "Secure payment integration",
    "Admin dashboard — manage products, orders & users",
    "Responsive UI with Tailwind CSS",
  ],
  icon: "🛒",
};

// ─── Helpers ──────────────────────────────────────────────────────────────────
function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

function timeAgo(dateStr: string) {
  const diff = Date.now() - new Date(dateStr).getTime();
  const days = Math.floor(diff / 86400000);
  if (days < 1) return "today";
  if (days < 30) return `${days}d ago`;
  if (days < 365) return `${Math.floor(days / 30)}mo ago`;
  return `${Math.floor(days / 365)}y ago`;
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function AnimatedSection({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const { ref, inView } = useInView();
  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
    >
      {children}
    </div>
  );
}

function StatCard({ value, label }: { value: number | string; label: string }) {
  return (
    <div className="flex flex-col items-center gap-1 px-6 py-4 rounded-2xl bg-white/[0.03] border border-white/[0.07] hover:border-indigo-500/30 hover:bg-indigo-500/5 transition-all duration-300 group cursor-default">
      <span className="text-3xl font-black text-white group-hover:text-indigo-300 transition-colors font-mono tracking-tight">
        {value}
      </span>
      <span className="text-xs text-slate-500 uppercase tracking-widest font-medium">{label}</span>
    </div>
  );
}

function TechBadge({ name, icon, color }: { name: string; icon: string; color: string }) {
  return (
    <div
      className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border bg-gradient-to-br ${color} backdrop-blur-sm hover:scale-105 transition-transform duration-200 cursor-default`}
    >
      <span className="text-base leading-none">{icon}</span>
      <span className="text-sm font-semibold tracking-wide">{name}</span>
    </div>
  );
}

function RepoCard({ repo }: { repo: GitHubRepo }) {
  return (
    <a
      href={repo.html_url}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex flex-col gap-3 p-5 rounded-2xl bg-white/[0.03] border border-white/[0.07] hover:border-indigo-500/30 hover:bg-indigo-500/[0.04] transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-indigo-500/10"
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="text-indigo-400 opacity-60 group-hover:opacity-100 transition-opacity">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
              <path d="M2 2.5A2.5 2.5 0 0 1 4.5 0h8.75a.75.75 0 0 1 .75.75v12.5a.75.75 0 0 1-.75.75h-2.5a.75.75 0 0 1 0-1.5h1.75v-2h-8a1 1 0 0 0-.714 1.7.75.75 0 1 1-1.072 1.05A2.495 2.495 0 0 1 2 11.5Zm10.5-1h-8a1 1 0 0 0-1 1v6.708A2.486 2.486 0 0 1 4.5 9h8Z" />
            </svg>
          </span>
          <span className="font-semibold text-slate-200 group-hover:text-white transition-colors text-sm truncate">
            {repo.name}
          </span>
        </div>
        <span className="text-xs text-slate-600 shrink-0">{timeAgo(repo.updated_at)}</span>
      </div>

      {repo.description && (
        <p className="text-xs text-slate-500 leading-relaxed line-clamp-2">{repo.description}</p>
      )}

      <div className="flex items-center gap-4 mt-auto pt-1">
        {repo.language && (
          <div className="flex items-center gap-1.5">
            <span className={`w-2.5 h-2.5 rounded-full ${LANG_COLORS[repo.language] ?? LANG_COLORS.default}`} />
            <span className="text-xs text-slate-500">{repo.language}</span>
          </div>
        )}
        <div className="flex items-center gap-1 text-xs text-slate-500">
          <span>⭐</span>
          <span>{repo.stargazers_count}</span>
        </div>
        <div className="flex items-center gap-1 text-xs text-slate-500">
          <span>🍴</span>
          <span>{repo.forks_count}</span>
        </div>
      </div>
    </a>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function AboutPage() {
  const [user, setUser] = useState<GitHubUser | null>(null);
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchGitHub() {
      try {
        const [userRes, reposRes] = await Promise.all([
          fetch("https://api.github.com/users/hardipsolanki22"),
          fetch("https://api.github.com/users/hardipsolanki22/repos?sort=updated&per_page=6"),
        ]);
        const userData: GitHubUser = await userRes.json();
        const reposData: GitHubRepo[] = await reposRes.json();
        setUser(userData);
        setRepos(Array.isArray(reposData) ? reposData : []);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    fetchGitHub();
  }, []);

  const joinYear = user ? new Date(user.created_at).getFullYear() : null;

  return (
    <div className="min-h-screen bg-[#060810] text-slate-200 overflow-x-hidden" style={{ fontFamily: "'DM Sans', sans-serif" }}>

      {/* ── Google Fonts ── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@300;400;500;600&family=DM+Mono:wght@300;400&display=swap');
        .font-syne { font-family: 'Syne', sans-serif; }
        .font-mono-dm { font-family: 'DM Mono', monospace; }
        @keyframes spin-slow { to { transform: rotate(360deg); } }
        @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-12px)} }
        @keyframes shimmer { 0%{background-position:0% 50%} 100%{background-position:200% 50%} }
        .spin-slow { animation: spin-slow 10s linear infinite; }
        .float { animation: float 6s ease-in-out infinite; }
        .gradient-text {
          background: linear-gradient(135deg, #818cf8, #34d399, #f472b6);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: shimmer 4s linear infinite;
        }
        .mesh-bg {
          background:
            radial-gradient(ellipse 80% 60% at 70% -10%, rgba(99,102,241,0.15) 0%, transparent 60%),
            radial-gradient(ellipse 60% 50% at -10% 80%, rgba(52,211,153,0.10) 0%, transparent 60%),
            radial-gradient(ellipse 50% 40% at 90% 80%, rgba(244,114,182,0.08) 0%, transparent 60%);
        }
        .grid-bg {
          background-image: linear-gradient(rgba(99,102,241,0.05) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(99,102,241,0.05) 1px, transparent 1px);
          background-size: 56px 56px;
        }
      `}</style>

      {/* ── Grid background ── */}
      <div className="fixed inset-0 grid-bg pointer-events-none z-0" />
      <div className="fixed inset-0 mesh-bg pointer-events-none z-0" />

      {/* ── Navbar ──
      <nav className="fixed top-0 inset-x-0 z-50 border-b border-white/[0.06] backdrop-blur-xl bg-[#060810]/70">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <span className="font-syne font-extrabold text-lg tracking-tight">
            HS<span className="text-indigo-400">.</span>
          </span>
          <div className="flex items-center gap-3">
            <span className="font-mono-dm text-[11px] text-emerald-400 border border-emerald-500/25 bg-emerald-500/8 px-3 py-1 rounded-full tracking-widest uppercase">
              ● Available for work
            </span>
          </div>
        </div>
      </nav> */}

      <main className="relative z-10 max-w-6xl mx-auto px-6 pt-28 pb-24">

        {/* ═══════════════════════════════════════════════════════════════
            HERO
        ════════════════════════════════════════════════════════════════ */}
        <section className="grid lg:grid-cols-2 gap-16 items-center min-h-[80vh] pb-12">

          {/* Left */}
          <div className="space-y-7">
            <div className="inline-flex items-center gap-2.5 text-xs font-mono-dm text-indigo-400 uppercase tracking-widest border border-indigo-500/20 bg-indigo-500/[0.06] px-4 py-2 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
              MERN Stack Developer
            </div>

            <div className="space-y-3">
              <h1 className="font-syne font-extrabold text-5xl xl:text-7xl leading-[0.95] tracking-tight text-white">
                {loading ? (
                  <span className="opacity-30">Loading…</span>
                ) : (
                  <>
                    {user?.name?.split(" ")[0] ?? "Hardip"}{" "}
                    <span className="gradient-text">
                      {user?.name?.split(" ").slice(1).join(" ") ?? "Solanki"}
                    </span>
                  </>
                )}
              </h1>
              <p className="font-mono-dm text-slate-500 text-sm tracking-wide">
                @{user?.login ?? "hardipsolanki22"} · GitHub since {joinYear ?? "…"}
              </p>
            </div>

            <p className="text-slate-400 text-[15px] leading-relaxed max-w-md">
              {user?.bio
                ? user.bio
                : "Passionate full-stack developer crafting scalable web applications with the MERN stack. I love turning complex problems into elegant, user-friendly solutions."}
            </p>

            {/* Meta pills */}
            <div className="flex flex-wrap gap-2">
              {user?.location && (
                <span className="flex items-center gap-1.5 text-xs text-slate-400 bg-white/[0.04] border border-white/[0.07] px-3 py-1.5 rounded-lg">
                  📍 {user.location}
                </span>
              )}
              <span className="flex items-center gap-1.5 text-xs text-slate-400 bg-white/[0.04] border border-white/[0.07] px-3 py-1.5 rounded-lg">
                💼 Open to opportunities
              </span>
              <span className="flex items-center gap-1.5 text-xs text-slate-400 bg-white/[0.04] border border-white/[0.07] px-3 py-1.5 rounded-lg">
                🚀 Building cool stuff
              </span>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap gap-3 pt-2">
              <a
                href={user?.html_url ?? "https://github.com/hardipsolanki22"}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-indigo-500/30"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                  <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
                </svg>
                View GitHub
              </a>
              {user?.blog && (
                <a
                  href={user.blog.startsWith("http") ? user.blog : `https://${user.blog}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-6 py-3 rounded-xl bg-white/[0.04] border border-white/[0.08] hover:border-indigo-500/40 hover:bg-indigo-500/[0.07] text-slate-300 font-semibold text-sm transition-all duration-200 hover:-translate-y-0.5"
                >
                  🌐 Portfolio
                </a>
              )}
              <a
                href="mailto:hardipsolanki22@gmail.com"
                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-white/[0.04] border border-white/[0.08] hover:border-emerald-500/40 hover:bg-emerald-500/[0.07] text-slate-300 font-semibold text-sm transition-all duration-200 hover:-translate-y-0.5"
              >
                ✉️ Contact
              </a>
            </div>
          </div>

          {/* Right — Avatar */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative float">
              {/* Spinning ring */}
              <div className="absolute inset-[-18px] rounded-full spin-slow opacity-60"
                style={{ background: "conic-gradient(from 0deg, #6366f1, #34d399, #f472b6, #6366f1)", padding: "2px" }}>
                <div className="w-full h-full rounded-full bg-[#060810]" />
              </div>

              {/* Avatar */}
              <div className="relative w-64 h-64 xl:w-80 xl:h-80 rounded-full overflow-hidden border-4 border-[#060810] shadow-2xl shadow-indigo-500/20">
                {loading ? (
                  <div className="w-full h-full bg-slate-800 animate-pulse" />
                ) : (
                  <img
                    src={user?.avatar_url}
                    alt={user?.name ?? "Avatar"}
                    className="w-full h-full object-cover"
                  />
                )}
              </div>

              {/* Floating badge */}
              <div className="absolute -bottom-4 -right-4 bg-slate-900 border border-white/10 rounded-2xl px-4 py-2.5 shadow-xl backdrop-blur">
                <p className="font-mono-dm text-[10px] text-slate-500 uppercase tracking-widest">Repos</p>
                <p className="font-syne font-bold text-2xl text-white leading-tight">{user?.public_repos ?? "—"}</p>
              </div>

              {/* Floating followers badge */}
              <div className="absolute -top-4 -left-4 bg-slate-900 border border-white/10 rounded-2xl px-4 py-2.5 shadow-xl backdrop-blur">
                <p className="font-mono-dm text-[10px] text-slate-500 uppercase tracking-widest">Followers</p>
                <p className="font-syne font-bold text-2xl text-white leading-tight">{user?.followers ?? "—"}</p>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════
            STATS ROW
        ════════════════════════════════════════════════════════════════ */}
        <AnimatedSection>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-20">
            <StatCard value={user?.public_repos ?? "…"} label="Repositories" />
            <StatCard value={user?.followers ?? "…"} label="Followers" />
            <StatCard value={user?.following ?? "…"} label="Following" />
            <StatCard value={joinYear ? `${new Date().getFullYear() - joinYear}yr` : "…"} label="On GitHub" />
          </div>
        </AnimatedSection>

        {/* ═══════════════════════════════════════════════════════════════
            ABOUT ME
        ════════════════════════════════════════════════════════════════ */}
        <AnimatedSection>
          <section className="mb-20">
            <SectionLabel text="About Me" emoji="👤" />
            <div className="grid md:grid-cols-5 gap-8 mt-8">
              <div className="md:col-span-3 space-y-4 text-slate-400 text-[15px] leading-relaxed">
                <p>
                  I'm <span className="text-white font-semibold">Hardip Solanki</span>, a dedicated
                  MERN Stack Developer who loves building full-featured web applications from database
                  to deployment. My stack of choice — MongoDB, Express.js, React, and Node.js — gives
                  me the power to own every layer of the product.
                </p>
                <p>
                  I enjoy writing clean, maintainable code with TypeScript and designing intuitive
                  interfaces with Tailwind CSS. I'm passionate about performance, developer experience,
                  and turning ideas into polished products.
                </p>
                <p>
                  Currently focused on sharpening my backend architecture skills and diving deeper
                  into cloud deployments. Always up for interesting projects and collaborations.
                </p>
              </div>
              <div className="md:col-span-2 flex flex-col gap-3">
                {[
                  { label: "Speciality", value: "Full-Stack MERN" },
                  { label: "Focus", value: "Scalable Web Apps" },
                  { label: "Education", value: "Computer Science" },
                  { label: "Status", value: "Open to Work 🟢" },
                ].map((item) => (
                  <div key={item.label} className="flex justify-between items-center py-3 border-b border-white/[0.05]">
                    <span className="font-mono-dm text-xs text-slate-600 uppercase tracking-widest">{item.label}</span>
                    <span className="text-sm text-slate-300 font-medium">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </AnimatedSection>

        {/* ═══════════════════════════════════════════════════════════════
            FEATURED PROJECT — E-COMMERCE
        ════════════════════════════════════════════════════════════════ */}
        <AnimatedSection>
          <section className="mb-20">
            <SectionLabel text="Featured Project" emoji="🚀" />
            <div className="mt-8 relative rounded-3xl border border-indigo-500/20 bg-gradient-to-br from-indigo-500/[0.07] via-transparent to-fuchsia-500/[0.05] p-8 md:p-10 overflow-hidden">
              {/* BG decoration */}
              <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-indigo-500/5 blur-3xl pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-60 h-60 rounded-full bg-fuchsia-500/5 blur-3xl pointer-events-none" />

              <div className="relative grid md:grid-cols-2 gap-10">
                <div className="space-y-5">
                  <div className="flex items-center gap-3">
                    <span className="text-4xl">{E_COMMERCE_PROJECT.icon}</span>
                    <div>
                      <h3 className="font-syne font-bold text-2xl text-white">{E_COMMERCE_PROJECT.name}</h3>
                      <p className="font-mono-dm text-xs text-indigo-400 tracking-widest mt-0.5">MERN Stack Application</p>
                    </div>
                  </div>
                  <p className="text-slate-400 text-sm leading-relaxed">{E_COMMERCE_PROJECT.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {E_COMMERCE_PROJECT.tags.map((tag) => (
                      <span key={tag} className="text-xs font-medium px-3 py-1 rounded-full bg-white/[0.05] border border-white/[0.08] text-slate-300">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <a
                    href={user?.html_url ?? "https://github.com/hardipsolanki22"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm font-semibold text-indigo-400 hover:text-indigo-300 transition-colors group"
                  >
                    View on GitHub
                    <span className="group-hover:translate-x-1 transition-transform">→</span>
                  </a>
                </div>

                <div className="space-y-3">
                  <p className="font-mono-dm text-xs text-slate-600 uppercase tracking-widest mb-4">Key Features</p>
                  {E_COMMERCE_PROJECT.highlights.map((h, i) => (
                    <div key={i} className="flex items-start gap-3 text-sm text-slate-400">
                      <span className="mt-0.5 text-emerald-400 shrink-0">✓</span>
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </AnimatedSection>

        {/* ═══════════════════════════════════════════════════════════════
            TECH STACK
        ════════════════════════════════════════════════════════════════ */}
        <AnimatedSection>
          <section className="mb-20">
            <SectionLabel text="Tech Stack" emoji="⚙️" />
            <div className="mt-8 flex flex-wrap gap-3">
              {TECH_STACK.map((tech, i) => (
                <div key={tech.name} style={{ animationDelay: `${i * 60}ms` }}>
                  <TechBadge {...tech} />
                </div>
              ))}
            </div>
          </section>
        </AnimatedSection>

        {/* ═══════════════════════════════════════════════════════════════
            GITHUB REPOS
        ════════════════════════════════════════════════════════════════ */}
        <AnimatedSection>
          <section className="mb-20">
            <SectionLabel text="Recent Repositories" emoji="📦" />
            {loading ? (
              <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="h-36 rounded-2xl bg-white/[0.03] border border-white/[0.06] animate-pulse" />
                ))}
              </div>
            ) : repos.length > 0 ? (
              <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {repos.map((repo, i) => (
                  <AnimatedSection key={repo.id} delay={i * 80}>
                    <RepoCard repo={repo} />
                  </AnimatedSection>
                ))}
              </div>
            ) : (
              <p className="mt-8 text-slate-500 text-sm">No repositories found.</p>
            )}
          </section>
        </AnimatedSection>

        {/* ═══════════════════════════════════════════════════════════════
            CONTACT / CTA
        ════════════════════════════════════════════════════════════════ */}
        <AnimatedSection>
          <section>
            <div className="rounded-3xl border border-white/[0.07] bg-gradient-to-br from-white/[0.03] to-transparent p-10 md:p-14 text-center relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/5 via-transparent to-emerald-500/5 pointer-events-none" />
              <p className="font-mono-dm text-xs text-slate-600 uppercase tracking-widest mb-4">Let's Connect</p>
              <h2 className="font-syne font-extrabold text-4xl md:text-5xl text-white mb-4 leading-tight">
                Got a project in mind?
              </h2>
              <p className="text-slate-500 text-base mb-8 max-w-lg mx-auto">
                I'm always open to discussing new opportunities, interesting projects, or just chatting about tech.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <a
                  href="mailto:hardipsolanki22@gmail.com"
                  className="flex items-center gap-2 px-8 py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-indigo-500/30"
                >
                  ✉️ Send me an email
                </a>
                <a
                  href={user?.html_url ?? "https://github.com/hardipsolanki22"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-8 py-3.5 rounded-xl bg-white/[0.05] border border-white/[0.08] hover:border-indigo-500/30 text-slate-300 font-semibold text-sm transition-all duration-200 hover:-translate-y-0.5"
                >
                  🐙 GitHub Profile
                </a>
              </div>
            </div>
          </section>
        </AnimatedSection>

        {/* Footer */}
        <footer className="mt-16 pt-8 border-t border-white/[0.05] flex flex-col md:flex-row items-center justify-between gap-3 text-slate-600 text-xs font-mono-dm">
          <span>© {new Date().getFullYear()} {user?.name ?? "Hardip Solanki"}. All rights reserved.</span>
          <span>Built with React · TypeScript · Tailwind CSS</span>
        </footer>
      </main>
    </div>
  );
}

// ─── Section Label ─────────────────────────────────────────────────────────────
function SectionLabel({ text, emoji }: { text: string; emoji: string }) {
  return (
    <div className="flex items-center gap-3">
      <span className="text-xl">{emoji}</span>
      <h2 className="font-syne font-bold text-2xl text-white">{text}</h2>
      <div className="flex-1 h-px bg-gradient-to-r from-white/[0.08] to-transparent ml-2" />
    </div>
  );
}