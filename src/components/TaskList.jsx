export default function TaskList({ tasks, onEdit, onRemove }) {
  return (
    <ol className="task-list" aria-label="Project tasks">
      {tasks.map((task) => (
        <li key={task.id}>
          <span className="task-number">{String(task.id).slice(-2)}</span>
          <span className="task-name">{task.name}</span>
          <span className="task-deps">{task.deps.length ? `After ${task.deps.map((id) => tasks.find((item) => item.id === id)?.name).filter(Boolean).join(', ')}` : 'No prerequisites'}</span>
          <button className="edit" type="button" onClick={() => onEdit(task)} aria-label={`Edit ${task.name}`}>Edit</button>
          <button className="remove" type="button" onClick={() => onRemove(task.id)} aria-label={`Remove ${task.name}`}>×</button>
        </li>
      ))}
    </ol>
  );
}
