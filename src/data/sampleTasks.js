export const sampleTasks = [
  { id: 1, name: 'Plan the app', deps: [] },
  { id: 2, name: 'Design screens', deps: [1] },
  { id: 3, name: 'Set up project', deps: [1] },
  { id: 4, name: 'Build the app', deps: [2, 3] },
  { id: 5, name: 'Test the app', deps: [4] },
  { id: 6, name: 'Release', deps: [5] },
];
