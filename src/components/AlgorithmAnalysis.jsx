function AlgorithmCard({ title, label, order, tasks, runtime, note }) {
  const names = order.map((id) => tasks.find((task) => task.id === id)?.name).filter(Boolean);
  return (
    <article>
      <h3>{title} <small>{label}</small></h3>
      <p>Time <code>O(V + E)</code> · Space <code>O(V)</code></p>
      <strong>Execution order</strong>
      <p className="order">{names.join(' → ') || 'No valid order (cycle detected)'}</p>
      <span className="runtime">{runtime ?? 'Run comparison to measure'}</span>
      <p className="algorithm-note">{note}</p>
    </article>
  );
}

export default function AlgorithmAnalysis({ tasks, orders, result, onCompare }) {
  return (
    <section className="panel">
      <div className="section-title"><div><span className="step">03</span><h2>Algorithm analysis</h2></div><button className="primary" onClick={onCompare}>Compare BFS &amp; DFS</button></div>
      <p className="hint explanation">Kahn’s BFS queues tasks with no prerequisites. DFS explores dependency chains, then reverses finish order. A cycle means there is no valid schedule.</p>
      <div className="algorithms">
        <AlgorithmCard title="Kahn’s algorithm" label="BFS" tasks={tasks} order={result?.bfs.order || orders.bfs.order} runtime={result?.bfs.runtime} note="Uses a queue and each task’s in-degree." />
        <AlgorithmCard title="Depth-first search" label="DFS" tasks={tasks} order={result?.dfs.order || orders.dfs.order} runtime={result?.dfs.runtime} note="Uses a recursion stack to find back edges." />
      </div>
      <p className="footnote">V = tasks · E = dependency links. Both algorithms run in O(V + E) time and use O(V) extra space.</p>
    </section>
  );
}
