export const topicSelector = () => {
  return (
    `<h2>Filter by Topic</h2>
      <select id="topic-filter">
        <option value="">Select a topic</option>
        <option value="science">Science</option>
        <option value="history">History</option>
        <option value="fiction">Fiction</option>
        <option value="biography">Biography</option>
      </select>
    `
  )
}
