'use client';

import * as React from 'react';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { cn } from '@/lib/utils';
import { Mail } from 'lucide-react';

// Register ScrollTrigger safely for React
if (typeof window !== 'undefined') {
	gsap.registerPlugin(ScrollTrigger);
}

// -------------------------------------------------------------------------
// 1. THEME-ADAPTIVE INLINE STYLES
// -------------------------------------------------------------------------
const STYLES = `
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800;900&display=swap');

.cinematic-cta-wrapper {
  font-family: 'Plus Jakarta Sans', sans-serif;
  -webkit-font-smoothing: antialiased;
  
  /* Dynamic Variables using standard shadcn/tailwind v4 tokens */
  --pill-bg-1: color-mix(in oklch, var(--foreground) 3%, transparent);
  --pill-bg-2: color-mix(in oklch, var(--foreground) 1%, transparent);
  --pill-shadow: color-mix(in oklch, var(--background) 50%, transparent);
  --pill-highlight: color-mix(in oklch, var(--foreground) 10%, transparent);
  --pill-inset-shadow: color-mix(in oklch, var(--background) 80%, transparent);
  --pill-border: color-mix(in oklch, var(--foreground) 8%, transparent);
  
  --pill-bg-1-hover: color-mix(in oklch, var(--foreground) 8%, transparent);
  --pill-bg-2-hover: color-mix(in oklch, var(--foreground) 2%, transparent);
  --pill-border-hover: color-mix(in oklch, var(--foreground) 20%, transparent);
  --pill-shadow-hover: color-mix(in oklch, var(--background) 70%, transparent);
  --pill-highlight-hover: color-mix(in oklch, var(--foreground) 20%, transparent);
}

@keyframes cta-breathe {
  0% { transform: translate(-50%, -50%) scale(1); opacity: 0.6; }
  100% { transform: translate(-50%, -50%) scale(1.1); opacity: 1; }
}

@keyframes cta-scroll-marquee {
  from { transform: translateX(0); }
  to { transform: translateX(-50%); }
}

@keyframes cta-heartbeat {
  0%, 100% { transform: scale(1); filter: drop-shadow(0 0 5px color-mix(in oklch, var(--destructive) 50%, transparent)); }
  15%, 45% { transform: scale(1.2); filter: drop-shadow(0 0 10px color-mix(in oklch, var(--destructive) 80%, transparent)); }
  30% { transform: scale(1); }
}

.animate-cta-breathe {
  animation: cta-breathe 8s ease-in-out infinite alternate;
}

.animate-cta-scroll-marquee {
  animation: cta-scroll-marquee 40s linear infinite;
}

.animate-cta-heartbeat {
  animation: cta-heartbeat 2s cubic-bezier(0.25, 1, 0.5, 1) infinite;
}

/* Theme-adaptive Grid Background */
.cta-bg-grid {
  background-size: 60px 60px;
  background-image: 
    linear-gradient(to right, color-mix(in oklch, var(--foreground) 3%, transparent) 1px, transparent 1px),
    linear-gradient(to bottom, color-mix(in oklch, var(--foreground) 3%, transparent) 1px, transparent 1px);
  mask-image: linear-gradient(to bottom, transparent, black 30%, black 70%, transparent);
  -webkit-mask-image: linear-gradient(to bottom, transparent, black 30%, black 70%, transparent);
}

/* Theme-adaptive Aurora Glow */
.cta-aurora {
  background: radial-gradient(
    circle at 50% 50%, 
    color-mix(in oklch, var(--primary) 15%, transparent) 0%, 
    color-mix(in oklch, var(--secondary) 15%, transparent) 40%, 
    transparent 70%
  );
}

/* Glass Pill Theming */
.cta-glass-pill {
  background: linear-gradient(145deg, var(--pill-bg-1) 0%, var(--pill-bg-2) 100%);
  box-shadow: 
      0 10px 30px -10px var(--pill-shadow), 
      inset 0 1px 1px var(--pill-highlight), 
      inset 0 -1px 2px var(--pill-inset-shadow);
  border: 1px solid var(--pill-border);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.cta-glass-pill:hover {
  background: linear-gradient(145deg, var(--pill-bg-1-hover) 0%, var(--pill-bg-2-hover) 100%);
  border-color: var(--pill-border-hover);
  box-shadow: 
      0 20px 40px -10px var(--pill-shadow-hover), 
      inset 0 1px 1px var(--pill-highlight-hover);
  color: var(--foreground);
}

/* Giant Background Text Masking */
.cta-giant-bg-text {
  font-size: 26vw;
  line-height: 0.75;
  font-weight: 900;
  letter-spacing: -0.05em;
  color: transparent;
  -webkit-text-stroke: 1px color-mix(in oklch, var(--foreground) 5%, transparent);
  background: linear-gradient(180deg, color-mix(in oklch, var(--foreground) 10%, transparent) 0%, transparent 60%);
  -webkit-background-clip: text;
  background-clip: text;
}

/* Metallic Text Glow */
.cta-text-glow {
  background: linear-gradient(180deg, var(--foreground) 0%, color-mix(in oklch, var(--foreground) 40%, transparent) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  filter: drop-shadow(0px 0px 20px color-mix(in oklch, var(--foreground) 15%, transparent));
}
`;

