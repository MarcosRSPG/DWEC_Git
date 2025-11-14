export class Task {
  constructor(
    title,
    description,
    priority,
    done = false,
    createAt = Date.now(),
    id = null
  ) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.priority = priority;
    this.done = done;
    this.createAt = createAt;
  }
}
