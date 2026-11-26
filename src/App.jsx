import { useMemo, useState } from 'react';
import AlgorithmAnalysis from './components/AlgorithmAnalysis.jsx';
import DependencyGraph from './components/DependencyGraph.jsx';
import ProjectSummary from './components/ProjectSummary.jsx';
import TaskForm from './components/TaskForm.jsx';
import TaskList from './components/TaskList.jsx';
import UseCases from './components/UseCases.jsx';
import { sampleTasks } from './data/sampleTasks.js';
import { dfsSort, kahnSort } from './algorithms/topologicalSort.js';

const STORAGE_KEY = 'stride-tasks';
const emptyForm = { name: '', deps: [] };

function loadTasks() {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || sampleTasks; }
  catch { return sampleTasks; }
}

export default function App() {
  const [tasks, setTasks] = useState(loadTasks);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState('');
  const [result, setResult] = useState(null);
  const orders = useMemo(() => ({ bfs: kahnSort(tasks), dfs: dfsSort(tasks) }), [tasks]);
  const hasCycle = orders.bfs.hasCycle || orders.dfs.hasCycle;

  function saveTasks(nextTasks) {
    setTasks(nextTasks);
    setResult(null);
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(nextTasks)); }
    catch { setError('Could not save to this browser. Check available storage.'); }
  }

  function submitTask(event) {
    event.preventDefault();
    const name = form.name.trim();
    if (!name) { setError('Enter a task name first.'); return; }
    const task = { id: editingId ?? Date.now(), name, deps: form.deps };
    const nextTasks = editingId === null ? [...tasks, task] : tasks.map((item) => item.id === editingId ? task : item);
    if (kahnSort(nextTasks).hasCycle || dfsSort(nextTasks).hasCycle) {
      setError('That dependency creates a cycle. Change its prerequisites.');
      return;
    }
    saveTasks(nextTasks);
    setForm(emptyForm);
    setEditingId(null);
    setError('');
  }

  function editTask(task) {
    setEditingId(task.id);
    setForm({ name: task.name, deps: task.deps });
    setError('');
  }

  function removeTask(id) {
    saveTasks(tasks.filter((task) => task.id !== id).map((task) => ({ ...task, deps: task.deps.filter((parent) => parent !== id) })));
    if (editingId === id) { setEditingId(null); setForm(emptyForm); }
  }

  function compareAlgorithms() {
    const measure = (algorithm) => {
      const start = performance.now();
      const result = algorithm(tasks);
      return { ...result, runtime: `${(performance.now() - start).toFixed(3)} ms` };
    };
    setResult({ bfs: measure(kahnSort), dfs: measure(dfsSort) });
  }

  return (
    <main className="app">
      <header><div className="logo">S</div><div><p className="overline">DAA CAPSTONE · PROJECT 10</p><h1>Project execution manager</h1><p className="subhead">Plan tasks in the right order with dependency graphs.</p></div></header>
      <ProjectSummary tasks={tasks} hasCycle={hasCycle} />
      <aside className="concept-strip"><span className="concept-icon">↳</span><span><b>Directed graph:</b> if task B depends on A, the arrow goes <code>A → B</code>. B can start only after A.</span></aside>
      <TaskForm tasks={tasks} form={form} setForm={setForm} editingId={editingId} error={error} onSubmit={submitTask} onCancel={() => { setEditingId(null); setForm(emptyForm); setError(''); }} />
      <section className="panel task-list-panel"><div className="section-title"><div><span className="step">02</span><h2>Your tasks</h2></div><span className="hint">Edit prerequisites to try cycle detection.</span></div><TaskList tasks={tasks} onEdit={editTask} onRemove={removeTask} /></section>
      <DependencyGraph tasks={tasks} />
      <AlgorithmAnalysis tasks={tasks} orders={orders} result={result} onCompare={compareAlgorithms} />
      <UseCases />
      <footer>Tasks save in this browser · React + graph algorithms</footer>
    </main>
  );
}
