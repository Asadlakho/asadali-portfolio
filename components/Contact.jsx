"use client";

import { useState } from "react";
import { site } from "../lib/data";
import { wrap, solid, ghost } from "./ui";
import {
  ArrowUpRight,
  BriefcaseBusiness,
  Check,
  Code2,
  Mail,
  MessageCircle,
  UserRound,
} from "lucide-react";

const CONTACT_EMAIL = "asadlakho503@gmail.com";
const WHATSAPP_NUMBER = "923138320432";

const LINKEDIN_URL =
  "https://www.linkedin.com/in/asad-ali-lakho-bb9260281/";

const GITHUB_URL = site.github || "https://github.com/Asadlakho";

const CONTACT_OPTIONS = [
  {
    id: "hiring",
    label: "Hiring / Full-time role",
    description: "Job opportunities and interviews",
    icon: BriefcaseBusiness,
    subject: "Software Engineering Opportunity",
    message:
      "Hi Asad,\n\nI'd like to discuss a software engineering opportunity with you.\n\nCompany:\nPosition:\n\nBest regards,",
  },
  {
    id: "project",
    label: "Website / SaaS project",
    description: "Web applications and freelance work",
    icon: Code2,
    subject: "Web Development Project",
    message:
      "Hi Asad,\n\nI'd like to discuss a web development project.\n\nProject requirements:\nTimeline:\nBudget:\n\nBest regards,",
  },
  {
    id: "collaboration",
    label: "Collaboration",
    description: "Partnerships and professional connections",
    icon: UserRound,
    subject: "Professional Collaboration",
    message:
      "Hi Asad,\n\nI'd like to discuss a professional collaboration.\n\nDetails:\n\nBest regards,",
  },
];

const emailLink = (subject, message) =>
  `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`;

const whatsappLink = (message) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

export default function Contact() {
  const [selectedId, setSelectedId] = useState("hiring");

  const selected =
    CONTACT_OPTIONS.find((option) => option.id === selectedId) ??
    CONTACT_OPTIONS[0];

  const quickMessage = `Hi Asad, I'd like to discuss ${
    selectedId === "hiring"
      ? "a full-time role or interview"
      : selectedId === "project"
        ? "a website or SaaS project"
        : "a professional collaboration"
  } with you.`;

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className={`${wrap} scroll-mt-24 py-16 sm:py-20`}
    >
      <div className="relative isolate overflow-hidden rounded-3xl border border-line bg-surface">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-24 -top-24 -z-10 h-72 w-72 rounded-full bg-emerald-500/[0.08] blur-3xl"
        />

        <div className="grid lg:grid-cols-2">
          <div className="flex flex-col justify-center p-6 sm:p-10 lg:p-12">
            <span className="flex items-center gap-2 text-sm font-semibold text-muted">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              Open to opportunities
            </span>

            <h2
              id="contact-heading"
              className="mt-5 max-w-lg font-display text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl lg:text-5xl"
            >
              Let's build something
              <span className="block bg-gradient-to-r from-emerald-500 to-green-400 bg-clip-text pb-1 text-transparent">
                meaningful.
              </span>
            </h2>

            <p className="mt-4 max-w-md text-sm leading-7 text-muted sm:text-base">
              Looking for a developer for your team or project? Let's discuss
              your goals and how I can contribute.
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              <a
                href={emailLink(selected.subject, selected.message)}
                className={`${solid} inline-flex min-h-11 items-center justify-center gap-2`}
                aria-label="Email Asad about a professional opportunity"
              >
                <Mail size={17} />
                Get in touch
                <ArrowUpRight size={16} />
              </a>

              <a
                href={whatsappLink(quickMessage)}
                target="_blank"
                rel="noopener noreferrer"
                className={`${ghost} inline-flex min-h-11 items-center justify-center gap-2`}
                aria-label="Contact Asad on WhatsApp"
              >
                <MessageCircle size={17} />
                WhatsApp
                <ArrowUpRight size={15} />
              </a>
            </div>

            <div className="mt-7 border-t border-line pt-5">
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="inline-flex items-center gap-2 text-sm text-muted transition hover:text-emerald-500"
              >
                <Mail size={16} />
                {CONTACT_EMAIL}
              </a>

              <div className="mt-4 flex flex-wrap gap-4">
                <a
                  href={LINKEDIN_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-fg transition hover:text-emerald-500"
                >
                  LinkedIn <ArrowUpRight size={14} />
                </a>

                <a
                  href={GITHUB_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-fg transition hover:text-emerald-500"
                >
                  GitHub <ArrowUpRight size={14} />
                </a>
              </div>
            </div>
          </div>

          <div className="border-t border-line bg-background/40 p-5 sm:p-8 lg:border-l lg:border-t-0 lg:p-10">
            <div className="mx-auto max-w-lg">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-emerald-600 dark:text-emerald-400">
                Let's connect
              </p>

              <h3 className="mt-2 text-xl font-bold tracking-tight text-fg sm:text-2xl">
                How can I help you?
              </h3>

              <p className="mt-2 text-sm leading-6 text-muted">
                Choose an option to prepare your message.
              </p>

              <div className="mt-6 space-y-2.5">
                {CONTACT_OPTIONS.map((option) => {
                  const Icon = option.icon;
                  const active = selectedId === option.id;

                  return (
                    <button
                      key={option.id}
                      type="button"
                      onClick={() => setSelectedId(option.id)}
                      aria-pressed={active}
                      className={[
                        "flex w-full items-center gap-3 rounded-xl border p-3.5 text-left",
                        "transition duration-200",
                        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500",
                        active
                          ? "border-emerald-500/50 bg-emerald-500/[0.07]"
                          : "border-line bg-surface hover:border-emerald-500/30",
                      ].join(" ")}
                    >
                      <span
                        className={[
                          "grid h-10 w-10 shrink-0 place-items-center rounded-xl",
                          active
                            ? "bg-emerald-500/10 text-emerald-500"
                            : "bg-background text-muted",
                        ].join(" ")}
                      >
                        <Icon size={19} aria-hidden="true" />
                      </span>

                      <span className="min-w-0 flex-1">
                        <span className="block text-sm font-semibold text-fg">
                          {option.label}
                        </span>
                        <span className="mt-1 block text-xs leading-5 text-muted">
                          {option.description}
                        </span>
                      </span>

                      {active && (
                        <Check
                          size={18}
                          className="shrink-0 text-emerald-500"
                          aria-hidden="true"
                        />
                      )}
                    </button>
                  );
                })}
              </div>

              <div className="mt-5 grid grid-cols-2 gap-3">
                <a
                  href={emailLink(selected.subject, selected.message)}
                  className={`${solid} inline-flex min-h-11 items-center justify-center gap-2 px-3 text-sm`}
                >
                  <Mail size={16} />
                  Email me
                </a>

                <a
                  href={whatsappLink(quickMessage)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${ghost} inline-flex min-h-11 items-center justify-center gap-2 px-3 text-sm`}
                >
                  <MessageCircle size={16} />
                  WhatsApp
                </a>
              </div>

              <p className="mt-4 text-center text-xs leading-5 text-muted">
                Your selected option prepares a message you can edit before sending.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
