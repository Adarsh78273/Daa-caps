# Smart Dependency and Project Execution Manager

A compact React project for Project 10 in the capstone brief. It treats tasks as graph vertices and prerequisites as directed edges.

## Run

Install Node.js, then run these commands in this folder:

```sh
npm install
npm run dev
```

Open the local URL printed by Vite. Use `npm run build` to create a production build.

## Try it

Add a task and choose its prerequisites. Edit an existing task to change its prerequisites. To see cycle detection, edit **Plan the app** and make it depend on **Release**. The app refuses the change because it would create a loop. Tasks are saved in this browser's local storage.

## DAA concepts in the app

- A task is a vertex (`V`) and a prerequisite is a directed edge (`E`). If B depends on A, the edge is `A → B`.
- Kahn's BFS algorithm uses in-degree counts and a queue to topologically sort tasks.
- DFS explores prerequisite chains and checks its recursion stack for a back edge, which indicates a cycle.
- Both approaches are compared by output order and measured browser runtime. Both have `O(V + E)` time complexity and `O(V)` auxiliary space.

## React project structure

- `src/main.jsx` mounts React in the page.
- `src/App.jsx` owns project state and connects the components.
- `src/components/` contains the project summary, task form, task list, dependency graph, algorithm analysis, and use-case components.
- `src/algorithms/topologicalSort.js` implements BFS, DFS, and cycle detection.
- `src/data/sampleTasks.js` contains the starter project.
- `src/style.css` contains the visual design.
