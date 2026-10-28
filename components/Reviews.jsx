
"use client";

import { memo, useCallback, useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  BadgeCheck,
  Briefcase,
  ChevronLeft,
  ChevronRight,
  MapPin,
  Pause,
  Play,
  Quote,
  Star,
} from "lucide-react";

import { wrap, card, Head } from "./ui";

/* ------------------------------ Data -------------------------------- */

const reviews = [
  {
    id: "review-1",
    name: "Omar K.",
    role: "Founder",
    country: "Dubai, UAE",
    flag: "🇦🇪",
    service: "MERN E-commerce Website",
    rating: 5,
    recommended: true,
    avatar: "developer",
    text: "Asad built our MERN e-commerce website with clean code and a smooth shopping experience. I highly recommend him for remote work from Pakistan. Reliable, skilled and easy to work with.",
  },
  {
    id: "review-2",
    name: "Umair",
    role: "Client",
    country: "Pakistan",
    flag: "🇵🇰",
    service: "Full Stack Development",
    rating: 5,
    avatar: "professional",
    text: "Delivered my full stack web app on time with clean code and clear communication. Frontend and backend worked together smoothly, and every revision was handled quickly.",
  },
  {
    id: "review-3",
    name: "Jack",
    role: "Client",
    country: "Canada",
    flag: "🇨🇦",
    service: "Full Stack Development",
    rating: 5,
    avatar: "creative",
    text: "Professional, responsive and easy to work with. The project was built exactly to the requirements, and the final result was fast, polished and ready to launch.",
  },
  {
    id: "review-4",
    name: "Ryan",
    role: "Client",
    country: "USA",
    flag: "🇺🇸",
    service: "WordPress Development",
    rating: 4,
    avatar: "business",
    text: "Good quality work and a solid WordPress site. Communication was clear throughout, and the project was completed as agreed.",
  },
];

const EASE = [0.22, 1, 0.36, 1];
const AUTOPLAY_MS = 5500;

/* ------------------------------ Helpers ----------------------------- */

const average = reviews.length
  ? reviews.reduce((sum, review) => sum + review.rating, 0) /
    reviews.length
  : 0;

const countries = [...new Set(reviews.map((review) => review.country))];

