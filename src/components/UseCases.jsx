const examples = [
  ['01', 'Software releases', 'Build → test → deploy'],
  ['02', 'Event planning', 'Book venue → invite guests'],
  ['03', 'Study plans', 'Learn basics → solve problems'],
];

export default function UseCases() {
  return <section className="use-cases"><p className="overline">WHERE THIS HELPS</p><div>{examples.map(([number, title, flow]) => <article key={number}><span>{number}</span><b>{title}</b><small>{flow}</small></article>)}</div></section>;
}