// -------------------------------------------------------------------------
// 2. MAGNETIC BUTTON PRIMITIVE (Zero Dependency)
// -------------------------------------------------------------------------
export type MagneticButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
	React.AnchorHTMLAttributes<HTMLAnchorElement> & {
		as?: React.ElementType;
	};

const MagneticButton = React.forwardRef<HTMLElement, MagneticButtonProps>(
	({ className, children, as: Component = 'button', ...props }, forwardedRef) => {
		const localRef = useRef<HTMLElement>(null);

		useEffect(() => {
			if (typeof window === 'undefined') return;
			const element = localRef.current;
			if (!element) return;

			const ctx = gsap.context(() => {
				const handleMouseMove = (e: MouseEvent) => {
					const rect = element.getBoundingClientRect();
					const h = rect.width / 2;
					const w = rect.height / 2;
					const x = e.clientX - rect.left - h;
					const y = e.clientY - rect.top - w;

					gsap.to(element, {
						x: x * 0.4,
						y: y * 0.4,
						rotationX: -y * 0.15,
						rotationY: x * 0.15,
						scale: 1.05,
						ease: 'power2.out',
						duration: 0.4,
					});
				};

				const handleMouseLeave = () => {
					gsap.to(element, {
						x: 0,
						y: 0,
						rotationX: 0,
						rotationY: 0,
						scale: 1,
						ease: 'elastic.out(1, 0.3)',
						duration: 1.2,
					});
				};

				element.addEventListener('mousemove', handleMouseMove as any);
				element.addEventListener('mouseleave', handleMouseLeave);

				return () => {
					element.removeEventListener('mousemove', handleMouseMove as any);
					element.removeEventListener('mouseleave', handleMouseLeave);
				};
			}, element);

			return () => ctx.revert();
		}, []);

		return (
			<Component
				ref={(node: HTMLElement) => {
					(localRef as any).current = node;
					if (typeof forwardedRef === 'function') forwardedRef(node);
					else if (forwardedRef) (forwardedRef as any).current = node;
				}}
				className={cn('cursor-pointer', className)}
				{...props}
			>
				{children}
			</Component>
		);
	}
);
MagneticButton.displayName = 'MagneticButton';

// -------------------------------------------------------------------------
// 3. MAIN COMPONENT
// -------------------------------------------------------------------------
const services = [
	'Entrega agil',
	'Poderoso',
	'Seguridad',
	'Personalización',
	'Control',
	'Diseñado para IA',
];

const MarqueeItem = () => (
	<div className="flex items-center space-x-12 px-6">
		{services.map((service, i) => (
			<React.Fragment key={service}>
				<span>{service}</span>
				{i < services.length - 1 && <span className="text-primary/60">✦</span>}
			</React.Fragment>
		))}
	</div>
);

