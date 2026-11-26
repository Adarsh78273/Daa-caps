export default function DependencyGraph({ tasks }) {
  if (!tasks.length) return <p className="hint">Add tasks to build the dependency graph.</p>;
  return (
    <section className="panel graph-panel">
      <div className="section-title"><div><span className="step">GRAPH</span><h2>Task dependencies</h2></div><span className="hint">Arrow points to the task that depends on it</span></div>
      <div className="graph-list">
        {tasks.map((task) => task.deps.length
          ? task.deps.map((parent) => <div className="graph-edge" key={`${parent}-${task.id}`}><span>{tasks.find((item) => item.id === parent)?.name || 'Missing task'}</span><i>→</i><b>{task.name}</b></div>)
          : <div className="graph-edge root-edge" key={`root-${task.id}`}><span className="root-node">Start</span><i>→</i><b>{task.name}</b></div>)}
      </div>
    </section>
  );
}
