const form = document.querySelector("#mailForm");
const user = document.querySelector("#email");
const pass = document.querySelector("#password");
const to = document.querySelector("#to");
const subject = document.querySelector("#subject");
const text = document.querySelector("#text");
const valid = document.querySelector("#valid");
const invalid = document.querySelector("#invalid");
const loading = document.querySelector("#loading");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  loading.innerHTML = '<i class="fa-solid fa-spinner fa-spin-pulse fa-xl"></i>';

  const mail = {
    user: user.value,
    pass: pass.value,
    to: to.value,
    subject: subject.value,
    text: text.value,
  };

  sendEmail(mail);
});

async function sendEmail(mail) {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(mail),
  };

  const response = await fetch("http://localhost:3000/sendEmail", options);

  if (!response.ok) {
    const result = await response.json();
    valid.textContent = "";
    invalid.textContent = result.message;
    loading.innerHTML = "";
    return;
  }
  const result = await response.json();
  invalid.textContent = "";
  valid.textContent = "Email sent: " + result.message;
  loading.innerHTML = "";
}
