<script lang="ts">
    type TodoItem = {
        text: string;
        done: boolean
    };
    let listItems = $state<TodoItem[]>([]);
    let newTodoValue = $state("");

    let done = $derived(listItems.filter((item) => item.done));
    let unfinished = $derived(listItems.filter((item) => !item.done));

    $effect(() => {
        const savedTodos = localStorage.getItem("saved_todos");
        
        if (savedTodos) {
            listItems = JSON.parse(savedTodos);
        };
    });

    $effect(() => {
        localStorage.setItem("saved_todos", JSON.stringify(listItems));
    });

    const addTodo = () => {
        if (newTodoValue.length == 0) return;

        listItems = [...listItems, { text: newTodoValue, done: false }];
        newTodoValue = "";
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
    };
</script>

<div>
    <h1>
        There are {listItems.length} entries
    </h1>
    {#if listItems.length > 0}
        ({done.length} completed, {unfinished.length} uncompleted)
    {/if}

    <div>
        {#each listItems as todo, i}
            <div>
                <input oninput={editTodo} data-index={i} value={todo.text} type="text" />
                <input onchange={checkTodo} data-index={i} checked={todo.done} type="checkbox" />
                <button onclick={removeTodo} data-index={i}>Remove</button>
            </div>
        {/each}
    </div>

    <input
        onkeydown={(event: KeyboardEvent) => {
            if (event.key != "Enter") return;

            addTodo();
        }}
        bind:value={newTodoValue}
        placeholder="Type here"
        type="text"
    />
    <button onclick={addTodo}>Add</button>
</div>