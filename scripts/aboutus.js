
const cardsData = [
  {
    title: "Dra. Maria Caro",
    description:
      '"¡Estoy impresionada con la calidad del microscopio que compré en Micros-code! Como bióloga, necesito equipos confiables para mi investigación, y su producto no solo cumple sino que supera mis expectativas. ¡Gracias por facilitar mi trabajo diario!"',
    image:
      "https://img.freepik.com/fotos-premium/placa-petri-mano-joven-cientifico-cerca-microscopio-laboratorio-examen-placa-cultivo-bacteriano-investigadora-laboratorio-microbiologia_1212-10531.jpg",
  },
  {
    title: "Dr. Juan Perez",
    description:
      '"Desde que adquirí mi microscopio electrónico en Micros-code, he podido llevar a cabo análisis detallados con una claridad increíble. El servicio al cliente fue excelente y la entrega fue rápida. Recomiendo sin duda sus productos a cualquier profesional en el campo de la ciencia."',
    image:
      "https://s2-valor.glbimg.com/1GpQJmQe_L9-WBnHIPqDb_cyR0o=/0x0:1500x1000/984x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_63b422c2caee4269b8b34177e8876b93/internal_photos/bs/2023/2/9/wtBBFxTY6Gtf5wYBWEXg/068-top10-vale-laboratorio.jpg",
  },
  {
    title: "Ana Martinez",
    description:
      "Soy estudiante de medicina y gracias al microscopio estéreo que compré en Micros-code, he podido estudiar muestras tridimensionales con gran precisión. La asesoría que recibí para elegir el modelo adecuado fue muy útil y estoy muy satisfecha con mi compra.",
    image:
      "https://img.freepik.com/free-photo/happy-scientist-smiling-camera-with-protective-glasses_13339-279567.jpg?size=626&ext=jpg",
  },
  {
    title: "Dra. Lia Cleo",
    description:
      "Como investigadora en nanotecnología, necesitaba un microscopio de fluorescencia avanzado para mis experimentos. En Micros-code encontré exactamente lo que buscaba. Su equipo no solo cumplió con mis exigencias técnicas, sino que también el soporte postventa ha sido excepcional",
    image:
      "https://img.freepik.com/free-photo/medium-shot-woman-holding-tubes_23-2148969944.jpg",
  },
];


const createCard = (title, description, image) => {
  return `
      <div class="card">
        <img src="${image}" alt="${title}" style="width: 100%; border-radius: 8px 8px 0 0;">
        <div class="card-content mt-2">
          <h2 class= "text-center">${title}</h2>
          <p>${description}</p>
        </div>
      </div>
    `;
};

const cardsContainer = document.getElementById("testimonios");


cardsData.forEach((card) => {
  cardsContainer.innerHTML += createCard(
    card.title,
    card.description,
    card.image
  );
});


const form = document.getElementById("forml");
const nameForm = document.getElementById("name");
const emailForm = document.getElementById("email");
const textArea = document.getElementById("text-area");
const checkForm = document.getElementById("cbox2");
const urlContactos =
  "https://667ef5e9f2cb59c38dc79e38.mockapi.io/api/contact/contact";

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  const name = nameForm.value.trim();
  const email = emailForm.value.trim();
  const Comment = textArea.value.trim();
  const CheckDefault = checkForm.checked;

  const newcontact = {
    name: name,
    email: email,
    Comment: Comment,
    CheckDefault: CheckDefault,
  };

  try {
    const response = await fetch(urlContactos, {
      method: "POST",
      body: JSON.stringify(newcontact),
      headers: { "Content-type": "application/json" },
    });

    if (response.ok) {
      alert("Su mensaje fue enviado");
      form.reset();
    } else {
      const errortext = await response.text();
      alert("Error al enviar", errortext);
    }
  } catch (error) {
    alert("Error al enviar su consulta", error);
  }
});


const developerRow = document.getElementById("developers-row");

const urlMockApi =
  "https://666cf4a27a3738f7cacb09c9.mockapi.io/ecommerceScience/developers";
const fetchDeveloperData = async () => {
  try {
    const storedDevelopers = localStorage.getItem("devs");
    if (storedDevelopers) {
      const developers = JSON.parse(storedDevelopers);
      updateFooter(developers);
    } else {
      const response = await fetch(urlMockApi);
      console.log("Respuesta de la API:", response);
      const data = await response.json();
      console.log("Datos del desarrollador:", data);
      if (data && data.length > 0) {
        localStorage.setItem("devs", JSON.stringify(data));
        updateFooter(data);
      }
    }
  } catch (error) {
    console.error("Error al obtener los datos del desarrollador:", error);
  }
};


const updateFooter = (developers) => {
  developerRow.innerHTML = ""; 
  developers.forEach((developer) => {
    const col = document.createElement("div");
    col.classList.add("col");
    col.innerHTML = `
            <span>${developer.name}</span>
            <a href="${developer.git}" target="_blank">
                <i class="fa-brands fa-github fa-2x"></i>
            </a>
            <a href="mailto:${developer.mail}">
                <i class="fa-regular fa-envelope fa-2x"></i>
            </a>
        `;
    developerRow.appendChild(col);
  });
};

document.addEventListener("DOMContentLoaded", fetchDeveloperData);
