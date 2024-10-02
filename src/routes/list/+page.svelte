<script lang="ts">
	type TodoItem = {
		text: String;
		done: false;
	};
	type TodoList = {
		meta: {};
		items: TodoItem[];
	};
	// the localStorage key that the list will occupy
	const STORAGE_KEY = "S_Todo";

	let list = $state<TodoList>({
		meta: {},
		items: []
	});
	let entry = $state<String>("");

	$effect(() => {
		let jsonString = localStorage.getItem(STORAGE_KEY);
		let object = JSON.parse(jsonString as string);

		if (!object) return;

		list = object;
	});

	$effect(() => {
		let jsonString = JSON.stringify(list);
		localStorage.setItem(STORAGE_KEY, jsonString);
	});

	const addTodo = () => {
		if (entry.length == 0) return;

		let newTodo: TodoItem = {
			text: entry,
			done: false
		};
		list.items.push(newTodo);

		entry = "";
	};

	const removeTodo = (index: number) => {
		list.items.splice(index, 1);
	};
</script>

<svelte:head>
	<title>Local Todo-List</title>
	<meta name="description" content="Todo-List, stored locally." />
</svelte:head>

<h1>Local Todos</h1>
<p>A Local Todo-List, stored in your Local Storage</p>

<p>There are {list.items.length} items</p>

<input type="text" bind:value={entry} placeholder="What to add?" />
<button onclick={addTodo}>Add</button>

<section>
	{#each list.items as item, index}
		<div>
			<input type="checkbox" bind:checked={item.done} />
			{item.text}
			<button onclick={() => removeTodo(index)}>Remove</button>
		</div>
	{/each}
</section>
