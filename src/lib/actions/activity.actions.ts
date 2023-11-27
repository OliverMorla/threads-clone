async function fetchActivity() {
  try {
    const res = await fetch("/api/auth/activity");
    const data = await res.json();
    return data;
  } catch (err) {
    console.log(err instanceof Error ? err.message : "failed to fetch");
  }
}

export { fetchActivity };
