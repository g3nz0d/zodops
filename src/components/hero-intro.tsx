"use client"

import { useEffect, useRef, useState } from "react"

import { ProfileAvatar } from "@/components/profile-avatar"
import { site } from "@/lib/site"

const tags = ["DevOps", "Containers", "DSPM / DLP", "Cloud Security"]

const stats = [
  { value: site.years, label: "Years" },
  { value: `${site.domains}`, label: "Domains" },
  { value: "1", label: "Published Book" },
]

export function HeroIntro() {
  const textRef = useRef<HTMLDivElement>(null)
  const [photoSize, setPhotoSize] = useState<number | null>(null)

  useEffect(() => {
    const el = textRef.current
    if (!el) return

    function update() {
      const isDesktop = window.matchMedia("(min-width: 1024px)").matches
      setPhotoSize(isDesktop && el ? el.offsetHeight : null)
    }

    update()
    const observer = new ResizeObserver(update)
    observer.observe(el)
    window.addEventListener("resize", update)
    return () => {
      observer.disconnect()
      window.removeEventListener("resize", update)
    }
  }, [])

  return (
    <div className="container-page flex flex-col items-center gap-10 py-14 lg:flex-row lg:items-start lg:justify-center lg:gap-28 lg:py-20">
      <ProfileAvatar
        src="/zodi.jpg"
        alt="Zodi Tagedini"
        initials="ZT"
        className="size-48 sm:size-60"
        style={photoSize ? { width: photoSize, height: photoSize } : undefined}
      />
      <div ref={textRef} className="max-w-lg text-center lg:text-left">
        <p className="text-[11px] font-semibold tracking-[0.18em] text-brand uppercase">
          Cloud Security / DevOps / Data Protection
        </p>
        <div className="mt-4">
          <p className="text-sm font-medium text-muted-foreground">
            Hi, I&rsquo;m
          </p>
          <p className="text-2xl font-semibold tracking-tight text-foreground sm:text-[1.75rem]">
            Zodi Tagedini{" "}
            <span className="text-base font-normal text-muted-foreground">
              — cybersecurity professional
            </span>
          </p>
        </div>
        <p className="mt-4 text-xl font-bold tracking-tight text-brand sm:text-2xl">
          Fifteen years in. I still verify before I trust.
        </p>
        <p className="mt-4 max-w-lg text-[16px] leading-relaxed text-muted-foreground">
          Learned the hard way — written down so you don&apos;t have to.
        </p>
        <ul className="mt-7 flex flex-wrap justify-center gap-2 lg:justify-start">
          {tags.map((tag) => (
            <li
              key={tag}
              className="rounded-full bg-[#eceff3] px-3 py-1 text-[11px] font-medium tracking-[0.12em] text-muted-foreground uppercase"
            >
              {tag}
            </li>
          ))}
        </ul>
        <div className="mt-8 flex flex-wrap justify-center gap-x-8 gap-y-3 border-t border-border pt-6 lg:flex-nowrap lg:justify-between">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center lg:text-left">
              <div className="text-lg font-semibold tracking-tight text-foreground sm:text-xl">
                {stat.value}
              </div>
              <div className="mt-0.5 whitespace-nowrap text-[10px] font-medium tracking-[0.16em] text-muted-foreground uppercase">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