export function Cta() {
	const wrapperRef = useRef<HTMLDivElement>(null);
	const giantTextRef = useRef<HTMLDivElement>(null);
	const headingRef = useRef<HTMLHeadingElement>(null);
	const linksRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (typeof window === 'undefined') return;
		if (!wrapperRef.current) return;

		// React strict mode compatible GSAP context cleanup
		const ctx = gsap.context(() => {
			// Background Parallax
			gsap.fromTo(
				giantTextRef.current,
				{ y: '10vh', scale: 0.8, opacity: 0 },
				{
					y: '0vh',
					scale: 1,
					opacity: 1,
					ease: 'power1.out',
					scrollTrigger: {
						trigger: wrapperRef.current,
						start: 'top 80%',
						end: 'bottom bottom',
						scrub: 1,
					},
				}
			);

			// Staggered Content Reveal
			gsap.fromTo(
				[headingRef.current, linksRef.current],
				{ y: 50, opacity: 0 },
				{
					y: 0,
					opacity: 1,
					stagger: 0.15,
					ease: 'power3.out',
					scrollTrigger: {
						trigger: wrapperRef.current,
						start: 'top 40%',
						end: 'bottom bottom',
						scrub: 1,
					},
				}
			);
		}, wrapperRef);

		return () => ctx.revert();
	}, []);

	const scrollToTop = () => {
		window.scrollTo({ top: 0, behavior: 'smooth' });
	};

	return (
		<>
			<style dangerouslySetInnerHTML={{ __html: STYLES }} />

			<div
				ref={wrapperRef}
				className="relative h-screen w-full"
				style={{ clipPath: 'polygon(0% 0, 100% 0%, 100% 100%, 0 100%)' }}
			>
				<footer className="fixed bottom-0 left-0 flex h-screen w-full flex-col justify-between overflow-hidden bg-background text-foreground cinematic-cta-wrapper" id="contact">
					{/* Ambient Light & Grid Background */}
					<div className="cta-aurora absolute left-1/2 top-1/2 h-[60vh] w-[80vw] -translate-x-1/2 -translate-y-1/2 animate-cta-breathe rounded-[50%] blur-[80px] pointer-events-none z-0" />
					<div className="cta-bg-grid absolute inset-0 z-0 pointer-events-none" />

					{/* Giant background text */}
					<div
						ref={giantTextRef}
						className="cta-giant-bg-text absolute -bottom-[5vh] left-1/2 -translate-x-1/2 whitespace-nowrap z-0 pointer-events-none select-none"
					>
						shift
					</div>

					{/* 1. Diagonal Sleek Marquee (Top of footer) */}
					<div className="absolute top-12 left-0 w-full overflow-hidden border-y border-border/50 bg-background/60 backdrop-blur-md py-4 z-10 -rotate-2 scale-110 shadow-2xl">
						<div className="flex w-max animate-cta-scroll-marquee text-xs md:text-sm font-bold tracking-[0.3em] text-muted-foreground uppercase">
							<MarqueeItem />
							<MarqueeItem />
						</div>
					</div>

					{/* 2. Main Center Content */}
					<div className="relative z-10 flex flex-1 flex-col items-center justify-center px-6 mt-20 w-full max-w-5xl mx-auto">
						<h2
							ref={headingRef}
							className="text-5xl md:text-8xl font-black cta-text-glow tracking-tighter mb-12 py-3 text-center"
						>
							Construyamos algo grandioso
						</h2>

						{/* Interactive Magnetic Pills Layout */}
						<div ref={linksRef} className="flex flex-col items-center gap-6 w-full">
							{/* Main CTA Button */}
							<div className="flex flex-wrap justify-center gap-4 w-full">
								<MagneticButton
									as="a"
                                    href="https://mail.google.com/mail/?view=cm&fs=1&to=helloshiftya@gmail.com"
                                    target="_blank"
                                    rel="noreferrer"
                                    className="cta-glass-pill px-10 py-5 rounded-full text-foreground font-bold text-sm md:text-base flex items-center gap-3 group"
                                >
									<Mail size={20} />
									Contacto
								</MagneticButton>

								<MagneticButton
									as="a"
									href="https://wa.me/message/your-whatsapp-number"
									className="cta-glass-pill px-10 py-5 rounded-full text-foreground font-bold text-sm md:text-base flex items-center gap-3 group"
								>
									<svg
										className="w-5 h-5"
										viewBox="0 0 24 24"
										fill="currentColor"
									>
										<path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c0 5.454-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.001c6.557 0 11.891-5.337 11.893-11.893A11.821 11.821 0 0020.885 3.488" />
									</svg>
									WhatsApp
								</MagneticButton>
							</div>

							{/* Secondary Text Links */}
							<div className="flex flex-wrap justify-center gap-3 md:gap-6 w-full mt-2">
								<MagneticButton
									as="a"
									href="#"
									className="cta-glass-pill px-6 py-3 rounded-full text-muted-foreground font-medium text-xs md:text-sm hover:text-foreground"
								>
									Privacy Policy
								</MagneticButton>
								<MagneticButton
									as="a"
									href="#"
									className="cta-glass-pill px-6 py-3 rounded-full text-muted-foreground font-medium text-xs md:text-sm hover:text-foreground"
								>
									Terms of Service
								</MagneticButton>
								<MagneticButton
									as="a"
									href="#"
									className="cta-glass-pill px-6 py-3 rounded-full text-muted-foreground font-medium text-xs md:text-sm hover:text-foreground"
								>
									Support
								</MagneticButton>
							</div>
						</div>
					</div>

					{/* 3. Bottom Bar / Credits */}
					<div className="relative z-20 w-full pb-8 px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-6">
						{/* Copyright */}
						<div className="text-muted-foreground text-[10px] md:text-xs font-semibold tracking-widest uppercase order-2 md:order-1">
							© 2026 shift.ya. All rights reserved.
						</div>

						{/* Back to top */}
						<MagneticButton
							as="button"
							onClick={scrollToTop}
							className="w-12 h-12 rounded-full cta-glass-pill flex items-center justify-center text-muted-foreground hover:text-foreground group order-3"
						>
							<svg
								className="w-5 h-5 transform group-hover:-translate-y-1.5 transition-transform duration-300"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="2"
									d="M5 10l7-7m0 0l7 7m-7-7v18"
								></path>
							</svg>
						</MagneticButton>
					</div>
				</footer>
			</div>
		</>
	);
}
