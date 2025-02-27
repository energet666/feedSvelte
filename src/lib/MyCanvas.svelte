<script lang="ts">
	import paper from "paper";
	import {
		Minimize2,
		Maximize2,
		LucidePencilRuler,
		Pencil,
		GripHorizontal,
	} from "lucide-svelte";
	import { Segment } from "@skeletonlabs/skeleton-svelte";
	import type { Action } from "svelte/action";
	import { on } from "svelte/events";

	let tool = $state("free");
	let toolColor = $state("#ff0000");
	let toolSize = $state(3);
	const toolSizeMin = 1;
	const toolSizeMax = 500;
	$effect(() => {
		if (toolSize < toolSizeMin) toolSize = toolSizeMin;
		else if (toolSize > toolSizeMax) toolSize = toolSizeMax;
	});

	let toolBarEl = $state<HTMLDivElement>();
	let canvasEl = $state<HTMLCanvasElement>();
	const canvasSize = { w: 1000, h: 1000 };

	let fullscreened = $state(false);
	$effect(() => {
		if (fullscreened) {
			document.body.classList.add("overflow-hidden");
		} else {
			document.body.classList.remove("overflow-hidden");
		}
	});

	let translate = { x: 0, y: 0 };
	const dragParent: Action<HTMLDivElement> = (node) => {
		let start = { x: 0, y: 0 };
		const parent = node.parentElement as HTMLDivElement;
		node.onpointerdown = (event: MouseEvent) => {
			event.preventDefault();
			start = {
				x: event.clientX - translate.x,
				y: event.clientY - translate.y,
			};
			const onpointermove = (event: MouseEvent) => {
				translate.x = event.clientX - start.x;
				translate.y = event.clientY - start.y;
				parent.style.transform = `translate(${translate.x}px, ${translate.y}px)`;
			};
			const onpointerup = () => {
				checkBounds();
				unmove();
				unup();
			};
			const unmove = on(document, "pointermove", onpointermove);
			const unup = on(document, "pointerup", onpointerup);
		};
		const checkBounds = () => {
			const allowBoxY = canvasEl!.getBoundingClientRect();
			const allowBoxX = document.body.getBoundingClientRect();
			const box = parent.getBoundingClientRect();
			if (box.left < allowBoxX.left) {
				translate.x += allowBoxX.left - box.left + 4;
			} else if (box.right > allowBoxX.right) {
				translate.x -= box.right - allowBoxX.right + 4;
			}
			if (box.top < allowBoxY.top) {
				translate.y += allowBoxY.top - box.top + 4;
			} else if (box.bottom > allowBoxY.bottom) {
				translate.y -= box.bottom - allowBoxY.bottom + 4;
			}
			parent.style.transform = `translate(${translate.x}px, ${translate.y}px)`;
		};
		$effect(() => {
			let _ = fullscreened;
			checkBounds();
		});
		on(window, "resize", checkBounds);
	};

	const changeToolSizeOnWheel: Action = (node) => {
		node.onwheel = (ev) => {
			if (!fullscreened) return;
			ev.preventDefault();
			let k = toolSize >= 50 ? 10 : 1;
			toolSize += (-k * ev.deltaY) / 100;
		};
	};

	const paperIt: Action<HTMLCanvasElement> = (node) => {
		console.log("paperIt", node);
		const sc = new paper.PaperScope();
		sc.setup(node);

		//Testing
		let path = new paper.Path();
		path.strokeColor = new paper.Color("red");
		let start = new paper.Point(50, 0);
		path.moveTo(start);
		path.lineTo(start.add([-50, 50]));

		const lineTool = new paper.Tool();
		lineTool.onMouseDown = (event: paper.MouseEvent) => {
			path = new paper.Path.Line({
				from: event.point,
				to: event.point,
				strokeCap: "round",
				strokeColor: toolColor,
				strokeWidth: toolSize,
			});
		};
		lineTool.onMouseDrag = (event: paper.MouseEvent) => {
			path.lastSegment.point = event.point;
		};
		lineTool.onMouseUp = (event: paper.MouseEvent) => {};

		const freeTool = new paper.Tool();
		freeTool.onMouseDown = (event: paper.MouseEvent) => {
			path = new paper.Path({
				segments: [event.point],
				strokeColor: toolColor,
				strokeCap: "round",
				strokeJoin: "round",
				strokeWidth: toolSize,
			});
			path.add([event.point.x + 0.1, event.point.y + 0.1]);
		};
		freeTool.onMouseDrag = (event: paper.MouseEvent) => {
			path.add(event.point);
		};
		freeTool.onMouseUp = () => {
			path.simplify();
		};
		freeTool.onMouseMove = (event: paper.MouseEvent) => {};

		// freeTool.activate();

		const canvasSizeUpdate = () => {
			const parent = node.parentElement as HTMLDivElement;
			let w = parent.getBoundingClientRect().width;
			let h = parent.getBoundingClientRect().height;
			let k = w / canvasSize.w;
			if (fullscreened) {
				const temp_h = canvasSize.h * k;
				if (temp_h > h) {
					k = h / canvasSize.h;
				}
			}
			sc.view.scaling = new paper.Point(k, k);
			sc.view.viewSize = new paper.Size(canvasSize.w * k, canvasSize.h * k);
			sc.view.center = new paper.Point(canvasSize.w / 2, canvasSize.h / 2);
		};
		canvasSizeUpdate();

		on(window, "resize", canvasSizeUpdate);

		$effect(() => {
			let f = fullscreened;
			canvasSizeUpdate();
			toolBarEl!.style.transform = `translate(${0}px, ${0}px)`;
			translate = { x: 0, y: 0 };
		});

		$effect(() => {
			console.log("tool: ", tool);
			switch (tool) {
				case "free":
					if (!freeTool) return;
					freeTool.activate();
					break;
				case "line":
					if (!lineTool) return;
					lineTool.activate();
					break;
			}
		});
	};
