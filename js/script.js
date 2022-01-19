{
    const tasks = [
        {
            content: "task1",
            done: true,
        },
        {
            content: "task2",
            done: false,
        }
    ];

    const newTask = (addNewTask) => {
        tasks.push({
            content: addNewTask,
        }); render();
    };

    const taskRemove = (index) => {
        tasks.splice(index, 1);
        render();
    };

    const toggleTaskDone = (task) => {
        tasks[task].done = !tasks[task].done;
        render();
    }

    const render = () => {

        let htmlString = "";

        for (task of tasks) {
            htmlString += `
            <li ${task.done ? "class=\"main__taskList--done\"" : ""}>
            <button class="js-taskDone">zrobione</button>
            ${task.content}
            <button class="js-taskRemove">usun</button>
            </li>
            
            `;
        };
        document.querySelector(".js-taskList").innerHTML = htmlString;

        const removeTasks = document.querySelectorAll(".js-taskRemove");

        removeTasks.forEach((removeTask, index) => {
            removeTask.addEventListener("click", () => {
                taskRemove(index);
            });
        });

        const toggleDoneTask = document.querySelectorAll(".js-taskDone");

        toggleDoneTask.forEach((toggleDone, task) => {
            toggleDone.addEventListener("click", () => {
                toggleTaskDone(task);
            });
        });

    };

    const onFormSubmit = (event) => {
        event.preventDefault();

        addNewTask = document.querySelector(".js-newTask").value.trim();

        if (addNewTask === "") {
            return;
        }
        newTask(addNewTask);
    };

    const init = () => {
        const form = document.querySelector(".js-form");

        form.addEventListener("submit", onFormSubmit);
        render();
    };
    init();
}