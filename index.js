document.addEventListener('DOMContentLoaded', () => {
    const counterElement = document.getElementById('counter');
    
    // Initialize the counter
    let counter = 0;
    
    // Update the counter every millisecond
    setInterval(() => {
      counter++;
      counterElement.textContent = counter;
    }, 1);
  });