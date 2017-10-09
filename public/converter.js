const el = document.querySelector('#click');
const fahrenheit = document.getElementById('fahrenheit');

const onClick = () => {
  el.addEventListener('click', () => {
    if (fahrenheit.style.display === 'none') {
      fahrenheit.style.display = 'block';
    } else {
      fahrenheit.style.display ='none';
    }
  });
};

onClick();
