const formData = document.getElementById("contactForm");
const btnTheme = document.getElementById('btn-theme');
const iconMoon = document.getElementById('theme-icon-moon');
const iconSun = document.getElementById('theme-icon-sun');
const html = document.documentElement;


// Solución al problema con el tema al cargar la pagina 
(function() {
  const savedTheme = localStorage.getItem('theme') || 'light';
  document.documentElement.setAttribute('data-bs-theme', savedTheme);
  
  // Usamos DOMContentLoaded para manipular los iconos sin que el texto desaparezca
  window.addEventListener('DOMContentLoaded', () => {
    const iconMoon = document.getElementById("theme-icon-moon");
    const iconSun = document.getElementById("theme-icon-sun");

    if (savedTheme === 'dark' && iconMoon && iconSun) {
      iconMoon.classList.add('d-none');
      iconSun.classList.remove('d-none');
    }
  });
})();


const validations = ({ name, email, message }) => {
  const errors = {};
  const messageGeneric = "el campo es obligatorio";
  const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  if (!name) {
    errors.name = messageGeneric;
  } else if (name.length <= 3) {
    errors.name = "El nombre debe tener mas de 3 caracteres";
  }

  if (!email) {
    errors.email = messageGeneric;
  } else if (!regexEmail.test(email)) {
    errors.email = "El correo no es valido";
  }
  // Mensaje (textarea)
  if (message.trim().length < 10) {
    errors.message = "El mensaje debe tener al menos 10 caracteres";
  } else if (message.length > 500) {
    errors.message = "El mensaje no puede superar los 500 caracteres";
  }

  return errors;
};

const cleanInputs = () => {
  formData.reset();
};

const cleanErrors = () => {
  document
    .querySelectorAll(".error-messages")
    .forEach((mssg) => (mssg.textContent = ""));
};

const renderErrors = (errors) => {
  cleanErrors();
  for (const item in errors) {
    const spanError = document.getElementById(`error-${item}`);
    if (spanError) {
      spanError.classList.remove("d-none", "text-success");
      spanError.classList.add("text-danger");
      spanError.textContent = errors[item];
    }
  }
};

const renderAlert = (message, status) => {
  // alert(message);
  console.log(message, status);
  const containerAlert = document.getElementById("container-alert");
  const messageAlert = document.getElementById("message-alert");
  messageAlert.textContent = message;
  containerAlert.classList.remove("alert-success", "alert-danger");
  status
    ? containerAlert.classList.add("alert-success")
    : containerAlert.classList.add("alert-danger");
  containerAlert.classList.remove("d-none");
};

formData.addEventListener("submit", (e) => {
  e.preventDefault();

  const formValues = new FormData(formData);
  const values = Object.fromEntries(formValues.entries());

  const mapValues = {
    name: values.inputName,
    email: values.inputEmail,
    message: values.inputMessage,
  };

  const errores = validations(mapValues);
  const message = "El Formulario fue enviado con exito";

  if (Object.entries(errores).length > 0) {
    renderErrors(errores);
  } else {
    renderErrors({});
   
    const modalElement = document.getElementById("staticBackdrop");
    const modalInstance =
      bootstrap.Modal.getInstance(modalElement) ||
      new bootstrap.Modal(modalElement);

    if (modalInstance) {
        modalInstance.hide();
    }
     renderAlert(message, true);
  }
  cleanInputs();
});

// Clock 
function updateTime() {
    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { 
        hour: '2-digit', 
        minute: '2-digit' 
    });
    const dateStr = now.toISOString().split('T')[0];
    
    const clockEl = document.getElementById('clock');
    if (clockEl) {
        clockEl.innerText = timeStr;
        const dateEl = clockEl.nextElementSibling;
        if (dateEl) {
            dateEl.innerText = dateStr;
        }
    }
}

// Initialize clock 
document.addEventListener('DOMContentLoaded', function() {
    updateTime();
    setInterval(updateTime, 1000);
})

// Animation
const imageProfile = document.getElementById('profile');
const badge = document.getElementById('status-badge');

imageProfile.addEventListener('mouseenter', () => {
    badge.classList.add('pulse-active');
});

imageProfile.addEventListener('mouseleave', () => {
    badge.classList.remove('pulse-active');
});

// SELECT THEME


btnTheme.addEventListener('click', () => {
  // 1. Determinar el nuevo tema
  const currentTheme = html.getAttribute('data-bs-theme');
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  
  // 2. Aplicar el tema al HTML
  html.setAttribute('data-bs-theme', newTheme);
  
  // 3. Alternar los iconos
  if (newTheme === 'dark') {
    iconMoon.classList.add('d-none');
    iconSun.classList.remove('d-none');
  } else {
    iconSun.classList.add('d-none');
    iconMoon.classList.remove('d-none');
  }
  
  // Opcional: Guardar en localStorage para persistencia
  localStorage.setItem('theme', newTheme);
});