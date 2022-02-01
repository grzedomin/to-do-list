{
    let tasks = [];
    let hideDoneTasks = false;

    const newTask = (newTaskContent) => {
        tasks = [
            ...tasks,
            { content: newTaskContent }
        ];
        render();
    };

    const taskRemove = (index) => {
        tasks = [
            ...tasks.slice(0, index),
            ...tasks.slice(index + 1),
        ];
        render();
    };

    const toggleTaskDone = (index) => {
        tasks = tasks.map((task, taskIndex) => (taskIndex === index) ?
            ({
                ...task,
                done: !task.done
            })
            :
            ({
                ...task
            }));
        render();
    };

    const toggleHideTasksDone = () => {
        hideDoneTasks = !hideDoneTasks;
        render();
    };

    const toggleTasksDone = () => {
        tasks = tasks.map((task) => ({
            ...task,
            done: true,
        }));
        render();
    };

    const bindEvents = () => {
        const removeTasks = document.querySelectorAll(".js-taskRemove");

        removeTasks.forEach((removeTask, index) => {
            removeTask.addEventListener("click", () => {
                taskRemove(index);
            });
        });

        const toggleDoneTask = document.querySelectorAll(".js-taskDone");

        toggleDoneTask.forEach((toggleDone, index) => {
            toggleDone.addEventListener("click", () => {
                toggleTaskDone(index);
            });
        });
    };

    const clearInput = () => {
        document.querySelector(".js-newTask").value = "";
        document.querySelector(".js-newTask").focus();
    };

    const renderTaskList = () => {
        let htmlString = "";

        for (task of tasks) {
            htmlString += `
            <li class="main__listItem${task.done && hideDoneTasks ? " main__listItem--hidden" : ""}">
                <button class="js-taskDone main__taskDoneButton">${task.done ? "✓" : ""}</button>
                   <span class="main__taskListContent${task.done ? " main__listItem--done" : ""}">${task.content}</span>
                <button class="js-taskRemove main__taskRemoveButton">🗑</button>
            </li>
            `;
        };
        document.querySelector(".js-taskList").innerHTML = htmlString;
    };

    const renderButtons = () => {
        buttonsElement = document.querySelector(".js-buttons");

        if (tasks.length === 0) {
            buttonsElement.innerHTML = "";
            return;
        }

        buttonsElement.innerHTML = `
            <button class="section__button js-toggleHideDoneTasks">
                ${hideDoneTasks ? "Pokaż" : "Ukryj"} ukończone
            </button>

            <button class="section__button js-toggleAllTasksDone"${tasks.every(({ done }) => done) ? "disabled" : ""}>
                Ukończ wszystkie
            </button>
        `;
    };

    const bindButtonsEvents = () => {
        const toggleHideDoneTasks = document.querySelector(".js-toggleHideDoneTasks");
        const toggleAllTasksDone = document.querySelector(".js-toggleAllTasksDone");

        if (toggleHideDoneTasks && toggleAllTasksDone) {
            toggleHideDoneTasks.addEventListener("click", toggleHideTasksDone);
            toggleAllTasksDone.addEventListener("click", toggleTasksDone);
        }
    };

    const render = () => {
        renderButtons();
        bindButtonsEvents();

        renderTaskList();
        bindEvents();
    };

    const onFormSubmit = (event) => {
        event.preventDefault();

        const newTaskContent = document.querySelector(".js-newTask").value.trim();

        if (newTaskContent === "") {
            return;
        }
        newTask(newTaskContent);
        clearInput();
    };

    const init = () => {
        const form = document.querySelector(".js-form");

        form.addEventListener("submit", onFormSubmit);
        render();
    };
    init();
}