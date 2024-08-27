const searchForm = document.querySelector("#search-form");
const searchFormInput = searchForm.querySelector("input");
const info = document.querySelector(".info");

// Kiểm tra xem trình duyệt có hỗ trợ SpeechRecognition không
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

if (SpeechRecognition) {
  console.log("Trình duyệt của bạn hỗ trợ nhận diện giọng nói");

  const recognition = new SpeechRecognition();
  recognition.continuous = true;
  recognition.interimResults = true; // Cho phép nhận diện kết quả tạm thời

  searchForm.insertAdjacentHTML("beforeend", '<button type="button"><i class="fas fa-microphone"></i></button>');
  searchFormInput.style.paddingRight = "50px";

  const micBtn = searchForm.querySelector("button");
  const micIcon = micBtn.firstElementChild;

  micBtn.addEventListener("click", () => {
    if (micIcon.classList.contains("fa-microphone")) {
      recognition.start(); // Bắt đầu nhận diện giọng nói
    } else {
      recognition.stop(); // Dừng nhận diện giọng nói
    }
  });

  recognition.addEventListener("start", () => {
    micIcon.classList.remove("fa-microphone");
    micIcon.classList.add("fa-microphone-slash");
    searchFormInput.focus();
    console.log("Nhận diện giọng nói đã kích hoạt, NÓI");
  });

  recognition.addEventListener("end", () => {
    micIcon.classList.remove("fa-microphone-slash");
    micIcon.classList.add("fa-microphone");
    searchFormInput.focus();
    console.log("Dịch vụ nhận diện giọng nói đã ngắt kết nối");
  });

  recognition.addEventListener("result", (event) => {
    let transcript = '';
    for (let i = event.resultIndex; i < event.results.length; i++) {
      transcript += event.results[i][0].transcript;
    }
    searchFormInput.value = transcript; // Cập nhật giá trị trường nhập liệu với kết quả
  });

 
} else {
  console.log("Trình duyệt của bạn không hỗ trợ nhận diện giọng nói");
  info.textContent = "Trình duyệt của bạn không hỗ trợ nhận diện giọng nói";
}
