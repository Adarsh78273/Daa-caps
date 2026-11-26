function makeGraph(tasks) {
  const ids = new Set(tasks.map((task) => task.id));
  const children = new Map(tasks.map(({ id }) => [id, []]));
  const indegree = new Map(tasks.map(({ id }) => [id, 0]));

  tasks.forEach((task) => task.deps.forEach((parent) => {
    if (!ids.has(parent)) return;
    children.get(parent).push(task.id);
    indegree.set(task.id, indegree.get(task.id) + 1);
  }));
  return { ids, children, indegree };
}

// Kahn's algorithm: add zero-indegree tasks to a queue, then process them.
export function kahnSort(tasks) {
  const { children, indegree } = makeGraph(tasks);
  const queue = tasks.filter(({ id }) => indegree.get(id) === 0).map(({ id }) => id);
  const order = [];

  for (let head = 0; head < queue.length; head += 1) {
    const id = queue[head];
    order.push(id);
    children.get(id).forEach((child) => {
      indegree.set(child, indegree.get(child) - 1);
      if (indegree.get(child) === 0) queue.push(child);
    });
  }
  return { order, hasCycle: order.length !== tasks.length };
}

// DFS: a back edge to a visiting task means the graph contains a cycle.
export function dfsSort(tasks) {
  const byId = new Map(tasks.map((task) => [task.id, task]));
  const state = new Map(); // 1 = visiting, 2 = fully explored
  const finishOrder = [];
  let hasCycle = false;

  function visit(id) {
    if (state.get(id) === 1) { hasCycle = true; return; }
    if (state.get(id) === 2 || hasCycle) return;
    state.set(id, 1);
    byId.get(id).deps.forEach((parent) => { if (byId.has(parent)) visit(parent); });
    state.set(id, 2);
    finishOrder.push(id);
  }

  tasks.forEach(({ id }) => visit(id));
  return { order: hasCycle ? [] : finishOrder.reverse(), hasCycle };
}
