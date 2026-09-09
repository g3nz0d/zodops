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

const HERO_GAP_PX = 96 // matches lg:gap-24
const CONTAINER_PADDING_PX = 64 // container-page's left+right padding at sm and up

export function HeroIntro() {
  const rowRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)
  const [photoSize, setPhotoSize] = useState<number | null>(null)

  useEffect(() => {
    const row = rowRef.current
    const el = textRef.current
    if (!row || !el) return

    function update() {
      const isDesktop = window.matchMedia("(min-width: 1024px)").matches
      if (!isDesktop || !row || !el) {
        setPhotoSize(null)
        return
      }
      const available =
        row.clientWidth - CONTAINER_PADDING_PX - el.offsetWidth - HERO_GAP_PX
      const size = Math.min(el.offsetHeight, available, 480)
      setPhotoSize(Math.max(size, 220))
    }

    update()
    const observer = new ResizeObserver(update)
    observer.observe(el)
    observer.observe(row)
    window.addEventListener("resize", update)
    return () => {
      observer.disconnect()
      window.removeEventListener("resize", update)
    }
  }, [])

  return (
    <div
      ref={rowRef}
      className="container-page flex w-full flex-col items-center gap-12 py-16 lg:flex-row lg:items-start lg:justify-center lg:gap-24 lg:py-20"
    >
      <ProfileAvatar
        src="/zodi.jpg"
        alt="Zodi Tagedini"
        initials="ZT"
        className="size-72 sm:size-96"
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
        <ul className="flex flex-wrap justify-center gap-2 lg:flex-nowrap lg:justify-start">
          {tags.map((tag) => (
            <li
              key={tag}
              className="rounded-full bg-[#eceff3] px-3 py-1.5 text-[11px] font-medium tracking-[0.1em] whitespace-nowrap text-muted-foreground uppercase sm:text-xs"
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
