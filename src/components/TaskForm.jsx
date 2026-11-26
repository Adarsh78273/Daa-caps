export default function TaskForm({ tasks, form, setForm, editingId, error, onSubmit, onCancel }) {
  return (
    <section className="panel">
      <div className="section-title"><div><span className="step">01</span><h2>Tasks</h2></div><span className="hint">A task can start after its dependencies.</span></div>
      <form onSubmit={onSubmit} className="add-form">
        <input value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} placeholder="New task name" aria-label="Task name" />
        <label className="dep-picker"><span>Prerequisites · Ctrl/⌘ for multiple</span>
          <select multiple size={Math.min(Math.max(tasks.length, 2), 4)} value={form.deps.map(String)} onChange={(event) => setForm({ ...form, deps: [...event.target.selectedOptions].map((option) => Number(option.value)) })} aria-label="Task dependencies">
            {tasks.filter((task) => task.id !== editingId).map((task) => <option key={task.id} value={task.id}>{task.name}</option>)}
          </select>
        </label>
        <div className="form-buttons"><button className="primary">{editingId ? 'Save task' : 'Add task'}</button>{editingId && <button type="button" className="secondary" onClick={onCancel}>Cancel</button>}</div>
      </form>
      {error && <p className="error" role="alert">{error}</p>}
    </section>
  );
}
