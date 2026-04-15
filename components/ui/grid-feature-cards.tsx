'use client'

import { cn } from '@/lib/utils';
import React from 'react';

type FeatureType = {
	title: string;
	icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
	description: string;
};

type FeatureCardProps = React.ComponentProps<'div'> & {
	feature: FeatureType;
};

export function FeatureCard({ feature, className, ...props }: FeatureCardProps) {
	const [p, setP] = React.useState<number[][]>([]);

	React.useEffect(() => {
		setP(genRandomPattern());
	}, []);

	const Icon = feature.icon;

	return (
		<div className={cn('relative overflow-hidden rounded-xl border border-border bg-card p-8 transition-all duration-300 hover:border-primary/30 hover:bg-card/80', className)} {...props}>
			{/* Grid pattern background */}
			<div className="pointer-events-none absolute top-0 left-1/2 -mt-2 -ml-20 h-full w-full mask-[linear-gradient(white,transparent)]">
				<div className="from-foreground/5 to-foreground/1 absolute inset-0 bg-linear-to-r mask-[radial-gradient(farthest-side_at_top,white,transparent)] opacity-100">
					<GridPattern
						width={20}
						height={20}
						x="-12"
						y="4"
						squares={p}
						className="fill-foreground/5 stroke-foreground/25 absolute inset-0 h-full w-full mix-blend-overlay"
					/>
				</div>
			</div>

			{/* Content */}
			<div className="relative z-10 flex flex-col gap-4">
				<div className="flex items-center justify-between">
					<div className="flex h-12 w-12 items-center justify-center rounded-lg border border-border bg-muted text-primary transition-all duration-300 hover:border-primary/40 hover:bg-primary/10">
						<Icon width={24} height={24} strokeWidth={1.6} aria-hidden="true" />
					</div>
				</div>

				<div className="flex flex-col gap-2">
					<h3 className="text-lg font-semibold text-foreground">{feature.title}</h3>
					<p className="text-sm leading-relaxed text-muted-foreground">{feature.description}</p>
				</div>
			</div>
		</div>
	);
}

function GridPattern({
	width,
	height,
	x,
	y,
	squares,
	...props
}: React.ComponentProps<'svg'> & {
	width: number;
	height: number;
	x: string;
	y: string;
	squares?: number[][];
}) {
	const patternId = React.useId();

	return (
		<svg aria-hidden="true" {...props}>
			<defs>
				<pattern id={patternId} width={width} height={height} patternUnits="userSpaceOnUse" x={x} y={y}>
					<path d={`M.5 ${height}V.5H${width}`} fill="none" />
				</pattern>
			</defs>
			<rect width="100%" height="100%" strokeWidth={0} fill={`url(#${patternId})`} />
			{squares && (
				<svg x={x} y={y} className="overflow-visible">
					{squares.map(([x, y], index) => (
						<rect strokeWidth="0" key={index} width={width + 1} height={height + 1} x={x * width} y={y * height} />
					))}
				</svg>
			)}
		</svg>
	);
}

function genRandomPattern(length?: number): number[][] {
	length = length ?? 5;
	return Array.from({ length }, () => [
		Math.floor(Math.random() * 4) + 7, // random x between 7 and 10
		Math.floor(Math.random() * 6) + 1, // random y between 1 and 6
	]);
}
