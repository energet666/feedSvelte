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
	let colorPicker = $state("#ff0000");
	let sizePicker = $state(3);
	let fullscreen = $state(false);
	let toolBar = $state<HTMLDivElement>();
	let canvas = $state<HTMLCanvasElement>();
	const canvasSize = { w: 800, h: 800 };
	let lineTool: paper.Tool | undefined;
	let freeTool: paper.Tool | undefined;

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

	let translate = { x: 0, y: 0 };
	const dragParent: Action<HTMLDivElement> = (node) => {
		let start = { x: 0, y: 0 };
		node.onpointerdown = (event: MouseEvent) => {
			start = {
				x: event.clientX - translate.x,
				y: event.clientY - translate.y,
			};
			// document.addEventListener("pointermove", onpointermove);
			// document.addEventListener("pointerup", onpointerup);
			const onpointermove = (event: MouseEvent) => {
				translate.x = event.clientX - start.x;
				translate.y = event.clientY - start.y;
				(node.parentElement as HTMLDivElement).style.transform =
					`translate(${translate.x}px, ${translate.y}px)`;
			};
			const onpointerup = () => {
				checkBounds();
				// document.removeEventListener("pointermove", onpointermove);
				// document.removeEventListener("pointerup", onpointerup);
				unmove();
				unup();
			};
			const unmove = on(document, "pointermove", onpointermove);
			const unup = on(document, "pointerup", onpointerup);
		};
		const checkBounds = () => {
			const allowBox = canvas!.getBoundingClientRect();
			const box = (
				node.parentElement as HTMLDivElement
			).getBoundingClientRect();
			if (box.x < 0) {
				console.log("left");
				translate.x += 0 - box.x + 4;
			} else if (box.x + box.width > window.innerWidth) {
				console.log("right");
				translate.x -= box.x + box.width - window.innerWidth + 4;
			}
			if (box.y < allowBox.y) {
				console.log("top");
				translate.y += allowBox.y - box.y + 4;
			} else if (box.y + box.height > allowBox.y + allowBox.height) {
				console.log("bottom");
				translate.y -= box.y + box.height - (allowBox.y + allowBox.height) + 4;
			}
			(node.parentElement as HTMLDivElement).style.transform =
				`translate(${translate.x}px, ${translate.y}px)`;
		};
		$effect(() => {
			let _ = fullscreen;
			checkBounds();
		});
		on(window, "resize", checkBounds);
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

		lineTool = new paper.Tool();
		lineTool.onMouseDown = (event: paper.MouseEvent) => {
			path = new paper.Path.Line({
				from: event.point,
				to: event.point,
				strokeCap: "round",
				strokeColor: colorPicker,
				strokeWidth: sizePicker,
			});
		};
		lineTool.onMouseDrag = (event: paper.MouseEvent) => {
			path.lastSegment.point = event.point;
		};
		lineTool.onMouseUp = (event: paper.MouseEvent) => {};

		freeTool = new paper.Tool();
		freeTool.onMouseDown = (event: paper.MouseEvent) => {
			path = new paper.Path({
				segments: [event.point],
				strokeColor: colorPicker,
				strokeCap: "round",
				strokeJoin: "round",
				strokeWidth: sizePicker,
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

		freeTool.activate();

		const canvasSizeUpdate = () => {
			const parent = node.parentElement as HTMLDivElement;
			let w = parent.getBoundingClientRect().width;
			let h = parent.getBoundingClientRect().height;
			let k = w / canvasSize.w;
			const temp_h = canvasSize.h * k;
			if (temp_h > h) {
				k = h / canvasSize.h;
			}
			sc.view.scaling = new paper.Point(k, k);
			sc.view.viewSize = new paper.Size(canvasSize.w * k, canvasSize.h * k);
			sc.view.center = new paper.Point(canvasSize.w / 2, canvasSize.h / 2);
		};

		on(window, "resize", canvasSizeUpdate);

		$effect(() => {
			let f = fullscreen;
			canvasSizeUpdate();
			toolBar!.style.transform = `translate(${0}px, ${0}px)`;
			translate = { x: 0, y: 0 };
		});
	};
</script>

<div
	class="flex flex-col items-center justify-center gap-2 object-contain {fullscreen
		? 'fixed top-0 left-0 w-screen h-screen z-10 bg-white dark:bg-black'
		: 'relative'}"
>
	<canvas
		bind:this={canvas}
		use:paperIt
		width={canvasSize.w}
		height={canvasSize.h}
		class="bg-primary-100-900 rounded-lg ring-1 {fullscreen ? '' : 'w-full'}"
	></canvas>
	<div
		bind:this={toolBar}
		class="absolute top-0 left-full bg-primary-300/60 dark:bg-primary-700/60 m-1 p-1 pt-2 rounded-container flex flex-col items-center gap-2 backdrop-blur-sm text-white touch-none"
	>
		<button
			onclick={() => {
				fullscreen = !fullscreen;
			}}
			class="btn-icon preset-filled-primary-500"
		>
			{#if fullscreen}
				<Minimize2 />
			{:else}
				<Maximize2 />
			{/if}
		</button>
		<Segment
			bind:value={tool}
			indicatorBg="bg-primary-700-300"
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
			bind:value={colorPicker}
			type="color"
			class="input"
		/>
		<input
			bind:value={sizePicker}
			min="1"
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
