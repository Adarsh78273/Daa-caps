export default function ProjectSummary({ tasks, hasCycle }) {
  const edges = tasks.reduce((total, task) => total + task.deps.length, 0);
  return (
    <section className="summary" aria-label="Project summary">
      <span><b>{tasks.length}</b> tasks</span>
      <span><b>{edges}</b> dependencies</span>
      <span className={hasCycle ? 'bad' : 'good'}>{hasCycle ? 'Cycle found' : 'Graph is acyclic'}</span>
    </section>
  );
}
