<script lang="ts">
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
	let interval: Timer;

	let cycles = $state(0);

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

<time>{formattedTime}</time>
<div>
	<button onclick={cancelPomodoro}>Cancel</button>
	<button onclick={startPomodoro}>Begin</button>
	<button onclick={completePomodoro}>Complete</button>
</div>
