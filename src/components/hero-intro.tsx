"use client"

import { useEffect, useRef, useState } from "react"

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
  const textRef = useRef<HTMLDivElement>(null)
  const [photoSize, setPhotoSize] = useState<number | null>(null)

  useEffect(() => {
    const el = textRef.current
    if (!el) return

    function update() {
      const isDesktop = window.matchMedia("(min-width: 1024px)").matches
      setPhotoSize(isDesktop && el ? Math.min(el.offsetHeight, 420) : null)
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
    <div className="container-page flex w-full flex-col items-center gap-12 py-16 lg:flex-row lg:items-start lg:justify-center lg:gap-24 lg:py-20">
      <ProfileAvatar
        src="/zodi.jpg"
        alt="Zodi Tagedini"
        initials="ZT"
        className="size-64 sm:size-80"
        style={photoSize ? { width: photoSize, height: photoSize } : undefined}
      />
      <div ref={textRef} className="max-w-lg space-y-6 text-center lg:text-left">
        <p className="text-xs font-semibold tracking-[0.18em] text-brand uppercase sm:text-sm">
          Cloud Security / DevOps / Data Protection
        </p>
        <div>
          <p className="text-base font-medium text-muted-foreground sm:text-lg">
            Hi, I&rsquo;m
          </p>
          <p className="flex flex-wrap items-center justify-center gap-3 lg:justify-start">
            <span className="text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
              Zodi Tagedini
            </span>
            <span className="text-lg font-normal text-muted-foreground sm:text-xl">
              — cybersecurity professional
            </span>
          </p>
        </div>
        <p className="text-2xl font-bold tracking-tight text-brand sm:text-3xl">
          Fifteen years in. I still verify before I trust.
        </p>
        <p className="max-w-xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
          Learned the hard way — written down so you don&apos;t have to.
        </p>
        <ul className="flex flex-wrap justify-center gap-2.5 lg:justify-start">
          {tags.map((tag) => (
            <li
              key={tag}
              className="rounded-full bg-[#eceff3] px-4 py-1.5 text-xs font-medium tracking-[0.12em] text-muted-foreground uppercase sm:text-sm"
            >
              {tag}
            </li>
          ))}
        </ul>
        <div className="flex flex-wrap justify-center gap-x-10 gap-y-4 lg:flex-nowrap lg:justify-between">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center lg:text-left">
              <div className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
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
