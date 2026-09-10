import { ProfileAvatar } from "@/components/profile-avatar"
import { site } from "@/lib/site"

const tags = ["DevOps", "Containers", "DSPM / DLP", "Cloud Security"]

const stats = [
  { value: site.years, label: "Years" },
  { value: "8+", label: "Industries" },
  { value: `${site.domains}`, label: "Domains" },
  { value: "1", label: "Published Book" },
]

export function HeroIntro() {
  return (
    <div className="container-page flex w-full flex-col items-center gap-16 py-16 xl:flex-row xl:items-center xl:justify-center xl:gap-32 xl:py-24">
      <ProfileAvatar
        src="/zodi.jpg"
        alt="Zodi Tagedini"
        initials="ZT"
        className="size-72 sm:size-96 lg:size-[28rem] xl:size-[28rem]"
      />
      <div className="max-w-[38rem] space-y-7 text-center xl:text-left">
        <p className="text-sm font-semibold tracking-[0.18em] text-brand uppercase sm:text-base">
          Cloud Security / DevOps / Data Protection
        </p>
        <div>
          <p className="text-lg font-medium text-muted-foreground sm:text-xl">
            Hi, I&rsquo;m
          </p>
          <p className="flex flex-wrap items-center justify-center gap-3 xl:justify-start">
            <span className="text-5xl font-semibold tracking-tight text-foreground sm:text-6xl">
              Zodi Tagedini
            </span>
          </p>
          <p className="mt-1 text-xl font-normal text-muted-foreground sm:text-2xl">
            — cybersecurity professional
          </p>
        </div>
        <p className="text-2xl font-bold tracking-tight text-brand sm:text-3xl xl:whitespace-nowrap">
          Fifteen years in. I still verify before I trust.
        </p>
        <p className="max-w-[38rem] text-lg leading-relaxed text-muted-foreground sm:text-xl xl:whitespace-nowrap">
          Learned the hard way — written down so you don&apos;t have to.
        </p>
        <ul className="flex flex-wrap justify-center gap-2 xl:flex-nowrap xl:justify-start">
          {tags.map((tag) => (
            <li
              key={tag}
              className="rounded-full bg-[#eceff3] px-2.5 py-1 text-[10px] font-medium tracking-[0.08em] whitespace-nowrap text-muted-foreground uppercase sm:text-[11px]"
            >
              {tag}
            </li>
          ))}
        </ul>
        <div className="flex flex-wrap justify-center gap-x-10 gap-y-4 xl:flex-nowrap xl:justify-between">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center xl:text-left">
              <div className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
                {stat.value}
              </div>
              <div className="mt-1 whitespace-nowrap text-xs font-medium tracking-[0.16em] text-muted-foreground uppercase sm:text-sm">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
