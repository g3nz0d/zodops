"use client"

import { useState, type FormEvent, type ReactNode } from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { site } from "@/lib/site"

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sent" | "error">("idle")
  const [error, setError] = useState("")

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const name = String(data.get("name") ?? "").trim()
    const email = String(data.get("email") ?? "").trim()
    const message = String(data.get("message") ?? "").trim()

    if (!name || !email || !message) {
      setStatus("error")
      setError("Name, email, and a short note are required.")
      return
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setStatus("error")
      setError("That email does not look usable.")
      return
    }

    const subject = encodeURIComponent(`ZodOps — note from ${name}`)
    const body = encodeURIComponent(
      `${message}\n\n— ${name}\n${email}`
    )
    window.location.href = `mailto:${site.email}?subject=${subject}&body=${body}`
    setStatus("sent")
    setError("")
  }

  if (status === "sent") {
    return (
      <div className="rounded-xl border border-border bg-muted px-5 py-6">
        <p className="font-medium text-foreground">Your mail client should open.</p>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          If it does not, write directly to{" "}
          <a className="text-brand hover:underline" href={`mailto:${site.email}`}>
            {site.email}
          </a>
          . This site is static (GitLab Pages / any static host), so it cannot
          send mail by itself.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Name" htmlFor="name">
          <Input
            id="name"
            name="name"
            autoComplete="name"
            className="h-10"
            placeholder="Your name"
          />
        </Field>
        <Field label="Email" htmlFor="email">
          <Input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            className="h-10"
            placeholder="you@company.com"
          />
        </Field>
      </div>
      <Field label="Message" htmlFor="message">
        <Textarea
          id="message"
          name="message"
          className="min-h-36"
          placeholder="What are you trying to ship?"
        />
      </Field>
      {status === "error" ? (
        <p className="text-sm text-destructive">{error}</p>
      ) : null}
      <Button
        type="submit"
        className="h-10 rounded-md bg-navy px-4 text-[11px] font-semibold tracking-[0.14em] text-navy-foreground uppercase hover:bg-navy/90"
      >
        Send a note
      </Button>
    </form>
  )
}

function Field({
  label,
  htmlFor,
  children,
}: {
  label: string
  htmlFor: string
  children: ReactNode
}) {
  return (
    <div className="space-y-1.5">
      <Label htmlFor={htmlFor} className="text-sm text-foreground">
        {label}
      </Label>
      {children}
    </div>
  )
}
