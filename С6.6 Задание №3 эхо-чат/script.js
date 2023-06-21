const url = "wss://echo-ws-service.herokuapp.com";

const chatContent = document.querySelector('.chat-content');
const chatInput = document.querySelector('.chat-input');
const btnSend = document.querySelector('.btn-send');
const btnGeo = document.querySelector('.btn-geo');

let websocket = new WebSocket(url);
websocket.onmessage = function (event) {
   showMessage(event.data, 'in');
};

function showMessage(message, type) {
   let elem = document.createElement('p');
   elem.classList.add('message');
   elem.textContent = message;
   if (type === 'in') {
      elem.classList.add('message-in');
   } else if (type === 'link') {
      link = document.createElement('a');
      link.href = message;
      link.target = '_blank'
      link.textContent = 'Ссылка на карту';
      elem.textContent = '';
      elem.appendChild(link);
      elem.classList.add('message-in')
   } else if (type === 'error') {
      elem.classList.add('message-in')
   }
   chatContent.appendChild(elem);
   chatInput.value = '';
}

btnSend.addEventListener('click', () => {
   const message = chatInput.value;
   showMessage(message);
   websocket.send(message);
});

const error = () => {
   const msg = 'Невозможно получить ваше местоположение';
   showMessage(msg, 'error');
}

const success = (position) => {
   // console.log('position', position);
   const latitude = position.coords.latitude;
   const longitude = position.coords.longitude;
   console.log(latitude);
   console.log(longitude);
   showMessage(`https://www.openstreetmap.org/#map=18/${latitude}/${longitude}`, 'link')
}

btnGeo.addEventListener('click', () => {
   if (!navigator.geolocation) {
      const msg = 'Geolocation не поддерживается вашим браузером';
      showMessage(msg);
   } else {
      navigator.geolocation.getCurrentPosition(success, error);
   }
});