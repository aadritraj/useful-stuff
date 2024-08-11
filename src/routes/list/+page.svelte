<script lang="ts">
    let listItems = $state([
        { text: "This isnt done", done: false },
        { text: "This is done", done: true },
    ]);
    /* vscode syntax highlighting seems to break if these
    newlines arent present, hope this is fixed soon. */
    let newTodoValue = $state("");

    const addTodo = () => {
        if (newTodoValue.length == 0) return;

        listItems = [...listItems, { text: newTodoValue, done: false }];
    };

    const editTodo = (event: Event) => {
        const target = event.target as HTMLInputElement;

        /* i feel as if there couldve been better 
        syntax for non-null assertions but sure. */
        const index = +target.dataset.index!;

        listItems[index].text = target.value;
    };

    const checkTodo = (event: Event) => {
        const target = event.target as HTMLInputElement;
        const index = +target.dataset.index!;

        // if only input checkboxes didnt return "on"
        listItems[index].done = !listItems[index].done;
    };

    const removeTodo = (event: Event) => {
        const target = event.target as HTMLInputElement;
        const index = +target.dataset.index!;

        listItems.splice(index, 1);
    }
</script>

<div>
    <input
        onkeydown={(event: KeyboardEvent) => {
            if (event.key != "Enter") return;

            addTodo();
        }}
        bind:value={newTodoValue}
        placeholder="Add Todo"
        type="text"
    />
    <button onclick={addTodo}>Add</button>

    <div>
        {#each listItems as todo, i}
            <div>
                <input oninput={editTodo} data-index={i} value={todo.text} type="text" />
                <input onchange={checkTodo} data-index={i} checked={todo.done} type="checkbox" />
                <button onclick={removeTodo} data-index={i}>Remove</button>
            </div>
        {/each}
    </div>
</div>