function getInitials(name) {
  return name
    .replace(/[^a-zA-Z\s]/g, "")
    .split(/\s+/)
    .filter(Boolean)
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function getStep(element) {
  const first = element?.firstElementChild;
  if (!first) return 0;

  const gap = parseFloat(
    window.getComputedStyle(element).columnGap
  ) || 0;

  return first.getBoundingClientRect().width + gap;
}

/* ------------------------------- SEO -------------------------------- */

function ReviewsSchema() {
  const data = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Client reviews for Asad Ali Lakho",
    itemListElement: reviews.map((review, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Review",
        reviewBody: review.text,
        author: {
          "@type": "Person",
          name: review.name,
        },
        reviewRating: {
          "@type": "Rating",
          ratingValue: review.rating,
          bestRating: 5,
          worstRating: 1,
        },
        itemReviewed: {
          "@type": "Person",
          name: "Asad Ali Lakho",
          jobTitle: "Full Stack Developer",
        },
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}

/* ------------------------- Illustrated Avatar ----------------------- */

const avatarStyles = {
  developer: {
    background: "from-emerald-400 via-teal-500 to-cyan-700",
    shirt: "#064e3b",
    skin: "#d9a27e",
    hair: "#292524",
  },
  professional: {
    background: "from-teal-400 via-emerald-600 to-green-800",
    shirt: "#134e4a",
    skin: "#c58b68",
    hair: "#292524",
  },
  creative: {
    background: "from-amber-300 via-orange-500 to-rose-700",
    shirt: "#7c2d12",
    skin: "#e4b18d",
    hair: "#44403c",
  },
  business: {
    background: "from-lime-300 via-emerald-500 to-teal-800",
    shirt: "#14532d",
    skin: "#b77956",
    hair: "#292524",
  },
};

const Avatar = memo(function Avatar({
  review,
  className = "h-11 w-11",
}) {
  const style = avatarStyles[review.avatar] || avatarStyles.developer;
  const initials = getInitials(review.name);

  return (
    <span
      className={`relative inline-flex shrink-0 rounded-full bg-gradient-to-br ${style.background} p-[2px] shadow-md shadow-emerald-500/15 ${className}`}
    >
      <span className="relative flex h-full w-full items-center justify-center overflow-hidden rounded-full bg-neutral-950">
        <svg
          viewBox="0 0 64 64"
          role="img"
          aria-label={`${review.name} illustrative avatar`}
          className="h-full w-full"
        >
          <defs>
            <linearGradient id={`avatar-bg-${review.id}`} x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#34d399" stopOpacity=".5" />
              <stop offset="100%" stopColor="#0f766e" stopOpacity=".9" />
            </linearGradient>
          </defs>

          <rect
            width="64"
            height="64"
            fill={`url(#avatar-bg-${review.id})`}
          />

          <circle cx="49" cy="12" r="17" fill="#ffffff" opacity=".09" />
          <circle cx="10" cy="56" r="20" fill="#ffffff" opacity=".06" />

          {/* Shoulders */}
          <path
            d="M5 64 Q7 43 22 41 L42 41 Q57 44 59 64Z"
            fill={style.shirt}
          />

          {/* Neck */}
          <path
            d="M26 36 L38 36 L39 45 Q32 51 25 45Z"
            fill={style.skin}
          />

          {/* Ears */}
          <ellipse cx="19" cy="27" rx="4" ry="6" fill={style.skin} />
          <ellipse cx="45" cy="27" rx="4" ry="6" fill={style.skin} />

          {/* Face */}
          <path
            d="M19 17 Q21 7 32 8 Q43 7 45 18 L43 32 Q40 42 32 43 Q24 42 21 32Z"
            fill={style.skin}
          />

          {/* Hair */}
          <path
            d="M18 23 Q15 7 30 6 Q46 5 47 19 L44 23 L40 15 Q30 19 22 15 L21 24Z"
            fill={style.hair}
          />

          {/* Eyes */}
          <ellipse cx="26" cy="27" rx="1.5" ry="1.8" fill="#292524" />
          <ellipse cx="38" cy="27" rx="1.5" ry="1.8" fill="#292524" />

          {/* Smile */}
          <path
            d="M27 34 Q32 38 37 34"
            fill="none"
            stroke="#7c3f31"
            strokeWidth="1.5"
            strokeLinecap="round"
          />

          {/* Collar */}
          <path
            d="M24 43 L32 49 L40 43 L44 47 L39 64 L25 64 L20 47Z"
            fill="#ffffff"
            opacity=".9"
          />

          {/* Decorative initials */}
          <circle cx="51" cy="51" r="10" fill="#064e3b" opacity=".9" />
          <text
            x="51"
            y="54.5"
            textAnchor="middle"
            fontSize="8"
            fontWeight="700"
            fill="#ffffff"
          >
            {initials}
          </text>
        </svg>
      </span>
    </span>
  );
});

/* -------------------------------- Stars ------------------------------ */

function Stars({ rating, reduceMotion, size = 15 }) {
  return (
    <div
      role="img"
      aria-label={`Rated ${rating} out of 5`}
      className="flex items-center gap-0.5"
    >
      {Array.from({ length: 5 }, (_, index) => (
        <motion.span
          key={index}
          aria-hidden="true"
          initial={reduceMotion ? false : { opacity: 0, scale: 0.7 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.25,
            delay: index * 0.04,
            ease: EASE,
          }}
        >
          <Star
            size={size}
            className={
              index < rating
                ? "fill-amber-400 text-amber-400"
                : "text-muted/40"
            }
          />
        </motion.span>
      ))}
    </div>
  );
}

/* ------------------------------ Summary ----------------------------- */

function Summary({ reduceMotion }) {
  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.4, ease: EASE }}
      className={`${card} mx-auto mb-8 flex max-w-4xl flex-col items-center justify-center gap-4 !rounded-2xl !px-5 !py-5 sm:flex-row sm:gap-8`}
    >
      <div className="flex items-center gap-4">
        <div aria-hidden="true" className="flex -space-x-2.5">
          {reviews.map((review) => (
            <Avatar
              key={review.id}
              review={review}
              className="h-9 w-9 ring-2 ring-surface"
            />
          ))}
        </div>

        <div className="flex items-center gap-3">
          <span className="font-display text-4xl font-bold leading-none text-fg">
            {average.toFixed(1)}
          </span>

          <div className="space-y-1">
            <Stars rating={average} reduceMotion={reduceMotion} size={14} />
            <p className="text-xs text-muted">
              {reviews.length} listed reviews
            </p>
          </div>
        </div>
      </div>

      <span
        aria-hidden="true"
        className="hidden h-10 w-px bg-line sm:block"
      />

      <ul
        aria-label="Locations listed in review data"
        className="flex flex-wrap items-center justify-center gap-2"
      >
        {countries.map((country) => (
          <li
            key={country}
            className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/25 bg-emerald-500/10 px-2.5 py-1 text-xs font-medium text-emerald-700 dark:text-emerald-400"
          >
            <MapPin size={12} aria-hidden="true" />
            {country}
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

/* ------------------------------ Controls ---------------------------- */

function ControlButton({ label, onClick, children }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="grid h-9 w-9 cursor-pointer place-items-center rounded-full border border-line text-fg transition-colors duration-150 hover:border-emerald-500/60 hover:bg-emerald-500/10 hover:text-emerald-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 dark:hover:text-emerald-400"
    >
      {children}
    </button>
  );
}

/* ----------------------------- Review Card -------------------------- */

const ReviewCard = memo(function ReviewCard({
  review,
  reduceMotion,
}) {
  return (
    <li className="flex shrink-0 snap-start basis-full md:basis-[calc((100%_-_1.25rem)/2)] xl:basis-[calc((100%_-_2.5rem)/3)]">
      <figure
        className={`${card} group relative flex h-full w-full cursor-pointer flex-col gap-4 overflow-hidden !rounded-2xl transition-[transform,border-color,box-shadow] duration-200 ease-out hover:-translate-y-1 hover:border-emerald-500/50 hover:shadow-lg hover:shadow-emerald-500/5 motion-reduce:transform-none`}
      >
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-emerald-500/10 blur-2xl transition-opacity duration-200 group-hover:opacity-80"
        />

        <div className="relative flex items-center justify-between gap-3">
          <Stars rating={review.rating} reduceMotion={reduceMotion} />

          <span
            aria-hidden="true"
            className="grid h-8 w-8 place-items-center rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
          >
            <Quote size={15} />
          </span>
        </div>

        {review.recommended && (
          <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 px-2.5 py-1 text-[11px] font-semibold text-white">
            <BadgeCheck size={12} aria-hidden="true" />
            Recommended
          </span>
        )}

        <blockquote className="relative flex-1 text-sm leading-relaxed text-muted sm:text-[15px]">
          “{review.text}”
        </blockquote>

        <span className="inline-flex w-fit items-center gap-1.5 rounded-full border border-line px-2.5 py-1 text-[11px] font-medium text-fg">
          <Briefcase
            size={12}
            aria-hidden="true"
            className="text-emerald-600 dark:text-emerald-400"
          />
          {review.service}
        </span>

        <figcaption className="flex items-center gap-3 border-t border-line pt-4">
          <Avatar review={review} />

          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold text-fg">
              {review.name}
              {review.role && (
                <span className="font-normal text-muted">
                  {" "}· {review.role}
                </span>
              )}
            </p>

            <p className="mt-0.5 inline-flex items-center gap-1.5 text-xs text-muted">
              <span aria-hidden="true">{review.flag}</span>
              <MapPin size={12} aria-hidden="true" />
              {review.country}
            </p>
          </div>
        </figcaption>
      </figure>
    </li>
  );
});

/* ------------------------------ Section ----------------------------- */

export default function Reviews() {
  const reduceMotion = useReducedMotion();
  const trackRef = useRef(null);

  const [active, setActive] = useState(0);
  const [maxIndex, setMaxIndex] = useState(0);
  const [hover, setHover] = useState(false);
  const [focus, setFocus] = useState(false);
  const [userPaused, setUserPaused] = useState(false);

  const paused = hover || focus || userPaused;

  const measure = useCallback(() => {
    const element = trackRef.current;
    if (!element) return;

    const step = getStep(element);
    if (!step) return;

    const max = Math.max(
      0,
      Math.ceil(
        (element.scrollWidth - element.clientWidth) / step
      )
    );

    setMaxIndex(max);
    setActive(
      Math.min(max, Math.round(element.scrollLeft / step))
    );
  }, []);

  const goTo = useCallback(
    (index) => {
      const element = trackRef.current;
      if (!element) return;

      const step = getStep(element);
      if (!step) return;

      const target = Math.max(0, Math.min(index, maxIndex));

      element.scrollTo({
        left: target * step,
        behavior: reduceMotion ? "auto" : "smooth",
      });

      setActive(target);
    },
    [maxIndex, reduceMotion]
  );

  const next = useCallback(() => {
    goTo(active >= maxIndex ? 0 : active + 1);
  }, [active, maxIndex, goTo]);

  const prev = useCallback(() => {
    goTo(active <= 0 ? maxIndex : active - 1);
  }, [active, maxIndex, goTo]);

  useEffect(() => {
    measure();

    const element = trackRef.current;
    if (!element || typeof ResizeObserver === "undefined") return;

    const observer = new ResizeObserver(measure);
    observer.observe(element);

    return () => observer.disconnect();
  }, [measure]);

  useEffect(() => {
    if (reduceMotion || paused || maxIndex === 0) return;

    const timer = setTimeout(() => {
      goTo(active >= maxIndex ? 0 : active + 1);
    }, AUTOPLAY_MS);

    return () => clearTimeout(timer);
  }, [active, maxIndex, paused, reduceMotion, goTo]);

  if (!reviews.length) return null;

  function handleKeyDown(event) {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      next();
    }

    if (event.key === "ArrowLeft") {
      event.preventDefault();
      prev();
    }
  }

  return (
    <section
      className={`${wrap} relative isolate pt-20 sm:pt-24`}
      aria-label="Client reviews"
    >
      <ReviewsSchema />

      {!reduceMotion && (
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute left-[-6rem] top-48 -z-10 h-72 w-72 rounded-full bg-emerald-500/10 blur-[110px]"
          animate={{ x: [0, 30, 0], y: [0, 20, 0] }}
          transition={{
            duration: 14,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      )}

      <Head
        id="reviews"
        title="Client reviews"
        sub="Feedback on full-stack development, e-commerce and web experiences."
      />

      <Summary reduceMotion={reduceMotion} />

      <motion.div
        initial={reduceMotion ? false : { opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.45, ease: EASE }}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        onFocusCapture={() => setFocus(true)}
        onBlurCapture={() => setFocus(false)}
      >
        <ul
          ref={trackRef}
          tabIndex={0}
          role="list"
          aria-roledescription="carousel"
          aria-label="Client review slides"
          aria-live={paused ? "polite" : "off"}
          onScroll={measure}
          onKeyDown={handleKeyDown}
          className="flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth px-1 pb-4 pt-1 outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/50 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {reviews.map((review) => (
            <ReviewCard
              key={review.id}
              review={review}
              reduceMotion={reduceMotion}
            />
          ))}
        </ul>

        <div className="mt-4 flex items-center justify-between gap-4">
          <div
            className="flex flex-wrap items-center gap-1.5"
            role="group"
            aria-label="Choose review slide"
          >
            {Array.from({ length: maxIndex + 1 }, (_, index) => (
              <button
                key={index}
                type="button"
                onClick={() => goTo(index)}
                aria-label={`Go to review slide ${index + 1}`}
                aria-current={index === active ? "true" : undefined}
                className={`h-1.5 cursor-pointer rounded-full transition-[width,background-color] duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 ${
                  index === active
                    ? "w-6 bg-emerald-500"
                    : "w-1.5 bg-line hover:bg-emerald-500/50"
                }`}
              />
            ))}
          </div>

          <div className="flex shrink-0 items-center gap-2">
            {!reduceMotion && maxIndex > 0 && (
              <ControlButton
                label={
                  userPaused
                    ? "Resume automatic slideshow"
                    : "Pause automatic slideshow"
                }
                onClick={() => setUserPaused((value) => !value)}
              >
                {userPaused ? (
                  <Play size={15} aria-hidden="true" />
                ) : (
                  <Pause size={15} aria-hidden="true" />
                )}
              </ControlButton>
            )}

            {maxIndex > 0 && (
              <>
                <ControlButton label="Previous review" onClick={prev}>
                  <ChevronLeft size={17} aria-hidden="true" />
                </ControlButton>

                <ControlButton label="Next review" onClick={next}>
                  <ChevronRight size={17} aria-hidden="true" />
                </ControlButton>
              </>
            )}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
