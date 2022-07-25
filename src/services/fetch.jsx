async function fetchJSON(...args) {
  const response = await fetch(...args);
  const data = await response.json();

  return { response, data };
}

export default fetchJSON;
