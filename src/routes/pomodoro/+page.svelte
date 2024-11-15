<script lang="ts">
	import Link from "$lib/components/Link.svelte";
	import Button from "$lib/components/Button.svelte";
	const POMODORI_COUNT = 4;

	const states = {
		idle: "isIdle",
		progressing: "isProgressing",
		resting: "isResting"
	};

	const periods = {
		pomodoro: 1500, // 45 minutes
		shortBreak: 300, // 5 minutes
		longBreak: 900 // 15 minutes
	};

	let currentTime = $state(periods.pomodoro);
	let currentState = $state(states.idle);
	let interval: ReturnType<typeof setInterval>;

	let cycles = $state(0);

	let titleState = $derived.by(() => {
		switch (currentState) {
			case states.idle:
				return "Idle";
			case states.progressing:
				return "In Progress";
			case states.resting:
				return "On Break";
			default:
				return "Pomodoro Timer";
		}
	});

	let formattedTime = $derived.by(() => {
		const minutes = Math.floor(currentTime / 60)
			.toString()
			.padStart(2, "0");
		const seconds = (currentTime % 60).toString().padStart(2, "0");

		return `${minutes}:${seconds}`;
	});

	const setState = (newState: string) => {
		clearInterval(interval);
		currentState = newState;
	};

	const idle = () => {
		setState(states.idle);
		currentTime = periods.pomodoro;
	};

	const rest = (time: number) => {
		setState(states.resting);
		currentTime = time;

		interval = setInterval(() => {
			if (currentTime == 0) idle();

			currentTime -= 1;
		}, 1000);
	};

	const completePomodoro = () => {
		cycles++;

		if (cycles === POMODORI_COUNT) {
			rest(periods.longBreak);
			cycles = 0;
		} else {
			rest(periods.shortBreak);
		}
	};

	const startPomodoro = () => {
		setState(states.progressing);
		currentTime = periods.pomodoro;

		interval = setInterval(() => {
			if (currentTime === 0) completePomodoro();

			currentTime -= 1;
		}, 1000);
	};

	const cancelPomodoro = () => {
		idle();
	};
</script>

<svelte:head>
	<title>{formattedTime} - {titleState}</title>
	<meta name="description" content="A virtual timer for applying the Pomodoro Technique." />
</svelte:head>

<div class="flex flex-col items-center justify-center gap-4 p-10">
	<div class="flex flex-col items-center">
		<h1 class="text-center text-5xl font-medium">Pomodoro Timer</h1>
		<p>A simple lightweight timer</p>
		<Link target="_blank" href="https://en.wikipedia.org/wiki/Pomodoro_Technique"
			>Read more here</Link
		>
	</div>

	<div class="flex flex-col items-center">
		<span class="font-mono text-2xl font-light">Controls</span>
		<p>Begin to start the Timer</p>
		<p>Complete to finish a Pomodori</p>
		<p>Cancel to reset the Timer</p>
	</div>

	<div
		class="max-w-5xl text-clip rounded-md bg-sky-300 p-2 font-mono text-8xl font-semibold text-white"
	>
		{formattedTime}
	</div>

	<div class="flex w-full max-w-xs flex-col space-y-1">
		<Button onclick={startPomodoro}>Begin</Button>
		<Button onclick={completePomodoro}>Complete</Button>
		<Button onclick={cancelPomodoro}>Cancel</Button>
	</div>
</div>