</script>

<div
	class="flex flex-col items-center justify-center gap-2 {fullscreened
		? 'fixed top-0 left-0 w-screen h-screen z-10 bg-black/80'
		: 'relative'}"
>
	<canvas
		bind:this={canvasEl}
		width={canvasSize.w}
		height={canvasSize.h}
		use:paperIt
		use:changeToolSizeOnWheel
		class="bg-primary-100-900 rounded-lg ring-1 {fullscreened ? '' : 'w-full'}"
	></canvas>
	<div
		bind:this={toolBarEl}
		class="absolute top-0 left-full bg-primary-300/60 dark:bg-primary-700/60 m-1 p-1 pt-2 rounded-container flex flex-col items-center gap-2 backdrop-blur-sm text-white touch-none"
	>
		<button
			onclick={() => {
				fullscreened = !fullscreened;
			}}
			class="btn-icon preset-filled-primary-500"
		>
			{#if fullscreened}
				<Minimize2 />
			{:else}
				<Maximize2 />
			{/if}
		</button>
		<Segment
			bind:value={tool}
			indicatorBg="bg-primary-500"
			indicatorText="text-white"
			orientation="vertical"
		>
			<Segment.Item
				value="free"
				classes="btn-icon"><Pencil /></Segment.Item
			>
			<Segment.Item
				value="line"
				classes="btn-icon"><LucidePencilRuler /></Segment.Item
			>
		</Segment>
		<input
			bind:value={toolColor}
			type="color"
			class="input"
		/>
		<input
			bind:value={toolSize}
			use:changeToolSizeOnWheel
			min={toolSizeMin}
			max={toolSizeMax}
			type="number"
			class="input w-12 pl-1 select-none"
		/>
		<div
			use:dragParent
			class="self-stretch"
		>
			<GripHorizontal class="cursor-move mx-auto" />
		</div>
	</div>
</div>

<style>
</style>
